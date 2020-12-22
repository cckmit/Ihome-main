<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 16:27:36
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-22 18:54:49
-->
<template>
  <IhPage label-width="80px">
    <!-- 搜索 -->
    <template #form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="编号">
              <el-input
                v-model="queryPageParameters.noticeNo"
                clearable
                placeholder="请输入编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型">
              <el-select
                v-model="queryPageParameters.notificationTypes"
                placeholder="请选择类型"
                clearable
                class="width--100"
              >
                <el-option
                  v-for="i in $root.dictAllList('NotificationType')"
                  :key="i.code"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <!-- @change="queryPageParameters.buyUnit='';queryPageParameters.buyUnit='';" -->
              <IhSelectPageByProject
                clearable
                v-model="queryPageParameters.projectId"
                placeholder="请选择联动项目"
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="立项周期">
                  <IhSelectPageByCycle
                    clearable
                    v-model="queryPageParameters.cycleId"
                    placeholder="请选择立项周期"
                  ></IhSelectPageByCycle>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="栋座">
                  <!-- @change="queryPageParameters.roomNumberId = ''" -->
                  <IhSelectPageByBuild
                    v-model="queryPageParameters.buyUnit"
                    :proId="queryPageParameters.projectId"
                    placeholder="请选择栋座"
                    clearable
                  ></IhSelectPageByBuild>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房号">
                  <!-- projectId项目, buyUnit栋座 -->
                  <IhSelectPageByRoom
                    v-model="queryPageParameters.roomNumberId"
                    :proId="queryPageParameters.projectId"
                    :buildingId="queryPageParameters.buyUnit"
                    placeholder="请选择房号"
                    clearable
                  ></IhSelectPageByRoom>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="甲方">
                  <IhSelectPageByCompany
                    v-model="queryPageParameters.partyAId"
                    clearable
                    placeholder="请选择甲方"
                    class="width--100"
                  ></IhSelectPageByCompany>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="区域">
                  <el-input
                    v-model="queryPageParameters.area"
                    clearable
                    placeholder="请输入区域"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态">
                  <el-select
                    v-model="queryPageParameters.notificationStatuses"
                    clearable
                    placeholder="请选择状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('NotificationStatus')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="客户">
                  <el-input
                    v-model="queryPageParameters.ownerName"
                    placeholder="请输入客户"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户电话">
                  <el-input
                    v-model="queryPageParameters.ownerMobile"
                    placeholder="请输入客户电话"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
    <!-- 按钮 -->
    <template #btn>
      <el-row>
        <el-button
          type="primary"
          @click="handleSearch()"
        >查询</el-button>
        <el-button
          type="info"
          @click="handleReact()"
        >重置</el-button>
        <el-dropdown
          class="margin-left-10"
          trigger="click"
        >
          <el-button type="success">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native.prevent="handleExport()"
              v-has="'B.SALES.CONTRACT.DISCOUNTLIST.EXPORTLIST'"
            >导出列表</el-dropdown-item>
            <el-dropdown-item
              @click.native.prevent="handleExportFile()"
              v-has="'B.SALES.CONTRACT.DISCOUNTLIST.EXPRORTATTCH'"
              :class="{ 'ih-data-disabled': !exportChange()}"
            >导出附件</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
        >{{searchOpen?'收起':'展开'}}</el-link>
      </el-row>
    </template>
    <!-- table-content -->
    <template #table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          label="编号"
          prop="noticeNo"
          min-width="300"
        ></el-table-column>
        <el-table-column
          label="类型"
          prop="notificationType"
          min-width="140"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.notificationType, 'NotificationType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="项目名称"
          prop="projectName"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="联动周期"
          prop="cycleName"
          width="130"
        ></el-table-column>
        <el-table-column
          label="栋座"
          prop="buyUnitName"
          width="160"
        ></el-table-column>
        <el-table-column
          label="房号"
          prop="roomNumberName"
          min-width="160"
        ></el-table-column>
        <el-table-column
          label="甲方名称"
          width="200"
          prop="partyAName"
        ></el-table-column>
        <el-table-column
          label="区域"
          width="200"
          prop="area"
        ></el-table-column>
        <el-table-column
          label="客户名称"
          prop="ownerName"
          width="120"
        >
          <template v-slot="{ row }">
            <div
              v-for="(i, n) in row.ownerList"
              :key="n"
            >{{i.ownerName}} <span v-if="n !== (row.ownerList.length-1)">、</span></div>
          </template>
        </el-table-column>
        <el-table-column
          label="客户电话"
          prop="ownerMobile"
          width="125"
        >
          <template v-slot="{ row }">
            <div
              v-for="(i, n) in row.ownerList"
              :key="n"
            >{{i.ownerMobile}} <span v-if="n !== (row.ownerList.length-1)">、</span></div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="notificationStatus"
          width="135"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.notificationStatus, 'NotificationStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="100"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="$router.push(`/discount/info?id=${row.id}`)"
            >详情</el-link>
            <el-link
              type="success"
              v-has="'B.SALES.CONTRACT.DISCOUNTLIST.PREVIEW'"
              class="margin-left-10"
              @click="preview(row)"
            >预览</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
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
import PaginationMixin from "@/mixins/pagination";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

import { post_notice_list } from "@/api/contract/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class DiscountList extends Vue {
  public queryPageParameters: any = {
    area: null,
    cycleId: null,
    notificationStatuses: null,
    noticeNo: null,
    ownerMobile: null,
    ownerName: null,
    partyAId: null,
    projectId: null,
    roomNumberId: null,
    notificationTypes: null,
    buyUnit: null,
  };
  private timeList: any = [];
  private searchOpen = true;
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private selectionData: any = [];

  private exportChange() {
    const roleList = (this.$root as any).userInfo.roleList.map(
      (v: any) => v.code
    );
    const isBusines = roleList.includes("RBusinessManagement");
    return isBusines;
  }

  private handleExport() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/export/notice/list`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: this.selectionData.map((i: any) => i.id),
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "告知书列表.xlsx";
      $a.click();
      $a.remove();
    });
  }
  private handleExportFile() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/export/notice/file`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: this.selectionData.map((i: any) => i.id),
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "优惠告知书附件.zip";
      $a.click();
      $a.remove();
    });
  }
  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private preview(row: any) {
    window.open(
      `/sales-api/sales-document-cover/file/browse/${row.templateId}`
    );
  }
  private handleSelectionChange(val: any): void {
    this.selectionData = val;
  }
  private handleSearch() {
    // let sign = this.timeList && this.timeList.length;
    // this.queryPageParameters.beginTime = sign ? this.timeList[0] : "";
    // this.queryPageParameters.endTime = sign ? this.timeList[1] : "";
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReact(): void {
    Object.assign(this.queryPageParameters, {
      area: null,
      cycleId: null,
      notificationStatuses: null,
      noticeNo: null,
      ownerMobile: null,
      ownerName: null,
      partyAId: null,
      projectId: null,
      roomNumberId: null,
      notificationTypes: null,
      buyUnit: null,
    });
    this.timeList = [];
  }
  public async getListMixin(): Promise<void> {
    let notificationStatuses: any, notificationTypes: any;
    if (this.queryPageParameters.notificationStatuses) {
      notificationStatuses = [this.queryPageParameters.notificationStatuses];
    }
    if (this.queryPageParameters.notificationTypes) {
      notificationTypes = [this.queryPageParameters.notificationTypes];
    }
    this.resPageInfo = await post_notice_list({
      ...this.queryPageParameters,
      notificationStatuses,
      notificationTypes,
    });
  }

  created() {
    this.getListMixin();
  }
}
</script>
