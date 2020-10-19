<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 14:34:44
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-15 18:01:43
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="变更经办人"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    top="20px"
    style="text-align: left"
    class="dialog user-job-role-dialog"
  >
    <p class="ih-info-title">已选渠道商</p>

    <div class="margin-left-30">
      <div v-for="(item, index) in data" :key="index" class="text-item">
        {{ item.approvalNo }}
      </div>
    </div>
    <p class="ih-info-title">选择变更人</p>

    <el-form
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="选择用户" prop="userId">
        <el-select v-model="postData.userId" placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { post_channelApproval_modifyApprovalUser } from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class ApprovalChangeUser extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  rules: any = {
    userId: [{ required: true, message: "用户必选", trigger: "change" }],
  };
  postData: any = {
    ids: [],
    userId: null,
  };
  userList: any = [
    {
      id: 1,
      name: "测试1",
    },
    {
      id: 2,
      name: "测试2",
    },
  ];

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.postData.ids = this.data.map((item: any) => {
        return item.id;
      });
      console.log(this.postData);
      await post_channelApproval_modifyApprovalUser(this.postData);

      this.$message.success("更改成功");
      this.$emit("finish", true);
    }
  }

  async created() {
    console.log(this.data);
  }
}
</script>
<style lang="scss" >
.text-item {
  padding: 5px;
}
</style>