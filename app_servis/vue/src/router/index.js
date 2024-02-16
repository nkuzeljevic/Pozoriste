import Vue from 'vue'
import VueRouter from 'vue-router'
import Predstave from '../views/Predstave.vue'
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
    path: '/pozoriste-detalji/:id',
    name: 'PozoristeDetalji',
    component: PozoristeDetalji,
  },
  {
    path: '/predstave',
    name: 'predstave',
    component: Predstave
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
