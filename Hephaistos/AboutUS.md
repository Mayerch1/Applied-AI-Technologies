# HEPAHISTOS
#### Heuristic epidermological pandemic hypercrisis Advanced Mask Detection internet supported tensorflow operational service


![LOGO](https://raw.githubusercontent.com/Mayerch1/Applied-AI-Technologies/master/Hephaistos/res/logo.png)


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


### `C#`

[![Nuget](https://img.shields.io/nuget/v/Hephaistos)](https://www.nuget.org/packages/Hephaistos/)

Available at [Nuget](https://www.nuget.org/packages/Hephaistos/)

```c#
    using Hephaistos;

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

\[tbd\]





