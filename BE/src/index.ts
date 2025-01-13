import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors';
import { routes } from './routes'
import { swagger } from '@elysiajs/swagger'
import { prisma } from './config/database'

const app = new Elysia()
  .decorate('prisma', prisma) // Menambahkan Prisma ke dalam Elysia context
  .use(cors({
    origin: 'http://localhost:8080', // Ganti dengan URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
  }))
  .use(swagger({
    documentation: {
      info: {
        title: 'API Management Files',
        version: '1.0.0'
      },
      tags: [
        { name: 'folders', description: 'Folders endpoints' },
        { name: 'files', description: 'Files endpoints' }
      ]
    }
}))
routes(app); // Memanggil fungsi routes dengan app sebagai parameter
app.listen(3000)

console.log('Server running on http://localhost:3000')
