from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def ping():
    return "pong"

@app.route("/sum", methods=['POST'])
def sum():
    a = request.json['a']
    b = request.json['b']

    return {
        "result": a + b
    }

if __name__ == "__main__":
    # time.sleep(5)
    app.run(host='127.0.0.1', port=5000)
