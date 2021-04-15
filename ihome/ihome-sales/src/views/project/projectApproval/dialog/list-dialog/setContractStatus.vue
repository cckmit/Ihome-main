<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-01 16:51:36
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-15 09:43:03
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    title="设置合同申领状态"
    class="text-left"
  >
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      ref="table"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="contractKind"
        label="合同类型"
        width="200"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.contractKind, "ContractKind")
          }}</template>
      </el-table-column>
      <el-table-column
        label="合同主标题"
        prop="contractTitle"
        width="200"
      ></el-table-column>
      <el-table-column
        label="甲方公司"
        prop="partyCompany"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="padCommissionEnum"
        label="是否垫佣"
        width="80"
      >
        <template v-slot="{ row }">{{
          $root.dictAllName(row.padCommissionEnum, "PadCommission")
        }}</template>
      </el-table-column>
      <el-table-column
        prop="channelEnum"
        label="渠道类型"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.channelEnum, "ChannelCustomer")
          }}</template>
      </el-table-column>
      <el-table-column
        label="是否可申领"
        prop="exClaim"
      >
        <template v-slot="{ row }">{{
          $root.dictAllName(row.exClaim, "YesOrNoType")
        }}</template>
      </el-table-column>
      <el-table-column
        label="申领权限"
        prop="claimPower"
      >
        <template v-slot="{ row }">{{
          $root.dictAllName(row.claimPower, "ClaimPower")
        }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="150"
        align="center"
      >
        <template v-slot="{ row }">
          <el-button
            size="small"
            type="success"
            @click="handleOption(row)"
          >切换申领状态</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <div>
      <el-button
        size="small"
        type="success"
        @click="setStatus('Business')"
      >批量设置业务线申领</el-button>
      <el-button
        size="small"
        type="success"
        @click="setStatus('MiddleAndBack')"
      >批量设置中后台申领</el-button>
      <el-button
        size="small"
        type="danger"
        @click="setStatus(null)"
      >批量关闭申领</el-button>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  post_distributContract_getLinkDistractList__termId,
  post_distributContract_getChannelDistractList__termId,
  post_distributContract_setLinkDistractStatus,
  post_distributContract_setChannelDistractStatus,
} from "@/api/project/index";

@Component({})
export default class SetContractStatusDialog extends Vue {
  @Prop() data!: any;
  dialogVisible = true;
  selection: any = [];
  tableData: any = [];

  async created() {
    if (this.data.id) {
      if (this.data.type === "start") {
        this.getStartInfo();
      } else {
        this.getNoStartInfo();
      }
    }
  }

  async getStartInfo() {
    const res = await post_distributContract_getLinkDistractList__termId({
      termId: this.data.id,
    });
    this.tableData = res;
  }

  async getNoStartInfo() {
    const res = await post_distributContract_getChannelDistractList__termId({
      termId: this.data.id,
    });
    this.tableData = res;
  }

  cancel() {
    this.$emit("cancel", false);
  }
  handleOption(row: any) {
    let num = 0;
    let obj: any = {};
    switch (row.claimPower) {
      case "Business":
        num = 1;
        break;
      case "MiddleAndBack":
        num = 2;
        break;
      default:
        num = 0;
        break;
    }
    num++;
    obj = this.setTableData(row, num);
    const index = this.tableData.findIndex(
      (v: any) => v.agencyContrictId === row.agencyContrictId
    );
    this.$set(this.tableData, index, obj);
  }

  setTableData(data: any, type: number) {
    switch (type) {
      case 1:
        return Object.assign(data, { exClaim: "Yes", claimPower: "Business" });
      case 2:
        return Object.assign(data, {
          exClaim: "Yes",
          claimPower: "MiddleAndBack",
        });
      case 3:
        return Object.assign(data, { exClaim: "No", claimPower: null });
    }
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }

  async finish() {
    if (this.selection.length) {
      let arr: any = [];
      arr = this.selection.map((v: any) => ({
        agencyContrictId: v.agencyContrictId,
        exClaim: v.exClaim,
        claimPower: v.claimPower,
      }));
      if (this.data.type === "start") {
        try {
          await post_distributContract_setLinkDistractStatus(arr);
          this.$emit("finish");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await post_distributContract_setChannelDistractStatus(arr);
          this.$emit("finish");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }

  setStatus(type: any) {
    if (this.selection.length) {
      this.selection.forEach((v: any, i: number) => {
        this.$set(this.tableData, i, {
          ...v,
          exClaim: type ? "Yes" : "No",
          claimPower: type,
        });
      });
      this.selection.forEach((v: any) => {
        const item = this.tableData.find(
          (j: any) => j.agencyContrictId === v.agencyContrictId
        );
        (this.$refs.table as any).toggleRowSelection(item, true);
      });
    } else {
      this.$message.warning("请勾选表格数据");
    }
  }
}
</script>