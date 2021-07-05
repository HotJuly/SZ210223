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
     <!-- 
       通过给el-table属性添加标签属性data,可以将需要遍历的数组交给el-table组件
       el-table会将当前data的数组交给每一个el-table-column组件,组件内部会自动进行v-for遍历
       给每个el-table-column组件添加prop标签属性,声明当前列需要展示遍历对象中的哪个属性结果
       注意:prop执行的内容,在elementUI中会默认作为文本显示
       如果想要自定义列显示内容,需要使用到作用域插槽,给column组件内部传入template结构

      -->
    <el-table :data="trademarkList" border style="width: 100%;margin:20px 0;">
      <el-table-column label="序号" type="index" width="80" align="center"> </el-table-column>
      <el-table-column label="品牌名称" prop="tmName"> </el-table-column>
      <el-table-column label="品牌LOGO">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" style="width:100px;height:80px;" alt="" srcset="">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="warning" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
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
      total:15,
      trademarkList:[]
    }
  },
  mounted(){
    // this.getTradeMarkList  =>  Vue.prototype.getTradeMarkList找不到
    this.getTradeMarkList();
  },
  methods:{
    async getTradeMarkList(){
      const {data:{total,records}} = await this.$API.trademark.getTradeMarkList(this.page,this.limit);
      //以上解构赋值相当于:const total = result.data.total;
      this.total = total;
      this.trademarkList = records;
    }
  }
};
</script>

<style>
</style>