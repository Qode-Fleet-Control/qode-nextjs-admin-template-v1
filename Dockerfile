# Built by .github/workflows/deploy.yml (context ., file Dockerfile) and pushed
# to Artifact Registry. Same shape as qode-nextjs-template-v1, with pnpm (the
# lockfile is pnpm-lock.yaml; corepack reads the version from package.json).
#
# Auth.js refuses to run without AUTH_SECRET. When the fleet does not inject one,
# the container makes a random one at start, so the app boots (and /login answers)
# with no configuration; sessions then last only as long as the container. Set
# AUTH_SECRET in the workspace env for sessions that survive a restart.

FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM node:22-alpine AS runtime
ARG BUILD_ID=""
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 BUILD_ID=$BUILD_ID \
    AUTH_TRUST_HOST=true
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/public ./public
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
USER app
EXPOSE 3000
CMD ["sh", "-c", "export AUTH_SECRET=\"${AUTH_SECRET:-$(node -e 'console.log(require(\"crypto\").randomBytes(32).toString(\"base64\"))')}\"; exec node server.js"]
