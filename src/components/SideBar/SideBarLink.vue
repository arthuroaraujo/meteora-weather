<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { collapsed } from './state'

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true }
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return { isActive, collapsed }
  }
}
</script>

<template>
  <router-link :to="to" class="link" :class="{ active: isActive }">
    <i class="icon" :class="icon"></i>
    <transition name="fade">
      <span v-if="!collapsed">
        <slot></slot>
      </span>
    </transition>
  </router-link>
</template>

<style scoped>
@import '@/styles/sideBarLink.css';
</style>