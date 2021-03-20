<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-19 15:23:12
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="85%"
    class="text-left channelLeveLDialog"
    :title="`渠道商等级信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="渠道商名称">
            <IhSelectPageByChannel
              v-model="queryPageParameters.channelId"
              clearable
              placeholder="渠道商名称"
            ></IhSelectPageByChannel>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道等级">
            <el-select
              v-model="queryPageParameters.channelGrade"
              clearable
              placeholder="渠道等级"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ChannelLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市等级">
            <el-select
              v-model="queryPageParameters.cityGrade"
              clearable
              placeholder="城市等级"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('CityLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
            <el-form-item label="业务开展省市">
              <IhCascader
                :level="2"
                v-model="provinceOption"
                clearable
                placeholder="请选择"
                class="width--100"
              />
            </el-form-item>
          </el-col> -->
        <el-col :span="8">
          <el-form-item label="事业部">
            <IhSelectPageDivision v-model="queryPageParameters.departmentOrgId"></IhSelectPageDivision>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="状态"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelGradeStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        <el-col :span="8">
          <el-form-item label="录入人">
            <IhSelectPageUser
              v-model="queryPageParameters.inputUser"
              clearable
            >
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
              </template>
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特批入库">
            <el-select
              v-model="queryPageParameters.special"
              clearable
              placeholder="特批入库"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('YesOrNoType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入库编号">
            <el-input
              clearable
              v-model="queryPageParameters.storageNum"
              placeholder="入库编号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="el-row margin-left-100">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="empty()"
      >重置</el-button>
    </el-row>

    <br />
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      :default-sort="{ prop: 'id', order: 'descending' }"
      @selection-change="handleSelectionChange"
      :empty-text="emptyText"
      :max-height="maxHeight"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed
        prop="storageNum"
        label="入库编号"
        width="180"
      ></el-table-column>
      <el-table-column
        fixed
        prop="channelName"
        label="渠道商名称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="province"
        label="业务开展省份"
        width="120"
      >
        <template v-slot="{ row }">{{
            $root.getAreaName(row.province)
          }}</template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="业务开展城市"
        width="120"
      >
        <template v-slot="{ row }">{{
            $root.getAreaName(row.city)
          }}</template>
      </el-table-column>
      <el-table-column
        prop="cityGrade"
        label="城市等级"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.cityGrade, "CityLevel")
          }}</template>
      </el-table-column>
      <el-table-column
        prop="channelGrade"
        label="渠道等级"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.channelGrade, "ChannelLevel")
          }}</template>
      </el-table-column>
      <el-table-column
        prop="special"
        label="特批入库"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.special, "YesOrNoType")
          }}</template>
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="事业部"
      ></el-table-column>
      <el-table-column
        prop="inputUserName"
        label="录入人"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="125"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.status, "ChannelGradeStatus")
          }}</template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
        :loading="finishLoading"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_channelGrade_getList } from "@/api/channel/index";
import {
  post_customerReportRule_addWXBB,
  post_customerReportRule_busnissManage_addWXBB,
} from "@/api/project/index";
import PaginationMixin from "@/mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  @Prop({ default: null }) data: any;
  queryPageParameters: any = {
    channelId: null,
    channelGrade: null,
    cityGrade: null,
    province: null,
    city: null,
    departmentOrgId: null,
    status: null,
    inputUser: null,
    special: null,
    storageNum: null,
  };
  provinceOption: any = [];
  selection: any = [];
  dialogVisible = true;
  finishLoading = false;
  resPageInfo: any = {
    total: null,
    list: [],
  };

  get maxHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      520 +
      "px";
    return h;
  }

  cancel() {
    this.$emit("cancel");
  }

  search() {
    this.queryPageParameters.province = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  empty() {
    Object.assign(this.queryPageParameters, {
      channelId: null,
      channelGrade: null,
      cityGrade: null,
      province: null,
      city: null,
      departmentOrgId: null,
      status: null,
      inputUser: null,
      special: null,
      storageNum: null,
    });
    this.provinceOption = [];
  }

  update() {
    if (this.selection.length) this.dialogVisible = true;
    else this.$message.warning("请先勾选表格数据");
  }

  created() {
    this.getListMixin();
  }
  //获取数据
  async getListMixin() {
    this.queryPageParameters.city = this.data;
    this.resPageInfo = await post_channelGrade_getList(
      this.queryPageParameters
    );
  }

  handleSelectionChange(val: any) {
    this.selection = val.map((v: any) => ({
      name: v.channelName,
      channelId: v.channelId,
      id: v.id,
    }));
  }

  async finish() {
    if (this.selection.length) {
      let arr: any = [];
      this.selection.forEach((v: any) => {
        arr.push(v.channelId);
      });
      try {
        this.finishLoading = true;
        let obj = {
          status: "PASS",
          channelCompanyId: arr,
          proId: this.$route.query.id,
        };
        if (this.$route.name === "businessManagementEdit") {
          await post_customerReportRule_busnissManage_addWXBB(obj);
        } else {
          await post_customerReportRule_addWXBB(obj);
        }
        this.finishLoading = false;
        this.$emit("finish");
      } catch (err) {
        this.finishLoading = false;
      }
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
}
</script>
<style lang="scss" scoped>
.channelLeveLDialog {
  /deep/ .el-dialog {
    margin-top: 4vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
}
.el-breadcrumb {
  margin-bottom: 20px;
}
.line {
  border-left: solid;
  color: #4cccec;
  padding-left: 7px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
