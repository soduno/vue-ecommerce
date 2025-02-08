import Vue from "vue";

const baseURL = process.env.apiUrl;
export const formatImage = val => val ? baseURL + val : "";
const formatHTML = val => {
  const withFullUrlImgs = val.replace('<img src="/', `<img src="${baseURL}/`)
  return withFullUrlImgs;
}

Vue.filter("formatImage", formatImage);
Vue.filter("formatHTML", formatHTML);

export default ({ app }, inject) => {
  inject("formatImage", formatImage);
  inject("formatHTML", formatHTML);
};
