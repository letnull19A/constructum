#!/bin/bash
clear
docker image build -f api.Dockerfile -t constructum-api .
docker image build -f auth.Dockerfile -t constructum-auth .
docker image build -f compiler.Dockerfile -t constructum-compiler .
docker image build -f identify.Dockerfile -t constructum-identify .
docker image build -f client.Dockerfile -t constructum-client .
echo "All Docker images are available!"