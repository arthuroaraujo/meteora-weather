<script lang="ts">
import SidebarLink from '@/components/SideBar/SideBarLink.vue'

export default {
  components: { SidebarLink },
}
</script>

<template>
  <div class="sidebar">
    <h1>
      <span>Meteora</span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Início</SidebarLink>
    <SidebarLink to="/temperatura" icon="fas fa-columns">Temperatura</SidebarLink>
    <SidebarLink to="/vento" icon="fas fa-chart-bar">Vento</SidebarLink>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
@import '@/styles/sideBar.css';
</style>