<template>
  <div>
    <Table>
      <tr>
        <td class="td-left"><div>Email:</div></td>
        <td class="td-right">
          <div>{{ information.email }}</div>
        </td>
      </tr>
      <tr>
        <td class="td-left"><div>Telefon nr.:</div></td>
        <td class="td-right">
          <div>
            {{ information.telephone }}
          </div>
        </td>
      </tr>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Cart/Order/Table";
export default {
  components: {
    Table
  },
  props: {
    information: { type: Object, required: true }
  }
};
</script>
