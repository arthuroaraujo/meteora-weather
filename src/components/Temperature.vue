<template>
  <v-card class="card" elevation="2">
    <div class="weather-div">
      <div class="date-inputs">
        <input type="date" class="custom-date-input" v-model="startDate">
        <input type="date" class="custom-date-input" v-model="endDate">
      </div>
      <button class="custom-button" @click="fetchWeatherData">Buscar Dados Meteorológicos</button>
      <div class="content-div">
        <v-data-table :items="items" :headers="headers"></v-data-table>
        <Line v-if="loaded" :data="data" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchWeatherData } from '@/services/OpenMeteoService';
import { validateDates } from '@/utils/utils';
import { TemperatureItem } from '@/interfaces/TemperatureItem'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, ChartData, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default defineComponent({
  name: 'TemperatureComponent',
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
      startDate: '',
      endDate: '',
      items: [] as TemperatureItem[],
      headers: [
        { title: 'Data', value: 'dateTime', align: 'center' },
        { title: 'Temperatura Aparente em °C', value: 'apparent_temperature', align: 'center' },
        { title: 'Temperatura a 2m em °C', value: 'temperature_2m', align: 'center' },
      ] as any,
      weatherData: null as any,
      loaded: false,
      data: null as any,
    }
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

        const list: TemperatureItem[] = [];
        const dateTime = this.weatherData.hourly.time;
        const apTemp = this.weatherData.hourly.apparentTemperature;
        const temp2m = this.weatherData.hourly.temperature2m;

        apTemp.forEach((el: any, index: number) => {
          const dateObject = new Date(dateTime[index]);
          const formattedDateTime = dateObject.toLocaleString('pt-BR', { timeZone: 'UTC' });

          const item: TemperatureItem = {
            dateTime: formattedDateTime,
            apparent_temperature: el.toFixed(2),
            temperature_2m: temp2m[index].toFixed(2),
          };

          list.push(item);
        });

        this.items = list;

        this.data = {
          labels: this.items.map((item) => item.dateTime),
          datasets: [
            {
              label: 'Temperatura Aparente em °C',
              backgroundColor: '#00FF00',
              data: this.items.map((item) => item.apparent_temperature)
            },
            {
              label: 'Temperatura a 2m em °C',
              backgroundColor: '#006400',
              data: this.items.map((item) => item.temperature_2m)
            }
          ]
        }
        this.loaded = true

        this.$emit('update:startDate', this.startDate);
        this.$emit('update:endDate', this.endDate);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);

      }
    }
  }
});


</script>

<style scoped>
@import '@/styles/sharedStyles.css';
</style>