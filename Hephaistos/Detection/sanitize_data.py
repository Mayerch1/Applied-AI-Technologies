import os
import csv

import kaggle

#TODO: check the https://www.kaggle.com/abuanas/masked-face-detection-wider-dataset


data_dir = './data/'

# each entry is tuple of download url and the root folder of the download
# root directory is not dependend on kaggle dataset, might lead to singlular child elements
datasets = [('ahmetfurkandemr/mask-datasets-v1', 'Mask_Dataset_v1'),
            ('niharika41298/withwithout-mask', 'With_Without'),
            ('shreyashwaghe/face-mask-dataset','Face_Mask_Dataset'),
            ('omkar1008/covid19-mask-detection', 'covid19_mask_detection'),
            ('kiranbeethoju/face-mask-and-kerchief','face_mask_kerchief'),
            ('ashishjangra27/face-mask-12k-images-dataset', 'face_mask_12k'),
            ('andrewmvd/animal-faces', 'animal_faces')]



#===========================
# download data from kaggle
#==========================
def download_dataset():
    kaggle.api.authenticate()

    for dset in datasets:
        if not os.path.exists(data_dir + dset[1]):
            print('downloading ' + dset[0], '...')

            d_path = data_dir + dset[1]
            kaggle.api.dataset_download_files(dset[0], path=d_path, unzip=True)
        else:
            print(dset[0] + ' already on disk')


#===========================
# categorize data
#==========================

def cat_mask_v1(wr):
    # the dataset mask_datasest_v1 contains only imgs with 1 person
    # all images with mask are within 'Mask' and others are in No_mask
    path = data_dir + 'Mask_Dataset_v1/'
    for (dirpath, _, filenames) in os.walk(path):
        if filenames:
            # based on windows/unix, the delimiter can be different
            delimiter = '/'
            if dirpath.rfind('/') < dirpath.rfind('\\'):
                delimiter = '\\'

            mask_present = (dirpath.rsplit(delimiter, 1)[1] == 'Mask')
            for img in filenames:
                # either one persion with and one p without, or vice versa
                # there are no unknown sources in here
                with_m = int(mask_present == True)
                wo_m = int(mask_present == False)
                wr.writerow([dirpath + '/' + img, '1', with_m, wo_m, '0', '0', '0'])


def cat_withwithout_mask(wr):
    path = data_dir + 'With_Without/'
    # the dataset is again divided in with_mask and without_mask
    # data/train separation is ignored
    for (dirpath, _, filenames) in os.walk(path):
        if filenames:

            # based on windows/unix, the delimiter can be different
            delimiter = '/'
            if dirpath.rfind('/') < dirpath.rfind('\\'):
                delimiter = '\\'

            img_cat = dirpath.rsplit(delimiter, 1)[1]
            mask_present = (img_cat == 'with_mask') or (img_cat == '1')
            for img in filenames:
                # this pack uses photoshoped masks
                # either one persion with and one p without, or vice versa
                # there are no unknown sources in here
                with_m = int(mask_present == True)
                wo_m = int(mask_present == False)
                wr.writerow([dirpath + '/' + img, '1', with_m, wo_m, '0', '1', '0'])


def cat_face_mask_dataset(wr):
    path = data_dir + 'Face_Mask_Dataset/'
    data_rows = []

    # read the delivered csv file
    with open(path + 'Face mask dataset/train_labels.csv', 'r') as csv_in:
        rd = csv.reader(csv_in, delimiter=',')
        next(rd) # skip header row
        for row in rd:
            data_rows.append(row)

    for data in data_rows:
        img = path + 'Images/' + data[0]
        metadata = data[1].split(' ')

        face_cnt = len(list(filter(lambda x: 'Face' in x, metadata)))
        mask_cnt = len(list(filter(lambda x: 'Face-masked' in x, metadata)))
        unkwn_cnt = len(list(filter(lambda x: 'Face-unknown' in x, metadata)))
        no_mask = face_cnt - mask_cnt - unkwn_cnt

        wr.writerow([img, face_cnt, mask_cnt, no_mask, unkwn_cnt, '0', '0'])




