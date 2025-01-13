<template>
  <div class="row">
    <!-- Left Panel (Folder List) -->
    <div class="border-end p-3 col-md-2">
      <div class="clearfix mb-2">
        <h4 class="float-start">Folders</h4>
        <div class="float-end">
          <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#newFolder"><i class="bi bi-plus-circle"></i> New</button>
        </div>
      </div> 
      <hr/>
      <input
        v-model="searchQuery"
        type="text"
        class="form-control mb-3"
        placeholder="Search folders..."
      />
      <ul class="list-unstyled">
        <FolderItemComponent
          v-for="folder in filteredFolders"
          :key="folder.id"
          :folder="folder"
          :caret="true"
          @select-folder="selectFolder"
        />
      </ul>
    </div>

    <!-- Right Panel (Folder Contents) -->
    <div class="p-3 col-md-10">

      <div class="clearfix">
        <h4 class="float-start">Files & Subfolders</h4>
        <div class="float-end">
          <button class="btn btn-primary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#newFile"><i class="bi bi-plus-circle"></i> New File</button>
        </div>
      </div>
      <hr/>  
      <div v-if="currentFolder">
        <!-- Files Section -->
        <div v-if="currentFolder.files && currentFolder.files.length">
          <h5>Files</h5>
          <ul class="list-group mb-3">
            <li
              v-for="file in currentFolder.files"
              :key="file.id"
              @click="handleFileClick(file)"
              style="cursor: pointer;"
              class="list-group-item d-flex align-items-center"
            >
              <i class="bi bi-file-earmark-text me-2"></i>
              {{ file.name }}
            </li>
          </ul>
        </div>
        
        <!-- Subfolders Section -->
        <div v-if="currentFolder.subfolders && currentFolder.subfolders.length">
          <h5>Subfolders</h5>
          <ul class="list-unstyled">
            <FolderItemComponent
              v-for="subfolder in currentFolder.subfolders"
              :key="subfolder.id"
              :folder="subfolder"
              :caret="false"
              @select-folder="selectFolder"
            />
          </ul>
        </div>

        <!-- If no files or subfolders -->
        <div v-else>
          <p>Folder ini tidak memiliki files maupun subfolders.</p>
        </div>
      </div>

      <div v-else>
        <p>Please select a folder to view its contents.</p>
      </div>
    </div>

    <!-- Modal for creating new folder -->
    <div
      class="modal fade"
      id="newFolder"
      tabindex="-1"
      aria-labelledby="newFolderLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newFolderLabel">New Folder</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createFolder">
              <div class="mb-3">
                <label for="folderName" class="form-label">Folder Name</label>
                <input
                  type="text"
                  id="folderName"
                  class="form-control"
                  v-model="newFolderName"
                  required
                  placeholder="Enter folder name"
                />
              </div>
              <div class="mb-3">
                <label for="parentFolder" class="form-label">Parent Folder</label>
                <select
                  id="parentFolder"
                  class="form-select"
                  v-model="selectedParentFolder"
                >
                  <option value="">No Parent</option>
                  <option v-for="folder in filteredFolders" :key="folder.id" :value="folder.id">
                    {{ folder.name }}
                  </option>
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Create Folder</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- New File Modal -->
    <div
      class="modal fade"
      id="newFile"
      tabindex="-1"
      aria-labelledby="newFileLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newFileModalLabel">Upload New File</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="uploadFile">
              <div class="mb-3">
                <label for="fileName" class="form-label">Select File</label>
                <input
                  type="file"
                  id="fileName"
                  class="form-control"
                  ref="fileInput"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="folderLocation" class="form-label">Upload Location</label>
                <select
                  id="folderLocation"
                  class="form-select"
                  v-model="selectedFolderId"
                >
                  <option value="" disabled>Select Upload Location</option>
                  <option
                    v-for="folder in listFolder"
                    :key="folder.id"
                    :value="folder.id"
                  >
                    {{ folder.name }}
                  </option>
                </select>
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useFolderStore } from '../stores/folderStore'
import FolderItemComponent from './FolderItemComponent.vue'

export default {
  components: { FolderItemComponent },
  setup() {
    const store = useFolderStore()
    const newFolderName = ref('');
    const selectedParentFolder = ref(null);
    const selectedFolderId = ref('')
    const fileInput = ref(null)

    // State untuk path (breadcrumb)
    const path = ref([])  // Ini akan melacak path (riwayat navigasi)
    const currentFolder = ref(null)

    // Ambil folder saat komponen dimuat
    onMounted(() => {
      store.fetchFolderWithSubfodlers()
      store.fetchFolders()
    })

    const searchQuery = computed(() => store.searchQuery || '')  // Default ke string kosong jika undefined
    const folders = computed(() => store.folders || [])  // Default ke array kosong jika undefined atau null
    const listFolder = computed(() => store.listFolder || [])  // Default ke array kosong jika undefined atau null

    const filteredFolders = computed(() =>
      folders.value.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    )

    const files = computed(() => store.files)

    // Fungsi untuk memilih folder dan memperbarui path
    const selectFolder = (folder) => {
      if (!path.value.some(f => f.id === folder.id)) {  
        path.value.push(folder)  
      }
      currentFolder.value = folder
      selectedFolderId.value = currentFolder.value ? currentFolder.value.id : ''
    }

    // Fungsi untuk menavigasi ke folder berdasarkan breadcrumb
    const navigateToFolder = (index) => {
      currentFolder.value = path.value[index]
      path.value = path.value.slice(0, index + 1)  // Memotong path setelah folder yang dipilih
    }

    const createFolder = () => {
      const parentID = selectedParentFolder.value ? selectedParentFolder.value : null;
      const payload = { name: newFolderName.value, parentId: parentID }
      store.createFolders(payload)
      .then((result) => {
        console.log(result)
        newFolderName.value = '';  // Reset form
        selectedParentFolder.value = null;
      })
      .catch((error) => {
        console.error('Error creating folder:', error);
      });
    };

    const uploadFile = () => {
      if (!selectedFolderId.value) {
        alert('Please select a folder before uploading a file.')
        return
      }

      const file = fileInput.value?.files[0]
      if (!file) {
        alert('No file selected.')
        return
      }

      const formData = new FormData();
      if (file) {
        formData.append('folderId', selectedFolderId.value);
        formData.append('file', file);
      }
    
      store.uploadFile(formData)
      .then(() => {
          alert('File uploaded successfully.')
          fileInput.value.value = '' // Reset file input
        })
      .catch((error) => {
        console.error('Error uploading file:', error)
        alert('Failed to upload file.')
      })
    }

    const handleFileClick = (file) => {
      store.downloadFile(file.id, file.name)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.error('Error download file:', error);
      });
    }


    return {
      searchQuery,
      filteredFolders,
      files,
      path,
      currentFolder,
      selectFolder,
      navigateToFolder,
      createFolder,
      newFolderName,
      selectedParentFolder,
      listFolder,
      selectedFolderId,
      uploadFile,
      fileInput,
      handleFileClick
    }
  },
}
</script>

<style scoped>
/* Optional: Add some custom styles */
</style>
