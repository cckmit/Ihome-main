<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-22 19:24:10
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-22 19:36:20
-->
<template>
  <el-dialog
    v-dialogDrag
    title="来访/成交信息"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <div class="info-detail-wrapper">
      <p class="ih-info-title margin-left">来访确认信息</p>
      <div class="info-wrapper">
        <div class="info-item-time">到访时间：2020-10-18</div>
        <div class="info-item">
          <div>到访审核人(销经)：李志忠</div>
          <div>到访审核时间(销经)：2020-10-18</div>
          <div>到访审核结果(销经)：通过</div>
        </div>
        <div class="info-item">
          <div>到访审核人(现管)：李志忠</div>
          <div>到访审核时间(现管)：2020-10-18</div>
          <div>到访审核结果(现管)：通过</div>
        </div>
      </div>
      <p class="ih-info-title margin-left">成交确认信息</p>
      <div class="info-wrapper">
        <div class="info-item">
          <div>成交审核人：李志忠</div>
          <div>成交审核时间：2020-10-18</div>
          <div>人脸识别结果：通过</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
    mixins: [],
  })
  export default class DealInfo extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;

    created() {
      // this.getListMixin();
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      this.$emit("finish", true);
    }
  }
</script>
<style lang="scss" scoped>
  .info-detail-wrapper {
    width: 100%;

    .margin-left {
      margin-left: 0px;
    }

    .info-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      //align-items: center;

      div {
        flex: 1;
        height: 30px;
        line-height: 30px;
      }

      .info-item {
        display: flex;
        flex-direction: row;
        align-items: center;

        div {
          flex: 1;
        }
      }
    }
  }
</style>