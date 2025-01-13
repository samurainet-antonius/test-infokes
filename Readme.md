# Monorepo

Monorepo ini terdiri dari dua bagian utama:
- **Frontend (FE)**: Menggunakan Vue 3 untuk antarmuka pengguna.
- **Backend (BE)**: Menggunakan Bun dan Prisma untuk API dan ORM.

## Langkah-langkah untuk Menjalankan Proyek

### 1. Clone Proyek

Clone repositori ini:

```bash
git clone https://github.com/samurainet-antonius/test-infokes.git
cd test-infokes
```bash

### 2. Install Dependensi
```bash
pnpm install
```bash

### 3. Menjalankan Backend
```bash
cd BE
bun run src/index.ts
```bash

### 4. Menjalankan FE
```bash
cd FE
pnpm run dev
```bash

### 5. Menjalankan Backend dan Frontend Secara Bersamaan
```bash
pnpm run dev:frontend & pnpm run dev:backend
```bash

**Note**: Jangan lupa membuat file .env di folder FE dan BE (contoh env bisa melihat file .env.example di folder FE dan BE)

