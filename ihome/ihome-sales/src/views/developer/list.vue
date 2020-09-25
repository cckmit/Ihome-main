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
                v-model="queryPageParameters.devStatus"
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
              <el-cascader
                style="width: 100%"
                placeholder="请选择省市区"
                :options="queryPageParameters.provincesOptions"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.keyboarder"
                clearable
                placeholder="请选择业务类型"
              >
                <el-option
                  v-for="item in $root.displayList('accountType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="danger" @click="search()">查询</el-button>
        <el-button type="success" @click="add()">添加</el-button>
        <el-button type="success" @click="reset()">重置</el-button>
        <el-button type="info" @click="update()">变更录入人</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <ih-table
        class="ih-table"
        :data="resPageInfo.list"
        :column="tableColumn"
        :default-sort="{ prop: 'id', order: 'descending' }"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :total="resPageInfo.total"
        @selection-change="handleSelectionChange"
        @page-change="handleCurrentChangeMixin"
        @size-change="handleSizeChangeMixin"
      >
        <template #operation>
          <el-table-column fixed="right" label="操作">
            <template v-slot="{ row }">
              <el-link type="primary" @click.native.prevent="routerTo(row)"
                >详情</el-link
              >
              <el-dropdown trigger="click" class="margin-left-15">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native.prevent="routerTo(row)"
                    >修改</el-dropdown-item
                  >
                  <el-dropdown-item @click.native.prevent="routerTo(row)"
                    >删除</el-dropdown-item
                  >
                  <el-dropdown-item @click.native.prevent="routerTo(row)"
                    >撤回
                  </el-dropdown-item>
                  <el-dropdown-item @click.native.prevent="routerTo(row)"
                    >审核</el-dropdown-item
                  >
                  <el-dropdown-item @click.native.prevent="routerTo(row)"
                    >变更信息</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </template>
      </ih-table>
    </template>

    <ih-dialog :show="dialogVisible" desc="用户新增编辑">
      <!-- <UserAdd
        :data="addData"
        @cancel="()=>dialogVisible=false"
        @finish="(data)=>{dialogVisible=false;finish(data)}"
      />-->
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import UserAdd from "./add.vue";
import {
  post_user_getList,
  post_user_delete__id,
  //   post_user_lock__id,
} from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {
    // UserAdd,
  },
  mixins: [PaginationMixin],
})
export default class DeveloperList extends Vue {
  queryPageParameters: any = {
    name: null,
    creditCode: null,
    devStatus: null,
    ProvincesOptions: Array,
    keyboarder: null,
    pageSize: 20,
    pageNum: 1,
  };

  tableColumn = [
    {
      label: "名称",
      prop: "name",
    },
    {
      label: "信用代码",
      prop: "creditCode",
    },
    {
      label: "省份",
      prop: "province",
    },
    {
      label: "城市",
      prop: "city",
    },
    {
      label: "行政区",
      prop: "administrative",
    },
    {
      label: "录入人",
      prop: "keyboarder",
    },
    {
      label: "状态",
      prop: "status",
    },
    {
      slot: "operation",
    },
  ];
  jobVisibleData: any = null;
  OrganizationJurisdictionData: any = null;
  copyUserData: any = null;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.queryPageParameters.employmentDateStart = dateArray[0];
    this.queryPageParameters.employmentDateEnd = dateArray[1];
  }
  leaveDateChange(dateArray: any) {
    console.log(dateArray);
    this.queryPageParameters.leaveDateStart = dateArray[0];
    this.queryPageParameters.leaveDateEnd = dateArray[1];
  }

  reset() {
    this.queryPageParameters = {
      name: null,
      creditCode: null,
      devStatus: null,
      ProvincesOptions: Array,
      keyboarder: null,
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
  }

  addData: any = null;
  value: any = "";

  organizationJurisdictionVisible = false;
  jobVisible = false;
  copyUserVisible = false;

  currentPage: any = 1;
  valuedate: any = new Date().getTime();
  // valuedate: any ='2020-07-01';
  tableData: any = [];
  total: any = null;

  formatter(row: any) {
    return row.name;
  }
  dialogVisible = false;

  add(data: any) {
    this.addData = data;
    this.$router.push("/developer/edit");
  }

  finishJob(data: any) {
    console.log(data);
    this.search();
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }

  getValue(value: any) {
    this.queryPageParameters.orgId = value;
  }

  search() {
    console.log(this.queryPageParameters);
    console.log(this.valuedate);
    this.getListMixin();
  }

  info(scope: any) {
    this.$router.push({
      path: "/user/info",
      query: { id: scope.row.id },
    });
  }
  edit(scope: any) {
    this.add(scope.row);
  }

  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_user_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  finishCopyUser(data: any) {
    console.log(data);
    this.search();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.copyUserData = val;
  }
}
</script>
<style lang="scss" scoped>
</style>
