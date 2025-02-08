<template>
  <div style="overflow-x: auto;">
    <table>
      <slot></slot>
    </table>
  </div>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
}
tr {
  color: #091d4f;
  background: #f8f8f8;
}

td {
  padding: 10px 20px;
  text-align: left;
  border-bottom: 1px solid #ebebeb;
  div {
    font-size: 0.8em;
  }
}
td.td-left {
  width: 61%;
}
td.td-right {
  width: 39%;
}
</style>
