# Etap 1: Budowanie aplikacji z Node.js
FROM node:20-alpine as builder

WORKDIR /app

# Kopiuj package.json i package-lock.json, aby zainstalować zależności
COPY package.json package-lock.json ./

# Instalacja zależności
RUN npm install

# Skopiowanie całego projektu (w tym src i index.html)
COPY . .

# Budowanie aplikacji
RUN npm run build

# Etap 2: Serwowanie aplikacji za pomocą NGINX
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Zbudowane pliki są kopiowane z pierwszego etapu
COPY --from=builder /app/dist .

# Eksponuj port dla serwera NGINX
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
