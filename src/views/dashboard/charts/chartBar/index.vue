<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",

  data() {
    return {};
  },

  mounted() {
    let option = {
      xAxis: {
        show: false,
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { show: false, type: "value" },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
    let chartBar = echarts.init(this.$refs.charts);
    chartBar.setOption(option);
  },

  methods: {},
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
