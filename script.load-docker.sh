clear &&
docker compose -p ctor down || true &&
sh script.clear-images.sh &&
docker load < constructum-api.gz &&
docker load < constructum-auth.gz &&
docker load < constructum-compiler.gz &&
docker load < constructum-identify.gz &&
docker load < constructum-client.gz &&
clear &&
docker compose -f docker-compose.yml -p ctor up