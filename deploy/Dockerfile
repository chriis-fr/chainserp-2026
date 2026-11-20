# chains-erp.com on the Chains server. Copy to /opt/chains/apps/site/Dockerfile.
# The platform deployer builds the Next.js standalone output first, then builds this image from
# a context holding server.js, .next/static and public. It passes PORT and HEALTH_PATH.
FROM node:20-alpine
ARG PORT=3100
ARG HEALTH_PATH=/api/health
ENV NODE_ENV=production PORT=${PORT} HOSTNAME=0.0.0.0 HEALTH_PATH=${HEALTH_PATH} NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY . .
USER node
EXPOSE ${PORT}
HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}${HEALTH_PATH}" >/dev/null || exit 1
CMD ["node", "server.js"]
