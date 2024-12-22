# Użyj oficjalnego obrazu Node.js jako bazy
FROM node:18

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę aplikacji
COPY . .

# Wyłącz sprawdzanie ESLint i TypeScript błędów (opcjonalne)
ENV NEXT_PUBLIC_IGNORE_ESLINT_ERRORS=true

# Zbuduj aplikację Next.js bez errorów builda
RUN npm run build

# Eksponuj port
EXPOSE 3000

# Uruchom aplikację w trybie produkcyjnym
CMD ["npm", "start"]
