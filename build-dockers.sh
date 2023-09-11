#!/bin/bash

docker image build -f api.Dockerfile -t constructum-api .
docker image save constructum-api | gzip > constructum-api.gz

docker image build -f auth.Dockerfile -t constructum-auth .
docker image save constructum-auth | gzip > constructum-auth.gz

docker image build -f compiler.Dockerfile -t constructum-compiler .
docker image save constructum-compiler | gzip > constructum-compiler.gz