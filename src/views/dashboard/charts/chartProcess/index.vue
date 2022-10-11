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
    let option = (option = {
      xAxis: [
        {
          type: "value",
          show: false,
          min: 0,
          max: 100,
        },
      ],
      yAxis: [
        {
          show: false,
          type: "category",
          data: [""],
        },
      ],
      series: [
        {
          type: "bar",
          barWidth: 12,
          maxHeight: 100,
          color: "#67c23a",
          data: [78],
          showBackground: true,
          backgroundStyle: {
            color: "#e4e4e4",
          },
          label: {
            show: true,
            formatter: "|",
            position: "right",
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });

    let chartProcess = echarts.init(this.$refs.charts);
    chartProcess.setOption(option);
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
