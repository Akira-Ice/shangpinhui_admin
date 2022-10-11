<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
          <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            class="date"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="17">
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="7">
            <div>
              <h4>门店销售额排名</h4>
              <ul>
                <li v-for="rank in ranks" :key="rank.index">
                  <span
                    v-for="r of rank"
                    :key="r"
                    :class="[rank.index <= 3 ? 'topThree' : '']"
                    >{{ r }}</span
                  >
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
var myChart;
import * as echarts from "echarts";
import chartBar from "../charts/chartBar";
export default {
  name: "",

  data() {
    return {
      date: "",
      activeName: "销售额",
      xData: [
        "Jan",
        "Feb,",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      yData: [10, 52, 200, 334, 390, 330, 220, 200, 334, 390, 330, 52],
      option: {
        title: {
          text: "销售额",
          textStyle: {
            fontSize: 16,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "Jan",
              "Feb,",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "40%",
            data: [10, 52, 200, 334, 390, 330, 220, 200, 244, 160, 130, 52],
          },
        ],
      },
      ranks: [
        { index: 1, title: "肯德基", count: 323234 },
        { index: 2, title: "麦当劳", count: 299132 },
        { index: 3, title: "星巴克", count: 283972 },
        { index: 4, title: "海底捞", count: 266233 },
        { index: 5, title: "汉堡王", count: 223456 },
        { index: 6, title: "真功夫", count: 219435 },
        { index: 7, title: "西北几面村", count: 200586 },
      ],
    };
  },

  components: {
    chartBar,
  },

  mounted() {
    this.inintChart();
  },

  methods: {
    inintChart() {
      this.option.title.text = this.activeName;
      this.option.series[0].data = this.yData;
      if (echarts.getInstanceByDom(this.$refs.charts) == null)
        myChart = echarts.init(this.$refs.charts);
      myChart.clear();
      myChart.setOption(this.option, true);
    },
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.yData = [10, 52, 200, 334, 390, 330, 220, 200, 334, 390, 330, 52];
      } else {
        this.yData = [
          220, 200, 334, 390, 330, 152, 110, 152, 200, 334, 390, 330,
        ];
      }
      this.inintChart();
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  display: flex;
  position: relative;
  justify-content: space-between;
  .tabs {
    width: 100%;
    float: left;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.right {
  position: absolute;
  right: 0;
  span {
    margin: 0 10px;
    font-size: 14px;
    &:hover {
      color: #409eff;
    }
  }
  .date {
    width: 250px;
  }
}

.charts {
  width: 100%;
  height: 300px;
}

ul {
  padding: 0;
  li {
    list-style: none;
    margin: 20px 0;
    span {
      display: inline-block;
      margin-right: 40px;
      text-align: center;
      &:first-child {
        width: 17px;
        height: 17px;
      }
      &:last-child {
        float: right;
        margin-right: 10px;
      }
    }
    .topThree:first-child {
      color: white;
      border-radius: 50%;
      background-color: black;
    }
  }
}

h4 {
  margin: 0;
}
</style>
