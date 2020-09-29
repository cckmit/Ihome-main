<!--
 * @Description: 甲方合同列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 11:53:51
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-29 08:45:05
-->
<template>
  <ih-page>
    <!-- 搜索 -->
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="85px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-select
                v-model="queryPageParameters.name"
                placeholder="甲方"
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
                <el-form-item label="合作项目">
                  <el-input
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="合作项目"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="queryPageParameters.employmentDate"
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
                <el-form-item label="执行时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="queryPageParameters.employmentDate"
                    type="date"
                    align="left"
                    placeholder="年/月/日"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="项目">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="项目"
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
                <el-form-item label="归属组织">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择归属组织"
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

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择合同编号"
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
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.employeeType"
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
                  <el-select
                    v-model="queryPageParameters.workType"
                    clearable
                    placeholder="请选择归档编号"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('workType')"
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
                <el-form-item label="合同录入人">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择合同录入人"
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
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <el-select
                    v-model="queryPageParameters.employeeType"
                    clearable
                    placeholder="请选择合同跟进人"
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
          @click="$router.push('/contract/partyAadd')"
        >录入</el-button>
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
      <IhTable
        class="partyA-table"
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
            width="230"
            align="left"
            fixed="right"
          >
            <template v-slot="{ row }">
              <el-link
                type="primary"
                @click.native.prevent="handleTo(row)"
              >详情</el-link>
              <el-link type="primary">扫描件归档</el-link>
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
        </template>
      </IhTable>
    </template>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../mixins/pagination";
@Component({
  mixins: [PaginationMixin],
})
export default class PartyAList extends Vue {
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
        pro: "保利XX项目1",
        time: "2020-9-29",
        zoom: "周期",
        pl: "保利",
        id: "128418458315",
        name: "爱家案场",
        isAction: "保存",
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
      prop: "jia",
      width: 200,
      fixed: true,
    },
    {
      label: "乙方",
      align: "center",
      prop: "yi",
      width: 100,
      fixed: true,
    },
    {
      label: "合作项目",
      align: "center",
      prop: "pro",
      width: 200,
    },
    {
      label: "合作时间",
      align: "center",
      prop: "time",
      width: 200,
    },
    {
      label: "执行时间",
      align: "center",
      prop: "time",
      width: 200,
    },
    {
      label: "关联项目",
      align: "center",
      prop: "pro",
      width: 200,
    },
    {
      label: "关联周期",
      align: "center",
      prop: "zoom",
      width: 100,
    },
    {
      label: "归属组织",
      align: "center",
      prop: "pl",
      width: 200,
    },
    {
      label: "合同编号",
      align: "center",
      prop: "id",
      width: 200,
    },
    {
      label: "归档状态",
      align: "center",
      prop: "isAction",
      width: 100,
    },
    {
      label: "归档编号",
      align: "center",
      prop: "id",
      width: 200,
    },
    {
      label: "合同跟进人",
      align: "center",
      prop: "name",
      width: 100,
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

<style lang="scss" scoped>
.partyA-table {
  margin-top: 17px;
  .el-link + .el-link {
    margin-left: 15px;
  }
}
</style>