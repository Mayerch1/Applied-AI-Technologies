using System;
using System.IO;
using System.Threading.Tasks;
using Hephaistos;

namespace HephaistosDemonstrator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(Directory.GetCurrentDirectory());
            MainAsync().GetAwaiter().GetResult();
            
        }


        private static async Task MainAsync()
        {
            const string file = @"../../../../demo_mask.jpg";
            byte[] fileStream = File.ReadAllBytes(file);


            var h = new Hephaistos.HephaistosDetector("NWRiNzEyMmZiM2YwLTQ0YTUtOGIzYi0zNTY4MTZhZDI3ZDA=");

            bool authorized = await h.MaskDetectFile(file);
            bool authorizedStream = await h.MaskDetectStream(fileStream);

            Console.WriteLine("Detection with file " + authorized);
            Console.WriteLine("Detection with stream " + authorizedStream);
        }

    }
}
