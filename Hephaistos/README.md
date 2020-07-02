![LOGO](https://raw.githubusercontent.com/Mayerch1/Applied-AI-Technologies/master/Hephaistos/res/logo.png)

# HEPAHISTOS
#### Heuristic epidermological pandemic hypercrisis Advanced Mask Detection internet supported tensorflow operational service

---

![GitHub](https://img.shields.io/github/license/mayerch1/Applied-AI-Technologies)

This service offers an API for detecting people not wearing masks in public areas.

This repo is divided into different parts, `Detection`, `rest`, `website` and ```lib```, responsible for the API/Website and detection part of this service.

The `lib` folder holds client libraries for directly accessing the API.

---

## Client Libraries

[![GitHub release](https://img.shields.io/github/release/mayerch1/Applied-AI-Technologies)](https://github.com/mayerch1/Applied-AI-Technologies/releases/latest)

All libraries can be downloaded at the [releases](https://github.com/mayerch1/Applied-AI-Technologies/releases/latest) of this repository.
The libraries are published under the MIT license for easy integration. This is ONLY valid for code within the [Hephaistos/lib](lib) folder and does not affect the license of the rest of this repository


### C#

[![Nuget](https://img.shields.io/nuget/v/Hephaistos)](https://www.nuget.org/packages/Hephaistos/)

Available at [Nuget](https://www.nuget.org/packages/Hephaistos/)

```c#
    using using Hephaistos;

    /*
    ...
    */

    var h = new Hephaistos.HephaistosDetector("[token]");

    // use a file on the filesystem
    string file = "../myFile.jpg";
    bool authorized = await h.MaskDetectFile(file);
    Console.WriteLine("The person wears a mask? " + authorized);

    // use a bytestream
    // in this example from a file, but could be from a webcam
    byte[] fileStream = File.ReadAllBytes("../myFile.jpg");
    bool authorizedStream = await h.MaskDetectStream(fileStream, "myFile.jpg");
    Console.WriteLine("The person wears a mask? " + authorizedStream);
```


### Python

The python library is distributed as simple python file, which can be imported into any project.
A more complex example, using a webcam feed can be found in the sources at [HephaistosDemonstrator.py](lib/Python/HephaistosDemonstrator.py)

```python

from Hephaistos import HephaistosDetector

api = HephaistosDetector("token")
result = api.mask_detect_file("../my_file.jpg")
print('Person is wearing a mask? ' + str(result))

```


### C/Assembly

[tbd]


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
* [Face Mask ~12K Images Dataset](https://www.kaggle.com/ashishjangra27/face-mask-12k-images-dataset)


---

## Working with the dataset

The script [get_dataset.py](Detection/get_dataset.py) reads the previously generated ```index.csv``` in order to deliver images matching the required criteria.

The script can be used in any python script or notebook

```python 
from get_dataset import get_training_and_validation

training, validation, test = get_training_and_validation()
```

The function uses multiple keywords to customize the query. 
If a keyword is set to None, it is considered to be don't care

| keyword           | usage                                 | default |
|---------          |-------                                |---------|
| validation_split  | pct. of validation data               | 0.15    |
| test_split        | pct. of test data                     | None    |
| people_per_img    | n° of people per img                  | 1       |
| with_mask         | .. of it with mask                    | None    |
| no_mask           | .. of it w/o mask                     | None    |
| unknown           | .. of it with unknown state           | 0       |
| artificial_masks  | allow computer generated masks/imgs   | None    |
| classifier        | classify data with custom pattern     | None    |


The return value is a tuple containing 3 dataframess. 
```(pandas.Dataframe, pandas.Dataframe, pandas.Dataframe)```, each frame holds a unique set of images. If the split was set to `None` the corresponding frame will be `None` aswell.

To use the frames as image generator, set `x_col='Path'` and `y_col='class'`


The automatic generated classes are ```mask``` and ```no_mask```. This does only makes sense, as long as ```people_per_img == 1```. In any other case, a custom function should be passed as the keyword  ```classifier```. The function will get a `row` as argument, which is to be treated as a `dict` with each columns of the ```index.csv``` as keys. The function shall then return a `str` holding the resulting `class` of that specific row.


* The function can throw a ```FileNotFoundError``` if the `index.csv` was not generated yet.
* The funciton can throw a ```ValueError``` when the given splits (`validation_split`, `test_split`) demand an impossible split







