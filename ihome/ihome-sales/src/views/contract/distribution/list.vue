<!--
 * @Description: 中介分销协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 17:34:32
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-30 18:08:37
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
                v-model="queryPageParameters.partyA"
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
                v-model="queryPageParameters.partyB"
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
                    v-model="queryPageParameters.address"
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
                <el-form-item label="合同模板">
                  <el-select
                    v-model="queryPageParameters.template"
                    clearable
                    placeholder="合同模板"
                    class="width--100"
                  ></el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="项目">
                  <el-input
                    v-model="queryPageParameters.project"
                    clearable
                    placeholder="项目"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="周期">
                  <el-input
                    v-model="queryPageParameters.cycle"
                    clearable
                    placeholder="周期"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <SelectOrganizationTree
                    :orgId="queryPageParameters.organization"
                    @callback="(id) => (queryPageParameters.organization = id)"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input
                    v-model="queryPageParameters.contractCode"
                    clearable
                    placeholder="请输入合同编号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.fileState"
                    clearable
                    placeholder="请选择归档状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('DistributionEnum.FileState')"
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
                    placeholder="请输入归档编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同录入人">
                  <el-select
                    v-model="queryPageParameters.creator"
                    clearable
                    placeholder="请选择合同录入人"
                    class="width--100"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <el-select
                    v-model="queryPageParameters.handler"
                    clearable
                    placeholder="请选择合同跟进人"
                    class="width--100"
                  >
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
        <el-button @click="$router.push('apply')">申领合同</el-button>
        <el-button>派发合同</el-button>
        <el-button>转派发</el-button>
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
        class="ih-table intermediary-table"
        :data="resPageInfo.list"
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
          prop="partyA"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="乙方公司"
          prop="partyB"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="项目地址"
          prop="address"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="合作时间"
          prop="time"
          width="195"
        >
          <template v-slot="{ row }">
            <span>{{row.beginTime | timestampToDate('YYYY-MM-DD')}} 至 {{row.endTime | timestampToDate('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="关联项目"
          prop="project"
          width="150"
        ></el-table-column>
        <el-table-column
          label="关联周期"
          prop="cycle"
          width="150"
        ></el-table-column>
        <el-table-column
          label="归属组织"
          prop="organization"
          width="150"
        ></el-table-column>
        <el-table-column
          label="合同编号"
          prop="contractCode"
          width="200"
        ></el-table-column>
        <el-table-column
          label="归档状态"
          prop="fileState"
          width="100"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.fileState, 'DistributionEnum.FileState')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档编号"
          prop="fileCode"
          width="200"
        ></el-table-column>
        <el-table-column
          label="合同跟进人"
          prop="handler"
          width="200"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="230"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="handleTo(row, 'info')"
            >详情</el-link>
            <el-link type="primary">盖章版归档</el-link>
            <el-link type="primary">原件归档</el-link>
            <!-- <el-dropdown
                trigger="click"
                class="margin-left-15"
              >
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native.prevent="routerTo(row)">编辑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
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

import { post_distribution_list } from "@/api/contract/index";
import { get_channel_getAll } from "@/api/channel/index";
import { post_company_getAll } from "@/api/system/index";
import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";

@Component({
  components: { SelectOrganizationTree },
  mixins: [PaginationMixin],
})
export default class DistributionList extends Vue {
  public queryPageParameters: any = {
    title: "",
    address: "",
    contractCode: "",
    partyA: "",
    partyB: "",
    beginTime: "",
    endTime: "",
    template: "",
    project: "",
    cycle: "",
    organization: "",
    fileState: "",
    fileCode: "",
    creator: "",
    handler: "",
  };
  private timeList = [];
  private companyLoading = false;
  private companyList: any = [];
  private channelList: any = [];
  private searchOpen = true;
  resPageInfo: any = {
    total: 0,
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
    this.queryPageParameters = {
      title: "",
      address: "",
      contractCode: "",
      partyA: "",
      partyB: "",
      beginTime: "",
      endTime: "",
      template: "",
      project: "",
      cycle: "",
      organization: "",
      fileState: "",
      fileCode: "",
      creator: "",
      handler: "",
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
  }
  private handleSelectionChange(val: any): void {
    console.log(val);
  }
  handleTo(row: any, page: string) {
    this.$router.push({
      path: page,
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
    margin-left: 15px;
  }
}
</style>
