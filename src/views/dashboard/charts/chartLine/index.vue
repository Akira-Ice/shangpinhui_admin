<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ProjectLine",

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
      yAxis: {
        show: false,
        type: "value",
      },
      series: [
        {
          data: [820, 1300, 300, 600, 1700, 1000, 1900],
          type: "line",
          areaStyle: {},
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: "#9475d7",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#e9ddfb", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
    let chartsLine = echarts.init(this.$refs.charts);
    chartsLine.setOption(option);
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
