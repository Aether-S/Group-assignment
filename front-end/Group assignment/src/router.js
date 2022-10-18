import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/login.vue'
import Positive from './views/positive.vue'
import Negative from './views/negative.vue'
import Secrets from './views/secrets.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/positive', component: Positive},
		{path: '/negative', component: Negative},
		{path: '/secrets', component: Secrets},
		{path: '/Login', component: Login}
	],
})

export default router
