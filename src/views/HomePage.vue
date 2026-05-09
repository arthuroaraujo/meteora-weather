<template>
  <div class="home-page">
    <section class="hero-card">
      <p class="eyebrow">Plataforma meteorologica</p>
      <h1>Boas-vindas ao Meteora</h1>
      <p class="subtitle">Visualize temperatura e vento com uma interface mais clara, rapida e focada em leitura.</p>

      <div class="hero-actions">
        <router-link class="hero-link primary" to="/temperatura">Ver temperatura</router-link>
        <router-link class="hero-link secondary" to="/vento">Ver vento</router-link>
      </div>
    </section>

    <section class="info-grid">
      <article class="info-card accent">
        <h2>Dados confiaveis</h2>
        <p>O Meteora combina informacoes do modelo NOAA GFS para entregar previsoes detalhadas e atualizadas.</p>
      </article>

      <article class="info-card">
        <h2>Leitura objetiva</h2>
        <p>Acompanhe temperatura aparente, temperatura a 2 metros e velocidade do vento em tabelas e graficos.</p>
      </article>

      <article class="info-card">
        <h2>Planejamento rapido</h2>
        <p>Escolha um intervalo de datas e compare as variacoes do clima para organizar melhor seu dia.</p>
      </article>
    </section>
  </div>
</template>

<style scoped>
@import '@/styles/homePage.css';
</style>
