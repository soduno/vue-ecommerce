<template>
  <div class="input-checkbox round">
    <input type="checkbox" v-model="inputLocal" />
    <label @click="inputLocal = !inputLocal"></label>
    <div v-if="label" class="label ml-6" @click="inputLocal = !inputLocal">
      {{ label }}
    </div>
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
  display: flex;
}
.label:hover {
  cursor: pointer;
}
.round {
  position: relative;
}

.round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 0;
  width: 28px;
}

.round label:after {
  border: 3px solid #092d4f;
  border-top: none;
  border-right: none;
  content: "";
  height: 5px;
  left: 6px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type="checkbox"] {
  visibility: hidden;
}

.round input[type="checkbox"]:checked + label {
  background-color: #fff;
  border-color: #092d4f;
}

.round input[type="checkbox"]:checked + label:after {
  opacity: 1;
}
</style>
