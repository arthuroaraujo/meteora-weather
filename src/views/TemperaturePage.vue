<template>
  <div class="temperatura-page">
    <h1>Temperatura</h1>
    <Temperature :start-date.sync="startDate"
      :end-date.sync="endDate"/>
  </div>
</template>
  
<script lang="ts">
import { fetchWeatherData } from '@/services/OpenMeteoService';
import Temperature from '../components/Temperature.vue';


export default {
  components: {
    Temperature,
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
          endDate: this.endDate});
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }
  }
}
</script>