import os
import csv
import random


class NotEnoughDataException(Exception):
    pass


index_file = './index.csv'

def get_training_and_validation(people_per_img: int = 1, with_mask: int = 1, no_mask: int = 0, unknown: int = 0, training_cnt: int= 250, validation_cnt: int = 50, allow_artificial: bool = True, seed=None):
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
        allow_artificial {bool} -- specify if photoshopped masks are allowed (default: {True})
        seed {[type]} -- generator seed for reproducible results, None for random (default: {None})

    Raises:
        ValueError: when training_cnt, validation_cnt is None or negative
        NotEnoughDataException: when training_cnt+validation_cnt is greater than the filtered dataset

    Returns:
        tuple([str], [str]) -- tuple with lists of training/valid. image paths
    """

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

    if not allow_artificial:
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
    x, y = get_training_and_validation()
    print('x')
