# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node/stretch-slim-lts-8:8-stretch-slim AS base
COPY . .