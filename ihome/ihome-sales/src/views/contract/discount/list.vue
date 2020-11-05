<!--
 * @Description: 优惠告知书列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 16:27:36
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-05 14:31:51
-->
<template>
  <IhPage label-width="110px">
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
                v-model="queryPageParameters.noticeCode"
                placeholder="优惠告知书编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方">
              <el-select
                v-model="queryPageParameters.partyA"
                placeholder="甲方"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域">
              <el-input
                v-model="queryPageParameters.area"
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
                    v-model="queryPageParameters.ownerName"
                    clearable
                    placeholder="客户"
                    class="width--100"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户电话">
                  <el-input
                    v-model="queryPageParameters.ownerMobile"
                    placeholder="客户电话"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目名称">
                  <el-select
                    v-model="queryPageParameters.projectName"
                    clearable
                    placeholder="项目名称"
                    class="width--100"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="房号">
                  <el-select
                    v-model="queryPageParameters.roomNumber"
                    clearable
                    placeholder="房号"
                    class="width--100"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="优惠抵扣金额">
                  <el-input
                    v-model="queryPageParameters.deduction"
                    placeholder="优惠抵扣金额"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="优惠折扣比例">
                  <el-input
                    v-model="queryPageParameters.discount"
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
                <el-form-item label="立项周期">
                  <el-select
                    v-model="queryPageParameters.cycleId"
                    clearable
                    placeholder="立项周期"
                    class="width--100"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信息状态">
                  <el-select
                    v-model="queryPageParameters.state"
                    clearable
                    placeholder="信息状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('NoticeEnum.State')"
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          label="甲方"
          prop="partyA"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="区域"
          prop="area"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="乙方"
          prop="partyB"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="乙方联系电话"
          prop="partyBMobile"
          width="130"
        ></el-table-column>
        <el-table-column
          label="乙方证件号码"
          prop="partyBIdNo"
          width="160"
        ></el-table-column>
        <el-table-column
          label="乙方常用地址"
          prop="address"
          min-width="160"
        ></el-table-column>
        <el-table-column
          label="优惠项目名称"
          width="200"
          prop="projectName"
        ></el-table-column>
        <el-table-column
          label="(拟)购买单位"
          width="200"
          prop="room"
        ></el-table-column>
        <el-table-column
          label="优惠缴纳金额"
          prop="payment"
          width="120"
        ></el-table-column>
        <el-table-column
          label="优惠抵扣金额"
          prop="deduction"
          width="120"
        ></el-table-column>
        <el-table-column
          label="优惠折扣比例"
          prop="discount"
          width="120"
        ></el-table-column>
        <el-table-column
          label="优惠期限"
          width="195"
        >
          <template v-slot="{ row }">
            <span>{{row.beginTime | timestampToDate('YYYY-MM-DD')}} 至 {{row.endTime | timestampToDate('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="项目"
          prop="projectName"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="周期"
          prop="cycle"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="$router.push(`/discount/info?id=${row.id}`)"
            >详情</el-link>
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

import { post_notice_list } from "@/api/contract/index";

@Component({
  mixins: [PaginationMixin],
})
export default class DiscountList extends Vue {
  public queryPageParameters: any = {
    noticeCode: null,
    partyA: null,
    ownerName: null,
    ownerMobile: null,
    area: null,
    projectName: null,
    roomNumber: null,
    deduction: null,
    discount: null,
    beginTime: null,
    endTime: null,
    cycleId: null,
    state: null,
  };
  private timeList: any = [];
  private searchOpen = true;
  resPageInfo: PageInfo = {
    total: 0,
    list: [],
  };

  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private handleSelectionChange(val: any): void {
    console.log(val);
  }
  private handleSearch() {
    let sign = this.timeList && this.timeList.length;
    this.queryPageParameters.beginTime = sign ? this.timeList[0] : "";
    this.queryPageParameters.endTime = sign ? this.timeList[1] : "";
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReact(): void {
    Object.assign(this.queryPageParameters, {
      noticeCode: null,
      partyA: null,
      ownerName: null,
      ownerMobile: null,
      area: null,
      projectName: null,
      roomNumber: null,
      deduction: null,
      discount: null,
      beginTime: null,
      endTime: null,
      cycleId: null,
      state: null,
    });
    this.timeList = [];
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_notice_list(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
interface PageInfo {
  total: number;
  list: Array<object>;
}
</script>
