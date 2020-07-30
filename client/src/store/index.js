import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shops: [],
    carts: [],
    isLogin: false,
    totalPrice: null
  },
  mutations: {
    shopLists (state, payload) {
      state.shops = payload
    },
    userCart (state, payload) {
      state.carts = payload.data
      state.totalPrice = payload.payment
    },
    userLoginStatus (state) {
      state.isLogin = true
    },
    userLogoutStatus (state) {
      state.isLogin = false
      localStorage.clear()
    },
    incrementQuantity (state, payload) {
      state.carts.forEach(item => {
        if (item.productId === payload.productId) {
          item.quantity = payload.quantity
        }
      })
    },
    decrementQuantity (state, payload) {
      state.carts.forEach(item => {
        if (item.productId === payload.productId) {
          item.quantity = payload.quantity
        }
      })
    }
  },
  actions: {
    registerForm (context, payload) {
      axios({
        method: 'post',
        url: '/user/register',
        data: payload
      })
        .then(_ => {
          router.push({ name: 'Login' })
        })
    },
    loginForm (context, payload) {
      axios({
        method: 'POST',
        url: '/user/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          router.push({ name: 'Shop' })
          context.commit('userLoginStatus')
        })
    },
    fetchShopList (context) {
      axios({
        method: 'get',
        url: '/shops'
      })
        .then(({ data }) => {
          context.commit('shopLists', data)
        })
    },
    addToCart (context, id) {
      axios({
        method: 'post',
        url: `/shops/detail/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(_ => {
          Swal.fire({
            icon: 'success',
            title: 'Success Add To Cart'
          })
        })
    },
    userCart (context) {
      axios({
        method: 'get',
        url: '/shops/detail',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('userCart', data)
        })
    },
    editedQuantity (context, payload) {
      axios({
        method: 'put',
        url: `/shops/detail/${payload.id}`,
        data: {
          quantity: payload.quantity
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(_ => {
          context.dispatch('userCart')
        })
    },
    deleteItem (context, id) {
      axios({
        method: 'delete',
        url: `/shops/detail/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(_ => {
          context.dispatch('userCart')
        })
    },
    checkOutProduct (context) {
      axios({
        method: 'post',
        url: '/payment',
        headers: {
          token: localStorage.token
        }
      })
        .then(_ => {
          Swal.fire({
            icon: 'success',
            title: 'Thank You For Buying In This Website'
          })
          router.push({ name: 'Shop' })
        })
    },
    increment (context, id) {
      axios({
        method: 'put',
        url: `/shops/plus/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('incrementQuantity', data)
          context.dispatch('userCart')
        })
    },
    decrement (context, id) {
      axios({
        method: 'put',
        url: `/shops/minus/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit('decrementQuantity', data)
          context.dispatch('userCart')
        })
    }
  },
  modules: {
  }
})
