<template>
  <div>
    <Header :header="header" />
    <main>
      <nuxt />
    </main>
    <Footer :footer="footer" />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["meta"]),
    header() {
      return {
        logo: {
          src: this.$formatImage(this.meta.Logo.url),
          altText: this.meta.Logo.alternativeText
        },
        telephone: this.meta.Telephone
      };
    },
    footer() {
      return {
        widget1: this.meta.FooterWidget1,
        widget2: this.meta.FooterWidget2,
        widget3: this.meta.FooterWidget3,
        images: this.meta.FooterImagesBottom
      };
    }
  }
};
</script>
<style>
/* I have removed all styles from here into scss, because that much styles should be separated */
</style>
