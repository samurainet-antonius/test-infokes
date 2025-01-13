// /src/controllers/folder.controller.ts
import { Elysia } from 'elysia';
import { folderService } from '../services/folder.service';

export const folderController = (app: Elysia, version: string) => {
  app.get(`${version}/folders-with-subfolders`, async () => {
    return await folderService.getAllWithSubfolder();
  }, {
    detail: {
      tags: ['folders'],
    }
  });

  app.get(`${version}/folders`, async () => {
    return await folderService.getAll();
  }, {
    detail: {
      tags: ['folders'],
    }
  });

  app.get(`${version}/folders/:id`, async ({ params }) => {
    const id = parseInt(params.id);
    return await folderService.getById(id);
  }, {
    detail: {
      tags: ['folders'],
    }
  });

  app.post(`${version}/folders`, async ({ body }) => {
    const { name, parentId } = body;
    return await folderService.create(name, parentId);
  }, {
    detail: {
      tags: ['folders'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', required: true},
                parentId: { type: 'number', nullable: true},
              },
            },
          },
        },
      },
    }
  });

  app.put(`${version}/folders/:id`, async ({ params, body }) => {
    const id = parseInt(params.id);
    const { name, parentId } = body;
    return await folderService.update(id, name, parentId);
  }, {
    detail: {
      tags: ['folders']
    }
  });

  app.delete(`${version}/folders/:id`, async ({ params }) => {
    const id = parseInt(params.id);
    return await folderService.delete(id);
  }, {
    detail: {
      tags: ['folders'],
    }
  });
};