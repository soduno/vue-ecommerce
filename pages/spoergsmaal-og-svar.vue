<template>
  <div>
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      :text="data.TextCover"
    />

    <div class="my-10" style="max-width: 940px; margin: 0 auto;">
      <div v-for="(faq, index) in data.QuestionsAnswers" :key="index">
        <FAQ :q="faq.Title" :a="faq.Content" />
      </div>
    </div>
  </div>
</template>

<script>
import TextCard from "@/components/Utilities/TextCard";
import HeaderImg from "@/components/Utilities/HeaderImg";
import BackgroundImg from "@/components/Utilities/BackgroundImg";
import RefCompanyQuote from "@/components/AboutUs/RefCompanyQuote";
import Employee from "@/components/AboutUs/Employee";
export default {
  components: {
    TextCard,
    HeaderImg,
    BackgroundImg,
    RefCompanyQuote,
    Employee
  },
  head() {
    return {
      title: this.data.PageTitle,
      meta: [
        {
          name: "title",
          content: this.data.MetaTitle || ""
        },
        {
          name: "description",
          content: this.data.MetaDescription || ""
        }
      ]
    };
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/sporgsmal-og-svar");
    return { data };
  }
};
</script>

<style lang="scss" scoped>
.employee-table {
  padding: 50px;
  h3 {
    margin-bottom: 10px;
    font-size: 40px;
    color: #092d4f;
  }
}
</style>
