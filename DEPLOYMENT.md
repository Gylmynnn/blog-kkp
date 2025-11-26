# 🚀 Deployment Guide - Auto Migration

## Cara Kerja Auto-Migration di Vercel

Saya sudah mengkonfigurasi aplikasi ini agar **otomatis menjalankan migrasi database** saat deployment di Vercel.

### 🔧 Ada 3 Layer Protection:

#### **1. Build-time Migration** (Primary)
- Migrasi dijalankan saat proses build di Vercel
- Dikonfigurasi di `package.json`:
  ```json
  "vercel-build": "tsc && npm run db:migrate:prod"
  ```
- Dikonfigurasi di `vercel.json`:
  ```json
  "buildCommand": "npm run vercel-build"
  ```

#### **2. Runtime Migration** (Backup)
- Migrasi otomatis saat aplikasi startup
- Hanya berjalan di production (`NODE_ENV=production`)
- File: `src/database/auto-migrate.ts`
- Dipanggil di `src/index.ts`

#### **3. Manual Migration** (Fallback)
```bash
npm run db:migrate:prod
```

---

## 📝 Setup di Vercel Dashboard

### Environment Variables yang Diperlukan:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Tambahkan variabel berikut:

```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=production
```

### Optional (untuk enable auto-migration on startup):
```
AUTO_MIGRATE=true
```

---

## 🔄 Cara Deploy:

### Method 1: Git Push (Recommended)
```bash
git add .
git commit -m "Enable auto-migration"
git push origin main
```
Vercel akan otomatis deploy dan menjalankan migrasi.

### Method 2: Vercel CLI
```bash
vercel --prod
```

---

## ✅ Verifikasi Migrasi Berhasil

Setelah deploy, check logs di Vercel:

**Build Logs** akan menunjukkan:
```
🚀 Starting migration...
✅ Migration completed successfully!
```

**Runtime Logs** akan menunjukkan:
```
🔄 Checking for pending migrations...
✅ Database is up to date!
```

---

## 🐛 Troubleshooting

### Jika migrasi gagal saat build:
1. Check DATABASE_URL di environment variables
2. Pastikan database accessible dari Vercel
3. Check build logs untuk error detail

### Jika migrasi gagal saat runtime:
1. Check runtime logs
2. Jalankan manual migration:
   ```bash
   DATABASE_URL="your_prod_url" npm run db:migrate:prod
   ```

### Force Re-run Migration:
```bash
# Delete drizzle schema di database
# Lalu trigger redeploy di Vercel
```

---

## 📦 Files Changed:

1. `package.json` - Added `vercel-build` script
2. `vercel.json` - Added `buildCommand`
3. `src/database/auto-migrate.ts` - Runtime migration
4. `src/database/migrate.ts` - Manual migration script
5. `src/index.ts` - Call auto-migration on startup

---

## 🎯 Next Steps After Deploy:

1. ✅ Push code ke repository
2. ✅ Vercel auto-deploy
3. ✅ Migrasi berjalan otomatis
4. ✅ Test login endpoint
5. ✅ Verify data internship muncul

---

**Happy Deploying! 🎉**
