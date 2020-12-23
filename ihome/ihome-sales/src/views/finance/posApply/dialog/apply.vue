<!--
 * @Description: 申领POS机事项
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-23 09:57:33
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-23 11:15:30
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="80%"
    title="POS机申领事项"
  >
    <div>
      <p class="ih-info-title">POS申请事项信息</p>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事项类别"
              prop="account"
            >
              <el-select
                v-model="form.xx"
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="申请人"
              prop="account"
            >
              <el-input v-model="form.xx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="店组"
              prop="account"
            >
              <el-input v-model="form.xx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="account"
            >
              <el-input v-model="form.xx"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联动项目"
              prop="account"
            >
              <el-input v-model="form.xx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">
        <span>POS机列表</span>
        <el-button
          type="primary"
          class="add"
          size="small"
        >添加</el-button>
      </p>
      <div class="padding-left-20">
        <br />
        <el-table class="ih-table width--100">
          <el-table-column
            label="账户名称"
            fixed
          ></el-table-column>
          <el-table-column label="账号"></el-table-column>
          <el-table-column label="产品型号"></el-table-column>
          <el-table-column label="序列号"></el-table-column>
          <el-table-column label="状态"></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
          ></el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">备注</p>
      <div class="padding-left-20">
        <el-input
          type="textarea"
          placeholder="请填写备注信息"
          :rows="5"
        ></el-input>
      </div>
    </div>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ApplyDialog extends Vue {
  private dialogVisible = true;
  private form: any = {};
  private rules: any = {};

  cancel(): void {
    this.$emit("cancel", false);
  }
}
</script>

<style lang="scss" scoped>
.ih-info-title {
  position: relative;
  .add {
    position: absolute;
    top: 0px;
    left: 120px;
    transform: translate(0, -30%);
  }
}
</style>
