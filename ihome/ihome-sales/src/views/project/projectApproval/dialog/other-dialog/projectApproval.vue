<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-08 19:26:43
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-10 15:26:28
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="text-left dialog-table"
    :title="`周期信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市区">
            <IhCascader v-model="provinceOption"></IhCascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="盘编">
            <el-input
              v-model="queryPageParameters.proNo"
              clearable
              placeholder="盘编"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-model="queryPageParameters.proName"
              clearable
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="周期名称">
            <el-input
              v-model="queryPageParameters.termName"
              clearable
              placeholder="周期名称"
            ></el-input>
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
    <IhTableCheckBox
      class="ih-table"
      :data="resPageInfo.list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
      :hasCheckedData="hasCheckedData"
      :column="tableColumn"
      :maxHeight="tableMaxHeight"
      :pageSize="pageSize"
      :pageCurrent="pageNum"
      :pageTotal="resPageInfo.total"
      @page-change="pageChange"
      @size-change="sizeChange"
      row-key="termId"
    >
      <template #province>
        <el-table-column
          prop="province"
          label="省份"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.province)
          }}</template>
        </el-table-column>
      </template>
      <template #city>
        <el-table-column
          prop="province"
          label="省份"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.province)
          }}</template>
        </el-table-column>
      </template>
      <template #district>
        <el-table-column
          prop="district"
          label="行政区"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.district)
          }}</template>
        </el-table-column>
      </template>
      <template #operate>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="routerTo(row, 'info')"
            >查看详情</el-link>
          </template>
        </el-table-column>
      </template>
    </IhTableCheckBox>
    <br />
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
        :loading="finishLoading"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import {
  post_term_getListAccrossTerm,
  post_other_add,
} from "@/api/project/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ProjectApproval extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  queryPageParameters: any = {
    termName: null,
    proNo: null,
    proName: null,
    province: null,
    city: null,
    district: null,
  };
  provinceOption: any = [];
  finishLoading = false;
  resPageInfo: any = {
    list: [],
    total: 0,
  };
  selection: any = [];
  private tableMaxHeight: any = 350;
  private pageSize = 10;
  private pageNum = 1;
  private hasCheckedData: any = [];
  private tableColumn = [
    {
      prop: "termName",
      label: "周期名称",
      minWidth: 250,
    },
    {
      prop: "proNo",
      label: "盘编",
      minWidth: 150,
    },
    {
      prop: "proName",
      label: "项目名称",
      minWidth: 150,
    },
    {
      slot: "province",
    },
    {
      slot: "city",
    },
    {
      slot: "district",
    },
    {
      slot: "operate",
    },
  ];

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.hasCheckedData = this.data.hasCheckedData;
    console.log(this.hasCheckedData);
    this.getListMixin();
  }
  async getListMixin() {
    this.queryPageParameters.exOver = this.data.exOver;
    this.queryPageParameters.proId = this.data.proId;
    this.queryPageParameters.termId = this.data.termId;
    this.resPageInfo = await post_term_getListAccrossTerm({
      ...this.queryPageParameters,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  private pageChange(val: number) {
    this.pageNum = val;
    this.getListMixin();
  }
  private sizeChange(val: any) {
    this.pageSize = val;
    this.getListMixin();
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      termName: null,
      proNo: null,
      proName: null,
      province: null,
      city: null,
      district: null,
    });
    this.provinceOption = [];
  }

  cancel() {
    this.$emit("cancel");
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }

  search() {
    this.queryPageParameters.provinces = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.district = this.provinceOption[2];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  async finish() {
    if (this.selection.length) {
      try {
        let arr = this.selection.map((v: any) => v.termId);
        await post_other_add({
          shareTermIds: arr,
          termId: this.$route.query.id,
        });
        this.finishLoading = false;
        this.$emit("finish");
        this.$message.success("新增成功");
      } catch (err) {
        this.finishLoading = false;
      }
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }

  routerTo(row: any, type: string) {
    const item = this.$router.resolve({
      path: `/projectApproval/${type}`,
      query: {
        id: row.termId,
      },
    });
    window.open(item.href, "_blank");
  }
}
</script>
<style lang="scss" scoped>
.dialog-table {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>