<img src="res/logo.png" alt="drawing" style="width:200px;"/>

# HEPAHISTOS
#### Heuristic epidermological pandemic hypercrisis Advanced Mask Detection internet supported tensorflow operational service

---

This service offers an API for detecting people not wearing masks in public areas.

This repo is divided into 2 different parts, ```rest``` and ```detection```, both responsible for the API and detection part of this service.



---
## Dataset Management

The dataset is managed with two provided python scripts.

To start an automatic download, run [get_dataset.py](Detection/get_dataset.py) with your favorite python interpreter. All files will be saved into the [data](Detection/data) folder and are indexed into the file [index.csv](Detection/index.csv). Every image is stored with important metadata like number of persons with and without masks.

The script needs your kaggle login stored in _$HOME/.kaggle/kaggle.json_, which can be retreived at https://www.kaggle.com/{username}/account



Currently used datasets are
* [Mask Datasets V1](https://www.kaggle.com/ahmetfurkandemr/mask-datasets-v1)
* [With/Without Mask](https://www.kaggle.com/niharika41298/withwithout-mask)
* [Face mask dataset](https://www.kaggle.com/shreyashwaghe/face-mask-dataset)
* [covid-19_mask_detection](https://www.kaggle.com/omkar1008/covid19-mask-detection)
* [face_mask_and_kerchief](https://www.kaggle.com/kiranbeethoju/face-mask-and-kerchief)


---

## Working with the dataset

The script [get_dataset.py](Detection/get_dataset.py) reads the previously generated ```index.csv``` in order to deliver images matching the required criteria.

The script can be used in any python script or notebook

```python 
from get_dataset import get_training_and_validation

training, validation = get_training_and_validation()
```

The function uses multiple keywords to customize the query. 
If a keyword is set to None, it is considered to be don't care

| keyword           | usage                                 | default |
|---------          |-------                                |---------|
| people_per_img    | n° of people per img                  | 1       |
| with_mask         | .. of it with mask                    | 1       |
| no_mask           | .. of it w/o mask                     | 0       |
| unknown           | .. of it with unknown state           | 0       |
| training_cnt      | n° of images in 1st tuple index       | 250     |
| validation_cnt    | n° of images in 2nd tuple index       | 50      |
| allow_artificial  | allow computer generated masks/imgs   | True    |
| seed              | specify seed, None for random         | None    |


The return value is a tuple containing 2 lists. 
```(list[str], list[str])```, each list is only consisting of paths to the chosen image

The function can throw a ```NotEnoughDataException``` if the filter cuts out too many images to deliver the requested amount of ```training_cnt + validation_cnt```

It is recommended to call the function two times, once for mask images and once for images without masks







