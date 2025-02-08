<template>
  <div class="info-card-spinner text-blue">
    {{ number }}
  </div>
</template>

<script>
export default {
  props: {
    durationMs: {
      type: Number,
      default: 1000
    },
    end: {},
    start: {
      default: 0
    },
    render: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      number: null,
      startNumber: null,
      endNumber: null
    };
  },
  created(){
    this.startNumber = parseInt(this.start);
    this.endNumber = parseInt(this.end);
    this.number = this.startNumber;
  },
  watch: {
    render(val) {
      if (val) {
        const intervalMs = this.durationMs / (this.endNumber - this.startNumber);
        const interval = setInterval(() => {
          this.number += 1;
          if (this.number > this.endNumber) {
            this.number = this.endNumber;
            clearInterval(interval);
          }
        }, intervalMs);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
