<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-19 12:02:50
-->
<template>
  <el-dialog
    v-dialogDrag
    title="新增/修改角色业绩"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="150px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="角色类型">
            <el-select v-model="form.roleType" placeholder="请选择">
              <el-option
                v-for="item in dealRoleList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色人">
            <el-input placeholder="请选择角色人" readonly v-model="form.rolerName">
              <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectRole"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="店组">
            <el-input placeholder="角色人自动带出" disabled v-model="form.belongOrgName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色业绩上限">
            <el-input placeholder="" disabled v-model="form.roleAchieveCap" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色人业绩">
            <el-input v-model="form.corporateAchieve" placeholder="拆佣金额" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色业绩比例（%）">
            <el-input placeholder="" disabled v-model="form.corporateAchieveRatio" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆佣金额">
            <el-input v-model="form.commFees" placeholder="拆佣金额"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆佣比例（%）">
            <el-input placeholder="" disabled v-model="form.commFeesRatio" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="分配管理岗业绩">
            <div>
              <el-button type="primary" size="mini" @click="addManagement">新增行</el-button>
            </div>
          </el-form-item>
          <el-table class="ih-table" max-height="250px" :data="form.managementList">
            <el-table-column prop="name" label="名称" min-width="100">
              <template slot-scope="scope">
                <el-input placeholder="名称" readonly v-model="scope.row.name">
                  <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectRole"></el-button>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="achieveAmount" label="岗位" min-width="100"></el-table-column>
            <el-table-column prop="otherChannelFees" label="分配金额" min-width="100">
              <template slot-scope="scope">
                <el-input placeholder="" v-model="scope.row.otherChannelFees" />
              </template>
            </el-table-column>
            <el-table-column prop="otherChannelFees" label="金额比例" min-width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.otherChannelFees">{{scope.row.otherChannelFees}}%</div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-link
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="handleRemove(scope)"
                >移除
                </el-link>
              </template>
            </el-table-column>
          </el-table>
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
    dealRoleList: any = []; // 角色类型 --- 从角色字典中过滤分公司选项
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
      const list: any = (this as any).$root.dictAllList('DealRole');
      console.log('角色类型', list);
      if (list.length > 0) {
        this.dealRoleList = list.filter((item: any) => {
          return item.code !== "BranchOffice";
        });
      } else {
        this.dealRoleList = [];
      }
      console.log('datadata', this.data);
    }

    // 添加管理岗
    addManagement() {
      this.form.managementList.push(
        {
          addId: new Date().getTime() + this.form.managementList.length,
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
    }

    // 确定选择角色
    async finishAddProjectCycle(data: any) {
      console.log('data', data);
    }

    // 移除
    handleRemove(scope: any) {
      console.log(scope);
      if (this.form.managementList.length > 0) {
        this.form.managementList = this.form.managementList.filter((item: any) => {
          return item.addId !== scope.row.addId;
        });
      }
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