<template>
  <div class="weather-page-shell">
    <section class="wind-hero">
      <div class="wind-hero-copy">
        <p class="page-kicker wind-kicker">Correntes de ar</p>
        <h1>Vento</h1>
        <p class="page-copy wind-copy">Compare o movimento do vento entre baixas e medias alturas com uma leitura mais direta e visual.</p>
      </div>

      <div class="wind-hero-chips">
        <article class="wind-chip wind-chip-strong">
          <span class="wind-chip-label">Camadas</span>
          <strong>10 m e 80 m</strong>
        </article>

        <article class="wind-chip">
          <span class="wind-chip-label">Foco</span>
          <strong>Intensidade</strong>
        </article>

        <article class="wind-chip">
          <span class="wind-chip-label">Leitura</span>
          <strong>Tabela + grafico</strong>
        </article>
      </div>
    </section>

    <WeatherComponent
      mode="wind"
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
.wind-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.9fr);
  gap: 24px;
  align-items: stretch;
  padding: 28px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(125, 211, 252, 0.24), transparent 28%),
    linear-gradient(135deg, #0f172a 0%, #1d4ed8 52%, #0ea5e9 100%);
  color: #fff;
  box-shadow: 0 24px 60px rgba(14, 116, 144, 0.18);
}

.wind-kicker {
  color: rgba(224, 242, 254, 0.76);
}

.wind-copy {
  max-width: 620px;
  color: rgba(239, 246, 255, 0.88);
}

.wind-hero-chips {
  display: grid;
  gap: 12px;
}

.wind-chip {
  display: grid;
  gap: 6px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: rgba(239, 246, 255, 0.1);
  backdrop-filter: blur(8px);
}

.wind-chip-strong {
  background: rgba(224, 242, 254, 0.16);
}

.wind-chip-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(224, 242, 254, 0.72);
}

.wind-chip strong {
  font-size: 1.05rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .wind-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .wind-hero {
    padding: 22px;
  }
}
</style>
