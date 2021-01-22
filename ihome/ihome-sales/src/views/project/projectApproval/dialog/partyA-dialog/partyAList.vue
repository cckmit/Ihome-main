<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-01 09:05:50
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-21 20:11:13
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="85%"
    class="text-left dialog-table"
    :title="`甲方合同信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="85px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input
              v-model="queryPageParameters.title"
              placeholder="请输入标题"
              clearable
              class="width--100"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="甲方">
            <IhSelectPageByDeveloper
              v-model="queryPageParameters.partyAId"
              placeholder="请选择甲方"
              clearable
            ></IhSelectPageByDeveloper>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="乙方">
            <IhSelectPageByCompany
              v-model="queryPageParameters.partyBId"
              clearable
              placeholder="请选择乙方"
            ></IhSelectPageByCompany>
          </el-form-item>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="searchOpen">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合作项目">
                <el-input
                  v-model="queryPageParameters.cooperationProjectsName"
                  clearable
                  placeholder="请输入合作项目"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合作时间">
                <el-date-picker
                  style="width:100%;"
                  v-model="queryPageParameters.timeList"
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
            </el-col>
            <el-col :span="8">
              <el-form-item label="归属组织">
                <IhSelectPageDivision
                  v-model="queryPageParameters.organizationId"
                  clearable
                ></IhSelectPageDivision>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input
                  v-model="queryPageParameters.contractNo"
                  clearable
                  placeholder="请输入合同编号"
                  class="width--100"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审核状态">
                <el-select
                  v-model="queryPageParameters.approvalStatus"
                  clearable
                  placeholder="请选择审核状态"
                  class="width--100"
                >
                  <el-option
                    v-for="(item, i) in $root.dictAllList('ApprovalStatus')"
                    :key="i"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="归档状态">
                <el-select
                  v-model="queryPageParameters.archiveStatus"
                  clearable
                  placeholder="请选择归档状态"
                  class="width--100"
                >
                  <el-option
                    v-for="(item, i) in $root.dictAllList('ArchiveStatus')"
                    :key="i"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同跟进人">
                <IhSelectPageUser
                  v-model="queryPageParameters.handlerId"
                  clearable
                >
                </IhSelectPageUser>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="归档编号">
                <el-input
                  v-model="queryPageParameters.archiveNo"
                  clearable
                  placeholder="请填写归档编号"
                  class="width--100"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </el-form>
    <div class="margin-left-80">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
      <el-link
        type="primary"
        class="float-right margin-right-40"
        @click="openToggle()"
      >{{searchOpen?'收起':'展开'}}</el-link>
    </div>
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
        min-width="100"
      ></el-table-column>
      <el-table-column
        fixed
        label="甲方"
        min-width="200"
      >
        <template v-slot="{ row }">
          <template v-for="(item, i) in row.partyList">
            <span :key="i">
              <span>{{item.userName}}</span>
              <span v-if="i !== row.partyList.length - 1">、</span>
            </span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="乙方"
        prop="partyBName"
        min-width="150"
      ></el-table-column>
      <el-table-column
        label="合作项目"
        prop="cooperationProjectsName"
        min-width="200"
      ></el-table-column>
      <el-table-column
        label="合作时间"
        prop="cooperationTime"
        width="200"
      >
        <template v-slot="{ row }">
          {{ row.cooperationTime && row.cooperationEnd ? `${row.cooperationTime} ~ ${row.cooperationEnd}` : '' }}
        </template>
      </el-table-column>
      <el-table-column
        label="归属组织"
        prop="organizationName"
        width="200"
      ></el-table-column>
      <el-table-column
        label="合同编号"
        prop="contractNo"
        width="200"
      ></el-table-column>
      <el-table-column
        label="审核状态"
        prop="approvalStatus"
        width="200"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.approvalStatus, "ApprovalStatus")
          }}</template>
      </el-table-column>
      <el-table-column
        label="归档状态"
        prop="archiveStatus"
        width="100"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.archiveStatus, "ArchiveStatus")
          }}</template>
      </el-table-column>
      <el-table-column
        label="归档编号"
        prop="archiveNo"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="合同跟进人"
        prop="handlerName"
        width="100"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template v-slot="{ row }">
          <el-link
            type="primary"
            @click.native.prevent="routerTo(row)"
          >查看</el-link>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      class="text-right"
      style="margin-right: 40px"
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
        :loading="finishLoading"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_contract_list } from "@/api/contract/index";
import { post_company_listAll } from "@/api/developer/index";
import { post_company_getAll } from "@/api/system/index";
import { post_partyAContract_add } from "@/api/project/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class PartyAList extends Vue {
  dialogVisible = true;
  viewEditDialogVisible = false;
  queryPageParameters: any = {
    approvalStatus: null,
    archiveNo: null,
    archiveStatus: null,
    contractNo: null,
    cooperationBeginTime: null,
    cooperationEndTime: null,
    cooperationProjectsName: null,
    handlerId: null,
    organizationId: null,
    partyAId: null,
    partyBId: null,
    title: null,
    timeList: [],
  };
  provinceOption: any = [];
  finishLoading = false;
  private searchOpen = true;
  resPageInfo: any = {
    list: [],
    total: 0,
  };
  partyAOptions: any = [];
  partyBOptions: any = [];

  selection: any = [];

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.getListMixin();
    this.getPartyA();
    this.getPartyB();
  }

  async getPartyA() {
    this.partyAOptions = await post_company_listAll({ name: "" });
  }

  async getPartyB() {
    this.partyBOptions = await post_company_getAll({ name: "" });
  }

  async getListMixin() {
    this.resPageInfo = await post_contract_list(this.queryPageParameters);
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      approvalStatus: null,
      archiveNo: null,
      archiveStatus: null,
      contractNo: null,
      cooperationBeginTime: null,
      cooperationEndTime: null,
      cooperationProjectsName: null,
      handlerId: null,
      organizationId: null,
      partyAId: null,
      partyBId: null,
      title: null,
      timeList: [],
    });
  }

  cancel() {
    this.$emit("cancel");
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }

  search() {
    this.queryPageParameters.cooperationBeginTime = this.queryPageParameters.timeList[0];
    this.queryPageParameters.cooperationEndTime = this.queryPageParameters.timeList[1];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  async finish() {
    if (this.selection.length) {
      this.finishLoading = true;
      const ids: any = [];
      this.selection.forEach((v: any) => {
        ids.push(v.id);
      });
      try {
        await post_partyAContract_add({
          partyAContractVOS: ids,
          termId: this.$route.query.id,
        });
        this.finishLoading = false;
        this.$emit("finish");
      } catch (err) {
        this.finishLoading = false;
      }
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }

  routerTo(row: any) {
    const item = this.$router.resolve({
      path: `/partyA/info`,
      query: {
        id: row.id,
      },
    });
    window.open(item.href, "_blank");
  }
}
</script>
<style lang="scss" scoped>
.dialog-table {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>