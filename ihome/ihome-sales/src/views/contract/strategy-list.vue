<!--
 * @Description: 战略协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 11:13:15
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-09 10:09:27
-->
<template>
  <IhPage>
    <!-- 搜索 -->
    <template #form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-select
                v-model="queryPageParameters.name"
                placeholder="标题"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方">
              <el-select
                v-model="queryPageParameters.name"
                placeholder="甲方"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方">
              <el-select
                v-model="queryPageParameters.accountType"
                clearable
                placeholder="乙方"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('accountType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="项目"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="周期">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="周期"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议编号">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="协议编号"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="归档状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档编号">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="归档编号"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="协议状态">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择协议状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('employeeStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
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
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button
          type="success"
          @click="$router.push('/contract/strategyAdd')"
        >录入协议</el-button>
        <el-button type="success">导出</el-button>
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
        :data="pageInfo.list"
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
          label="甲方"
          prop="jia"
          min-width="200"
        ></el-table-column>
        <el-table-column
          fixed
          label="乙方"
          prop="yi"
          min-width="200"
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
          label="协议编号"
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
          label="操作"
          width="150"
          align="left"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="$router.push('/contract/strategyDetail')"
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
                <el-dropdown-item @click.native.prevent="routerTo(row)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row)">盖章版归档</el-dropdown-item>
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
import PaginationMixin from "../../mixins/pagination";

@Component({
  mixins: [PaginationMixin],
})
export default class StrategyList extends Vue {
  public queryPageParameters: any = {};
  private searchOpen = true;
  private pageInfo: PageInfo = {
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
    ],
  };

  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private handleSelectionChange(val: any): void {
    console.log(val);
  }
}
interface PageInfo {
  total: number;
  list: Array<object>;
}
</script>
