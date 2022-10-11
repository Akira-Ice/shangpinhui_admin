<template>
  <div>
    <el-card style="margin: 20px 0">
      <categorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="show">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!formInline.category3Id"
          @click="add"
          >add</el-button
        >
        <el-table :data="attrInfoList" border style="width: 100%">
          <el-table-column
            prop="id"
            label="id"
            width="80px"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="attrName" align="center">
          </el-table-column>
          <el-table-column
            prop="attrValueList"
            label="attrValueList"
            align="left"
          >
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="option"
            width="width"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button type="warning" icon="el-icon-edit" @click="edit(row)"
                >edit</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteAttr(row)"
                >delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!show">
        <el-form :model="attrInfo" :inline="true">
          <el-form-item label="属性名">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="addAttr"
          :disabled="!attrInfo.attrName"
          v-show="!editModel"
          >add Attr</el-button
        >
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            label="id"
            width="80px"
            type="index"
          ></el-table-column>
          <el-table-column label="attrName">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                style="width: 200px"
                @blur="row.flag = false"
                @keyup.native.enter="row.flag = false"
                v-if="row.flag"
              ></el-input>
              <el-tag type="success" v-if="!row.flag" @click="row.flag = true">
                {{ row.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="option" width="160px">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeAttr($index)"
                >delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="saveCategory3">save</el-button>
        <el-button type="cancel" @click="show = !show">cancel</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",

  data() {
    return {
      formInline: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      attrInfoList: [],
      show: true,
      editModel: false,
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },

  mounted() {},

  methods: {
    getCategoryId(formInline) {
      this.formInline = formInline;
      this.getAttrInfoList();
    },
    async getAttrInfoList() {
      let { category1Id, category2Id, category3Id } = this.formInline;
      let res = await this.$api.attr.reqGetAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (res.code == 200) {
        this.attrInfoList = res.data;
      }
    },
    add() {
      this.show = !this.show;
      this.attrInfo.categoryId = this.formInline.category3Id;
    },
    addAttr() {
      this.attrInfo.attrValueList.push({
        attrId: 0,
        valueName: "",
        flag: true,
      });
    },
    edit(row) {
      this.show = !this.show;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
      this.editModel = true;
      // this.deleteAttr(row);
    },
    removeAttr(id) {
      this.attrInfo.attrValueList.splice(id, 1);
    },
    async saveCategory3() {
      let res = await this.$api.attr.reqSaveCategory3(this.attrInfo);
      if (res.code == 200) {
        this.show = !this.show;
        this.getAttrInfoList();
      } else {
        return Promise.reject(new Error("failed"));
      }
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      };
    },
    async deleteAttr(row) {
      let res = await this.$api.attr.reqDeleteAttr(row.id);
      if (res.code == 200) {
        this.getAttrInfoList();
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
