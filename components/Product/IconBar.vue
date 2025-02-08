<template>
  <div class="icon-bar">
    <div v-for="icon in icons" :key="icon.key">
      <div class="icon text-center">
        <div class="img-container">
          <img v-if="icon.img" :src="icon.img" />
        </div>
        <div class="desc">{{ icon.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    features: { type: Array, default: [] }
  },
  computed: {
    icons() {
      return this.iconData
        .map(i => {
          const feature = this.features.find(
            f => f.key.toLowerCase() === i.key.toLowerCase()
          );
          return feature && feature.value
            ? {
                ...i,
                value: this.shortenText(feature.value)
              }
            : null;
        })
        .filter(i => i);
    }
  },
  data() {
    return {
      iconData: [
        {
          key: "Processor",
          img: require("@/assets/images/icons/product/mini-specifications/cpu.png")
        },
        {
          key: "Ram",
          img: require("@/assets/images/icons/product/mini-specifications/mem.png")
        },
        {
          key: "Harddisk",
          img: require("@/assets/images/icons/product/mini-specifications/hdd.png")
        },
        {
          key: "Skærm",
          img: require("@/assets/images/icons/product/mini-specifications/screen-size.png")
        },
        {
          key: "Opløsning",
          img: require("@/assets/images/icons/product/mini-specifications/screen-resolution.png")
        }
      ]
    };
  },
  methods: {
    shortenText(val) {
      return val.length > 14 ? val.substr(0, 14) + " ..." : val;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-bar {
  display: flex;
}
.icon {
  margin: 0 5px;
  width: 100px;
  .img-container {
    width: 45px;
    height: 45px;
    line-height: 54px;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }
  .desc {
    font-size: 0.75em;
    margin-top: 2px;
  }
}
</style>
