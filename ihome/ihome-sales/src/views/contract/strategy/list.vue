<!--
 * @Description: 战略协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 11:13:15
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-02 09:35:32
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
            <el-form-item label="甲方">
              <el-select
                v-model="queryPageParameters.partyAId"
                placeholder="甲方"
                clearable
                filterable
                class="width--100"
              >
                <!-- <el-option-group label="我司">
                  <el-option
                    v-for="item in myCompany"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-option-group> -->
                <!-- <el-option-group label="开发商"> -->
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
                <!-- </el-option-group> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方">
              <el-select
                v-model="queryPageParameters.partyBId"
                clearable
                filterable
                placeholder="乙方"
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
                <el-form-item label="项目">
                  <SelectPageByProject
                    v-model="queryPageParameters.projectId"
                    placeholder="请选择项目"
                  ></SelectPageByProject>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="周期">
                  <SelectPageByCycle
                    v-model="queryPageParameters.cycleId"
                    placeholder="请选择周期"
                  ></SelectPageByCycle>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议编号">
                  <el-input
                    v-model="queryPageParameters.agreementNo"
                    clearable
                    placeholder="协议编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.archiveStatus"
                    clearable
                    placeholder="归档状态"
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
              <el-col :span="8">
                <el-form-item label="归档编号">
                  <el-input
                    v-model="queryPageParameters.archiveNo"
                    clearable
                    placeholder="归档编号"
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
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="协议类型">
                  <el-select
                    v-model="queryPageParameters.agreementType"
                    clearable
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('AgreementType')"
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
          @click="$router.push('/strategy/add')"
        >录入协议</el-button>
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
          label="标题"
          prop="title"
          min-width="180"
        ></el-table-column>
        <el-table-column
          label="甲方"
          prop="partyAName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="乙方"
          prop="partyBName"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="关联项目"
          prop="projectId"
          width="150"
        ></el-table-column>
        <el-table-column
          label="关联周期"
          prop="cycleId"
          width="150"
        ></el-table-column>
        <el-table-column
          label="协议编号"
          prop="agreementNo"
          width="275"
        ></el-table-column>
        <el-table-column
          label="归档状态"
          prop="archiveState"
          width="100"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.archiveStatus, 'ArchiveStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档编号"
          prop="archiveNo"
          width="245"
        ></el-table-column>
        <el-table-column
          label="协议类型"
          prop="agreementType"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.agreementType, 'AgreementType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130"
          align="left"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="handleToPage(row, 'info')"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="handleToPage(row, 'edit')">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleToPage(row, 'archived')">盖章版归档</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row)">原件归档</el-dropdown-item>
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

import { post_strategy_list } from "@/api/contract/index";
import { post_company_listAll } from "@/api/developer/index";
import { post_company_getAll } from "@/api/system/index";
import { get_channel_getAll } from "@/api/channel/index";
// import SelectPageByProject from "@/components/SelectPageByProject.vue";
// import SelectPageByCycle from "@/components/SelectPageByCycle.vue";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class StrategyList extends Vue {
  public queryPageParameters: any = {
    agreementNo: null,
    agreementType: null,
    approvalStatus: null,
    archiveNo: null,
    archiveStatus: null,
    partyAId: null,
    partyBId: null,
    title: null,
  };
  private searchOpen = true;
  public resPageInfo: any = {
    total: null,
    list: [],
  };
  private companyList: any = [];
  private channelList: any = [];
  private myCompany: any = [];

  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private handleToPage(row: any, page: string): void {
    this.$router.push({
      path: page,
      query: {
        id: row.id,
      },
    });
  }
  private handleSearch() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReact() {
    Object.assign(this.queryPageParameters, {
      agreementNo: null,
      agreementType: null,
      approvalStatus: null,
      archiveNo: null,
      archiveStatus: null,
      partyAId: null,
      partyBId: null,
      title: null,
    });
  }
  private handleSelectionChange(val: any): void {
    console.log(val);
  }
  private async getMyComAll(): Promise<void> {
    this.myCompany = await post_company_getAll({ name: "" });
  }
  private async getCompanyAll(): Promise<void> {
    this.companyList = await post_company_listAll({ name: "" });
  }
  private async getChannelAll(): Promise<void> {
    this.channelList = await get_channel_getAll();
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_strategy_list(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
    this.getCompanyAll();
    this.getChannelAll();
    this.getMyComAll();
  }
}
</script>
