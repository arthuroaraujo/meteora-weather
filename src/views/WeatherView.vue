<template>
  <div class="weather-page">
    <h1>Clima</h1>

    <WeatherComponent
      mode="temperature"
      v-model:startDate="startDate"
      v-model:endDate="endDate"
    />

    <WeatherComponent
      mode="wind"
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