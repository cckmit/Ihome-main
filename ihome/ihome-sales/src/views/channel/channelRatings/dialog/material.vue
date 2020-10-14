<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-09 09:35:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-14 14:32:30
-->

<template>
  <el-dialog
    v-dialogDrag
    :key="materialDialogVisible"
    :visible.sync="materialDialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="700px"
    class="dialog text-left"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="城市等级" prop="cityGrade">
            <span>
              {{ $root.dictAllName(form.cityGrade, "CityLevel").name }}
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道等级" prop="channelGrade">
            <span>{{
              $root.dictAllName(form.channelGrade, "ChannelLevel").name
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="所需材料">
            <template v-for="item in form.standardAttachments"
              ><div :key="item" class="bordersolid">
                {{
                  $root.dictAllName(item, "ChannelLevelStandardAttachment").name
                }}
              </div>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Edit extends Vue {
  @Prop() data: any;

  form: any = {
    cityGrade: null,
    channelGrade: null,
    standardAttachments: [],
  };

  created() {
    const standardAttachments = this.data.channelGradeStandardAttachments.map(
      (v: any) => v.materialType
    );
    this.form = { ...this.data, standardAttachments };
  }
  materialDialogVisible = true;
  cancel() {
    this.$emit("cancel", false);
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
}
.bordersolid {
  text-align: center;
  border: 1px solid #606266;

  & + & {
    border-top: none;
  }
}
</style>