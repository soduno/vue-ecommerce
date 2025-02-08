<template>
  <div class="full-width-menus" :class="show ? 'active' : ''">
    <div class="menu-container">
      <div class="menu-col" v-for="(cat, index) in items" :key="index">
        <nuxt-link
          v-for="(item, index) in cat"
          :key="item.id"
          class="item-label text-blue mb-3"
          :class="index === 0 ? 'col-title' : 'col-item'"
          :to="`/${index === 0 ? 'produkt-kategori' : 'produkt-kategori'}/${item.CustomPermalink || item.Slug}`"
        >
          <div
            style="display: flex;"
            @mouseenter="
              () => (hover = index !== 0 ? cat[0].id + item.id : null)
            "
            @mouseleave="() => (hover = null)"
          >
            <div class="mr-2">{{ item.MenuTitle || item.Name }}</div>
            <div class="hover-icon">
              <img
                v-show="hover === cat[0].id + item.id"
                :src="require('@/assets/images/icons/menu/hover.svg')"
                alt="Nordic IT Rental - Menu hover"
              />
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    items: { type: Array, default: [] }
  },
  methods: {
    throwMainMenuEvent(val) {
      this.$emit("onClickMainMenu", val);
    }
  },
  data() {
    return {
      hover: null
    };
  }
};
</script>
