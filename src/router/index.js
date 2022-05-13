import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import rekomendasiHasil from '@/components/rekomendasiHasil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'rekomendasiHasil',
        name: 'rekomendasiHasil',
        component: rekomendasiHasil
      }
    ]

  },
  {
    path: '/calcbmi',
    name: 'calcbmi',
    component: () => import('../views/calcBmi.vue')

  },
  {
    path: '/calcKalori',
    name: 'calcKalori',
    component: () => import('../views/calcKalori.vue'),
    children: [
      {
        path: '/calcKalori/karbohidratView',
        name: 'karbohidratView',
        component: () => import('../components/karbohidratView.vue')
      },
      {
        path: '/calcKalori/proteinView',
        name: 'proteinView',
        component: () => import('../components/proteinView.vue')
      },
      {
        path: '/calcKalori/buahView',
        name: 'buahView',
        component: () => import('../components/buahView.vue')
      },
      {
        path: '/calcKalori/sayurView',
        name: 'sayurView',
        component: () => import('../components/sayurView.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/contactView.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
