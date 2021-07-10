<template>
  <el-form :model="skuForm" label-width="80px">
    <!-- SPU名称 -->
    <el-form-item label="SPU名称">
      <span>Apple iPhone 12</span>
    </el-form-item>

    <!-- SKU名称 -->
    <el-form-item label="SKU名称">
      <el-input v-model="skuForm.skuName" placeholder="请输入SKU名称"></el-input>
    </el-form-item>

    <!-- 价格 -->
    <el-form-item label="价格(元)">
      <el-input v-model="skuForm.price" type="number" placeholder="请输入价格"></el-input>
    </el-form-item>

    <!-- 重量 -->
    <el-form-item label="重量(千克)">
      <el-input v-model="skuForm.weight" type="number" placeholder="请输入重量"></el-input>
    </el-form-item>

    <!-- 规格描述 -->
    <el-form-item label="规格描述">
      <el-input v-model="skuForm.skuDesc" type="textarea" rows="4" placeholder="请输入规格描述"></el-input>
    </el-form-item>

    <!-- 平台属性 -->
    <el-form-item label="平台属性">
      <el-form label-width="80px" :inline="true">
        <el-form-item label="苹果">
          <el-select value="" placeholder="请选择">
            <el-option label="12" value="12"></el-option>
            <el-option label="11" value="11"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <el-form label-width="80px" :inline="true">

        <el-form-item label="颜色">
          <el-select value="" placeholder="请选择">
            <el-option label="绿色" value="12"></el-option>
            <el-option label="黄色" value="11"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="版本">
          <el-select value="" placeholder="请选择">
            <el-option label="plus" value="12"></el-option>
            <el-option label="pro" value="11"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </el-form-item>

    <el-form-item>
      <el-table style="width: 100%" border>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="图片">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="操作">
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      skuForm: {
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",

        // category3Id: 0,
        // createTime: "2021-07-10T00:35:19.960Z",
        // id: 0,
        // isSale: 0,
        // skuAttrValueList: [
        //   {
        //     attrId: 0,
        //     attrName: "string",
        //     id: 0,
        //     skuId: 0,
        //     valueId: 0,
        //     valueName: "string",
        //   },
        // ],
        // skuDefaultImg: "string",
        // skuImageList: [
        //   {
        //     id: 0,
        //     imgName: "string",
        //     imgUrl: "string",
        //     isDefault: "string",
        //     skuId: 0,
        //     spuImgId: 0,
        //   },
        // ],
        // skuSaleAttrValueList: [
        //   {
        //     id: 0,
        //     saleAttrId: 0,
        //     saleAttrName: "string",
        //     saleAttrValueId: 0,
        //     saleAttrValueName: "string",
        //     skuId: 0,
        //     spuId: 0,
        //   },
        // ],
        // spuId: 0,
        // tmId: 0,
      },
    };
  },
};
</script>

<style>
</style>