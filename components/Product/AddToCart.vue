<template>
  <div>
    <div v-if="options.length" class="mb-5">
      <p class="title mb-2">Tilføj tilvalg:</p>

      <div v-for="(option, index) in options" :key="index">
        <CheckboxRounded v-if="option.price"
          class="mb-2"
          :label="
            `${option.option.Name} - ${$formatPrice(option.price)} eksl. moms`
          "
          :input="option.value"
          @changed="val => (option.value = val)"
        />
      </div>
    </div>

    <p class="title">Vælg lejeperiode:</p>
    <client-only>
      <div class="date-picker-container">
        <div>
          <div class="date-picker-label">Start</div>
          <date-picker
            class="date-picker"
            v-model="start"
            valueType="date"
            format="DD/M/YYYY"
            :lang="lang"
            :disabled-date="disableBeforeToday"
          ></date-picker>
        </div>

        <div>
          <div class="date-picker-label">Slut</div>
          <date-picker
            class="date-picker"
            v-model="end"
            valueType="date"
            format="DD/M/YYYY"
            :lang="lang"
            :disabled-date="disableBeforeStartDatePlusAWeek"
          ></date-picker>
        </div>
      </div>
    </client-only>

    <div class="price">
      {{ price | formatPrice }}
    </div>

    <div class="days">Total lejeperiode: {{ noOfDays }} dage</div>
    <div class="alert" v-show="!canBePlaced">
      Lejeperioden skal bestå af min. 8 dage
    </div>

    <div class="actions mt-8">
      <AmountPicker :amount="amount" @changed="onAmountPickerChange" />
      <div
        class="add-to-cart ml-3 button btn-primary"
        :class="canBePlaced ? '' : 'btn-disabled'"
        @click="submit"
      >
        TILFØJ TIL KURV
      </div>
    </div>

    <!-- <div class="mt-10">{{ time }} | {{ noOfDays }}</div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import AmountPicker from "@/components/Utilities/AmountPicker";
import CheckboxRounded from "@/components/Utilities/Form/CheckboxRounded";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker,
    AmountPicker,
    CheckboxRounded
  },
  props: {
    dailyPrice: { type: Number, required: true },
    weeklyPrice: { type: Number, required: true },
    product: { type: Object, required: true }
  },
  computed: {
    selectedOptions() {
      return this.options.filter(o => o.value);
    },
    productPrice() {
      return this.calculatePrice(
        this.dailyPrice,
        this.weeklyPrice,
        this.noOfDays
      );
    },
    productOptionPrice() {
      return this.selectedOptions.reduce((total, opt) => {
        total += opt.price;
        return total;
      }, 0);
    },
    unitPrice() {
      return this.productPrice + this.productOptionPrice;
    },

    noOfDays() {
      const dayDifference = this.dayDifference(this.start, this.end) + 1;
      return dayDifference > 0 ? dayDifference : 0;
    },

    price() {
      return this.unitPrice * this.amount;
    },
    totalPriceWithoutOptions(){
      return this.productPrice * this.amount;
    },
    canBePlaced() {
      return this.noOfDays > 7;
    },
    productId() {
      return this.product.info.id;
    }
  },
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
          weekdaysMin: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
        },
      },
      options: [],
      start: new Date(new Date().toDateString()),
      end: this.shiftDateXDays(new Date(), 7),
      amount: 1
    };
  },
  created() {
    // {value} is changing this is why it is not in computed
    this.options = this.product.options.map(o => ({
      option: o,
      key: o.ProductSlug,
      value: null,
      price: o.FixedPrice
    }));
  },
  methods: {
    ...mapActions(["addToCart"]),
    onAmountPickerChange(amount) {
      this.amount = parseInt(amount);
    },
    // days can be -x, +x
    shiftDateXDays(date, days) {
      const DAY = 1 * 24 * 60 * 60 * 1000;
      return new Date(new Date(date.getTime() + days * DAY).toDateString());
    },
    disableBeforeToday(date) {
      const today = new Date(new Date().toDateString());
      return date < today;
    },
    disableBeforeStartDatePlusAWeek(date) {
      const startDate = new Date(this.start);
      const nextWeekDate = this.shiftDateXDays(startDate, 7);
      return date < nextWeekDate;
    },
    calculatePrice(dailyPrice, weeklyPrice, days) {
      if (!days) return weeklyPrice;
      const NO_OF_DAYS_IN_WEEK = 8;
      const price =
        days <= NO_OF_DAYS_IN_WEEK
          ? parseFloat(weeklyPrice)
          : parseFloat(weeklyPrice) +
            parseFloat(dailyPrice) * (days - NO_OF_DAYS_IN_WEEK);
      return price;
    },
    dayDifference(date1, date2) {
      const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
      const d1 = new Date(date1).getTime();
      const d2 = new Date(date2).getTime();
      const diffInMs = d2 - d1;
      const diffInDays = diffInMs / ONE_DAY_IN_MS;
      return diffInDays;
    },
    submit() {
      if (!this.canBePlaced) return;

      const payload = {
        productId: this.productId,
        amount: this.amount,
        unitPrice: this.unitPrice,
        price: this.price,
        totalPriceWithoutOptions: this.totalPriceWithoutOptions,
        noOfDays: this.noOfDays,
        startDate: this.start,
        endDate: this.end,
        product: this.product,
        productOptions: this.selectedOptions.map(o => ({
          id: o.option.id,
          name: o.option.Name,
          price: o.price
        }))
      };

      this.addToCart(payload);
      this.$emit("addedToCart", payload);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: 600;
  font-size: 0.8em;
  margin-bottom: 16px;
}
.date-picker-container {
  display: flex;
  .date-picker-label {
    font-size: 0.8em;
  }
  .date-picker {
    width: 75%;
  }
}
.price {
  margin-top: 23px;
  color: #092d4f;
  font-size: 1.5em;
  font-weight: bold;
}
.days {
  font-size: 16px;
}

.alert {
  font-size: 16px;
  color: red;
}

.actions {
  display: flex;
  input[type="number"]::-webkit-inner-spin-button {
    opacity: 1;
  }
  .amount-picker {
    padding: 10px 5px 10px 10px;
    font-size: 1em;
    width: 65px;
  }

  .add-to-cart {
    padding: 15px 25px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px;
  }
}
</style>
