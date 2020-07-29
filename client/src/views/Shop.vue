<template>
  <section class="section section-shop columns is-multiline mt-0">
    <ShopCard v-for="shop in shops" :key="shop.id" :shop="shop"/>
  </section>
</template>

<script>
import ShopCard from '../components/ShopCard'
export default {
  name: 'Shop',
  components: {
    ShopCard
  },
  created () {
    this.$store.dispatch('fetchShopList')
  },
  computed: {
    shops () {
      return this.$store.state.shops
    }
  }
}
</script>

<style>
  .section-shop{
    background-color: #e8edf7;
  }
</style>
