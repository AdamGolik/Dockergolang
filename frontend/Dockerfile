   FROM node:18

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj plik package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików aplikacji
COPY . .

# Zbuduj aplikację
RUN npm run build

# Eksponuj port
EXPOSE 3000

# Uruchom serwer Next.js
CMD ["npm", "run", "start"]
