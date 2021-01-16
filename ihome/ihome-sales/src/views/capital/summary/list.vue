<!--
 * @Description:
 * @version:
 * @Author: lsj
 * @Date: 2021-01-15 07:53:15
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-15 07:57:25
-->
<template>
  <IhPage label-width="120px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="组织">
              <SelectOrganizationTree
                :orgId="queryPageParameters.organizationId"
                @callback="(id) => (queryPageParameters.organizationId = id)"/>
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
        <el-button type="success">导出</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText">
        <el-table-column label="项目周期名称" prop="termName" fixed min-width="220"></el-table-column>
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
import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";
import {
  post_capitalPoolFlow_summary
} from "@/api/project/index";
import PaginationMixin from "../../../mixins/pagination";
import axios from "axios";
import {getToken} from "ihome-common/util/cookies";

@Component({
  components: {SelectOrganizationTree},
  mixins: [PaginationMixin],
})
export default class SummaryList extends Vue {
  queryPageParameters: any = {
    organizationId: null,
    proId: null,
    termId: null
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
    this.resPageInfo = await post_capitalPoolFlow_summary(
      this.queryPageParameters
    );
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      organizationId: null,
      proId: null,
      termId: null
    });
  }

  routeTo(row: any) {
    console.log(row);
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>