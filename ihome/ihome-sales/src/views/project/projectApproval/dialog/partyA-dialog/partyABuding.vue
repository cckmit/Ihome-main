<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-01 11:34:52
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-01 19:49:06
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="700px"
    class="dialog text-left"
    title="栋座归属信息"
  >
    <template v-for="(item, i) in data">
      <div :key="i">
        <p class="ih-info-title">{{item.companyName + '关联栋座'}}</p>
        <div style="margin-left: 20px">
          <el-checkbox-group
            v-model="item.buildingIds"
            size="small"
          >
            <el-checkbox-button
              class="checkBox"
              v-for="(list, i) in info"
              :label="list.buildingId"
              :key="i"
              border
            >{{list.buildingName}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
    </template>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_partyAContract_getBuilding__termId } from "@/api/project/index.ts";

@Component({
  components: {},
})
export default class PartyABuding extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  info: any = [];

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    this.$emit("finish", this.data);
  }

  async getInfo() {
    this.info = await post_partyAContract_getBuilding__termId({
      termId: this.$route.query.id,
    });
  }

  async created() {
    this.getInfo();
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog {
    margin-top: 8vh !important;
  }
}
.checkBox {
  margin: 0 0 10px 10px;
  border-left: 1px solid #dcdfe6;
  /deep/.el-checkbox-button__inner {
    border-left: none;
    border-radius: 0 0 0 0;
  }
}
</style>