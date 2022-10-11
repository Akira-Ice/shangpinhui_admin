<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="formInline.category1Id"
          placeholder="请选择"
          @change="handle1()"
        >
          <el-option
            v-for="category in list.category1"
            :label="category.name"
            :value="category.id"
            :key="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="formInline.category2Id"
          placeholder="请选择"
          @change="handle2()"
        >
          <el-option
            :label="category.name"
            :value="category.id"
            v-for="category in list.category2"
            :key="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="formInline.category3Id"
          placeholder="请选择"
          @change="handle3()"
        >
          <el-option
            :label="category.name"
            :value="category.id"
            v-for="category in list.category3"
            :key="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "categorySelect",

  data() {
    return {
      list: {
        category1: [],
        category2: [],
        category3: [],
      },
      formInline: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },

  mounted() {
    this.getCategory1();
  },

  methods: {
    handle1() {
      this.getCategory2(this.formInline.category1Id);
    },
    handle2() {
      this.getCategory3(this.formInline.category2Id);
    },
    handle3() {
      this.$emit("getCategoryId", this.formInline);
    },
    async getCategory1() {
      let res = await this.$api.attr.reqGetCategory1();
      if (res.code == 200) {
        this.list.category1 = res.data;
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    async getCategory2(id) {
      let res = await this.$api.attr.reqGetCategory2(id);
      if (res.code == 200) {
        this.list.category2 = res.data;
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    async getCategory3(id) {
      let res = await this.$api.attr.reqGetCategory3(id);
      if (res.code == 200) {
        this.list.category3 = res.data;
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
