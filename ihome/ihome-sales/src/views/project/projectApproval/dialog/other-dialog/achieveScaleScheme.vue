<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-09 11:11:02
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 09:05:45
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="text-left dialog-table"
    :title="`业绩比例信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="120px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="业务模式">
            <el-select
              v-model="queryPageParameters.modelName"
              clearable
              placeholder="请选择业务模式"
              class="width--100"
            >
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
          <el-form-item label="合同类型">
            <el-select
              v-model="queryPageParameters.contType"
              clearable
              placeholder="请选择合同类型"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ContType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物业类型">
            <el-select
              v-model="queryPageParameters.property"
              clearable
              multiple
              collapse-tags
              placeholder="请选择物业类型"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('Property')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否市场化项目">
            <el-select
              v-model="queryPageParameters.isMarketProject"
              clearable
              placeholder="请选择是否市场化项目"
              class="width--100"
            >
              <el-option
                label="是"
                value="Yes"
              ></el-option>
              <el-option
                label="否"
                value="No"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分销与总包一致">
            <el-select
              v-model="queryPageParameters.isSame"
              clearable
              placeholder="请选择分销与总包一致"
              class="width--100"
            >
              <el-option
                label="是"
                value="Yes"
              ></el-option>
              <el-option
                label="否"
                value="No"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否特殊方案">
            <el-select
              v-model="queryPageParameters.isSpecial"
              clearable
              placeholder="请选择是否特殊方案"
              class="width--100"
            >
              <el-option
                label="是"
                value="Yes"
              ></el-option>
              <el-option
                label="否"
                value="No"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-120">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
    </div>
    <br />
    <el-table
      class="ih-table"
      ref="multipleTable"
      :data="resPageInfo.list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="branchCompany"
        label="分公司"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="合同类型"
        min-width="120"
      >
        <template v-slot="{ row }">
          <span>{{$root.dictAllName(row.contType, 'ContType')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="propertyTypeStr"
        label="物业类型"
        min-width="120"
      >
        <template v-slot="{ row }">
          <span>{{$root.dictAllName(row.propertyTypeStr, 'Property')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="modelName"
        label="业务模式"
        min-width="120"
      >
        <template v-slot="{ row }">
          <span>{{$root.dictAllName(row.BusinessModel, 'BusinessModel')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isMarketProject"
        label="是否市场化项目"
        min-width="120"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.isMarketProject">{{scope.row.isMarketProject === 'Yes' ? '是' : '否'}}</div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="isMarketProject"
        label="是否特殊方案"
        min-width="120"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.isMarketProject">{{scope.row.isMarketProject === 'Yes' ? '是' : '否'}}</div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="isSame"
        label="分销与总包一致"
        min-width="120"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.isSame">{{scope.row.isSame === 'Yes' ? '是' : '否'}}</div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注说明"
        min-width="120"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template v-slot="{ row }">
          <el-link
            type="primary"
            @click.native.prevent="routerTo(row, 'info')"
          >详情</el-link>
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
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_achieveScaleScheme_getList } from "@/api/deal/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class AchieveScaleScheme extends Vue {
  @Prop() data: any;
  dialogVisible = true;
  viewEditDialogVisible = false;
  queryPageParameters: any = {
    modelName: null,
    contType: null,
    property: null,
    isMarketProject: null,
    isSame: null,
    isSpecial: null,
  };
  resPageInfo: any = {
    list: [],
    total: 0,
  };
  selection: any = [];

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    if (this.data.id) {
      this.queryPageParameters.branchCompanyId = this.data.id;
      this.resPageInfo = await post_achieveScaleScheme_getList(
        this.queryPageParameters
      );
    }
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      modelName: null,
      contType: null,
      property: null,
      isMarketProject: null,
      isSame: null,
      isSpecial: null,
    });
  }

  cancel() {
    this.$emit("cancel");
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }
  handleSelect(selection: any) {
    if (selection.length > 1) {
      let row = selection.shift();
      (this.$refs.multipleTable as any).toggleRowSelection(row, false);
    }
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  finish() {
    if (this.selection.length) {
      this.$emit("finish", this.selection);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }

  routerTo(row: any, type: string) {
    const item = this.$router.resolve({
      path: `/achieveScaleScheme/${type}`,
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
.ih-table {
  /deep/ .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>