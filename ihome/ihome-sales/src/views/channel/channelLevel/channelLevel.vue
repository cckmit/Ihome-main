<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-10 17:04:40
-->
<template>
  <IhPage>
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道商名称">
              <el-select
                v-model="queryPageParameters.distributorsName"
                clearable
                placeholder="渠道商名称"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('distributorsName')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道等级">
              <el-select
                v-model="queryPageParameters.ChannelLevel"
                clearable
                placeholder="渠道等级"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('ChannelLevel')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市等级">
              <el-select
                v-model="queryPageParameters.cityLevel"
                clearable
                placeholder="城市等级"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('cityLevel')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务开展省份">
              <el-select
                v-model="queryPageParameters.provinces"
                clearable
                placeholder="请选择省份"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('provinces')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务开展城市">
              <el-select
                v-model="queryPageParameters.city"
                clearable
                placeholder="请选择城市"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('city')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.division"
                clearable
                placeholder="事业部"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('division')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.state"
                clearable
                placeholder="状态"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('state')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-select
                v-model="queryPageParameters.enterPeople"
                clearable
                placeholder="录入人"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('enterPeople')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特批入库">
              <el-select
                v-model="queryPageParameters.SpecialStorage"
                clearable
                placeholder="特批入库"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('SpecialStorage')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库编号">
              <el-input
                v-model="queryPageParameters.account"
                placeholder="入库编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row class="el-row">
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="empty()"
        >清空</el-button>
        <el-button
          type="success"
          @click="add()"
        >添加</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :default-sort="{prop: 'id', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          prop="storageNum"
          label="入库编号"
          width="160"
        ></el-table-column>
        <el-table-column
          fixed
          type="channelName"
          label="渠道商名称"
          width="150"
        ></el-table-column>
        <el-table-column
          fixed
          prop="province"
          label="业务开展省份"
          width="150"
        ></el-table-column>
        <el-table-column
          fixed
          prop="city"
          label="业务开展城市"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="cityGrade"
          label="城市等级"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="channelGrade"
          label="渠道等级"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="special"
          label="特批入库"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="departmentOrgId"
          label="事业部"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="inputUser"
          label="录入人"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="150"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click.native.prevent="info(scope)"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              style="margin-left:15px;"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="ModifyThe(scope)">修改</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="remove(scope)">删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="withdraw(scope)">撤回</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="audit(scope)">审核</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="change(scope)">变更</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_channelGrade_getList } from "../../../api/channel/index";
import PaginationMixin from "../../../mixins/pagination";
// import { city } from "../../../util/enums/dic";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  queryPageParameters: any = {
    employeeCode: null,
    employeeStatus: "On",
    provinces: "one",
    city: "one",
    state: "draft",
    status: "Valid",
    ChannelLevel: "bigPlatform",
    distributorsName: "ruijia",
    cityLevel: "firstLevel",
    division: "one",
    SpecialStorage: "",
    enterPeople: "",
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  search() {
    console.log("查询");
    // this.searchChinnelLevelInfo();
    this.getListMixin;
  }
  add() {
    console.log("添加");
    this.$router.push({
      path: "channelLevel/modifyThe",
    });
  }
  empty() {
    console.log("清空");
    this.queryPageParameters = {
      employeeCode: null,
      employeeStatus: null,
      provinces: null,
      city: null,
      state: null,
      status: null,
      ChannelLevel: "",
      distributorsName: null,
      cityLevel: null,
      division: null,
      storageNum: "",
    };
  }
  currentPage: any = 1;
  total: any = null;
  //操作
  info(scope: any) {
    this.$router.push({
      path: "channelLevel/info",
      query: { id: scope.row.id },
    });
  }
  ModifyThe(scope: any) {
    console.log("修改");
    this.$router.push({
      path: "channelLevel/modifyThe",
      query: { id: scope.row.id },
    });
  }
  remove(scope: any) {
    console.log("删除", scope);
    // this.$router.push({
    //   path: "/confirm",
    //   query: { id: scope.row.id },
    // });
  }
  withdraw() {
    console.log("撤回");
  }
  audit() {
    console.log("审核");
    this.$router.push({
      path: "channelLevel/levelInfoAudit",
    });
  }

  change(scope: any) {
    console.log("变更", scope);
    // this.$router.push({
    //   path: "/MaintenanceOfChannels",
    //   query: { id: scope.row.id },
    // });
  }
  created() {
    this.getListMixin();
  }

  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_channelGrade_getList({
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    });
    // this.resPageInfo = await post_channelGrade_getList(
    //   this.queryPageParameters
    // );
  }
  async searchChinnelLevelInfo() {
    console.log("查询");
  }

  handleSelectionChange(val: any) {
    console.log(val);
    // this.queryPageParameters.pageSize = val;
  }
  handleSizeChangeMixin(val: any) {
    console.log("页码大小", val);
    this.queryPageParameters.pageSize = val;
    this.getListMixin();
  }
  handleCurrentChangeMixin(val: any) {
    console.log("指定页码", val);
    this.queryPageParameters.pageNum = val;
    this.getListMixin();
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
