import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Shop from '../views/Shop.vue'
import ShopCart from '../views/ShopCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user-login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user-register',
    name: 'Register',
    component: Register
  },
  {
    path: '/shops',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/shops/detail',
    name: 'ShopCart',
    component: ShopCart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'ShopCart' && !localStorage.token) next({ name: 'Login' })
  else if (to.name === 'Login' && localStorage.token) next({ name: 'Shop' })
  else if (to.name === 'Register' && localStorage.token) next({ name: 'Shop' })
  else next()
})

export default router
