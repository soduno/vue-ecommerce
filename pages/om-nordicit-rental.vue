<template>
  <div>
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      :text="data.TextCover"
    />

    <div id="aboutus-value" class="row">
      <div class="col-md-6 px-0">
        <TextCard
          style="height: 100%;"
          v-if="data.LeftTextCol1"
          :contentHtml="data.LeftTextCol1"
          backgroundClass="bg-gray-dark"
          largeCSS="padding: 45px 170px;"
        />
      </div>
      <div class="col-md-6 px-0" style="min-height: 500px; width: 100%;">
        <BackgroundImg
          v-if="data.RightImageCol1"
          :src="data.RightImageCol1.url | formatImage"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <TextCard v-if="data.MidTextCol2" :contentHtml="data.MidTextCol2" />
      </div>
    </div>

    <div class="row">
      <div class="col bg-blue py-10" style="width: 100%;">
        <RefSlider
          :images="
            data.MidColReference3.map(item => $formatImage(item.Logo.url))
          "
        />
      </div>
    </div>

    <div id="aboutus-customerstories" class="bg-gray-dark">
      <div style="max-width: 1350px; margin: auto;">
        <div class="row">
          <div
            class="col-md-6"
            style="width: 100%;"
            v-for="quote in data.MidColReference4"
            :key="quote.id"
          >
            <RefCompanyQuote
              :logo="quote.MidColReference4Logo"
              :author="quote.MidColReference4Author"
              :text="quote.MidColReference4Text"
            />
          </div>
        </div>
      </div>
    </div>

    <div id="aboutnitr-employees" class="employee-table">
      <div style="max-width: 1300px; margin: 0 auto;">
        <h3>{{ data.EmployeeHeader }}</h3>
      </div>
      <div style="width: 100%; max-width: 1000px; margin: 0 auto;">
        <div class="row">
          <div
            class="col-lg-4 col-md-6"
            style="width: 100%;"
            v-for="(employee, index) in data.AboutUsEmployees"
            :key="index"
          >
            <Employee
              :employee="employee"
              style="width: 300px; margin: 0 auto;"
            />
          </div>
        </div>
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
    const data = await $axios.$get("/om-os");
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
