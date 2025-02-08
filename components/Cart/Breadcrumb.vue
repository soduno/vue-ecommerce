<template>
  <div class="breadcrumb">
    <ul v-for="(item, index) in items" :key="index">
      <li
        class="breadcrumb-item"
        :class="
          `
        ${path === item.path ? 'selected' : ''}
        ${index === 0 ? 'first-child' : ''}
        ${index === items.length - 1 ? 'last-child' : ''}
        `
        "
      >
        <div class="selected-icon"></div>
        <i class="interceptor">{{ index + 1 }}.</i> {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      items: [
        { label: "Bookinger", path: "/kurv" },
        { label: "Ordre", path: "/kurv/ordre" },
        { label: "Kvittering", path: "/kurv/kvittering" }
      ]
    };
  },
  created() {
    const { path } = this.$route;
    this.path = path;
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  font-size: 0.8em;

  ul {
    list-style: none;

    .breadcrumb-item {
      background: #092d4f;
      color: #ffffff;
      padding: 0 50px;
      line-height: 53px;

      .interceptor {
        font-style: normal;
        margin-right: 10px;
      }
    }

    .breadcrumb-item {
      &.selected {
        font-weight: bold;
        position: relative;
      }
      .selected-icon {
        background: url("~/assets/images/icons/breadcrumb/tick.png") no-repeat;
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        left: 11px;
        top: 12px;
      }
    }
    .breadcrumb-item.first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .breadcrumb-item.last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}

@media only screen and (max-width: 767px) {
  .breadcrumb {
    ul {
      li.breadcrumb-item {
        padding: 0 10px;
        .selected-icon {
          display: none;
        }
      }
    }
  }
}
</style>
