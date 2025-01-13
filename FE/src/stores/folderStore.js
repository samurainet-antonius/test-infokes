import { defineStore } from 'pinia'
import axiosInstance from '@/boot/axios'

export const useFolderStore = defineStore('folderStore', {
  state: () => ({
    folders: [],
    listFolder: [],
    files: [],
    expandedFolders: new Set(),
    searchQuery: '',
  }),
  actions: {
    async fetchFolderWithSubfodlers() {
      try {
        const response = await axiosInstance.get('/api/v1/folders-with-subfolders')
        this.folders = response.data.data
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    },
    async fetchFolders() {
      try {
        const response = await axiosInstance.get('/api/v1/folders')
        this.listFolder = response.data.data
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    },
    async createFolders (folderData) {
      try {
        const response = await axiosInstance.post('/api/v1/folders', folderData)
        return response.data.data
      } catch (error) {
        console.error('Error creating folder:', error)
      }
    },
    async fetchFiles(folderId) {
      try {
        const response = await axiosInstance.get(`/api/v1/files/${folderId}`)
        this.files = response.data.data
      } catch (error) {
        console.error('Error fetching files:', error)
      }
    },
    async uploadFile (fileData) {
      try {
        const response = await axiosInstance.post('/api/v1/files', fileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        return response.data.data
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    },
    async downloadFile (fileID, fileName) {
      try {
        const response = await axiosInstance.get(`/api/v1/file/${fileID}/download`, {
          responseType: 'blob', // Pastikan response berupa Blob untuk file
        });

        // Buat URL Blob untuk file
        const blob = new Blob([response.data]);
        const downloadUrl = URL.createObjectURL(blob);

        // Buat elemen anchor untuk memulai unduhan
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();

        // Bersihkan URL Blob setelah digunakan
        URL.revokeObjectURL(downloadUrl);

        return true; 
      } catch (error) {
        console.error('Error uploading file:', error)
        throw error; // Lempar error agar dapat ditangani oleh caller
      }
    },
    toggleFolder(folderId) {
      if (this.expandedFolders.has(folderId)) {
        this.expandedFolders.delete(folderId)
      } else {
        this.expandedFolders.add(folderId)
      }
    },
  },
})
