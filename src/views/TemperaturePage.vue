<template>
  <div class="temperatura-page">
    <h1 class=my-3>Temperatura</h1>

    <WeatherComponent
      mode="temperature"
      v-model:startDate="startDate"
      v-model:endDate="endDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WeatherComponent from '@/components/WeatherComponent.vue'

const startDate = ref('')
const endDate = ref('')
</script>