<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            v-for="tradeMark in tradeMarkList"
            :label="tradeMark.tmName"
            :value="tradeMark.id"
            :key="tradeMark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSalectAttr.length}个选择`"
          v-model="attrIdName"
        >
          <el-option
            :label="salectAttr.name"
            :value="`${salectAttr.id}:${salectAttr.name}`"
            v-for="salectAttr in unSalectAttr"
            :key="salectAttr.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 10px"
          @click="addSalectAttr"
          :disabled="!attrIdName || unSalectAttr.length == 0"
          >添加销售属性</el-button
        >
        <el-table border style="margin-top: 20px" :data="spu.spuSaleAttrList">
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteSaleAttr(row)"
              ></el-button>
            </template>
          </el-table-column> </el-table
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveInfo">save</el-button>
        <el-button style="margin-left: 10px" @click="changeShow"
          >cancle</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",

  data() {
    return {
      spu: {
        category3Id: 0,
        description: "",
        tmId: "",
        spuName: "",
        spuImageList: [],
        spuSaleAttrList: [],
      },
      tradeMarkList: [],
      spuImageList: [],
      saleAttrList: [],
      inputValue: "",
      attrIdName: "",
      flag: 0,
    };
  },

  mounted() {},

  computed: {
    unSalectAttr() {
      return this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item2) => {
          return item.name != item2.saleAttrName;
        });
      });
    },
  },
  methods: {
    message(type, message) {
      this.$message({
        type,
        message,
      });
    },
    init() {
      Object.assign(this.$data, this.$options.data());
    },
    async saveInfo() {
      let res;
      if (this.flag == 0) {
        res = await this.$api.spu.reqSaveSpuInfo(this.spu);
        if (res.code == 200) {
          this.message("success", "add success");
          this.changeShow(1);
        } else {
          this.message("error", "add Failed");
          return Promise.reject(new Error("Failed"));
        }
      } else {
        res = await this.$api.spu.reqUpdateSpuInfo(this.spu);
        if (res.code == 200) {
          this.message("success", "update success");
          this.changeShow(0);
        } else {
          this.message("error", "update Failed");
          return Promise.reject(new Error("Failed"));
        }
      }
    },
    deleteSaleAttr(row) {
      let spuSaleAttrList = this.spu.spuSaleAttrList;
      spuSaleAttrList.splice(spuSaleAttrList.indexOf(row), 1);
      this.spu.spuSaleAttrList = spuSaleAttrList;
    },
    addSalectAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdName.split(":");
      let newSalectAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSalectAttr);
      this.attrIdName = "";
    },
    handleClose(row, tag) {
      console.log(row);
      let spuSaleAttrValueList = row.spuSaleAttrValueList;
      spuSaleAttrValueList.splice(spuSaleAttrValueList.indexOf(tag), 1);
      this.spu.spuSaleAttrList.spuSaleAttrValueList = spuSaleAttrValueList;
    },

    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (inputValue != "") {
        let newValue = {
          saleAttrName: row.saleAttrName,
          baseSaleAttrId: row.baseSaleAttrId,
          isChecked: null,
          saleAttrValueName: row.inputValue,
          spuId: row.spuId,
        };
        row.spuSaleAttrValueList.push(newValue);
        this.spu.spuSaleAttrList.spuSaleAttrValueList =
          row.spuSaleAttrValueList;
      }
      row.inputVisible = false;
      row.inputValue = "";
    },

    handleAvatarSuccess(res, file, fileList) {
      let len = fileList.length;
      let spuImageList = fileList;

      spuImageList[len - 1].imgUrl = res.data;
      spuImageList[len - 1].url = res.data;
      spuImageList[len - 1].imgName = fileList[len - 1].name;
      delete spuImageList[len - 1].raw;
      delete spuImageList[len - 1].response;
      delete spuImageList[len - 1].percentage;

      this.spu.spuImageList = spuImageList;
      this.spuImageList = spuImageList;
    },

    handleRemove(file, fileList) {
      this.spu.spuImageList = fileList;
    },

    async editSpu(row) {
      this.flag = 1;
      let res;

      res = await this.$api.spu.reqGetSpu(row.id);
      if (res.code == 200) {
        this.spu = res.data;
      } else {
        this.message("error", "getSpu Failed");
        return Promise.reject(new Error("Failed"));
      }

      res = await this.$api.spu.reqGetTradeMarkList();
      if (res.code == 200) {
        this.tradeMarkList = res.data;
      } else {
        this.message("error", "getTradeMarkList Failed");

        return Promise.reject(new Error("Failed"));
      }

      res = await this.$api.spu.reqGetImgList(row.id);
      if (res.code == 200) {
        let arr = res.data;
        arr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = arr;
        this.spu.spuImageList = arr;
      } else {
        this.message("error", "getImgList Failed");

        return Promise.reject(new Error("Failed"));
      }

      res = await this.$api.spu.reqGetbaseSaleAttrList();
      if (res.code == 200) {
        this.saleAttrList = res.data;
      } else {
        this.message("error", "getbaseSaleAttrList Failed");
        return Promise.reject(new Error("Failed"));
      }
    },

    async addSpu(category3Id) {
      this.flag = 0;
      this.spu.category3Id = category3Id;
      let res;

      res = await this.$api.spu.reqGetTradeMarkList();
      if (res.code == 200) {
        this.tradeMarkList = res.data;
      } else {
        this.message("error", "getTradeMarkList Failed");
        return Promise.reject(new Error("Failed"));
      }

      res = await this.$api.spu.reqGetbaseSaleAttrList();
      if (res.code == 200) {
        this.saleAttrList = res.data;
      } else {
        this.message("error", "getbaseSaleAttrList Failed");
        return Promise.reject(new Error("Failed"));
      }
    },
    changeShow(current) {
      this.init();
      this.$emit("changeShow", 0, current);
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
