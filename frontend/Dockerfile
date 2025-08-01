# FROM node:18-slim AS builder
# # RUN apt-get update && apt-get install -y curl tar bash python3 make g++ \
# #     && rm -rf /var/lib/apt/lists/*

# # RUN apt-get update && apt-get install -y --no-install-recommends \
# #     curl=8.5.0-2ubuntu10.6 \
# #     tar=1.35+dfsg-3build1 \
# #     bash=5.2.21-2ubuntu4 \
# #     python3=3.12.3-0ubuntu2 \
# #     make=4.3-4.1build2 \
# #     g++=4:13.2.0-7ubuntu1 \
# #     && rm -rf /var/lib/apt/lists/*
# # Стадия сборки (builder)

# WORKDIR /app

# RUN apt-get update && apt-get install -y --no-install-recommends \
#     curl \
#     tar \
#     bash \
#     python3 \
#     make \
#     g++ \
#     && rm -rf /var/lib/apt/lists/*

# COPY package.json package-lock.json tsconfig.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:18-slim AS runner
# WORKDIR /app
# RUN apt-get update && apt-get install -y --no-install-recommends curl \
#     && rm -rf /var/lib/apt/lists/*

# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/package-lock.json ./package-lock.json
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

# ENV HOST 0.0.0.0
# ENV PORT 3000
# EXPOSE 3000
# CMD ["npm", "run", "dev"] 
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git python3 make g++

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && ls -la .next  

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]