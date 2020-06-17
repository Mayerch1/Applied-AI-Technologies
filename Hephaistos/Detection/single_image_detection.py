"""
	 0 -- > keine Maske
	 1 --> Maske
"""
#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import sys 
import numpy as np
import os, sys
import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model

#print ('Number of arguments:', len(sys.argv), 'arguments.')
#print ('Argument List:', str(sys.argv))
#path=sys.argv[1]
#path="Mask_Datasets/Validation/No_mask/16028.PNG"


# In[ ]:


def main(path):    
    picture=tf.keras.preprocessing.image.load_img(
        path, grayscale=False, color_mode="rgb", target_size=(100,100), interpolation="nearest")



    array = tf.keras.preprocessing.image.img_to_array(picture)
    array= np.array([array])  # Convert single image to a batch.

    loaded_model = load_model(os.path.dirname(__file__) + '/saved_model')
    predict=loaded_model.predict(array)[0]
    predict_class = np.argmax(predict)
    predict_class = predict_class.tolist()
    return predict_class
	# 0 -- > keine Maske
	# 1 --> Maske


# In[ ]:


if __name__ == "__main__":
    if len(sys.argv)>1:
        print(main(sys.argv[1]))
    else:
        print("Error")
    


# In[ ]:


sys.argv


# In[ ]:






# %%
