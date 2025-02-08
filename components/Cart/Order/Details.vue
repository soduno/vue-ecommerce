<template>
  <div>
    <Table style="font-size: 0.8em;">
      <tr>
        <td class="td-left">Subtotal:</td>
        <td class="td-right">{{ details.subtotal | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">Forsendelse:</td>
        <td class="td-right">{{ details.shipping | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">Moms:</td>
        <td class="td-right">{{ details.vat | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">Betalingsmetode:</td>
        <td class="td-right">{{ details.paymentMethod }}</td>
      </tr>
      <tr>
        <td class="td-left">Total:</td>
        <td class="td-right">{{ details.total | formatPrice }}</td>
      </tr>
      <tr>
        <td class="td-left">Bemærkning:</td>
        <td class="td-right">{{ details.remark }}</td>
      </tr>
      <tr>
        <td class="td-left">CVR NUMMER:</td>
        <td class="td-right">{{ details.cvr }}</td>
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
    details: { type: Object, required: true }
  }
};
</script>
