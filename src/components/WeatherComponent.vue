<template>
  <section class="weather-panel" :class="`weather-panel-${mode}`">
    <div class="panel-header">
      <div :class="['panel-intro-card', `panel-intro-card-${mode}`]">
        <p class="panel-kicker">Consulta meteorologica</p>
        <h2>{{ panelTitle }}</h2>
        <p class="panel-copy">{{ panelDescription }}</p>
      </div>

      <div class="filters-card">
        <div class="date-inputs">
          <label class="input-group">
            <span>Data inicial</span>
            <input
              type="date"
              class="custom-date-input"
              v-model="localStartDate"
            />
          </label>

          <label class="input-group">
            <span>Data final</span>
            <input type="date" class="custom-date-input" v-model="localEndDate" />
          </label>
        </div>

        <button class="custom-button" @click="handleFetch">
          {{ buttonLabel }}
        </button>
      </div>
    </div>

    <div v-if="loaded" class="content-grid">
      <section class="data-card">
        <div class="section-heading">
          <h3>Resultados</h3>
          <p>{{ items.length }} registros carregados</p>
        </div>

        <v-data-table :items="items" :headers="headers" />
      </section>

      <section class="data-card chart-card">
        <div class="section-heading">
          <h3>Tendencia</h3>
          <p>Visualizacao das variacoes no periodo</p>
        </div>

        <Line :data="data" :options="chartOptions" />
      </section>
    </div>

    <section v-else class="empty-state">
      <h3>{{ emptyStateTitle }}</h3>
      <p>Selecione um intervalo de datas e carregue os dados para visualizar a tabela e o grafico.</p>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchWeatherData } from "../services/OpenMeteoService";
import { validateDates } from "../utils/utils";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  type ChartOptions,
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

    panelTitle(): string {
      return this.mode === "temperature" ? "Leitura termica" : "Leitura por altitude";
    },

    panelDescription(): string {
      return this.mode === "temperature"
        ? "Compare temperatura real e aparente no intervalo escolhido."
        : "Compare 10 e 80 metros no intervalo escolhido.";
    },

    emptyStateTitle(): string {
      return this.mode === "temperature" ? "Nenhum dado de temperatura carregado" : "Nenhum dado de vento carregado";
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

    chartOptions(): ChartOptions<"line"> {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top" as const,
          },
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 6,
            },
          },
        },
      };
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
          borderColor: i === 0 ? "#2f855a" : "#14532d",
          backgroundColor: i === 0 ? "rgba(47, 133, 90, 0.18)" : "rgba(20, 83, 45, 0.18)",
          tension: 0.35,
          fill: true,
        })),
      };
    },
  },
});
</script>

<style scoped>
@import "@/styles/sharedStyles.css";
</style>
