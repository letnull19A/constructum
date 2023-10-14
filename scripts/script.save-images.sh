#!/bin/bash

rm ./images/constructum-api.gz
rm ./images/constructum-auth.gz
rm ./images/constructum-compiler.gz
rm ./images/constructum-identify.gz
rm ./images/constructum-client.gz

images_dir="./images"

if [ -d "$images_dir" ] 
then
    echo "directory $images_dir is already existing"
else
    mkdir $images_dir
fi

docker image save constructum-api | gzip > ./images/constructum-api.gz
docker image save constructum-auth | gzip > ./images/constructum-auth.gz
docker image save constructum-compiler | gzip > ./images/constructum-compiler.gz
docker image save constructum-identify | gzip > ./images/constructum-identify.gz
docker image save constructum-client | gzip > ./images/constructum-client.gz