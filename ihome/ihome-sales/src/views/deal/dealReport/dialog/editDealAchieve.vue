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
    title="新增/修改成交业绩"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="150px">
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="角色类型">
            <div v-if="!isCompany">
              <el-select v-model="form.roleType" placeholder="请选择">
                <el-option label="拓盘方" value="1"></el-option>
                <el-option label="客源合作人" value="2"></el-option>
                <el-option label="渠道岗" value="3"></el-option>
                <el-option label="案场岗" value="4"></el-option>
              </el-select>
            </div>
            <div v-else>{{form.roleType}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色业绩上限">
            <div>{{form.roleAchieveCap}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司业绩">
            <div v-if="!isCompany">
              <el-input
                v-model="form.corporateAchieve"
                placeholder="公司业绩"/>
            </div>
            <div v-else>{{form.corporateAchieve}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色业绩比例（%）">
            <div>{{form.corporateAchieveRatio}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拆佣金额">
            <div v-if="!isCompany">
              <el-input
                v-model="form.commFees"
                placeholder="拆佣金额"/>
            </div>
            <div v-else>{{form.commFees}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拆佣比例（%）">
            <div>{{form.commFeesRatio}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色人">
            <div v-if="!isCompany">
              <el-input placeholder="请选择角色人" readonly v-model="form.rolerName">
                <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectRole"></el-button>
              </el-input>
            </div>
            <div v-else>{{form.rolerName}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="店组">
            <div v-if="!isCompany">
              {{form.belongOrgName}}
            </div>
            <div v-else>
              <el-input placeholder="请选择店组" readonly v-model="form.belongOrgName">
                <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectRole"></el-button>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="管理岗">
            <div v-if="!isCompany">
              <el-button type="primary" size="mini" @click="addManagement">添加</el-button>
            </div>
            <div class="role-wrapper">
              <div v-for="(list, index) in form.managementList" :key="index" class="role-type-wrapper">
                <div>
                  <el-input v-digits="2" v-model="list.money" placeholder="请输入金额"></el-input>
                </div>
                <div>
                  <el-input v-digits="2" v-model="list.money" placeholder="请输入比例"></el-input>%
                </div>
                <div>{{list.manager}}({{list.managerPosition}})</div>
                <div>
                  <el-button type="danger" size="small">删除</el-button>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
    <ih-dialog :show="dialogAddRole" desc="选择角色用户列表">
      <SelectRole
        @cancel="() => (dialogAddRole = false)"
        @finish="
            (data) => {
              dialogAddRole = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import SelectRole from "@/views/deal/dealReport/dialog/selectRole.vue";

  // import {post_channelGrade_getList} from "@/api/channel";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {SelectRole},
    mixins: [PaginationMixin],
  })
  export default class EditDealAchieve extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;
    form: any = {
      roleType: null,
      roleAchieveCap: null,
      corporateAchieve: null,
      corporateAchieveRatio: null,
      commFees: null,
      commFeesRatio: null,
      rolerName: null,
      belongOrgName: null,
      managementList: [],
    };
    isCompany: any = false; // 是否公司业绩
    dialogAddRole: any = false;

    queryPageParameters: any = {
      channelGrade: null,
      channelId: null,
      city: null,
      cityGrade: null,
      departmentOrgId: null,
      inputUser: null,
      province: null,
      special: null,
      status: null,
      storageNum: null,
    };

    async finish() {
      this.$emit("finish", true);
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    created() {
      console.log('datadata', this.data);
    }

    // 添加管理岗
    addManagement() {
      this.form.managementList.push(
        {
          money: '',
          ratio: '',
          manager: '',
          managerPosition: ''
        }
      )
    }

    selectRole(scope: any) {
      console.log(scope);
      this.dialogAddRole = true;
      // input失焦
      (this as any).$refs.inputSelect && (this as any).$refs.inputSelect.blur();
    }

    // 确定选择角色
    async finishAddProjectCycle(data: any) {
      console.log('data', data);
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #f90;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .input-select-wrapper {
    cursor: pointer;

    /deep/ .el-input__inner {
      cursor: pointer;
    }
  }

  .role-wrapper {
    width: 100%;
    max-height: 180px;
    overflow-y: auto;

    .role-type-wrapper {
      width: 100%;
      margin-top: 10px;
      box-sizing: border-box;
      display: flex;
      align-content: space-between;

      div {
        flex: 1;

        &:not(:last-child) {
          margin-right: 20px;
        }

        /deep/.el-input {
          width: 90%;
        }
      }
    }
  }
</style>