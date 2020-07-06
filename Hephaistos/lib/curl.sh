#!/bin/bash

curl -X POST "https://api.hephaistos.online/api/hephaistos/detection" -H  "accept: application/json" -H  "Authorization: Token [insert_token]" -H  "Content-Type: multipart/form-data" -F "file=@image.png;type=image/png