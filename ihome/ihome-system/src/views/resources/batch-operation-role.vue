<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 16:13:53
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-07 14:41:24
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
      <div>
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
import {
  post_role_getListByResourceId,
  post_resource_addResourceToRoleBatch,
} from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";
// import { Form as ElForm } from "element-ui";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class BatchOperationRole extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  queryPageParameters: any = {
    key: null,
    resourceId: 0,
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  handleSelectionChange(val: any) {
    this.selectList = val;
  }

  selectList: any = [];

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    if (this.selectList.length > 0) {
      let p = {
        resourceId: this.data.id,
        roleIds: this.selectList.map((item: any) => item.id),
      };
      console.log(p);
      const res = await post_resource_addResourceToRoleBatch(p);
      this.$message.success("操作成功");
      this.$emit("finish", res);
    } else {
      this.$message({
        message: "请先勾选数据",
        type: "warning",
      });
    }
  }

  async getListMixin() {
    this.resPageInfo = await post_role_getListByResourceId(
      this.queryPageParameters
    );
  }
  async created() {
    console.log(this.data);
    this.queryPageParameters.resourceId = this.data.id;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>