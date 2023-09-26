image="$1"
version="$2"
path="$3"
restart="$4"

cd "$path" || exit

# unzip archive
gzip -d "$image"-"$version".tar.gz

# load image, tag as latest and restart containers
docker load -i ./"$image"-"$version".tar
docker image tag "$image":"$version" "$image":latest
docker compose down "$restart"
docker compose up -d --no-deps --build "$restart"

# clean up files
rm "$image"-"$version".tar
