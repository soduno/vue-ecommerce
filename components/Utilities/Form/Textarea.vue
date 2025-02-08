<template>
  <div class="input-textarea" :style="customStyle">
    <div v-if="label" class="label">{{ label }}:</div>
    <textarea
      v-model="inputLocal"
      :cols="cols"
      :rows="rows"
      :class="showError ? 'withError' : ''"
      :style="inputStyle"
    ></textarea>
    <div class="error-msg" v-if="errorMsg && showError" v-html="errorMsg"></div>
  </div>
</template>

<script>
export default {
  props: {
    cols: { type: Number, default: 30 },
    rows: { type: Number, default: 10 },
    input: { type: String, required: false },
    label: { type: String },
    validation: {
      type: Object,
      required: false
    },
    customStyle: { type: String, required: false},
    inputStyle: { type: String, required: false}
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
      inputLocal: "",
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
.input-textarea {
  padding-bottom: 25px;

  textarea {
    resize: none;
  }

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
