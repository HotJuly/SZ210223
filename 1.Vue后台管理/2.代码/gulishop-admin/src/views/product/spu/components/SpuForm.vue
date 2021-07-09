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
          <el-option
            v-for="tm in trademarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          >
          </el-option>
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
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="spuSaleAttrStr" :placeholder="unUseSaleAttrList.length?`还有${unUseSaleAttrList.length}个未选中`:'没有了'">
          <el-option 
          v-for="unUseASaleAttr in unUseSaleAttrList"
          :key="unUseASaleAttr.id"
          :label="unUseASaleAttr.name" 
          :value="`${unUseASaleAttr.name}:${unUseASaleAttr.id}`"
          > </el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-plus" @click="addSaleAttr" :disabled="!spuSaleAttrStr">添加销售属性</el-button>

        <el-table
          :data="spuForm.spuSaleAttrList"
          style="width: 100%; margin: 20px 0"
          border
        >
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{row}">
              <el-tag
                v-for="saleAttrValue in row.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{saleAttrValue.saleAttrValueName}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <!-- 
                @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template>
              <HintButton type="danger" size="mini" icon="el-icon-delete" title="删除"></HintButton>
            </template>
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
      // 这里初始化的spuForm只是为了给添加spu使用的,如果是修改Spu,这里的数据没用
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
      dialogImageUrl: "",
      dialogVisible: false,
      spuSaleAttrStr: "",
      spuImageList: [],
      spuSaleAttrList: [],
      trademarkList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    // 以下两个方法用于实现照片墙功能
    handleRemove(file, fileList) {
      // 第一个参数是即将被删除的图片对象
      // 第二个参数是剩余展示的图片组成的数组
      // console.log(file, fileList);

      // 注意:别去修改所有图片的数组,只需要将最新的剩余数组保存如spuForm的spuImageList中即可
      this.spuForm.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      // file是当前的图片文件,本地的文件对象
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 如果是新增SPU会执行该函数,请求相关数据
    initAddSpuForm() {
      // 一共需要使用2个接口
      // ​     1.获取所有的销售属性信息(在**spu**的api模块中声明)
      // ​     GET /admin/product/baseSaleAttrList
      // ​     2.获取所有的品牌信息(在**trademark**的api模块中声明)
      // ​     GET /admin/product/baseTrademark/getTrademarkList
    },
    // 如果是修改SPU会执行该函数,请求相关数据
    initUpdateSpuForm(row) {
      // 一共需要使用4个接口
      //1.获取SPU详细信息(在**spu**的api模块中声明)
      // ​     GET /admin/product/getSpuById/{spuId}
      // ​     2.获取SPU所有图片的列表信息(在**sku**的api模块中声明)
      // ​     GET /admin/product/spuImageList/{spuId}
      // ​     3.获取所有的销售属性信息(在**spu**的api模块中声明)
      // ​     GET /admin/product/baseSaleAttrList
      // ​     4.获取所有的品牌信息(在**trademark**的api模块中声明)
      // ​     GET /admin/product/baseTrademark/getTrademarkList
      // console.log('initUpdateSpuForm')

      // async和await的作用范围非常的小,只能影响到当前函数内部
      this.getSpuInfo(row.id);
      this.getSpuImageList(row.id);
      this.getBaseSaleAttrList();
      this.getTradeMarks();
    },

    async getSpuImageList(id) {
      const { data } = await this.$API.sku.getSpuImageList(id);
      // console.log(result)
      // 现在的图片对象结构
      // {
      //   id: 12;
      //   imgName: "7155bba4c363065f.jpg";
      //   imgUrl: "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWAVRWzAABUiOmA0ic932.jpg";
      //   spuId: 3;
      //   status: "success";
      //   uid: 1625811494042;
      // }

      // 照片墙需要的结构
      // {
      //   name:"xxxx.jpg",
      //   url:"xxxxx"
      // }
      data.forEach((imgObj) => {
        imgObj.name = imgObj.imgName;
        imgObj.url = imgObj.imgUrl;
      });
      this.spuImageList = data;
    },

    async getBaseSaleAttrList() {
      const result = await this.$API.spu.getBaseSaleAttrList();
      // console.log(result)
      this.spuSaleAttrList = result.data;
    },

    async getTradeMarks() {
      const result = await this.$API.trademark.getTradeMarks();
      console.log(result);
      this.trademarkList = result.data;
    },

    async getSpuInfo(id) {
      const result = await this.$API.spu.getSpuInfo(id);
      // console.log(result)
      this.spuForm = result.data;
    },

    // 用于监视图片上传是否成功,成功会执行该回调函数
    handleSuccess(response, file, fileList){
      // response是当前上传接口返回的相应数据
      //file是当前图片对应的本地文件对象
      //fileList是当前照片墙展示的数组
      // console.log(response, file, fileList)
      this.spuForm.spuImageList = fileList;
    },
    // 用于添加销售属性
    addSaleAttr(){
      // 收集数据
      const {spuSaleAttrStr} = this;
      const [saleAttrName,baseSaleAttrId] = spuSaleAttrStr.split(':');

      //整理数据结构
      // 我们手头只有ID,没有属性的属性名
      // {
          //   baseSaleAttrId: 0,
          //   saleAttrName: "",
          //   spuSaleAttrValueList: [
          //   ],
          // },
      this.spuForm.spuSaleAttrList.push({
        saleAttrName,
        baseSaleAttrId,
        spuSaleAttrValueList:[]
      });

      // 记得清空spuSaleAttrStr的数据,防止显示错误
      this.spuSaleAttrStr = "";
    }
  },
  computed:{
    unUseSaleAttrList(){
      const { spuSaleAttrList:baseSaleAttrList ,spuForm } = this;
      const {spuSaleAttrList} = spuForm;

      // 去重,保留两个数组中不重复的部分
      // map(长度与基础数组一样) filter reduce
      // 注意:spuForm.spuSaleAttrList中的对象的id是在baseSaleAttrId属性中
      // baseSaleAttrList数组中对象的id,是存储与id属性
      // const unUseList = baseSaleAttrList.filter((item)=>{
      //   return !(spuSaleAttrList.some((spuSaleAttr)=>{
      //     // console.log(spuSaleAttr.id,item.baseSaleAttrId)
      //     return spuSaleAttr.baseSaleAttrId === item.id;
      //   }))
      // });

      //去重思路:
      // 1.双层for循环
      // 2.对象+数组

      // 通过对象记录是否出现过某些属性的id
      const saleAttrObj = {};

      // 遍历较短的数组,将当前数组中出现的所有的销售属性的id存放到对象中,属性值为true
      spuSaleAttrList.forEach((item)=>{
        // obj[1]=true
        saleAttrObj[item.baseSaleAttrId] = true;
      })

      // 遍历较长的数组,通过当前的属性id,去对象中读取数据,查看是否出现过
      const unUseList = baseSaleAttrList.filter((item)=>{
        return !saleAttrObj[item.id]
      })

      return unUseList;

    }
  }
  // mounted(){
  //   this.initUpdateSpuForm()
  // }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>