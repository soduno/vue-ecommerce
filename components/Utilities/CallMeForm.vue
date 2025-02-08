<template>
  <div class="call-me">
    <div class="call-me-form">
      <input v-model="name" class="mb-4" type="text" placeholder="Navn" />

      <input
          v-model="phone"
          class="mb-4"
          type="text"
          placeholder="Telefon nr."
      />

      <button @click="submit" v-if="!isSubmitted" class="button btn-primary btn-block">Send</button>
    </div>
    <div
        v-if="result"
        class="mt-2 result-container"
        :class="error ? 'msg-error' : 'msg-success'"
    >
      {{ result }}
    </div>
  </div>
</template>

<script>

const messages = {
  success: "Vi vil vende tilbage snarest muligt.",
  error: {
    nameNotEmpty: "Navn skal være udfyldt.",
    phoneNotEmpty: "Telefon nr. skal være udfyldt",
    phoneNotValid: "Telefon nr. er ikke gyldigt."
  }
}

export default {
  data() {
    return {
      name: "",
      phone: "",
      error: false,
      result: "",
      isSubmitted: false,
    };
  },
  methods: {
    submit() {
      if (!this.validate()) return;

      try {
        this.$axios.$post(process.env.apiUrl + '/mails-calls', {
          'Name' : this.name,
          'Phone' : this.phone,
        });

        this.$emit("formSubmitted");
        this.isSubmitted = true;
      } catch (error) {
        console.log(error)
      }


      this.error = false;
      this.result = messages.success;
      this.resetForm();
    },
    validate() {
      if (!this.name) {
        this.result = messages.error.nameNotEmpty;
        this.error = true;
        return false;
      }

      if (!this.phone) {
        this.result = messages.error.phoneNotEmpty;
        this.error = true;
        return false;
      }

      const phoneValidationRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im
      if(!this.phone.match(phoneValidationRegex)){
        this.result = messages.error.phoneNotValid;
        this.error = true
        return false;
      }

      return true;
    },
    resetForm() {
      this.name = "";
      this.phone = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.result-container {
  padding: 10px 20px;
  border: 1px solid #e6e6e6;
  font-size: 0.9em;
}
.msg-success {
  color: #092d4f;
  border-color: #092d4f;
}
.msg-error {
  color: red;
  border-color: red;
}
</style>
