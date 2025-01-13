// /src/controllers/file.controller.ts
import { Elysia, t } from 'elysia';
import { fileService } from '../services/file.service';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { S3Config } from '../utils/s3';
import { env } from '../utils/env';
import { response } from '../utils/response';

export const fileController = (app: Elysia, version: String) => {
  app.get(`${version}/files/:folderId`, async ({ params }) => {
    const folderId = parseInt(params.folderId);
    return await fileService.getAll(folderId);
  }, {
    detail: {
      tags: ['files'],
    }
  });

  app.post(`${version}/files`, async ({ body: {folderId, file} }) => {
    if (!file || !folderId) {
      return { status: 400, message: 'File and folder file are required.' };
    }
    
    const name = `${Date.now()}-${file.name}`;
    try {
      await S3Config.send(
        new PutObjectCommand({
          Bucket: 'al-baqi',
          Key: name,
          Body: file.type,
        })
      );

      return await fileService.create(name, parseInt(folderId));
    } catch (error) {
      return response(false, `Upload failed ${error.message}`, null);
    }

    
  }, {
    detail: {
      tags: ['files'],
    }
  });

  app.get(`${version}/file/:id/download`, async ({ params }) => {
    const { id } = params;
    try {
      // Dapatkan informasi file dari database (opsional, jika ada metadata terkait file)
      const fileMetadata = await fileService.findById(parseInt(id)); // Sesuaikan dengan logika Anda
      if (!fileMetadata) {
        return response(false, 'File not found', null);
      }

      // Konfigurasi untuk mendapatkan file dari S3
      const command = new GetObjectCommand({
        Bucket: 'al-baqi',
        Key: fileMetadata.name, // Nama file yang sesuai di S3
      });

      const s3Response = await S3Config.send(command);

      // Ekstrak body dari response S3
      const stream = s3Response.Body;

      // Mengembalikan stream file ke pengguna
      return new Response(stream, {
        headers: {
          'Content-Type': s3Response.ContentType || 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${fileMetadata.name}"`,
        },
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      return response(false, `Download failed: ${error.message}`, null);
    }
  });

  app.delete(`${version}/files/:id`, async ({ params }) => {
    const id = parseInt(params.id);
    return await fileService.delete(id);
  }, {
    detail: {
      tags: ['files'],
    }
  });
};
