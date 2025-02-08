<template>
  <div class="background-image" :style="`background-image: url(${imageSource})`">
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    minHeight: { type: Number, required: false }
  },
  data() {
    return {
      defaultCoverImage: require('~/assets/images/covers/default-cover.jpeg'),
    }
  },
  computed: {
    minHeightProcessed() {
      return this.minHeight ? `${this.minHeight}px` : "100%";
    },
    imageSource() {
      if(this.src.match(/\.(jpeg|jpg|gif|png)$/)) {
        return this.src;
      }
      return this.defaultCoverImage;
    }
  }
};
</script>

<style lang="scss" scoped>
.background-image {
  background-position: center center;
  background-size: cover;
  height: 100%;
  width: 100%;
}
</style>
