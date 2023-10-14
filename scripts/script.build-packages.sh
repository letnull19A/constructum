node_dir="node_modules"
prefix="constructum"

clear

cd ./../packages

echo "building packages"

for pkg in interfaces schemes dbs compiler identify data-generator; do 

    echo "[${prefix}-${pkg}]"

    cd "./constructum-${pkg}"

    rm -r "$node_dir"

    npm install
    npm run build

    echo "builded successfully"

    cd ..
done;