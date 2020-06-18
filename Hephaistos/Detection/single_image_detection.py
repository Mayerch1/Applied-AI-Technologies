"""
	 0 -- > keine Maske
	 1 --> Maske
"""
#!/usr/bin/env python
# coding: utf-8


import sys 
import numpy as np
import os, sys
import os
import web 
import json
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model

urls = ('/.*', 'hooks')
app = web.application(urls, globals())
loaded_model = load_model(os.path.dirname(__file__) + '/saved_model')

class hooks:
    def POST(self):
        data = web.data().decode('utf-8')
        print(data)
        picture=tf.keras.preprocessing.image.load_img(os.path.dirname(__file__) + "/" + data, grayscale=False, color_mode="rgb", target_size=(100,100), interpolation="nearest")
        array = tf.keras.preprocessing.image.img_to_array(picture)
        array = np.array([array])  # Convert single image to a batch.
        predict = loaded_model.predict(array)[0]
        predict_class = np.argmax(predict)
        predict_class = predict_class.tolist()
        return predict_class

if __name__ == '__main__':
    os.environ['PORT'] = '8898'
    app.run()