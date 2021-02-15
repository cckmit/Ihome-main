<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-18 16:30:42
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-15 11:36:25
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="85%"
    class="splitdialog text-left"
    title="流程进度图"
  >
    <el-steps :active="currentIndex" align-center>
      <template v-for="(item, index) in dicts">
        <el-step
          :key="index"
          :title="item.result"
          :description="item.operateTime"
        ></el-step>
      </template>
    </el-steps>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Progress extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  private info: any = [];
  currentIndex = 0;

  private dicts: any = [];

  cancel() {
    this.$emit("cancel", false);
  }

  created() {
    console.log(this.data);
    this.dicts = this.data;
    for (let index = 0; index < this.dicts.length; index++) {
      const element = this.dicts[index];
      if (element.flag == 1) {
        this.currentIndex = index + 1;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>