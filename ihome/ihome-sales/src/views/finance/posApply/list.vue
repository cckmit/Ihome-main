<!--
 * @Description: POS机申请事项信息列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-22 19:30:19
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-20 16:28:33
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
              <IhSelectPageUser
                v-model="queryPageParameters.applyUser"
                clearable
              ></IhSelectPageUser>
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
                  v-for="(i, n) in posStatusList"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联动项目">
              <IhSelectPageByProject
                v-model="queryPageParameters.proId"
                placeholder="请选择联动项目"
                clearable
              ></IhSelectPageByProject>
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
        <el-dropdown
          trigger="click"
          class="margin-left-15"
        >
          <el-button type="success">
            申请操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              @click.native.prevent="handleApply('Use')"
              v-has="'B.SALES.FINANCE.POSAPPLYLIST.USE'"
            >领用</el-dropdown-item>
            <el-dropdown-item
              @click.native.prevent="handleApply('Apply')"
              v-has="'B.SALES.FINANCE.POSAPPLYLIST.APPLY'"
            >申领</el-dropdown-item>
            <el-dropdown-item
              @click.native.prevent="handleApply('Move')"
              v-has="'B.SALES.FINANCE.POSAPPLYLIST.MOVE'"
            >调动</el-dropdown-item>
            <el-dropdown-item
              @click.native.prevent="handleApply('Return')"
              v-has="'B.SALES.FINANCE.POSAPPLYLIST.RETURN'"
            >退还</el-dropdown-item>
            <el-dropdown-item
              @click.native.prevent="handleApply('GiveBack')"
              v-has="'B.SALES.FINANCE.POSAPPLYLIST.GIVEBACK'"
            >归还</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
          min-width="130"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="applyUserName"
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
            {{$root.dictAllName(row.status, 'PosTerminalStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          label="事业部"
          prop="departmentName"
          min-width="195"
        ></el-table-column>
        <el-table-column
          label="店组"
          prop="groupName"
          min-width="185"
        ></el-table-column>
        <el-table-column
          label="联动项目"
          prop="proName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="$router.push(`/posApply/info?id=${row.id}`)"
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
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'Draft'}"
                  @click.native.prevent="handleEdit(row)"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'Draft'}"
                  @click.native.prevent="remove(row)"
                >删除</el-dropdown-item>
                <template v-if="row.itemType === 'Use'">
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'UseWaitApprove'}"
                    @click.native.prevent="posOperate(row, 'UseApprove')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.USEAPPROVE'"
                  >领用审核</el-dropdown-item>
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'UseWaitSend'}"
                    @click.native.prevent="posOperate(row, 'UseSend')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.USESEND'"
                  >领用寄出</el-dropdown-item>
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'UseOneTheWay'}"
                    @click.native.prevent="posOperate(row, 'UseSign')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.USESIGN'"
                  >领用签收</el-dropdown-item>
                </template>
                <template v-if="row.itemType === 'Return'">
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'ReturnOnTheWay'}"
                    @click.native.prevent="posOperate(row, 'ReturnConfirm')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.RECONFIRM'"
                  >确认退还</el-dropdown-item>
                </template>
                <template v-if="row.itemType === 'Apply'">
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'ApplyWaitApprove'}"
                    @click.native.prevent="posOperate(row, 'ApplyApprove')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.APPLYAPPROVE'"
                  >申领审核</el-dropdown-item>
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'ApplyWaitSend'}"
                    @click.native.prevent="posOperate(row, 'ApplySend')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.APPLYSEND'"
                  >申领寄出</el-dropdown-item>
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'ApplyOnTheWay'}"
                    @click.native.prevent="posOperate(row, 'ApplySign')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.APPLIYSIGN'"
                  >申领签收</el-dropdown-item>
                </template>
                <template v-if="row.itemType === 'GiveBack'">
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'GiveBackOnTheWay'}"
                    @click.native.prevent="posOperate(row, 'GiveBackConfirm')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.GBCONFIRM'"
                  >确认归还</el-dropdown-item>
                </template>
                <template v-if="row.itemType === 'Move'">
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'MoveWaitApprove'}"
                    @click.native.prevent="posOperate(row, 'MoveApprove')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.MOVEAPPROVE'"
                  >调动审核</el-dropdown-item>
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'MoveWaitSend'}"
                    @click.native.prevent="posOperate(row, 'MoveSend')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.MOVESEND'"
                  >调动寄出</el-dropdown-item>
                  <el-dropdown-item
                    :class="{'ih-data-disabled': row.status !== 'MoveOnTheWay'}"
                    @click.native.prevent="posOperate(row, 'MoveSign')"
                    v-has="'B.SALES.FINANCE.POSAPPLYLIST.MOVESIGN'"
                  >调动签收</el-dropdown-item>
                </template>
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
    <!-- 弹窗 -->
    <IhDialog :show="dialogVisible">
      <Apply
        :isAdd="isAdd"
        :type="applyType"
        :itemId="itemId"
        @cancel="() => (dialogVisible = false)"
        @finish="() => {
          dialogVisible = false;
          getListMixin();
        }"
      />
    </IhDialog>
    <IhDialog :show="checkVisible">
      <CheckPos
        :applyType="applyItemType"
        :data="rowData"
        @cancel="() => (checkVisible = false)"
        @finish="() => {
          checkVisible = false;
          getListMixin();
        }"
      />
    </IhDialog>
    <IhDialog :show="sendVisible">
      <SendPos
        :applyType="applyItemType"
        :data="rowData"
        @cancel="() => (sendVisible = false)"
        @finish="() => {
          sendVisible = false;
          getListMixin();
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import Apply from "./dialog/apply.vue";
import CheckPos from "./dialog/checkPos.vue";
import SendPos from "./dialog/sendPos.vue";
import {
  post_posApplyItem_getList,
  post_posApplyItem_posOperate,
  post_posApplyItem_delete__id,
} from "../../../api/finance/index";

