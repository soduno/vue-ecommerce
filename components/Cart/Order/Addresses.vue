<template>
  <Table>
    <tr style="background: none;">
      <td class="table-title"><h2>Faktureringsadresse</h2></td>
      <td class="table-title"><h2 class="pl-4">Leveringsadresse</h2></td>
    </tr>
    <tr>
      <td class="td-left">
        <div>{{ addresses.billing }}</div>
      </td>
      <td class="td-right">
        <div>{{ addresses.shipping }}</div>
      </td>
    </tr>
  </Table>
</template>

<script>
import Table from "@/components/Cart/Order/Table";
export default {
  components: {
    Table
  },
  props: {
    addresses: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.table-title {
  margin: 0 !important;
  padding: 0;
  h2 {
    margin: 0 0 10px 0;
  }
}
</style>
