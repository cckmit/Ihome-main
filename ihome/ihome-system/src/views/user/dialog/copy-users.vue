<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 16:00:28
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-14 17:30:54
--> 
<template>
  <el-dialog
    title="复制用户岗位角色组织权限"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left;"
    class="dialog"
    top="50px"
  >
    <el-row>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>选中用户</span>
          </div>
          <div class="text item">张三</div>
          <div class="text item">李四</div>
          <div class="text item">王五</div>
          <div class="text item">张三</div>
          <div class="text item">李四</div>
          <div class="text item">王五</div>
          <div class="text item">张三</div>
          <div class="text item">李四</div>
          <div class="text item">王五</div>
        </el-card>
      </el-col>

      <el-col :span="16" class="margin-left-20">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="height:20px;">
            <div class="float-left">
              <span>复制选项</span>
              <span class="margin-left-20">
                <el-checkbox v-model="checked1" size="small" label="岗位角色" border></el-checkbox>
                <el-checkbox v-model="checked2" size="small" label="组织权限" border></el-checkbox>
              </span>
            </div>
          </div>
          <div>
            <div style="text-align:right;">
              <el-input style="width:200px;" placeholder="姓名 登录账号" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
              </el-input>
            </div>
            <br />
            <el-table
              :data="list"
              height="300"
              border
              style="width: 100%"
              highlight-current-row
              @selection-change="handleSelectionChange"
              @current-change="currentChange"
            >
              <el-table-column property="selected" label width="30">
                <template slot-scope="scope">
                  <ih-table-radio :radio="scope.row.id==currentItem.id"></ih-table-radio>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120"></el-table-column>
              <el-table-column prop="code" label="登录账号"></el-table-column>
              <el-table-column prop="code" label="用户类型" width="120"></el-table-column>
            </el-table>
            <div>
              <el-pagination
                style="text-align: right;margin:20px 40px 0 0;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 50]"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getRoleList } from "../../../api/system";
// import { Form as ElForm } from "element-ui";

@Component({
  components: {}
})
export default class CopyUsers extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  checked1 = false;
  checked2 = false;

  selectList: any = [];

  cancel() {
    this.$emit("cancel", false);
  }

  finish() {
    if (this.currentItem.id) {
      this.$emit("finish", this.currentItem);
    } else {
      alert(`未选择数据`);
    }
  }
  currentItem: any = { id: null };
  list: any = [];
  total: any = null;
  currentPage = 1;
  handleSizeChange(a: any) {
    console.log(a);
  }
  handleCurrentChange(a: any) {
    console.log(a);
  }
  async search() {
    const { total, list } = await getRoleList();
    this.total = total;
    this.list = list;
  }
  async created() {
    this.search();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val;
  }
  currentChange(val: any) {
    console.log(val);
    this.currentItem = val;
  }
}
</script>
<style lang="scss" scoped>
.item {
  line-height: 40px;
}
</style>