<!--
 * @Description: 甲方合同列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 11:53:51
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-16 09:04:57
-->
<template>
  <IhPage label-width="100px">
    <!-- 搜索 -->
    <template #form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input
                v-model="queryPageParameters.title"
                placeholder="请输入标题"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方">
              <IhSelectPageByDeveloper
                v-model="queryPageParameters.partyAId"
                placeholder="请选择甲方"
                clearable
              ></IhSelectPageByDeveloper>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方">
              <IhSelectPageByCompany
                v-model="queryPageParameters.partyBId"
                clearable
                placeholder="请选择乙方"
              ></IhSelectPageByCompany>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合作项目">
                  <el-input
                    v-model="queryPageParameters.cooperationProjectsName"
                    placeholder="请输入合作项目"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作时间">
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
              <!-- <el-col :span="8">
                <el-form-item label="执行时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="queryPageParameters.effectiveTime"
                    type="date"
                    align="left"
                    placeholder="年/月/日"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="8">
                <el-form-item label="关联项目">
                  <IhSelectPageByProject
                    v-model="queryPageParameters.projectsId"
                    clearable
                    placeholder="请选择关联项目"
                  ></IhSelectPageByProject>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <IhSelectPageDivision
                    v-model="queryPageParameters.organizationId"
                    placeholder="请选择归属组织"
                    clearable
                  ></IhSelectPageDivision>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input
                    v-model="queryPageParameters.contractNo"
                    clearable
                    placeholder="请输入合同编号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核状态">
                  <el-select
                    v-model="queryPageParameters.approvalStatus"
                    clearable
                    placeholder="请选择审核状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="(item, i) in $root.dictAllList('ApprovalStatus')"
                      :key="i"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.archiveStatus"
                    clearable
                    placeholder="请选择归档状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="(item, i) in $root.dictAllList('ArchiveStatus')"
                      :key="i"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="归档编号">
                  <el-input
                    v-model="queryPageParameters.archiveNo"
                    clearable
                    placeholder="请输入归档编号"
                    class="width--100"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="合同录入人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.enteringPersonId"
                    clearable
                    class="width--100"
                  >
                    <template v-slot="{ data }">
                      <span style="float: left">{{ data.name }}</span>
                      <span style="margin-left: 20px;float: right; color: #8492a6; font-size: 13px">{{ data.account }}</span>
                    </template>
                  </IhSelectPageUser>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.handlerId"
                    clearable
                    class="width--100"
                  >
                    <template v-slot="{ data }">
                      <span style="float: left">{{ data.name }}</span>
                      <span style="margin-left: 20px;float: right; color: #8492a6; font-size: 13px">{{ data.account }}</span>
                    </template>
                  </IhSelectPageUser>
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
          @click="handleReset()"
        >重置</el-button>
        <el-button
          type="success"
          v-has="'B.SALES.CONTRACT.PARTYALIST.EXPORTLIST'"
          @click.native.prevent="handleExport()"
        >导出列表</el-button>
        <!-- <el-dropdown
          class="margin-left-10"
          trigger="click"
        >
          <el-button type="success">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native.prevent="handleExport()"
              v-has="'B.SALES.CONTRACT.PARTYALIST.EXPORTLIST'"
            >导出列表</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
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
        class="ih-table partyA-table"
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
          label="标题"
          prop="title"
          min-width="205"
        ></el-table-column>
        <el-table-column
          label="甲方"
          min-width="200"
        >
          <template v-slot="{ row }">
            <span
              v-for="(item, index) in row.partyList"
              :key="item.id"
            >
              {{item.userName}}
              <span v-if="index !== (row.partyList.length-1)">、</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="乙方"
          prop="partyBName"
          min-width="215"
        ></el-table-column>
        <el-table-column
          label="合作项目"
          prop="cooperationProjectsName"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="合作时间"
          prop="cooperationTime"
          width="200"
        >
          <template v-slot="{ row }">
            {{ row.cooperationTime && row.cooperationEnd ? `${row.cooperationTime} ~ ${row.cooperationEnd}` : '' }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="关联项目"
          prop="projectsName"
          width="200"
        ></el-table-column> -->
        <el-table-column
          label="归属组织"
          prop="organizationName"
          width="165"
        ></el-table-column>
        <el-table-column
          label="合同编号"
          prop="contractNo"
          width="265"
        ></el-table-column>
        <el-table-column
          label="审核状态"
          prop="contractCode"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.approvalStatus, "ApprovalStatus")}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档状态"
          prop="archiveStatus"
          width="120"
        >
          <template v-slot="{ row }">
            {{ $root.dictAllName(row.archiveStatus, "ArchiveStatus") }}
          </template>
        </el-table-column>
        <el-table-column
          label="归档编号"
          prop="archiveNo"
          width="230"
        ></el-table-column>
        <el-table-column
          label="合同跟进人"
          prop="handlerName"
          width="110"
        ></el-table-column>
        <el-table-column
          label="操作"
          min-width="120"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="handleToPage(row, '/partyA/info')"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              style="margin-left: 15px"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !removeChange(row) }"
                  @click.native.prevent="remove(row)"
                  v-has="'B.SALES.CONTRACT.PARTYALIST.DELETE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="duplicate(row)"
                  v-has="'B.SALES.CONTRACT.PARTYALIST.SCANFILE'"
                  :class="{ 'ih-data-disabled': !duplicateChange(row) }"
                >扫描件归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleToPage(row, '/partyA/edit')"
                  v-has="'B.SALES.CONTRACT.PARTYALIST.ORIGINALFILE'"
                  :class="{ 'ih-data-disabled': !masterChange(row) }"
                >原件归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleExportFile(row)"
                  v-has="'B.SALES.CONTRACT.PARTYALIST.EXPRORTATTCH'"
                  :class="{ 'ih-data-disabled': !exportChange() }"
                >导出附件</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import {
  post_contract_list,
  post_contract_duplicate__id,
  post_contract_delete,
} from "@/api/contract/index";

