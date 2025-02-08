<template>
  <div class="mobile-navigation">
    <ClientOnly>
      <select v-if="leafItems" v-model="page" style="box-shadow: 1px 0px 5px rgb(0 0 0 / 10%);">
        <option value="">Navigation</option>
        <option
          v-for="(item, index) in leafItems"
          :key="index"
          :value="item.CustomPermalink || item.link"
        >
          <span v-if="item.level === 2 || item.level === 3"> - </span>
          <span v-if="item.level === 3"> - </span>
          {{ item.label }}
        </option>
      </select>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: [] }
  },
  computed: {
    leafItems() {
      const options = [];
      this.items.forEach(menu => {
        options.push({ level: 1, label: menu.label, link: menu.link });
        (menu.items || []).forEach(submenu => {
          options.push({ level: 2, label: submenu.label, link: submenu.link });
          (submenu.items || []).forEach(thirdLevel => {
            options.push({
              level: 3,
              label: thirdLevel.label,
              link: thirdLevel.link
            });
          });
        });
      });
      return options;
    }
  },
  data() {
    return {
      page: "",
      menus: [
        {
          label: "produkter",
          link: "#",
          items: [
            {
              label: "ipads",
              link: "category-link",
              items: [
                { label: "ipad air", link: "product-link" },
                { label: "ipad air 2", link: "product-link2" }
              ]
            }
          ]
        }
      ]
    };
  },
  watch: {
    page(val) {
      this.$router.push(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.mobile-navigation {
  display: none;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .mobile-navigation {
    display: block;
  }
}
</style>
