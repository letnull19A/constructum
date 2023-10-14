#!/bin/bash

cd ./services/service.api
npm run dev &
cd ../service.identify
npm run dev &
cd ../service.auth
npm run dev &
cd ../service.compiler
npm run dev &
cd ../service.client
npm run dev