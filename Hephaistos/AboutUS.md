# HEPAHISTOS
#### Heuristic epidermological pandemic hypercrisis Advanced Mask Detection internet supported tensorflow operational service


![LOGO](https://raw.githubusercontent.com/Mayerch1/Applied-AI-Technologies/master/Hephaistos/res/logo.png)


---

![GitHub](https://img.shields.io/github/license/mayerch1/Applied-AI-Technologies)

Facing the current pandemic is a hard task, challenging all of humanity. At the current phase of the Covid-19 pandemic it is more important than ever to find and stop any newly emerging chains of infection. 

However many people do not support these governmental regulations and enforcing every customer to wear a mask requires valuable workforce, as possible fines are very high.


HEPHAISTOS steps in, by providing an API for detecting people without masks on any image (e.g. surveillance  cameras). After you upload your image or camera feed, the images are processed internally using machine learning algorithms. As we have developed our own mask-detection model ignoring unique facial features, it is ensured that our system is not abused for tracking specific individuals.

For an easy upload of images in 'production', we are offering a public API, where you can upload images program driven.


## Client Libraries

[![GitHub release](https://img.shields.io/github/release/mayerch1/Applied-AI-Technologies)](https://github.com/mayerch1/Applied-AI-Technologies/releases/latest)


We are offering the following written client libraries, for fast deployment.

If you are not satisfied with our collection, you can always write your own implementation by following our swagger/OpenAPI definition [swagger.yaml](https://github.com/Mayerch1/Applied-AI-Technologies/tree/master/Hephaistos/lib/swagger.yaml). 

If you hand in your own library by creating a [pull request](https://github.com/Mayerch1/Applied-AI-Technologies/pulls) on our repository with your changes, we are considering adding it into this project (given you are using the MIT license), and might even reward you with a free upgrade into a higher rate limit.

##### Token
Before using the libraries, you need to create your personal API-Token. Simply login to your account, navigate into the `Settings` section and generate your Token.

All libraries can be downloaded as [release](https://github.com/mayerch1/Applied-AI-Technologies/releases/latest) on the repository of this project.
The libraries are published under the MIT license for easy integration. This is ONLY valid for the libraries and NOT for other parts of this website/project.



### Python

The python library is distributed as simple python file, which can be imported into any project.
A fully working example, using a webcam feed, can be found in the sources at [HephaistosDemonstrator.py](https://github.com/Mayerch1/Applied-AI-Technologies/blob/master/Hephaistos/lib/Python/HephaistosDemonstrator.py)

```python

from Hephaistos import HephaistosDetector

api = HephaistosDetector("token")
result = api.mask_detect_file("../my_file.jpg")
print('Person is wearing a mask? ' + str(result))
```



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


### Curl

The curl request can be executed from within your shell or within any script you have written.

```bash
curl -X POST "https://api.hephaistos.online/api/hephaistos/detection" -H  "accept: application/json" -H  "Authorization: Token [insert_token]" -H  "Content-Type: multipart/form-data" -F "file=@image.png;type=image/png"
```



### C/Assembly

Coming soon...
