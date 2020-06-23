import os
import requests
import json


class HephaistosDetector:
    
    class UnauthorizedException(Exception):
        pass


    def __init__(self, token: str):
        self._token = token


    def mask_detect_file(self, file_str: str):
        """send the given file to the server for detection.
        Returning result, if a human without mask was detected or not.
        The server might send an telegram message (depending on user settings)
        

        Args:
            file_str (str): path to the image

        Raises:
            FileNotFoundError: when the given file-string is not a file/not existing
            Hephaistos.UnauthorizedException: the server rejected the given token
            ConnectionError: couldn't reach the server

        Returns:
            [bool]: True, if human without mask was identified
        """

        if not os.path.exists(file_str) or not os.path.isfile(file_str):
            raise FileNotFoundError(file_str)
            return

        data = open(file_str, 'rb').read()

        return self.mask_detect_stream(data)
        
        

    def mask_detect_stream(self, data_stream):
        """send the given bytestream to the server for detection.
        Returning result, if a human without mask was detected or not.
        The server might send an telegram message (depending on user settings)
        

        Args:
            data_stream (bytes): the loaded bytestream of an image, not checked for validity

        Raises:
            Hephaistos.UnauthorizedException: the server rejected the given token
            ConnectionError: couldn't reach the server

        Returns:
            [bool]: True, if human without mask was identified
        """

        form_data = dict()
        form_data['file'] = data_stream        
        response = requests.post(url="https://api.hephaistos.online/api/hephaistos/detection", files=form_data, headers={'Authorization': 'Token {:s}'.format(self._token)})
        

        if response.status_code == 401:
            raise HephaistosDetector.UnauthorizedException("Invalid Token. Check the token of your user at https://hephaistos.online")


        elif not response.status_code == 200:
            # raise whatever
            pass


        # get the result of the detection
        # and report back to the caller
        resp_json = response.content.decode('utf-8')
        resp_dict = json.loads(resp_json)


        return resp_dict['mask']



if __name__ == '__main__':
    h = HephaistosDetector("[token]") # invalidated
    print(h.mask_detect_file('lib_demo_mask.jpg'))