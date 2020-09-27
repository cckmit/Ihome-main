<!--
 * @Description: 中介分销协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 17:34:32
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-27 09:36:25
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
            <el-form-item label="甲方公司">
              <el-select
                v-model="queryPageParameters.name"
                placeholder="甲方公司"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方公司">
              <el-select
                v-model="queryPageParameters.accountType"
                clearable
                placeholder="乙方公司"
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
                <el-form-item label="项目地址">
                  <el-input
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="项目地址"
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
                <el-form-item label="合同模板">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="合同模板"
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
                <el-form-item label="中介战略协议">
                  <el-select
                    v-model="queryPageParameters.employeeType"
                    clearable
                    placeholder="请选择中介战略协议"
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
        <el-button type="success">申领合同</el-button>
        <el-button type="success">派发合同</el-button>
        <el-button type="success">转派发</el-button>
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
        class="intermediary-table"
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
            width="200"
            align="left"
            fixed="right"
          >
            <template v-slot="{ row }">
              <el-link
                type="primary"
                @click.native.prevent="handleTo(row)"
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
export default class IntermediaryList extends Vue {
  public queryPageParameters: any = {};
  private searchOpen = true;
  private pageInfo: PageInfo = {
    total: 0,
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
      label: "甲方公司",
      align: "center",
      prop: "title",
      width: 100,
      fixed: true,
    },
    {
      label: "乙方公司",
      align: "center",
      prop: "title",
      width: 100,
      fixed: true,
    },
    {
      label: "项目地址",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "合作时间",
      align: "center",
      prop: "title",
      width: 200,
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
      label: "归属组织",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "合同编号",
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
      label: "合同跟进人",
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

<style lang="scss" scoped>
.intermediary-table {
  margin-top: 17px;
  .el-link + .el-link {
    margin-left: 15px;
  }
}
</style>
