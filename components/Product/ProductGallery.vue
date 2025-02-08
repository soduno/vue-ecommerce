<template>
  <div>
    <div class="product-gallery-overlay" v-bind:class="{disabled: !this.showGalleryModal}"
         @click="showGalleryModal = !showGalleryModal"></div>
    <div class="product-gallery">
      <div class="product-gallery__main-image">
        <img v-if="gallery.main.url" :src="mainImage | formatImage" :alt="gallery.main.alternativeText"
             @click="openModal(0)"/>
      </div>
      <div class="product-gallery__thumbnails" v-if="thumbnails.length > 1">
        <span class="product-gallery__arrows product-gallery__arrow product-gallery__arrows-left"
              v-bind:class="{disabled: !this.thumbArrowLeft}">
            <i @click="moveThumbnails('left')" class="fas fa-chevron-circle-left"></i>
        </span>
        <div class="product-gallery__thumbs">
          <div class="product-gallery__thumbs-scroller" v-bind:style="scrollerTranslate">
            <div class="product-gallery__thumbs-scroller__thumb" v-for="(image, index) in thumbnails" :key="index">
              <span><img :src="image.url" :alt="image.alternativeText" @click="openModal(index)"/></span>
            </div>
          </div>
        </div>
        <span class="product-gallery__arrows product-gallery__arrow product-gallery__arrows-right"
              v-bind:class="{disabled: !this.thumbArrowRight}">
            <i @click="moveThumbnails('right')" class="fas fa-chevron-circle-right"></i>
        </span>
      </div>
      <div class="product-gallery__modal" v-bind:class="{active: this.showGalleryModal}">
        <span class="product-gallery__modal-close" @click="showGalleryModal = !showGalleryModal">
          <i class="fas fa-times"></i>
        </span>
        <div class="product-gallery__modal-inner">
          <span
              class="product-gallery__modal-inner__arrows product-gallery__modal-inner__arrow product-gallery__modal-inner__arrows-left"
              v-bind:class="{disabled: this.modalGalleryIndex === 0}">
            <i @click="moveModalGalleryImages('left')" class="fas fa-chevron-circle-left"></i>
          </span>
          <figure v-for="(image, index) in thumbnails">
            <img :src="image.url" v-show="modalGalleryIndex === index">
          </figure>
          <span
              class="product-gallery__modal-inner__arrows product-gallery__modal-inner__arrow product-gallery__modal-inner__arrows-right"
              v-bind:class="{disabled: this.modalGalleryIndex === this.maxThumbnails -1}">
            <i @click="moveModalGalleryImages('right')" class="fas fa-chevron-circle-right"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['gallery'],
  data() {
    return {
      mainImage: this.gallery.main.url,
      thumbnailsIndex: 0,
      thumbnails: [],
      maxThumbnails: null,
      thumbsVisible: 3,
      scrollPos: 0,
      gridScroll: 33.33,
      modalGallery: [],
      modalGalleryIndex: 0,
      showGalleryModal: false,
      thumbArrowLeft: false,
      thumbArrowRight: false,
    }
  },
  created() {
    this.modifyThumbnails();

    this.maxThumbnails = this.thumbnails.length;
    this.modalGallery = this.thumbnails;

    if (this.thumbnailsIndex === 0) {
      this.thumbArrowLeft = false;
    }

    if (this.maxThumbnails > 3) {
      this.thumbArrowRight = true;
    }
  },
  computed: {
    scrollerTranslate: function () {
      return `transform: translate3d(${this.scrollPos}%, 0, 0`;
    }
  },
  watch: {
    thumbnailsIndex: function (oldVal, newVal) {
      if (this.thumbnailsIndex > 0) {
        this.thumbArrowLeft = true;
      }

      if (this.thumbnailsIndex === 0) {
        this.thumbArrowLeft = false;
      }

      if (this.thumbnailsIndex > (this.maxThumbnails - 1) - this.thumbsVisible) {
        this.thumbArrowRight = false;
      } else {
        this.thumbArrowRight = true;
      }
    },
  },
  methods: {
    modifyThumbnails() {
      const thumbnails = [];
      const imageUrl = "https://nordic.nordicitrental.dk";
      const defaultAltText = "";

      thumbnails.push({
        url: imageUrl + this.gallery.main.url,
        alternativeText: this.gallery.main.url.alternativeText,
      });

      this.gallery.thumbnails.forEach(function (item) {
        const obj = {
          url: imageUrl + item.url,
          alternativeText: item.alternativeText,
        }
        thumbnails.push(obj)
      })

      this.thumbnails = thumbnails;
    },
    openModal(index) {
      this.modalGalleryIndex = index;
      this.showGalleryModal = true;
    },
    moveModalGalleryImages: function (pointer) {
      var newIndex = this.modalGalleryIndex;

      if (pointer === 'left') {
        newIndex--;
      } else {
        newIndex++;
      }

      if (newIndex < 0 || newIndex > this.maxThumbnails - 1) {
        return;
      }

      this.modalGalleryIndex = newIndex;
    },
    moveThumbnails(pointer) {
      var newIndex = this.thumbnailsIndex;

      if (pointer === 'left') {
        newIndex--;
      } else {
        newIndex++;
      }

      if (newIndex < 0 || newIndex > this.maxThumbnails - this.thumbsVisible) {
        return;
      }

      this.thumbnailsIndex = newIndex;
      this.scrollPos = -this.gridScroll * this.thumbnailsIndex;
    }
  }
}
</script>
