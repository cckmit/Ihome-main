<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 14:34:44
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-25 10:26:20
--> 
<template>
  <el-dialog
    v-dialogDrag
    :title="'分配角色(' + data.name + data.account + ')'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    top="20px"
    style="text-align: left"
    class="dialog user-job-role-dialog"
  >
    <div>
      <h3>注意：此页面权限为岗位+角色，即选中岗位的所有角色和角色选中的总和</h3>
      <hr />

      <p class="p-left-border">岗位</p>
      <div style="text-align: right">
        <!-- <el-link @click="cancelClick()" style="float: left; margin-top: 20px"
          >取消选择</el-link
        > -->
        <el-input
          style="width: 300px"
          placeholder="名称 编码"
          class="input-with-select"
          v-model="keyword"
        >
          <!-- <el-button slot="append" icon="el-icon-search" @click="search()"></el-button> -->
        </el-input>
      </div>
      <br />
      <el-table
        :data="filterTable"
        height="250"
        border
        highlight-current-row
        style="width: 100%"
        @current-change="currentChange"
      >
        <el-table-column property="selected" label width="30">
          <template slot-scope="scope">
            <ih-table-radio
              :radio="scope.row.id == currentItem.id"
            ></ih-table-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="code" label="编号" width="180"></el-table-column>
        <el-table-column prop="jobRoleList" label="岗位权限">
          <template slot-scope="scope">
            <span
              class="margin-left:10px;"
              v-for="(item, index) in scope.row.jobRoleList"
              :key="index"
            >
              【{{ item.name }}】
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <p class="p-left-border">角色</p>
    <div class="text-left dialog-transfer">
      <el-transfer
        class="width--100"
        :titles="['可选数据', '选中数据']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="角色名称 编码"
        v-model="rightData"
        :data="leftData"
      ></el-transfer>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  post_job_getAll,
  // post_role_getAllByJobId__jobId,
  get_role_getAll,
  post_user_addJobAndRoleBatch,
  post_role_getAllByUserId__userId,
} from "../../../api/system/index";

// import { DictionariesModule } from "../../store/modules/dictionaries";
@Component({
  components: {},
})
export default class UserJobRole extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  keyword = "";

  currentItem: any = { id: null };
  leftData: any = [];
  rightData: any = [];

  filterMethod(query: any, item: any) {
    return (
      item.code.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    if (this.currentItem && this.currentItem.id > 0) {
      let p: any = {
        id: this.data.id,
        jobId: this.currentItem.id,
        roleIds: this.rightData,
      };
      console.log(p);
      const res = await post_user_addJobAndRoleBatch(p);
      this.$message.success("操作成功");
      this.$emit("finish", res);
    } else {
      this.$message.warning("请先选择岗位");
    }
  }
  tableData: any = [];
  includesJs(name: any, keyword: any) {
    return name.toLowerCase().includes(keyword.toLowerCase());
  }

  get filterTable() {
    return this.search();
  }
  search() {
    //tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))
    let list = this.tableData.filter((item: any) => {
      if (this.keyword && this.keyword.length > 0) {
        return (
          this.includesJs(item.name, this.keyword) ||
          this.includesJs(item.code, this.keyword)
        );
      } else {
        return true;
      }
    });
    return list;
  }

  async created() {
    this.currentItem.id = this.data.jobId;
    let [tableData, list, roleList] = await Promise.all([
      post_job_getAll(),
      get_role_getAll(),
      post_role_getAllByUserId__userId({
        userId: this.data.id,
      }),
    ]);
    this.tableData = tableData;
    list.forEach((item: any) => {
      item.key = item.id;
      item.label = item.name + `（${item.code}）`;
    });
    this.leftData = list;
    this.rightData = roleList.map((item: any) => {
      return item.id;
    });
  }
  cancelClick() {
    this.currentItem = { id: null };
  }
  async currentChange(val: any) {
    console.log(val);
    if (!val) {
      val = { id: null };
    }

    this.currentItem = val;
    // const res = await post_role_getAllByJobId__jobId({
    //   jobId: this.currentItem.id,
    // });
    // res.forEach((item: any) => {
    //   item.key = item.id;
    //   item.label = item.name + `（${item.code}）`;
    // });
    // this.rightData = res.map((item: any) => {
    //   return item.id;
    // });
    // console.log(this.rightData);
  }
}
</script>
<style lang="scss" >
.dialog-transfer {
  .el-transfer-panel {
    width: 40%;
  }
  .el-input__inner {
    width: 90%;
  }
  .el-transfer-panel__filter {
    text-align: left;
  }
  //   .el-transfer-panel,
  //   .el-transfer-panel__list,
  //   .is-filterable {
  //     max-height: 200px;
  //   }
}
.user-job-role-dialog {
  .el-dialog__body {
    padding: 10px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
}
.p-left-border {
  border-left: 5px solid #f90;
  box-sizing: border-box;
  padding-left: 10px;
  line-height: 1.2em;
}
</style>