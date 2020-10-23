<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    :before-close="cancel"
    width="700px"
    class="dialog text-left"
    :title="Object.keys(data).length === 0 ? '添加房号' : '编辑房号'"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="当前栋座：">
            <el-input
              v-model="form.name"
              placeholder="当前栋座"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="添加方式：">
            <el-radio-group v-model="radio">
              <el-radio :label="1">单个添加</el-radio>
              <el-radio :label="2">批量添加</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="房号：" prop="number">
            <el-input
              v-model="form.number"
              placeholder="房号"
              maxlength="50"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="房屋户型：" prop="type">
            <el-select
              style="width: 100%"
              v-model="form.type"
              clearable
              placeholder="房屋户型"
            >
              <el-option
                v-for="item in $root.dictAllList('BankAccountTypeEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14" class="col-router">
          <el-link href="#">没有找到适合的户型?点击去添加户型</el-link>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">返 回</el-button>
      <el-button type="primary" @click="finish()">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class RoomNumEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    bank: null,
    name: null,
    number: null,
    type: null,
  };
  rules: any = {
    name: [{ required: true, message: "请输入栋座名称", trigger: "blur" }],
    number: [{ required: true, message: "请输入地上层数", trigger: "blur" }],
    type: [{ required: true, message: "请输入地下层数", trigger: "blur" }],
  };

  radio: any = 1;

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.$emit("finish", this.form);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    this.form = { ...this.data };
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
.ih-dialog {
  .el-form-item__content {
    margin-right: 40px;
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
.col-router {
  display: flex;
  align-items: flex-end;
  height: 40px;
  .el-link {
    display: inline-block;
    margin-left: 20px;
  }
}
</style>