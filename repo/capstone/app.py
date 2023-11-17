# app.py

import os
from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions

app = Flask(__name__)

model = MobileNetV2(weights='imagenet')

def predict(image_path):
    img = Image.open(image_path)
    img = img.resize((224, 224))  # MobileNetV2 input size
    img_array = np.expand_dims(np.array(img), axis=0)
    img_array = preprocess_input(img_array)
    predictions = model.predict(img_array)
    decoded_predictions = decode_predictions(predictions)
    return decoded_predictions[0][0][1]

@app.route('/', methods=['POST'])
def index():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        file_path = '/tmp/uploaded_image.jpg'
        file.save(file_path)
        prediction = predict(file_path)
        return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
