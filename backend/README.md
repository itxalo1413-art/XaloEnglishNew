## XaloEnglish Backend (NestJS)

Backend NestJS cho UI mới (Admin + Public) với base path **`/api/v1`**.

### Setup nhanh

```bash
npm install
cp .env.example .env
```

### Chạy dev

```bash
npm run start:dev
```

### Seed tài khoản Admin

Set trong `.env`:

- `MONGO_URI`
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`
- `ADMIN_SEED_NAME` (optional)

Run:

```bash
npm run seed:admin
```

### Các endpoint chính (khớp frontend hiện tại)

- **Auth**
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/profile` (Bearer token)

- **Upload (Admin)**
  - `POST /api/v1/upload` (multipart `image`)

- **Programs**
  - `GET /api/v1/programs/groups`
  - `POST/PUT/DELETE /api/v1/programs/groups/:id` (Admin)
  - `GET /api/v1/programs/tracks`
  - `GET /api/v1/programs/tracks/:slug`
  - `POST/PUT/DELETE /api/v1/programs/tracks/:id` (Admin)

- **Leads**
  - `POST /api/v1/leads` (Public)
  - `GET /api/v1/leads` (Admin)
  - `PUT /api/v1/leads/:id` (Admin)
  - `GET /api/v1/leads/export` (Admin)
  - Cron email báo cáo lead: 9h / 15h / 20h (Asia/Ho_Chi_Minh)

- **Content**
  - `GET/POST/PUT/DELETE /api/v1/blog-posts` (list trả `{ posts, page, pages }`)
  - `GET /api/v1/blog-posts/:slug`
  - `GET/POST/PUT/DELETE /api/v1/blogs` (list trả `{ blogs, page, pages }`)
  - `GET /api/v1/blogs/latest`
  - `GET /api/v1/blogs/:slug`

- **Others**
  - `GET/POST/PUT/DELETE /api/v1/schedules`
  - `GET/POST/PUT/DELETE /api/v1/student-results`
  - `GET/POST/PUT/DELETE /api/v1/mentors`
  - `GET/POST/PUT/DELETE /api/v1/teachers`
  - `GET/POST/PUT/DELETE /api/v1/testimonials`
  - `GET /api/v1/settings`, `PUT /api/v1/settings` (Admin)
  - `GET /api/v1/dashboard/stats` (Admin)
  - `GET /api/v1/job-positions` (Public)
  - `GET /api/v1/job-positions/admin/all` (Admin)
  - `POST/PUT/DELETE /api/v1/job-positions` (Admin)
  - `POST /api/v1/job-applications` (Public, multipart `resumePdf`)
  - `GET /api/v1/job-applications` (Admin)
  - `GET /api/v1/job-applications/download/:id` (Admin)

