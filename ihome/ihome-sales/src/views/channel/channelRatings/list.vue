<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-20 10:15:25
-->
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="城市等级">
              <el-select
                v-model="queryPageParameters.cityGrade"
                clearable
                placeholder="城市等级"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('CityLevel')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道等级">
              <el-select
                v-model="queryPageParameters.channelGrade"
                clearable
                placeholder="渠道等级"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelLevel')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <br />
      <el-row class="el-row">
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="success" @click="addMsg()">添加</el-button>
        <el-button type="info" @click="empty()">重置</el-button>
        <el-button @click="upMethods">上传供应商管理办法</el-button>
        <el-button @click="viewMethods">查看供应商管理办法</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column prop="cityGrade" label="城市等级">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.cityGrade, "CityLevel")
          }}</template>
        </el-table-column>
        <el-table-column prop="channelGrade" label="渠道等级">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.channelGrade, "ChannelLevel")
          }}</template>
        </el-table-column>
        <el-table-column prop="gradeItem" label="评级项"></el-table-column>
        <el-table-column
          prop="gradeStandard"
          label="评级标准"
        ></el-table-column>
        <el-table-column label="操作" width="230" fixed="right">
          <template v-slot="{ row }">
            <el-link type="primary" @click.native.prevent="viewMaterial(row)"
              >查看所需材料</el-link
            >
            <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="editMsg(row)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="delMsg(row)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>

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

    <ih-dialog :show="dialogVisible">
      <Edit
        :data="editData"
        :edit-dialog="editDialog"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            this.getListMixin();
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="materialDialogVisible">
      <Material
        :data="materialData"
        @cancel="() => (materialDialogVisible = false)"
      />
    </ih-dialog>

    <ih-dialog :show="upDialogVisible">
      <UpMethods
        @cancel="() => (upDialogVisible = false)"
        @finish="
          (data) => {
            upDialogVisible = false;
            this.getListMixin();
          }
        "
      />
    </ih-dialog>

    <ih-dialog :show="viewDialogVisible">
      <ViewMethods
        @cancel="() => (viewDialogVisible = false)"
        @finish="viewDialogVisible = false"
      />
    </ih-dialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_channelGradeStandard_getList,
  post_channelGradeStandard_delete__id,
} from "../../../api/channel/index";
import PaginationMixin from "../../../mixins/pagination";
import Edit from "./dialog/edit.vue";
import Material from "./dialog/material.vue";
import UpMethods from "./dialog/upMethods.vue";
import ViewMethods from "./dialog/viewMethods.vue";
@Component({
  components: { Edit, Material, UpMethods, ViewMethods },
  mixins: [PaginationMixin],
})
export default class ChannelRatings extends Vue {
  queryPageParameters: any = {
    cityGrade: null,
    channelGrade: null,
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  dialogVisible = false;
  materialDialogVisible = false;
  upDialogVisible = false;
  viewDialogVisible = false;
  editData: any = {};
  materialData: any = {};
  currentPage: any = 1;
  total: any = null;
  editDialog: any = null;

  created() {
    this.getListMixin();
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  addMsg() {
    this.dialogVisible = true;
    this.editData = {};
    this.editDialog = "add";
  }
  editMsg(row: any) {
    this.dialogVisible = true;
    this.editDialog = "edit";
    this.editData = row;
  }
  async delMsg(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_channelGradeStandard_delete__id({ id: row.id });
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  upMethods() {
    this.upDialogVisible = true;
  }
  viewMethods() {
    this.viewDialogVisible = true;
  }
  empty() {
    this.queryPageParameters = {
      cityGrade: null,
      channelGrade: null,
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
  }
  //操作
  viewMaterial(row: any) {
    this.materialData = row;
    this.materialDialogVisible = true;
  }

  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_channelGradeStandard_getList(
      this.queryPageParameters
    );
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.line {
  border-left: solid;
  color: #4cccec;
  padding-left: 7px;
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}
.el-input--suffix {
  width: 420.98px;
}
</style>
