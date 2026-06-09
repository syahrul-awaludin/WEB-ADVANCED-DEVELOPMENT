// File: src/config/prisma.js
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

// Parse DATABASE_URL untuk mendapatkan connection parameters
const dbUrl = new URL(process.env.DATABASE_URL);

// Buat adapter MariaDB (kompatibel dengan MySQL via XAMPP)
const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port) || 3306,
  user: dbUrl.username,
  password: dbUrl.password || undefined,
  database: dbUrl.pathname.slice(1), // hapus leading "/"
});

// Singleton: satu instance untuk seluruh aplikasi
// Mencegah terlalu banyak koneksi ke MySQL
const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'warn', 'error']
    : ['warn', 'error'],
});

// Disconnect saat aplikasi ditutup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
