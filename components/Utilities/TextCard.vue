<template>
  <div
    class="text-card"
    :class="`${backgroundClass} ${dark ? 'dark' : 'primary'}`"
    :style="largeCSS"
  >
    <div class="text-card-container" :style="containerCSS">
      <div class="text-card-body" v-html="html"></div>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentHtml: { type: String, default: "" },
    backgroundClass: { type: String, default: "bg-white" },
    dark: { type: Boolean, default: false },
    largeCSS: { type: String, required: false },
    containerCSS: { type: String, required: false }
  },
  computed: {
    html() {
      return this.$formatHTML(this.contentHtml);
    }
  }
};
</script>

<style lang="scss">
.text-card {
  padding: 45px;
  width: 100%;
  h2,
  h2 * {
    font-weight: 700 !important;
  }
  .max-width-container {
    max-width: 1350px;
    margin: 0 auto;
  }
  .text-card-body {
    img {
      width: 100%;
      height: 100%;
    }

    i {
      font-size: 0.6em;
    }
  }
}
.dark {
  h1,
  h2,
  h3,
  h4 {
    color: #ffffff;
  }
}
.primary {
  h1,
  h2,
  h3,
  h4 {
    color: #092d4f;
  }
}
@media screen and (min-width: 1600px) {
  .text-card {
    padding: 45px 230px;
  }
}

@media screen and (max-width: 767px) {
  .text-card {
    padding: 15px !important;
  }
}
</style>
