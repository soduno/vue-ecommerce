<template>
  <div>
    <div id="map" ref="googleMap"></div>
  </div>
</template>

<script>
import { Loader as GoogleMapsApiLoader } from "@googlemaps/js-api-loader";
export default {
  props: {
    mapConfig: Object,
    coords: Object,
    title: String
  },
  data() {
    return {
      google: null,
      map: null
    };
  },
  async mounted() {

    const mapContainer = this.$refs.googleMap;
    const loader = new GoogleMapsApiLoader({
      apiKey: process.env.gmapsapikey,
      version: "weekly",
      libraries: ["places"]
    });

    await loader.load();
    this.google = google;
    this.map = new google.maps.Map(mapContainer, this.mapConfig);

     this.setMarker(this.setCoords(this.coords), this.title);
  },
  methods: {
    setCoords({ lat, lng }) {
      return new this.google.maps.LatLng(lat, lng);
    },
    setMarker(coords, title) {
      const marker = new this.google.maps.Marker({
        position: coords,
        title
      });
      marker.setMap(this.map);
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 500px;
  overflow: initial;
}
</style>
