# alpine is too much effort
FROM ubuntu 
WORKDIR /usr/install

ARG DEBIAN_FRONTEND=noninteractive
# RUN ln -fs /usr/share/zoneinfo/Europe/Berlin /etc/localtime


RUN apt-get update && apt-get install -y wget python3 python3-pip
RUN apt-get install -y libglib2.0-0 libsm6 libxext6 libxrender1 libfontconfig1

RUN wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1qBP6uB4MAQlLSGi6RkYheek49n5CzrRz' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1qBP6uB4MAQlLSGi6RkYheek49n5CzrRz" -O tensorflow-2.2.0-cp38-cp38-linux_x86_64.whl && rm -rf /tmp/cookies.txt
RUN pip3 install tensorflow-2.2.0-cp38-cp38-linux_x86_64.whl
RUN rm tensorflow-2.2.0-cp38-cp38-linux_x86_64.whl


RUN pip3 install web.py Pillow opencv-python
#RUN pip3 install pudb

WORKDIR /usr/app