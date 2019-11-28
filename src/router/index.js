import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter)

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/Unauthorized')
}

const meta = {
  title: 'Auth SPA | JT Houk',
  metaTags: [
    {
      name: 'description',
      content: 'Test out stateless JWT and OAuth from an external API'
    },
    {
      property: 'og:description',
      content: 'Test out stateless JWT and OAuth from an external API'
    }
  ]
}

const routes = [
  {
    path: '/',
    name: 'home',
    meta,
    component: SignIn
  },
  {
    path: '/tests',
    name: 'Tests',
    meta,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Tests.vue')
  },
  {
    path: '/secret-route',
    name: 'secret-route',
    meta,
    beforeEnter: isAuthenticated,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SecretRoute.vue')
  },
  {
    path: '/Unauthorized',
    name: 'Unauthorized',
    meta,
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Unauthorized.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
