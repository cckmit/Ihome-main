<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-05 16:41:19
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-06 16:47:08
-->
 
<template>
  <ih-page labelWidth="120px">
    <template v-slot:form>
      <el-form ref="form" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="退款申请单编号">
              <el-input
                v-model="queryPageParameters.refundApplyNo"
                placeholder="收款姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方">
              <IhSelectPageByProject
                v-model="queryPageParameters.proId"
                clearable
                :props="{
                  value: 'proId',
                  key: 'proId',
                  lable: 'proName',
                }"
              ></IhSelectPageByProject>
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
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="退款状态"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('FinRefundApplyStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单人">
              <el-input
                v-model="queryPageParameters.inputUser"
                placeholder="制单人"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="getListMixin()">查询</el-button>
        <el-button type="success" @click="download()">导出</el-button>

        <el-button type="info" @click="add()">发起申请</el-button>
        <el-button type="info" @click="batchRemove()">批量删除</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
        :empty-text="emptyText"
      >
        <el-table-column fixed type="selection" width="50" align="center">
        </el-table-column>

        <el-table-column
          fixed
          prop="refundApplyNo"
          label="退款申请单编号"
          width="180"
        ></el-table-column>

        <el-table-column prop="projectName" label="事业部">
          <template slot-scope="scope">
            {{ scope.row.departmentName }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="申请退款金额" width="120">
          <template slot-scope="scope">
            {{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="状态"
          width="100"
        ></el-table-column>
        <el-table-column prop="status" label="退款状态">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.status, "FinRefundApplyStatus")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="accountName"
          width="100"
          label="付款方"
        ></el-table-column>
        <el-table-column prop="inputUserName" label="制单人" width="100">
          <template slot-scope="scope">{{ scope.row.inputUserName }}</template>
        </el-table-column>
        <el-table-column prop="createDate" label="制单日期" width="100">
        </el-table-column>
        <el-table-column width="200" label="流程进度" fixed="right">
          <template>
            <el-link
              style="color: #409eff"
              class="margin-right-10"
              type="primary"
              @click.native.prevent="info(scope)"
              >进度流程图</el-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="contType" label="操作" width="120" fixed="right">
          <template slot-scope="scope">
            <el-link
              style="color: #409eff"
              class="margin-right-10"
              type="primary"
              @click.native.prevent="info(scope)"
              >详情</el-link
            >
            <el-link
              style="color: #409eff"
              class="margin-right-10"
              type="primary"
              @click.native.prevent="edit(scope)"
              >修改</el-link
            >
            <el-link
              style="color: #409eff"
              class="margin-right-10"
              type="primary"
              @click.native.prevent="withdraw(scope)"
              >撤回</el-link
            >
            <el-link
              style="color: #409eff"
              class="margin-right-10"
              type="primary"
              @click.native.prevent="remove(scope)"
              >删除</el-link
            >
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
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import {
  post_refundApply_getList,
  post_refundApply_revoke__id,
  post_refundApply_delete__id,
} from "../../../api/finance/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
  filters: {
    emptyShow(data: any) {
      if (data === "" || data === null) {
        return "——";
      } else {
        return data;
      }
    },
  },
})
export default class RefundApplyList extends Vue {
  constructor() {
    super();
    console.log("constructor");
  }
  removeList: any[] = [];
  queryPageParameters: any = {
    accountId: null,
    beginTime: null,
    endTime: null,
    inputUser: null,
    orgId: null,
    payType: null,
    refundApplyNo: null,
    status: null,
  };
  toVoidList: any = [];
  createUserList: any = []; //创建人列表
  divisionList: any = []; //事业部列表

  resPageInfo: any = {
    total: null,
    list: [],
  };

  async getListMixin() {
    this.resPageInfo = await post_refundApply_getList(this.queryPageParameters);
  }

  async created() {
    console.log("created");
    this.getListMixin();
  }

  async mounted() {
    console.log("mounted");
  }
  handleSelectionChange(val: any) {
    this.removeList = val;
  }
  gotoNew(item: any, type: string) {
    if (type == "projectName") {
      window.open(
        `/web-sales/projects/childInfo?id=${item.proId}&proName=${item.projectName}`
      );
    } else if (type == "noticeAmount") {
      console.error("未实现");
    } else if (type == "refundApplyNO") {
      console.error("未实现");
    } else if (type == "dealNo") {
      window.open(`/web-sales/dealReport/info?id=${item.dealNo}&type=ID`);
    } else if (type == "invoiceNo") {
      window.open(`/web-sales/invoice/info?id=${item.invoiceNo}`);
    }
  }

  expiresTimeChange(dateArray: any) {
    if (dateArray) {
      this.queryPageParameters.beginTime = dateArray[0];
      this.queryPageParameters.endTime = dateArray[1];
    } else {
      this.queryPageParameters.beginTime = null;
      this.queryPageParameters.endTime = null;
    }
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      accountId: null,
      beginTime: null,
      endTime: null,
      inputUser: null,
      orgId: null,
      payType: null,
      refundApplyNo: null,
      status: null,
    });
  }

  async download() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/finance/refundApply/exportData`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: this.queryPageParameters,
    }).then((res: any) => {
      const arr = new Blob([res.data], { type: "application/vnd.ms-excel" });
      const href = window.URL.createObjectURL(arr);
      window.open(href);
    });
  }
  info(scope: any) {
    this.$router.push({
      path: "/refundApply/info",
      query: { id: scope.row.id },
    });
  }
  edit(scope: any) {
    this.$router.push({
      path: "/refundApply/add",
      query: { id: scope.row.id },
    });
  }
  add() {
    this.$router.push({
      path: "/refundApply/add",
    });
  }
  async withdraw(scope: any) {
    try {
      await this.$confirm("是否确定撤回?", "提示");
      await post_refundApply_revoke__id({
        id: scope.row.id,
      });
      this.$message({
        type: "success",
        message: "撤回成功!",
      });
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_refundApply_delete__id({
        id: scope.row.id,
      });
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  async batchRemove() {
    console.log(this.removeList);
    let postData = this.removeList.map((item: any) => {
      return item.id;
    });
    console.log(postData);
    if (postData && postData.length > 0) {
      try {
        await this.$confirm("是否确定删除已勾选?", "提示");
        await post_refundApply_delete__id(postData);
        this.$message.success("删除成功");
        this.getListMixin();
      } catch (error) {
        console.log(error);
      }
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
}
</script>
<style lang="scss" scoped>
</style>