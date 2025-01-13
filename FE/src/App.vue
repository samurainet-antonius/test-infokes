<template>
  <div class="app">
    <!-- Header -->
    <header class="bg-primary text-white p-3">
      <h1 class="mb-0">File Explorer</h1>
    </header>

    <!-- Main Content -->
    <main style="height: calc(100vh - 56px); overflow: hidden;">
      <ExplorerComponent />
    </main>
  </div>
</template>

<script>
import ExplorerComponent from './components/ExplorerComponent.vue'

export default {
  components: {
    ExplorerComponent,
  },
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
