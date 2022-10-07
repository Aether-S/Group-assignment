import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/HomeView.vue'


const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/',      component: HomeView},
		{path: '/about', component: AboutView},
		{path: '/ads', component: AdsView},
	],
})

export default router
