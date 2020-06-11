"""
	 >0 -- > keine Maske
	 <0 --> Maske
"""
#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import sys 
import numpy as np
from sklearn.model_selection import train_test_split
import os, sys
from PIL import Image
import matplotlib.pyplot as plt
import os
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, Dropout, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import save_model, load_model

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
    return loaded_model.predict(array)[0][0]
	# >0 -- > keine Maske
	# <0 --> Maske


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
