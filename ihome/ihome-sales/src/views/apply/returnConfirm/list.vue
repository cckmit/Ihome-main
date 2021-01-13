<!--
 * @Description: 回款登记确认
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-13 14:50:21
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-13 18:02:22
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
                v-model="queryPageParameters.applyNo"
                placeholder="请输入甲方公司名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类型">
              <el-input
                v-model="queryPageParameters.applyNo"
                placeholder="请选择发票类型"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input
                v-model="queryPageParameters.applyNo"
                placeholder="请选择项目名称"
                clearable
              ></el-input>
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
    <template #btn>
      <el-row>
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button>批量添加回款</el-button>
      </el-row>
    </template>
    <template #table>
      <br />
      <!-- table-标签页 -->
      <el-tabs
        v-model="queryPageParameters.status"
        type="border-card"
      >
        <template v-for="(i, n) in tabsList">
          <el-tab-pane
            :label="i.label"
            :name="i.name"
            :key="n"
          >
            <!-- table-content -->
            <el-table
              class="ih-table"
              :empty-text="emptyText"
              :data="resPageInfo.list"
            >
              <el-table-column
                v-if="i.name === 'Confirm'"
                type="selection"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                label="请款申请单号"
                prop="applyNo"
                width="185"
                fixed
              ></el-table-column>
              <el-table-column
                label="项目名称"
                prop="applyNo"
              ></el-table-column>
              <el-table-column
                label="甲方公司名称"
                prop="developName"
                min-width="215"
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
                label="扣罚金额"
                prop="fineMoney"
              ></el-table-column>
              <el-table-column
                label="实际请款金额"
                prop="actMoneyTax"
                width="135"
              ></el-table-column>
              <el-table-column
                label="回款信息"
                prop="applyNo"
              >
                <template v-slot="{ row }">
                  <div>应回款：{{row.shuoldReceMoney}}</div>
                  <div>已回款：{{row.receMoney}}</div>
                  <div>未回款：{{row.noReceMoney}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="申请人"
                prop="applyUserName"
              ></el-table-column>
              <el-table-column
                label="申请日期"
                prop="applyTime"
                width="165"
              ></el-table-column>
              <el-table-column
                label="审核日期"
                prop="auditTime"
                width="165"
              ></el-table-column>
              <el-table-column
                label="回款状态"
                prop="status"
              ></el-table-column>
              <el-table-column
                v-if="i.name !== 'Confirm'"
                label="回款确认人"
                prop="receiveUserName"
                min-width="165"
              ></el-table-column>
              <el-table-column
                v-if="i.name !== 'Confirm'"
                label="回款日期"
                prop="receiveTime"
                width="165"
              ></el-table-column>
              <el-table-column
                label="操作"
                width="120"
                fixed="right"
              >
                <template v-slot="{  }">
                  <el-link type="primary">查看</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
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
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import { post_receConfirmDetail_getList } from "../../../api/apply/index";

@Component({
  mixins: [PaginationMixin],
})
export default class ReturnConfirmList extends Vue {
  queryPageParameters: any = {
    applyNo: null,
    applyTimeEnd: null,
    applyTimeStart: null,
    billTypeCode: null,
    developName: null,
    status: "Confirm",
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private timeList: any = [];
  private tabsList: any = [
    {
      label: "回款待确认",
      name: "Confirm",
    },
    {
      label: "回款已确认",
      name: "Complete",
    },
    {
      label: "全部",
      name: "",
    },
  ];

  async getListMixin() {
    this.resPageInfo = await post_receConfirmDetail_getList(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
}
</script>
