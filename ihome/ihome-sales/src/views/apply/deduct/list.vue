<!--
 * @Description: 抵扣项费用明细
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-12 19:30:20
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-13 14:32:00
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="甲方公司名称">
              <el-input
                v-model="queryPageParameters.developName"
                placeholder="请输入甲方公司名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交报告编号">
              <el-input
                v-model="queryPageParameters.suppDealCode"
                placeholder="请输入成交报告编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="冲正单号">
              <el-input
                v-model="queryPageParameters.correctNo"
                placeholder="请输入冲正单号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="冲正状态">
              <el-select
                v-model="queryPageParameters.correctStatus"
                placeholder="请选择冲正状态"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('CorrectStatus')"
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
                v-model="queryPageParameters.correctType"
                placeholder="请选择冲正类型"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('CorrectType')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="冲正时间">
              <el-date-picker
                style="width:100%;"
                v-model="correctTime"
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
          label="甲方公司名称"
          prop="developName"
          min-width="215"
          fixed
        ></el-table-column>
        <el-table-column
          label="成交报告编号"
          min-width="155"
          fixed
        >
          <template v-slot="{ row }">
            <el-link type="primary">{{row.suppDealCode}}</el-link>
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
            {{$root.dictAllName(row.suppContType, 'SuppContType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="冲正状态"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.correctStatus, 'CorrectStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          label="冲正类型"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.correctType, 'CorrectType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="已请款金额"
          min-width="125"
          prop="applyMoneyGet"
        ></el-table-column>
        <el-table-column
          label="变更后应请款金额"
          min-width="165"
          prop="apllyMoneyShouldNew"
        ></el-table-column>
        <el-table-column
          label="产生抵扣项费用金额"
          min-width="165"
          prop="subMoney"
        ></el-table-column>
        <el-table-column
          label="产生时间"
          min-width="165"
          prop="cteationTime"
        ></el-table-column>
        <el-table-column
          label="冲正时间"
          min-width="165"
          prop="correctTime"
        >
          <template v-slot="{ row }">
            <span v-if="row.correctTime">{{row.correctTime}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column
          label="冲正单号"
          min-width="195"
          prop="correctNo"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              v-if="row.correctNo"
            >{{row.correctNo}}</el-link>
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
import { post_devDeductDetail_getList } from "../../../api/apply/index";

@Component({
  mixins: [PaginationMixin],
})
export default class DeductList extends Vue {
  queryPageParameters: any = {
    correctNo: null,
    correctStatus: null,
    correctTimeEnd: null,
    correctTimeStart: null,
    correctType: null,
    cteationTimeEnd: null,
    cteationTimeStart: null,
    developId: null,
    developName: null,
    suppDealCode: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private cteationTime: any = [];
  private correctTime: any = [];

  private search() {
    let flag = this.cteationTime && this.cteationTime.length;
    let flag2 = this.correctTime && this.correctTime.length;
    this.queryPageParameters.cteationTimeStart = flag
      ? this.cteationTime[0]
      : null;
    this.queryPageParameters.cteationTimeEnd = flag
      ? this.cteationTime[1]
      : null;
    this.queryPageParameters.correctTimeStart = flag2
      ? this.correctTime[0]
      : null;
    this.queryPageParameters.correctTimeEnd = flag2
      ? this.correctTime[1]
      : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      correctNo: null,
      correctStatus: null,
      correctTimeEnd: null,
      correctTimeStart: null,
      correctType: null,
      cteationTimeEnd: null,
      cteationTimeStart: null,
      developId: null,
      developName: null,
      suppDealCode: null,
    });
    this.cteationTime = [];
    this.correctTime = [];
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
    this.resPageInfo = await post_devDeductDetail_getList(
      this.queryPageParameters
    );
  }

  created() {
    let paramsJson: any = sessionStorage.getItem("deductParams");
    let params = JSON.parse(paramsJson);
    if (params && params.developName) {
      this.queryPageParameters.developName = params.developName;
    }
    this.getListMixin();
  }
  destroyed() {
    sessionStorage.removeItem("deductParams");
  }
}
</script>
