<template>
  <div class="app-shell">
    <SideBar />
    <main :style="{ marginLeft: sidebarWidth }" class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import SideBar from './components/SideBar/SideBar.vue';
import { sidebarWidth } from './components/SideBar/state';

export default {
  name: 'App',
  components: {
    SideBar
  },
  setup() {
    return { sidebarWidth }
  }
}
</script>

<style>
html,
body,
#app {
  min-height: 100%;
  margin: 0;
}

body {
  background:
    radial-gradient(circle at top, rgba(125, 211, 252, 0.18), transparent 35%),
    linear-gradient(180deg, #f8fafc 0%, #eff5fa 45%, #e7eef5 100%);
}

#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1f2937;
}

.app-shell {
  min-height: 100vh;
}

.main-content {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 40px;
  padding-top: 52px;
  padding-bottom: 52px;
  transition: margin-left 0.2s ease;
}

@media (max-width: 768px) {
  .main-content {
    padding: 24px 18px;
    padding-top: 32px;
    padding-bottom: 32px;
  }
}
</style>

