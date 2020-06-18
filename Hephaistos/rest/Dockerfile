FROM node:11
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --quiet

RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install tensorflow Keras
RUN pip3 install pudb