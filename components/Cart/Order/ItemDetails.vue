<template>
  <table>
    <tr>
      <td class="td-left" style="font-weight: 600">VARE:</td>
      <td class="td-right" style="font-weight: 600">TOTAL</td>
    </tr>
    <tr v-for="(item, index) in items" :key="index">
      <td class="td-left">
        <div>
          <div>
            <nuxt-link :to="`/produkt/${item.slug}`">
              <span>{{ item.amount }}x</span> {{ item.title }}
            </nuxt-link>
          </div>
          <div class="booking-details">
            <div style="font-weight: 600;">Booking detailjer</div>
            <div>
              Total lejeperiode: {{ item.noOfDays }} dage. Fra:
              {{ item.startDate | formatDate }} til
              {{ item.endDate | formatDate }}
            </div>
            <div class="product-options mt-2" v-if="item.options.length">
              <div style="font-weight: 600;">Tilvalg</div>
              <div v-for="(option, index) in item.options" :key="index">
                {{ option.ProductName }}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td class="td-right">{{ item.total | formatPrice }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true }
  }
};
</script>

<style lang="scss" scoped>
a:hover {
  font-weight: bold;
}
table {
  width: 100%;
  font-size: 0.8em;
}
tr {
  color: #091d4f;
}

td {
  padding: 10px 20px;
  text-align: left;
}
td.td-left {
  width: 61%;
}
td.td-right {
  width: 39%;
}
.booking-details {
  font-size: 0.8em;
  padding: 10px 20px;
}


@media only screen and (max-width: 767px) {
  table {
  font-size: 1em;
}
}
</style>
