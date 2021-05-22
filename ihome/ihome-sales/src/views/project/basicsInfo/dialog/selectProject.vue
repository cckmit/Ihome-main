<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-05-14 14:09:50
 * @LastEditors: zyc
 * @LastEditTime: 2021-05-22 11:45:28
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="80%"
    title="选择关联子项目"
    top="5vh"
  >
    <el-form ref="form" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              clearable
              v-model="queryPageParameters.proName"
              placeholder="推广名/备案名/明源楼盘名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目审核状态">
            <el-select
              v-model="queryPageParameters.auditEnum"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ProAudit')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否市场化项目">
            <el-select
              v-model="queryPageParameters.exMarket"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-col :span="8">
              <el-form-item label="关联明源">
                <el-select
                  v-model="queryPageParameters.exMinyuan"
                  clearable
                  placeholder="请选择"
                  class="width--100"
                >
                  <el-option
                    v-for="item in YesOrNoType"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="父/子项目">
                <el-select
                  :disabled="true"
                  v-model="queryPageParameters.exParent"
                  clearable
                  placeholder="请选择"
                  class="width--100"
                >
                  <el-option
                    v-for="item in ParOrChild"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="明源区域公司">
                <el-input
                  clearable
                  v-model="queryPageParameters.companyName"
                  placeholder="模糊搜索"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目盘编">
                <el-input
                  clearable
                  v-model="queryPageParameters.proNo"
                  placeholder="模糊搜索"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省市区">
                <IhCascader
                  v-model="provinceOption"
                  clearable
                  placeholder="请选择"
                  class="width--100"
                />
              </el-form-item>
            </el-col>
          </div>
        </el-collapse-transition>
      </el-row>
    </el-form>

    <div style="padding-left: 120px">
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>

        <el-button type="info" @click="reset()">重置</el-button>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
          >{{ searchOpen ? "收起" : "展开" }}</el-link
        >
      </el-row>
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
      <template #proNo>
        <el-table-column label="盘编" min-width="150">
          <template v-slot="{ row }">
            <span>
              <span
                v-if="
                  row.parentStats == 'Conduct' &&
                  row.parentId != parentId
                "
                style="color: red"
              >
                {{ row.proNo }}
              </span>
              <span v-else>
                {{ row.proNo }}
              </span>
            </span>

            <!-- <span
              class="proNo-text"
              v-if="row.originalParentId !== null && row.originalParentId != parentId"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="此项目正被其他项目关联，提交审核中，暂无法勾选关联"
                placement="top-start"
              >
                <span> {{ row.proNo }}</span>
              </el-tooltip>
            </span>
            <span v-if="row.originalParentId == null || row.originalParentId == parentId">
              {{ row.proNo }}
            </span> -->
          </template>
        </el-table-column>
      </template>
      <template #shichang>
        <el-table-column label="市场化项目/关联明源" min-width="100">
          <template v-slot="{ row }">
            <div>
              <span>{{ row.exMarket ? "是" : "否" }}</span
              >/<span>{{ row.exMinyuan ? "是" : "否" }}</span>
            </div>
          </template>
        </el-table-column>
      </template>
      <template #mingyuan>
        <el-table-column label="明源信息" min-width="200">
          <template v-slot="{ row }">
            <div>所属父项目：{{ row.parentName }}</div>
            <div>楼盘名：{{ row.myName }}</div>
            <div>区域公司：{{ row.companyName }}</div>
          </template>
        </el-table-column>
      </template>
      <template #area>
        <el-table-column label="省市区" width="120">
          <template v-slot="{ row }">
            <div>{{ $root.getAreaName(row.province) }}</div>
            <div>{{ $root.getAreaName(row.city) }}</div>
            <div>{{ $root.getAreaName(row.district) }}</div>
          </template>
        </el-table-column>
      </template>
      <template #shenhe>
        <el-table-column prop="auditEnum" label="项目审核状态" width="180">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.auditEnum, "ProAudit")
          }}</template>
        </el-table-column>
      </template>
      <template #caozuo>
        <el-table-column fixed="right" prop="" label="操作" width="60">
          <template v-slot="{ row }">
            <el-link type="primary" @click.native.prevent="goInfo(row)"
              >详情</el-link
            >
          </template>
        </el-table-column>
      </template>
    </IhTableCheckBox>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_project_getSonProjectList } from "../../../../api/project/index";
@Component({})
export default class SelectProject extends Vue {
  @Prop({
    default: () => [],
  })
  hasCheckedData!: any;

  @Prop() parentId: any; //当前项目id

  provinceOption: any = [];
  searchOpen = false;

  queryPageParameters: any = {
    proName: null,
    auditEnum: null,
    exMarket: null,
    exMinyuan: null,
    exParent: 0,
    companyName: null,
    proNo: null,
    proId: null,
    province: null,
    city: null,
    district: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  selection: any = [];
  private timeList: any = [];
  private dialogVisible = true;
  private pageSize = 10;
  private pageNum = 1;
  private rowKey: any = "proId";
  private tableMaxHeight: any = 350;
  YesOrNoType = [
    {
      code: 1,
      name: "是",
    },
    {
      code: 0,
      name: "否",
    },
  ];

  ParOrChild = [
    {
      code: 1,
      name: "父项目",
    },
    {
      code: 0,
      name: "子项目",
    },
  ];
  private tableColumn = [
    // {
    //   prop: "proNo",
    //   label: "盘编",
    //   minWidth: 170,
    // },
    {
      slot: "proNo",
    },
    {
      prop: "proName",
      label: "项目名称",
      minWidth: 120,
    },

    {
      slot: "shichang",
    },

    {
      slot: "mingyuan",
    },
    {
      slot: "area",
    },

    {
      prop: "proAddr",
      label: "项目地址",
      minWidth: 120,
    },
    {
      slot: "shenhe",
    },
    {
      slot: "caozuo",
    },
  ];

  goInfo(item: any) {
    window.open(`/web-sales/projects/childInfo?id=${item.proId}`);
  }

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
  openToggle() {
    this.searchOpen = !this.searchOpen;
  }
  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.achieveConfirmTimeStart = flag
      ? this.timeList[0]
      : null;
    this.queryPageParameters.achieveConfirmTimeEnd = flag
      ? this.timeList[1]
      : null;
    this.pageNum = 1;
    this.getList();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      termName: null,
      auditEnum: null,
      proId: null,
      startDivisionId: null,
      initiatorId: null,
      busTypeEnum: null,
      proNo: null,
      state: null,
      province: null,
      city: null,
      district: null,
      exParent: 0,
    });
    this.provinceOption = [];
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
    let res = await post_project_getSonProjectList({
      ...this.queryPageParameters,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
    this.resPageInfo = {
      ...res,
      list: res.list.map((i: any) => ({ ...i, fromDealId: i.id })),
    };
  }

  created() {
    this.getList();
  }
}
</script>
<style scoped>
.proNo-text {
  color: red;
}
</style>

