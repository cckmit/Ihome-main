<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 16:27:36
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-25 10:24:21
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
              <el-col :span="8">
                <el-form-item label="模板类型">
                  <el-select
                    v-model="queryPageParameters.templateType"
                    placeholder="请选择模板类型"
                    clearable
                    class="width--100"
                  >
                    <el-option
                      v-for="(i, n) in $root.dictAllList('TemplateType')"
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
                <el-form-item
                  label="业管审核状态"
                  class="formItem"
                >
                  <el-select
                    v-model="queryPageParameters.reviewStatus"
                    placeholder="请选择业管审核状态"
                    clearable
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('ReviewStatus')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
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
        <el-button
          type="success"
          @click="handleExport()"
          v-has="'B.SALES.CONTRACT.DISCOUNTLIST.EXPORTLIST'"
        >导出列表</el-button>
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
          min-width="210"
        ></el-table-column>
        <el-table-column width="120">
          <template #header>
            <div>类型</div>
            <div>模板类型</div>
          </template>
          <template v-slot="{ row }">
            <div>{{$root.dictAllName(row.notificationType, 'NotificationType')}}</div>
            <div>{{$root.dictAllName(row.templateType, 'TemplateType')}}</div>
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
          width="230"
        ></el-table-column>
        <el-table-column min-width="150">
          <template #header>
            <div>栋座</div>
            <div>房号</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.buyUnitName}}</div>
            <div>{{row.roomNumberName}}</div>
          </template>
        </el-table-column>
        <el-table-column width="230">
          <template #header>
            <div>甲方名称</div>
            <div>区域</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.partyAName}}</div>
            <div>{{row.area}}</div>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template #header>
            <div>客户名称</div>
            <div>客户电话</div>
          </template>
          <template v-slot="{ row }">
            <div>
              <span
                v-for="(i, n) in row.ownerList"
                :key="n"
              >{{i.ownerName}}<span v-if="n !== (row.ownerList.length-1)">、</span>
              </span>
            </div>
            <div style="color: #2ec4b6;">
              <span
                v-for="(i, n) in row.ownerList"
                :key="n"
              >{{i.ownerMobile}}<span v-if="n !== (row.ownerList.length-1)">、</span></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="135">
          <template #header>
            <div>告知书状态</div>
            <div>业管审核状态</div>
          </template>
          <template v-slot="{ row }">
            <div>{{$root.dictAllName(row.notificationStatus, 'NotificationStatus')}}</div>
            <div>{{$root.dictAllName(row.reviewStatus, 'ReviewStatus') || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="110"
        >
          <template v-slot="{ row }">
            <!-- :class="{'ih-data-disabled':row.notificationType !== 'Notification'}" -->
            <el-link
              type="primary"
              class="margin-right-10"
              @click.native.prevent="$router.push(`/discount/info?id=${row.id}`)"
            >详情</el-link>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="preview(row)"
                  v-has="'B.SALES.CONTRACT.DISCOUNTLIST.PREVIEW'"
                >预览</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleExportFile(row)"
                  v-has="'B.SALES.CONTRACT.DISCOUNTLIST.EXPRORTATTCH'"
                >导出附件</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.finish === 'No' || row.notificationType !== 'Notification'}"
                  :disabled="row.notificationStatus !== 'BecomeEffective' || !!row.dealId"
                  v-has="'B.SALES.CONTRACT.DISCOUNTLIST.AGREEMENT'"
                  @click.native.prevent="handleGo(row)"
                >发起补充协议</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.reviewStatus !== 'Pending'}"
                  @click.native.prevent="$router.push(`/discount/audit?id=${row.id}`)"
                  v-has="'B.SALES.CONTRACT.DISCOUNTLIST.AUDIT'"
                >业管审核</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-link
              type="success"
              v-has="'B.SALES.CONTRACT.DISCOUNTLIST.PREVIEW'"
              @click="preview(row)"
            >预览</el-link> -->
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
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
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
    templateType: null,
    reviewStatus: null,
  };
  private timeList: any = [];
  private searchOpen = true;
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private selectionData: any = [];
  private isShowImg = false;
  private srcList: any = [];
  private srcData: any = [];

  private handleExport() {
    const token: any = getToken();
    let notificationStatuses: any, notificationTypes: any;
    if (this.queryPageParameters.notificationStatuses) {
      notificationStatuses = [this.queryPageParameters.notificationStatuses];
    }
    if (this.queryPageParameters.notificationTypes) {
      notificationTypes = [this.queryPageParameters.notificationTypes];
    }
    axios({
      method: "POST",
      url: `/sales-api/contract/export/notice/list`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: {
        ...this.queryPageParameters,
        notificationStatuses,
        notificationTypes,
      },
    }).then((res: any) => {
      if (res.data.type === "application/json") {
        let reader = new FileReader();
        reader.readAsText(res.data, "utf-8");
        reader.onload = () => {
          let result: any = reader.result;
          const res = JSON.parse(result);
          this.$message.warning(res.msg);
        };
        return;
      }
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "优惠告知书列表.xlsx";
      $a.click();
      $a.remove();
    });
  }
  private handleExportFile(row: any) {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/export/notice/file/${row.id}`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    }).then((res: any) => {
      if (res.data.type === "application/json") {
        let reader = new FileReader();
        reader.readAsText(res.data, "utf-8");
        reader.onload = () => {
          let result: any = reader.result;
          const res = JSON.parse(result);
          this.$message.warning(res.msg);
        };
        return;
      }
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "优惠告知书附件.zip";
      $a.click();
      $a.remove();
    });
  }
  private handleGo(row: any): void {
    console.log(row);
    this.$router.push(`/discount/replenish?id=${row.id}`);
  }
  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private preview(row: any) {
    if (row.templateType === "ElectronicTemplate") {
      window.open(
        `/sales-api/sales-document-cover/file/browse/${row.templateId}`
      );
    } else {
      let imgList = row.annexList;
      this.srcList = imgList.map(
        (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileNo}`
      );
      this.srcData = imgList.map((v: any) => ({
        fileName: v.attachmentSuffix,
        preFileName: "优惠告知书",
      }));
      if (this.srcList.length) {
        this.isShowImg = true;
      } else {
        this.$message.warning("暂无图片");
      }
    }
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
      templateType: null,
      reviewStatus: null,
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

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
