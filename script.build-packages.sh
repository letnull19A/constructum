node_dir="node_modules"
prefix="constructum"

clear

cd ./packages

echo "building packages"

for pkg in interfaces schemes dbs compiler identify data-generator; do 

    echo "[${prefix}-interfaces]"

    cd "./constructum-${pkg}"

    if [[-d "$node_dir"]]
    then
        npm install
    fi

    npm run build

    echo "builded successfully"

    cd ..
done;