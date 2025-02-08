<template>
  <div class="product-category" v-if="category">
    <HeaderImg
      v-if="category.cover"
      :img="category.cover.image"
      :text="category.cover.text || category.info.name"
      :height="490"
    />
    <section id="main-content">
    <div class="container mt-10">
      <div class="row">
        <div class="col">
          <nuxt-link
            :to="'/produkt/' + product.info.slug"
            class="product"
            v-for="product in category.products"
            :key="product.info.id"
          >
            <div class="product-image">
              <img :src="product.gallery.main.url | formatImage" :alt="product.gallery.main.alternativeText" />
            </div>
            <div class="product-info mt-9">
              <div class="product-title text-blue">{{ product.info.name }}</div>
              <div class="product-description">
                {{ getParsedDescription(product.descriptions.short) }}
              </div>
              <div class="product-body">
                <div class="mb-3">
                  <div class="prices">
                    <div class="price-weekly">
                      {{ product.pricing.weekly | formatPrice }}
                    </div>
                    <div class="explanation price-explanation">
                      Pris for første uges leje
                    </div>
                  </div>
                  <div class="mt-1">
                    <span class="price-daily">{{
                      product.pricing.daily | formatPrice
                    }}</span>
                    <span class="explanation price-explanation"
                      >Pris efter første uges leje, pr. dag.</span
                    >
                  </div>
                </div>
                <nuxt-link
                  :to="'/produkt/' + product.info.slug"
                  class="btn btn-shop btn-blue product-button"
                  >Vælg produkt</nuxt-link
                >
              </div>
            </div>
          </nuxt-link>
      </div>

      <CategorySlider
        v-if="category.upsell && category.upsell.length"
        title="Lignende produkter"
        :categories="category.upsell"
        titlePosition="left"
        :titlePaddingBottom="20"
        justifyContent="center"
        :size="210"
      />

      <div class="row py-5" v-if="category.description">
        <div class="col">
          <div class="category-description" v-html="category.description"></div>
        </div>
      </div>
    </div>
    </div>
    </section>
  </div>
</template>
<script>
import HeaderImg from "@/components/Utilities/HeaderImg";
import CategorySlider from "@/components/Category/Slider";
import { Category } from "@/utils/dto";

export default {
  components: {
    HeaderImg,
    CategorySlider
  },
  async asyncData({ params, $axios, $config, route, store }) {
    try {
      const slug = params.pathMatch.toLowerCase().replace(/\/+$/, '');
      const order = '';
      var categoriesData = await $axios.$get(
          `/product-categories?CustomPermalink=${slug}` + order
      );

      if(categoriesData && Array.isArray(categoriesData) && !categoriesData.length){
        categoriesData = await $axios.$get(
            `/product-categories?Slug=${slug}` + order
        );

        if(categoriesData && Array.isArray(categoriesData) && !categoriesData.length){
          return store.dispatch('throwError404', { slug })
        }
      }

      const categoryData = categoriesData[0] || {};
      if (!categoryData) return;

      const category = new Category(categoryData);

      return { category };
    } catch (e) {
      console.log(e)
    }
  },
  head() {
    return {
      title: this.category?.meta?.title,
      meta: [
        {
          name: "title",
          content: this.category?.meta?.title
        },
        {
          name: "description",
          content: this.category?.meta?.desc
        }
      ]
    };
  },
  methods: {
    getParsedDescription(desc) {
      const plainText = desc.replace(/(<([^>]+)>)/gi, "");
      const words = plainText.split(" ");
      const first34Words = words.slice(0, 34);
      const description = first34Words.join(" ") + (words.length > 34 ? " ..." : "");
      return description;
    }
  }
};
</script>
