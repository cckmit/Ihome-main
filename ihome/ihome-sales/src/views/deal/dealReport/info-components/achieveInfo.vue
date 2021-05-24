<!--
 * @Description: 平台费用信息
 * @version: 
 * @Author: lsj
 * @Date: 2021-05-18 11:20:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-18 14:36:22
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>平台费用信息</span>
      </div>
      <div>
        <p class="p-title">总包费用</p>
        <el-table
          show-summary
          sum-text="合计"
          :summary-method="getSummariesByAchieve"
          :data="achieveTotalBagList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <p>管理岗分配业绩</p>
              <el-table :data="scope.row.managerAchieveList" style="width: 600px">
                <el-table-column prop="manager" label="管理岗" width="200">
                  <template slot-scope="scope">
                    <div>{{scope.row.manager}}({{scope.row.managerPosition}})</div>
                  </template>
                </el-table-column>
                <el-table-column prop="achieveFees" label="分配金额" width="200"></el-table-column>
                <el-table-column prop="ratio" label="金额比例" width="200">
                  <template slot-scope="scope">
                    <div v-if="infoForm.suppContType">-</div>
                    <div v-else>{{scope.row.ratio ? scope.row.ratio : 0}}%</div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="roleType" label="角色类型" min-width="120">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.roleType, "DealRole") }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150"></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
          <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="120"></el-table-column>
          <el-table-column prop="roleAchieveRatio" label="角色业绩比例" min-width="130">
            <template slot-scope="scope">
              <div v-if="infoForm.suppContType">-</div>
              <div v-else>{{scope.row.roleAchieveRatio}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例" min-width="150">
            <template slot-scope="scope">
              <div v-if="infoForm.suppContType">-</div>
              <div v-else>{{ scope.row.commFeesRatio }}%</div>
            </template>
          </el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
        </el-table>
        <p class="p-title">分销费用</p>
        <el-table
          show-summary
          sum-text="合计"
          :summary-method="getSummariesByAchieve"
          :data="achieveDistriList"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <p>管理岗分配业绩</p>
              <el-table :data="scope.row.managerAchieveList" style="width: 600px">
                <el-table-column prop="manager" label="管理岗" width="200">
                  <template slot-scope="scope">
                    <div>{{scope.row.manager}}({{scope.row.managerPosition}})</div>
                  </template>
                </el-table-column>
                <el-table-column prop="achieveFees" label="分配金额" width="200"></el-table-column>
                <el-table-column prop="ratio" label="金额比例" width="200">
                  <template slot-scope="scope">
                    <div v-if="infoForm.suppContType">-</div>
                    <div v-else>{{scope.row.ratio ? scope.row.ratio : 0}}%</div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="roleType" label="角色类型" min-width="120">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.roleType, "DealRole") }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150"></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
          <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="120"></el-table-column>
          <el-table-column prop="roleAchieveRatio" label="角色业绩比例" min-width="130">
            <template slot-scope="scope">
              <div v-if="infoForm.suppContType">-</div>
              <div v-else>{{ scope.row.roleAchieveRatio }}%</div>
            </template>
          </el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例" min-width="150">
            <template slot-scope="scope">
              <div v-if="infoForm.suppContType">-</div>
              <div v-else>{{ scope.row.commFeesRatio }}%</div>
            </template>
          </el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <br />
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class AchieveInfo extends Vue {
    @Prop() infoForm?: any;

    get achieveTotalBagList() {
      let tempList: any = [];
      if (this.infoForm && this.infoForm.achieveList && this.infoForm.achieveList.length > 0) {
        this.infoForm.achieveList.forEach((list: any) => {
          if (list.type === 'TotalBag') {
            tempList.push(list);
          }
        })
      }
      return tempList;
    }

    get achieveDistriList() {
      let tempList: any = [];
      if (this.infoForm && this.infoForm.achieveList && this.infoForm.achieveList.length > 0) {
        this.infoForm.achieveList.forEach((list: any) => {
          if (list.type === 'Distri') {
            tempList.push(list);
          }
        })
      }
      return tempList;
    }

    async created() {
      console.log('AchieveInfo');
    }

    // 平台费用合计
    getSummariesByAchieve(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if ([4, 6, 7].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let total = (this as any).$math.tofixed((this as any).$math.add(prev * 1, curr * 1), 2);
                return total;
              } else {
                return ((this as any).$math.tofixed(prev * 1, 2));
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      // 合计显示百分比
      if (sums && sums.length) {
        sums[7] = sums[7] + '%';
      }
      return sums;
    }
  }
</script>
<style lang="scss" scoped>
</style>
