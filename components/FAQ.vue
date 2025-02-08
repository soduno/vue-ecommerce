<template>
  <div class="faq" @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="question">{{ q }}</div>
    <div class="answer" :class="hover ? 'active' : ''" v-html="a"></div>
  </div>
</template>

<script>
export default {
  props: {
    q: { type: String, required: true },
    a: { type: String, required: true }
  },
  data() {
    return {
      hover: false
    };
  }
};
</script>

<style lang="scss" scoped>
.faq {
  .question {
    background: #092d4f;
    color: white !important;
    padding: 13.5px 20px;
    font-weight: 100;
    cursor: pointer;
    font-size: 17px;
    border-radius: 4px;
  }
  .answer {
    margin: 12px;
    font-size: 12px;

    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.4s ease-in-out;
    max-height: 0;
    overflow-y: hidden;
  }
  .answer.active {
    max-height: 80px;
  }
}
</style>
