<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="agentFrom"
      label-width="120px"
      class="text-left"
    >
      <el-form-item
        label="渠道商名称"
        v-if="!isAdd"
      >
        <span>{{ data.name }}</span>
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="mobile"
      >
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="结佣权限">
        <el-radio-group v-model="form.settlementFlag">
          <template v-for="item in $root.dictAllList('HasOrNoType')">
            <el-radio
              :label="item.code"
              :key="item.code"
            >{{item.name}}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import {
  post_channelAgent_add,
  post_channelAgent_edit,
} from "@/api/channel/index";

@Component({})
export default class AgentDialog extends Vue {
  @Prop() isAdd!: boolean;
  @Prop() channelId!: string;
  @Prop({ default: null }) data: any;
  private dialogVisible = true;
  form: any = {
    name: "",
    mobile: "",
    email: "",
    settlementFlag: "Has",
    status: "Valid",
  };

  private rules: object = {
    name: [
      { required: true, message: "请输入姓名", trigger: "blur" },
      { max: 32, message: "字符长度不能大于32", trigger: "blur" },
    ],
    mobile: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      { max: 16, message: "字符长度不能大于16", trigger: "blur" },
    ],
    email: [
      {
        type: "email",
        max: 64,
        message: "字符长度不能大于16",
        trigger: "blur",
      },
    ],
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["agentFrom"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.isAdd
        ? await post_channelAgent_add({
            ...this.form,
            chanelId: this.channelId,
          })
        : await post_channelAgent_edit({
            ...this.form,
            chanelId: this.channelId,
          });
      this.$emit("finish", this.isAdd);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  created() {
    this.form = this.data;
  }
}
</script>
