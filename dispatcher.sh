curl -H "Accept: application/vnd.github.everest-preview+json" \
    -H "Authorization: Bearer ${GH_DISPATCH_TOKEN}" \
    --request POST \
    --data '{"event_type": "do-something", "client_payload": { "text": "CROC"}}' \
    https://api.github.com/repos/isandratskiy/k6-typescript-example/dispatches
