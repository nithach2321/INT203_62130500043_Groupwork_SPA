import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import MyTemplate from './components/MyTemplate.vue'

const app = createApp(App)
app.component('my-template', MyTemplate)
app.use(router).mount('#app')
