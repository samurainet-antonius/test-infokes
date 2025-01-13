// /src/services/folder.service.ts
import { folderRepository } from '../repositories/folder.repository';
import { response } from '../utils/response';

export const folderService = {
  getAllWithSubfolder: async () => {
    const folders = await folderRepository.findAllWithSubfolders();
    return response(true, 'Folders retrieved successfully', folders);
  },
  getAll: async () => {
    const folders = await folderRepository.findAll();
    return response(true, 'Folders retrieved successfully', folders);
  },
  getById: async (id: number) => {
    const folder = await folderRepository.findById(id);
    if (!folder) {
      return response(false, `Folder with ID ${id} not found`, null);
    }
    return response(true, 'Folder retrieved successfully', folder);
  },
  create: async (name: string, parentId: number | null) => {
    const folder = await folderRepository.create({ name, parentId });
    return response(true, 'Folder created successfully', folder);
  },
  update: async (id: number, name: string, parentId: number | null) => {
    const folder = await folderRepository.update(id, { name, parentId });
    return response(true, 'Folder updated successfully', folder);
  },
  delete: async (id: number) => {
    const folder = await folderRepository.delete(id);
    if (!folder) {
      return response(false, `Folder with ID ${id} not found`, null);
    }
    return response(true, 'Folder deleted successfully', folder);
  },
};