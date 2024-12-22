# Użyj oficjalnego obrazu Node.js jako bazowego
FROM node:18

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików aplikacji do kontenera
COPY . .

# Zbuduj aplikację Next.js
RUN npm run build

# Ustaw zmienną środowiskową, aby dowiedzieć się, że to środowisko produkcyjne
ENV NODE_ENV=production

# Eksponuj port 3000
EXPOSE 3000

# Uruchom aplikację Next.js
CMD ["npm", "start"]
