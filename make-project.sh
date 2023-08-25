clear

echo building libraries...

cd packages/constructum-interfaces
npm run build
npm link

cd ../constructum-compiler
npm i ../constructum-interfaces ../@types/constructum-interfaces
npm run build
npm link

echo update packages [api]
cd ../../api
npm i ../packages/constructum-interfaces ../packages/@types/constructum-interfaces ../packages/constructum-compiler ../packages/@types/constructum-compiler

echo update packages [auth]
cd ../auth
npm i ../packages/constructum-interfaces ../packages/@types/constructum-interfaces

echo update packages [client]
cd ../client
npm i ../packages/constructum-interfaces ../packages/@types/constructum-interfaces

echo update packages [compiler]
cd ../compiler
npm i ../packages/constructum-interfaces ../packages/@types/constructum-interfaces ../packages/constructum-compiler ../packages/@types/constructum-compiler

echo build successful!