@Component({
  components: { Apply, CheckPos, SendPos },
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
  private dialogVisible = false;
  private applyType: any = null;
  private isAdd = true;
  private itemId: any = null;
  private checkVisible = false;
  private sendVisible = false;
  private rowData: any = null;
  private applyItemType: any = null;

  private get posStatusList() {
    const list = (this.$root as any).dictAllList("PosTerminalStatus");
    return list.filter((i: any) => i.tag.includes("PosItem"));
  }

  private async posOperate(row: any, type: string) {
    switch (type) {
      case "UseApprove":
      case "ApplyApprove":
      case "MoveApprove":
        this.rowData = { ...row };
        this.applyItemType = type;
        this.checkVisible = true;
        break;
      case "UseSend":
      case "ApplySend":
      case "MoveSend":
        this.rowData = { ...row };
        this.applyItemType = type;
        this.sendVisible = true;
        break;
      case "UseSign":
      case "ApplySign":
      case "MoveSign":
      case "GiveBackConfirm":
      case "ReturnConfirm":
        await this.$confirm(
          `是否确认${(this.$root as any).dictAllName(type, "PosOperate")}?`,
          "提示"
        );
        await post_posApplyItem_posOperate({
          id: row.id,
          operateType: type,
        });
        this.$message.success(
          `${(this.$root as any).dictAllName(type, "PosOperate")}成功`
        );
        this.getListMixin();
        break;
      default:
        break;
    }
  }
  private handleEdit(row: any) {
    this.isAdd = false;
    this.applyType = row.itemType;
    this.itemId = row.id;
    this.dialogVisible = true;
  }
  private handleApply(type: string) {
    this.applyType = type;
    this.isAdd = true;
    this.dialogVisible = true;
  }
  private async remove(row: any) {
    try {
      await this.$confirm("确认删除该事项?", "提示");
      await post_posApplyItem_delete__id({ id: row.id });
      // 删除list最后一条数据 返回前一页面
      if (this.resPageInfo.list.length === 1) {
        this.queryPageParameters.pageNum === 1
          ? (this.queryPageParameters.pageNum = 1)
          : this.queryPageParameters.pageNum--;
      }
      this.getListMixin();
      this.$message.success("删除成功");
    } catch (error) {
      console.log(error);
    }
  }
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
