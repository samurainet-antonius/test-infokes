// /src/services/file.service.ts
import { fileRepository } from '../repositories/file.repository';
import { response } from '../utils/response';

export const fileService = {
  getAll: async (folderId: number) => {
    const files = await fileRepository.findAll(folderId);
    return response(true, 'Files retrieved successfully', files);
  },
  create: async (name: string, folderId: number) => {
    const file = await fileRepository.create(name, folderId);
    return response(true, 'File created successfully', file);
  },
  findById: async (id: number) => {
    return await fileRepository.findById(id);
  },
  delete: async (id: number) => {
    const file = await fileRepository.delete(id);
    if (!file) {
      return response(false, `File with ID ${id} not found`, null);
    }
    return response(true, 'File deleted successfully', file);
  },
};