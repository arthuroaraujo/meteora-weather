<template>
    <div class="weather-div">
      <div class="filters">
        <div class="date-inputs">
          <input
            type="date"
            class="custom-date-input"
            v-model="localStartDate"
          />
          <input type="date" class="custom-date-input" v-model="localEndDate" />
        </div>

        <button class="custom-button" @click="handleFetch">
          {{ buttonLabel }}
        </button>
      </div>

      <div class="content-div">
        <v-data-table v-if="loaded" :items="items" :headers="headers" />
        <Line v-if="loaded" :data="data" />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { fetchWeatherData } from "@/services/OpenMeteoService";
import { validateDates } from "@/utils/utils";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

export default defineComponent({
  name: "WeatherComponent",
  components: { Line },

  props: {
    mode: {
      type: String as () => "temperature" | "wind",
      required: true,
    },
    startDate: String,
    endDate: String,
  },

  data() {
    return {
      localStartDate: this.startDate || "",
      localEndDate: this.endDate || "",
      items: [] as any[],
      weatherData: null as any,
      loaded: false,
      data: null as any,
    };
  },

  computed: {
    buttonLabel(): string {
      return this.mode === "temperature"
        ? "Buscar Dados Meteorológicos"
        : "Buscar Dados de Vento";
    },

    headers(): any[] {
      if (this.mode === "temperature") {
        return [
          { title: "Data", value: "dateTime", align: "center" },
          {
            title: "Temp. Aparente °C",
            value: "apparent_temperature",
            align: "center",
          },
          { title: "Temp. 2m °C", value: "temperature_2m", align: "center" },
        ];
      }

      return [
        { title: "Data", value: "dateTime", align: "center" },
        { title: "Vento 10m km/h", value: "wind_speed_10m", align: "center" },
        { title: "Vento 80m km/h", value: "wind_speed_80m", align: "center" },
      ];
    },
  },

  methods: {
    async handleFetch() {
      const validationMessage = validateDates(
        this.localStartDate,
        this.localEndDate,
      );
      if (validationMessage) {
        alert(validationMessage);
        return;
      }

      try {
        const responses = await fetchWeatherData({
          startDate: this.localStartDate,
          endDate: this.localEndDate,
        });

        this.weatherData = responses;

        if (!this.weatherData?.hourly) {
          console.error("Dados incompletos:", this.weatherData);
          return;
        }

        const dateTime = this.weatherData.hourly.time;

        const list: any[] = [];

        if (this.mode === "temperature") {
          const apTemp = this.weatherData.hourly.apparentTemperature;
          const temp2m = this.weatherData.hourly.temperature2m;

          apTemp.forEach((el: number, index: number) => {
            list.push({
              dateTime: this.formatDate(dateTime[index]),
              apparent_temperature: el.toFixed(2),
              temperature_2m: temp2m[index].toFixed(2),
            });
          });

          this.data = this.buildChart(
            list,
            ["apparent_temperature", "temperature_2m"],
            ["Temperatura Aparente °C", "Temperatura 2m °C"],
          );
        } else {
          const wind10 = this.weatherData.hourly.windSpeed10m;
          const wind80 = this.weatherData.hourly.windSpeed80m;

          wind10.forEach((el: number, index: number) => {
            list.push({
              dateTime: this.formatDate(dateTime[index]),
              wind_speed_10m: el.toFixed(2),
              wind_speed_80m: wind80[index].toFixed(2),
            });
          });

          this.data = this.buildChart(
            list,
            ["wind_speed_10m", "wind_speed_80m"],
            ["Vento 10m km/h", "Vento 80m km/h"],
          );
        }

        this.items = list;
        this.loaded = true;

        this.$emit("update:startDate", this.localStartDate);
        this.$emit("update:endDate", this.localEndDate);
      } catch (error) {
        console.error("Erro API:", error);
      }
    },

    formatDate(date: string) {
      return new Date(date).toLocaleString("pt-BR", { timeZone: "UTC" });
    },

    buildChart(items: any[], keys: string[], labels: string[]) {
      return {
        labels: items.map((i) => i.dateTime),
        datasets: keys.map((key, i) => ({
          label: labels[i],
          data: items.map((item) => item[key]),
          backgroundColor: i === 0 ? "#00FF00" : "#006400",
        })),
      };
    },
  },
});
</script>

<style scoped>
@import "@/styles/sharedStyles.css";
</style>
