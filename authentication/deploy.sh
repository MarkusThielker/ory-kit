username=markus # username on server
server=server.thielker.xyz # url or ip of server
path="~/xyz/accounts" # path on server
image=ory-auth-test # name of docker image
environment=test # the directory to copy the configuration from (test -> ../docker/ory-test)
version=${1:-"0.1.0"} # version of the docker image
platform=linux/amd64 # platform to build for

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
