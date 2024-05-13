import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useKakao } from 'vue3-kakao-maps'
const { VITE_KAKAO_API_SERVICE_KEY } = import.meta.env
useKakao('ca86fba374178c1214e8509fb1da9617')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
