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
              v-model="postData.modelName"
              clearable
              placeholder="请选择业务模式"
              class="width--100"
            >
              <!--                <el-option-->
              <!--                  v-for="item in $root.dictAllList('ChannelStatus')"-->
              <!--                  :key="item.code"-->
              <!--                  :label="item.name"-->
              <!--                  :value="item.code"-->
              <!--                ></el-option>-->
              <el-option
                v-for="item in divisionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
              class="width--100"
            >
              <el-option
                v-for="item in modelContType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否市场化项目">
            <el-select
              v-model="postData.isMarketProject"
              clearable
              placeholder="请选择是否市场化项目"
              class="width--100"
            >
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分销同步总包">
            <el-select
              v-model="postData.isSame"
              clearable
              placeholder="请选择分销同步总包"
              class="width--100"
            >
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
              <el-checkbox label="商业"></el-checkbox>
              <el-checkbox label="别墅"></el-checkbox>
              <el-checkbox label="车位"></el-checkbox>
              <el-checkbox label="工业"></el-checkbox>
              <el-checkbox label="住宅"></el-checkbox>
              <el-checkbox label="储物室"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
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
                v-for="tag in tags"
                :key="tag.name"
                closable>
                {{tag.name}}
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
      <el-form-item label="" label-width="0">
        <div class="add-all-wrapper">
          <el-button type="success" @click="addTotalPackage">添加总包</el-button>
          <el-button type="success" @click="addDistribution">添加分销</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="addList">
          <el-table-column prop="type" label="类别" min-width="120"></el-table-column>
          <el-table-column prop="role" label="角色" min-width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.role"
                clearable
                placeholder="角色"
                class="width--100"
              >
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="splitRatio" label="拆分比例 (%)" min-width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.splitRatio" clearable
                placeholder="拆分比例"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dealByMissing" label="角色缺失处理方式" min-width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.dealByMissing"
                clearable
                placeholder="角色缺失处理方式"
                class="width--100"
              >
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" min-width="150">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.remark" clearable
                placeholder="备注"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAdd(scope)"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div class="text-center">
      <el-button type="success" @click="save()">保存</el-button>
      <el-button type="primary" @click="cancel()">取消</el-button>
    </div>
    <ih-dialog :show="dialogAdd" desc="渠道合作信息列表">
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
    post_achieveScaleScheme_update
  } from "@/api/deal";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {RelatedProjectList},
  })
  export default class AchieveScaleSchemeAdd extends Vue {
    postData: any = {
      modelName: null,
      contType: null,
      isMarketProject: null,
      isSame: null,
      achievePropertyTypeList: [],
      achieveProjectList: [],
      remarks: null,
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
    modelContType: any = [
      {
        value: "SelfDeal",
        label: "自行成交"
      },
      {
        value: "DistriDeal",
        label: "分销成交"
      },
      {
        value: "NaturalVisitDeal",
        label: "自然来访成交"
      },
      {
        value: "SelfChannelDeal",
        label: "自渠成交"
      }
    ]
    id: any = null;
    tags: any = [
      {name: '标签一', type: ''},
      {name: '标签二', type: 'success'},
      {name: '标签三', type: 'info'},
      {name: '标签四', type: 'warning'},
      {name: '标签五', type: 'danger'}
    ];
    dialogAdd: any = false;
    totalPackageList: any = [];
    distributionList: any = [];

    // 计算属性
    get addList() {
      return this.totalPackageList.concat(this.distributionList);
    }

    async created() {
      this.id = this.$route.query.id;
      if (this.id) {
        const res: any = await get_achieveScaleScheme_get__id({id: this.id});
        this.postData = res;
      }
    }

    async addRelatedProject() {
      this.dialogAdd = true;
    }

    async finishAdd(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    async addTotalPackage() {
      let obj = {
        id: new Date().getTime() + this.totalPackageList.length,
        type: "总包",
        role: "",
        splitRatio: "",
        dealByMissing: "",
        remark: ""
      }
      this.totalPackageList.push(obj);
    }

    async addDistribution() {
      let obj = {
        id: new Date().getTime() + this.totalPackageList.length,
        type: "分销",
        role: "",
        splitRatio: "",
        dealByMissing: "",
        remark: ""
      }
      this.distributionList.push(obj);
    }

    async deleteAdd(scope: any) {
      console.log(scope);
    }

    async handleChange() {
      this.postData.buModelContTypeList = [];
    }

    async save() {
      (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
    }

    @NoRepeatHttp()
    async addSave(valid: any) {
      if (valid) {
        if (this.id) {
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
          await post_achieveScaleScheme_update(postData);
          this.$message.success("编辑成功");
          this.$goto({
            path: "/achieveScaleScheme/list",
          });
        } else {
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

    async cancel() {
      this.$goto({
        path: "/achieveScaleScheme/list",
      });
    }
  }
</script>
<style lang="scss" scoped>
  .ih-info-item-left,
  .ih-info-item-right {
    line-height: 40px;
  }

  .info-btn-list {
    float: left;
    margin-left: 150px;
    margin-top: -25px;
  }

  .checkbox-align {
    text-align: left;
  }

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
</style>
