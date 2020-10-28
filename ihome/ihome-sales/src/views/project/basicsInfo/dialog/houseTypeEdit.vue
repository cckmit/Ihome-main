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
    :title="Object.keys(data).length === 0 ? '新增户型' : '编辑户型'"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="户型图：">
            <ih-upload
              :file-list="fileList"
              accept="image/*"
              size="100px"
            ></ih-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="户型名称：" prop="number">
            <el-input
              v-model="form.number"
              placeholder="户型名称"
              maxlength="200"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="户型面积：" prop="number">
            <div style="display: flex; justify-contant: flex-start">
              <el-input
                v-model.number="form.number"
                placeholder="户型面积"
                maxlength="50"
              ></el-input>
              <span style="width: 30px; margin-left: 10px">m²</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="户型：" prop="type">
            <div style="display: flex; justify-contant: flex-start">
              <el-select v-model="form.number" clearable>
                <el-option
                  v-for="item in numOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span style="padding: 0 8px">室</span>
              <el-select v-model="form.number" clearable>
                <el-option
                  v-for="item in numOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span style="padding: 0 8px">厅</span>
              <el-select v-model="form.number" clearable>
                <el-option
                  v-for="item in numOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span style="padding: 0 8px">厨</span>
              <el-select v-model="form.number" clearable>
                <el-option
                  v-for="item in numOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span style="padding: 0 8px">卫</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="朝向：" prop="type">
            <el-select v-model="form.number" clearable>
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
export default class HouseTypeEdit extends Vue {
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

  fileList: any = [];

  numOptions: any = [
    {
      value: 0,
    },
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
    {
      value: 6,
    },
    {
      value: 7,
    },
    {
      value: 8,
    },
    {
      value: 9,
    },
  ];

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