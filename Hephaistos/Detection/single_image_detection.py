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

# get the path to the model folder
# special case if working dir is file directory
model_path = os.path.dirname(__file__)
if model_path:
    model_path += '/'
model_path += 'saved_model'

loaded_model = load_model(model_path)

class hooks:
    def POST(self):
        data = web.data().decode('utf-8')
        print(data)
        picture=tf.keras.preprocessing.image.load_img(os.path.dirname(__file__) + "/" + data, grayscale=False, color_mode="rgb", target_size=(128,128), interpolation="nearest")
        array = tf.keras.preprocessing.image.img_to_array(picture)
        array = np.array([array])  # Convert single image to a batch.
        predict = loaded_model.predict(array)[0]
        predict_class = np.argmax(predict)
        predict_class = predict_class.tolist()
        print(predict_class)
        return predict_class

if __name__ == '__main__':
    os.environ['PORT'] = '8988'
    app.run()
