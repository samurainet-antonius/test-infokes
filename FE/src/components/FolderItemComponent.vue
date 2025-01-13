<template>
  <li>
    <div
      class="d-flex align-items-center"
      @click="selectFolder(folder)"
      :style="{ cursor: 'pointer' }"
    >
    <!-- Arrow icon (right when collapsed, down when expanded) -->
      <i
        v-if="folder.subfolders.length > 0 && caret"
        class="bi"
        :class="[isExpanded[folder.id] ? 'bi-caret-down' : 'bi-caret-right', 'me-2']"
        @click.stop="toggle"
      ></i>
      <i v-else class="me-4"></i>
      <i
        class="bi"
        :class="[isExpanded[folder.id] ? 'bi-folder2-open' : 'bi-folder']"
      ></i>

      <span class="ms-2">{{ folder.name }}</span>
    </div>
    <ul v-if="isExpanded[folder.id] && folder.subfolders.length > 0" class="ms-3 list-unstyled">
      <FolderItemComponent
        v-for="subfolder in folder.subfolders"
        :key="subfolder.id"
        :folder="subfolder"
        :caret="true"
        @select-folder="selectFolder"
      />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    folder: Object,
    caret: Boolean
  },
  data() {
    return {
      isExpanded: {},
    };
  },
  methods: {
    // Handle expanding or collapsing subfolders (only by clicking the folder icon)
    toggle(event) {
      event.stopPropagation();  // Prevent the event from bubbling up and triggering selectFolder
      if (this.isExpanded[this.folder.id] === undefined) {
        this.isExpanded[this.folder.id] = true;  // Expand if undefined
      } else {
        this.isExpanded[this.folder.id] = !this.isExpanded[this.folder.id];  // Toggle if already expanded or collapsed
      }
    },
    // Handle folder selection to update the right panel
    selectFolder(folder) {
      this.$emit('select-folder', folder);  // Emit folder selection to parent
    },
  },
};
</script>
