import os
import csv
import random
import pandas



index_file = './index.csv'


def get_filtered_data(people_per_img: int = 1, with_mask: int = 1, no_mask: int = 0, unknown: int = 0, artificial_masks: bool = None, incomplete_data = False):
    """get a pandas.DataFrame

        None-arg is equivalent to don't care

    Keyword Arguments:
        people_per_img {int} -- no of people on the image (default: {1})
        with_mask {int} -- no of people with masks (default: {1})
        no_mask {int} -- no of people w/o masks (default: {0})
        unknown {int} -- no of people w/o clear indication (default: {0})
        artificial_masks {bool} -- specify if photoshopped masks are wanted (default: {None})
        incomplete_data {bool} -- allow data, where the attributes might not correctly reflect the content of the image (default: False)

    Raises:
        FileNotFoundError: when the index.csv could not be located

    Returns:
        single Dataframe, matching required filter
    """

    if not os.path.exists(index_file):
        raise FileNotFoundError(index_file + ' was not found. Check the README.md for instuctions on how to create this file')

    frame = pandas.read_csv(index_file, delimiter=';')

    # any attrib with None will not be filtered
    if not people_per_img is None:
        frame = frame.loc[frame['Persons'] == people_per_img]
    
    if not with_mask is None:
        frame = frame.loc[frame['With_Masks'] == with_mask]

    if not no_mask is None:
        frame = frame.loc[frame['Without_Masks'] == no_mask]

    if not unknown is None:
        frame = frame.loc[frame['Unknown'] == unknown]

    if not artificial_masks is None:
        frame = frame.loc[frame['Artificial_Mask'] == artificial_masks]

    if not incomplete_data is None:
        frame = frame.loc[frame['No_Index'] == 0]

    return frame
    


def get_training_and_validation(validation_split: float = 0.15, test_split: float = None, people_per_img: int = 1, with_mask: int = 1, no_mask: int = 0, unknown: int = 0, artificial_masks: bool = None, classifier = None):
    """get a pandas.DataFrame
        validation and training do not have euqal elements
        first index contains training images,
        second index contains validation images

        None-arg is equivalent to don't care or not existing

    Keyword Arguments:
        validation_split {float} -- pct. of images for second Tuple (default: {0.15})
        test_split {float} -- pct. of images for third Tuple (default: {None})
        people_per_img {int} -- no of people on the image (default: {1})
        with_mask {int} -- no of people with masks (default: {1})
        no_mask {int} -- no of people w/o masks (default: {0})
        unknown {int} -- no of people w/o clear indication (default: {0})
        artificial_masks {bool} -- specify if photoshopped masks are wanted (default: {None})

    Raises:
        ValueError: when validation_split and/or test_split are demanding impossible splits
        NotEnoughDataException: when training_cnt+validation_cnt is greater than the filtered dataset

    Returns:
        Tuple(frame_training, frame_validation, frame_test), ratio based on split parameters
        NOTE: due to float rounding errors, first index can yield elements, even when valid_split+test_split == 1
    """


    if validation_split and (validation_split > 1 or validation_split < 0):
        raise ValueError("validation_split must be within [0..1]")

    if test_split and (test_split > 1 or test_split < 0):
        raise ValueError("test_split must be within [0..1]")

    if validation_split and test_split:
        if (validation_split + test_split) > 1:
            raise ValueError("validation_split and test_split combined must be within [0..1]")
    

    frame = get_filtered_data(people_per_img, with_mask, no_mask, unknown, artificial_masks, False)

    # add column for class decision
    def class_from_data(row):
        if row['With_Masks']:
            return 'mask'
        else:
            return 'no_mask'

    # the caller can specify his own classifier function
    if classifier:
        frame['class'] = frame.apply(lambda row: classifier(row), axis=1)
    else:
        frame['class'] = frame.apply(lambda row: class_from_data(row), axis=1)



    # use to evade change of ratio, once first split was extracted
    total_imgs = len(frame)

    #NOTE: split == 0 will return empty frame, while split == None will return None
    if not validation_split is None:

        validation_cnt = int(total_imgs * validation_split)
        frame_valid = frame.sample(n=validation_cnt)

        # remove intersection of frame and frame_valid
        frame = pandas.concat([frame, frame_valid])
        frame = frame.drop_duplicates(keep=False)
    else:
        frame_valid = None
    

    if not test_split is None:

        test_cnt = int(total_imgs * test_split)
        frame_test = frame.sample(n=test_cnt)

        # remove intersection of frame and frame_valid
        frame = pandas.concat([frame, frame_test])
        frame = frame.drop_duplicates(keep=False)
    else:
        frame_test = None

    # the remaining percentage goes into training data
    frame_train = frame
    
    """
    frame = frame.drop(columns='Persons')
    frame = frame.drop(columns='With_Masks')
    frame = frame.drop(columns='Without_Masks')
    frame = frame.drop(columns='Unknown')
    frame = frame.drop(columns='Artificial_Mask')
    frame = frame.drop(columns='No_Index')
    """

    return frame_train, frame_valid, frame_test



"""
if __name__ == '__main__':
    train, valid, test = get_training_and_validation(validation_split=0.8, test_split = None, people_per_img = 1, with_mask=None, no_mask=None, unknown=0)
    print('x')
"""
