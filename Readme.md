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
```

### 2. Install Dependensi
```bash
pnpm install
```

### 3. Konfigurasi File .env
- **Frontend (FE)**: Buat file .env di folder FE berdasarkan file .env.example.
- **Backend (BE)**: Buat file .env di folder BE berdasarkan file .env.example.

### 4. Menjalankan Backend
```bash
cd BE
bun run src/index.ts
```

### 5. Menjalankan FE
```bash
cd FE
pnpm run dev
```

### 6. Menjalankan Backend dan Frontend Secara Bersamaan
```pnpm run dev:frontend & pnpm run dev:backend```

**Catatan Penting**: 
1. **Prisma**: Jika terdapat error terkait Prisma, jalankan perintah berikut di folder ```BE```:
   ```bash
    pnpm prisma generate
    ```
2. **Port Default**:
   - **Frontend**: ```http://localhost:8080```
   - **Backend**: Port sesuai dengan konfigurasi pada file ```.env```.
3. **pnpm-workspace.yaml**: Pastikan file ini ada di root proyek agar monorepo dapat dikelola dengan baik oleh pnpm

