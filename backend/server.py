from flask import Flask, jsonify , request
from flask_cors import CORS
from flask_mysqldb import MySQL
import MySQLdb

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'           # your MySQL username
app.config['MYSQL_PASSWORD'] = 'Isuckingame1'   # your MySQL password
app.config['MYSQL_DB'] = 'shareajarn'        # your DB name

mysql = MySQL(app)

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
            INSERT INTO reviews (professorID, course, stars, comment)
            VALUES (%s, %s, %s, %s)
        """, (professor_id, course, stars, comment))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': '✅ Review added successfully'})
    except MySQLdb.Error as e:
        return jsonify({'error': str(e)}), 500

#get review by professor_id  
@app.route('/get_reviews/<int:professor_id>', methods=['GET'])
def get_reviews(professor_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT course, stars, comment FROM reviews HERE professorID = %s", (professor_id,))
        reviews = cur.fetchall()
        cur.close()

        review_list = [{"course": row[0], "stars": row[1], "comment": row[2]} for row in reviews]
        return jsonify(review_list)
    except MySQLdb.Error as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)