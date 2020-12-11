<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-09 17:28:20
-->
<template>
  <el-dialog
    v-dialogDrag
    title="新增/修改业务模式"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="finish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form
      v-loading="editLoading"
      :model="postData"
      :rules="rules"
      ref="modelForm"
      label-width="100px"
      class="demo-ruleForm">
      <el-row class="ih-info-line">
        <el-col>
          <el-form-item label="业务模式" prop="modelCode" class="width--100">
            <el-select
              v-model="postData.modelCode"
              @change="handleChange"
              clearable
              placeholder="业务模式"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="合同类型" prop="contTypeList" class="width--100">
            <el-checkbox-group v-model="postData.contTypeList" class="checkbox-align">
              <el-checkbox
                v-for="item in $root.dictAllList('ContType')"
                :key="item.code"
                :label="item.code"
                :disabled="!getByNameList.includes(item.code)">
                {{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="save()">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {
    post_buModelContType_add,
    post_buModelContType_get,
    post_buModelContType_update
  } from "@/api/deal";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {},
    mixins: [],
  })
  export default class AddModelDialog extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;

    postData: any = {
      modelCode: null,
      contTypeList: []
    };
    rules: any = {
      modelCode: [
        {required: true, message: "业务模式必选", trigger: "change"},
      ],
      contTypeList: [
        {required: true, message: "合同类型必选", trigger: "change"},
      ]
    };
    getByNameList: any = [];
    modelCode: any = null;
    editLoading: any = false;

    async created() {
      // console.log('业务模式', (this as any).$root.dictAllList('BusinessModel'));
      this.modelCode = this.data;
      if (this.modelCode) {
        this.editLoading = true;
        const res: any = await post_buModelContType_get({modelCode: this.modelCode});
        this.postData = res;
        await this.getModelContTypeList();
        this.$nextTick(() => {
          this.editLoading = false;
        })
      }
    }

    // 根据业务模式名称，获取对应的合同类型列表
    async getModelContTypeList() {
      const res: any = await post_buModelContType_get({modelCode: this.postData.modelCode});
      console.log('getModelContTypeList', res);
      this.getByNameList = res.contTypeList;
    }

    // 改变业务模式
    async handleChange() {
      this.postData.contTypeList = [];
      if (this.postData.modelCode) {
        await this.getModelContTypeList();
      }
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    // 保存
    async save() {
      (this.$refs["modelForm"] as ElForm).validate(this.addSave);
    }

    // 提交保存
    @NoRepeatHttp()
    async addSave(valid: any) {
      if (valid) {
        if (this.modelCode) {
          // 编辑模式
          // let postData: any = {
          //   modelCode: this.modelCode,
          //   contTypeList: []
          // };
          await post_buModelContType_update(this.postData);
          this.$message.success("编辑成功");
          await this.finish();
        } else {
          // 新增模式
          // let postData: any = {
          //   modelCode: this.postData.modelCode,
          //   contTypeList: this.postData.contTypeList
          // };
          await post_buModelContType_add(this.postData);
          this.$message.success("新增成功");
          await this.finish();
        }
      } else {
        this.$message.warning("请先填好数据再保存");
        return false;
      }
    }

    // 完成选择
    async finish() {
      this.$emit("finish");
    }
  }
</script>
<style lang="scss" scoped>
</style>