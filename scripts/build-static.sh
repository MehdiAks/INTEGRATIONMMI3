#!/bin/sh
# Régénère les deux applications React pour un hébergement HTML statique.
set -eu
cd "$(dirname "$0")/.."
npm --prefix G03/siteweb_G03 ci --no-audit --no-fund
npm --prefix G03/siteweb_G03 run build:static
npm --prefix G15/GRP15_site_web ci --no-audit --no-fund
npm --prefix G15/GRP15_site_web run build
