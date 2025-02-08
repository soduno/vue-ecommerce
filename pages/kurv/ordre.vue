<template>
  <div>
    <HeaderImg
        v-if="data.ImageCover"
        :img="data.ImageCover.url | formatImage"
        :text="data.TextCover"
    />
    <div class="container">
      <div class="row">
        <div class="col" style="width: 100%;">
          <Breadcrumb class="breadcrumb-el" />
          <CustomerInformationForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Breadcrumb from "@/components/Cart/Breadcrumb";
import CustomerInformationForm from "@/components/Formular/CustomerInformation";
import HeaderImg from "@/components/Utilities/HeaderImg";

export default {
  components: {
    Breadcrumb,
    HeaderImg,
    CustomerInformationForm
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
  data() {
    return {};
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/checkud-ordre");
    return { data };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-el {
  margin: 60px 0 30px 0;
}
@media only screen and (max-width: 767px) {
  .breadcrumb-el {
    margin: 8px 0 20px 0;
  }
}
</style>
