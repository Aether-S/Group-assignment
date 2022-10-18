// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import router from './router.js'

// createApp(App).mount('#app')
// App.use(router)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './style.css'


const app = createApp(App)

app.use(router)

app.mount('#app')