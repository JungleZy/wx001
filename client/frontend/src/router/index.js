import { createRouter, createWebHistory } from 'vue-router'
import routerMap from './routerMap'

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerMap,
})

export default Router
