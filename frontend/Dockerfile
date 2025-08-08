# FROM node:20-alpine AS builder

# WORKDIR /app

# RUN apk add --no-cache git python3 make g++

# COPY package.json package-lock.json ./
# RUN npm ci

# COPY . .
# RUN npm run build

# FROM node:20-alpine AS runner

# WORKDIR /app

# COPY --from=builder /app/package.json .
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.ts ./ 

# ENV NODE_ENV=production
# ENV PORT=3000
# ENV HOSTNAME=0.0.0.0

# EXPOSE 3000

# CMD ["npm", "start"]

FROM node:20-alpine AS builder

RUN apk add --no-cache git python3 make g++

WORKDIR /app_parent
RUN mkdir -p /app_parent/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app_parent
# COPY --from=builder /app_parent/package.json .
# COPY --from=builder /app_parent/.next ./.next
# COPY --from=builder /app_parent/public ./public
COPY --from=builder /app_parent/node_modules ./node_modules
# COPY --from=builder /app_parent/next.config.ts ./
COPY --from=builder /app_parent/.next ./app/.next
COPY --from=builder /app_parent/app ./app
COPY --from=builder /app_parent/next.config.ts ./app/

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ENV NODE_PATH=/app_parent/node_modules

EXPOSE 3000
WORKDIR /app_parent/app
CMD ["npm", "start"]