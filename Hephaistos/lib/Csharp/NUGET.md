## HEPHAISTOS C# library

This library can be used to acess the public library of the HEPHAISTOS Mask detection service at https://www.hephaistos.online.

An account and a token are needed to use this api.



Usage:
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