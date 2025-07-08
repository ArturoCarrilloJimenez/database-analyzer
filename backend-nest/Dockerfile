# ─── STAGE 1: Build ─────────────────────────────────────────
FROM node:22.14.0 AS builder

# 1. Define directorio de trabajo
WORKDIR /usr/src/app

# 2. Copia sólo los manifiestos e instala deps
COPY package*.json ./
RUN npm ci

# 3. Copia el resto del código y compila
COPY . .
RUN npm run build

# ─── STAGE 2: Runtime ───────────────────────────────────────
FROM node:22.14.0 AS runtime

WORKDIR /usr/src/app

# 4. Copia sólo artefactos de la build y dependencias de producción
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# 5. Expone el puerto que usa NestJS
EXPOSE 3000

# 6. Ejecuta la aplicación
CMD ["node", "dist/main.js"]
