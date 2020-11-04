<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-03 15:30:12
-->
<template>
  <el-dialog
    v-dialogDrag
    title="新增/修改业务模式"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="finish"
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form
      v-loading="editLoading"
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row class="ih-info-line">
        <el-col>
          <el-form-item
            label="业务模式"
            prop="modelName"
            class="width--100"
          >
            <el-select
              v-model="postData.modelName"
              @change="handleChange"
              clearable
              placeholder="业务模式"
              class="width--100"
            >
              <el-option
                v-for="item in divisionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item
            label="合同类型"
            prop="buModelContTypeList"
            class="width--100"
          >
            <el-checkbox-group v-model="postData.buModelContTypeList" class="checkbox-align">
              <el-checkbox
                v-for="item in contractTypeList"
                :key="item.label"
                :label="item.label"
                :disabled="item.disabled">
                {{item.value}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="save()">保存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {
    post_businessModel_add,
    get_businessModel_get__id,
    post_businessModel_update,
    get_businessModel_getByName__modelName
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
      modelName: null,
      buModelContTypeList: []
    };
    rules: any = {
      modelName: [
        {required: true, message: "业务模式必选", trigger: "change"},
      ],
      buModelContTypeList: [
        {required: true, message: "合同类型必选", trigger: "change"},
      ]
    };
    divisionList: any = [
      {
        value: "TotalBagModel",
        label: "总包模式"
      },
      {
        value: "DistriModel",
        label: "分销模式"
      },
      {
        value: "TotalBagDistriModel",
        label: "总包+分销模式"
      },
      {
        value: "UnderwritingModel",
        label: "承销"
      }
    ];
    contractTypeList: any = [
      {
        value: "分销成交",
        label: "DistriDeal",
        disabled: false
      },
      {
        value: "自然来访成交",
        label: "NaturalVisitDeal",
        disabled: false
      },
      {
        value: "自渠成交",
        label: "SelfChannelDeal",
        disabled: false
      },
      {
        value: "自行成交",
        label: "SelfDeal",
        disabled: false
      },
    ]
    id: any = null;
    editLoading: any = false;

    async created() {
      this.id = localStorage.getItem('editModelId');
      if (this.id) {
        this.editLoading = true;
        const res: any = await get_businessModel_get__id({id: this.id});
        this.postData = res;
        await this.getModelContTypeList();
        this.$nextTick(() => {
          this.editLoading = false;
        })
      }
    }

    // 根据业务模式名称，获取对应的合同类型列表
    async getModelContTypeList() {
      const res: any = await get_businessModel_getByName__modelName({modelName: this.postData.modelName});
      // console.log('getModelContTypeList', res);
      if (res && res.length > 0) {
        this.contractTypeList.forEach((list: any) => {
          if (res.includes(list.label)) {
            list.disabled = false;
          } else {
            list.disabled = true;
          }
        })
      } else {
        this.contractTypeList.forEach((list: any) => {
          list.disabled = false;
        })
      }
    }

    // 改变业务模式
    async handleChange() {
      this.postData.buModelContTypeList = [];
      if (this.postData.modelName) {
        await this.getModelContTypeList();
      } else {
        // 默认全可选
        this.contractTypeList.forEach((list: any) => {
          list.disabled = false;
        })
      }
    }

    // 保存
    async save() {
      (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
    }

    @NoRepeatHttp()
    async addSave(valid: any) {
      if (valid) {
        if (this.id) {
          // 编辑模式
          let postData: any = {
            id: this.id,
            modelName: this.postData.modelName,
            buModelContTypeList: []
          };
          if (this.postData.buModelContTypeList.length > 0) {
            this.postData.buModelContTypeList.forEach((list: any) => {
              postData.buModelContTypeList.push(
                {
                  contType: list
                }
              )
            })
          }
          await post_businessModel_update(postData);
          this.$message.success("编辑成功");
          await this.finish();
        } else {
          // 新增模式
          let postData: any = {
            modelName: this.postData.modelName,
            buModelContTypeList: []
          };
          if (this.postData.buModelContTypeList.length > 0) {
            this.postData.buModelContTypeList.forEach((list: any) => {
              postData.buModelContTypeList.push(
                {
                  contType: list
                }
              )
            })
          }
          await post_businessModel_add(postData);
          this.$message.success("新增成功");
          await this.finish();
        }
      } else {
        this.$message.warning("请先填好数据再保存");
        return false;
      }
    }

    async finish() {
      this.$emit("finish");
    }
  }
</script>
<style lang="scss" scoped>
</style>