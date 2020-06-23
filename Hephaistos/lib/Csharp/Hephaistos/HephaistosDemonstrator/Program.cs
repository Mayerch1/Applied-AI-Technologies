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
            var h = new Hephaistos.HephaistosDetector("[token]");
            Console.WriteLine(await h.MaskDetectFile(@"../../../../../../lib_demo_mask.jpg"));
        }

    }
}
