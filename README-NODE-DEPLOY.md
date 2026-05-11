## Deploy không Docker (Node.js + PM2 + Nginx) — khuyến nghị cho VPS Ubuntu

Repo này gồm:

- **Frontend**: Next.js (`frontend/`) — production chạy `next start` (mặc định port **3000**)
- **Backend**: NestJS (`backend/`) — production chạy `node dist/main` (mặc định port **3001**, global prefix **`/api/v1`**)

### 0) Chuẩn bị trên server

- **Node.js**: khuyến nghị **Node 20 LTS** (khớp với Dockerfile hiện có)
- **MongoDB**: tự cài trên VPS **hoặc** dùng **MongoDB Atlas** (khuyến nghị production)
- **Domain + DNS**: trỏ A record về IP VPS
- **Firewall**: mở **80/443**; **không** cần public port 3000/3001 nếu dùng Nginx reverse proxy

### 1) Clone code lên server

Ví dụ deploy tại `/var/www/xaloenglish`:

```bash
sudo mkdir -p /var/www/xaloenglish
sudo chown -R $USER:$USER /var/www/xaloenglish
cd /var/www/xaloenglish
git clone <YOUR_GIT_URL> .
```

### 2) Tạo file môi trường

#### Backend (`backend/.env`)

```bash
cd /var/www/xaloenglish/backend
cp .env.example .env
```

Điền tối thiểu:

- **`MONGO_URI`**
- **`JWT_SECRET`** (chuỗi ngẫu nhiên đủ dài)
- **`CORS_ORIGIN`**: domain website (ví dụ `https://xaloenglish.vn`) — có thể nhiều domain cách nhau bởi dấu phẩy
- **`PORT`**: thường giữ `3001`
- (Tuỳ chính sách) **`ADMIN_SEED_*`** để seed admin 1 lần — xem `backend/README.md`

#### Frontend (`frontend/.env.production.local`)

Next.js sẽ đọc file này khi `next build` / `next start` (production).

```bash
cd /var/www/xaloenglish/frontend
cat > .env.production.local <<'EOF'
NEXT_PUBLIC_API_URL=https://xaloenglish.vn/api/v1
NEXT_PUBLIC_CLARITY_ID=
EOF
```

**Quan trọng**: `NEXT_PUBLIC_*` được **“đóng gói” vào bundle lúc build**. Đổi `NEXT_PUBLIC_API_URL` sau khi build ⇒ phải **`npm run build` lại**.

Gợi ý URL API:

- **Cùng domain** (khuyến nghị): `https://<domain>/api/v1` (Nginx proxy `/api/` sang backend)
- **Subdomain riêng**: `https://api.<domain>/api/v1`

### 3) Cài dependency + build

```bash
cd /var/www/xaloenglish/backend
npm ci
npm run build

cd /var/www/xaloenglish/frontend
npm ci
npm run build
```

### 4) Chạy bằng PM2

Cài PM2:

```bash
sudo npm i -g pm2
```

**Tuỳ chọn A — dùng ecosystem mẫu (nhanh)**

Tạo file cấu hình PM2 (không commit secret):

```bash
cd /var/www/xaloenglish
cp deploy/non-docker/ecosystem.config.example.cjs ecosystem.config.cjs
```

Mở `ecosystem.config.cjs` và chỉnh `cwd` + các biến môi trường (hoặc để PM2 đọc env từ systemd — tuỳ bạn).

Khởi động:

```bash
cd /var/www/xaloenglish
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

**Tuỳ chọn B — không dùng ecosystem (tối giản)**

```bash
cd /var/www/xaloenglish/backend
pm2 start dist/main.js --name xalo-backend

cd /var/www/xaloenglish/frontend
pm2 start npm --name xalo-frontend -- start

pm2 save
pm2 startup
```

Healthcheck backend (sau khi Nginx đã proxy hoặc nếu bạn mở port trực tiếp):

- `GET /api/v1/health`

### 5) Nginx reverse proxy + HTTPS (Certbot)

Copy mẫu:

```bash
sudo cp /var/www/xaloenglish/deploy/non-docker/nginx-xaloenglish.conf \
  /etc/nginx/sites-available/xaloenglish.conf
sudo ln -s /etc/nginx/sites-available/xaloenglish.conf /etc/nginx/sites-enabled/xaloenglish.conf
```

Sửa trong file:

- `server_name`
- các dòng `ssl_certificate` / `ssl_certificate_key` (sau khi có cert)

Cài cert (Ubuntu + nginx plugin):

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
sudo certbot --nginx -d xaloenglish.vn -d www.xaloenglish.vn
sudo nginx -t && sudo systemctl reload nginx
```

### 6) Quy trình release (update code)

```bash
cd /var/www/xaloenglish
git pull

cd backend && npm ci && npm run build
cd ../frontend && npm ci && npm run build

pm2 reload ecosystem.config.cjs
```

### Ghi chú quan trọng

- **CORS**: backend đọc `CORS_ORIGIN` (comma-separated). Nếu admin chạy trên subdomain khác, nhớ thêm vào danh sách.
- **Uploads local**: backend có static `/uploads` từ thư mục `uploads/` trên disk; nếu bạn dùng Cloudinary thì phần này ít quan trọng hơn, nhưng vẫn cần backup nếu có dữ liệu local.
- **Docker**: các file `Dockerfile` / `docker-compose.yml` trong repo là **tuỳ chọn**; deploy Node thuần không cần dùng.
