<template>
  <div>
    <ClientOnly>
      <div v-if="!noOfItems" class="cart-placeholder"></div>
      <div v-if="!!noOfItems" class="cart2">
        <nuxt-link to="/kurv">
          <span class="pr-2">
            <i class="fas fa-shopping-cart mr-11"></i>
            Produkter ({{ noOfItems }})
          </span>
        </nuxt-link>
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["noOfItems"])
  }
};
</script>

<style lang="scss" scoped>
.cart2 {
  position: relative;
  display: inline-block;
  background: #092d4f;
  padding: 8px 36px 8px 14px;
  font-size: 0.8em;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.cart-placeholder {
  height: 38px;
  width: 100%;
}

a {
  color: white;
}
</style>
