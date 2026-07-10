import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouterGuards } from './router/index.js'
import store from './store/index.js'
import './assets/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

// Setup auth guards after store is registered
setupRouterGuards(router, store)

app.mount('#app')
