<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 16:53:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-06 15:20:26
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="批量分配岗位"
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
        <el-input
          style="width:300px;"
          placeholder="名称 编码"
          class="input-with-select"
          v-model="queryPageParameters.key"
        >
          <el-button slot="append" icon="el-icon-search" @click="getListMixin()"></el-button>
        </el-input>
      </div>
      <br />
      <el-table
        :data="resPageInfo.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="编码"></el-table-column>
      </el-table>
      <div class="text-right padding-right-40">
        <el-pagination
          @size-change="handleSizeChangeMixin"
          @current-change="handleCurrentChangeMixin"
          :current-page.sync="queryPageParameters.pageNum"
          :page-sizes="$root.pageSizes"
          :page-size="queryPageParameters.pageSize"
          :layout="$root.paginationLayout"
          :total="resPageInfo.total"
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
// import { getRoleList } from "../../api/system/index2";
import {
  post_role_addRoleToJobBatch,
  post_job_getList,
} from "../../api/system/index";
// import { Form as ElForm } from "element-ui";
import PaginationMixin from "../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class BatchOperationJob extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  selectList: any = [];
  queryPageParameters: any = {
    key: null,
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    if (this.selectList.length > 0) {
      let p = {
        jobIds: this.selectList.map((item: any) => {
          return item.id;
        }),
        roleId: this.data.id,
      };
      debugger
      console.log(p);
      const res = await post_role_addRoleToJobBatch(p);
      this.$message.success("操作成功");

      this.$emit("finish", res);
    } else {
      this.$message.warning("请先选择数据");
    }
  }

  async getListMixin() {
    this.resPageInfo = await post_job_getList(this.queryPageParameters);
  }
  async created() {
    this.getListMixin();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val || [];
  }
}
</script>
<style lang="scss" scoped>
</style>