import sys

import numpy as np
import cv2
import time

from Hephaistos import HephaistosDetector



def camera_loop(api_endpoint, capture_device, interval=5, fps = 25, callback=None):

    last_out_img = time.time()

    while(True):

        ret, frame = capture_device.read()
        if ret:
            # show all frames to control window
            cv2.imshow('frame', frame)
          
            # only send images at interval to api endpoint
            if (time.time() - last_out_img > interval):
                
                last_out_img = time.time()

                sucess, frame_encode = cv2.imencode('.jpg', frame)
                frame_stream = frame_encode.tobytes()
                result = api_endpoint.mask_detect_stream(frame_stream)

                if result:
                    print('authorized')
                else:
                    # callback method here
                    # it can be used e.g. for displaying the intruder image
                    if callback:
                        callback(frame_stream)

                    print('INTRUDER ALERT: human w/o mask detected')

        else:
            print('Could not receive camera feed')

        

def main(token, device_num):
    api = HephaistosDetector(token)

    print('Starting camera loop on device {:d}'.format(device_num))
    cap = cv2.VideoCapture(device_num)
    
    if not cap.isOpened():
        cap.open()

    # cannot go lower than 10 fps
    # higher fps are useless as only every 5s are transmitted
    cap.set(cv2.CAP_PROP_FPS, 10)
    camera_loop(api, cap, 5, 10)





if __name__ == '__main__':

    if len(sys.argv) < 2:
        print('Missing token as first argument')
        exit(-1)
    else:
        token = sys.argv[1]


    if len(sys.argv) < 3:
        print('Default to first video device')
        selection = 0
    else:
        selection = sys.argv[2]


    #token = sys.argv[1]
    main(token, selection)