<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-29 11:04:59
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-30 14:05:18
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="85%"
    title="一手代理公司列表"
  >
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input
              v-model="info.name"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信用代码">
            <el-input
              v-model="info.creditCode"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select
              style="width: 100%"
              v-model="info.status"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in $root.dictAllList('CompanyStatus')"
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
          <el-form-item label="省市区">
            <IhCascader v-model="provinceOption"></IhCascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">
            <IhSelectPageUser
              v-model="info.inputUser"
              clearable
            >
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="padding-left-100">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
    </div>
    <br />
    <IhTableCheckBox
      :data="resPageInfo.list"
      :hasCheckedData="hasCheckedData"
      :rowKey="rowKey"
      :column="tableColumn"
      :maxHeight="tableMaxHeight"
      @selection-change="selectionChange"
      :pageSize="pageSize"
      :pageCurrent="pageNum"
      :pageTotal="resPageInfo.total"
      @page-change="pageChange"
      @size-change="sizeChange"
    >
      <template #province>
        <el-table-column label="省份">
          <template v-slot="{ row }">{{
            $root.getAreaName(row.province)
          }}</template>
        </el-table-column>
      </template>
      <template #city>
        <el-table-column label="城市">
          <template v-slot="{ row }">{{
            $root.getAreaName(row.city)
          }}</template>
        </el-table-column>
      </template>
      <template #county>
        <el-table-column label="行政区">
          <template v-slot="{ row }">{{
            $root.getAreaName(row.county)
          }}</template>
        </el-table-column>
      </template>
      <template #status>
        <el-table-column
          label="状态"
          width="150"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.status, "CompanyStatus")
          }}</template>
        </el-table-column>
      </template>
      <template #operation>
        <el-table-column
          label="操作"
          fixed="right"
          width="100"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              class="margin-left-16"
              :href="`/web-sales/firstAgency/info?id=${row.id}`"
              target="_blank"
            >详情</el-link>
          </template>
        </el-table-column>
      </template>
    </IhTableCheckBox>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_company_getList } from "@/api/project/index";

@Component({})
export default class Obligation extends Vue {
  @Prop({
    default: () => [],
  })
  @Prop()
  data!: any;
  info: any = {
    agencyName: null,
    creditCode: null,
    simpleName: null,
    province: null,
    city: null,
    followMan: null,
    status: null,
  };
  provinceOption: any = [];
  resPageInfo: any = {
    total: null,
    list: [],
  };
  hasCheckedData: any = [];
  selection: any = [];
  private dialogVisible = true;
  private pageSize = 10;
  private pageNum = 1;
  private rowKey: any = "id";
  private tableMaxHeight: any = 350;
  private tableColumn = [
    {
      label: "名称",
      prop: "name",
      minWidth: 250,
    },
    {
      label: "信用代码",
      prop: "creditCode",
      minWidth: 180,
    },
    {
      slot: "province",
    },
    {
      slot: "city",
    },
    {
      slot: "county",
    },
    {
      label: "录入人",
      prop: "inputUserName",
    },
    {
      slot: "status",
    },
    {
      slot: "operation",
    },
  ];

  private cancel(): void {
    this.$emit("cancel", false);
  }
  private finish(): void {
    if (this.selection.length) {
      this.$emit("finish", this.selection);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
  private reset() {
    Object.assign(this.info, {
      agencyName: null,
      creditCode: null,
      simpleName: null,
      province: null,
      city: null,
      followMan: null,
      status: null,
    });
    this.provinceOption = [];
  }
  private search() {
    this.info.province = this.provinceOption[0];
    this.info.city = this.provinceOption[1];
    this.pageNum = 1;
    this.getList();
  }
  // 获取选中项 --- 最后需要获取的数据
  private selectionChange(selection: any) {
    this.selection = selection;
  }
  private pageChange(val: number) {
    this.pageNum = val;
    this.getList();
  }
  private sizeChange(val: any) {
    this.pageSize = val;
    this.getList();
  }
  private async getList() {
    this.resPageInfo = await post_company_getList({
      ...this.info,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  created() {
    this.hasCheckedData = this.data.hasCheckedData;
    this.getList();
  }
}
</script>