<template>
  <div>
    <HeaderImg
      v-if="data.ImageCover"
      :img="data.ImageCover.url | formatImage"
      :text="data.TextCover"
    />
    <div class="container">
      <div class="row">
        <div class="col" style="width: 100%;">
          <Breadcrumb class="mt-10 mb-10" />

          <div class="message">
            <p>Kære kunde.</p>
            <p>Tak for din bestilling</p>
            <p>
              Du vil modtage en lejeaftale/tilbud pr. e-mail inden for få timer.
              Lejeaftalen/tilbuddet skal accepteres ved at besvare e-mailen med
              et ”godkendt”. Aftalen er gældende, når vi har modtaget den
              accepterede lejeaftale/tilbud.
            </p>
            <p>
              Når vi har modtaget den godkendte lejeaftale/tilbud, vil du kort
              efter modtage en faktura til betaling. Betalingsbetingelserne
              fremgår af fakturaen. Betaling kan ske via kontooverførsel. Vilkår
              og betingelser er angivet i lejeaftale/tilbud samt på fakturaen.
            </p>
            <p>Med venlig hilsen</p>
            <p>Nordic IT Rental</p>
            <p>Industriparken 22A</p>
            <p>2750 Ballerup</p>
          </div>

          <ClientOnly>
            <div class="py-10">
              <div>
                <h2>Ordredetaljer</h2>
                <ItemDetails :items="items" />
                <OrderDetails :details="orderDetails" />
              </div>

              <div class="mt-10">
                <h2>Kundeoplysninger</h2>
                <CustomerInformation :information="customerInformation" />
              </div>

              <div class="mt-10">
                <Addresses :addresses="addresses" />
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Breadcrumb from "@/components/Cart/Breadcrumb";
import ItemDetails from "@/components/Cart/Order/ItemDetails";
import OrderDetails from "@/components/Cart/Order/Details";
import CustomerInformation from "@/components/Cart/Order/CustomerInformation";
import Addresses from "@/components/Cart/Order/Addresses";
import HeaderImg from "@/components/Utilities/HeaderImg";

export default {
  components: {
    Breadcrumb,
    ItemDetails,
    OrderDetails,
    HeaderImg,
    CustomerInformation,
    Addresses
  },
  computed: {
    ...mapState(["orderReceipt"]),
    order(){
      return this.orderReceipt?.order || {}
    },
    orderDetails() {
      return {
        subtotal: (this.order.Products || []).reduce(
          (total, item) => {
            total += item.ProductRentalSum;
            return total;
          },
          0
        ),
        shipping: this.order.ShippingHandlingCost,
        vat: this.order.OrderTotalVat - this.order.OrderTotalExVat,
        total: this.order.OrderTotalVat,
        paymentMethod: "", // todo: missing
        remark: this.order.OrderComments,
        cvr: this.orderReceipt?.customer?.CustomerCompanyCVR
      };
    },
    customerInformation() {
      return {
        email: this.orderReceipt?.customer.CustomerEmail,
        telephone: this.orderReceipt?.customer.CustomerPhone
      };
    },
    addresses() {
      return {
        billing: `
          ${this.orderReceipt?.customer?.CustomerAddress}
          ${this.orderReceipt?.customer?.CustomerCity}
          ${this.orderReceipt?.customer?.CustomerCountry}
        `,
        shipping: `
          ${this.orderReceipt?.order?.OrderShippingAddress}
          ${this.orderReceipt?.order?.OrderShippingCity}
          ${this.orderReceipt?.order?.OrderShippingCountry}
        `
      };
    }
  },
  head() {
    return {
      title: "Nordic IT Rental" + this.data.PageTitle,
      meta: [
        {
          name: "title",
          content: this.data.MetaTitle || ""
        },
        {
          name: "description",
          content: this.data.MetaDescription || ""
        }
      ]
    };
  },
  data() {
    return {
      items: []
    };
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get("/checkud-ordre");
    return { data };
  },
  async created() {
    if (!this.orderReceipt) {
      this.$router.push("/");
    } else {
      this.items = await this.getItems();
    }
  },
  methods: {
    ...mapActions(["getProduct"]),
    async getItems() {
      const items = await Promise.all(
        (this.orderReceipt?.order?.Products || []).map(
          async item => {
            const product = await this.getProduct(item.ProductId).catch(
              e => null
            );

            return {
              slug: product?.info?.slug,
              title: product?.info?.name,
              amount: item.ProductQty,
              total: item.ProductRentalSum,
              options: item.ProductOptions,
              noOfDays:
                1 +
                (new Date(item?.ProductRentalTo).getTime() -
                  new Date(item?.ProductRentalFrom).getTime()) /
                  (1000 * 60 * 60 * 24),
              startDate: item?.ProductRentalFrom,
              endDate: item?.ProductRentalTo
            };
          }
        )
      );
      return items;
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  font-size: 0.8em;
  color: #092d4f;
}
</style>
