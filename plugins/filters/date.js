import Vue from 'vue'

Vue.filter('formatDate', function (date) {
    return new Date(date).toLocaleDateString("da-DK")
});
