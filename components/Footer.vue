<template>
  <footer class="bg-blue pt-5 pb-1" id="main-footer">
    <div class="footer-container">
      <div class="footer-1">
        <div class="footer-col" v-html="footer.widget1" />
        <div class="footer-col" v-html="footer.widget2" />
        <div class="footer-col" v-html="footer.widget3" />
        <div class="footer-col">
          <div>
            <p><strong>Nyhedsbrev</strong></p>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>
      <div class="footer-2">
        <div class="footer-col">
          <div class="ref-company-logo-bar">
            <span v-for="(image, index) in footer.images" :key="index">
              <img class="logo" :src="image.Image.url | formatImage" :alt="image.Image.alternativeText" />
            </span>
            <a href="https://www.linkedin.com/company/nordic-it-retnal-aps" target="_blank">
              <img :src="'/uploads/linked_in_9ba84ec3c3.png' | formatImage" alt="Nordic IT Rental - Linkedin">
            </a>
            <a href="https://www.facebook.com/nordicitrental" target="_blank">
              <img :src="'/uploads/FB_icon_29ff5245e9.png' | formatImage" alt="Nordic IT Rental - Facebook">
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import NewsletterForm from "@/components/Formular/Newsletter";

export default {
  components: {
    NewsletterForm
  },
  props: ["footer"]
};
</script>

<style lang="scss">
footer {
  font-weight: 300;
  font-size: 0.9em;
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;

    .footer-col {
      padding: 16px 40px;
    }

    .footer-1 {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 24px;
      justify-content: space-between;
    }

    .footer-2 {
      border-top: 1px solid #395a79;
    }
  }

  .ref-company-logo-bar {
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    .logo {
      margin: 2em 3em;

      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
