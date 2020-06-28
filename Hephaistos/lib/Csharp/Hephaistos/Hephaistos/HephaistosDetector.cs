using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Hephaistos
{
    /// <summary>
    /// Detect people not wearing a mask on given images or byte-streams
    /// </summary>
    public class HephaistosDetector
    {
        private readonly string _token;
        private readonly HttpClient client = new HttpClient();



        /// <summary>
        /// Object used for executing mask detection against the api
        /// Holds the token in an object-specific HttpClient
        /// Token is only checked for validity at each api call
        /// </summary>
        /// <param name="token">API-Token</param>
        public HephaistosDetector(string token)
        {
            _token = token;

            client.DefaultRequestHeaders.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Token", _token);
        }



        /// <summary>
        /// Validate an image of the filesystem against the server-api.
        /// Determins if the person(s) on the image wear a mask.
        /// </summary>
        /// <param name="file">path to the image, can be absolute or relative</param>
        /// <exception cref="UnauthorizedAccessException">used when the token is invalid</exception>
        /// <exception cref="HttpRequestException">general connection issue</exception>
        /// <exception cref="FileNotFoundException">the given path does not direct to an existing image</exception>
        /// <returns>isAuthorized, true when all persons wear a mask.</returns>
        public async Task<bool> MaskDetectFile(string file)
        {
            if (!File.Exists(file)) {
                throw new FileNotFoundException("File not found", file);
            }


            string name = Path.GetFileName(file);
            byte[] stream = File.ReadAllBytes(file);

            return await MaskDetectStream(stream, name);
            
        }


        /// <summary>
        /// Validate an image byteStream against the server-api.
        /// Determins if the person(s) on the image wear a mask.
        /// </summary>
        /// <param name="stream">bytestream of the image</param>
        /// <param name="fileName">file name, does not need to match the name of the used file</param>
        /// <exception cref="UnauthorizedAccessException">used when the token is invalid</exception>
        /// <exception cref="HttpRequestException">general connection issue</exception>
        /// <returns>isAuthorized, true when all persons wear a mask.</returns>
        public async Task<bool> MaskDetectStream(byte[] stream, string fileName = "file.jpg")
        {

            var content = new MultipartFormDataContent
            {
                { new ByteArrayContent(stream, 0, stream.Length), "file", fileName }
            };

            var response = await client.PostAsync("https://api.hephaistos.online/api/hephaistos/detection", content);


            if(response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                throw new UnauthorizedAccessException("Invalid or Missing token. Check the token of your user at https://www.hephaistos.online");
            }
            else if(response.StatusCode == System.Net.HttpStatusCode.BadGateway)
            {
                throw new HttpRequestException((int)response.StatusCode + " " + response.ReasonPhrase + " - the server might be offline. Please check https://api.hephaistos.online/ with your browser and contact the developers if your own internet connection is ok.");
            }
            else if(response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new HttpRequestException((int)response.StatusCode + " " + response.ReasonPhrase);
            }

            
            var responseString = await response.Content.ReadAsStringAsync();

            return responseString.Contains("true");
        }

    }
}
