FROM node:18

# Ustaw katalog roboczy wewnątrz kontenera
WORKDIR /app

# Skopiuj package.json i package-lock.json (jeśli istnieją) do kontenera
COPY package*.json ./

# Uruchom instalację zależności
RUN npm install

# Skopiuj pozostałe pliki projektu do kontenera
COPY . .

# Otwórz port 8081
EXPOSE 3000

# Uruchom aplikację na porcie 8081
CMD ["npm", "run", "dev"]
