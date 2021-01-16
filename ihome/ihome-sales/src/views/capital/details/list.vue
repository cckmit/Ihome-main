<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-01-14 21:55:30
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-15 07:50:50
-->
<template>
  <IhPage label-width="120px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="明细类型">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.detailsType"
                @change="changeDetailsType"
                placeholder="请选择">
                <el-option label="全部" value="All"></el-option>
                <el-option label="产生明细" value="produce"></el-option>
                <el-option label="使用明细" value="use"></el-option>
              </el-select>
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
          <el-col :span="8">
            <el-form-item label="记录时间">
              <el-date-picker
                style="width: 100%"
                v-model="queryPageParameters.timeList"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="到"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="queryPageParameters.detailsType === 'produce'">
            <el-form-item label="产生类别">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.produceType"
                clearable
                placeholder="请选择">
                <el-option label="服务费盈余" value="服务费盈余"></el-option>
                <el-option label="成交变更" value="成交变更"></el-option>
                <el-option label="成交退款" value="成交退款"></el-option>
                <el-option label="成交补充" value="成交补充"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="queryPageParameters.detailsType === 'use'">
            <el-form-item label="使用类别">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.useType"
                clearable
                placeholder="请选择">
                <el-option label="同周期使用" value="同周期使用"></el-option>
                <el-option label="跨周期" value="跨周期"></el-option>
                <el-option label="跨项目" value="跨项目"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button type="success">导出</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText">
        <el-table-column label="成交报告编号" prop="dealCode" fixed min-width="220"></el-table-column>
        <el-table-column label="成交周期" prop="termName" min-width="180"></el-table-column>
        <el-table-column label="周期所属项目" prop="proName" min-width="180"></el-table-column>
        <el-table-column label="周期所属店组" prop="shopGroup" min-width="180"></el-table-column>
        <el-table-column label="周期所属事业部" prop="departmentName" min-width="200"></el-table-column>
        <el-table-column
          v-if="queryPageParameters.detailsType === 'All'"
          label="产生/使用其他渠道费金额" prop="postAmount" min-width="200"></el-table-column>
        <el-table-column
          v-if="queryPageParameters.detailsType === 'produce'"
          label="产生其他渠道费金额" prop="postAmount" min-width="200"></el-table-column>
        <el-table-column
          v-if="queryPageParameters.detailsType === 'produce'"
          label="产生类别" prop="postCategory" min-width="200"></el-table-column>
        <el-table-column
          v-if="queryPageParameters.detailsType === 'use'"
          label="使用其他渠道费金额" prop="postAmount" min-width="200"></el-table-column>
        <el-table-column
          v-if="queryPageParameters.detailsType === 'use'"
          label="使用类别" prop="postCategory" min-width="200"></el-table-column>
        <el-table-column
          v-if="queryPageParameters.detailsType === 'use'"
          label="使用的其他渠道费用归属周期" prop="otherTermName" min-width="300"></el-table-column>
        <el-table-column
          v-if="queryPageParameters.detailsType === 'use'"
          label="使用的其他渠道费用归属项目" prop="otherProName" min-width="300"></el-table-column>
        <el-table-column label="记录时间" prop="createTime" min-width="150"></el-table-column>
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
  post_capitalPoolFlow_detail
} from "@/api/project/index";
import PaginationMixin from "../../../mixins/pagination";
import axios from "axios";
import {getToken} from "ihome-common/util/cookies";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class DetailsList extends Vue {
  queryPageParameters: any = {
    detailsType: 'All',
    proId: null,
    termId: null,
    timeList: [],
    produceType: null,
    useType: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };

  async created() {
    await this.getListMixin();
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
    let postData: any = {
      createTimeBegin: this.queryPageParameters.timeList.length ? this.queryPageParameters.timeList[0] : null,
      createTimeEnd: this.queryPageParameters.timeList.length ? this.queryPageParameters.timeList[1] : null,
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
      postCategory: null, // 产生类别 服务费盈余、成交变更、成交退款、其它 使用类别 (同周期使用)Samecycle、(跨周期)Interycle、(跨项目)Interproject
      proName: this.queryPageParameters.pr, // 项目名称
      termName: this.queryPageParameters.cycleId, // 周期名称
      type: 0 // 类别 1:产生 2:使用
    }
    switch (this.queryPageParameters.detailsType) {
      case "All":
        postData.postCategory = '';
        postData.type = null;
        break;
      case "produce":
        // 产生
        postData.postCategory = this.queryPageParameters.produceType;
        postData.type = 1;
        break;
      case "use":
        // 产生
        postData.postCategory = this.queryPageParameters.useType;
        postData.type = 2;
        break;
    }
    this.resPageInfo = await post_capitalPoolFlow_detail(postData);
  }

  // 改变细节类型
  changeDetailsType(value: any) {
    console.log(value);
    this.queryPageParameters.pageNum = 1;
    this.queryPageParameters.produceType = null;
    this.queryPageParameters.useType = null;
    Object.assign(this.queryPageParameters, {
      proId: null,
      termId: null,
      timeList: [],
      produceType: null,
      useType: null,
    });
    this.getListMixin();
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      detailsType: 'All',
      proId: null,
      termId: null,
      timeList: [],
      produceType: null,
      useType: null,
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