<template>
  <div>
    <el-button style="margin-top: 20px" type="primary" icon="el-icon-plus" @click="showDialog"
      >添加</el-button
    >
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
    <el-table :data="trademarkList" border style="width: 100%; margin: 20px 0">
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column label="品牌名称" prop="tmName"> </el-table-column>
      <el-table-column label="品牌LOGO">
        <template slot-scope="{ row }">
          <img
            :src="row.logoUrl"
            style="width: 100px; height: 80px"
            alt=""
            srcset=""
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="warning" size="mini" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      current-page->指定当前所在页数
      page-sizes->用来指定页面显示数量下拉框的选项
      page-size->指定当前页面显示条数
      layout->用来控制当前分页器组件内的组成结构和顺序
      total->用来指定当前总条数
      -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[2, 3, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 
      标签属性:
      :visible.sync="dialogFormVisible"->用于控制当前dialog组件的显示隐藏
      :model="form" -> 将用来收集表单内部数据的对象交给form表单
      label-width="100px" ->用于控制表单的label的宽度(注意:必须带上px单位)

      组件用处:
        el-dialog->用于显示遮罩层,同时显示对话框
        el-form->主要功能,用于收集用户输入的表单数据
        el-form-item->每一个form-item代表form表单中的一行

      注意:尽量把tmForm的内部结构处理成接口所需要的结构
     -->
    <el-dialog title="添加品牌" style="width:80%" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!-- 此处的action需要填写图片上传的网络路径,但是记得加上前缀/dev-api -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 15,
      trademarkList: [],
      dialogFormVisible: false,
      tmForm:{
        tmName:"",
        logoUrl:""
      },
      imageUrl: ''//不管用不用,先复制过来
    };
  },
  mounted() {
    // this.getTradeMarkList  =>  Vue.prototype.getTradeMarkList找不到
    this.getTradeMarkList();
  },
  methods: {
    async getTradeMarkList() {
      const {
        data: { total, records },
      } = await this.$API.trademark.getTradeMarkList(this.page, this.limit);
      //以上解构赋值相当于:const total = result.data.total;
      this.total = total;
      this.trademarkList = records;
    },
    handleCurrentChange(value) {
      // 通过当前事件,可以知道用户点击了哪个页数
      // console.log('handleCurrentChange',value)
      this.page = value;

      //发送请求,获取对应页面的数据
      this.getTradeMarkList();
    },
    handleSizeChange(value) {
      // 通过当前事件,可以知道用户点击了哪个条数选择器项
      // console.log('handleSizeChange',value)
      this.limit = value;

      //发送请求,获取对应页面的数据
      this.getTradeMarkList();
    },
    handleAvatarSuccess(res, file) {
      //由于用户通过input标签选中图片之后,该图片就存储于浏览器内存中
      //以下代码是将内存中的图片,生成本地链接地址,用来展示
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log('handleAvatarSuccess',res, file)
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {

      const types = ['image/jpeg','image/jpg','image/png'];
      // 用来判断图片的文件类型
      // const isJPG = file.type === 'image/jpeg';
      const isJPG = types.includes(file.type);
      // 用来判断图片的大小是否超过2MB
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    showDialog(){
      this.dialogFormVisible = true;
    },
    async save(){
      //1.收集请求所需要的数据
      // 已经整理在tmForm中,不需要二次收集

      try {
        //2.发送请求
        await this.$API.trademark.addOrUpdate(this.tmForm);

        // 请求最新的品牌列表,由于添加功能,无法知道当前有几页,所以统一请求第一页
        this.getTradeMarkList();

        // 弹窗提示用户保存成功
         this.$message({
          message: '保存成功!!!',
          type: 'success'
        });

        // 将添加品牌dialog隐藏
        this.dialogFormVisible = false
        //3.成功之后做什么

      } catch (error) {
        // 弹窗提示用户保存失败
         this.$message("保存失败!!!");
      }

      //4.失败之后做什么

    }
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>