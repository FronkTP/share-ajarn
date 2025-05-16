from flask import Flask, jsonify , request
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb
from dotenv import load_dotenv
import os
load_dotenv()
db_password = os.environ.get("DB_PASSWORD")

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'           # your MySQL username
app.config['MYSQL_PASSWORD'] = db_password   # your MySQL password
app.config['MYSQL_DB'] = 'shareajarn'        # your DB name

mysql = MySQL(app)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    name = data.get('name')
    is_admin = data.get('isAdmin', False)  # Default to False

    try:
        cur = mysql.connection.cursor()

        # Insert or update user
        cur.execute("""
            INSERT INTO users (email, name, is_admin)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE name=%s, is_admin=%s
        """, (email, name, is_admin, name, is_admin))

        mysql.connection.commit()
        cur.close()
        return jsonify({'message': '✅ User stored successfully'})
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500

#add review to each professor
@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.json
    professor_id = data.get('professorId')
    course = data.get('course')
    stars = data.get('stars')
    comment = data.get('comment')

    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            INSERT INTO pending_reviews (professorID, course, stars, comment)
            VALUES (%s, %s, %s, %s)
        """, (professor_id, course, stars, comment))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': '✅ Review submitted for approval'})
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500
#get review by professor_id  
@app.route('/get_reviews/<int:professor_id>', methods=['GET'])
def get_reviews(professor_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT course, stars, comment FROM reviews WHERE professorId = %s", (professor_id,))
        reviews = cur.fetchall()
        cur.close()

        review_list = [{"course": row[0], "stars": row[1], "comment": row[2]} for row in reviews]
        return jsonify(review_list)
    except MySQLdb.Error as e:
        return jsonify({"error": str(e)}), 500

#get admin information
@app.route('/api/get_user_info', methods=['POST'])
def get_user_info():
    cursor = mysql.connection.cursor()
    data = request.json
    print("data from flask backend",data)
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    try:
        query = "SELECT id, name, is_admin FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()
        print("sql fetch",user)
        if user:
            return jsonify({'user': user}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/pending_reviews', methods=['GET'])
def get_pending_reviews():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, professorID, course, stars, comment FROM pending_reviews")
        rows = cur.fetchall()
        reviews = []
        for row in rows:
            reviews.append({
                'id': row[0],
                'professorID': row[1],
                'course': row[2],
                'stars': row[3],
                'comment': row[4]
            })
        cur.close()
        return jsonify({'reviews': reviews})
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/approve_review/<int:review_id>', methods=['POST'])
def approve_review(review_id):
    try:
        cur = mysql.connection.cursor()
        # Insert into reviews
        cur.execute("""
            INSERT INTO reviews (professorID, course, stars, comment)
            SELECT professorID, course, stars, comment
            FROM pending_reviews
            WHERE id = %s
        """, (review_id,))
        # Delete from pending_reviews
        cur.execute("DELETE FROM pending_reviews WHERE id = %s", (review_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': '✅ Review approved and published'})
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/reject_review/<int:review_id>', methods=['DELETE'])
def reject_review(review_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM pending_reviews WHERE id = %s", (review_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': '🗑️ Review rejected and removed'})
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/email_login', methods=['POST'])
def email_login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        cur = mysql.connection.cursor()
        # Query user by email
        cur.execute("SELECT id, name, password, is_admin FROM users_a WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()

        if user:
            user_id, name, db_password, is_admin = user
            # WARNING: Plaintext password check; replace with hashed password verification in production!
            if password == db_password:
                return jsonify({
                    "success": True,
                    "user": [user_id, name, is_admin]
                })
        
        # If user not found or password mismatch
        return jsonify({
            "success": False,
            "message": "Invalid email or password"
        }), 401

    except MySQLdb.Error as e:
        # Database error handling
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500
    except Exception as e:
        # General error handling
        return jsonify({
            "success": False,
            "message": "Internal server error"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)