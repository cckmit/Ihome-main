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
    title="修改成交业绩"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="finish"
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-table
      class="ih-table"
      :data="resPageInfo.list">
      <el-table-column prop="roleType" label="角色类型" min-width="120">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            <el-select v-model="scope.row.roleType" placeholder="请选择">
              <el-option label="拓盘方" value="1"></el-option>
              <el-option label="客源合作人" value="2"></el-option>
              <el-option label="渠道岗" value="3"></el-option>
              <el-option label="案场岗" value="4"></el-option>
            </el-select>
          </div>
          <div v-else>{{scope.row.roleType}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="roleAchieveCap"
        label="角色业绩上限"
        min-width="120"
      ></el-table-column>
      <el-table-column prop="corporateAchieve" label="公司业绩" min-width="120">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            <el-input
              v-model="scope.row.corporateAchieve"
              placeholder="公司业绩"/>
          </div>
          <div v-else>{{scope.row.corporateAchieve}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="corporateAchieveRatio"
        label="公司业绩比例（%）"
        min-width="120"
      ></el-table-column>
      <el-table-column prop="commFees" label="拆佣金额" min-width="150">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            <el-input
              v-model="scope.row.commFees"
              placeholder="拆佣金额"/>
          </div>
          <div v-else>{{scope.row.commFees}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="commFeesRatio"
        label="拆佣比例（%）"
        min-width="150"
      ></el-table-column>
      <el-table-column prop="rolerName" label="角色人" min-width="150">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            <el-input
              v-model="scope.row.rolerName"
              ref="inputSelect"
              class="input-select-wrapper"
              placeholder="角色人"
              prefix-icon="el-icon-search"
              @click.native.prevent="selectRole(scope)"/>
          </div>
          <div v-else>{{scope.row.rolerName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="belongOrgName" label="店组" min-width="150">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            {{scope.row.belongOrgName}}
          </div>
          <div v-else>
            <el-input
              v-model="scope.row.belongOrgName"
              ref="inputSelect"
              class="input-select-wrapper"
              placeholder="角色人"
              prefix-icon="el-icon-search"
              @click.native.prevent="selectRole(scope)"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="主管" min-width="150">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            <div>
              <el-input
                v-model="scope.row.belongOrgName"
                ref="inputSelect"
                class="input-select-wrapper"
                placeholder="角色人"
                size="small"
                prefix-icon="el-icon-search"
                @click.native.prevent="selectRole(scope)"/>
            </div>
            <div v-if="scope.row.SupervisorList.length > 0">
              <div v-for="list in scope.row.SupervisorList" :key="list.id" class="role-type-wrapper">
                <div>
                  <el-input-number
                    v-model="list.ratio"
                    :min="0"
                    :max="100" label=""></el-input-number>
                </div>
                <div>{{list.manager}}({{list.managerPosition}})</div>
                <div>
                  <el-button type="danger" size="small">删除</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>暂无信息</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="经理" min-width="150">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            <div>
              <el-input
                v-model="scope.row.belongOrgName"
                ref="inputSelect"
                class="input-select-wrapper"
                placeholder="角色人"
                size="small"
                prefix-icon="el-icon-search"
                @click.native.prevent="selectRole(scope)"/>
            </div>
            <div v-if="scope.row.ManagerList.length > 0">
              <div v-for="list in scope.row.ManagerList" :key="list.id" class="role-type-wrapper">
                <div>
                  <el-input-number
                    v-model="list.ratio"
                    :min="0"
                    :max="100" label=""></el-input-number>
                </div>
                <div>{{list.manager}}({{list.managerPosition}})</div>
                <div>
                  <el-button type="danger" size="small">删除</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>暂无信息</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="总监" min-width="150">
        <template slot-scope="scope">
          <div v-if="!isCompany">
            <div>
              <el-input
                v-model="scope.row.belongOrgName"
                ref="inputSelect"
                class="input-select-wrapper"
                placeholder="角色人"
                size="small"
                prefix-icon="el-icon-search"
                @click.native.prevent="selectRole(scope)"/>
            </div>
            <div v-if="scope.row.DirectorList.length > 0">
              <div v-for="list in scope.row.DirectorList" :key="list.id" class="role-type-wrapper">
                <div>
                  <el-input-number
                    v-model="list.ratio"
                    :min="0"
                    :max="100" label=""></el-input-number>
                </div>
                <div>{{list.manager}}({{list.managerPosition}})</div>
                <div>
                  <el-button type="danger" size="small">删除</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>暂无信息</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <span slot="footer" class="dialog-footer">
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

  import {post_channelGrade_getList} from "@/api/channel";
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
    resPageInfo: any = {
      total: 0,
      list: [
        {
          SupervisorList: [],
          ManagerList: [],
          DirectorList: [],
        }
      ],
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

    created() {
      // this.getListMixin();
      console.log('datadata', this.data);
    }

    selectRole(scope: any) {
      console.log(scope);
      this.dialogAddRole = true;
      // input失焦
      (this as any).$refs.inputSelect && (this as any).$refs.inputSelect.blur();
    }

    async getListMixin() {
      this.resPageInfo = await post_channelGrade_getList(this.queryPageParameters);
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

  .role-type-wrapper {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-content: space-between;

    div {
      flex: 1;
    }
  }
</style>