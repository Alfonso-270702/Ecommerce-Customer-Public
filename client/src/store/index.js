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
          // console.log(data)
          context.commit('shopLists', data)
        })
    },
    // addToCart (context, id) {
    //   axios({
    //     method: 'get',
    //     url: '/shops'
    //   })
    //     .then(({ data }) => {
    //       console.log(data)
    //     })
    // },
    addToCart (context, id) {
      axios({
        method: 'post',
        url: `/shops/detail/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
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
          // console.log(data)
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
    }
    // checkOutProduct (context) {
    //   axios({
    //     method: 'post',
    //     url: '/payment',
    //     headers: {
    //       token: localStorage.token
    //     }
    //   })
    //     .then(_ => {
    //       router.push({ name: 'Shop' })
    //     })
    // }
  },
  modules: {
  }
})
