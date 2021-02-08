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
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" @submit.native.prevent>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="角色类型" prop="roleType">
            <div v-if="data.currentEditItem && data.currentEditItem.roleType === 'BranchOffice'">
              {{$root.dictAllName(form.roleType, 'DealRole')}}
            </div>
            <el-select
              v-else
              @change="handleSelectRoleType"
              v-model="form.roleType" placeholder="请选择">
              <el-option
                v-for="item in dealRoleList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="data.currentEditItem.roleType !== 'BranchOffice'">
          <el-form-item label="角色人" :prop="data.currentEditItem.roleType !== 'BranchOffice' ? 'rolerId' : ' '">
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
          <el-form-item label="角色业绩上限" :prop="data.currentEditItem.roleType !== 'BranchOffice' ? 'roleAchieveCap' : ' '">
            <el-input v-digits="2" disabled v-model="form.roleAchieveCap" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色人业绩" prop="corporateAchieve">
            <el-input
              @input="calculatePercentage($event, 'corporateAchieveRatio')"
              :disabled="data.currentEditItem.roleType === 'BranchOffice'"
              v-model="form.corporateAchieve" v-digits="2" placeholder="" />
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="data.currentEditItem.roleType !== 'BranchOffice'">
          <el-form-item label="角色业绩比例（%）">
<!--            <div class="div-disabled">{{form.corporateAchieveRatio}}%</div>-->
            <div class="div-disabled">
              {{getPercentage(form.corporateAchieve, form.roleAchieveCap)}}%
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆佣金额">
            <el-input
              v-model="form.commFees"
              @input="calculatePercentage($event, 'commFeesRatio')"
              v-digits="2" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拆佣比例（%）">
<!--            <div class="div-disabled">{{form.commFeesRatio}}%</div>-->
            <div class="div-disabled">
              {{getPercentage(form.commFees, data.totalAmount)}}%
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="分配管理岗业绩">
            <div>
              <el-button type="primary" size="mini" @click="addManagement">新增行</el-button>
            </div>
          </el-form-item>
          <el-table class="ih-table" max-height="250px" :data="form.managerAchieveList">
            <el-table-column prop="managerId" label="名称" min-width="100">
              <template slot-scope="scope">
                <IhSelectPageUser
                  v-model="scope.row.managerId"
                  @changeOption="handleSelectManagementRole($event, scope.row)"
                  clearable>
                </IhSelectPageUser>
              </template>
            </el-table-column>
            <el-table-column prop="managerPosition" label="岗位" min-width="100"></el-table-column>
            <el-table-column prop="achieveFees" label="分配金额" min-width="100">
              <template slot-scope="scope">
                <el-input
                  v-digits="2"
                  @input="calculatePercentage($event, 'achieveFeesRatio', scope.row)"
                  v-model="scope.row.achieveFees" />
              </template>
            </el-table-column>
            <el-table-column prop="achieveFeesRatio" label="金额比例" min-width="100">
              <template slot-scope="scope">
