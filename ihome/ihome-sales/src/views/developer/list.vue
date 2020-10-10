<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-25 17:59:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-10 18:11:04
-->
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input v-model="queryPageParameters.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码">
              <el-input v-model="queryPageParameters.creditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.status"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.displayList('devStatus')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区">
              <IhCascader
                v-model="queryPageParameters.provinceOption"
              ></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-input v-model="queryPageParameters.inputUser"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="danger" @click="search()">查询</el-button>
        <el-button type="success" @click="addMsg()">添加</el-button>
        <el-button type="success" @click="reset()">重置</el-button>
        <el-button
          type="info"
          :disabled="updataUserDisabled"
          @click="dialogVisible = true"
          >变更录入人</el-button
        >
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          width="50"
          min-width="50"
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="名称" width="250"></el-table-column>
        <el-table-column
          prop="creditCode"
          label="信用代码"
          width="180"
        ></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="county" label="行政区"></el-table-column>
        <el-table-column prop="inputUser" label="录入人"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">{{
            $root.displayName("devStatus", row.status)
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template v-slot="{ row }">
            <el-link type="primary" @click.native.prevent="detailsMsg(row)"
              >详情</el-link
            >
            <el-dropdown trigger="click" class="margin-left-15">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(row)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item
                  :disabled="row.status !== 'Draft'"
                  @click.native.prevent="remove(row)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item
                  :disabled="row.status !== 'WaitAuditByBranchHead'"
                  @click.native.prevent="revocationMsg(row)"
                  >撤回
                </el-dropdown-item>
                <el-dropdown-item @click.native.prevent="checkMsg(row)"
                  >审核</el-dropdown-item
                >
                <el-dropdown-item
                  :disabled="row.status !== 'Audited'"
                  @click.native.prevent="changeMsg(row)"
                  >变更信息</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
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

    <ih-dialog :show="dialogVisible" desc="变更录入人">
      <UpdateUser
        :data="selection"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UpdateUser from "./dialog/updateUser.vue";
import {
  post_company_getList,
  get_company_delete__id,
} from "../../api/developer/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {
    UpdateUser,
  },
  mixins: [PaginationMixin],
})
export default class DeveloperList extends Vue {
  queryPageParameters: any = {
    name: null,
    creditCode: null,
    status: null,
    provinceOption: Array,
    inputUser: null,
  };
  selection: any = [];
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  currentPage: any = 1;
  total: any = null;
  dialogVisible = false;

  private get updataUserDisabled() {
    return this.selection.length === 0;
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_company_getList(this.queryPageParameters);
  }

  reset() {
    this.queryPageParameters = {
      name: null,
      creditCode: null,
      status: null,
      provinceOption: Array,
      inputUser: null,
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
  }

  async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await get_company_delete__id({ id: row.id });
      this.resPageInfo.list.splice(row.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  addMsg() {
    this.$router.push("/developers/edit");
  }

  edit(row: any) {
    this.$router.push({
      path: "/developers/edit",
      query: {
        id: row.id,
      },
    });
  }

  handleSelectionChange(val: any) {
    this.selection = val.map((v: any) => ({
      name: v.name,
      id: v.id,
    }));
    console.log(this.selection);
  }

  changeMsg(row: any) {
    console.log(row);
    this.$router.push("/developers/change");
  }

  detailsMsg(row: any) {
    this.$router.push({
      path: "/developers/details",
      query: {
        id: row.id,
      },
    });
  }

  checkMsg(row: any) {
    this.$router.push({
      path: "/developers/check",
      query: {
        id: row.id,
      },
    });
  }

  revocationMsg(row: any) {
    this.$router.push({
      path: "/developers/revocation",
      query: {
        id: row.id,
      },
    });
  }

  search() {
    console.log(this.queryPageParameters);
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>
