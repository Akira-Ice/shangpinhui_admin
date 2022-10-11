<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addTradeMark()"
      >add</el-button
    >
    <el-table :data="records" border style="width: 100%; margin-top: 20px">
      <el-table-column
        type="index"
        prop="id"
        label="id"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="tradeMarkName"
        width="width"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="logoUrl"
        label="tradeMarkLogo"
        width="width"
        align="center"
      >
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100%" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="option" width="width" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="editTrademark(row)"
            >edit</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="removeTradeMark(row.id)"
            >delete</el-button
          >
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
      @current-change="getTradeMark"
      @size-change="sizeChange"
    >
    </el-pagination>

    <el-dialog title="update tradeMark" :visible.sync="dialogFormVisible">
      <el-form :model="auform" :rules="rules" ref="auform">
        <el-form-item label="Name" :label-width="formLabelWidth" prop="tmName">
          <el-input v-model="auform.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Logo" :label-width="formLabelWidth" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="auform.logoUrl" :src="auform.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark('auform')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",

  data() {
    return {
      page: 1,
      limit: 4,
      total: 0,
      records: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      auform: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          {
            required: true,
            message: "Please enter the tradeMark name",
            trigger: "blur",
          },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [
          {
            required: true,
            message: "Please select tradeMark image",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.getTradeMark();
  },

  methods: {
    async getTradeMark(current = 1) {
      this.page = current;
      const { page, limit } = this;
      let res = await this.$api.tradeMark.reqTradeMark(page, limit);
      if (res.code == 200) {
        this.records = res.data.records;
        this.total = res.data.total;
      }
    },
    sizeChange(limit) {
      this.limit = limit;
      this.getTradeMark(this.page);
    },
    handleAvatarSuccess(res, file) {
      this.auform.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //addTradeMark
    addTradeMark() {
      this.dialogFormVisible = true;
      this.auform = { tmName: "", logoUrl: "" };
    },
    addOrUpdateTradeMark(auform) {
      //校验
      this.$refs[auform].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          console.log(this.auform);
          let res = await this.$api.tradeMark.reqAddOrUpdateTradeMark(
            this.auform
          );
          if (res.code == 200) {
            this.auform = { tmName: "", logoUrl: "" };
            this.$message({
              message: this.auform.id ? "update Succeed" : "add Succeed",
              type: "success",
            });
            this.getTradeMark(this.page);
          } else {
            this.$message({
              message: this.auform.id ? "update failed" : "add failed",
              type: "error",
            });
          }
        } else {
          return false;
        }
      });
    },
    //remove
    async removeTradeMark(id) {
      let res = await this.$api.tradeMark.reqRemoveTradeMark(id);
      if (res.code == 200) {
        this.$message({
          message: "delete Succeed",
          type: "success",
        });
        this.getTradeMark(this.page);
      } else {
        this.$message({
          message: "delete failed",
          type: "error",
        });
      }
    },
    async editTrademark(row) {
      this.dialogFormVisible = true;
      this.auform = { ...row };
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
