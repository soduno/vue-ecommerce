import Vue from "vue";

const formatPrice = val => {
  const formattedPrice = new Intl.NumberFormat("da-DK").format(parseInt(val));
  return "Kr. " + formattedPrice + ",-";
};

Vue.filter("formatPrice", formatPrice);

export default ({ app }, inject) => {
  inject("formatPrice", formatPrice);
};
