<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-08 20:54:08
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-08 21:09:13
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    class="dialog text-left"
    title="收款信息"
  >
    <el-table
      class="ih-table"
      :data="info"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="accountName"
        label="账户名称"
      ></el-table-column>
      <el-table-column
        prop="accountNo"
        label="账号"
      ></el-table-column>
      <el-table-column
        prop="accountType"
        label="账号类型"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.accountType, 'BankAccountTypeEnum')
          }}</template>
      </el-table-column>
      <el-table-column
        prop="branchName"
        label="开户银行"
      >
      </el-table-column>
      <el-table-column
        prop="branchNo"
        label="银联号"
      >
      </el-table-column>
    </el-table>
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
import { get_bankAccount_get__companyId } from "@/api/finance/index";
@Component({
  components: {},
})
export default class BankAccount extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  selection = [];
  info: any = [];

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }
  handleSelect(selection: any) {
    if (selection.length > 1) {
      let row = selection.shift();
      (this.$refs.multipleTable as any).toggleRowSelection(row, false);
    }
  }
  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    this.$emit("finish");
  }
  async created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.info = await get_bankAccount_get__companyId({
        companyId: this.data.id,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.ih-table {
  /deep/ .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>