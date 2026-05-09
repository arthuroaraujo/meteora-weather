<template>
  <div class="weather-page-shell">
    <section class="temperature-hero">
      <div class="temperature-hero-copy">
        <p class="page-kicker temperature-kicker">Leitura termica</p>
        <h1>Temperatura</h1>
        <p class="page-copy temperature-copy">Entenda a diferenca entre a temperatura medida e a sensacao termica com uma leitura mais clara e comparativa.</p>
      </div>

      <div class="temperature-hero-chips">
        <article class="temperature-chip temperature-chip-strong">
          <span class="temperature-chip-label">Comparacao</span>
          <strong>Real x aparente</strong>
        </article>

        <article class="temperature-chip">
          <span class="temperature-chip-label">Camada</span>
          <strong>2 metros</strong>
        </article>

        <article class="temperature-chip">
          <span class="temperature-chip-label">Leitura</span>
          <strong>Tabela + grafico</strong>
        </article>
      </div>
    </section>

    <WeatherComponent
      mode="temperature"
      v-model:startDate="startDate"
      v-model:endDate="endDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WeatherComponent from '../components/WeatherComponent.vue'

const startDate = ref('')
const endDate = ref('')
</script>

<style scoped>
.temperature-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.9fr);
  gap: 24px;
  align-items: stretch;
  padding: 28px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(254, 240, 138, 0.24), transparent 28%),
    linear-gradient(135deg, #7f1d1d 0%, #c2410c 46%, #f97316 100%);
  color: #fff;
  box-shadow: 0 24px 60px rgba(194, 65, 12, 0.18);
}

.temperature-kicker {
  color: rgba(255, 237, 213, 0.8);
}

.temperature-copy {
  max-width: 620px;
  color: rgba(255, 247, 237, 0.9);
}

.temperature-hero-chips {
  display: grid;
  gap: 12px;
}

.temperature-chip {
  display: grid;
  gap: 6px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  background: rgba(255, 247, 237, 0.12);
  backdrop-filter: blur(8px);
}

.temperature-chip-strong {
  background: rgba(255, 237, 213, 0.18);
}

.temperature-chip-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 237, 213, 0.74);
}

.temperature-chip strong {
  font-size: 1.05rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .temperature-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .temperature-hero {
    padding: 22px;
  }
}
</style>
