<template>
  <v-card elevation="2">
    <div class="vento">
      <div class="date-inputs">
        <input type="date" class="custom-date-input" v-model="startDate">
        <input type="date" class="custom-date-input" v-model="endDate">
      </div>
      <button class="custom-button" @click="fetchWeatherData">Buscar Dados de Vento</button>

      <v-data-table :items="items" :headers="headers"></v-data-table>
      <Line v-if="loaded" :data="data" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchWeatherData } from '@/services/OpenMeteoService';
import { validateDates } from '@/utils/utils';
import { WindItem } from '@/interfaces/WindItem';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, ChartData, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default defineComponent({
  name: 'WindComponent',
  components: { Line },
  props: {
    startDate: {
      type: String, 
      required: true 
    },
    endDate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      startDate: '2024-01-01',
      endDate: '2024-01-01',
      items: [] as WindItem[],
      headers: [
        {title: 'Data', value: 'dateTime', align: 'center'},
        {title: 'Velocidade do Vento a 10m em km/h', value: 'wind_speed_10m', align: 'center'},
        {title: 'Velocidade do Vento a 80m em km/h', value: 'wind_speed_80m', align: 'center'},
      ] as any,
      weatherData: null as any,
      loaded: false,
      data: null as any,
    };
  },
  methods: {
    async fetchWeatherData() {
      const validationMessage = validateDates(this.startDate, this.endDate);
      if (validationMessage) {
        alert(validationMessage);
        return;
      }
      try {
        const responses = await fetchWeatherData({
          startDate: this.startDate,
          endDate: this.endDate
        });
        this.weatherData = responses;
        

        if (!this.weatherData?.hourly) {
          console.error('Dados da resposta da API estão incompletos:', this.weatherData);
          return
        }

        const list: WindItem[] = [];
        const dateTime = this.weatherData.hourly.time;
        const windSpeed10m = this.weatherData.hourly.windSpeed10m;
        const windSpeed80m = this.weatherData.hourly.windSpeed80m;
        
        
        windSpeed10m.forEach((el: any, index: number) => {
          const dateObject = new Date(dateTime[index]);
          const formattedDateTime = dateObject.toLocaleString('pt-BR', { timeZone: 'UTC' });

          const item: WindItem = {
            dateTime: formattedDateTime,
            wind_speed_10m: el.toFixed(2),
            wind_speed_80m: windSpeed80m[index].toFixed(2)
          };

          list.push(item);
        });

        this.items = list;
        

        this.data = {
          labels: this.items.map((item) => item.dateTime),
          datasets: [
            {
              label: 'Velocidade do Vento a 10m em km/h',
              backgroundColor: '#00FF00',
              data: this.items.map((item) => item.wind_speed_10m)
            },
            {
              label: 'Velocidade do Vento a 80m em km/h',
              backgroundColor: '#006400',
              data: this.items.map((item) => item.wind_speed_80m)
            }
          ]
        }
        this.loaded = true;

        this.$emit('update:startDate', this.startDate);
        this.$emit('update:endDate', this.endDate);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }
  }
});
</script>