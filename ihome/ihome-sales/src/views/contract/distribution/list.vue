<!--
 * @Description: 中介分销协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 17:34:32
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-26 18:32:19
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
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方公司">
              <el-select
                v-model="queryPageParameters.partyB"
                clearable
                placeholder="乙方公司"
                class="width--100"
              ></el-select>
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
                      v-for="item in $root.displayList('employeeType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
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
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button>申领合同</el-button>
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
          fixed
          label="甲方公司"
          prop="jia"
          min-width="200"
        ></el-table-column>
        <el-table-column
          fixed
          label="乙方公司"
          prop="yi"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="项目地址"
          prop="pro"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="合作时间"
          prop="time"
          width="130"
        ></el-table-column>
        <el-table-column
          label="关联项目"
          prop="pro"
          width="150"
        ></el-table-column>
        <el-table-column
          label="关联周期"
          prop="zoom"
          width="150"
        ></el-table-column>
        <el-table-column
          label="归属组织"
          prop="pl"
          width="150"
        ></el-table-column>
        <el-table-column
          label="合同编号"
          prop="id"
          width="200"
        ></el-table-column>
        <el-table-column
          label="归档状态"
          prop="isAction"
          width="100"
        ></el-table-column>
        <el-table-column
          label="归档编号"
          prop="id"
          width="200"
        ></el-table-column>
        <el-table-column
          label="合同跟进人"
          prop="name"
          width="200"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="230"
          align="left"
          fixed="right"
        >
          <template v-slot="{  }">
            <el-link
              type="primary"
              @click.native.prevent="$router.push('/distribution/info')"
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
import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";

@Component({
  components: { SelectOrganizationTree },
  mixins: [PaginationMixin],
})
export default class IntermediaryList extends Vue {
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
  private searchOpen = true;
  resPageInfo: any = {
    total: 0,
    list: [
      {
        title: "123",
        jia: "广州居恒信息科技有限公司",
        yi: "asd",
        pro: "保利XX项目",
        time: "2020-9-28",
        zoom: "周期",
        pl: "保利",
        id: "128418458315",
        name: "爱家案场",
        isAction: "保存",
      },
      {
        title: "123",
        jia: "广州居恒信息科技有限公司1",
        yi: "asd",
        pro: "保利XX项目",
        time: "2020-9-28",
        zoom: "周期1",
        pl: "保利",
        id: "128418458315",
        name: "爱家案场1",
        isAction: "保存",
      },
      {
        title: "123",
        jia: "广州居恒信息科技有限公司",
        yi: "asd",
        pro: "保利XX项目1",
        time: "2020-9-29",
        zoom: "周期",
        pl: "保利",
        id: "128418458315",
        name: "爱家案场",
        isAction: "保存",
      },
      {
        title: "123",
        jia: "广州居恒信息科技有限公司",
        yi: "asd",
        pro: "保利112项目1",
        time: "2020-9-29",
        zoom: "周期",
        pl: "保利",
        id: "128418458315",
        name: "爱家案场",
        isAction: "保存",
      },
      {
        title: "分销协议",
        jia: "广州居恒信息科技有限公司",
        yi: "asd",
        pro: "保利112项目1",
        time: "2020-9-29",
        zoom: "周期",
        pl: "保利",
        id: "128418458315",
        name: "爱家案场",
        isAction: "保存",
      },
      {
        title: "分销协议",
        jia: "广州居恒信息科技有限公司",
        yi: "asd",
        pro: "保利112项目1",
        time: "2020-9-29",
        zoom: "周期",
        pl: "保利",
        id: "128418458315",
        name: "爱家案场",
        isAction: "保存",
      },
    ],
  };

  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private handleSelectionChange(val: any): void {
    console.log(val);
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_distribution_list(this.queryPageParameters);
  }

  created() {
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
