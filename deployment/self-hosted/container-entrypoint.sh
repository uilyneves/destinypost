#!/usr/bin/env bash
set -Eeuo pipefail

mkdir -p /uploads /config
chown -R www-data:www-data /uploads /config

nginx
exec runuser -u www-data -- env HOME=/tmp pnpm run pm2
