<template>
  <table class="features-table w-100"> <!-- When it's supposed to look like a table and behave like table, just do a regular table-->
    <tbody>
    <tr class="table-row" v-for="(feature, index) in features" :key="index">
      <td class="table-key">{{ feature.key }}</td>
      <td class="table-value">{{ feature.value }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    features: { type: Array, required: true }
  }
};
</script>
