#!/bin/bash

cd api 
npm run dev &
cd ../auth 
npm run dev &
cd ../compiler
npm run dev
#cd ../client
#npm run dev &