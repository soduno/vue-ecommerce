<template>
  <div class="row bg-img-container">
    <div class="col px-0 py-0" :style="`min-height: ${height}px; width: 100%;`">
      <BackgroundImg :src="img" class="bg-img">
        <template v-slot:body v-if="text">
          <div class="body-wrapper grid-small">
            <h1 class="slider-title title-white">{{ text }}</h1>
          </div>
        </template>
      </BackgroundImg>
    </div>
  </div>
</template>

<script>
import BackgroundImg from "@/components/Utilities/BackgroundImg";

export default {
  components: {
    BackgroundImg
  },
  props: {
    height: { type: Number, default: 420 },
    img: { type: String, required: true },
    text: { type: String, required: false }
  }
};
</script>

<style lang="scss" scoped>
.body-wrapper {
  width: 100%;
  display: inline-flex;
}
.bg-img {
  display: flex;
  align-items: center;
}
</style>
