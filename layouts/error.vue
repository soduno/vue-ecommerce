<template>
  <div class="error-404">
    <HeaderImg
        img="ascsdc"
        text=""
    />
    <div class="grid-small">
      <div class="row" style="width: 100%;">
        <div class="col py-10 text-center" style="width: 100%;">
          <h1 class="text-blue">Siden blev desværre ikke fundet</h1>
          <p><img src="~/assets/images/icons/404.svg" class="illustration-404" /></p>
          <p>Den side du søgte efter blev desværre ikke fundet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderImg from "@/components/Utilities/HeaderImg";

export default {
  components: {
    HeaderImg,
  },
  head() {
    return {
      title: "Nordic IT Rental - Siden blev ikke fundet",
    };
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/error-404");
    return { data };
  }
};
</script>
