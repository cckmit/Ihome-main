<!--
 * @Description: 分销合同模板弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-30 09:53:42
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-08 16:12:48
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="75%"
    title="申领渠道合同"
    top="5vh"
  >
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="周期">
            <IhSelectPageByCycle
              v-model="queryPageParameters.termId"
              placeholder="请选择周期"
              clearable
            ></IhSelectPageByCycle>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同主标题"
            class="formItem"
          >
            <el-input
              v-model="queryPageParameters.contractTitle"
              placeholder="请输入关键字"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="渠道合同类型"
            class="formItem"
          >
            <el-select
              v-model="queryPageParameters.contractKind"
              clearable
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('ContractKind')"
                :key="n"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
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
    </div>
    <br />
    <el-table
      class="ih-table width--100"
      ref="table"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      max-height="320"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="合同类型">
        <template v-slot="{ row }">
          {{$root.dictAllName(row.contractKind, 'ContractKind')}}
        </template>
      </el-table-column>
      <el-table-column
        label="合同主标题"
        prop="contractTitle"
      ></el-table-column>
      <el-table-column
        label="甲方公司"
        prop="partyCompany"
      ></el-table-column>
      <el-table-column label="是否垫佣">
        <template v-slot="{ row }">
          {{$root.dictAllName(row.padCommissionEnum, 'PadCommission')}}
        </template>
      </el-table-column>
      <el-table-column label="渠道类型">
        <template v-slot="{ row }">
          {{$root.dictAllName(row.channelEnum, 'ChannelCustomer')}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="100"
      >
        <template v-slot="{ row }">
          <el-link
            type="primary"
            class="margin-right-10"
          >查看</el-link>
          <el-link
            type="success"
            @click="preview(row)"
          >预览</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-right">
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
    </div>
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
    <template #footer>
      <el-button @click="cancel()">取消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >下一步</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_distributContract_applyDistract } from "@/api/project/index";

@Component({
  mixins: [PaginationMixin],
})
export default class ApplyContract extends Vue {
  @Prop() data!: any;
  queryPageParameters: any = {
    contractTitle: null,
    termId: null,
    contractKind: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private dialogVisible = true;
  private selection: any[] = [];
  private isShowImg = false;
  private srcList: any = [];
  private srcData: any = [];

  cancel() {
    this.$emit("cancel", false);
  }
  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  reset() {
    Object.assign(this.queryPageParameters, {
      contractTitle: null,
      termId: null,
      contractKind: null,
    });
  }
  finish() {
    const data = this.selection[0];
    if (this.selection.length) {
      switch (data.contractKind) {
        case "StandChannel":
          // 标准渠道分销合同
          this.$router.push(
            `/distribution/normalDistributionApply?id=${data.agencyContrictId}`
          );
          break;
      }
      this.cancel();
    } else {
      this.$message.warning("请先选择一条数据");
    }
  }
  preview(row: any) {
    this.srcList = row.attachItemVOS.map(
      (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileId}`
    );
    this.srcData = row.attachItemVOS.map((v: any) => ({
      fileName: v.fileName,
      preFileName: (this.$root as any).dictAllName(
        row.contractKind,
        "ContractKind"
      ),
    }));
    this.isShowImg = true;
  }
  private handleSelectionChange(val: any) {
    this.selection = val;
  }
  private handleSelect(selection: any) {
    if (selection.length > 1) {
      let del_row = selection.shift();
      (this.$refs.table as any).toggleRowSelection(del_row, false);
    }
  }
  async getListMixin() {
    this.resPageInfo = await post_distributContract_applyDistract(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
}
</script>

<style lang="scss" scoped>
.ih-table {
  /deep/ .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
