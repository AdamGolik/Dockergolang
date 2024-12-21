# Wykorzystujemy oficjalny obraz nginx jako bazę
FROM nginx:alpine

# Usuń domyślne pliki nginx
RUN rm -rf /usr/share/nginx/html/*

# Skopiuj plik index.html i inne statyczne pliki (jeśli potrzebne) do serwera nginx
COPY index.html /usr/share/nginx/html/

# Eksponuj port 80
EXPOSE 80

# Domyślna komenda uruchamiająca serwer nginx
CMD ["nginx", "-g", "daemon off;"]