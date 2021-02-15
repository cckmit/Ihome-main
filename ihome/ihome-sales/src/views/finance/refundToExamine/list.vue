 
<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-13 14:50:21
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-15 10:11:07
-->
<template>
  <IhPage label-width="110px">
    <template #form>
      <el-form label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="退款申请单编号">
              <el-input
                v-model="queryPageParameters.refundApplyNo"
                placeholder="退款申请单编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <IhSelectPageDivision
                v-model="queryPageParameters.orgId"
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单人">
              <IhSelectPageUser
                placeholder="制单人"
                v-model="queryPageParameters.inputUser"
                clearable
              >
              </IhSelectPageUser>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="制单日期">
              <el-date-picker
                style="width: 100%"
                v-model="queryPageParameters.expiresTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
                @change="expiresTimeChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="结算方式">
              <el-select
                v-model="queryPageParameters.settlementType"
                clearable
                placeholder="结算方式"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('RefundSettlementType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方式">
              <el-select
                v-model="queryPageParameters.payType"
                clearable
                placeholder="付款方式"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('RefundPayType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button type="primary" @click="searchMixin()">查询</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
      </el-row>
    </template>
    <template #table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list"
      >
        <el-table-column
          type="index"
          width="50"
          align="center"
          label="序号"
          fixed
        ></el-table-column>
        <el-table-column
          label="退款申请单编号"
          prop="refundApplyNo"
          min-width="120"
          fixed
        ></el-table-column>
        <el-table-column label="事业部" prop="departmentName"></el-table-column>
        <el-table-column
          label="申请退款金额"
          prop="amount"
          min-width="120"
        ></el-table-column>
        <el-table-column label="付款方" prop="accountName"></el-table-column>
        <el-table-column label="结算方式" prop="">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.settlementType, "RefundSettlementType")
          }}</template>
        </el-table-column>
        <el-table-column label="付款方式" prop="payType">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.payType, "RefundPayType")
          }}</template>
        </el-table-column>
        <el-table-column label="制单人" prop="inputUserName"></el-table-column>
        <el-table-column label="制单日期" prop="createDate"></el-table-column>
        <el-table-column
          fixed="right"
          label="流程进度"
          prop="applyNo"
          width="100"
        >
          <template slot-scope="scope">
            <el-link
              style="color: #409eff"
              class="margin-right-10"
              type="primary"
              @click.native.prevent="showPlanPicture(scope)"
              >进度流程图</el-link
            >
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120" fixed="right">
          <template v-slot="{ row }">
            <el-link type="primary" @click="toExamine(row)">审核</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #pagination>
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
    </template>
    <!-- dialog -->
    <ih-dialog :show="prodialogVisible">
      <Progress
        :data="rogressData"
        @cancel="() => (prodialogVisible = false)"
      />
    </ih-dialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import { post_refundApply_getCheckList } from "../../../api/finance/index";
import Progress from "./dialog/progress.vue";
@Component({
  components: { Progress },
  mixins: [PaginationMixin],
})
export default class RefundToExamineList extends Vue {
  queryPageParameters: any = {
    beginTime: null,
    endTime: null,
    inputUser: null,
    orgId: null,
    payType: null,
    refundApplyNo: null,
    settlementType: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  prodialogVisible = false;
  rogressData = [];

  private tableData: any = null;

  expiresTimeChange(dateArray: any) {
    if (dateArray) {
      this.queryPageParameters.beginTime = dateArray[0];
      this.queryPageParameters.endTime = dateArray[1];
    } else {
      this.queryPageParameters.beginTime = null;
      this.queryPageParameters.endTime = null;
    }
  }
  private tabChange() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  private reset() {
    Object.assign(this.queryPageParameters, {
      beginTime: null,
      endTime: null,
      inputUser: null,
      orgId: null,
      payType: null,
      refundApplyNo: null,
      settlementType: null,
    });
  }
 
  async getListMixin() {
    this.resPageInfo = await post_refundApply_getCheckList(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
  toExamine(row: any) {
    this.$router.push({
      path: "/refundToExamine/toExamine",
      query: { id: row.id },
    });
  }
  async showPlanPicture(scope: any) {
    console.log(scope);
    this.rogressData = [];
    this.prodialogVisible = true;
  }
}
</script>
