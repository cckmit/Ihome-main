<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    title="设置城市等级"
    class="text-left"
  >
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
    >
      <el-form-item label="城市等级">
        <el-select
          v-model="form.cityGrade"
          clearable
          placeholder="城市等级"
          class="width--100"
        >
          <el-option
            v-for="item in $root.dictAllList('CityLevel')"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
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

import { post_channelCityLevel_updateLevel } from "@/api/channel/index";

@Component({})
export default class LevelDialog extends Vue {
  @Prop({ default: [] }) data!: Array<object>;
  dialogVisible = true;
  form = {
    cityGrade: null,
    ids: this.data.map((v: any) => v.id),
  };

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      await post_channelCityLevel_updateLevel(this.form);
      this.$message.success("修改成功!");
      this.$emit("finish");
    } else {
      console.log("error submit!!");
      return false;
    }
  }
}
</script>
