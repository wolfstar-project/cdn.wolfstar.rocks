# ================ #
#    Base Stage    #
# ================ #
FROM oven/bun:latest as base
WORKDIR /usr/src/app
ENV CI=true
ENV HUSKY=0
RUN apk add --no-cache dumb-init
COPY --chown=bun:bun bun.lockb .
COPY --chown=bun:bun package.json .
ENTRYPOINT ["dumb-init", "--"]

# ================ #
#   Builder Stage  #
# ================ #
FROM base as builder
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
ENV HOST=0.0.0.0
ENV PORT=4321
COPY --chown=bun:bun --from=builder /usr/src/app/dist dist
COPY --chown=bun:bun src/.env src/.env
RUN bun install --production --frozen-lockfile
RUN chown bun:bun /usr/src/app/
USER bun
EXPOSE ${PORT}

CMD [ "bun", "run", "start" ]