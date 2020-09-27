<!--
 * @Description: 战略协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 11:13:15
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-27 16:11:56
-->
<template>
  <IhPage>
    <!-- 搜索 -->
    <template v-slot:form>
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
    <template v-slot:btn>
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
    <template v-slot:table>
      <br />
      <IhTable
        :data="pageInfo.list"
        :column="tableColumn"
        :columnIndex="false"
        @selection-change="handleSelectionChange"
        :pageSize="queryPageParameters.pageSize"
        :pageCurrent="queryPageParameters.pageNum"
        :pageTotal="pageInfo.total"
        @page-change="handleCurrentChangeMixin"
        @size-change="handleSizeChangeMixin"
      >
        <template #operation>
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
        </template>
      </IhTable>
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
    total: 1,
    list: [
      {
        title: "123",
      },
    ],
  };
  // 表头
  private tableColumn: Array<object> = [
    {
      label: "标题",
      align: "center",
      prop: "title",
      width: 100,
      fixed: true,
    },
    {
      label: "甲方",
      align: "center",
      prop: "title",
      width: 100,
      fixed: true,
    },
    {
      label: "乙方",
      align: "center",
      prop: "title",
      width: 100,
      fixed: true,
    },
    {
      label: "关联项目",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "关联周期",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "协议编号",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "归档状态",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "归档编号",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      slot: "operation",
    },
  ];

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
