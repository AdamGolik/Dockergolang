# **Awesome Project 12**

Aplikacja składa się z backendu (w Go) oraz frontendu (w React/Next.js). Przy wykorzystaniu Dockera oba komponenty mogą działać w osobnych kontenerach, a komunikacja między nimi odbywa się za pomocą API REST.

---

## **Technologie**

- **Backend**: Go (Golang)
- **Frontend**: React.js (lub Next.js, w zależności od implementacji)
- **Baza danych**: PostgreSQL
- **Docker**: Obsługa aplikacji za pomocą Docker Compose

---

## **Wymagania wstępne**

Upewnij się, że na Twoim systemie są zainstalowane:

1. **Docker**: [Pobierz Docker](https://www.docker.com/).
2. **Docker Compose**: Zazwyczaj instalowany razem z Dockerem.
3. **Node.js & npm**: Wersja Node.js co najmniej `v18` (w przypadku lokalnych zmian w frontendzie lub backendzie).

---

## **Instalacja i uruchomienie za pomocą Dockera**

### **1. Klonowanie repozytorium**
Najpierw sklonuj repozytororium projektu:
```bash
git clone https://github.com/your-repo/awesomeProject12.git
cd awesomeProject12
```

### **2. Konfiguracja pliku `.env`**
Upewnij się, że plik `.env` w katalogu `backend` ma następującą treść lub podobne zmienne środowiskowe:
- SECRET_KEY=your_secret_key 
- DB_HOST=postgres 
- DB_PORT=5432 
- DB_USER=postgres 
- DB_PASSWORD=your_password 
- DB_NAME=your_database
  **Uwaga**: Dopasuj wartości środowiska do własnych potrzeb (np. hasło do PostgreSQL).

### **3. Uruchomienie aplikacji w kontenerach**
W katalogu głównym projektu (tam, gdzie znajduje się plik `docker-compose.yml`), uruchom:

```bash
docker-compose up --build
```

**Usługi, które się uruchomią:**
- **Backend**: Dostępny na [http://localhost:8080](http://localhost:8080)
- **Frontend**: Dostępny na [http://localhost:3000](http://localhost:3000)

### **4. Zatrzymanie usług**
Aby zatrzymać i wyczyścić wszystkie kontenery, użyj:
```bash
docker-compose down
```

---

## **Struktura projektu**

```plaintext
awesomeProject12/
├── backend/                -> Backend (Go)
│   ├── Controller/         -> Logika kontrolerów (API)
│   ├── initializers/       -> Inicjalizacja konfiguracji i bazy
│   ├── models/             -> Modele danych (ORM)
│   ├── Dockerfile          -> Dockerfile dla backendu
│   └── main.go             -> Główny plik aplikacji Go
├── frontend/               -> Frontend (React/Next.js)
│   ├── components/         -> Komponenty React
│   ├── pages/              -> Strony aplikacji
│   ├── services/           -> Klient REST API
│   ├── styles/             -> Style CSS
│   ├── Dockerfile          -> Dockerfile dla frontendu
│   └── package.json        -> Zależności frontendu
├── docker-compose.yml      -> Plik konfiguracji dla Dockera
└── .env                    -> Zmienne środowiskowe backendu
```

---

## **Backend API**

Backend oferuje następujące endpointy:

1. **Dodanie nowego użytkownika**
    - **POST** `/user`
    - Body (JSON):
      ```json
      {
        "name": "John",
        "last_name": "Doe",
        "age": 25,
        "email": "john.doe@example.com",
        "username": "johndoe",
        "password": "password"
      }
      ```

2. **Pobranie listy użytkowników**
    - **GET** `/users`

3. **Aktualizacja użytkownika po ID**
    - **PUT** `/user/{id}`
    - Body (JSON):
      ```json
      {
        "name": "Jane",
        "last_name": "Smith",
        "age": 30,
        "email": "jane.smith@example.com",
        "username": "janesmith",
        "password": "newpassword"
      }
      ```

4. **Usunięcie użytkownika po ID**
    - **DELETE** `/user/{id}`

---

## **Frontend**

Frontend jest aplikacją przeglądarkową stworzoną w React/Next.js. Kluczowe funkcjonalności to:

- Formularz dodawania użytkownika (`UserForm`)
- Wyświetlanie listy użytkowników (`UserList`/`users.jsx`)
- Połączenie z backendem za pomocą `axios`.

---

## **Komendy pomocnicze**

### **Backend**
- Budowanie aplikacji backendowej lokalnie:
  ```bash
  cd backend
  go build -o main .
  ./main
  ```
- Uruchamianie testów (jeśli są zaimplementowane):
  ```bash
  go test ./...
  ```

### **Frontend**
- Budowanie aplikacji frontendowej lokalnie:
  ```bash
  cd frontend
  npm install
  npm run build
  npm start
  ```

---

## **Problemy i debugowanie**

1. Sprawdź logi kontenerów:
    - **Backend**:
      ```bash
      docker logs go_backend
      ```
    - **Frontend**:
      ```bash
      docker logs react_frontend
      ```
    - **PostgreSQL**:
      ```bash
      docker logs postgres_container
      ```

2. Upewnij się, że wszystkie usługi w `docker-compose.yml` korzystają z tej samej sieci (`app_network`).

3. Sprawdź połączenie między backendem a PostgreSQL za pomocą zmiennych środowiskowych z `.env`.

---

## **Autor**
Stworzono z pomocą `Adama Golika`.