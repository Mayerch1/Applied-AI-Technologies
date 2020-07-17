"""
	 0 --> Maske
	 1 --> keine Maske
"""
#!/usr/bin/env python
# coding: utf-8

import os
import sys 
import numpy as np
import web

import cv2
import tensorflow as tf
import tensorflow.keras
from PIL import Image, ImageOps



urls = ('/.*', 'hooks')
app = web.application(urls, globals())

# get the path to the model folder
# special case if working dir is file directory
model_path = os.path.dirname(__file__)
if model_path:
    model_path += '/'
#model_path += 'saved_model'

#loaded_model = tf.keras.models.load_model(model_path+'saved_model)

model = tf.keras.models.load_model(model_path+'saved_model')
model_2= tf.keras.models.load_model(model_path+'saved_models/model_2')
model_5= tf.keras.models.load_model(model_path+'saved_models/model_5')
model_TM = tf.keras.models.load_model(model_path+'saved_models/teachableMachines/keras_model.h5')



face_cascade = cv2.CascadeClassifier('./openCV/haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier('./openCV/haarcascade_eye.xml')
smile_cascade = cv2.CascadeClassifier('./openCV/haarcascade_smile.xml')
    


def FaceDetection(path):
    img = cv2.imread(path)
    shape=img.shape[0]/img.shape[1]
    img = cv2.resize(img,(512,int(512*shape)))
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

    #Eye detection whole img
    eyes = eye_cascade.detectMultiScale(
            gray,
            scaleFactor=1.2, 
            minNeighbors=18)

    #Mouth detection whole img 
    smile = smile_cascade.detectMultiScale(
            gray,
            scaleFactor= 1.16,
            minNeighbors=35)


    #Face detection
    eyes2=[]
    smile2=[]
    cropped_face=[]
    faces = face_cascade.detectMultiScale(gray, 1.2, 5)
    for (x,y,w,h) in faces:
        
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]
        cropped_face=roi_color 
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        #Eye detection on face
        eyes2 = eye_cascade.detectMultiScale(roi_gray,scaleFactor=1.2, minNeighbors=18)

        #Mouth detection on face
        smile2 = smile_cascade.detectMultiScale(
            roi_gray,
            scaleFactor= 1.15,
            minNeighbors=30,
            minSize=(25, 25))


    print("Gesicht",len(faces))
    print("Augen",len(eyes), "Augen inside", len(eyes2))
    print("Mund", len(smile),"Mund inside", len(smile2))  

    if len(faces)>=1 and len(smile2)>=1:
        # NOT wearing a mask --> stop!
        # NOTE: detection of face/smile alone is not a sufficent indicator for a no-mask
        return "nomask"

    elif len(faces)>=1 or len(eyes)+len(eyes2)>=2 or len(smile)+len(smile2)>=1:
        # COULD wear mask --> crop image and check 
        if cropped_face!= []:
            cv2.imwrite(path,cropped_face)
            print("saved")
        return "?"
    else:
        # WEARING a mask --> everything fine
        return "ok"
    
    
    
    

class hooks:
    def POST(self):
        data = web.data().decode('utf-8')
        print(data)
        path= os.path.dirname(__file__) + "/" + data
        
        #save original picture
        np.set_printoptions(suppress=True)
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        image = Image.open(path)
        
        facedetect=FaceDetection(os.path.dirname(__file__) + "/" + data)
        if facedetect=="ok": return 0
        # elif facedetect=="nomask": return 1
        
        picture=tf.keras.preprocessing.image.load_img(path , color_mode="rgb", target_size=(256,256), interpolation="nearest")
        array = tf.keras.preprocessing.image.img_to_array(picture)
        array = np.array([array])  # Convert single image to a batch.
        #predict = loaded_model.predict(array)[0]
        
        np.set_printoptions(suppress=True)
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
        image = Image.open(path)
        #resize the image to a 224x224 with the same strategy as in TM2:
        #resizing the image to be at least 224x224 and then cropping from the center
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.ANTIALIAS)
        image_array = np.asarray(image)
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        # Load the image into the array
        data[0] = normalized_image_array[:,:,0:3]
 
        
        predict=model.predict(array)[0]
        predict_2=model_2.predict(array)[0]
        predict_5=model_5.predict(array)[0]
        predict_TM=np.flip(model_TM.predict(data))                         
                
        predict= predict + predict_5 + 4*predict_TM
        predict_class = np.argmax(predict)
        predict_class = predict_class.tolist()
        print(predict_class)
        return predict_class

if __name__ == '__main__':
    os.environ['PORT'] = '8988'
    app.run()
