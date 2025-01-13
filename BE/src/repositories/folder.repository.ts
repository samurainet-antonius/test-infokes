// /repositories/folder.repository.ts
import { prisma } from '../config/database';
import { Folder } from '../models/folder.model';

const getSubfolders = async (parentId: number | null): Promise<Folder[]> => {
  // Ambil folder berdasarkan parentId
  const folders = await prisma.folder.findMany({
    where: { parentId },
    include: {
      subfolders: true, // Include subfolders dalam query
      files: true
    },
  });

  // Lakukan rekursi untuk setiap subfolder yang ditemukan
  for (let folder of folders) {
    folder.subfolders = await getSubfolders(folder.id); // Dapatkan subfolder lebih dalam
  }

  return folders;
}

export const folderRepository = {
  findAllWithSubfolders: async (): Promise<Folder[]> => {
    // Ambil folder dengan parentId null (folder utama)
    return await getSubfolders(null); // Ini akan memulai rekursi
  },
  findAll: async (): Promise<Folder[]> => prisma.folder.findMany(),
  findById: async (id: number): Promise<Folder | null> => prisma.folder.findUnique({ where: { id } }),
  create: async (data: { name: string; parentId: number | null }): Promise<Folder> => prisma.folder.create({ data }),
  update: async (id: number, data: { name: string; parentId: number | null }): Promise<Folder> => prisma.folder.update({ where: { id }, data }),
  delete: async (id: number): Promise<Folder | null> => prisma.folder.delete({ where: { id } }),
};
