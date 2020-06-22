import os
import requests


class Hephaistos:
    
    class UnauthorizedException(Exception):
        pass


    def __init__(self, token: str):
        self._token = token



    def detect_file(self, file_str: str):
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

        return self.detect_stream(data)
        
        

    def detect_stream(self, data_stream):
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

        
        response = requests.post(url="https://api.hephaistos.online/api/hephaistos/detection", data=data_stream, headers={'Authorization': 'Token: {:s}'.format(self._token)})
        

        if response.status_code == 401:
            raise Hephaistos.UnauthorizedException("Invalid Token. Check the token of your user at https://hephaistos.online")


        elif not response.status_code == 200:
            # raise whatever
            pass


        # get the result of the detection
        # and report back to the caller
        print('x')

        
        return True



if __name__ == '__main__':
    h = Hephaistos("YmJlNTRlMjc0ZjFjLTRhZTgtYjE5YS00ZGU4ODVjMDA2ODg=")
    h.detect_file('../lib_demo_mask.jpg')