<template>
  <div class="box">
    <article class="media">
        <div class="media-left">
        <figure class="">
            <img :src="cart.Product.image_url" alt="Image">
        </figure>
        </div>
        <div class="media-content">
          <div class="content">
              <p>
              <strong>{{cart.Product.name}}</strong>
              <br>
              <small>Rp {{Number(cart.Product.price).toLocaleString()}}</small>
              </p>
              <button @click="increment" class="button is-primary mr-1"> <i class="fas fa-plus"></i></button>
              <button @click="decrement" class="button is-primary mr-1"> <i class="fas fa-minus"></i></button>
              <input type="number" :value="cart.quantity" min="0" readonly>
              <button @click="deleteItem" class="button is-warning ml-2">
              <i class="far fa-trash-alt"></i>
              </button>
          </div>
        </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart', 'price'],
  data () {
    return {
      quantity: this.cart.quantity
    }
  },
  methods: {
    deleteItem () {
      this.$store.dispatch('deleteItem', this.cart.Product.id)
    },
    increment () {
      this.$store.dispatch('increment', this.cart.productId)
    },
    decrement () {
      this.$store.dispatch('decrement', this.cart.productId)
    }
  }
}
</script>

<style>
  img{
    width: 200px;
    height: 200px;
  }
  input{
    height: 40px;
  }
</style>
