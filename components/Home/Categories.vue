<template>
  <div class="info">
    <div class="info-card" v-for="(item, index) in categories" :key="index">
      <h3>{{ item.Title }}</h3>
      <div class="img-wrapper">
        <img class="info-card-img" :alt="'Service, installation & levering - ' + item.Title" :src="item.Icon.url | formatImage" />
      </div>
      <Counter
        :end="item.Counter"
        :render="counterAnimationLoaded"
        :durationMs="2000"
      />
    </div>
  </div>
</template>

<script>
import Counter from "@/components/Utilities/Counter";

export default {
  components: {
    Counter
  },
  props: {
    categories: {
      type: Array,
      default: []
    },
    counterAnimationLoaded: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;

  @media screen and (min-width: 767px) {
    h3 {
      font-size: 1em;
      font-weight: bold;
      color: #092d4f;
    }
  }

  .info-card {
    text-align: center;
    margin: 15px;

    .img-wrapper {
      height: 160px;
      margin: 12px 0;

      .info-card-img {
        padding: 35px 0;
      }
    }

    .info-card-spinner {
      font-size: 2.1em;
      font-weight: 700;
    }
  }
}

@media only screen and (max-width: 767px) {
  .info {
    h3 {
      font-size: 20px; //please never use important in css
    }
    .info-card {
      width: 110px;

      .img-wrapper {
      }

      .info-card-spinner {
        font-size: 3em;
        font-weight: 700;
      }
    }
  }
}
</style>
