<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @changeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus">添加属性</el-button>
      <el-table :data="attrList" style="width: 100%; margin-top: 20px" border>
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150">
        </el-table-column>
        <el-table-column label="属性值名称">
          <template slot-scope="{row}">
            <el-tag style="margin-right:10px" type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id">{{attrValue.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template>
            <HintButton @click="test" size="mini" type="primary" icon="el-icon-edit" title="编辑"></HintButton>
            <HintButton @click="test" size="mini" type="danger" icon="el-icon-delete" title="删除"></HintButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
    };
  },
  methods: {
    changeCategory({ id, level }) {
      // console.log('changeCategory',id)
      if (level === 1) {
        this.category1Id = id;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = id;
        this.category3Id = "";
      } else if (level === 3) {
        this.category3Id = id;
        //发送请求
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      const { data } = await this.$API.attr.getAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result)
      this.attrList = data;
    },
    test(){
      console.log(111)
    }
  },
};
</script>

<style>
</style>