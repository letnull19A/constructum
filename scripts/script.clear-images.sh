#!/bin/bash

clear &&
docker image rm constructum-api || true &&
docker image rm constructum-auth || true &&
docker image rm constructum-compiler || true &&
docker image rm constructum-identify || true &&
docker image rm constructum-client || true &&
echo "All docker images has been cleaned up!"