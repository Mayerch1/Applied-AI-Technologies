# container
```sudo docker-compose build``` (when Dokcerfile changed)

# website
```sudo docker-compose -f docker-compose-website.builder.yml run install``` (once)

```sudo docker-compose -f docker-compose-website.builder.yml run build``` (after every update)

# rest backend
```sudo docker-compose -f docker-compose-rest.builder.yml run install``` (once)

```sudo docker-compose -f docker-compose-rest.builder.yml run build``` (after every update)

# operation
```sudo docker-compose up -d``` (launch in background)

```sude docker-compose down``` (shutdown)