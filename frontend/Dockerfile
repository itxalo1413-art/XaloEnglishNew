# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NOTE: NEXT_PUBLIC_* envs are inlined at build time for client code.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_CLARITY_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_CLARITY_ID=$NEXT_PUBLIC_CLARITY_ID

RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./next.config.mjs

EXPOSE 3000
CMD ["npm", "start"]