@Component({
  mixins: [PaginationMixin],
})
export default class PartyAList extends Vue {
  public queryPageParameters: any = {
    approvalStatus: null,
    archiveNo: null,
    archiveStatus: null,
    contractNo: null,
    cooperationBeginTime: null,
    cooperationEndTime: null,
    cooperationProjectsName: null,
    enteringPersonId: null,
    handlerId: null,
    organizationId: null,
    partyAId: null,
    partyBId: null,
    projectsId: null,
    title: null,
  };
  timeList = [];
  private selectTable: any = [];
  private searchOpen = true;
  public resPageInfo: any = {
    total: null,
    list: [],
  };

  private masterChange(row: any) {
    // const roleList = (this.$root as any).userInfo.roleList.map(
    //   (v: any) => v.code
    // );
    // const isOffice = roleList.includes("ROffice");
    const isStatus = row.approvalStatus === "OAAudited";
    // const isArchiveStatus = row.archiveStatus === "ScansAreArchived";
    return isStatus;
  }
  private removeChange(row: any) {
    // const roleList = (this.$root as any).userInfo.roleList.map(
    //   (v: any) => v.code
    // );
    // const isPlatform = roleList.includes("RPlatformClerk");
    const isStatus =
      row.approvalStatus === "Drafting" ||
      row.approvalStatus === "OAReviewRejected";
    return isStatus;
  }
  private duplicateChange(row: any) {
    // const roleList = (this.$root as any).userInfo.roleList.map(
    //   (v: any) => v.code
    // );
    // const isPlatform = roleList.includes("RPlatformClerk");
    const isStatus = row.approvalStatus === "OAAudited";
    // const isArchiveStatus = row.archiveStatus === "ScansAreNotArchived";
    return isStatus;
  }
  private exportChange() {
    const roleList = (this.$root as any).userInfo.roleList.map(
      (v: any) => v.code
    );
    const isBusines = roleList.includes("RBusinessManagement");
    return isBusines;
  }

  private async remove(row: any) {
    try {
      await this.$confirm("确认删除该合同数据吗?", "提示");
      await post_contract_delete([row.id]);
      // 删除list最后一条数据 返回前一页面
      if (this.resPageInfo.list.length === 1) {
        this.queryPageParameters.pageNum === 1
          ? (this.queryPageParameters.pageNum = 1)
          : this.queryPageParameters.pageNum--;
      }
      this.getListMixin();
      this.$message.success("删除成功");
    } catch (error) {
      console.log(error);
    }
  }
  private handleExport() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/export/contract/list`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: { ...this.queryPageParameters },
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "甲方合同列表.xlsx";
      $a.click();
      $a.remove();
    });
  }
  private handleExportFile(row: any) {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/export/contract/file/${row.id}`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "甲方合同附件.zip";
      $a.click();
      $a.remove();
    });
  }
  private handleSearch(): void {
    let sign = this.timeList && this.timeList.length;
    this.queryPageParameters.cooperationBeginTime = sign
      ? this.timeList[0]
      : "";
    this.queryPageParameters.cooperationEndTime = sign ? this.timeList[1] : "";
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReset(): void {
    Object.assign(this.queryPageParameters, {
      approvalStatus: null,
      archiveNo: null,
      archiveStatus: null,
      contractNo: null,
      cooperationBeginTime: null,
      cooperationEndTime: null,
      cooperationProjectsName: null,
      enteringPersonId: null,
      handlerId: null,
      organizationId: null,
      partyAId: null,
      partyBId: null,
      projectsId: null,
      title: null,
    });
    this.timeList = [];
  }
  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private handleToPage(row: any, page: string) {
    this.$router.push({
      path: page,
      query: {
        id: row.id,
      },
    });
  }
  private handleSelectionChange(val: any): void {
    // console.log(val);
    this.selectTable = val;
  }
  private async duplicate(row: any): Promise<void> {
    await this.$confirm("此操作将进行扫描件归档, 是否继续?", "提示");
    await post_contract_duplicate__id({ id: row.id });
    this.$message.success("归档成功");
    this.getListMixin();
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_contract_list(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
</script>

<style lang="scss" scoped>
.partyA-table {
  .el-link + .el-link {
    margin-left: 10px;
  }
}
</style>