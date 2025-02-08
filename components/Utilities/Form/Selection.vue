<template>
  <div class="input-field">
    <div>
      <div v-if="label" class="label">{{ label }}:</div>
      <select v-model="inputLocal" :class="firstErrorMsg ? 'withError' : ''">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          >{{ option.label }}</option
        >
      </select>
    </div>

    <div class="error-msg" v-if="firstErrorMsg" v-html="firstErrorMsg"></div>
  </div>
</template>

<script>
export default {
  props: {
    input: { type: String, required: false },
    label: { type: String },
    options: { type: Array, required: true },
    defaultOption: { type: Object, required: false },
    validation: {
      type: Object,
      required: false
    },
    errors: { type: Array, required: false }
  },
  computed: {
    firstErrorMsg() {
      return Array.isArray(this.errors) && this.errors.length
        ? this.errors[0].replace(
            "%s",
            `<span style="font-weight: 600;">${this.label}</span>`
          )
        : null;
    }
  },
  data() {
    return {
      inputLocal: ""
    };
  },
  created() {
    if (this.input) {
      this.inputLocal = this.input;
    } else {
      if(this.defaultOption){
        this.inputLocal = this.defaultOption.value
      }
    }
  },
  watch: {
    inputLocal(val) {
      this.$emit("onChange", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-field {
  padding-bottom: 25px;

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
