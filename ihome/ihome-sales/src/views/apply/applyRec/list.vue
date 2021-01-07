<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 10:29:38
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-07 16:16:36
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="请款申请单号">
              <el-input
                v-model="queryPageParameters.applyNo"
                placeholder="请输入请款申请单号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
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
            <el-form-item label="发票类型">
              <el-select
                v-model="queryPageParameters.billTypeCode"
                placeholder="请选择发票类型"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceType')"
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
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                placeholder="请选择状态"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('ApplySatus')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
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
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button type="success">发起请佣申请</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button>导出</el-button>
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
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          label="请款申请"
          prop="applyNo"
          width="185"
          fixed
        ></el-table-column>
        <el-table-column
          label="甲方公司名称"
          prop="developName"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="请款金额"
          prop="applyMoney"
        ></el-table-column>
        <el-table-column
          label="扣除金额"
          prop="subMoney"
        ></el-table-column>
        <el-table-column
          label="实际请款金额"
          prop="actMoneyTax"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="发票类型"
          prop="billTypeCode"
          width="175"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.billTypeCode, 'InvoiceType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="申请时间"
          prop="applyTime"
          width="155"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="applyUserName"
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="185"
        >
          <template v-slot="{row}">
            <span>{{$root.dictAllName(row.status, 'ApplySatus')}}</span>
            <el-tag
              v-if="row.isReject"
              effect="plain"
              type="danger"
              size="mini"
              class="margin-left-10"
            >驳回</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间"
          prop="auditTime"
          width="155"
        ></el-table-column>
        <el-table-column
          label="流程进度"
          width="120"
        >
          <template v-slot="{  }">
            <el-link type="primary">流程进度图</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="120"
        >
          <template v-slot="{ row }">
            <el-link
              type="success"
              v-if="row.status === 'Draft' || row.status === 'BusinessDepart'"
            >编辑</el-link>
            <el-link
              type="primary"
              v-else-if="row.status === 'InvoiceApply'"
            >发起开票申请</el-link>
            <el-link
              type="primary"
              v-else
            >查看</el-link>
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
import { post_applyRec_getList } from "../../../api/apply/index";

@Component({
  mixins: [PaginationMixin],
})
export default class ApplyRecList extends Vue {
  queryPageParameters: any = {
    applyNo: null,
    applyTimeEnd: null,
    applyTimeStart: null,
    billTypeCode: null,
    developName: null,
    status: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private timeList: any = [];

  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.applyTimeStart = flag ? this.timeList[0] : null;
    this.queryPageParameters.applyTimeEnd = flag ? this.timeList[1] : null;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      applyNo: null,
      applyTimeEnd: null,
      applyTimeStart: null,
      billTypeCode: null,
      developName: null,
      status: null,
    });
    this.timeList = [];
  }
  async getListMixin() {
    this.resPageInfo = await post_applyRec_getList(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
</script>
