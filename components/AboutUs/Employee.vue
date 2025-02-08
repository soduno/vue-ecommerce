<template>
  <div class="employee text-center" v-if="employee">
    <img
      class="employee-img "
      v-if="employee.AboutUsEmployeesImage"
      :src="employee.AboutUsEmployeesImage.url | formatImage"
      :alt="employee.AboutUsEmployeesImage.alternativeText"
    />
    <h3 class="employee-name">{{ employee.AboutUsEmployeesName }}</h3>
    <p class="employee-title">{{ employee.AboutUsEmployeesTitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    employee: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.employee {
  width: 250px;
  margin: 50px;

  .employee-img {
    height: 247px;
    width: 244px;
    background-position: center center;
    background-size: cover;
  }

  .employee-title {
    font-weight: 700;
  }
}
</style>
