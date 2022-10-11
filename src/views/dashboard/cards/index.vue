<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <card title="总销售额" count="￥126560">
          <template slot="charts">
            <div>
              <span>周同比</span>
              <span
                >56.67%<i class="el-icon-sort-up" style="color: #67c23a"></i
              ></span>
              <span>日同比</span>
              <span
                >16.96%<i class="el-icon-sort-down" style="color: #f56c6c"></i
              ></span>
            </div>
          </template>
          <template slot="footer">
            <span>日销售额￥12423</span>
          </template>
        </card>
      </el-col>
      <el-col :span="6">
        <card title="访问量" count="88460">
          <template slot="charts">
            <chartLine />
          </template>
          <template slot="footer">
            <span>日访问量1234</span>
          </template>
        </card>
      </el-col>
      <el-col :span="6">
        <card title="支付笔数" count="88460">
          <template slot="charts">
            <chartBar />
          </template>
          <template slot="footer">
            <span>转化率 65%</span>
          </template>
        </card>
      </el-col>
      <el-col :span="6">
        <card title="运营活动效果" count="78%">
          <template slot="charts">
            <chartProcess />
          </template>
          <template slot="footer">
            <div>
              <span>周同比</span>
              <span
                >56.67%<i class="el-icon-sort-up" style="color: #67c23a"></i
              ></span>
              <span>日同比</span>
              <span
                >16.96%<i class="el-icon-sort-down" style="color: #f56c6c"></i
              ></span>
            </div>
          </template>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import card from "../card";
import chartLine from "../charts/chartLine";
import chartBar from "../charts/chartBar";
import chartProcess from "../charts/chartProcess";
export default {
  name: "ProjectIndex",
  components: {
    card,
    chartLine,
    chartBar,
    chartProcess,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
