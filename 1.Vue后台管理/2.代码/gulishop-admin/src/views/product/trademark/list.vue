<template>
  <div>
    <el-button style="margin-top:20px;" type="primary" icon="el-icon-plus">添加</el-button>
    <el-table border style="width: 100%;margin:20px 0;">
      <el-table-column label="序号" width="80" align="center"> </el-table-column>
      <el-table-column label="品牌名称"> </el-table-column>
      <el-table-column label="品牌LOGO"> </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
    <!-- 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <el-pagination
      style="text-align:center"
      :current-page="page"
      :page-sizes="[2, 3, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data(){
    return {
      page:1,
      limit:3,
      total:15
    }
  }
};
</script>

<style>
</style>