def cat_covid19_mask_list(wr):
    # ignore yolo format for now
    path = data_dir + 'covid19_mask_detection/data/'

    for (dirpath, _, filenames) in os.walk(path):
        if filenames and not dirpath.endswith('coodinate_file'):
            # again divided in mask/no mask
            mask_present = (dirpath.endswith('mask_with_coodinate'))

            # these files are in the 'mask' folder but do not wear the mask up to the regulations
            for img in filenames:
                if img == '[www.shutterstock.com][24]coronavirus-covid19-concept-unhealthy-asian-260nw-1667230213.jpg' \
                    or img == '[www.shutterstock.com][59]man-medical-face-mask-wrong-260nw-1683255184.jpg' \
                    or img == '[www.shutterstock.com][63]studio-portrait-asia-young-woman-260nw-1671766624.jpg':
                    mask_present = False

                # only real masks in this dataset
                # either one persion with and one p without, or vice versa
                # there are no unknown sources in here
                with_m = int(mask_present == True)
                wo_m = int(mask_present == False)
                wr.writerow([dirpath + '/' + img, '1', with_m, wo_m, '0', '0', '0'])


def cat_mask_kerchief(wr):
    path = data_dir + 'face_mask_kerchief/'


    for (dirpath, _, filenames) in os.walk(path):
        if filenames and dirpath.endswith('data'):
            # this set contains only mask images
            # every image has an descriptive txt with it

            for img in filenames:
                # only images
                if img.endswith('.txt'):
                    continue

                # these images are not usefull
                if img == '27.jpeg':
                    continue

                artificial = '0'

                # these imgaes are computer generated
                if img == '34.jpeg':
                    artificial = '1'

                # open the matching index file 
                # count the number of lines
                # this is the cnt of detected masks
                mask_cnt = len(open(dirpath + '/' + img.split('.', 1)[0] + '.txt', 'r').readlines())


                wr.writerow([dirpath + '/' + img, '-1', mask_cnt, '-1', '-1', artificial, '1'])

def cat_face_mask_12k(wr):
    path = data_dir + 'face_mask_12k'

    for (dirpath, _, filenames) in os.walk(path):
        if filenames:
            if dirpath.endswith('WithMask'):
                mask_cnt = 1
                no_mask = 0
            elif dirpath.endswith('WithoutMask'):
                mask_cnt = 0
                no_mask = 1


            for img in filenames:
                
                if not os.path.splitext(img)[0].isnumeric():
                    # augmentation is done by our notebook
                    continue

                # artificial state is unknown
                wr.writerow([dirpath + '/' + img, '1', mask_cnt, no_mask, 0, -1, 0])


def cat_animal_faces(wr):
    path = data_dir + 'animal_faces'
    count = 0
    used = 0
    for (dirpath, _, filenames) in os.walk(path):
        if filenames:
            for img in filenames:
                if (count % 60) == 0:
                    wr.writerow([dirpath + '/' + img, '0', '0', '0', '0', '0', '0'])
                    used += 1
                count += 1

    print('{:d}/{:d}'.format(used, count))




def cat_data():
    with open('index.csv', 'w', newline='\n') as csv_file:
        wr = csv.writer(csv_file, delimiter=';')
        wr.writerow(['Path', 'Persons', 'With_Masks', 'Without_Masks', 'Unknown', 'Artificial_Mask', 'No_Index'])
        
        cat_mask_v1(wr)
        cat_withwithout_mask(wr)
        cat_face_mask_dataset(wr)
        cat_covid19_mask_list(wr)
        cat_mask_kerchief(wr)
        cat_face_mask_12k(wr)
        cat_animal_faces(wr)
        



if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    download_dataset()
    cat_data()
