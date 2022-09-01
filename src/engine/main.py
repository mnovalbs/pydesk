from flask import Flask, request
from flask_cors import CORS
import qrcode

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


@app.route("/qrcode", methods=['POST'])
def create_qrcode():
    app_path = request.json['app_path']
    text = request.json['text']
    qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=5)

    qr.add_data(text)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(app_path)

    return {
        "app_path": app_path
    }


if __name__ == "__main__":
    # time.sleep(5)
    # app.run(host='127.0.0.1', port=5000)
    app.run(host='localhost', port=6001)
