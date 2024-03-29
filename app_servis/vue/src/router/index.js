import Vue from 'vue'
import VueRouter from 'vue-router'
import Predstave from '../views/Predstave.vue'
import Pozorista from '@/views/Pozorista.vue'
import PozoristeDetalji from '@/components/PozoristeDetalji.vue'
import PredstavaDetalji from '@/components/PredstavaDetalji.vue'
import Glumci from '@/views/Glumci.vue'
import Rezervacija from '@/views/Rezervacija.vue'
import Login from '@/views/Login.vue'
import Registracija from '@/views/Registracija.vue'


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
  {
    path: '/predstave-detalji/:id',
    name: 'PredstavaDetalji',
    component: PredstavaDetalji
  },
  {
    path: '/glumci',
    name: 'glumci',
    component: Glumci
  },
  {
    path: '/rezervacija',
    name: 'Rezervacija',
    component: Rezervacija,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registracija',
    name: 'Registracija',
    component: Registracija,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
