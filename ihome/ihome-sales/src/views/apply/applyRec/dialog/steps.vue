<!--
 * @Description: 流程进度图
 * @version: 
 * @Author: ywl
 * @Date: 2021-02-08 16:19:01
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-16 18:19:11
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="90%"
    class="splitdialog text-left"
    title="流程进度图"
  >
    <el-steps
      :active="currentIndex"
      align-center
    >
      <template v-for="(i, n) in processList">
        <el-step
          :key="n"
          :title="i.processName"
          :description="i.time || '---'"
        ></el-step>
      </template>
    </el-steps>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { get_applyRec_getProcessList__applyId } from "../../../../api/apply/index";

@Component({})
export default class Steps extends Vue {
  @Prop() data!: any;
  dialogVisible = true;
  private currentIndex = 0;
  private processList: any = [];

  cancel() {
    this.$emit("cancel", false);
  }
  private async getProcess(applyId: any) {
    try {
      let list = await get_applyRec_getProcessList__applyId({ applyId });
      let index = list.map((i: any) => i.time).indexOf(null);
      console.log(list, index);
      this.currentIndex = index === -1 ? list.length : index;
      this.processList = list;
    } catch (error) {
      console.log(error);
    }
  }

  created() {
    this.getProcess(this.data);
  }
}
</script>