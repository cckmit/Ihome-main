<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:28:28
 * @LastEditors: wwq
 * @LastEditTime: 2021-05-11 14:34:01
-->
<template>
  <div>
    <div class="setMeal">
      <p class="ih-info-title">收款信息</p>
      <div
        class="setMealButton"
        v-if="businessManagementChange"
      >
        <el-button
          size="small"
          type="success"
          @click="select"
        >选择</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.bankAccount"
        style="width: 100%"
      >
        <el-table-column
          prop="receiptMan"
          label="收款方"
        ></el-table-column>
        <el-table-column
          label="收款方账号"
          prop="receiptAccount"
        >
        </el-table-column>
      </el-table>
    </div>
    <br />
    <div class="setMeal">
      <p class="ih-info-title">成交归属组织</p>
      <div
        class="setMealButton"
        v-if="businessManagementChange"
      >
        <el-button
          size="small"
          type="success"
          @click="organSelect"
        >选择</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.group"
        style="width: 100%"
      >
        <el-table-column
          prop="groupName"
          label="末级组织"
        ></el-table-column>
        <el-table-column
          label="分公司"
          prop="startDivisionName"
        >
        </el-table-column>
      </el-table>
    </div>
    <br />
    <div>
      <p class="ih-info-title">特殊业绩比例方案</p>
      <div class="special">
        <div>是否使用特殊业绩比例方案</div>
        <div class="special-icon">
          <el-tooltip
            class="item"
            effect="dark"
            placement="bottom-start"
          >
            <div slot="content">业绩比例方案指我司内部员工业绩的分配方案，
              选择特殊业绩方案后本周期将不<br />使用分公司统一
              的业绩方案进行员工业绩分配，如需使用分公司
              统一业绩方案此<br />处不要进行配置</div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <div>
          <span class="text-ellipsis">{{ info.specialName }}</span>
        </div>
      </div>
    </div>
    <br />
    <div>
      <div v-if="['ServiAndAgen', 'Service'].includes(this.info.chargeEnum)">
        <p class="ih-info-title">其他渠道费配置</p>
        <div class="special">
          <div>是否使用本周期的其他渠道费用</div>
          <div class="special-icon">
            <el-tooltip
              class="item"
              effect="dark"
              placement="bottom-start"
            >
              <div slot="content">开启时该周期的成交报告优先使用本周期的其他渠道费用，
                关闭时提交成交报告<br />不使用本周期的其他渠道费用
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </div>
          <div class="margin-left-20">
            <el-switch
              v-model="info.exUseThisChannelFee"
              active-color="#ef9d39"
              inactive-color="#7b7b7b"
              :disabled="!businessManagementChange"
              @change="exUseThisChannelFeeChange"
            >
            </el-switch>
          </div>
        </div>
        <br />
      </div>
      <div class="special">
        <div>允许临时穿底</div>
        <div class="special-icon">
          <el-tooltip
            class="item"
            effect="dark"
            placement="bottom-start"
          >
            <div slot="content">开启后，当该项目周期提交成交报告其他
              渠道费用不足时，可先透支预提交（其<br />他渠道费用允许为负数）
            </div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <div class="margin-left-20">
          <el-switch
            v-model="info.exOver"
            active-color="#ef9d39"
            inactive-color="#7b7b7b"
            disabled
          >
          </el-switch>
        </div>
      </div>
      <br />
      <div class="special">
        <div>允许跨项目使用</div>
        <div class="special-icon">
          <el-tooltip
            class="item"
            effect="dark"
            placement="bottom-start"
          >
            <div slot="content">开启后，下面列表允许新增其他项目的周期，
              本周期可使用其他项目周期的其他<br />使用分公司统一渠道费用</div>
            <i class="el-icon-question" />
          </el-tooltip>
        </div>
        <div class="margin-left-20">
          <el-switch
            v-model="info.exOtherProChannelUse"
            active-color="#ef9d39"
            inactive-color="#7b7b7b"
            disabled
          >
          </el-switch>
        </div>
      </div>
      <br />
      <div>
        <div class="top">
          <div class="title">允许共享其他渠道费周期列表</div>
          <div class="right-button">
            <div style="margin-left: 20px">筛选</div>
            <el-select
              style="width: 50%"
              v-model="screen"
              clearable
              placeholder="请选择"
              @change="screenChange"
            >
              <el-option
                v-for="item in selectionOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <br />
      <el-table
        class="ih-table"
        :data="info.shareChannelFeeVOS"
        style="width: 100%"
      >
        <el-table-column
          label="周期名称"
          prop="termName"
        ></el-table-column>
        <el-table-column
          label="所属项目"
          prop="proName"
        >
        </el-table-column>
        <el-table-column
          label="已用其他渠道费金额"
          prop="amount"
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="shareStateEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.shareStateEnum, "ShareState")
          }}</template>
        </el-table-column>
      </el-table>
    </div>
    <ih-dialog :show="dialogVisible">
      <BankAccount
        :data="editData"
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => bankFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="organDialogVisible">
      <OrganizationJurisdiction
        :data="organData"
        @cancel="() => (organDialogVisible = false)"
        @finish="(data) => organFinish(data)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BankAccount from "../dialog/other-dialog/bankAccount.vue";
