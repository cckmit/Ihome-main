<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-09 14:49:18
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-20 22:06:37
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="60%"
    class="text-left dialog-table"
    :title="`成交归属组织`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input
              v-model="queryPageParameters.name"
              placeholder="名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否有效">
            <el-select
              v-model="queryPageParameters.status"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ValidType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-100">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
    </div>
    <br />
    <el-table
      class="ih-table"
      ref="multipleTable"
      :data="resPageInfo.list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      height="400"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="名称"
      ></el-table-column>
      <el-table-column
        prop="shortName"
        label="简称"
      ></el-table-column>
      <el-table-column
        label="是否有效"
        width="100"
      >
        <template v-slot="{ row }">{{
          $root.dictAllName(row.status, "ValidType")
        }}</template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
      ></el-table-column>
    </el-table>
    <br />
    <el-pagination
      class="text-right"
      style="margin-right: 40px"
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_org_getListRecursion } from "@/api/system/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class Organization extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  queryPageParameters: any = {
    level: 7,
    name: null,
    orgType: "Group",
    status: null,
  };
  resPageInfo: any = {
    list: [],
    total: 0,
  };
  selection: any = [];

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.queryPageParameters.name = this.data.groupName;
    await this.getListMixin();
    const item = this.resPageInfo.list.find(
      (v: any) => v.id === this.data.groupId
    );
    (this.$refs.multipleTable as any).toggleRowSelection(item, true);
  }
  async getListMixin() {
    this.queryPageParameters.id = this.data.id;
    this.resPageInfo = await post_org_getListRecursion(
      this.queryPageParameters
    );
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      level: 7,
      name: null,
      orgType: "Group",
      status: null,
    });
  }

  cancel() {
    this.$emit("cancel");
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }
  handleSelect(selection: any) {
    if (selection.length > 1) {
      let row = selection.shift();
      (this.$refs.multipleTable as any).toggleRowSelection(row, false);
    }
  }

  finish() {
    if (this.selection.length) {
      this.$emit("finish", this.selection);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-table {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
}

.ih-table {
  /deep/ .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>