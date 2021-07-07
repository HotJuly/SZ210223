<template>
  <div>
      <el-card style="margin:20px 0;">
        <CategorySelector @changeCategory="changeCategory"></CategorySelector>
      </el-card>
      <el-card>
        content
      </el-card>
  </div>
</template>

<script>
export default {
    name:"Attr",
    data(){
      return{
        category1Id:"",
        category2Id:"",
        category3Id:""
      }
    },
    methods:{
      changeCategory({id,level}){
        // console.log('changeCategory',id)
        if(level===1){
          this.category1Id = id;
        }else if(level===2){
          this.category2Id = id;
        }else if(level===3){
          this.category3Id = id;
        }
      }
    }
}
</script>

<style>

</style>