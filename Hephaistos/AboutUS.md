# HEPAHISTOS
#### Heuristic epidermological pandemic hypercrisis Advanced Mask Detection internet supported tensorflow operational service


![LOGO](https://raw.githubusercontent.com/Mayerch1/Applied-AI-Technologies/master/Hephaistos/res/logo.png)


---

![GitHub](https://img.shields.io/github/license/mayerch1/Applied-AI-Technologies)

This service offers an API for detecting people not wearing masks in public areas.

...

...



## Client Libraries

[![GitHub release](https://img.shields.io/github/release/mayerch1/Applied-AI-Technologies)](https://github.com/mayerch1/Applied-AI-Technologies/releases/latest)

Before using the libraries, you need to create your personal API-Token. Simply login to your account, navigate into the `Settings` section and generate your Token.

All libraries can be downloaded as [release](https://github.com/mayerch1/Applied-AI-Technologies/releases/latest) on the repository of this project.
The libraries are published under the MIT license for easy integration. This is ONLY valid for the libraries and NOT for other parts of this website/project.

The Swagger/OpenAPI definition can be found [here](https://github.com/Mayerch1/Applied-AI-Technologies/tree/master/Hephaistos/lib/swagger.yaml)


### C# / .NET Standard

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
A more complex example, using a webcam feed can be found in the sources at [HephaistosDemonstrator.py](https://github.com/Mayerch1/Applied-AI-Technologies/blob/master/Hephaistos/lib/Python/HephaistosDemonstrator.py)

```python

from Hephaistos import HephaistosDetector

api = HephaistosDetector("token")
result = api.mask_detect_file("../my_file.jpg")
print('Person is wearing a mask? ' + str(result))

```

### Curl

The curl request can be executed from within your shell or within any script you have written.
In the following exapmle the token is `[insert_token]` while the word `Token` should not be replaced by yourself

```bash
curl -X POST "https://api.hephaistos.online/api/hephaistos/detection" -H  "accept: application/json" -H  "Authorization: Token [insert_token]" -H  "Content-Type: multipart/form-data" -F "file=@image.png;type=image/png"
```



### C/Assembly

Coming soon...
