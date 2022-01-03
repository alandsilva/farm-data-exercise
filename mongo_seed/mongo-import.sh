#! /bin/bash
# This script runs after mongo container is initialized
# It uploads the csv files to mongodb
mongoimport --db the_database --collection farms --headerline --type csv --file /docker-entrypoint-initdb.d/Nooras_farm.csv && \
mongoimport --db the_database --collection farms --headerline --type csv --file /docker-entrypoint-initdb.d/PartialTech.csv && \
mongoimport --db the_database --collection farms --headerline --type csv --file /docker-entrypoint-initdb.d/friman_metsola.csv && \
mongoimport --db the_database --collection farms --headerline --type csv --file /docker-entrypoint-initdb.d/ossi_farm.csv