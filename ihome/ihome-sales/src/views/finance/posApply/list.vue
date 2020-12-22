<!--
 * @Description: POS机申请事项信息列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-22 19:30:19
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-22 20:53:23
-->
<template>
  <IhPage label-width="80px">
    <template #form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="事项编号">
              <el-input
                v-model="queryPageParameters.itemNo"
                placeholder="请输入事项编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input
                v-model="queryPageParameters.applyUser"
                placeholder="请输入申请人"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事项类别">
              <el-select
                v-model="queryPageParameters.itemType"
                placeholder="请选择事项类别"
                clearable
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('PosItemType')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                placeholder="请选择状态"
                clearable
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('PosOperate')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联动项目">
              <el-input
                v-model="queryPageParameters.proId"
                placeholder="请选择联动项目"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button>领用</el-button>
        <el-button>申领</el-button>
        <el-button>调动</el-button>
        <el-button>退还</el-button>
        <el-button>归还</el-button>
      </el-row>
    </template>
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
          label="事项编号"
          prop="itemNo"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="applyUser"
        ></el-table-column>
        <el-table-column
          label="事项类别"
          prop="itemType"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.itemType, 'PosItemType')}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.status, 'PosOperate')}}
          </template>
        </el-table-column>
        <el-table-column
          label="事业部"
          prop="departmentName"
        ></el-table-column>
        <el-table-column
          label="店组"
          prop="groupName"
        ></el-table-column>
        <el-table-column
          label="联动项目"
          prop="proName"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{  }">
            <el-link type="primary">详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>领用</el-dropdown-item>
                <el-dropdown-item>领用审核</el-dropdown-item>
                <el-dropdown-item>领用寄出</el-dropdown-item>
                <el-dropdown-item>领用签收</el-dropdown-item>
                <el-dropdown-item>退还</el-dropdown-item>
                <el-dropdown-item>确认退还</el-dropdown-item>
                <el-dropdown-item>申领</el-dropdown-item>
                <el-dropdown-item>申领审核</el-dropdown-item>
                <el-dropdown-item>申领寄出</el-dropdown-item>
                <el-dropdown-item>申领签收</el-dropdown-item>
                <el-dropdown-item>归还</el-dropdown-item>
                <el-dropdown-item>确认归还</el-dropdown-item>
                <el-dropdown-item>调动</el-dropdown-item>
                <el-dropdown-item>调动审核</el-dropdown-item>
                <el-dropdown-item>调动寄出</el-dropdown-item>
                <el-dropdown-item>调动签收</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
import PaginationMixin from "../../../mixins/pagination";
import { post_posApplyItem_getList } from "../../../api/finance/index";

@Component({
  mixins: [PaginationMixin],
})
export default class POSApplyList extends Vue {
  queryPageParameters: any = {
    applyUser: null,
    itemNo: null,
    itemType: null,
    proId: null,
    status: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };

  private search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      applyUser: null,
      itemNo: null,
      itemType: null,
      proId: null,
      status: null,
    });
  }
  handleSelectionChange(val: any) {
    console.log(val);
  }
  async getListMixin() {
    this.resPageInfo = await post_posApplyItem_getList(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
}
</script>
