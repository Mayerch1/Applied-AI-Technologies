import os
import csv
import random
import pandas


class NotEnoughDataException(Exception):
    pass


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
        NotEnoughDataException: when training_cnt+validation_cnt is greater than the filtered dataset

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
    


def get_training_and_validation(people_per_img: int = 1, with_mask: int = 1, no_mask: int = 0, unknown: int = 0, artificial_masks: bool = None, classifier = None):
    """get a pandas.DataFrame
        validation and training do not have euqal elements
        first index contains training images,
        second index contains validation images

        None-arg is equivalent to don't care

    Keyword Arguments:
        people_per_img {int} -- no of people on the image (default: {1})
        with_mask {int} -- no of people with masks (default: {1})
        no_mask {int} -- no of people w/o masks (default: {0})
        unknown {int} -- no of people w/o clear indication (default: {0})
        artificial_masks {bool} -- specify if photoshopped masks are wanted (default: {None})

    Raises:
        NotEnoughDataException: when training_cnt+validation_cnt is greater than the filtered dataset

    Returns:
        single Dataframe, check index ['With_Masks'], ['Without_Masks'] for 
    """

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

    frame = frame.drop(columns='Persons')
    frame = frame.drop(columns='With_Masks')
    frame = frame.drop(columns='Without_Masks')
    frame = frame.drop(columns='Unknown')
    frame = frame.drop(columns='Artificial_Mask')
    frame = frame.drop(columns='No_Index')


    return frame

def get_training_and_validation_list(people_per_img: int = 1, with_mask: int = 1, no_mask: int = 0, unknown: int = 0, training_cnt: int= 250, validation_cnt: int = 50, artificial_masks: bool = None, seed=None):
    """get a tuple with a list of paths
        validation and training do not have euqal elements
        first index contains training images,
        second index contains validation images

        arg = None is equivalent to don't care

    Keyword Arguments:
        people_per_img {int} -- no of people on the image (default: {1})
        with_mask {int} -- no of people with masks (default: {1})
        no_mask {int} -- no of people w/o masks (default: {0})
        unknown {int} -- no of people w/o clear indication (default: {0})
        training_cnt {int} -- no of images in first index (default: {250})
        validation_cnt {int} -- no of images on second index (default: {50})
        artificial_masks {bool} -- specify if photoshopped masks are wanted (default: {None})
        seed {[type]} -- generator seed for reproducible results, None for random (default: {None})

    Raises:
        ValueError: when training_cnt, validation_cnt is None or negative
        NotEnoughDataException: when training_cnt+validation_cnt is greater than the filtered dataset

    Returns:
        tuple([str], [str]) -- tuple with lists of training/valid. image paths
    """

    raise NotImplementedError('Use get_training_and_validation')

    if training_cnt is None or training_cnt < 0:
        raise ValueError('training_cnt needs to be a positive number')

    if validation_cnt is None or validation_cnt < 0:
        raise ValueError('validation_cnt needs to be a positive number')

    data_rows = []
    with open(index_file, 'r') as csv_in:
        rd = csv.reader(csv_in, delimiter=';')
        next(rd)  # skip header row
        for row in rd:
            data_rows.append(row)

    # only allow data which are directly indexed
    data_rows = list(filter(lambda d: d[6] == '0', data_rows))

    if people_per_img:
        data_rows = list(
            filter(lambda d: d[1] == str(people_per_img), data_rows))

    if with_mask:
        data_rows = list(filter(lambda d: d[2] == str(with_mask), data_rows))

    if no_mask:
        data_rows = list(filter(lambda d: d[3] == str(no_mask), data_rows))

    if unknown:
        data_rows = list(filter(lambda d: d[4] == str(unknown), data_rows))

    if not artificial_masks:
        data_rows = list(filter(lambda d: d[5] == '0', data_rows))

    # make sure that enough data is available
    if len(data_rows) < (training_cnt + validation_cnt):
        raise NotEnoughDataException(
            'The dataset can only deliver {:d} combined entries after applying the requested rules'.format(len(data_rows)))


    if not seed is None:
        random.seed(seed)


    training = random.sample(data_rows, training_cnt)

    # filter all data which have been selected for training
    data_rows = list(filter(lambda d: not d in training, data_rows))

    validation = random.sample(data_rows, validation_cnt)

    training = [x[0] for x in training]
    validation = [x[0] for x in validation]

    return (training, validation)



def get_random_images(allow_no_index=True, seed=None):
    """Not implemented
    """
    raise NotImplementedError('Use get_training_and_validation')


if __name__ == '__main__':
    frame = get_training_and_validation(people_per_img = 1, with_mask=None, no_mask=None, unknown=0)
    print(len(frame))
    print(frame)
    print('x')
