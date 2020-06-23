using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Hephaistos
{
    public class HephaistosDetector
    {
        private string _token;
        private readonly HttpClient client = new HttpClient();



        public HephaistosDetector(string token)
        {
            _token = token;

            client.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Token", _token);
        }



        public async Task<bool> MaskDetectFile(string file)
        {
            if (File.Exists(file)){

                byte[] stream = File.ReadAllBytes(file);
                return await MaskDetectStream(stream);
            }
            else{
                throw new FileNotFoundException("File not found", file);
            }
        }



        public async Task<bool> MaskDetectStream(byte[] stream)
        {
            var formData = new Dictionary<string, byte[]>
            {
                {"file", stream }
            };

            var content = new MultipartFormDataContent();
            content.Add(new ByteArrayContent(stream, 0, stream.Length), "file");

            var response = await client.PostAsync("https://api.hephaistos.online/api/hephaistos/detection", content);


            if(response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                throw new UnauthorizedAccessException("Invalid or Missing token");
            }
            else if(response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                // TODO: throw whatever
                throw new NotImplementedException();
            }
            else
            {
                var responseString = await response.Content.ReadAsStringAsync();
                if (responseString.Contains("true"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

    }
}
