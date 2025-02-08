<template>
  <div>
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      text="Alle produkter"
    />


    <div
      class="categories mt-16 mb-5"
      style="max-width: 940px; margin: 0 auto;"
    >
      <nuxt-link
        :to="`/produkt-kategori/${category.info.slug}`"
        v-for="(category, index) in categories"
        :key="index"
      >
        <div class="category-card-container" v-if="category.products.length > 0">
          <div class="category-img-container text-center">
            <img :src="category.img" v-if="category.img" />
            <img src="~/assets/images/icons/no-photos.svg" alt="" style="max-width: 70px;" v-else>
          </div>
          <div class="category-title text-center">
            {{ category.info.name }} ({{ category.products.length }})
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { Category } from "@/utils/dto";
import HeaderImg from "@/components/Utilities/HeaderImg";
export default {
  components: {
    HeaderImg
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/om-os");

    const categoriesData = await $axios.$get(`/product-categories`);
    const categories = categoriesData.map(cat => new Category(cat));

    return { categories, data };
  }
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .category-card-container {
    width: 215px;
    border: 1px solid #0000001a;
    padding: 15px;
    margin: 6px;
    .category-img-container {
      height: 100px;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
    .category-title {
      font-size: 23px;
      font-weight: 700;
      margin: 37px 0 12px;
      color: #092d4f;
      overflow-wrap: break-word;

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
