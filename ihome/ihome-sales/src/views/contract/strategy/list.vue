<!--
 * @Description: 战略协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 11:13:15
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-11 15:49:39
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
                v-model="queryPageParameters.partyA"
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
                v-model="queryPageParameters.partyB"
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
                  <el-input
                    v-model="queryPageParameters.projectId"
                    placeholder="项目"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="周期">
                  <el-select
                    v-model="queryPageParameters.cycleId"
                    clearable
                    placeholder="周期"
                    class="width--100"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议编号">
                  <el-input
                    v-model="queryPageParameters.strategyCode"
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
                    v-model="queryPageParameters.fileState"
                    clearable
                    placeholder="归档状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('StrategyEnum.FileState')"
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
                    v-model="queryPageParameters.fileCode"
                    clearable
                    placeholder="归档编号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议状态">
                  <el-select
                    v-model="queryPageParameters.state"
                    clearable
                    placeholder="请选择协议状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('StrategyState')"
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
                <el-form-item label="协议类型">
                  <el-select
                    v-model="queryPageParameters.agreementType"
                    clearable
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('AgreementTypeEnum')"
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
        <el-button>导出</el-button>
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
          prop="partyA"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="乙方"
          prop="partyB"
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
          prop="strategyCode"
          width="275"
        ></el-table-column>
        <el-table-column
          label="归档状态"
          prop="fileState"
          width="100"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.fileState, 'StrategyEnum.FileState')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档编号"
          prop="fileCode"
          width="245"
        ></el-table-column>
        <el-table-column
          label="协议类型"
          prop="agreementType"
          width="125"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.agreementType, 'AgreementTypeEnum')}}
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

@Component({
  mixins: [PaginationMixin],
})
export default class StrategyList extends Vue {
  public queryPageParameters: any = {
    title: null,
    partyA: null,
    partyB: null,
    projectId: null,
    cycleId: null,
    strategyCode: null,
    fileState: null,
    fileCode: null,
    state: null,
    agreementType: null,
  };
  private searchOpen = true;
  public resPageInfo: any = {
    total: 0,
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
      title: null,
      partyA: null,
      partyB: null,
      projectName: null,
      cycle: null,
      strategyCode: null,
      fileState: null,
      fileCode: null,
      state: null,
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
