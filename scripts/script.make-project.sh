#!/bin/bash

clear

echo building libraries...

cd packages/constructum-interfaces
npm run build
npm link

cd ../constructum-compiler
npm i ../constructum-interfaces ../@types/constructum-interfaces
npm run build
npm link

cd ../constructum-dbs
npm run build
npm link

cd ../constructum-schemes
npm i ../constructum-interfaces ../@types/constructum-interfaces
npm run build
npm link

cd ../constructum-identify
npm i ../constructum-dbs ../@types/constructum-dbs ../constructum-schemes ../@types/constructum-schemes
npm run build
npm link

echo update packages [api]
cd ../../services/service.api
npm i ../../packages/constructum-interfaces ../../packages/@types/constructum-interfaces ../../packages/constructum-compiler ../../packages/@types/constructum-compiler ../../packages/constructum-dbs ../../packages/@types/constructum-dbs

echo update packages [auth]
cd ../service.auth
npm i ../../packages/constructum-interfaces ../../packages/@types/constructum-interfaces ../../packages/constructum-dbs ../../packages/@types/constructum-dbs

echo update packages [client]
cd ../service.client
npm i ../../packages/constructum-interfaces ../../packages/@types/constructum-interfaces

echo update packages [compiler]
cd ../service.compiler
npm i ../../packages/constructum-interfaces ../../packages/@types/constructum-interfaces ../../packages/constructum-compiler ../../packages/@types/constructum-compiler

echo update packages [tests]
cd ../../tests
npm i ../packages/constructum-compiler ../packages/@types/constructum-compiler ../packages/constructum-dbs ../packages/@types/constructum-dbs

echo update packages [identify]
cd ../services/service.identify
npm i ../../packages/constructum-schemes ../../packages/@types/constructum-schemes ../../packages/constructum-dbs ../../packages/@types/constructum-dbs ../../packages/constructum-identify ../../packages/@types/constructum-identify


echo build successful!
