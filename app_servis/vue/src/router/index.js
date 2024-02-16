import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Pozorista from '@/views/Pozorista.vue'
import PozoristeDetalji from '@/views/PozoristeDetalji.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pozorista',
    component: Pozorista
  },
  {
    path: '/pozoriste/:id',
    name: 'PozoristeDetalji',
    component: PozoristeDetalji
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
