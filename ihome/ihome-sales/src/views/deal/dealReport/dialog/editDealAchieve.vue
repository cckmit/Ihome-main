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
    :title="achieveTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="150px" @submit.native.prevent>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="角色类型">
            <el-select
              v-if="data.currentEditItem.roleType !== 'BranchOffice'"
              v-model="form.roleType" placeholder="请选择">
              <el-option
                v-for="item in dealRoleList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <div>{{$root.dictAllName(form.roleType, 'DealRole')}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="data.currentEditItem.roleType !== 'BranchOffice'">
          <el-form-item label="角色人">
            <IhSelectPageUser
              v-model="form.rolerId"
              @changeOption="handleSelectRole"
              clearable>
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="data.currentEditItem.roleType !== 'BranchOffice'">
          <el-form-item label="店组">
            <el-input placeholder="角色人自动带出" disabled v-model="form.belongOrgName" />
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="data.currentEditItem.roleType !== 'BranchOffice'">
          <el-form-item label="角色业绩上限">
            <el-input v-digits="2" disabled v-model="form.roleAchieveCap" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色人业绩">
            <el-input v-model="form.corporateAchieve" v-digits="2" placeholder="拆佣金额" />
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="data.currentEditItem.roleType !== 'BranchOffice'">
          <el-form-item label="角色业绩比例（%）">
            <el-input disabled v-digits="2" v-model="form.corporateAchieveRatio" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆佣金额">
            <el-input v-model="form.commFees" v-digits="2" placeholder="拆佣金额"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆佣比例（%）">
            <el-input disabled v-digits="2" v-model="form.commFeesRatio" />
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
                <IhSelectPageUser
                  v-model="scope.row.managerId"
                  @changeOption="handleSelectManagementRole"
                  clearable>
                </IhSelectPageUser>
              </template>
            </el-table-column>
            <el-table-column prop="managerPosition" label="岗位" min-width="100"></el-table-column>
            <el-table-column prop="achieveFees" label="分配金额" min-width="100">
              <template slot-scope="scope">
                <el-input v-digits="2" v-model="scope.row.otherChannelFees" />
              </template>
            </el-table-column>
            <el-table-column prop="achieveFeesRatio" label="金额比例" min-width="100">
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
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class EditDealAchieve extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;
    form: any = {
      commFees: 0, // 拆佣金额
      commFeesRatio: 0, // 拆佣金额比例
      corporateAchieve: 0, // 角色业绩
      corporateAchieveRatio: 0, // 角色业绩比例
      roleAchieveCap: 0, // 角色业绩上限
      roleType: "", // 角色类型
      rolerId: 0, // 角色人ID
      belongOrgId: null, // 归属组织ID
      belongOrgName: null, // 归属组织name
      rolerPosition: "", // 角色人岗位
      type: "", // 类型(TotalBag-总包、Distri-分销)
      managerAchieveList: [] // 成交管理者业绩信息
    };
    dealRoleList: any = []; // 角色类型 --- 从角色字典中过滤分公司选项
    achieveTitle: any = '新增角色业绩'; // 弹窗标题

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
      console.log('editDealAchieveData', this.data);
      // 弹框标题
      if (this.data.btnType === 'add') {
        this.achieveTitle = '新增角色业绩';
      } else if (this.data.btnType === 'edit') {
        this.form = this.data.currentEditItem;
        if (this.data.currentEditItem.roleType === 'BranchOffice') {
          this.achieveTitle = '分配管理岗业绩';
        } else {
          this.achieveTitle = '修改角色业绩';
        }
      }
      // 角色类型下拉选项
      const list: any = (this as any).$root.dictAllList('DealRole');
      this.dealRoleList = [];
      if (this.data.type === 'total') {
        // 总包
        if (list.length > 0 && this.data && this.data.totablBagRoles && this.data.totablBagRoles.length > 0) {
          this.data.totablBagRoles.forEach((item: any) => {
            list.forEach((L: any) => {
              if (item.code === L.code) {
                this.dealRoleList.push(
                  {
                    ...L,
                    roleAchieveCap: item.roleAchieveCap
                  }
                );
              }
            })
          });
        }
      } else if (this.data.type === 'distri') {
        // 分销
        if (list.length > 0 && this.data && this.data.distriRoles && this.data.distriRoles.length > 0) {
          this.data.distriRoles.forEach((item: any) => {
            list.forEach((L: any) => {
              if (item === L.code) {
                this.dealRoleList.push(
                  {
                    ...L,
                    roleAchieveCap: item.roleAchieveCap
                  }
                );
              }
            })
          });
        }
      }
      console.log('datadata', this.data);
    }

    // 添加管理岗
    addManagement() {
      this.form.managementList.push(
        {
          achieveFees: 0, // 业绩金额
          achieveFeesRatio: 0, // 业绩金额比例
          belongOrgId: null, // 归属组织ID
          managerId: null, // 管理者ID
          managerName: null, // 管理者名字
          managerPosition: null, // 管理者岗位
          type: null // 类型(Supervisor-主管、Manager-经理、Director-总监)
        }
      )
    }

    // 选择角色人
    handleSelectRole(data: any) {
      console.log(data);
    }

    //  选择管理岗角色人
    handleSelectManagementRole(data: any) {
      console.log(data);
    }

    // 确定选择角色
    async finishAddProjectCycle(data: any) {
      console.log('data', data);
    }

    // 移除
    handleRemove(scope: any) {
      console.log(scope);
      if (this.form.managementList.length > 0) {
        this.form.managementList = this.form.managementList.filter((item: any, index: any) => {
          return index !== scope.$index;
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