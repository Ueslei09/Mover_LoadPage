

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar o CSS do Bootstrap e os Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Opcional: Se for usar componentes JavaScript do Bootstrap (como Modais, Tooltips, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
