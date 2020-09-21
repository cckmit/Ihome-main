<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-21 16:37:04
-->

<template>
  <div class="detailInfo">
    <p class="ih-info-title">基础信息---假数据</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">渠道商</el-col>
          <el-col :span="18" class="ih-info-item-right">广州市择食电子商务有限责任公司</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">渠道等级</el-col>
          <el-col :span="18" class="ih-info-item-right">91440101MA5D6ETP8X</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">渠道类型</el-col>
          <el-col :span="18" class="ih-info-item-right">广州择食</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">业务开展省份</el-col>
          <el-col :span="18" class="ih-info-item-right">有限责任公司（自然人投资或控股）</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">业务开展城市</el-col>
          <el-col :span="18" class="ih-info-item-right">谭星科</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">城市等级</el-col>
          <el-col :span="18" class="ih-info-item-right">440111198710031817</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">是否特批入库</el-col>
          <el-col :span="18" class="ih-info-item-right">广州市择食电子商务有限责任公司</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">入库编号</el-col>
          <el-col :span="18" class="ih-info-item-right">91440101MA5D6ETP8X</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">状态</el-col>
          <el-col :span="18" class="ih-info-item-right">广州择食</el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="ih-info-title">
      <span>评级信息</span>

      <el-button type="success" class="add" @click.native="addAccount()">添加</el-button>
      <a href>查看所有标准</a>
    </p>
    <!-- 对话框 -->

    <el-dialog title="账户信息" :visible.sync="dialogFormVisible" width="800px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账户名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bank">
          <el-input v-model="ruleForm.bank"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" label-width="300px" prop="bankType">
          <el-select v-model="ruleForm.bankType" clearable placeholder="请选择" class="width--100">
            <el-option
              v-for="item in $root.displayList('bankType')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="resPageInfo.list" border style="width:100%">
      <el-table-column prop="date" label="城市等级" width="300"></el-table-column>
      <el-table-column prop="name" label="渠道等级"></el-table-column>
      <el-table-column prop="address" label="评级项" width="300"></el-table-column>
      <el-table-column prop="address" label="录入信息" width="300"></el-table-column>
      <el-table-column prop="address" label="评级标准" width="300"></el-table-column>
    </el-table>
    <p class="ih-info-title">
      <span>附件信息</span>
      <a href="./">综合查询被执行人</a>
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
// import { post_role_getList } from "../../../../api/system/index";
// import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {},
})
export default class Home extends Vue {
  info: any = {};
  dialogFormVisible = false;
  ruleForm: any = {
    name: "",
    account: "",
    bank: "",
    bankType: "",
  };
  rules: any = {
    name: [
      { required: true, message: "请输入账户名称", trigger: "blur" },
      { min: 3, max: 5, message: "长度在 3 到 64 个字符", trigger: "blur" },
    ],
    account: [
      { required: true, max: 32, message: "请输入账号", trigger: "blur" },
    ],
    bank: [
      { required: true, max: 64, message: "请输入开户银行", trigger: "blur" },
    ],
    bankType: [{ required: true, message: "请选择账户类型", trigger: "blur" }],
  };

  resPageInfo: any = {
    total: 0,
    list: [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ],
  };
  addAccount(scope: any) {
    console.log(11);
    this.dialogFormVisible = true;
  }
}
//请求数据
//   };
//   async getListMixin() {
//     this.resPageInfo = await post_role_getList(this.queryPageParameters);
//     debugger;
//   }
//   async created() {
//     this.getListMixin;
//   }
// }
</script>
<style lang="scss" scoped>
.ih-info-title {
  border-left: 5px solid #4cccec;
  .add {
    color: #000;
    margin-left: 20px;
    cursor: pointer;
  }
}
.line {
  padding: 15px;
}
.ih-info-item-left {
  text-align: right;
  line-height: 21px;
}
.ih-info-item-right {
  text-align: left;
  padding-left: 20px;
  line-height: 21px;
}
.title {
  font-weight: 600;
  text-align: left;
  margin-left: 20px;
}
.el-input__inner {
  width: 1060px;
}
a {
  margin-left: 10px;
}
</style>
