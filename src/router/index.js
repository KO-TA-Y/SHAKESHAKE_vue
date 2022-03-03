import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/select',
    name: 'Select',
    component: () => import('../views/Select.vue')
  },
  {
    path: '/master',
    name: 'Master',
    component: () => import('../views/Master.vue')
  },
  {
    path: '/slave/:id',
    name: 'Slave',
    component: () => import('../views/Slave.vue')
  },
  {
    path: '/shake',
    name: 'Shake',
    component: () => import('../views/Shake.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
