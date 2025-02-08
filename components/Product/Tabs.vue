<template>
  <div class="w-100">
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index">
        <div
          @click="changeTab(index)"
          class="tab"
          :class="index === selected ? 'active' : ''"
        >
          {{ tab }}
        </div>
      </div>
    </div>
    <div class="tab-body">
      <div v-if="selected === 0">
        <DescriptionTab :description="description" />
      </div>
      <div v-else-if="selected === 1">
        <FeaturesTab :features="features" />
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionTab from "@/components/Product/Tabs/Description";
import FeaturesTab from "@/components/Product/Tabs/Features";
export default {
  components: { DescriptionTab, FeaturesTab },
  props: {
    description: { type: String, required: true },
    features: { type: Array, required: true }
  },
  data() {
    return {
      selected: 0,
      tabs: ["Beskrivelse", "Yderligere information"]
    };
  },
  methods: {
    changeTab(index) {
      this.selected = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
}
.tab {
  background: #f3f3f3;
  border: 1px solid #eaeaea;
  border-style: solid none none solid;
  padding: 15px 32px 12px 37px;
  top: -3px;
  left: -1px;
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 0.65em;
}
.tab.active {
  color: #454545;
  background: #fff;
}
.tabs .tab.active:before {
  content: "";
  position: absolute;
  top: -3px;
  right: -4px;
  z-index: 19;
  background: 0 0;
  padding: 0;
  width: 0;
  height: 0;
  border-color: transparent transparent #838383 #838383;
  border-style: solid;
  border-width: 7px;
}
.tab-body {
  padding: 30px 0;
}
</style>
