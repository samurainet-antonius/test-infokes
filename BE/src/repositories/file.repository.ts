// /src/repositories/file.repository.ts
import { prisma } from '../config/database';
import { File } from '../models/file.model';

export const fileRepository = {
  findAll: async (folderId: number): Promise<File[]> => prisma.file.findMany({ where: { folderId } }),
  findById: async (id: number): Promise<File | null> => prisma.file.findUnique({ where: { id } }),
  create: async (name: string, folderId: number): Promise<File> => prisma.file.create({ data: { name, folderId } }),
  delete: async (id: number): Promise<File | null> => prisma.file.delete({ where: { id } }),
};