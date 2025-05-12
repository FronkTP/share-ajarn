from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Teachers API Route
@app.route("/teachers")
def teachers():
    return "Charnchai"
    
if __name__ == "__main__":
    app.run(debug=True)