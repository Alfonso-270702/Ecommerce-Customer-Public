<template>
  <div class="box">
    <article class="media">
        <div class="media-left">
        <figure class="image-cart">
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
              <input type="number" v-model="quantity" :max="cart.Product.stock" min="0">
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
    }
  },
  watch: {
    quantity () {
      this.$store.dispatch('editedQuantity', {
        quantity: this.quantity,
        id: this.cart.productId
      })
    }
  }
}
</script>

<style>
  .image-cart{
    width: 200px;
    height: 200px;
  }
  input{
    height: 40px;
  }
</style>
