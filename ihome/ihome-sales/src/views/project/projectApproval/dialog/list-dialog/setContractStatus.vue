<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-01 16:51:36
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-01 17:36:32
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
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        label="合同类型"
        prop="contractTitle"
      ></el-table-column>
      <el-table-column
        label="合同主标题"
        prop="partyCompany"
      ></el-table-column>
      <el-table-column
        label="甲方公司"
        prop="partyCompany"
      ></el-table-column>
      <el-table-column
        prop="padCommissionEnum"
        label="是否垫佣"
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
        prop="partyCompany"
      ></el-table-column>
      <el-table-column
        label="申领权限"
        prop="partyCompany"
      ></el-table-column>
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
        type="primary"
        @click="setBusiness()"
      >批量设置业务线申领</el-button>
      <el-button
        size="small"
        type="primary"
        @click="setMiddleQueen()"
      >批量设置中后台申领</el-button>
      <el-button
        size="small"
        type="danger"
        @click="closeApple(row)"
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
// import { get_distributContract_getByTerm__termId } from "@/api/project/index";

@Component({})
export default class SetContractStatusDialog extends Vue {
  @Prop() data!: any;
  private dialogVisible = true;
  private selection: any = [];
  private tableData: any = [{}];

  async created() {
    // if (this.data.id) {
    //   this.resInfo = await get_distributContract_getByTerm__termId({
    //     termId: this.data.id,
    //   });
    // }
  }

  cancel() {
    this.$emit("cancel", false);
  }
  handleOption(row: any) {
    this.$emit("finish", row);
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }

  finish() {
    if (this.selection.length) {
      this.$emit("finish", this.selection);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }

  setBusiness() {
    console.log();
  }
  setMiddleQueen() {
    console.log();
  }
  closeApple() {
    console.log();
  }
}
</script>