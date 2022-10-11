<template>
  <div>
    <el-table border :data="skuInfo">
      <el-table-column
        label="序号"
        prop="id"
        type="index"
        width="80"
      ></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width:150px;height100%" />
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            :icon="row.isSale ? 'el-icon-bottom' : 'el-icon-top'"
            @click="changeSale(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteSku(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :total="total"
      :current-page="page"
      :page-size="limit"
      @current-change="getSkuInfo"
      @size-change="sizeChange"
      :page-sizes="[8, 10, 14, 20]"
      style="margin-top: 20px; text-align: center"
      layout="prev, pager, next, jumper, ->, sizes, total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Sku",

  data() {
    return {
      skuInfo: [],
      page: 1,
      limit: 8,
      total: 10,
    };
  },

  mounted() {
    this.getSkuInfo();
  },

  methods: {
    message(type, message) {
      this.$message({
        type,
        message,
      });
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getSkuInfo();
    },
    async getSkuInfo(current = 1) {
      this.page = current;
      let { page, limit } = this;
      let res = await this.$api.sku.reqGetSkuList(page, limit);
      if (res.code == 200) {
        this.skuInfo = res.data.records;
        this.total = res.data.total;
      } else {
        this.message("error", "getSkuInfo Failed");
        return Promise.reject(new Error("Failed"));
      }
    },
    async changeSale(row) {
      let res;
      let { id, isSale } = row;
      if (isSale) {
        res = await this.$api.sku.reqCancelSale(id);
        if (res.code == 200) {
          row.isSale = 0;
          this.message("success", "cancleSale success");
        } else {
          this.message("error", "cancleSale Failed");
          return Promise.reject(new Error("Failed"));
        }
      } else {
        res = await this.$api.sku.reqOnSale(id);
        if (res.code == 200) {
          row.isSale = 1;
          this.message("success", "onSale success");
        } else {
          this.message("error", "onSale Failed");
          return Promise.reject(new Error("Failed"));
        }
      }
    },
    async deleteSku(row) {
      let { id } = row;
      let res = await this.$api.sku.reqDeleteSku(id);
      if (res.code == 200) {
        this.message("success", "delete success");
        this.getSkuInfo(this.page);
      } else {
        this.message("error", "delete Failed");
        return Promise.reject(new Error("Failed"));
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
