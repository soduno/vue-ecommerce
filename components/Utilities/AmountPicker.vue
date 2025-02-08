<template>
  <input
    class="amount-picker"
    type="number"
    step="1"
    min="1"
    v-model="amountLocal"
  />
</template>

<script>
export default {
  props: {
    amount: { type: Number, required: true }
  },
  data() {
    return {
      amountLocal: this.amount
    };
  },
  watch: {
    amountLocal(val) {
      if (this.isPositiveInt(val)) {
        this.$emit("changed", parseInt(val));
      }
    }
  },
  methods: {
    isPositiveInt(no) {
      const int = parseInt(no);
      if (isNaN(int)) return false;
      if (int < 1) return false;
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.amount-picker {
  padding: 10px 5px 10px 10px;
  font-size: 1em;
  width: 65px;
}
</style>
