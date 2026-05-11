/**
 * PM2 ecosystem example (DO NOT commit real secrets).
 *
 * Usage:
 *   cp deploy/non-docker/ecosystem.config.example.cjs ecosystem.config.cjs
 *   # edit ecosystem.config.cjs
 *   pm2 start ecosystem.config.cjs
 */

const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..", "..");

module.exports = {
  apps: [
    {
      name: "xalo-backend",
      cwd: path.join(repoRoot, "backend"),
      script: "dist/main.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        // Comma-separated origins, e.g. "https://xaloenglish.vn,https://www.xaloenglish.vn"
        CORS_ORIGIN: "https://example.com",
        MONGO_URI: "mongodb://127.0.0.1:27017/xaloenglish",
        JWT_SECRET: "change-me",
      },
    },
    {
      name: "xalo-frontend",
      cwd: path.join(repoRoot, "frontend"),
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        // Next reads env at runtime too, but NEXT_PUBLIC_* must be present at build time.
        PORT: 3000,
      },
    },
  ],
};
