<template>
    <table class="cart-list">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th class="table-header-cell col3">Vare</th>
          <th class="table-header-cell">Pris</th>
          <th class="table-header-cell">Antal</th>
          <th class="table-header-cell">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-row" v-for="item in cart" :key="item.itemId">
          <td>
            <div @click="onDeleteItem(item.itemId)" class="product-remove">
              x
            </div>
          </td>
          <td class="product-thumbnail">
            <nuxt-link :to="`/produkt/${item.product.info.slug}`">
              <img
                v-if="item.product.gallery.main"
                width="220"
                height="220"
                class="product-thumbnail-image"
                :src="item.product.gallery.main.url | formatImage"
              />
            </nuxt-link>
          </td>
          <td>
            <nuxt-link :to="`/produkt/${item.product.info.slug}`"
              ><div class="product-name">
              <p>
                <strong>{{ item.product.info.name }}</strong>
              </p>
              </div></nuxt-link
            >
            <div class="booking-date">
              <span class="text-muted">
                Total lejeperiode:
                <span>{{ item.noOfDays }}</span> dage.
                Fra:
                <span>{{ item.startDate | formatDate }}</span> til
                <span>{{ item.endDate | formatDate }}</span>
              </span>
              <div class="product-options">
                <span v-if="item.productOptions && item.productOptions.length > 0">
                <span class="text-blue">
                  <u>Tilvalg</u>
                </span>
                  <span v-for="(opts, index) in item.productOptions" :key="index">
                    <span>
                      <br />
                      {{ opts.name }} - {{opts.price | formatPrice}} ekskl. moms
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </td>
          <td class="product-price">
            {{ (item.price / item.amount) | formatPrice }}
          </td>
          <td class="product-quantity">
            <AmountPicker
              :amount="item.amount"
              @changed="amount => onAmountPickerChange(item.itemId, amount)"
            />
          </td>
          <td class="product-subtotal">
            {{ item.price | formatPrice }}
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import { mapActions } from "vuex";
import AmountPicker from "@/components/Utilities/AmountPicker";
export default {
  components: { AmountPicker },
  props: {
    cart: { type: Array, required: true }
  },
  methods: {
    ...mapActions(["updateAmount", "deleteItem"]),
    async onAmountPickerChange(itemId, amount) {
      await this.updateAmount({ itemId, amount });
    },
    async onDeleteItem(itemId) {
      await this.deleteItem(itemId);
    }
  }
};
</script>

<style lang="scss" scoped>
/* Again too much styles in scoped, should be used sparingly in my opinion */
</style>
