<template>
  <div id="app">
    <h1>Miniature Photo Album</h1>
    <add-mini-photo-batch></add-mini-photo-batch>
  </div>
</template>

<script>
import AddMiniPhotoBatch from './components/AddMiniPhotoBatch.vue';

export default {
  name: 'App',
  components: {
    AddMiniPhotoBatch
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
