<template>
  <div>
    <el-button style="margin-top:20px;" type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 
      border->用于让整个table表格添加边框
      el-table组件用于生成整个表格
      el-table-column组件用于生成表格中的每一列
        label用于确认表头标题
        width用于指定当前列宽度,如果没有写,就会将剩余宽度与其他没写的column进行平分
        align用于将当前列中的内容居中
     -->
    <el-table border style="width: 100%;margin:20px 0;">
      <el-table-column label="序号" width="80" align="center"> </el-table-column>
      <el-table-column label="品牌名称"> </el-table-column>
      <el-table-column label="品牌LOGO"> </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>
    <!-- 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <!-- 
      current-page->指定当前所在页数
      page-sizes->用来指定页面显示数量下拉框的选项
      page-size->指定当前页面显示条数
      layout->用来控制当前分页器组件内的组成结构和顺序
      total->用来指定当前总条数
      -->
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