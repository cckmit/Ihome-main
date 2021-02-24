<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-01-14 21:55:30
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-26 08:36:26
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
                :searchName="termName"
                @change="changeTerm"
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
          <el-col :span="8" v-if="currentTabsName === 'produce'">
            <el-form-item label="产生类别">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.produceType"
                clearable
                placeholder="请选择">
                <el-option
                  v-for="item in $root.dictAllList('PoolOperaAddCategory')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="currentTabsName === 'use'">
            <el-form-item label="使用类别">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.useType"
                clearable
                placeholder="请选择">
                <el-option
                  v-for="item in $root.dictAllList('PoolOperaUseCategory')"
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
    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button type="success" @click="exportMsg">导出</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br/>
      <el-tabs type="border-card" v-model="currentTabsName" @tab-click="changeTabPane">
        <el-tab-pane label="全部" name="All">
          <el-table
            class="ih-table"
            :data="resPageInfo.list"
            :empty-text="emptyText">
            <el-table-column label="成交报告编号" prop="dealCode" fixed min-width="220">
              <template slot-scope="scope">
                <el-link type="primary" @click="goToDealInfo(scope)">{{scope.row.dealCode}}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="成交周期" prop="termName" min-width="180"></el-table-column>
            <el-table-column label="周期所属项目" prop="proName" min-width="180"></el-table-column>
            <el-table-column label="周期所属店组" prop="shopGroup" min-width="180"></el-table-column>
            <el-table-column label="周期所属事业部" prop="departmentName" min-width="200"></el-table-column>
            <el-table-column label="产生/使用其他渠道费金额" prop="postAmount" min-width="200"></el-table-column>
            <el-table-column label="记录时间" prop="createTime" min-width="150"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="产生明细" name="produce">
          <el-table
            class="ih-table"
            :data="resPageInfo.list"
            :empty-text="emptyText">
            <el-table-column label="成交报告编号" prop="dealCode" fixed min-width="220">
              <template slot-scope="scope">
                <el-link type="primary" @click="goToDealInfo(scope)">{{scope.row.dealCode}}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="成交周期" prop="termName" min-width="180"></el-table-column>
            <el-table-column label="周期所属项目" prop="proName" min-width="180"></el-table-column>
            <el-table-column label="周期所属店组" prop="shopGroup" min-width="180"></el-table-column>
            <el-table-column label="周期所属事业部" prop="departmentName" min-width="200"></el-table-column>
            <el-table-column label="产生其他渠道费金额" prop="postAmount" min-width="200"></el-table-column>
            <el-table-column label="产生类别" prop="postCategory" min-width="200">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.postCategory, 'PoolOperaAddCategory')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="记录时间" prop="createTime" min-width="150"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="使用明细" name="use">
          <el-table
            class="ih-table"
            :data="resPageInfo.list"
            :empty-text="emptyText">
            <el-table-column label="成交报告编号" prop="dealCode" fixed min-width="220">
              <template slot-scope="scope">
                <el-link type="primary" @click="goToDealInfo(scope)">{{scope.row.dealCode}}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="成交周期" prop="termName" min-width="180"></el-table-column>
            <el-table-column label="周期所属项目" prop="proName" min-width="180"></el-table-column>
            <el-table-column label="周期所属店组" prop="shopGroup" min-width="180"></el-table-column>
            <el-table-column label="周期所属事业部" prop="departmentName" min-width="200"></el-table-column>
            <el-table-column label="使用其他渠道费金额" prop="postAmount" min-width="200"></el-table-column>
            <el-table-column label="使用类别" prop="postCategory" min-width="200">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.postCategory, 'PoolOperaUseCategory')}}</div>
              </template>
            </el-table-column>
            <el-table-column label="使用的其他渠道费用归属周期" prop="otherTermName" min-width="300"></el-table-column>
            <el-table-column label="使用的其他渠道费用归属项目" prop="otherProName" min-width="300"></el-table-column>
            <el-table-column label="记录时间" prop="createTime" min-width="150"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="details-sum-wrapper">
        <span>{{detailsSum.desc}}：</span>
        <span class="total-color">{{detailsSum.totalAmount}}</span>元
      </div>
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
  get_term_getName__termId, // 获取周期名称
  post_capitalPoolFlow_detail, // 其它渠道费用明细
  post_capitalPoolFlow_detailsum // 其它渠道费用明细-汇总
} from "@/api/project/index";
import PaginationMixin from "../../../mixins/pagination";
import axios from "axios";
import {getToken} from "ihome-common/util/cookies";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class DetailsList extends Vue {
  currentTabsName: any = 'All';
  queryPageParameters: any = {
    proId: null,
    termId: null,
    timeList: [],
    produceType: null,
    useType: null,
  };
  termName: any = '';
  resPageInfo: any = {
    total: null,
    list: [],
  };
  detailsSum: any = {
    desc: null,
    totalAmount: 0,
  }; // 汇总

  async created() {
    let termId: any = this.$route.query.termId;
    if (termId) {
      this.$nextTick(async () => {
        this.queryPageParameters.termId = termId  * 1;
        await this.getTermName(termId);
        await this.getListMixin();
      })
    } else {
      this.termName = '';
      await this.getListMixin();
    }
    // await this.getListMixin();
  }

  // 导出
  async exportMsg() {
    let postData: any = await this.getPostData('export');
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/project/capitalPoolFlow/exportdetail`,
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
      $a.download = "其他渠道费明细表格.xlsx";
      $a.click();
      $a.remove();
    });
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async getListMixin() {
    let postData: any = await this.getPostData();
    this.resPageInfo = await post_capitalPoolFlow_detail(postData);
    this.detailsSum = await post_capitalPoolFlow_detailsum(postData);
    // console.log(this.detailsSum);
  }

  // 获取周期名称
  async getTermName(termId: any = '') {
    let name = await get_term_getName__termId({termId: termId});
    this.termName = name ? name : '';
    console.log(name);
  }

  // 改变
  changeTerm(value: any) {
    console.log(value);
    this.termName = '';
  }

  // 获取请求参数
  getPostData(type: any = '') {
    let postData: any = {
      createTimeBegin: this.queryPageParameters.timeList.length ? this.queryPageParameters.timeList[0] : null,
      createTimeEnd: this.queryPageParameters.timeList.length ? this.queryPageParameters.timeList[1] : null,
      pageNum: type ? null : this.queryPageParameters.pageNum,
      pageSize: type ? null : this.queryPageParameters.pageSize,
      postCategory: null, // 产生类别 服务费盈余、成交变更、成交退款、其它 使用类别 (同周期使用)Samecycle、(跨周期)Interycle、(跨项目)Interproject
      proId: this.queryPageParameters.proId, // 项目名称
      termId: this.queryPageParameters.termId, // 周期名称
      type: 0 // 类别 1:产生 2:使用
    }
    switch (this.currentTabsName) {
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
    return postData;
  }

  // 改变tabs
  changeTabPane() {
    // console.log(value.name);
    this.queryPageParameters.pageNum = 1;
    this.queryPageParameters.produceType = null;
    this.queryPageParameters.useType = null;
    Object.assign(this.queryPageParameters, {
      produceType: null,
      useType: null,
    });
    this.getListMixin();
  }

  reset() {
    this.termName = '';
    Object.assign(this.queryPageParameters, {
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

  // 查看成交详情
  goToDealInfo(scope: any) {
    if (scope.row.dealCode) {
      this.$router.push({
        path: "/dealReport/info",
        query: {
          id: scope.row.dealCode,
          type: "CODE"
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.details-sum-wrapper {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  font-size: 15px;
  margin-top: 10px;

  .total-color {
    color: red;
    display: inline-block;
    padding-right: 5px;
  }
}
</style>