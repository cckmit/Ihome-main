<!--
 * @Description: 成交报告弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-18 10:12:10
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-28 19:36:35
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="80%"
    top="3vh"
    title="关联成交报告"
  >
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="成交报告编号">
            <el-input
              v-model="queryPageParameters.dealCode"
              clearable
              placeholder="成交报告编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交日期">
            <el-date-picker
              style="width:100%;"
              v-model="timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">
            <IhSelectPageUser
              v-model="queryPageParameters.entryPerson"
              clearable
            ></IhSelectPageUser>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="8">
          <el-form-item label="联动项目">
            <IhSelectPageByProject
              clearable
              v-model="queryPageParameters.projectCycle"
              placeholder="请选择联动项目"
            ></IhSelectPageByProject>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="项目周期">
            <IhSelectPageByCycle
              clearable
              v-model="queryPageParameters.projectCycle"
              @changeOption="(data) => proId = data.proId"
              placeholder="请选择立项周期"
            ></IhSelectPageByCycle>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">
            <IhSelectPageByRoom
              v-model="queryPageParameters.roomNo"
              :proId="proId"
              placeholder="请选择房号"
              clearable
            ></IhSelectPageByRoom>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="组织">
            <IhSelectOrgTree v-model="queryPageParameters.dealOrg"></IhSelectOrgTree>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="业主姓名">
            <el-input
              v-model="queryPageParameters.customerName"
              placeholder="请输入业主姓名"
              clearable
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
    <el-table
      class="ih-table table-dialog"
      ref="table"
      :data="resPageInfo.list"
      height="40vh"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        label="成交报告编号"
        prop="dealCode"
      ></el-table-column>
      <el-table-column
        label="成交日期"
        prop="signDate"
      ></el-table-column>
      <el-table-column
        label="录入人"
        prop="entryPerson"
      ></el-table-column>
      <el-table-column
        label="联动项目"
        prop="projectName"
      ></el-table-column>
      <el-table-column
        label="房号"
        prop="roomNo"
      ></el-table-column>
      <el-table-column
        label="立项周期"
        prop="termName"
      ></el-table-column>
      <el-table-column
        label="店组"
        prop="dealOrg"
      ></el-table-column>
    </el-table>
    <div class="text-right">
      <br />
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
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "../../../../mixins/pagination";
import { post_deal_getList } from "../../../../api/deal/index";
import { post_payment_relevanceDeal } from "../../../../api/finance/index";

@Component({
  mixins: [PaginationMixin],
})
export default class DealDialog extends Vue {
  @Prop() id!: any;

  private dialogVisible = true;
  private selection = [];
  public queryPageParameters: any = {
    timeType: "SignUp",
    dealCode: null,
    entryPerson: null,
    projectCycle: null,
    roomNo: null,
    dealOrg: null,
    customerName: null,
    beginTime: null,
    endTime: null,
  };
  proId: any = null;
  public resPageInfo: any = {
    total: null,
    list: [],
  };
  timeList: any = [];

  cancel(): void {
    this.$emit("cancel", false);
  }
  async finish() {
    if (this.selection.length) {
      let dealItem: any = this.selection[0];
      await post_payment_relevanceDeal({
        dealCode: dealItem.dealCode,
        dealId: dealItem.id,
        id: this.id,
      });
      this.$emit("finish");
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.beginTime = flag ? this.timeList[0] : null;
    this.queryPageParameters.endTime = flag ? this.timeList[1] : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      timeType: "SignUp",
      dealCode: null,
      entryPerson: null,
      projectCycle: null,
      roomNo: null,
      dealOrg: null,
      customerName: null,
      beginTime: null,
      endTime: null,
    });
    this.timeList = [];
    this.proId = null;
  }
  private handleSelectionChange(val: any) {
    this.selection = val;
  }
  private handleSelect(selection: any) {
    if (selection.length > 1) {
      let del_row = selection.shift();
      (this.$refs.table as any).toggleRowSelection(del_row, false);
    }
  }
  async getListMixin() {
    this.resPageInfo = await post_deal_getList(this.queryPageParameters);
  }

  async created() {
    this.getListMixin();
  }
}
</script>

<style lang="scss">
.ih-table.table-dialog {
  .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>
