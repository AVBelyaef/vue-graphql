import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rockets',
    name: 'rockets',
    component: () => import(/* webpackChunkName: "about" */ '../views/RocketsView.vue')
  },
  {
    path: '/rocket/:id',
    name: 'rocket',
    component: () => import(/* webpackChunkName: "about" */ '../views/RocketView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
