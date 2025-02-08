<template>
  <div class="product-description-tab">
    <div v-html="description"></div>
  </div>
</template>

<script>
export default {
  props: {
    description: String
  }
};
</script>

<style lang="scss">
.product-description-tab {
  padding: 0 25px;
  font-weight: 100;
  font-size: 0.7em !important;
  line-height: 25px;
  h1,
  h2,
  h3 {
    color: #092d4f;
    font-size: 20px !important;
    margin-bottom: 10px;
  }
}
</style>
