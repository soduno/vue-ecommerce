<template>
  <div></div>
</template>

<script>
export default {
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async onSubmit() {
      try {
        const token = await this.$recaptcha.execute("login");

        // send token to server alongside your form data
      } catch (error) {

      }
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy();
  }
};
</script>

<style lang="scss" scoped></style>
