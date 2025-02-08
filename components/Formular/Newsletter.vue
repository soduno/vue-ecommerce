<template>
  <div class="newsletter-form">
    <div class="mb-1">
      <input type="text" placeholder="Navn" v-model="form.firstname" />
    </div>
    <div class="mb-1">
      <input type="text" placeholder="Firma" v-model="form.company" />
    </div>
    <div class="mb-1">
      <input type="email" placeholder="E-mail" v-model="form.email" />
    </div>
    <div v-if="!disableSubmit" @click="submit" class="mt-1 button btn-primary submitBtn">Tilmeld</div>
    <div v-if="message" class="mt-2 message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultErrorMsg: "Something went wrong",
      successMsg: "You have successfully subscribed to our newsletter.",
      message: null,
      disableSubmit: false,
      form: {
        firstname: "",
        company: "",
        email: ""
      }
    };
  },
  methods: {
    resetForm() {
      this.form = {
        firstname: "",
        company: "",
        email: ""
      };
    },
    async submit() {
      if (this.form.email && this.form.firstname) {
        try {
          const r = await this.$axios.$post(
            `${process.env.serviceApi}/api/mailchimp/subscribe`,
            this.form
          );
          this.message = "Du er nu tilmeldt vores nyhedsbrev.";
          this.disableSubmit = true
        } catch (error) {
          this.message = "Der skete desværre en fejl. Dette kan skyldes at du allerede er tilmeldt.";
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.newsletter-form {
  display: block;
  max-width: 250px;
  .message {
    width: 100%;
    font-size: 0.9em;
  }
  .submitBtn {
    background: #1561ad;
    font-size: 13px;
    font-weight: 600;
    border-radius: 5px;
    width: 100%;
    text-align: center;
  }
}
</style>
