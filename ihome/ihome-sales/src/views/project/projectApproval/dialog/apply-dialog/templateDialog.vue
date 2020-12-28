<!--
 * @Description: 分销合同模板弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-30 09:53:42
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-25 10:02:31
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="900px"
    title="选择中介分销合同模板"
    class="text-left"
  >
    <el-table :data="resInfo.distributContractVOS">
      <el-table-column
        label="合同主标题"
        prop="contractTitle"
      ></el-table-column>
      <el-table-column
        label="甲方公司"
        prop="partyCompany"
      ></el-table-column>
      <el-table-column label="派发佣金标准">
        <template v-slot="{ row }">
          <template v-for="(item, i) in row.distributContractMxVOS">
            <span :key="i">
              <span>{{item.sendContext}}</span>
              <span v-if="i !== row.distributContractMxVOS.length - 1">、</span>
            </span>
          </template>
        </template>
      </el-table-column>
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
        label="操作"
        fixed="right"
        width="80"
      >
        <template v-slot="{ row }">
          <el-link
            type="primary"
            @click="handleOption(row)"
          >选择</el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { get_distributContract_get__termId } from "@/api/project/index";

@Component({})
export default class TemplateDialog extends Vue {
  @Prop() data!: any;
  private dialogVisible = true;

  private resInfo: any = {};

  cancel() {
    this.$emit("cancel", false);
  }
  handleOption(row: any) {
    row.city = this.resInfo.city;
    row.departmentOrgId = this.resInfo.startDivisionId;
    this.$emit("finish", row);
  }

  async created() {
    if (this.data.id) {
      this.resInfo = await get_distributContract_get__termId({
        termId: this.data.id,
      });
    }
  }
}
</script>
