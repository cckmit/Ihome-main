<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: lgf
 * @LastEditTime: 2020-10-09 16:59:34
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="line">{{
        $route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <ih-page>
      <template v-slot:form>
        <el-form ref="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="城市等级">
                <el-select
                  v-model="queryPageParameters.cityGrade"
                  clearable
                  placeholder="城市等级"
                  class="width--100"
                >
                  <el-option
                    v-for="item in $root.displayList('cityLevel')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="渠道等级">
                <el-select
                  v-model="queryPageParameters.channelGrade"
                  clearable
                  placeholder="渠道等级"
                  class="width--100"
                >
                  <el-option
                    v-for="item in $root.displayList('ChannelLevel')"
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
        <br />
        <el-row class="el-row">
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="success" @click="add()">添加</el-button>
          <el-button type="info" @click="empty()">清空</el-button>
          <el-button type="info" @click="upMethods()"
            >上传供应商管理办法</el-button
          >
          <el-button type="info" @click="viewMethods()"
            >查看供应商管理办法</el-button
          >
        </el-row>
      </template>

      <template v-slot:table>
        <br />
        <el-table
          class="ih-table"
          :data="resPageInfo.list"
          :default-sort="{ prop: 'id', order: 'descending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed
            prop="cityGrade"
            label="城市等级"
            width="360"
          ></el-table-column>

          <el-table-column
            fixed
            prop="channelGrade"
            label="渠道等级"
            width="360"
          ></el-table-column>
          <el-table-column
            prop="gradeItem"
            label="评级项"
            width="360"
          ></el-table-column>
          <el-table-column
            prop="gradeStandard"
            label="评级标准"
            width="360"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click.native.prevent="viewMaterial(scope)"
                >查看所需材料</el-link
              >
              <el-dropdown trigger="click" style="margin-left: 15px">
                <span class="el-dropdown-link">
                  更多操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native.prevent="ModifyThe(scope)"
                    >修改</el-dropdown-item
                  >
                  <el-dropdown-item @click.native.prevent="remove(scope)"
                    >删除</el-dropdown-item
                  >
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
      <!-- <EntryToModify /> -->
      <ih-dialog :show="dialogVisible" desc="用户新增编辑">
        <EntryToModify
          :data="addData"
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_channelGradeStandard_getList } from "../../../api/channel/index";
import PaginationMixin from "../../../mixins/pagination";
// import { city } from "../../../util/enums/dic";
import EntryToModify from "./dialog/EntryToModify.vue";
@Component({
  components: { EntryToModify },
  mixins: [PaginationMixin],
})
export default class ChannelRatings extends Vue {
  queryPageParameters: any = {
    ChannelLevel: "bigPlatform",
    cityLevel: "firstLevel",
    pageNum: 1,
    pageSize: 10,
  };
  dialogVisible = false;
  addData: any = null;
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  private multipleSelection: any = [];
  search() {
    console.log("查询");
    this.getListMixin;
  }
  add() {
    console.log("添加");
    this.dialogVisible = true;
  }
  upMethods() {
    console.log("上传管理办法");
    this.$router.push({
      path: "/channelRatings/upMethods",
    });
  }
  viewMethods() {
    console.log("查看管理办法");
    this.$router.push({
      path: "/channelRatings/viewMethods",
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
  viewMaterial() {
    // this.$router.push({
    //   path: "/channelLevel/info",
    //   query: { id: scope.row.id },
    // });
    console.log("查看所需材料");
  }
  ModifyThe() {
    console.log("修改");
    // this.$router.push({
    //   path: "/channelLevel/ModifyThe",
    //   query: { id: scope.row.id },
    // });
  }
  remove() {
    console.log("删除");
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
      path: "/channelLevel/levelInfoAudit",
    });
  }

  change() {
    console.log("变更");
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
    // this.resPageInfo = await post_channelGradeStandard_getList({
    //   pageNum: this.queryPageParameters.pageNum,
    //   pageSize: this.queryPageParameters.pageSize,
    // });
    this.resPageInfo = await post_channelGradeStandard_getList(
      this.queryPageParameters
    );
  }
  async searchChinnelLevelInfo() {
    console.log("查询");
  }

  handleSelectionChange(val: any) {
    // console.log(val);
    console.log("下拉");
    this.multipleSelection = val;

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
