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
        <el-col :span="8">
          <el-form-item label="业务模式" prop="modelId">
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
        <el-col :span="8">
          <el-form-item label="合同类型" prop="contType">
            <el-select
              v-model="postData.contType"
              clearable
              no-data-text="请先选择业务模式"
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
        <el-col :span="8">
          <el-form-item label="是否市场化项目" prop="isMarketProject">
            <el-select
              v-model="postData.isMarketProject"
              clearable
              placeholder="请选择"
              class="width--100">
              <el-option label="是" value="Yes"></el-option>
              <el-option label="否" value="No"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物业类型" prop="achievePropertyTypeList">
            <el-select
              v-model="postData.achievePropertyTypeList"
              clearable
              multiple
              collapse-tags
              placeholder="请选择物业类型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('PropertyEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分销与总包一致">
            <el-select
              v-model="postData.isSame"
              @change="handleChangeIsSame"
              clearable
              placeholder="请选择"
              class="width--100">
              <el-option label="是" value="Yes"></el-option>
              <el-option label="否" value="No"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否特殊方案">
            <el-select
              v-model="postData.isSpecial"
              clearable
              placeholder="请选择"
              class="width--100">
              <el-option label="是" value="Yes"></el-option>
              <el-option label="否" value="No"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注说明">
            <el-input
              type="textarea"
              clearable
              :rows="3"
              v-model="postData.remarks" placeholder="请输入备注说明"></el-input>
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
        <el-button type="success" @click="addPerformance('TotalBag')">添加总包</el-button>
        <el-button type="success" @click="addPerformance('Distri')">添加分销</el-button>
      </div>
      <el-table
        class="ih-table"
        :max-height="500"
        :data="tableModel.tableData">
        <template slot="empty" v-if="showEmpty">
          <div class="tips-color">业绩比例方案必须配置</div>
        </template>
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
                :disabled="postData.isSame === 'Yes' && scope.row.type === 'Distri'"
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
            <el-form-item
              :prop="'tableData.' + scope.$index + '.ratio'"
              :rules='tableModel.rules.ratio'>
              <el-input-number
                class="input-number-left"
                v-model="scope.row.ratio"
                @blur="handleChangeValue($event, scope)"
                :disabled="postData.isSame === 'Yes' && scope.row.type === 'Distri'"
                :min="0" :max="100"
                :controls="false"
                placeholder="拆分比例"></el-input-number>
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
                @change="handleChangeValue($event, scope)"
                clearable
                :disabled="postData.isSame === 'Yes' && scope.row.type === 'Distri'"
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
                @blur="handleChangeValue($event, scope)"
                clearable
                :disabled="postData.isSame === 'Yes' && scope.row.type === 'Distri'"
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
      <el-button @click="cancel()">取消</el-button>
      <el-button type="success" @click="save()">保存</el-button>
    </div>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {
    post_businessModel_getList,
    post_achieveScaleScheme_add,
    get_achieveScaleScheme_get__id,
    post_achieveScaleScheme_update,
    get_businessModel_getByName__modelName
  } from "@/api/deal";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {}
  })

  export default class AchieveScaleSchemeAdd extends Vue {
    postData: any = {
      modelId: null, // 业务模式ID
      contType: null, // 合同类型
      isMarketProject: null, // 是否市场化
      isSame: null, // 是否同步
      isSpecial: null, // 是否同步
      remarks: null, // 备注
      achievePropertyTypeList: [], // 物业类型[{propertyType: ""}]
      achieveScaleConfigList: [] // 业绩比例配置
    };
    rules: any = {
      modelId: [
        {required: true, message: "业务模式必选", trigger: "change"},
      ],
      contType: [
        {required: true, message: "合同类型必选", trigger: "change"},
      ],
      isMarketProject: [
        {required: true, message: "是否市场化项目必选", trigger: "change"},
      ],
      achievePropertyTypeList: [
        {required: true, message: "物业类型必选", trigger: "change"},
      ]
    };
    private checkRole: any = (rule: any, value: any, callback: any) => {
      // console.log('value', value);
      let index = rule.field.split('.')[1];
      let currentType = this.tableModel.tableData[index].type; // 总包---"TotalBag",分销---"Distri"
      if (!value) {
        return callback(new Error('角色必选'));
      } else {
        if (this.tableModel.tableData.length > 0) {
          let tempList = [];
          tempList = this.tableModel.tableData.filter((item: any) => {
            return item.type === currentType && item.role === value;
          });
          if (tempList.length > 1) {
            return callback(new Error('不能存在2个相同的角色'));
          }
        }
        callback();
      }
    };
    private checkRatio: any = (rule: any, value: any, callback: any) => {
      // console.log('rule', rule);
      let index = rule.field.split('.')[1];
      let currentType = this.tableModel.tableData[index].type; // 总包---"TotalBag",分销---"Distri"
      // 计算和
      function getTotal(list: any) {
        let total = 0;
        if (list.length > 0) {
          list.forEach((item: any) => {
            total = (total * 100 + (item['ratio'] * 100)) / 100;
          })
        }
        return total;
      }
      if (!value) {
        return callback(new Error('拆分比例必填'));
      } else {
        if (this.tableModel.tableData.length > 0) {
          let TotalBagRatioTotal = 0; // 总包类型的拆分比例之和
          let TotalBagList = []; // 总包类型数据
          let DistriRatioTotal = 0; // 分销类型的拆分比例之和
          let DistriList = []; // 分销类型数据
          TotalBagList = this.tableModel.tableData.filter((item: any) => {
            return item.type === 'TotalBag';
          });
          DistriList = this.tableModel.tableData.filter((item: any) => {
            return item.type === 'Distri';
          });
          TotalBagRatioTotal = getTotal(TotalBagList);
          DistriRatioTotal = getTotal(DistriList);
          // console.log('TotalBagRatioTotal', TotalBagRatioTotal);
          // console.log('DistriRatioTotal', DistriRatioTotal);
          if (currentType === 'TotalBag' && !this.$tool.eq(TotalBagRatioTotal, 100)) {
            return callback(new Error('总包方拆分比例合计必须为100%'));
          } else if (currentType === 'Distri' && !this.$tool.eq(DistriRatioTotal, 100)) {
            return callback(new Error('分销方拆分比例合计必须为100%'));
          } else {
            callback();
          }
        }
        callback();
      }
    };
    tableModel: any = {
      rules: {
        role: [
          // {required: true, message: "角色必选", trigger: "change"},
          {validator: this.checkRole, trigger: "change"},
        ],
        ratio: [
          // {required: true, message: "拆分比例必填", trigger: "change"},
          {validator: this.checkRatio, trigger: "blur"},
        ],
        missingRole: [
          {required: true, message: "角色缺失处理方式必选", trigger: "change"},
        ]
      },
      tableData: []
    }
    showEmpty: any = false;
    tableFormValidate: any = false;
    id: any = null;
    companyId: any = null;
    getModelList: any = []; // 业务模式
    getByNameList: any = []; // 合同类型
    totalPackageList: any = []; // 总包
    distributionList: any = []; // 分销

    async created() {
      await this.getBusinessModelList();
      this.companyId = this.$route.query.companyId; // 分公司id
      this.id = this.$route.query.id; // 具体业绩比例方案---详情用
      if (this.id) {
        await this.initGetInfo()
      }
    }

    // 获取业务模式
    async getBusinessModelList() {
      const res: any = await post_businessModel_getList();
      // this.getModelList = res.data.list;
      console.log('resresres', res);
    }

    // 分销同步总包逻辑
    handleChangeIsSame(value: any) {
      console.log('value', value);
      if (value === 'Yes') {
        // 同步
        if (this.tableModel.tableData && this.tableModel.tableData.length > 0) {
          let totalPageList: any = []; // 记录总包数据
          let distriList: any = []; // 记录分销数据
          this.tableModel.tableData.forEach((data: any) => {
            if (data.type === 'TotalBag') {
              totalPageList.push(data);
            } else {
              distriList.push(data);
            }
          })
          if (totalPageList.length > 0) {
            // 有总包数据，分销数据以总包数据为主
            let tempList = (this as any).$tool.deepClone(totalPageList);
            tempList.forEach((list: any, index: any) => {
              list.customizeId = new Date().getTime() + index + 1; // 自定义id，主要用于删除
              list.type = "Distri";
              list.typeName = "分销";
            })
            this.tableModel.tableData = totalPageList.concat(tempList);
          } else {
            if (distriList.length > 0) {
              // 没有总包数据，但是又有分销数据，这时候用分销数据生成总包数据，保证总包数据和分销数据一致
              let tempList = (this as any).$tool.deepClone(distriList);
              tempList.forEach((list: any, index: any) => {
                list.customizeId = new Date().getTime() + index + 1; // 自定义id，主要用于删除
                list.type = "TotalBag";
                list.typeName = "总包";
              })
              this.tableModel.tableData = totalPageList.concat(tempList);
            }
          }
        }
      }
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

    // 构建总包/分销对象
    getObj(type: any) {
      let obj = {
        customizeId: new Date().getTime() + this.tableModel.tableData.length, // 自定义id，主要用于删除
        type: '',
        typeName: '',
        role: null,
        ratio: null,
        missingRole: null,
        remarks: null
      }
      if (type === 'TotalBag') {
        // 总包
        obj.type = "TotalBag";
        obj.typeName = "总包";
      } else {
        // 分销
        obj.type = "Distri";
        obj.typeName = "分销";
      }
      return obj;
    }

    // 添加总包方法
    addTotalPage() {
      if (this.tableModel.tableData && this.tableModel.tableData.length > 0) {
        let lastIndex = null;
        this.tableModel.tableData.forEach((data: any, index: any) => {
          if (data.type === 'TotalBag') {
            lastIndex = index;
          }
        })
        if (lastIndex !== null) {
          this.tableModel.tableData.splice(lastIndex + 1, 0, this.getObj('TotalBag'))
        } else {
          this.tableModel.tableData.unshift(this.getObj('TotalBag'));
        }
      } else {
        this.tableModel.tableData.push(this.getObj('TotalBag'));
      }
    }

    // 新增总包/分销
    addPerformance(type: any) {
      if (this.postData.isSame === 'Yes') {
        // 分销同步总包：总包和分销同时增加一条
        this.addTotalPage();
        this.$nextTick(() => {
          // 添加分销
          this.tableModel.tableData.push(this.getObj('Distri'));
        })
      } else {
        // 分销不同步总包：总包和分销各自增加一条
        if (type === 'TotalBag') {
          // 添加总包逻辑
          this.addTotalPage();
        } else {
          // 添加分销逻辑
          this.tableModel.tableData.push(this.getObj('Distri'));
        }
      }
    }

    // 删除总包/分销
    async deleteAdd(scope: any) {
      console.log(scope);
      try {
        await this.$confirm("是否确定删除?", "提示");
        if (this.tableModel.tableData && this.tableModel.tableData.length > 0) {
          if (this.postData.isSame === 'Yes') {
            // 分销同步总包：总包和分销同时增加一条
            let totalPageList: any = []; // 记录总包数据
            this.tableModel.tableData.forEach((data: any) => {
              if (data.type === 'TotalBag') {
                totalPageList.push(data);
              }
            })
            let totalPageLength = totalPageList.length; // 总包数据长度
            let distriIndex: any = null; // 要删除的分销数据的位置
            if (scope.row.type === 'TotalBag') {
              distriIndex = scope.$index + totalPageLength - 1; // 要删除的分销数据的位置
            } else {
              distriIndex = scope.$index - totalPageLength; // 要删除的总包数据的位置
            }
            // 删除总包/分销
            this.tableModel.tableData = this.tableModel.tableData.filter((data: any) => {
              return data.customizeId !== scope.row.customizeId;
            })
            this.$nextTick(() => {
              // 删除对应的分销/总包
              this.tableModel.tableData.splice(distriIndex, 1);
            })
          } else {
            this.tableModel.tableData = this.tableModel.tableData.filter((data: any) => {
              return data.customizeId !== scope.row.customizeId;
            })
          }
        }
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } catch (error) {
        console.log(error);
      }
    }

    // 改变方法
    changeValue(scope: any) {
      if (!scope) return;
      this.$nextTick(() => {
        // 分销同步总包逻辑
        if (this.postData.isSame === 'Yes') {
          if (this.tableModel.tableData && this.tableModel.tableData.length > 0) {
            let totalPageList: any = []; // 记录总包数据
            this.tableModel.tableData.forEach((data: any) => {
              if (data.type === 'TotalBag') {
                totalPageList.push(data);
              }
            })
            let totalPageLength = totalPageList.length; // 总包数据长度
            let distriIndex = scope.$index + totalPageLength; // 要改变的分销数据的位置
            this.tableModel.tableData.forEach((data: any, index: any) => {
              if (index === distriIndex) {
                data[scope.column.property] = scope.row[scope.column.property];
              }
            })
          }
        }
      })
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
      this.changeValue(scope);
    }

    // 改变值
    handleChangeValue(value: any, scope: any) {
      // console.log('eeee', value);
      this.changeValue(scope);
    }

    // 保存
    async save() {
      if (this.tableModel.tableData.length === 0) {
        this.showEmpty = true;
      } else {
        this.showEmpty = false;
      }
      (this.$refs["tableForm"] as ElForm).validate((valid: any) => {
        if (valid) {
          this.tableFormValidate = true;
        } else {
          this.tableFormValidate = false;
        }
        (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
      });
    }

    @NoRepeatHttp()
    async addSave(valid: any) {
      // console.log('this.postData', this.postData);
      if (valid && this.tableFormValidate && !this.showEmpty) {
        this.postData.achieveScaleConfigList = this.tableModel.tableData; // 业绩比例配置
        this.postData.branchCompanyId = this.companyId; // 分公司ID
        if (this.id) {
          let postData: any = {
            id: this.id,
            ...this.postData
          };
          await post_achieveScaleScheme_update(postData);
          this.$message.success("编辑成功");
        } else {
          await post_achieveScaleScheme_add(this.postData);
          this.$message.success("新增成功");
        }
        this.$goto({
          path: "/achieveScaleScheme/list",
        });
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

  .tips-color {
    color: #F66;
  }
</style>
