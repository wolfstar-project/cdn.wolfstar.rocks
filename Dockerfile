# ================ #
#    Base Stage    #
# ================ #
FROM oven/bun:latest AS base
WORKDIR /usr/src/app
ENV CI=true
ENV HUSKY=0
COPY --chown=bun:bun bun.lockb .
COPY --chown=bun:bun package.json .

# ================ #
#   Builder Stage  #
# ================ #
FROM base AS builder
ENV NODE_ENV="development"
COPY --chown=bun:bun tsconfig.json tsconfig.json
COPY --chown=bun:bun src/ src/
COPY --chown=bun:bun public/ public/
COPY --chown=bun:bun astro.config.mjs .
RUN bun install --frozen-lockfile
RUN bun run build

# ================ #
#   Runner Stage   #
# ================ #
FROM base AS runner
ENV NODE_ENV="production"
COPY --chown=bun:bun --from=builder /usr/src/app/dist dist
COPY --chown=bun:bun src/.env.example src/.env

USER bun
EXPOSE ${PORT}

CMD [ "bun", "run", "start" ]