import OrganizationJurisdiction from "../dialog/other-dialog/organization.vue";
import {
  get_other_get__termId,
  post_other_busnissManage_saveReceipt,
  post_other_busnissManage_saveGroup,
  post_other_changUseThisChannelFee,
} from "@/api/project/index.ts";

@Component({
  components: { BankAccount, OrganizationJurisdiction },
})
export default class Other extends Vue {
  info: any = {
    exOver: false,
    exOtherProChannelUse: false,
    shareChannelFeeVOS: [],
    bankAccount: [],
    group: [],
  };
  editData: any = {};
  dialogVisible: any = false;
  organData: any = {};
  organDialogVisible: any = false;
  selectionOptions = [
    {
      code: "all",
      name: "全部",
    },
    {
      code: "Enable",
      name: "已启用",
    },
    {
      code: "Disable",
      name: "已禁用",
    },
  ];
  screen = "";

  private get businessManagementChange() {
    const businessManagementEdit =
      this.$route.name === "businessManagementEdit"; //路由判断
    return businessManagementEdit;
  }

  get termId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    if (this.termId) {
      this.info = await get_other_get__termId({
        termId: this.termId,
      });
      this.info.exOver = this.info.exOver ? true : false;
      this.info.exOtherProChannelUse = this.info.exOtherProChannelUse
        ? true
        : false;
      this.info.exUseThisChannelFee = this.info.exUseThisChannelFee
        ? true
        : false;
      if (this.info.receiptMan || this.info.receiptAccount) {
        this.info.bankAccount = [
          {
            receiptMan: this.info.receiptMan,
            receiptAccount: this.info.receiptAccount,
          },
        ];
      }
      if (this.info.startDivisionName || this.info.groupName) {
        this.info.group = [
          {
            startDivisionName: this.info.startDivisionName,
            groupName: this.info.groupName,
          },
        ];
      }
    }
  }

  select() {
    this.dialogVisible = true;
    this.editData.id = this.info.companyId;
  }

  async bankFinish(data: any) {
    await post_other_busnissManage_saveReceipt({
      receiptId: data,
      termId: this.termId,
    });
    this.getInfo();
    this.dialogVisible = false;
  }

  organSelect() {
    this.organDialogVisible = true;
    this.organData.id = this.info.startDivisionId;
  }

  async exUseThisChannelFeeChange(val: any) {
    this.info.exUseThisChannelFee = val;
    await post_other_changUseThisChannelFee({
      termId: this.termId,
      type: val ? 1 : 0,
    });
  }

  async organFinish(data: any) {
    await post_other_busnissManage_saveGroup({
      groupId: data[0].id,
      termId: this.termId,
    });
    this.getInfo();
    this.organDialogVisible = false;
  }

  screenChange(val: any) {
    switch (val) {
      case "Enable":
        this.info.shareChannelFeeVOS = this.info.shareChannelFeeVOS.filter(
          (v: any) => v.shareStateEnum === "Enable"
        );
        break;
      case "Disable":
        this.info.shareChannelFeeVOS = this.info.shareChannelFeeVOS.filter(
          (v: any) => v.shareStateEnum === "Disable"
        );
        break;
      case "all":
        this.getInfo();
        break;
    }
  }
}
</script>
<style lang="scss" scoped>
.setMeal {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.setMealButton {
  margin: 5px 0 0 20px;
}
.special {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
  &-icon {
    margin-left: 10px;
  }
}
.el-icon-question {
  font-size: 20px;
  color: #ef9d39;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  .title {
    font-size: 15px;
    text-align: center;
  }
  .right-button {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>