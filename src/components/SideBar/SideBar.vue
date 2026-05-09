<script lang="ts">
import SidebarLink from './SideBarLink.vue'

export default {
  components: { SidebarLink },
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-brand">
      <p class="brand-kicker">Weather App</p>
      <h1>
        <span>Meteora</span>
      </h1>
    </div>

    <SidebarLink to="/" icon="fas fa-home">Início</SidebarLink>
    <SidebarLink to="/temperatura" icon="fas fa-columns">Temperatura</SidebarLink>
    <SidebarLink to="/vento" icon="fas fa-chart-bar">Vento</SidebarLink>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #0f172a;
  --sidebar-item-hover: rgba(148, 163, 184, 0.16);
  --sidebar-item-active: rgba(148, 163, 184, 0.24);
  --radius: 16px;
  --transition: all 0.2s ease;
}
</style>

<style scoped>
@import '@/styles/sideBar.css';
</style>
