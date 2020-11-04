<!--
 * @Description: 甲方合同列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 11:53:51
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-04 15:19:31
-->
<template>
  <IhPage label-width="100px">
    <!-- 搜索 -->
    <template #form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input
                v-model="queryPageParameters.title"
                placeholder="标题"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方">
              <el-select
                v-model="queryPageParameters.partyAId"
                placeholder="甲方"
                clearable
                filterable
                class="width--100"
              >
                <el-option
                  v-for="item in partyAList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方">
              <el-select
                v-model="queryPageParameters.partyBId"
                clearable
                filterable
                placeholder="乙方"
                class="width--100"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合作项目">
                  <el-input
                    v-model="queryPageParameters.cooperativeProject"
                    placeholder="合作项目"
                  ></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="合作时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="timeList"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="执行时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="queryPageParameters.effectiveTime"
                    type="date"
                    align="left"
                    placeholder="年/月/日"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目">
                  <el-select
                    v-model="queryPageParameters.projectId"
                    clearable
                    placeholder="项目"
                    class="width--100"
                  >
                    <!-- <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="周期">
                  <el-select
                    v-model="queryPageParameters.cycleId"
                    clearable
                    placeholder="周期"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in dropOption"
                      :key="item.termId"
                      :label="item.termName"
                      :value="item.termId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <SelectOrganizationTree
                    :orgId="queryPageParameters.organizationId"
                    @callback="(id) => (queryPageParameters.organizationId = id)"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input
                    v-model="queryPageParameters.contractCode"
                    clearable
                    placeholder="请输入合同编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.fileState"
                    clearable
                    placeholder="请选择归档状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.dictAllList('ContractEnum.FileState')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档编号">
                  <el-input
                    v-model="queryPageParameters.fileCode"
                    clearable
                    placeholder="请选择归档编号"
                    class="width--100"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同录入人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.createUserId"
                    clearable
                    class="width--100"
                  >
                    <template v-slot="{ data }">
                      <span style="float: left">{{ data.name }}</span>
                      <span style="margin-left: 20px;float: right; color: #8492a6; font-size: 13px">{{ data.account }}</span>
                    </template>
                  </IhSelectPageUser>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.handlerId"
                    clearable
                    class="width--100"
                  >
                    <template v-slot="{ data }">
                      <span style="float: left">{{ data.name }}</span>
                      <span style="margin-left: 20px;float: right; color: #8492a6; font-size: 13px">{{ data.account }}</span>
                    </template>
                  </IhSelectPageUser>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
    <!-- 按钮 -->
    <template #btn>
      <el-row>
        <el-button
          type="primary"
          @click="handleSearch()"
        >查询</el-button>
        <el-button
          type="info"
          @click="handleReset()"
        >重置</el-button>
        <el-button>导出</el-button>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
        >{{searchOpen?'收起':'展开'}}</el-link>
      </el-row>
    </template>
    <!-- table-content -->
    <template #table>
      <br />
      <el-table
        class="ih-table partyA-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          label="标题"
          prop="title"
          min-width="235"
        ></el-table-column>
        <el-table-column
          label="甲方"
          min-width="200"
        >
          <template v-slot="{ row }">
            <span
              v-for="(item, index) in row.partyList"
              :key="item.id"
            >
              {{item.userId}}
              <span v-if="index === (item.length-1)">、</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="乙方"
          prop="partyB"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="合作项目"
          prop="cooperativeProject"
          min-width="200"
        ></el-table-column>
        <!-- <el-table-column
          label="合作时间"
          prop="time"
          width="200"
        >
          <template v-slot="{ row }">
            {{ `${row.beginTime}-${row.endTime}` }}
          </template>
        </el-table-column> -->
        <el-table-column
          label="执行时间"
          prop="effectiveTime"
          width="200"
        ></el-table-column>
        <el-table-column
          label="关联项目"
          prop="projectId"
          width="200"
        ></el-table-column>
        <el-table-column
          label="关联周期"
          prop="cycleId"
          width="100"
        ></el-table-column>
        <el-table-column
          label="归属组织"
          prop="organizationId"
          width="150"
        ></el-table-column>
        <el-table-column
          label="合同编号"
          prop="contractCode"
          width="200"
        ></el-table-column>
        <el-table-column
          label="归档状态"
          prop="fileState"
          width="100"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.fileState, 'ContractEnum.FileState')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档编号"
          prop="fileCode"
          width="230"
        ></el-table-column>
        <el-table-column
          label="合同跟进人"
          prop="handler"
          width="100"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="230"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="handleToPage(row, 'info')"
            >详情</el-link>
            <el-link
              type="primary"
              @click="duplicate(row)"
            >扫描件归档</el-link>
            <el-link
              type="primary"
              @click="handleToPage(row, 'edit')"
            >原件归档</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template #pagination>
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="queryPageParameters.pageSize"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";

import {
  post_contract_list,
  post_contract_duplicate__id,
} from "@/api/contract/index";
import { post_term_getDropDown } from "@/api/project/index";
import { post_company_listAll } from "@/api/developer/index";
import { post_company_getAll } from "@/api/system/index";
import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";

@Component({
  components: { SelectOrganizationTree },
  mixins: [PaginationMixin],
})
export default class PartyAList extends Vue {
  public queryPageParameters: any = {
    title: null,
    partyAId: null,
    partyBId: null,
    cooperativeProject: null,
    effectiveTime: null,
    projectId: null,
    cycleId: null,
    organizationId: null,
    contractCode: null,
    fileState: null,
    fileCode: null,
    createUserId: null,
    handlerId: null,
    beginTime: null,
    endTime: null,
  };
  timeList = [];
  private dropOption: any = [];
  private companyList: any = [];
  private partyAList: any = [];
  private searchOpen = true;
  public resPageInfo: any = {
    total: 0,
    list: [],
  };

  private handleSearch(): void {
    // let sign = this.timeList && this.timeList.length;
    // this.queryPageParameters.beginTime = sign ? this.timeList[0] : "";
    // this.queryPageParameters.endTime = sign ? this.timeList[1] : "";
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReset(): void {
    Object.assign(this.queryPageParameters, {
      title: null,
      partyAId: null,
      partyBId: null,
      cooperativeProject: null,
      effectiveTime: null,
      projectId: null,
      cycleId: null,
      organizationId: null,
      contractCode: null,
      fileState: null,
      fileCode: null,
      createUserId: null,
      handlerId: null,
      beginTime: null,
      endTime: null,
    });
    this.timeList = [];
  }
  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private handleToPage(row: any, page: string) {
    this.$router.push({
      path: page,
      query: {
        id: row.id,
      },
    });
  }
  private handleSelectionChange(val: any): void {
    console.log(val);
  }
  private async duplicate(row: any): Promise<void> {
    await this.$confirm("此操作将进行扫描件归档, 是否继续?", "提示");
    await post_contract_duplicate__id({ id: row.id });
    this.$message.success("归档成功");
    this.getListMixin();
  }
  private async getCompanyList() {
    this.companyList = await post_company_getAll({ name: "" });
  }
  private async getPartyAList() {
    this.partyAList = await post_company_listAll({ name: "" });
  }
  private async getDropDown(): Promise<void> {
    this.dropOption = await post_term_getDropDown();
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_contract_list(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
    this.getCompanyList();
    this.getPartyAList();
    this.getDropDown();
  }
}
</script>

<style lang="scss" scoped>
.partyA-table {
  .el-link + .el-link {
    margin-left: 15px;
  }
}
</style>