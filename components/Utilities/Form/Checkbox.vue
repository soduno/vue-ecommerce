<template>
  <div class="input-checkbox">
    <input type="checkbox" v-model="inputLocal" />
    <label v-if="label" class="label" @click="inputLocal = !inputLocal"
      >{{ label }}</label
    >
    <div class="error-msg" v-if="errorMsg && showError" v-html="errorMsg"></div>
  </div>
</template>

<script>
export default {
  props: {
    input: { type: Boolean, required: false },
    label: { type: String },
    validation: {
      type: Object,
      required: false
    }
  },
  computed: {
    errorMsg() {
      return this.validation && this.validation.msg
        ? this.validation.msg.replace(
            "%s",
            `<span style="font-weight: 600;">${this.label}</span>`
          )
        : null;
    },
    validationRule() {
      return this.validation && this.validation.rule
        ? this.validation.rule
        : null;
    }
  },
  data() {
    return {
      inputLocal: false,
      showError: false
    };
  },
  created() {
    if (this.input) {
      this.inputLocal = this.input;
    }
  },
  watch: {
    inputLocal(val) {
      this.$emit("changed", val);

      if (this.validationRule) {
        this.showError = !this.validationRule(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input-checkbox {
  input.withError {
    border: 1px solid red;
  }

  .error-msg {
    margin-top: 4px;
    margin-left: 4px;
    font-size: 15px;
    color: red;
  }
}
</style>
