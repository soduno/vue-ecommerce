<template>
  <div class="frontpage-references bg-blue py-10">
    <div class="frontpage-references__images">
      <VueSlickCarousel :centerMode="true" :arrows="true" :dots="true" :slidesToShow="4">
        <div class="frontpage-references__images-image flex flex-justify-center" v-for="(image, index) in images">
          <div>
            <img v-if="image.Reference" :src="image.Reference[0].url | formatImage" :alt="image.Reference[0].alternativeText">
            <img v-else :src="image">
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  props: ["images"],
  components: {
    VueSlickCarousel,
  },
  mounted() {
  },
};
</script>
<style lang="scss">
  .frontpage-references {
    .slick-track {
      display: flex !important;
      align-items: center !important;
    }
    &__images {
      max-width: 1200px;
      margin: auto;
      &-image {
        & > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
