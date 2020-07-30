<template>
<section class="section is-fullheight section-cart">
  <div class="container">
  <div class="columns mt-5">
    <div class="column is-half">
    <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" :price="price"/>
    </div>
    <div class="column">
      <div class="card">
        <div class="card-content">
          <p class="title">
          Total Price:
          </p>
          <p class="subtitle">
            Rp {{price}}
          </p>
          <button @click="checkOut" class="button is-success"> Execute</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</section>
</template>

<script>
import CartCard from '../components/CartCard'
export default {
  name: 'ShopCart',
  components: {
    CartCard
  },
  created () {
    this.$store.dispatch('userCart')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    price () {
      return this.$store.state.totalPrice
    }
  },
  methods: {
    checkOut () {
      this.$store.dispatch('checkOutProduct')
    }
  }
}
</script>

<style>
  .section-cart{
    background-color: #dee0e4;
    min-height: 100vh;
  }
</style>
