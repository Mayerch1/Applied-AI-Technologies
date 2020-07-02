# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %% [markdown]
# # Import

# %%
import numpy as np
#from sklearn.model_selection import train_test_split
#import os, sys
from PIL import Image
import matplotlib.pyplot as plt
from collections import Counter

#import tensorflow as tf
#from tensorflow import keras
import tensorflow as tf;
from tensorflow.keras.losses import BinaryCrossentropy
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, Dropout, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint,EarlyStopping, ReduceLROnPlateau

from get_dataset import get_training_and_validation

from tensorflow.keras.models import save_model, load_model

tf.debugging.set_log_device_placement(True)
# %% [markdown]
# # Load Data

# %%
batch_size = 64
epochs = 50
IMG_HEIGHT = 256
IMG_WIDTH = 256
test = tf.config.list_physical_devices('GPU')
tf.config.set_visible_devices(test[0:], 'GPU')
logical_devices = tf.config.list_logical_devices('GPU')

print("Num GPUs Available: ", len(tf.config.experimental.list_physical_devices('GPU')))
with tf.device('/GPU:0'):

# make sure to write own classifier-function in next cell
# if num_classes is greater than 2


    # %%
    # this filter allows all combination with exactly 1 human on it
    # artificial masks (photoshop, cg), are not distinguished

    # this implicite sets the ['class'] as follows:
    #   with_mask >= 1 -> 'mask'
    #   with_mask == 0 -> 'no_mask'
    #  classifier-attribute can be set to own function for matching data-rows into classes
    frame = get_training_and_validation(people_per_img = 1, with_mask=None, no_mask=None, unknown=0,validation_split=0.15 ,test_split=0.1)

    train_frame=frame[0]
    val_frame=frame[1]
    test_frame=frame[2]


    print('Filter returned {:d} train images'.format(len(train_frame)))
    print(Counter(train_frame['class']))
    print('Filter returned {:d} valid images'.format(len(val_frame)))

    print('Filter returned {:d} test images'.format(len(test_frame)))

        
    num_classes = len(Counter(train_frame['class']))

    # # Data preparation
    def get_data_generator(image_generator, frame, shuffle=True):
        return image_generator.flow_from_dataframe(frame, directory='./', x_col='Path', y_col='class', color_mode="rgb",
                                                    batch_size = batch_size, shuffle=shuffle, target_size=(IMG_HEIGHT, IMG_WIDTH), class_mode='categorical')



    # generator for all data
    image_generator = ImageDataGenerator(
                        rescale=1./255,
                        rotation_range=15,
                        width_shift_range=.15,
                        height_shift_range=.15,
                        horizontal_flip=True,
                        zoom_range=0.2
                        )
    image_generator_test = ImageDataGenerator(rescale=1./255)


    train_data_gen = get_data_generator(image_generator, train_frame)

    validation_data_gen = get_data_generator(image_generator_test, val_frame)


    sample_training_images, _ = next(train_data_gen)


    # This function will plot images in the form of a grid with 1 row and 5 columns where images are placed in each column.
    def plotImages(images_arr):
        fig, axes = plt.subplots(1, 5, figsize=(20,20))
        axes = axes.flatten()
        for img, ax in zip( images_arr, axes):
            ax.imshow(img,interpolation='none')
            ax.axis('off')
        plt.tight_layout()
        plt.show()


    plotImages(sample_training_images[:5])

    # # Create the model

    model = Sequential([
        Conv2D(32, 3, padding='same', strides=2,activation='relu', input_shape=(IMG_HEIGHT, IMG_WIDTH ,3)),
        MaxPooling2D(),
        Conv2D(64, 3, padding='same', strides=2,activation='relu'),
        MaxPooling2D(),
        Conv2D(64, 3, padding='same', strides=2,activation='relu'),
        MaxPooling2D(),
        Flatten(),
        Dense(512, activation='relu'),
        Dense(num_classes, activation='softmax')
    ])




    #resnet_weights_path = '../input/resnet50/resnet50_weights_tf_dim_ordering_tf_kernels_notop.h5'
    #model = Sequential()
    #model.add(ResNet50(include_top=False, pooling='avg', weights='imagenet'))
    ##model.add(Dense(num_classes, activation='softmax'))
    #model.add(Dense(512, activation='relu'))
    #model.add(Dense(1))
    #model.layers[0].trainable = False

    model.compile(optimizer='adam',
                loss=BinaryCrossentropy(from_logits=True),
                metrics=['accuracy']) #TODO: maype 'acc' instead of 'accuracy'


    model.summary()

    # # Train the model



    image_gen = ImageDataGenerator(rescale=1./255, horizontal_flip=True,width_shift_range=.15,
                        height_shift_range=.15,)

    train_data_gen = get_data_generator(image_gen, train_frame)


    image_gen = ImageDataGenerator(rescale=1./255, rotation_range=15)

    train_data_gen = get_data_generator(image_gen, train_frame)



    train_data_gen = get_data_generator(image_gen, train_frame)

 





    train_data_gen = get_data_generator(image_generator, train_frame)

    validation_data_gen = get_data_generator(image_generator_test, val_frame)


    augmented_images = [train_data_gen[0][0][0] for i in range(5)]
    plotImages(augmented_images)

    model_new = Sequential([
        Conv2D(32, 3, padding='same', activation='relu', 
            input_shape=(IMG_HEIGHT, IMG_WIDTH ,3)),
        MaxPooling2D(),
        Conv2D(64, 3, padding='same', strides=2, activation='relu'),
        MaxPooling2D(),
        Dropout(0.2),
        Conv2D(128, 3, padding='same', strides=2, activation='relu'),
        MaxPooling2D(),
        Dropout(0.2),
        Flatten(),
        Dense(512, activation='relu'),
        Dropout(0.3),
        Dense(64, activation='relu'),
        Dropout(0.3),
        Dense(num_classes, activation='softmax')
    ])


    model_new.compile( optimizer='rmsprop',
                    loss='binary_crossentropy',#tf.keras.losses.BinaryCrossentropy(from_logits=True),
                    metrics=['accuracy'])

    model_new.summary()


    checkpoint_filepath = './tmp/model_checkpoint'

    model_checkpoint_callback = ModelCheckpoint(
        filepath=checkpoint_filepath,
        save_weights_only=True,
        monitor='val_accuracy',
        mode='max',
        save_best_only=True)

    earlyStopping = EarlyStopping(monitor='val_loss', patience=15, verbose=1, mode='min')

    reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=4, verbose=1,
                                cooldown=0, mode='auto',min_delta=0.0001, min_lr=0)


    #model_new.fit_generator?


    history = model_new.fit(
        train_data_gen,
        #steps_per_epoch=len(train_data_gen),
        epochs=epochs,
        validation_data=validation_data_gen,
        #validation_steps=len(validation_data_gen),
        callbacks=[model_checkpoint_callback,earlyStopping,reduce_lr]
    )
    #model_new.load_weights(checkpoint_filepath)


    acc = history.history['accuracy']
    val_acc = history.history['val_accuracy']

    loss = history.history['loss']
    val_loss = history.history['val_loss']

    epochs_range = range(len(acc))

    plt.figure(figsize=(8, 8))
    plt.subplot(1, 2, 1)
    plt.plot(epochs_range, acc, label='Training Accuracy')
    plt.plot(epochs_range, val_acc, label='Validation Accuracy')
    plt.legend(loc='lower right')
    plt.title('Training and Validation Accuracy')

    plt.subplot(1, 2, 2)
    plt.plot(epochs_range, loss, label='Training Loss')
    plt.plot(epochs_range, val_loss, label='Validation Loss')
    plt.legend(loc='upper right')
    plt.title('Training and Validation Loss')
    plt.show()


    test_data_gen = get_data_generator(image_generator_test, test_frame, shuffle=False)


    from sklearn.metrics import classification_report, confusion_matrix
    model_new.load_weights(checkpoint_filepath)
    used_model=model_new

    total_test=len(test_frame)

    Y_pred = used_model.predict(test_data_gen)#, steps=total_test // batch_size+1)
    predict_class = np.argmax(Y_pred, axis=1)
    predict_class = predict_class.tolist()

    ausgabe=0
    if ausgabe:
        print('Predict\n',predict_class)
        print('Klassen\n',test_data_gen.classes)
        classes_table=[int(i=='no_mask') for i in test_frame['class'].tolist()]
        print('Klassen Tabelle\n', classes_table)
        print(test_frame['class'].tolist())


    print('Confusion Matrix')
    print(confusion_matrix(test_data_gen.classes, predict_class))
    print('Classification Report')
    target_names = ['Mask','NoMask']
    print(classification_report(test_data_gen.classes, predict_class, target_names=target_names))


    from tensorflow.keras.models import save_model, load_model
    used_model.save('saved_model')
    #used_model.save('saved_model_test')






