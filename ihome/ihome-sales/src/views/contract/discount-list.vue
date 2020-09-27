<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 16:27:36
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-27 18:03:39
-->
<template>
  <IhPage>
    <!-- 搜索 -->
    <template #form>
      <el-form
        ref="form"
        label-width="110px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="优惠告知书编号">
              <el-input
                v-model="queryPageParameters.mobilePhone"
                placeholder="优惠告知书编号"
              ></el-input>
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
            <el-form-item label="区域">
              <el-input
                v-model="queryPageParameters.mobilePhone"
                placeholder="区域"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="客户"
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
                <el-form-item label="客户电话">
                  <el-input
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="客户电话"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目名称">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="项目名称"
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
                <el-form-item label="房号">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="房号"
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
                <el-form-item label="优惠抵扣金额">
                  <el-input
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="优惠抵扣金额"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="优惠折扣比例">
                  <el-input
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="优惠折扣比例"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="优惠期限">
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
                <el-form-item label="立项周期">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="立项周期"
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
                <el-form-item label="信息状态">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="信息状态"
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
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
    <!-- 按钮 -->
    <template #btn>
      <el-row>
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
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
        :columnCheck="false"
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
            width="120"
            align="left"
            fixed="right"
          >
            <template v-slot="{  }">
              <el-link
                type="primary"
                @click.native.prevent="$router.push('/contract/discountDetail')"
              >详情</el-link>
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
                  <el-dropdown-item @click.native.prevent="routerTo(row)">盖章版归档</el-dropdown-item>
                  <el-dropdown-item @click.native.prevent="routerTo(row)">原件归档</el-dropdown-item>
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
export default class DiscountList extends Vue {
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
      label: "甲方",
      align: "center",
      prop: "title",
      width: 100,
      fixed: true,
    },
    {
      label: "区域",
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
      label: "乙方联系电话",
      align: "center",
      prop: "title",
      width: 150,
    },
    {
      label: "乙方证件号码",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "乙方常用地址",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "优惠项目名称",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "(拟)购买单位",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "优惠缴纳金额",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "优惠抵扣金额",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "优惠折扣比例",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "优惠期限",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "项目",
      align: "center",
      prop: "title",
      width: 200,
    },
    {
      label: "周期",
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
