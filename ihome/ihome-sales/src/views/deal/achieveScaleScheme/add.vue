<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-30 16:38:23
 * @LastEditors: lsj
 * @LastEditTime: 2020-10-30 16:38:23
-->
<template>
  <ih-page class="text-left">
    <p class="ih-info-title">业绩比例分配</p>
    <el-form
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="业务模式">
            <el-select
              v-model="postData.modelId"
              @change="handleChange"
              clearable
              placeholder="请选择业务模式"
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
        <el-col :span="6">
          <el-form-item label="合同类型">
            <el-select
              v-model="postData.contType"
              clearable
              placeholder="请选择合同类型"
              class="width--100">
              <el-option
                v-for="item in getByNameList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否市场化项目">
            <el-select
              v-model="postData.isMarketProject"
              clearable
              placeholder="请选择"
              class="width--100">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分销同步总包">
            <el-select
              v-model="postData.isSame"
              @change="handleChangeIsSame"
              clearable
              placeholder="请选择"
              class="width--100">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="物业类型">
            <el-checkbox-group v-model="postData.achievePropertyTypeList">
              <el-checkbox
                v-for="item in $root.dictAllList('PropertyEnum')"
                :key="item.code"
                :label="item.code">{{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="关联项目">
            <div class="link-pro-wrapper">
              <el-button type="success" @click="addRelatedProject">选择关联项目</el-button>
              <el-tag
                v-for="item in postData.achieveProjectList"
                :key="item.name"
                closable>
                {{item.name}}
              </el-tag>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注说明">
            <el-input v-model="postData.remarks" clearable placeholder="请输入备注说明"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      :model="tableModel"
      :rules="tableModel.rules"
      ref="tableForm"
      label-width="0"
      class="demo-ruleForm form-padding-20">
      <div class="add-all-wrapper">
        <el-button type="success" @click="addTotalPackage">添加总包</el-button>
        <el-button type="success" @click="addDistribution">添加分销</el-button>
      </div>
      <el-table
        class="ih-table"
        :max-height="500"
        :data="tableModel.tableData">
        <el-table-column prop="typeName" label="类别" min-width="100">
          <template slot-scope="scope">
            <el-form-item>{{scope.row.typeName}}</el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色" min-width="120">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.role'"
              :rules='tableModel.rules.role'>
              <el-select
                v-model="scope.row.role"
                @change="handleChangeRole($event, scope)"
                clearable
                :disabled="postData.isSame === 'yes' && scope.row.type === 'Distri'"
                placeholder="请选择角色"
                class="width--100">
                <el-option
                  v-for="item in $root.dictAllList('DealRole')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="ratio" label="拆分比例 (%)" min-width="120">
          <template slot-scope="scope">
            <!--              <el-input-number-->
            <!--                class="input-number-left"-->
            <!--                v-model="scope.row.ratio"-->
            <!--                @change.native="handleChangeRatio"-->
            <!--                :min="0" :max="100"-->
            <!--                :precision="2"-->
            <!--                :controls="false"-->
            <!--                placeholder="拆分比例"></el-input-number>-->
            <el-form-item
              :prop="'tableData.' + scope.$index + '.ratio'"
              :rules='tableModel.rules.ratio'>
              <el-input
                @keyup.native="handleChangeRatio(scope)"
                clearable
                :disabled="postData.isSame === 'yes' && scope.row.type === 'Distri'"
                v-model="scope.row.ratio"
                placeholder="拆分比例"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="missingRole" label="角色缺失处理方式" min-width="120">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.missingRole'"
              :rules='tableModel.rules.missingRole'>
              <el-select
                v-model="scope.row.missingRole"
                clearable
                :disabled="postData.isSame === 'yes' && scope.row.type === 'Distri'"
                placeholder="角色缺失处理方式"
                class="width--100">
                <el-option
                  v-for="item in $root.dictAllList('DealRole')"
                  :key="item.code"
                  :label="`计入${item.name}业绩`"
                  :value="item.code"
                  :disabled="scope.row.role === item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" min-width="160">
          <template slot-scope="scope">
            <el-form-item>
              <el-input
                v-model="scope.row.remarks"
                clearable
                :disabled="postData.isSame === 'yes' && scope.row.type === 'Distri'"
                placeholder="备注"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-form-item>
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAdd(scope)"
              >删除
              </el-link>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="text-center text-margin-top">
      <el-button type="success" @click="save()">保存</el-button>
      <el-button type="primary" @click="cancel()">取消</el-button>
    </div>
    <ih-dialog :show="dialogAdd" desc="选择关联项目">
      <RelatedProjectList
        @cancel="() => (dialogAdd = false)"
        @finish="
            (data) => {
              dialogAdd = false;
              finishAdd(data);
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import RelatedProjectList from "@/views/deal/achieveScaleScheme/related-project/list.vue";
  import {
    post_achieveScaleScheme_add,
    get_achieveScaleScheme_get__id,
    post_achieveScaleScheme_update,
    get_businessModel_getByName__modelName
  } from "@/api/deal";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {RelatedProjectList},
  })
  export default class AchieveScaleSchemeAdd extends Vue {
    postData: any = {
      modelId: null, // 业务模式ID
      contType: null, // 合同类型
      isMarketProject: null, // 是否市场化
      isSame: null, // 是否同步
      remarks: null, // 备注
      achievePropertyTypeList: [], // 物业类型[{propertyType: ""}]
      achieveProjectList: [], // 关联项目[{projectId: ""}]
      achieveScaleConfigList: [] // 业绩比例配置
    };
    rules: any = {
      modelName: [
        {required: true, message: "业务模式必选", trigger: "change"},
      ]
    };
    tableModel: any = {
      rules: {
        role: [
          {required: true, message: "业务模式必选", trigger: "blur"},
        ],
        ratio: [
          {required: true, message: "业务模式必选", trigger: "blur"},
        ],
        missingRole: [
          {required: true, message: "业务模式必选", trigger: "blur"},
        ]
      },
      tableData: []
    }
    id: any = null;
    companyId: any = null;
    dialogAdd: any = false;
    getByNameList: any = []; // 合同类型
    totalPackageList: any = []; // 总包
    distributionList: any = []; // 分销

    async created() {
      this.id = this.$route.query.id; // 业绩比例方案
      this.companyId = this.$route.query.companyId; // 分公司id
      if (this.id) {
        await this.initGetInfo()
      }
    }

    // 分销同步总包逻辑
    handleChangeIsSame(value: any) {
      console.log('value', value);
      if (value === 'yes') {
        this.distributionList = this.totalPackageList;
        this.distributionList.forEach((item: any) => {
          item.type = "Distri";
          item.typeName = "分销";
        })
      } else if (value === 'no') {
        console.log('value', value);
        this.distributionList = (this as any).$tool.deepClone(this.distributionList);
      }
    }

    // 修改比例
    handleChangeRatio(scope: any) {
      // console.log(scope);
      scope.row.ratio = scope.row.ratio.replace(/[^\d.]/g, ""); // 清除"数字"和以外的字符
      scope.row.ratio = scope.row.ratio.replace(/^\./g, ""); // 验证第一个字符是不是数字
      scope.row.ratio = scope.row.ratio.replace(/\.{2,}/g, "."); // 只保留第一个"."
      scope.row.ratio = scope.row.ratio.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      scope.row.ratio = scope.row.ratio.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
    }

    // 初始化编辑页面
    async initGetInfo() {
      const res: any = await get_achieveScaleScheme_get__id({id: this.id});
      this.postData = res;
      if (this.postData.achieveScaleConfigList && this.postData.achieveScaleConfigList.length > 0) {
        // 初始化
        this.totalPackageList = [];
        this.distributionList = [];
        this.postData.achieveScaleConfigList.forEach((list: any) => {
          if (list.type) {
            list.customizeId = list.id;
            switch (list.type) {
              // 总包
              case "TotalBag":
                this.totalPackageList.push(list);
                break;
              // 分销
              case "Distri":
                this.distributionList.push(list);
                break;
            }
          }
        })
      }
    }

    // 根据业务模式名称，获取对应的合同类型列表
    async getModelContTypeList() {
      const contTypeList = (this as any).$root.dictAllList('ContType');
      const res: any = await get_businessModel_getByName__modelName({modelName: this.postData.modelId});
      // console.log('getModelContTypeList', res);
      if (contTypeList && contTypeList.length > 0 && res && res.length > 0) {
        this.getByNameList = contTypeList.filter((list: any) => {
          return res.includes(list.code);
        });
      } else {
        this.getByNameList = [];
      }
    }

    // 改变业务模式
    async handleChange(value: any) {
      // console.log('valuevalue', value);
      this.postData.contType = null;
      this.getByNameList = [];
      if (value) {
        await this.getModelContTypeList();
      }
    }

    async addRelatedProject() {
      this.dialogAdd = true;
    }

    async finishAdd(data: any) {
      console.log('data', data);
    }

    // 新增总包
    async addTotalPackage() {
      let obj = {
        customizeId: new Date().getTime() + this.tableModel.tableData.length, // 自定义id，主要用于删除
        type: "TotalBag",
        typeName: "总包",
        role: null,
        ratio: null,
        missingRole: null,
        remarks: null
      }
      if (this.tableModel.tableData && this.tableModel.tableData.length > 0) {
        let lastIndex = null;
        this.tableModel.tableData.forEach((data: any, index: any) => {
          if (data.type === 'TotalBag') {
            lastIndex = index;
          }
        })
        if (lastIndex !== null) {
          this.tableModel.tableData.splice(lastIndex + 1, 0, obj)
        } else {
          this.tableModel.tableData.unshift(obj);
        }
      } else {
        this.tableModel.tableData.push(obj);
      }
      // this.$nextTick(() => {
      //   (this as any).$refs.tableForm.clearValidate(); // 清空校验
      // })
    }

    // 新增分销
    async addDistribution() {
      let obj = {
        customizeId: new Date().getTime() + this.tableModel.tableData.length, // 自定义id，主要用于删除
        type: "Distri",
        typeName: "分销",
        role: null,
        ratio: null,
        dealByMissing: null,
        remarks: null
      }
      this.tableModel.tableData.push(obj);
      // this.$nextTick(() => {
      //   (this as any).$refs.tableForm.clearValidate();
      // })
    }

    // 删除总包/分销
    async deleteAdd(scope: any) {
      console.log(scope);
      try {
        await this.$confirm("是否确定删除?", "提示");
        if (this.tableModel.tableData && this.tableModel.tableData.length > 0) {
          this.tableModel.tableData = this.tableModel.tableData.filter((data: any) => {
            return data.customizeId !== scope.row.customizeId;
          })
        }
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } catch (error) {
        console.log(error);
      }
    }

    // 改变角色选项时的逻辑
    handleChangeRole(value: any, scope: any) {
      // console.log('eeee', value);
      console.log('scope', scope);
      if (value) {
        if (value === scope.row.missingRole) {
          scope.row.missingRole = null;
        }
      } else {
        scope.row.missingRole = null;
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
          let postData: any = {
            id: this.id,
            modelName: this.postData.modelName
          };
          await post_achieveScaleScheme_update(postData);
          this.$message.success("编辑成功");
          this.$goto({
            path: "/achieveScaleScheme/list",
          });
        } else {
          let postData: any = {
            id: this.id,
            modelName: this.postData.modelName
          };
          await post_achieveScaleScheme_add(postData);
          this.$message.success("新增成功");
          this.$goto({
            path: "/achieveScaleScheme/list",
          });
        }
      } else {
        this.$message.warning("请先填好数据再保存");
        return false;
      }
    }

    // 取消
    async cancel() {
      this.$router.push({
        path: "/achieveScaleScheme/list"
      });
    }
  }
</script>
<style lang="scss" scoped>
  .link-pro-wrapper {
    width: 100%;

    .el-button, .el-tag {
      margin-right: 10px;
    }
  }

  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .input-number-left {
    /deep/ .el-input__inner {
      text-align: left;
    }
  }

  .form-padding-20 {
    padding-left: 20px;
  }

  .text-margin-top {
    margin-top: 20px;
  }
</style>
