<template>
  <div>
      <el-card style="margin:20px 0;">
        <CategorySelector @changeCategory="changeCategory" :isShowList="isShowList"><!-- 插槽 --></CategorySelector>
      </el-card>
      <el-card>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table
          :data="spuList"
          style="width: 100%"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称">
          </el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述">
          </el-table-column>
          <el-table-column
            label="操作">
            <template>
              <HintButton type="success" size="mini" icon="el-icon-plus" title="添加SKU"></HintButton>
              <HintButton type="primary" size="mini" icon="el-icon-edit" title="修改SPU"></HintButton>
              <HintButton type="info" size="mini" icon="el-icon-info" title="查看SKU列表"></HintButton>
              <HintButton type="danger" size="mini" icon="el-icon-delete" title="删除SPU"></HintButton>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="text-align:center"
          :current-page="page"
          :page-sizes="[2,5,10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total">
        </el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
    name:"SPU",
    data(){
      return {
        category1Id:"",
        category2Id:"",
        category3Id:"",
        isShowList:true,

        page:1,
        limit:5,
        total:20,
        spuList:[]
      }
    },
    methods:{
      changeCategory({id,level}){
        // console.log(value)
        if(level === 1){
          this.category1Id = id;
          this.category2Id = "";
          this.category3Id = "";
        }else if(level === 2){
          this.category2Id = id;
          this.category3Id = "";
        }else if(level === 3){
          this.category3Id = id;
          // 发送请求
          this.getSpuList();
        }
      },
      async getSpuList(){
        // console.log('发送请求中');
        const {data:{total,records}} = await this.$API.spu.getSpuList(this.page,this.limit,this.category3Id);
        // console.log(result)
        this.total = total;
        this.spuList = records;
      },
      handleSizeChange(value){
        // value为当前修改之后的条数
        this.limit = value;
        this.getSpuList();
      },
      handleCurrentChange(value){
        // value为当前修改之后的页数
        this.page = value;
        this.getSpuList();
      }
    }

}
</script>

<style>

</style>