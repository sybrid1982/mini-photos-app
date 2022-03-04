<template>
  <div id="app">
    <!-- <h1>Miniature Photo Album</h1>
    <div class="below-header">
      <div class="sidebar">
        <router-link to="/games" class='nav-item'>Games</router-link>
        <router-link to="/" class='nav-item'>Minis</router-link>
      </div>
      <div class="content">
        <router-view ></router-view>
      </div>
    </div> -->
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h1 class="md-title">Mini Paint Log</h1>
    </md-toolbar>
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Navigation</h3>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <router-link to="/games" class='nav-item'><md-icon>move_to_inbox</md-icon> <span>Games</span></router-link>
        </md-list-item>
        <md-list-item>
          <router-link to="/" class='nav-item'><md-icon>move_to_inbox</md-icon> <span>Minis</span></router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
    <div class="main-content">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
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
  margin-top: 0px;
}

.below-header {
  display: flex;
  flex-direction: row;
}
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #358fd4;
}
.nav-item {
  padding: 10px;
  margin: 2px;
  font-size: 24px;
  text-decoration: none;
  color: #d4d4d4;
}
.nav-item:hover {
    background-color: #5ebaff;
}
.content {
  border-left: 2px solid #39607d;
  border-top: 2px solid #39607d;
}
</style>
