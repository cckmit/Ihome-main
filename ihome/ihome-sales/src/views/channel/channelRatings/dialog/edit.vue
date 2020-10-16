<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-09 09:35:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-16 14:46:56
-->

<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="900px"
    class="dialog text-left"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="城市等级" prop="cityGrade">
            <el-select
              v-model="form.cityGrade"
              clearable
              placeholder="请选择城市等级"
            >
              <el-option
                v-for="item in $root.dictAllList('CityLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道等级" prop="channelGrade">
            <el-select
              v-model="form.channelGrade"
              clearable
              placeholder="请选择渠道等级"
            >
              <el-option
                v-for="item in $root.dictAllList('ChannelLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="评级项" prop="gradeItem">
            <el-input
              v-model="form.gradeItem"
              maxlength="32"
              placeholder="请输入评级项"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="评级标准" prop="gradeStandard">
            <el-input
              v-model="form.gradeStandard"
              maxlength="64"
              type="textarea"
              placeholder="请输入评级标准"
              :autosize="{ minRows: 2, maxRows: 4 }"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="所需材料" required>
            <el-checkbox-group v-model="form.standardAttachments">
              <el-row>
                <template
                  v-for="item in $root.dictAllList(
                    'ChannelLevelStandardAttachment'
                  )"
                >
                  <el-col :span="12" :key="item.code">
                    <el-checkbox
                      :label="item.code"
                      class="checkboxlist"
                      :title="item.name"
                      >{{ item.name }}</el-checkbox
                    >
                  </el-col>
                </template>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  post_channelGradeStandard_add,
  post_channelGradeStandard_edit,
} from "../../../../api/channel/index";

@Component({
  components: {},
})
export default class Edit extends Vue {
  constructor() {
    super();
  }
  @Prop() data: any;
  @Prop() editDialog: any;

  dialogVisible = true;
  form: any = {
    cityGrade: null,
    channelGrade: null,
    gradeItem: null,
    gradeStandard: null,
    standardAttachments: [],
  };

  private rules: any = {
    cityGrade: [{ required: true, message: "请选择城市等级", trigger: "blur" }],
    channelGrade: [
      { required: true, message: "请选择渠道等级", trigger: "blur" },
    ],
    gradeItem: [{ required: true, message: "请填写评级项", trigger: "blur" }],
    gradeStandard: [
      { required: true, message: "请填写评级标准", trigger: "blur" },
    ],
  };

  created() {
    if (this.editDialog === "edit") {
      const standardAttachments = this.data.channelGradeStandardAttachments.map(
        (v: any) => v.materialType
      );
      this.form = { ...this.data, standardAttachments };
    }
  }

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      if (this.form.standardAttachments.length) {
        if (this.editDialog === "add") {
          await post_channelGradeStandard_add(this.form);
          this.$message.success("保存成功!");
        } else {
          await post_channelGradeStandard_edit(this.form);
          this.$message.success("修改成功!");
        }
        this.$emit("finish");
      } else {
        this.$message.warning("请勾选所需材料!");
      }
    } else {
      console.log("error submit!!");
      return false;
    }
  }
}
</script>
<style lang="scss" scoped>
.checkboxlist {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  /deep/ .el-checkbox__label {
    display: inline;
  }
}
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
</style>
