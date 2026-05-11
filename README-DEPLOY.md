## Deploy checklist (frontend + backend)

### Non-Docker (khuyến nghị nếu bạn deploy VPS/Node thuần)

Xem **`README-NODE-DEPLOY.md`** (PM2 + Nginx + HTTPS). Docker **không bắt buộc**.

### Biến môi trường

- **Root `.env`**: copy từ `.env.example` rồi điền giá trị thật (JWT secret, Mongo URI, Cloudinary, SMTP...).
- **Lưu ý Next.js**: `NEXT_PUBLIC_*` được **inline lúc `next build`** (Docker hay không Docker đều vậy). Nếu đổi `NEXT_PUBLIC_API_URL` sau khi build, bạn cần **`npm run build` lại** frontend.

### Chạy local/staging giống production (Docker Compose)

```bash
cp .env.example .env
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001/api/v1`
- Healthcheck backend: `http://localhost:3001/api/v1/health`

### Build & run từng service (Docker)

Backend:

```bash
docker build -t xalo-backend ./backend
docker run --rm -p 3001:3001 --env-file .env xalo-backend
```

Frontend:

```bash
docker build -t xalo-frontend ./frontend \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
docker run --rm -p 3000:3000 xalo-frontend
```
