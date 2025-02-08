<template>
  <span class="cta">
    <i class="fas fa-phone mr-2"></i>
    {{ cta }}
  </span>
</template>
<script>
export default {
  props: ["cta"]
};
</script>

<style lang="scss">
.cta {
  color: #212121;
  font-size: 0.95em;
  font-weight: 100;
}
</style>
