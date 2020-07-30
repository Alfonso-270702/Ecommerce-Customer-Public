<template>
<section class="hero">
<div class="hero-head is-primary">
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <h1 class="navbar-item" href="">
          CLBK
        </h1>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a @click="toHomePage" class="navbar-item">
          Home
        </a>
        <a @click="toCartPage" class="navbar-item">
          Cart
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="this.$store.state.isLogin === true">
          <a class="navbar-link">
            {{userEmail}}
          </a>
          <div class="navbar-dropdown">
            <a  @click="logout" class="navbar-item">
              Logout
            </a>
          </div>
        </div>

        <div class="navbar-item" v-if="this.$store.state.isLogin === false">
          <div class="buttons">
            <a @click="toRegisterPage" class="button is-info">
              <strong>Sign up</strong>
            </a>
            <a @click="toLoginPage" class="button is-link is-outlined">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

</nav>
</div>

</section>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toRegisterPage () {
      this.$router.push({ name: 'Register' })
    },
    toLoginPage () {
      this.$router.push({ name: 'Login' })
    },
    toHomePage () {
      this.$router.push({ name: 'Shop' })
    },
    toCartPage () {
      this.$router.push({ name: 'ShopCart' })
    },
    logout () {
      this.$store.commit('userLogoutStatus')
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('userLoginStatus')
    } else {
      this.$store.commit('userLogoutStatus')
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.isLogin
    },
    userEmail () {
      return localStorage.email
    }
  }
}
</script>

<style>
  .hero{
    background-color: #e8decf;
  }
</style>
