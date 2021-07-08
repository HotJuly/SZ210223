<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @changeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card>
      <!-- 第一个div用于显示属性列表,第二个div用于显示添加/修改属性模块 -->
      <!-- 
        v-if和v-show的区别
        v-if如果条件为false,它将不会解析内部的代码,也就是说从js层面干掉内部节点
        v-show如果条件为false,它将会解析内部的代码,将从css层面干掉内部节点(display:none)
        v-show至始至终只解析一次结构,v-if需要显示几次,就需要解析几次
        template无法与v-show同时使用
        性能对比:
            v-if的首次渲染性能优于v-show
            v-show频繁切换的性能优于v-if
       -->
      <div v-show="isShowList">
        <el-button
         type="primary" 
         icon="el-icon-plus" 
         @click="showAttrForm"
         >添加属性</el-button>
        <el-table :data="attrList" style="width: 100%; margin-top: 20px" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row }">
              <el-tag
                style="margin-right: 10px"
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{row}">
              <HintButton
                size="mini"
                type="primary"
                icon="el-icon-edit"
                title="编辑"
                @click="showAttrForm(row)"
              ></HintButton>
              <HintButton
                @click="test"
                size="mini"
                type="danger"
                icon="el-icon-delete"
                title="删除"
              ></HintButton>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowList">
        <el-form style="width: 30%" :model="attrForm" label-width="60px">
          <el-form-item label="属性名">
            <el-input
              v-model="attrForm.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrForm.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button>取消</el-button>

        <el-table
          style="width: 100%; margin: 20px 0"
          :data="attrForm.attrValueList"
          border
        >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <HintButton size="mini" type="danger" icon="el-icon-delete" title="删除"></HintButton>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
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
      isShowList: true,
      attrForm: {
        attrName: "",
        attrValueList: [
          // {
          //   attrId: 0, 这是属性的唯一表示,如果是添加肯定没有,修改肯定有
          //   id: 0, 这是属性值的唯一标识,如果是添加肯定没有,修改可能有
          //   valueName: "string",
          // },
        ],
        categoryId: 0,//声明当前属性属于哪个分类id
        categoryLevel: 3,//声明categoryId是几级分类的
        // id: 0, 新增属性不可能有id,只有修改的时候才会有
      },
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
    test() {
      console.log(111);
    },
    // 用于监视用户点击添加属性值按钮
    addAttrValue(){
      // 通过给attrValueList插入一个对象,可以让table表格多显示一行,实现添加属性值功能
      this.attrForm.attrValueList.push({
        attrId: this.attrForm.id,//其实在添加功能中不需要这行,这行代码是为了兼容修改功能
        valueName: ""
      })
    },
    showAttrForm(row){
      this.isShowList = false;
      // 如果当前是通过点击编辑按钮进入添加属性界面,需要将当前属性对象row赋值给attrForm
      if(row.id){
        this.attrForm=row;
      }
    }
  },
};
</script>

<style>
</style>