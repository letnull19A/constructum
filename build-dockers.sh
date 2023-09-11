#!/bin/bash

docker image build -f api.Dockerfile -t constructum-api .

docker image build -f auth.Dockerfile -t constructum-auth .

docker image build -f compiler.Dockerfile -t constructum-compiler .