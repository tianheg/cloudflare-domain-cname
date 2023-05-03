# Cloudflare Domain CNAME

> A simple script to get CNAME records to a Cloudflare domain and generate a web page.

## Usage

```sh
npx wrangler dev
```

## Secrets

```sh
wrangler put ZONE_ID
wrangler put AUTH_EMAIL
wrangler put AUTH_KEY
```

To get `AUTH_KEY`, go to My Profile -> API Tokens -> Create Tokens,

1. Select last `Create Custom Token`
2. Create a `Token name`
3. Under permissions, select `Zone` -> `DNS` -> `Read`
4. Under zone resources, select which zone do you need to read
5. Other two, client IP address filtering and TTL, set them as you need
6. `Continue to summary` -> `Create Token`

## Docs

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [List DNS Records - Cloudflare API](https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-list-dns-records)
