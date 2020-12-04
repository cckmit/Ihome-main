<!--
 * @Description: 中介分销协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 17:34:32
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-04 19:00:41
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
                placeholder="标题"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <el-select
                v-model="queryPageParameters.partyACompanyId"
                placeholder="甲方公司"
                clearable
                class="width--100"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方公司">
              <el-select
                v-model="queryPageParameters.channelCompanyId"
                clearable
                placeholder="请选择乙方公司"
                class="width--100"
              >
                <el-option
                  v-for="item in channelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目地址">
                  <el-input
                    v-model="queryPageParameters.projectAddress"
                    placeholder="项目地址"
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
              <el-col :span="8">
                <el-form-item label="项目">
                  <SelectPageByProject
                    v-model="queryPageParameters.projectId"
                    placeholder="请选择项目"
                  ></SelectPageByProject>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="周期">
                  <SelectPageByCycle
                    v-model="queryPageParameters.cycleId"
                    placeholder="请选择周期"
                  ></SelectPageByCycle>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <SelectOrganizationTree
                    :orgId="queryPageParameters.organizationId"
                    @callback="(id) => (queryPageParameters.organizationId = id)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input
                    v-model="queryPageParameters.contractNo"
                    clearable
                    placeholder="请输入合同编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="审核状态">
                  <el-select
                    v-model="queryPageParameters.distributionState"
                    clearable
                    placeholder="请选择审核状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('DistributionEnum.DistributionState')"
                      :key="item.code"
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
                      v-for="item in $root.dictAllList('DistributionEnum.ArchiveStatus')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档编号">
                  <el-input
                    v-model="queryPageParameters.archiveNo"
                    clearable
                    placeholder="请输入归档编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同录入人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.entryPerson"
                    clearable
                  >
                    <template v-slot="{ data }">
                      <span style="float: left">{{ data.name }}</span>
                      <span style="margin-left: 20px;float: right; color: #8492a6; font-size: 13px">{{ data.account }}</span>
                    </template>
                  </IhSelectPageUser>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.handler"
                    clearable
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
          @click="handleReact()"
        >重置</el-button>
        <el-button
          type="success"
          @click="review()"
        >审核</el-button>
        <el-button
          type="success"
          @click="distribute()"
        >派发</el-button>
        <el-button
          type="danger"
          @click="disallowance()"
        >驳回</el-button>
        <el-button
          type="danger"
          @click="withdraw()"
        >撤回</el-button>
        <el-dropdown
          class="margin-left-10"
          trigger="click"
        >
          <el-button type="success">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>导出列表</el-dropdown-item>
            <el-dropdown-item>导出附件</el-dropdown-item>
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
        class="ih-table intermediary-table"
        ref="multipleTable"
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
          min-width="100"
        ></el-table-column>
        <el-table-column
          label="甲方公司"
          prop="partyACompanyName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="乙方公司"
          prop="channelCompanyName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="项目地址"
          prop="projectAddress"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="合作时间"
          prop="time"
          width="195"
        >
          <template v-slot="{ row }">
            <span>{{row.beginTime}} 至 {{row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="关联项目"
          prop="projectName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="关联周期"
          prop="cycleName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="归属组织"
          prop="organizationName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="合同编号"
          prop="contractNo"
          width="220"
        ></el-table-column>
        <el-table-column
          label="审核状态"
          prop="distributionState"
          width="100"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.distributionState, 'DistributionEnum.DistributionState')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档状态"
          prop="archiveStatus"
          width="120"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.archiveStatus, 'DistributionEnum.ArchiveStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档编号"
          prop="archiveNo"
          width="200"
        ></el-table-column>
        <el-table-column
          label="合同跟进人"
          prop="handlerName"
          width="110"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="handleTo(row, 'info')"
            >详情</el-link>
            <el-link
              type="primary"
              @click="duplicate(row)"
            >盖章版归档</el-link>
            <el-link
              type="primary"
              @click="handleTo(row, 'original')"
            >原件归档</el-link>
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

import SelectPageByProject from "@/components/SelectPageByProject.vue";
import SelectPageByCycle from "@/components/SelectPageByCycle.vue";
import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";
import { get_channel_getAll } from "@/api/channel/index";
import { post_company_getAll } from "@/api/system/index";
import {
  post_distribution_list,
  post_distribution_review,
  post_distribution_distribute,
  post_distribution_disallowance,
  post_distribution_withdraw,
  post_distribution_duplicate,
} from "@/api/contract/index";

@Component({
  components: {
    SelectOrganizationTree,
    SelectPageByProject,
    SelectPageByCycle,
  },
  mixins: [PaginationMixin],
})
export default class DistributionList extends Vue {
  public queryPageParameters: any = {
    archiveNo: null,
    archiveStatus: null,
    beginTime: null,
    channelCompanyId: null,
    contractNo: null,
    cycleId: null,
    distributionState: null,
    endTime: null,
    entryPerson: null,
    handler: null,
    organizationId: null,
    partyACompanyId: null,
    projectAddress: null,
    projectId: null,
    title: null,
  };
  private timeList = [];
  private companyLoading = false;
  private companyList: any = [];
  private channelList: any = [];
  private searchOpen = true;
  private selectionData: any = [];
  resPageInfo: any = {
    total: null,
    list: [],
  };

  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private handleSearch(): void {
    let sign = this.timeList && this.timeList.length;
    this.queryPageParameters.beginTime = sign ? this.timeList[0] : "";
    this.queryPageParameters.endTime = sign ? this.timeList[1] : "";
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReact(): void {
    Object.assign(this.queryPageParameters, {
      archiveNo: null,
      archiveStatus: null,
      beginTime: null,
      channelCompanyId: null,
      contractNo: null,
      cycleId: null,
      distributionState: null,
      endTime: null,
      entryPerson: null,
      handler: null,
      organizationId: null,
      partyACompanyId: null,
      projectAddress: null,
      projectId: null,
      title: null,
    });
  }
  private handleSelectionChange(val: any): void {
    this.selectionData = val;
  }
  /**
   * @description: 渠道分销合同撤回
   */
  private async withdraw() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    try {
      await post_distribution_withdraw({
        ids: this.selectionData.map((i: any) => i.id),
      });
      this.$message.success("撤回成功");
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description: 渠道分销合同驳回
   */
  private async disallowance() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    try {
      await post_distribution_disallowance({
        ids: this.selectionData.map((i: any) => i.id),
      });
      this.$message.success("驳回成功");
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description: 渠道分销合同审核
   */
  private async review() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    try {
      await post_distribution_review({
        ids: this.selectionData.map((i: any) => i.id),
      });
      this.$message.success("审核成功");
      this.getListMixin();
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * @description: 派发合同
   * @param {*}
   */
  private async distribute() {
    if (!this.selectionData.length) {
      this.$message.warning("请先勾选表格数据");
      return;
    }
    try {
      await post_distribution_distribute({
        ids: this.selectionData.map((i: any) => i.id),
      });
      this.$message.success("派发成功");
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description: 渠道分销合同扫描件归档
   */
  private async duplicate(row: any) {
    try {
      await this.$confirm("此操作将进行盖章版归档, 是否继续?", "提示");
      await post_distribution_duplicate({ distributionId: row.id });
      this.$message.success("盖章版归档成功");
      this.getListMixin();
    } catch (err) {
      console.log(err);
    }
  }
  handleTo(row: any, page: string) {
    this.$router.push({
      path: "/distribution/" + page,
      query: {
        id: row.id,
      },
    });
  }
  private async getCompanyList() {
    this.companyList = await post_company_getAll({ name: "" });
  }
  private async getChannelList() {
    this.channelList = await get_channel_getAll({ name: "" });
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_distribution_list(this.queryPageParameters);
  }

  created() {
    this.getChannelList();
    this.getCompanyList();
    this.getListMixin();
  }
}
</script>

<style lang="scss" scoped>
.intermediary-table {
  .el-link + .el-link {
    margin-left: 10px;
  }
}
</style>
