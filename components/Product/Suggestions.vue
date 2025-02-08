<template>
  <div v-if="products.length" class="mb-10">
    <h2 class="ml-6 mb-6" style="font-size: 24px;">
      Du kunne også være interesseret i...
    </h2>
    <div class="products">
      <div class="row">
        <div class="col" v-for="product in products" :key="product.info.id">
          <nuxt-link :to="`/produkt/${product.info.slug}`">
            <div
              @mouseenter="hover = product.info.id"
              @mouseleave="hover = null"
              class="product"
              :class="hover === product.info.id ? 'active' : ''"
            >
              <div class="product-img-container">
                <img class="product-img" :src="product.gallery.main.url | formatImage" :alt="product.gallery.main.alternativeText" />
              </div>
              <h3 class="product-title text-blue text-center mt-3">
                {{ product.info.name }}
              </h3>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array, default: [] }
  },
  data() {
    return {
      hover: null
    };
  }
};
</script>

<style lang="scss" scoped>
.products {
  cursor: pointer;
  .product {
    display: block;
    width: 225px;
    height: 225px;
    margin: 0 15px;
    border: 1px solid #ccc;
    padding: 15px;
    .product-img-container {
      width: 80%;
      height: 80%;
      margin: 10px auto 0 auto;
      .product-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-position: center center;
      }
    }
    .product-title {
      clear: both;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.7em;
    }
  }
  .product.active {
    border-color: #092d4f;
  }
}
</style>
