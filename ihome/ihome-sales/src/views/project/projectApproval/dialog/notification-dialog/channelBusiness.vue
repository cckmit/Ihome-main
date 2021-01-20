<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-30 19:24:37
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-25 09:39:52
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
    :title="`渠道商信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input
              v-model="queryPageParameters.name"
              placeholder="名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信用代码">
            <el-input
              v-model="queryPageParameters.creditCode"
              placeholder="信用代码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="简称">
            <el-input
              v-model="queryPageParameters.shortName"
              placeholder="简称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="渠道跟进人">
            <IhSelectPageUser
              v-model="queryPageParameters.followUserId"
              clearable
            >
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span style="
                  margin-left: 20px;
                  float: right;
                  color: #8492a6;
                  font-size: 13px;
                ">{{ data.account }}</span>
              </template>
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select
              v-model="queryPageParameters.status"
              clearable
              placeholder="状态"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ChannelStatus')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道录入人">
            <IhSelectPageUser
              v-model="queryPageParameters.inputUser"
              clearable
            >
              <!-- 自定义模板使用 v-slot返回来的data：当前每条的数据；index：每一条数据的下标 -->
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span style="
                      margin-left: 20px;
                      float: right;
                      color: #8492a6;
                      font-size: 13px;
                    ">{{ data.account }}</span>
              </template>
            </IhSelectPageUser>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市区">
            <IhCascader v-model="provinceOption"></IhCascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-100">
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
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      :empty-text="emptyText"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="名称"
        min-width="250"
      ></el-table-column>
      <el-table-column
        fixed
        prop="shortName"
        label="简称"
        min-width="100"
      ></el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="200"
      >
        <template v-slot="{ row }">
          {{ $root.getAreaName(row.province) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市"
        width="200"
      >
        <template v-slot="{ row }">
          {{ $root.getAreaName(row.city) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="county"
        label="行政区"
        width="200"
      >
        <template v-slot="{ row }">
          {{ $root.getAreaName(row.county) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="inputUser"
        label="录入人"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="followUserId"
        label="渠道跟进人"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="150"
      >
        <template v-slot="{ row }">
          <span>{{ $root.dictAllName(row.status, "ChannelStatus") }}</span>
        </template>
      </el-table-column>
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
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_channel_getList } from "@/api/channel/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ProjectApprovalDialog extends Vue {
  dialogVisible = true;
  queryPageParameters: any = {
    name: null,
    creditCode: null,
    shortName: null,
    provinces: null,
    county: null,
    city: null,
    inputUser: null,
    status: null,
    followUserId: null,
    cycleCity: window.sessionStorage.getItem("shengshiqu"),
    departmentOrgId: window.sessionStorage.getItem("departmentOrgId"),
  };
  provinceOption: any = [];
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
    this.resPageInfo = await post_channel_getList(this.queryPageParameters);
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      name: null,
      creditCode: null,
      shortName: null,
      provinces: null,
      county: null,
      city: null,
      inputUser: null,
      status: null,
      followUserId: null,
    });
    this.provinceOption = [];
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
    this.queryPageParameters.provinces = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.county = this.provinceOption[2];
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
      path: `/channelBusiness/${type}`,
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