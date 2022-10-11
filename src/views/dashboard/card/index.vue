<template>
  <el-card shadow="hover">
    <div class="cardHeader">
      <span>{{ title }}</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div class="cardContent">
      <span>{{ count }}</span>
    </div>
    <div class="cardCharts">
      <slot name="charts"></slot>
    </div>
    <div class="cardFooter">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ProjectIndex",
  props: ["title", "count"],
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.cardHeader {
  color: #e4e4e4;
  i {
    float: right;
  }
}
.cardContent {
  font-size: 25px;
}
.cardCharts {
  height: 40px;
}
.cardFooter {
  border-top: 1px solid #f4f4f4;
  padding-top: 8px;
}
div {
  margin-bottom: 10px;
}
</style>
