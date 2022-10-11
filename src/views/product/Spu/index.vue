<template>
  <div>
    <el-card style="margin: 20px 0">
      <categorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="show == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!formInline.category3Id"
          @click="addSpu"
          >add_SPU</el-button
        >
        <el-table :data="records" border style="width: 100%">
          <el-table-column
            prop="id"
            label="id"
            width="80px"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="spuName" align="center">
          </el-table-column>
          <el-table-column
            prop="description"
            label="description"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="option"
            width="width"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                @click="showSkuInfo(row)"
              ></el-button>
              <el-dialog
                :title="`${dialogTitle}的sku列表`"
                :visible.sync="dialogTableVisible"
                align="left"
                @close="loading = true"
              >
                <el-table :data="skuInfo" v-loading="loading">
                  <el-table-column
                    property="skuName"
                    label="名称"
                    width="250"
                  ></el-table-column>
                  <el-table-column
                    property="price"
                    label="价格"
                  ></el-table-column>
                  <el-table-column
                    property="weight"
                    label="销售"
                  ></el-table-column>
                  <el-table-column property="skuDefaultImg" label="默认图片">
                    <template slot-scope="{ row }">
                      <img
                        :src="row.skuDefaultImg"
                        style="width: 100px; height: 100%"
                      /> </template
                  ></el-table-column>
                </el-table>
              </el-dialog>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                style="margin-left: 8px"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  slot="reference"
                  icon="el-icon-delete"
                  type="danger"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[4, 6, 8, 10]"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuInfo"
          @size-change="sizeChange"
        >
        </el-pagination>
      </div>
      <div>
        <spuForm v-show="show == 1" @changeShow="changeShow" ref="spu" />
      </div>
    </el-card>
  </div>
</template>

<script>
import spuForm from "./spuForm";

export default {
  name: "Spu",
  data() {
    return {
      skuInfo: [],
      testDate: 0,
      show: 0,
      formInline: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      page: 1,
      limit: 4,
      total: 10,
      records: [],
      dialogTableVisible: false,
      dialogTitle: "",
      loading: true,
    };
  },

  components: {
    spuForm,
  },
  mounted() {},

  methods: {
    async showSkuInfo(row) {
      this.dialogTitle = row.spuName;
      this.dialogTableVisible = true;
      let res = await this.$api.spu.reqFindBySpuId(row.id);
      if (res.code == 200) {
        this.skuInfo = res.data;
        this.loading = false;
      } else {
        this.message("error", "getSkuInfo Failed");
        return Promise.reject(new Error("Failed"));
      }
    },
    message(type, message) {
      this.$message({
        type,
        message,
      });
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getSpuInfo(this.page);
    },
    async deleteSpu(row) {
      let res = await this.$api.spu.reqDeleteSpu(row.id);
      if (res.code == 200) {
        this.message("success", "delete success");
        this.getSpuInfo(this.page);
      } else {
        this.message("error", "delete Failed");
        return Promise.reject(new Error("Failed"));
      }
    },
    getCategoryId(formInline) {
      this.formInline = formInline;
      this.getSpuInfo();
    },
    async getSpuInfo(current = 1) {
      this.page = current;
      const { page, limit, formInline } = this;
      let res = await this.$api.spu.reqGetSpuInfo(
        page,
        limit,
        formInline.category3Id
      );
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      } else {
        this.message("error", "getSpuInfo Failed");
        return Promise.reject(new Error("Failed"));
      }
    },
    addSpu() {
      this.show = 1;
      this.$refs.spu.addSpu(this.formInline.category3Id);
    },
    editSpu(row) {
      this.show = 1;
      this.$refs.spu.editSpu(row);
    },
    changeShow(flag, current) {
      this.show = flag;
      if (current) this.getSpuInfo(1);
      else this.getSpuInfo(this.page);
    },
  },
};
</script>

<style lang="scss" scoped></style>
