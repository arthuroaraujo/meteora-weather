import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { registerPlugins } from '@/plugins'

import HomePage from './views/HomePage.vue'
import TemperaturePage from './views/TemperaturePage.vue'
import WindPage from './views/WindPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/temperatura', component: TemperaturePage },
    { path: '/vento', component: WindPage },
  ]
})

const app = createApp(App)

registerPlugins(app)

app.use(router)

app.mount('#app')