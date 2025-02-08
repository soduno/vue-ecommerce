<template>
  <div>
    <header ref="header" class="main-header grid-small">
      <div class="cart-in-mobile">
        <HeaderCart />
      </div>
      <nuxt-link to="/" class="logo">
        <img class="" :src="header.logo.src" :alt="header.logo.altText" />
      </nuxt-link>

      <div class="right-col">
        <div class="cart-in-desktop mb-2">
          <HeaderCart />
        </div>

        <div class="telephone-container">
          <HeaderCta :cta="header.telephone" />
        </div>

        <div class="mb-2">
          <HeaderNavigation
            :navigation="navList"
            :showDropdown="showDropdown"
            @onClickMainMenu="val => (showDropdown = val)"
          />
          <HeaderMobileNavigation :items="mobileMenu" />
        </div>
      </div>
    </header>

    <!-- Minified -->
    <div class="minified-header" v-show="minifiedHeader">
      <div class="minified-wrapper">
        <nuxt-link to="/" class="minified-logo">
          <img class="" :src="header.logo.src" :alt="header.logo.altText" />
        </nuxt-link>
        <div class="minified-navigation">
          <HeaderNavigation
            style="font-size: 16.5px;"
            :navigation="navList"
            :showDropdown="showDropdown"
            @onClickMainMenu="onClickMainMenu"
          />
          <HeaderMobileNavigation :items="mobileMenu" />
        </div>
        <div class="minified-cart ml-3">
          <HeaderCart />
        </div>
      </div>
    </div>

    <HeaderFullMenu
      :show="showDropdown === 'product'"
      :items="categories"
      @onClickMainMenu="val => (showDropdown = val)"
    />
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  props: {
    header: { type: Object, required: true }
  },
  computed: {
    ...mapState(["navigation"]),
    categories() {
      const arr =
        this.navigation?.Products && this.navigation.Products.length
          ? this.navigation.Products[0]
          : {};
      const categories = arr.Products || [];

      return categories.map(category => category.product_categories);
    },
    navList() {
      return this.navigation.NavSingle.map(nav => {
        const items = nav.NavSingleR.map(e => ({
          label: e.Title,
          link: nav.Rooturl + (e.Url || '')
        }));

        return {
          label: nav.RootTitle,
          link: nav.Rooturl,
          items
        };
      });
    },
    mobileMenu() {
      const menus = [];

      const products = {
        label: "Produkter",
        link: "#",
        items: this.categories.map(category => {
          const copiedCategory = JSON.parse(JSON.stringify(category));
          const categoryProduct = copiedCategory.shift() || {};

          return {
            label: categoryProduct.Name || "",
            link: `/produkt-kategori/${categoryProduct.CustomPermalink || categoryProduct.Slug}`,
            items: copiedCategory.map(product => {
              return {
                label: product.Name || "",
                link: `/produkt-kategori/${product.CustomPermalink || product.Slug}`
              };
            })
          };
        })
      };

      menus.push(products);

      this.navList.forEach(nav => {
        menus.push(nav);
      });

      return menus;
    }
  },
  data() {
    return {
      showDropdown: false,
      headerHeight: 0,
      minifiedHeader: false
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    const { header: headerEl } = this.$refs;
    this.headerHeight = headerEl.clientHeight;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      const pageTopCoordinate = window.scrollY;
      this.minifiedHeader = pageTopCoordinate > this.headerHeight;
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
    onClickMainMenu(val) {
      if (val === "product") {
        this.scrollTop();
      }
      this.showDropdown = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-in-mobile {
  display: none;
}

  .telephone-container {
    margin: 10px 0px;
  }

.main-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 10px;

  .logo {
    margin-top: 15px;
    width: 290px;
    height: auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .right-col {
    text-align: right;
  }
}

.minified-header {
  position: fixed;
  z-index: 99;
  top: 0;
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0 0 3px 0 rgb(0 0 0 / 30%);
  .minified-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 940px;
    height: 100%;
    .minified-logo {
      width: 70px;
      height: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    .minified-navigation {
      margin-left: 100px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .cart-in-desktop {
    display: none;
  }
  .cart-in-mobile {
    display: block;
    width: 100%;
    text-align: right;
  }

  .telephone-container {
    margin: 30px;
  }

  .main-header {
    justify-content: center;

    .right-col {
      margin-top: 10px;
      text-align: center;
    }
  }
  .minified-header {
    padding: 0 15px;
    .minified-cart {
      display: none;
    }
  }
}
</style>
