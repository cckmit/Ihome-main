<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 16:13:53
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-15 09:34:02
--> 
<template>
  <el-dialog
  v-dialogDrag
    title="批量分配角色"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left;"
    class="dialog"
    top="50px"
  >
    <div>
      <div style="text-align:right;">
        <el-input style="width:300px;" placeholder="名称 编码" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </div>
      <br />
      <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="编码"></el-table-column>
      </el-table>
      <div>
        <el-pagination
          style="text-align: right;margin:20px 40px 0 0;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getRoleList } from "../../api/system";
// import { Form as ElForm } from "element-ui";
@Component({
  components: {}
})
export default class BatchOperationRole extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  selectList: any = [];

  cancel() {
    this.$emit("cancel", false);
  }

  finish() {
    if (this.selectList.length > 0) {
      this.$emit("finish", {});
    } else {
      alert(`未选择数据`);
    }
  }
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
}
</script>
<style lang="scss" scoped>
</style>