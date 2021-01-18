<!--
 * @Description:
 * @version:
 * @Author: lsj
 * @Date: 2021-01-15 07:57:55
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-15 08:02:13
-->
<template>
  <IhPage label-width="120px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间类型">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.timeType"
                clearable
                placeholder="请选择">
                <el-option label="当日" value="currentDate"></el-option>
                <el-option label="当月" value="currentMonth"></el-option>
                <el-option label="全年" value="annual"></el-option>
                <el-option label="上一年" value="lastYear"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间范围">
              <el-date-picker
                style="width: 100%"
                v-model="queryPageParameters.timeList"
                type="datetimerange"
                align="left"
                unlink-panels
                range-separator="到"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="currentOptions"
                value-format="yyyy-MM-dd hh:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <!--        <el-button type="info" @click="reset()">重置</el-button>-->
        <el-button type="success">导出</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText">
        <el-table-column label="序号" prop="applyCode" fixed min-width="80"></el-table-column>
        <el-table-column label="组织" prop="agencyName" min-width="150"></el-table-column>
        <el-table-column label="应收业绩(万元)" prop="applyAmount" min-width="450">
          <el-table-column label="总包" prop="province" min-width="150"></el-table-column>
          <el-table-column label="分销" prop="province" min-width="150"></el-table-column>
          <el-table-column label="对外拆佣" prop="province" min-width="150"></el-table-column>
        </el-table-column>
        <el-table-column label="实收业绩(万元)" prop="deductAmount" min-width="450">
          <el-table-column label="总包" prop="province" min-width="150"></el-table-column>
          <el-table-column label="分销" prop="province" min-width="150"></el-table-column>
          <el-table-column label="对外拆佣" prop="province" min-width="150"></el-table-column>
        </el-table-column>
        <el-table-column label="其他渠道费用(万元)" prop="actualAmount" min-width="190"></el-table-column>
        <el-table-column label="总应收(万元)" prop="actualAmount" min-width="190"></el-table-column>
        <el-table-column label="总实收(万元)" prop="actualAmount" min-width="190"></el-table-column>
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
  post_payApply_review_list
} from "@/api/payoff/index";
import PaginationMixin from "../../../mixins/pagination";
import axios from "axios";
import {getToken} from "ihome-common/util/cookies";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ReportList extends Vue {
  queryPageParameters: any = {
    timeType: 'currentDate',
    timeList: []
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };

  async created() {
    // await this.getListMixin();
  }

  // 导出
  async exportMsg() {
    let arr: any = this.resPageInfo.list.map((v: any) => v.id);
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/payoff/file/excel/list`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: arr,
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "审核付款申请列表.xlsx";
      $a.click();
      $a.remove();
    });
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async getListMixin() {
    this.resPageInfo = await post_payApply_review_list(
      this.queryPageParameters
    );
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      timeType: 'currentDate',
      timeList: []
    });
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>