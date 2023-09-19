username=markus
server=server.thielker.xyz
path="~/xyz/accounts"
image=ory-auth-test
environment=test
version=${1:-"0.1.0"}
platform=linux/amd64

# build image and export to tar
docker build --platform "$platform" --no-cache -t "$image":"$version" .
docker image save -o "$image"-"$version".tar "$image":"$version"
gzip "$image"-"$version".tar

# copy image to server and load it
scp "$image"-"$version".tar.gz "$username"@"$server":"$path"/"$image"-"$version".tar.gz
scp -r ../docker/ory-"$environment"/* "$username"@"$server":"$path"
scp -r ../docker/ory-"$environment"/.env "$username"@"$server":"$path"

# execute remote script on server
ssh "$username"@"$server" "bash -s" < ./deploy-remote.sh "$image" "$version" "$path"

# clean up files
rm -rf "$image"-"$version".tar.gz
