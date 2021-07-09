<template>
  <div>
    <el-form :model="spuForm" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuForm.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
          <el-option label="苹果" value="1"> </el-option>
          <el-option label="华为" value="2"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <!--  type="textarea" rows="4"  -->
        <el-input
          v-model="spuForm.description"
          placeholder="请输入SPU名称"
          type="textarea"
          rows="4"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="spuSaleAttrId" placeholder="还有1未选中">
          <el-option
            label="尺码"
            value="1">
          </el-option>
          <el-option
            label="内存"
            value="2">
          </el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>

        <el-table style="width: 100%;margin:20px 0;" border>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称列表">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
          </el-table-column>
        </el-table>

        
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      spuForm: {
        category3Id: 0, //代表当前spu属于哪个分类,新增和修改都需要
        description: "", //spu的描述文本
        spuName: "", //spu的名称
        tmId: "", //该属性代表spu的品牌ID,新增和修改都需要
        // id: 0,                 //该属性代表的是spu的id,新增不需要,修改需要
        spuImageList: [
          //该属性对应图片列表功能,新增和修改都需要
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          //该属性对应spu的销售属性列表,新增和修改都需要
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      dialogImageUrl: '',
      dialogVisible: false,
      spuSaleAttrId:""
    };
  },
  methods:{
    // 以下两个方法用于实现照片墙功能
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
</style>