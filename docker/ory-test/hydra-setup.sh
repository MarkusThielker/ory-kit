code_client=$(docker compose exec hydra \
    hydra create client \
    --endpoint http://localhost:4445 \
    --grant-type authorization_code,refresh_token \
    --response-type code,id_token \
    --format json \
    --scope openid --scope offline \
    --name OAuth2 Client \
    --redirect-uri https://git.thielker.xyz \
    --redirect-uri https://finances.thielker.xyz \
    --redirect-uri https://accounts.thielker.xyz)

echo $code_client
