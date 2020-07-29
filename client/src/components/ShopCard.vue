<template>
  <div class="card card-shop">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="shop.image_url" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{shop.name}}</p>
        </div>
      </div>

      <div class="content">
        <p class="subtitle is-6">Rp {{Number(shop.price).toLocaleString()}}</p>
        stock: {{shop.stock}}
        <br>
        <button @click="addToCart(shop.id)" class="button is-success">Add To Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCard',
  props: ['shop'],
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    }
  }
}
</script>

<style>
  .card-shop{
    width: 300px;
    height: 500px;
    margin-left: 300px;
    margin-top: 50px;
  }
</style>
