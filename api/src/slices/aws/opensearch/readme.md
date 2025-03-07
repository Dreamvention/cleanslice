# Opensearch

### Install

run `npm i @opensearch-project/opensearch`

add to `docker-compose.yml`

```yml
services:
  opensearch-local:
    image: opensearchproject/opensearch:1.0.0
    ports:
      - '9200:9200'
      - '9600:9600'
    volumes:
      - data:/usr/share/opensearch/data
    environment:
      - 'discovery.type=single-node'

  kibana-local:
    image: opensearchproject/kibana:1.0.0
    ports:
      - '5601:5601'
    environment:
      ELASTICSEARCH_HOSTS: http://opensearch:9200
```

Access OpenSearch and Kibana: Once the containers are up and running, you can access OpenSearch at http://localhost:9200 and Kibana at http://localhost:5601 in your web browser.

- test connection
  run `curl https://localhost:9200 -ku 'admin:4yr7DiDhNUrhBxn'`
