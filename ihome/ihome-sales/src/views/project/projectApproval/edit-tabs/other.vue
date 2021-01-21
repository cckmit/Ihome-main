<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:28:28
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-21 20:28:51
-->
<template>
  <div>
    <div class="setMeal">
      <p class="ih-info-title">收款信息</p>
      <div class="setMealButton">
        <el-button
          size="small"
          type="success"
          @click="select"
          v-has="'B.SALES.PROJECT.TERMLIST.QTPZSKXX'"
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
      <div class="setMealButton">
        <el-button
          size="small"
          type="success"
          @click="organSelect"
          v-has="'B.SALES.PROJECT.TERMLIST.QTPZCJGSZZ'"
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
          <el-input
            placeholder="特殊业绩方案"
            v-model="info.specialName"
            class="input-with-select margin-left-10"
            style="width: 90%"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              v-has="'B.SALES.PROJECT.TERMLIST.QTPZTSYJ'"
              @click="specialClick"
            ></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <br />
    <div>
      <p class="ih-info-title">其他渠道费配置</p>
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
            @change="exOverChange"
            v-has="'B.SALES.PROJECT.TERMLIST.QTPZYXCD'"
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
            @change="exOtherProChannelUseChange"
            v-has="'B.SALES.PROJECT.TERMLIST.QTPZYXKXM'"
          >
          </el-switch>
        </div>
      </div>
      <br />
      <div>
        <div class="top">
          <div class="title">允许共享其他渠道费周期列表</div>
          <div class="right-button">
            <div style="width: 40px">筛选</div>
            <el-select
              style="width: 40%"
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
            <el-button
              type="success"
              size="small"
              @click="add"
              v-has="'B.SALES.PROJECT.TERMLIST.QTPZXZYXZQ'"
            >+新增允许周期</el-button>
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
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="routerTo(row)"
            >
              {{row.termName}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="所属项目"
          prop="proName"
        >
        </el-table-column>
        <el-table-column
          label="已用其他渠道费金额"
          prop="amount"
        >
          <template v-slot="{ row }">
            {{row.amount? row.amount : 0}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="shareStateEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.shareStateEnum, "Oper")
          }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="auto"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              v-if="row.shareStateEnum === 'Start'"
              size="small"
              type="info"
              @click="forbidden(row)"
              v-has="'B.SALES.PROJECT.TERMLIST.QTPZZQJY'"
            >禁用</el-button>
            <el-button
              v-if="row.shareStateEnum === 'Stop'"
              size="small"
              type="success"
              @click="start(row)"
              v-has="'B.SALES.PROJECT.TERMLIST.QTPZZQQY'"
            >启用</el-button>
            <el-button
              v-if="Number(row.amount) === 0"
              size="small"
              type="danger"
              @click="remove(row)"
              v-has="'B.SALES.PROJECT.TERMLIST.QTPZZQYC'"
            >移除</el-button>
          </template>
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
    <ih-dialog :show="approvalDialogVisible">
      <ProjectApproval
        :data="approvalData"
        @cancel="() => (approvalDialogVisible = false)"
        @finish="(data) => approvalFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="achieveDialogVisible">
      <AchieveScaleScheme
        :data="achieveData"
        @cancel="() => (achieveDialogVisible = false)"
        @finish="(data) => achieveFinish(data)"
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
import ProjectApproval from "../dialog/other-dialog/projectApproval.vue";
import AchieveScaleScheme from "../dialog/other-dialog/achieveScaleScheme.vue";
import OrganizationJurisdiction from "../dialog/other-dialog/organization.vue";
import {
  get_other_get__termId,
  post_other_changOver,
  post_other_changOtherProChannelUse,
  post_other_saveReceipt,
  post_other_saveGroup,
  post_other_saveSpecial,
  post_other_del,
  post_other_start,
  post_other_stop,
} from "@/api/project/index.ts";

@Component({
  components: {
    ProjectApproval,
    BankAccount,
    AchieveScaleScheme,
    OrganizationJurisdiction,
  },
})
export default class Other extends Vue {
  dialogVisible = false;
  approvalDialogVisible = false;
  achieveDialogVisible = false;
  organDialogVisible = false;
  approvalData: any = {};
  achieveData: any = {};
  organData: any = {};
  info: any = {
    exOver: false,
    exOtherProChannelUse: false,
    shareChannelFeeVOS: [],
    bankAccount: [],
    group: [],
  };
  editData: any = {};
  selectionOptions = [
    {
      code: "all",
      name: "全部",
    },
    {
      code: "Start",
      name: "已启用",
    },
    {
      code: "Stop",
      name: "已禁用",
    },
  ];
  screen = "";

  created() {
    this.getInfo();
  }

  get termId() {
    return this.$route.query.id;
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

  routerTo(row: any) {
    const item = this.$router.resolve({
      path: `/projectApproval/info`,
      query: {
        id: row.termId,
      },
    });
    window.open(item.href, "_blank");
  }

  async bankFinish(data: any) {
    await post_other_saveReceipt({
      receiptId: data,
      termId: this.$route.query.id,
    });
    this.getInfo();
    this.dialogVisible = false;
  }

  organSelect() {
    this.organDialogVisible = true;
    this.organData.id = this.info.startDivisionId;
  }

  async organFinish(data: any) {
    await post_other_saveGroup({
      groupId: data[0].id,
      termId: this.termId,
    });
    this.getInfo();
    this.organDialogVisible = false;
  }

  async exOverChange(val: any) {
    this.info.exOver = val;
    await post_other_changOver({
      termId: this.termId,
      type: val ? 1 : 0,
    });
  }

  async exOtherProChannelUseChange(val: any) {
    this.info.exOtherProChannelUse = val;
    await post_other_changOtherProChannelUse({
      termId: this.termId,
      type: val ? 1 : 0,
    });
  }

  screenChange(val: any) {
    switch (val) {
      case "Start":
        this.info.shareChannelFeeVOS = this.info.shareChannelFeeVOS.filter(
          (v: any) => v.shareStateEnum === "Start"
        );
        break;
      case "Stop":
        this.info.shareChannelFeeVOS = this.info.shareChannelFeeVOS.filter(
          (v: any) => v.shareStateEnum === "Stop"
        );
        break;
      case "all":
        this.getInfo();
        break;
    }
  }

  specialClick() {
    this.achieveData.id = this.info.startDivisionId;
    this.achieveDialogVisible = true;
  }

  async achieveFinish(data: any) {
    await post_other_saveSpecial({
      specialId: data[0].id,
      termId: this.$route.query.id,
    });
    this.getInfo();
    this.$message.success("新增成功");
    this.achieveDialogVisible = false;
  }

  add() {
    this.approvalDialogVisible = true;
    this.approvalData.exOver = this.info.exOtherProChannelUse ? 1 : 0;
    this.approvalData.termId = this.termId;
    this.approvalData.proId = this.info.proId;
  }

  async approvalFinish() {
    this.getInfo();
    this.approvalDialogVisible = false;
  }

  async forbidden(row: any) {
    await post_other_stop({
      shareId: row.shareId,
      termId: row.termId,
    });
    this.$message({
      type: "success",
      message: "禁用成功",
    });
    this.getInfo();
  }

  async start(row: any) {
    await post_other_start({
      shareId: row.shareId,
      termId: row.termId,
    });
    this.$message({
      type: "success",
      message: "启用成功",
    });
    this.getInfo();
  }

  async remove(row: any) {
    try {
      await this.$confirm("是否确定移除?", "提示");
      await post_other_del({
        shareId: row.shareId,
        termId: row.termId,
      });
      this.$message({
        type: "success",
        message: "移除成功",
      });
      this.getInfo();
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style lang="scss" scoped>
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

.setMeal {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.setMealButton {
  margin: 5px 0 0 20px;
}
</style>