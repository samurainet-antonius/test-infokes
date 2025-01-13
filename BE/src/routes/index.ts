// /src/routes/index.ts
import { Elysia } from 'elysia';
import { folderController } from '../controllers/folder.controller';
import { fileController } from '../controllers/file.controller';

export const routes = (app: Elysia) => {
  // Version 1 of the API
  const version = '/api/v1';
  
  // Registering controllers for version 1
  folderController(app, version);
  fileController(app, version);

  // You can add more versions as needed
};
