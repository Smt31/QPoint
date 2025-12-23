# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repo overview
- **Backend:** Spring Boot app (Java 21, Maven) in `src/main/java/com/example/Qpoint`.
- **Frontend:** Vite + React SPA in `frontend/`.
- **Local dev ports:** backend `8080` (`src/main/resources/application.properties`), frontend dev server `3000` (`frontend/vite.config.js`). Backend CORS allows `http://localhost:3000` (and a couple other local ports) (`src/main/java/com/example/Qpoint/config/SecurityConfig.java`).

## Common commands

### Backend (Spring Boot / Maven)
Run commands from repo root.

- Run the app (recommended wrapper):
  - `./mvnw spring-boot:run`

- Build (runs tests):
  - `./mvnw clean package`

- Run all tests:
  - `./mvnw test`

- Run a single test class:
  - `./mvnw -Dtest=QpointApplicationTests test`

- Run a single test method:
  - `./mvnw -Dtest=QpointApplicationTests#contextLoads test`

### Frontend (Vite / React)
Run commands from `frontend/`.

- Install dependencies:
  - `npm install`

- Start dev server:
  - `npm run dev`
  - Note: `vite.config.js` pins the dev server to port `3000`.

- Production build:
  - `npm run build`

- Preview production build:
  - `npm run preview`

## Configuration notes (runtime)

### Database
`src/main/resources/application.properties` configures datasource defaults that allow booting without MySQL:
- Default DB URL is an **in-memory H2** database in MySQL compatibility mode.
- Override via environment variables:
  - `DB_URL`, `DB_USER`, `DB_PASSWORD`, `DB_DRIVER`, `HIBERNATE_DIALECT`

### Email (OTP delivery)
OTP emails are sent via Spring Mail (`spring-boot-starter-mail`) from `src/main/java/com/example/Qpoint/service/MailService.java`.
- SMTP settings come from `spring.mail.*` properties (`src/main/resources/application.properties`).
- There are helper scripts for setting SMTP env vars on Windows:
  - `setup-email.bat`
  - `setup-email.ps1`
- If SMTP send fails, the backend falls back to printing the OTP to the console (see `OtpService.sendOtp`).

### JWT auth
JWT is implemented via `io.jsonwebtoken` (jjwt). The signing secret is loaded from `jwt.secret`.
- `JwtAuthenticationFilter` reads the `Authorization: Bearer <token>` header and sets the authenticated principal to the **userId** (token subject).
- Token creation is in `src/main/java/com/example/Qpoint/util/JwtUtil.java`.

## High-level architecture

### Backend request flow (auth)
Key path for the current application functionality is OTP-based auth:
- `AuthController` (`src/main/java/com/example/Qpoint/controller/AuthController.java`)
  - `POST /auth/send-otp`: calls `OtpService.sendOtp(email, purpose)`
  - `POST /auth/verify-otp`: calls `OtpService.verifyOtpAndCreateUser(...)`, then mints a JWT access token
- `OtpService` (`src/main/java/com/example/Qpoint/service/OtpService.java`)
  - Persists OTPs as `OtpToken` entities and marks them used/expired.
  - Creates (or updates) `User` records on successful verification.
- Persistence layer (Spring Data JPA)
  - `UserRepository`, `OtpTokenRepository` in `src/main/java/com/example/Qpoint/repository/`
  - Entities in `src/main/java/com/example/Qpoint/models/`

### Backend security model
- `SecurityConfig` configures a stateless security filter chain.
- `JwtAuthenticationFilter` is inserted before `UsernamePasswordAuthenticationFilter`.
- Public endpoints include `/auth/**` plus static asset paths; everything else requires authentication.

### Frontend ↔ backend integration
- API calls are wrapped in `frontend/src/api.js`.
  - Backend base URL is `import.meta.env.VITE_API_URL` (set via `frontend/.env`) or defaults to `http://localhost:8080`.
  - The access token is stored in `sessionStorage` under the key `qpoint_access`.
- Routing is client-side via `react-router-dom` in `frontend/src/App.jsx`.

### Static assets served by backend
Spring Boot serves files under `src/main/resources/static/` (currently contains `index.html`). If you intend the backend to serve the built frontend, the typical workflow is to copy Vite’s build output into this directory (or configure a build step to do so).