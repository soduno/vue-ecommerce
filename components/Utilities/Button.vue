<template>
  <div>
    <div @click="onClick" class="button" :class="variant">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    button: { type: Object, required: true }
  },
  computed: {
    variant() {
      const DEFAULT_VARIANT = "primary";
      return this.button.variant || DEFAULT_VARIANT;
    },
    label() {
      return this.button.label;
    },
    actionType() {
      return this.button?.action?.type ? this.button.action.type : "link";
    },
    href() {
      return this.actionType === "link" && this.button?.action?.href
        ? this.button.action.href
        : "#";
    },
    modal() {
      return this.actionType === "modal" && this.button?.action?.modal
        ? this.button.action.modal
        : "#";
    }
  },
  methods: {
    onClick() {
      switch (this.actionType) {
        case "link":
          this.$router.push(this.href);
          break;

        case "modal":
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
