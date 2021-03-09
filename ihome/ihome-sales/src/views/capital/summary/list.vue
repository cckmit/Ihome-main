<!--
 * @Description:
 * @version:
 * @Author: lsj
 * @Date: 2021-01-15 07:53:15
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-26 08:55:13
-->
<template>
  <IhPage label-width="120px">
    <template v-slot:form>
      <el-form
        ref="form"
        @submit.native.prevent
        label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="组织">
              <IhSelectOrgTree
                v-model="queryPageParameters.org"
              ></IhSelectOrgTree>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <IhSelectPageByProject
                v-model="queryPageParameters.proId"
                placeholder="请选择项目名称"
                clearable
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="周期名称">
              <IhSelectPageByCycle
                v-model="queryPageParameters.termId"
                placeholder="请选择周期名称"
                clearable
              ></IhSelectPageByCycle>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button type="success" @click="exportMsg">导出</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table"
        show-summary
        :summary-method="getSummaries"
        :data="resPageInfo.list"
        :empty-text="emptyText">
        <el-table-column label="项目周期名称" prop="termName" fixed min-width="300"></el-table-column>
        <el-table-column label="周期所属项目" prop="proName" min-width="200"></el-table-column>
        <el-table-column label="周期所属事业部" prop="departmentName" min-width="200"></el-table-column>
        <el-table-column label="产生其他渠道费(元)" prop="addAmount" min-width="200"></el-table-column>
        <el-table-column label="已使用其他渠道费(元)" prop="useAmount" min-width="200"></el-table-column>
        <el-table-column label="剩余其他渠道费(元)" prop="amount" min-width="200"></el-table-column>
        <el-table-column label="操作" fixed="right" width="110" align="center">
          <template v-slot="{ row }">
            <el-link type="primary" @click.native.prevent="routeTo(row)">查看明细</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
      <br/>
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
import {Component, Vue} from "vue-property-decorator";
import {
  post_capitalPoolFlow_summary, // 其它渠道费用汇总
  post_capitalPoolFlow_summarysum, // 其它渠道费用汇总-合计
} from "@/api/project/index";
import PaginationMixin from "../../../mixins/pagination";
import axios from "axios";
import {getToken} from "ihome-common/util/cookies";

@Component({
  mixins: [PaginationMixin],
})
export default class SummaryList extends Vue {
  queryPageParameters: any = {
    org: null,
    proId: null,
    termId: null
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  totalSum: any = {
    addAmount: null,
    useAmount: null,
    amount: null
  };

  async created() {
    await this.getListMixin();
  }

  private getSummaries(param: any) {
    const { columns } = param;
    const sums: any = [];
    columns.forEach((i: any, n: number) => {
      if (n === 0) {
        sums[n] = "合计";
        return;
      }
      if (n === 3) {
        sums[n] = this.totalSum.addAmount || 0;
      }
      if (n === 4) {
        sums[n] = this.totalSum.useAmount || 0;
      }
      if (n === 5) {
        sums[n] = this.totalSum.amount || 0;
      }
    });
    return sums;
  }

  // 导出
  async exportMsg() {
    let postData: any = {
      org: this.queryPageParameters.org,
      proId: this.queryPageParameters.proId,
      termId: this.queryPageParameters.termId,
    }
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/project/capitalPoolFlow/exportsummary`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: postData,
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "其他渠道费用汇总表格.xlsx";
      $a.click();
      $a.remove();
    });
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async getListMixin() {
    this.resPageInfo = await post_capitalPoolFlow_summary(this.queryPageParameters);
    let totalObj: any = await post_capitalPoolFlow_summarysum(this.queryPageParameters);
    this.totalSum = totalObj;
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      org: null,
      proId: null,
      termId: null
    });
  }

  routeTo(row: any) {
    console.log(row);
    let router = this.$router.resolve({
      path: "/details/list",
      query: {
        termId: row.termId,
      },
    });
    window.open(router.href, "_blank");
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
.color-red {
  color: red;
}
</style>