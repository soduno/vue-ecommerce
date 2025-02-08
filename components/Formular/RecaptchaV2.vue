<template>
  <div>
    <div class="ml-5 mb-2">
      <recaptcha style="margin-left: -20px;" />
      <div
        v-if="captchaError"
        class="text-left"
        style="font-size: 14px; color: brown;"
      >
        Please verify that you are not a robot.
      </div>
    </div>
    <div
      @click="submit"
      class="button btn-primary"
      style="float: none; width: 100%"
    >
      Send
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: { type: Object, required: true },
    formValidations: { type: Object, required: true }
  },
  data() {
    return {
      captchaError: null,
      formErrors: {}
    };
  },
  methods: {
    async submit() {
      if (this.isFormValid()) {
        try {
          const token = await this.$recaptcha.getResponse();

          // send token to server alongside your form data

          // at the end you need to reset recaptcha
          await this.$recaptcha.reset();
          this.captchaError = null;
        } catch (error) {
          this.captchaError = error;
          return;
        }

        try {
          await this.$axios.$post(`/mails`, {
            'Name' : this.form.name,
            'Email' : this.form.email,
            'Company' : this.form.companyName,
            'Phone' : this.form.phone,
            'Message' : this.form.message,
          });

          this.$emit("formSubmitted");
        } catch (error) {
          console.log(error)
        }
      }
    },
    validate(valid, value) {
      const errors = [];
      valid.forEach(validation => {
        if (!validation.rule(value)) {
          errors.push(validation.msg);
        }
      });
      return errors;
    },
    isFormValid() {
      Object.entries(this.formValidations).forEach(([key, validation]) => {
        const value = this.form[key];
        const errors = this.validate(validation, value);
        this.formErrors[key] = errors;
      });

      const hasAnyError = Object.entries(this.formErrors).some(
        ([key, error]) => {
          return !!error.length;
        }
      );

      this.$emit("changeErrors", this.formErrors);
      return !hasAnyError;
    }
  }
};
</script>

<style lang="scss" scoped></style>
