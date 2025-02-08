<template>
  <div>
    <div class="title1 mb-2">Faktureringsoplysninger</div>
    <div class="customer-contact-form">
      <!-- Billing Address -->
      <AddressForm
        :submitTrigger="billingAddressSubmitTrigger"
        @onSubmit="
          data => {
            form.billingAddress = data.form;
            hasBillingErrors = data.hasAnyError;
          }
        "
      />

      <!-- Other Fields -->
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <InputField
            label="Telefon"
            :input="form.phone"
            @onChange="val => onChange('phone', val, formValidations.phone)"
            :errors="errors.phone"
          />
        </div>
        <div class="col-xs-12 col-md-4">
          <InputField
            label="E-mail"
            :input="form.email"
            @onChange="val => onChange('email', val, formValidations.email)"
            :errors="errors.email"
          />
        </div>
        <div class="col-xs-12 col-md-4">
          <InputField
            label="CVR nummer"
            :input="form.cvrNumber"
            @onChange="
              val => onChange('cvrNumber', val, formValidations.cvrNumber)
            "
            :errors="errors.cvrNumber"
          />
        </div>
      </div>

      <div class="row mb-5">
        <div class="col-xs-12">
          <Checkbox
            label="Send varerne til en anden adresse?"
            :input="form.useDifferentShippingAddress"
            @changed="val => (form.useDifferentShippingAddress = val)"
          />
        </div>
      </div>

      <div
        v-if="useDifferentShippingAddress"
        class="mt-3 mb-5"
        id="shipping-address-container"
      >
        <div class="form-title">Shipping Address</div>
        <!-- Shipping Address -->
        <AddressForm
          class="form-body"
          :submitTrigger="shippingAddressSubmitTrigger"
          @onSubmit="
            data => {
              form.shippingAddress = data.form;
              hasShippingErrors = data.hasAnyError;
            }
          "
        />
      </div>

      <div class="row">
        <div class="col-xs-12">
          <Textarea
            label="Bemærkninger til ordren (valgfri)"
            :input="form.comments"
            :rows="8"
            @changed="val => (form.comments = val)"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <button @click="submit" class="button btn-primary">
            Bestil ordre
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import InputField from "@/components/Utilities/Form/InputField";
import Textarea from "@/components/Utilities/Form/Textarea";
import Checkbox from "@/components/Utilities/Form/Checkbox";
import AddressForm from "@/components/Formular/Address";
import validations from "@/components/Formular/validations.js";

class Address {
  constructor({
    firstName = "",
    lastName = "",
    companyName = "",
    streetNameAndNo = "",
    town = "",
    country = "",
    zipCode = ""
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.companyName = companyName;
    this.streetNameAndNo = streetNameAndNo;
    this.town = town;
    this.country = country;
    this.zipCode = zipCode;
  }
}

export default {
  components: {
    AddressForm,
    InputField,
    Textarea,
    Checkbox
  },
  computed: {
    useDifferentShippingAddress() {
      return this.form.useDifferentShippingAddress;
    }
  },
  data() {
    return {
      billingAddressSubmitTrigger: false,
      shippingAddressSubmitTrigger: false,
      hasBillingErrors: false,
      hasShippingErrors: false,
      form: {
        billingAddress: null,
        shippingAddress: null,
        useDifferentShippingAddress: false,
        phone: "",
        email: "",
        cvrNumber: "",
        comments: ""
      },
      errors: {},
      formValidations: {
        phone: [validations.isRequired, validations.isPhone],
        email: [validations.isRequired, validations.isEmail],
        cvrNumber: [validations.isRequired]
      }
    };
  },
  watch: {
    useDifferentShippingAddress(val) {
      this.form.shippingAddress = val
        ? new Address({})
        : JSON.parse(JSON.stringify(this.form.billingAddress));
    }
  },
  methods: {
    ...mapActions(["sendCart", "validateForm"]),
    onChange(key, val, valid) {
      this.form[key] = val;
      this.errors[key] = this.validate(valid, val);
    },
    validate(valid, value) {
      const errors = [];
      valid.forEach(validation => {
        if (!validation.rule(value)) {
          errors.push(validation.msg);
        }
      });
      return errors;
    },
    async submit() {
      this.billingAddressSubmitTrigger = new Date();

      if (this.useDifferentShippingAddress) {
        this.shippingAddressSubmitTrigger = new Date();
      }

      Object.entries(this.formValidations).forEach(([key, validation]) => {
        const value = this.form[key];
        const errors = this.validate(validation, value);
        this.errors[key] = errors;
      });

      const hasAnyError = Object.values(this.errors).some(
        error => !!error.length
      );

      setTimeout(async () => {
        const canBeSubmitted =
          !hasAnyError && !this.hasBillingErrors && !this.hasShippingErrors;

        if (!this.useDifferentShippingAddress) {
          this.form.shippingAddress = JSON.parse(
            JSON.stringify(this.form.billingAddress)
          );
        }

        if(canBeSubmitted){
          await this.sendCart(this.form);
          this.$router.push("/kurv/kvittering")
        }

      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.customer-contact-form {
  padding: 20px 0;
}
#shipping-address-container {
  border-radius: 15px;
  border: 2px solid #092d4f;

  .form-title {
    text-align: right;
    padding: 10px 30px;
    background: #092d4f;
    color: white;
    font-size: 0.8em;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .form-body {
    padding: 15px 20px;
    border-radius: 10px;
  }
}
</style>
