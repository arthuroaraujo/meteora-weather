<template>
  <div class="wind-page">
    <h1>Velocidade do Vento</h1>
    <Wind :start-date.sync="startDate"
      :end-date.sync="endDate"/>
  </div>
</template>

<script lang="ts">
import { fetchWeatherData } from '@/services/OpenMeteoService';
import Wind from '../components/Wind.vue';

export default {
  components: {
    Wind,
  },
  data() {
    return {
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    async fetchMethod() {
      try {
        const response = await fetchWeatherData({
          startDate: this.startDate,
          endDate: this.endDate
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }
  }
};
</script>
