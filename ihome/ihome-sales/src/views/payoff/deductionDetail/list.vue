<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-13 14:44:01
 * @LastEditors: ywl
 * @LastEditTime: 2021-05-14 17:20:11
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司类型">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.companyKind"
                clearable
                placeholder="请选择"
                @change="() => { queryPageParameters.agencyId = null}"
              >
                <el-option
                  v-for="item in $root.dictAllList('CompanyKind')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司名称">
              <IhSelectPageByChannel
                clearable
                v-if="queryPageParameters.companyKind === 'ChannelCompany'"
                placeholder="请选择渠道商"
                v-model="queryPageParameters.agencyId"
              ></IhSelectPageByChannel>
              <IhSelectPageByCompany
                clearable
                v-else-if="queryPageParameters.companyKind === 'InfieldCompany'"
                placeholder="请选择内部公司"
                v-model="queryPageParameters.agencyId"
              ></IhSelectPageByCompany>
              <IhSelectPageByAgency
                clearable
                v-else-if="queryPageParameters.companyKind === 'AgencyCompany'"
                placeholder="请选择代理公司"
                v-model="queryPageParameters.agencyId"
              ></IhSelectPageByAgency>
              <el-input
                disabled
                v-else
                placeholder="请先选择公司类型"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交报告编号">
              <el-input
                v-model="queryPageParameters.dealCode"
                placeholder="请输入成交报告编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="冲正单号">
              <el-input
                v-model="queryPageParameters.deductionNo"
                placeholder="请输入冲正单号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="冲正状态">
              <el-select
                v-model="queryPageParameters.status"
                placeholder="请选择冲正状态"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('DeductStatus')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="冲正类型">
              <el-select
                v-model="queryPageParameters.type"
                placeholder="请选择冲正类型"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('DeductType')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="产生时间">
              <el-date-picker
                style="width:100%;"
                v-model="cteationTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="冲正时间">
              <el-date-picker
                style="width:100%;"
                v-model="deductionTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list"
      >
        <el-table-column
          label="序号"
          type="index"
          :index="typeIndex"
          width="50"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column
          label="渠道公司名称"
          prop="agencyName"
          min-width="215"
          fixed
        ></el-table-column>
        <el-table-column
          label="成交报告编号"
          min-width="175"
          fixed
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="gotoDealCode(row.dealId)"
            >{{row.dealCode}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="合同类型"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.contType, 'ContType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="抵扣项类别"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.deductType, 'SuppContType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="冲正状态"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.status, 'DeductStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          label="冲正类型"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.type, 'DeductType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="已结佣金额(元)"
          min-width="125"
          prop="paidAmount"
        ></el-table-column>
        <el-table-column
          label="变更后应结佣金额(元)"
          min-width="165"
          prop="amount"
        ></el-table-column>
        <el-table-column
          label="产生抵扣项费用金额(元)"
          min-width="175"
          prop="deductionAmount"
        ></el-table-column>
        <el-table-column
          label="产生时间"
          min-width="165"
          prop="generateTime"
        ></el-table-column>
        <el-table-column
          label="冲正时间"
          min-width="165"
          prop="deductTime"
        >
          <template v-slot="{ row }">
            <span v-if="row.deductTime">{{row.deductTime}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="冲正单号"
          min-width="195"
          prop="deductionNo"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              v-if="row.deductionNo"
              @click="gotoDeduction(row.applyId)"
            >{{row.deductionNo}}</el-link>
            <span v-else>--</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
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
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import { post_payDeductDetail_getPayDeductDetailList } from "@/api/payoff/index";

@Component({
  mixins: [PaginationMixin],
})
export default class DeductList extends Vue {
  queryPageParameters: any = {
    deductionNo: null,
    status: null,
    deductionBeginTime: null,
    deductionEndTime: null,
    type: null,
    generateBeginTime: null,
    generateEndTime: null,
    agencyName: null,
    dealCode: null,
    companyKind: null,
    agencyId: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private cteationTime: any = [];
  private deductionTime: any = [];

  private search() {
    let flag = this.cteationTime && this.cteationTime.length;
    let flag2 = this.deductionTime && this.deductionTime.length;
    this.queryPageParameters.generateBeginTime = flag
      ? this.cteationTime[0]
      : null;
    this.queryPageParameters.generateEndTime = flag
      ? this.cteationTime[1]
      : null;
    this.queryPageParameters.deductionBeginTime = flag2
      ? this.deductionTime[0]
      : null;
    this.queryPageParameters.deductionEndTime = flag2
      ? this.deductionTime[1]
      : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      deductionNo: null,
      status: null,
      deductionBeginTime: null,
      deductionEndTime: null,
      type: null,
      generateBeginTime: null,
      generateEndTime: null,
      agencyName: null,
      dealCode: null,
      companyKind: null,
      agencyId: null,
    });
    this.cteationTime = [];
    this.deductionTime = [];
  }
  private typeIndex(index: number) {
    return (
      (this.queryPageParameters.pageNum - 1) *
        this.queryPageParameters.pageSize +
      index +
      1
    );
  }
  async getListMixin() {
    this.resPageInfo = await post_payDeductDetail_getPayDeductDetailList(
      this.queryPageParameters
    );
  }

  gotoDealCode(id: any) {
    let router = this.$router.resolve({
      path: `/dealReport/info`,
      query: {
        id: id,
        type: "ID",
      },
    });
    window.open(router.href, "_blank");
  }

  gotoDeduction(id: any) {
    let router = this.$router.resolve({
      path: `/payorder/info`,
      query: {
        id: id,
      },
    });
    window.open(router.href, "_blank");
  }

  created() {
    let paramsJson: any = sessionStorage.getItem("deductionDetailParams");
    let params = JSON.parse(paramsJson);
    if (params && params.agencyName) {
      this.queryPageParameters.agencyName = params.agencyName;
    }
    this.getListMixin();
  }
  destroyed() {
    sessionStorage.removeItem("deductionDetailParams");
  }
}
</script>