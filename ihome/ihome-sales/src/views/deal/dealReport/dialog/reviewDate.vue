<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2021-01-25 15:43:45
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-25 16:05:13
-->
<template>
  <el-dialog
    v-dialogDrag
    title="审核业绩确认时间"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="300px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" :model="form" label-width="110px" @submit.native.prevent>
      <el-row>
        <el-col>
          <el-form-item label="确认时间">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
  export default class ReviewDate extends Vue {
    constructor() {
      super();
    }
    @Prop({default: null}) data: any;
    dialogVisible = true;
    public form: any = {
      date: null
    };

    created() {
      console.log(123);
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      this.$emit("finish", false);
    }
  }
</script>
<style lang="scss" scoped>
.dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px 20px 20px;
  }
}
</style>