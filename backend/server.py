from flask import Flask

app = Flask(__name__)

# Teachers API Route
@app.route("/teachers")
def teachers():
    return {"Name":"Charnchai",
            "Age":"CAVEMAN",
            "FUCK":"YOU"}
    
if __name__ == "__main__":
    app.run(debug=True)