<!--                <div>{{scope.row.achieveFeesRatio}}%</div>-->
                <div>{{getPercentage(scope.row.achieveFees, form.corporateAchieve)}}%</div>
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

    private validateCorporateAchieve (rule: any, value: any, callback: any) {
      if (!value && this.data.currentEditItem.roleType !== 'BranchOffice') {
        return callback(new Error('角色人业绩不能为空'));
      } else {
        if (value > this.form.roleAchieveCap) {
          return callback(new Error('角色人业绩大于角色业绩上限'));
        }
        callback();
      }
    }
    @Prop({default: null}) data: any;
    dialogVisible = true;
    form: any = {
      commFees: 0, // 拆佣金额
      commFeesRatio: 0, // 拆佣金额比例
      corporateAchieve: 0, // 角色人业绩
      corporateAchieveRatio: 0, // 角色业绩比例
      roleAchieveCap: 0, // 角色业绩上限
      roleType: "", // 角色类型
      rolerId: null, // 角色人ID
      rolerName: null, // 角色人Name
      belongOrgId: null, // 归属组织ID
      belongOrgName: null, // 归属组织name
      rolerPosition: "", // 角色人岗位
      type: "", // 类型(TotalBag-总包、Distri-分销)
      managerAchieveList: [] // 成交管理者业绩信息
    };
    rules: any = {
      roleType: [
        {required: true, message: "角色类型必选", trigger: "change"}
      ],
      rolerId: [
        {required: true, message: "角色人必选", trigger: "change"}
      ],
      roleAchieveCap: [
        {required: true, message: "角色业绩上限不能为空", trigger: "change"}
      ],
      corporateAchieve: [
        {validator: this.validateCorporateAchieve, trigger: ["change", "blur"]}
      ]
    };
    dealRoleList: any = []; // 角色类型 --- 从角色字典中过滤分公司选项
    achieveTitle: any = '新增角色业绩'; // 弹窗标题

    created() {
      console.log('editDealAchieveData', this.data);
      // 弹窗初始化
      this.initDialog();
      // 角色类型初始化
      this.initRoleList();
    }

    // 弹窗初始化
    initDialog() {
      if (this.data.btnType === 'add') {
        this.achieveTitle = '新增角色业绩';
      } else if (this.data.btnType === 'edit') {
        this.form = (this as any).$tool.deepClone(this.data.currentEditItem);
        if (this.form.rolerId === 0) {
          this.form.rolerId = null;
        }
        if (this.data.currentEditItem.roleType === 'BranchOffice') {
          this.achieveTitle = '分配管理岗业绩';
        } else {
          this.achieveTitle = '修改角色业绩';
        }
      }
    }

    // 角色类型初始化
    initRoleList() {
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
      }
      // 处理编辑的时候-因为业绩方案改变而获取不到对应角色类型的问题：角色类型type变为空
      if (this.data && this.data.currentEditItem && this.data.currentEditItem.roleType !== 'BranchOffice' && this.dealRoleList.length > 0) {
        let currentType: any = this.data.currentEditItem.roleType;
        let flag: any = false;
        flag = this.dealRoleList.some((list: any) => {
          return list.code === currentType;
        });
        if (!flag) {
          // 匹配不到，则置为空
          this.form.roleType = null;
        }
      }
    }

    // 确定
    async finish() {
      let flag: any = false;
      flag = this.validForm(this.form);
      (this as any).$refs.form.validate((valid: any) => {
        if (valid && flag) {
          this.$emit("finish", this.form);
        } else {
          console.log('error finish!!');
          return false;
        }
      });
    }

    // 校验form
    validForm(data: any) {
      let flag: any = true;
      if (data.managerAchieveList && data.managerAchieveList.length) {
        let total: any = 0;
        data.managerAchieveList.forEach((list: any) => {
          total = total + parseFloat(list.achieveFees ? list.achieveFees : 0);
        });
        if (total > this.form.corporateAchieve) {
          flag = false;
        }
      }
      return flag
    }

    // 取消
    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 计算比例
    calculatePercentage(value: any, type: any, row: any = {}) {
      if (!type) return;
      switch (type) {
        case 'corporateAchieveRatio':
          // 角色人业绩比例
          // this.form.corporateAchieveRatio = this.getPercentage(this.form.corporateAchieve, this.form.roleAchieveCap);
          // 如果管理岗列表有数据，要重新算
          if (this.form.managerAchieveList.length > 0) {
            this.form.managerAchieveList.forEach((list: any) => {
              list.achieveFeesRatio = this.getPercentage(list.achieveFees, this.form.corporateAchieve);
            });
          }
          break;
        case 'commFeesRatio':
          // 拆佣比例
          // this.form.commFeesRatio = this.getPercentage(this.form.commFees, this.data.totalAmount);
          break;
        case 'achieveFeesRatio':
          // 管理岗的金额比例
          row.achieveFeesRatio = this.getPercentage(row.achieveFees, this.form.corporateAchieve);
          break;
      }
    }

    // 计算比例
    getPercentage(num: any, total: any) {
      if (num == 0 || total == 0){
        return 0;
      }
      // 小数点后两位百分比
      return (Math.round(num / total * 10000) / 100.00);
    }

    // 选择角色类型
    handleSelectRoleType(value: any) {
      if (!value) return;
      if (this.dealRoleList.length) {
        this.dealRoleList.forEach((list: any) => {
          if (list.code === value) {
            this.form.roleAchieveCap = list.roleAchieveCap;
          }
        })
      }
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    // 添加管理岗
    addManagement() {
      this.form.managerAchieveList.push(
        {
          achieveFees: 0, // 业绩金额
          achieveFeesRatio: 0, // 业绩金额比例
          belongOrgId: null, // 归属组织ID
          managerId: null, // 管理者ID
          managerName: null, // 管理者名字
          managerPosition: null // 管理者岗位
        }
      )
    }

    // 选择角色人
    handleSelectRole(data: any) {
      console.log(data);
      this.form.rolerId = data.id;
      this.form.rolerName = data.name;
      this.form.belongOrgId = data.orgId;
      this.form.belongOrgName = data.orgName;
      this.form.rolerPosition = data.jobName;
    }

    //  选择管理岗角色人
    handleSelectManagementRole(data: any, row: any) {
      // console.log(data);
      // console.log(row);
      row.belongOrgId = data.orgId;
      row.managerId = data.id;
      row.managerName = data.name;
      row.managerPosition = data.jobName;
    }

    // 移除
    handleRemove(scope: any) {
      console.log(scope);
      if (this.form.managerAchieveList.length > 0) {
        this.form.managerAchieveList = this.form.managerAchieveList.filter((item: any, index: any) => {
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

  .div-disabled {
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    box-sizing: border-box;
    background-color: #F5F7FA;
    color: #C0C4CC;
    padding: 0 15px;
    cursor: not-allowed;
    height: 40px;
    line-height: 40px;
  }
</style>