<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 14:34:44
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-15 09:34:53
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="分配角色"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    top="20px"
    style="text-align: left;"
    class="dialog user-job-role-dialog"
  >
    <div>
      <p class="p-left-border">岗位</p>
      <div style="text-align:right;">
        <el-input
          style="width:300px;"
          placeholder="名称 编码"
          class="input-with-select"
          v-model="keyword"
        >
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </el-input>
      </div>
      <br />
      <el-table :data="filterTable" height="250" border style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="code" label="编号" width="180"></el-table-column>
        <el-table-column prop="roleList" label="岗位权限"></el-table-column>
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
// import { Form as ElForm } from "element-ui";
import { getRoleList } from "../../../api/system/index2";
// import { DictionariesModule } from "../../store/modules/dictionaries";
@Component({
  components: {}
})
export default class UserJobRole extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) datax: any;
  dialogVisible = true;
  keyword = "";

  generateData() {
    const dataList: any = [];
    const cities = ["上海", "北京", "广州", "深圳", "南京", "西安", "成都"];
    const pinyin = [
      "shanghai",
      "beijing",
      "guangzhou",
      "shenzhen",
      "nanjing",
      "xian",
      "chengdu"
    ];
    cities.forEach((city, index) => {
      dataList.push({
        label: city,
        key: index,
        pinyin: pinyin[index]
      });
    });
    return dataList;
  }
  leftData: any = [];
  rightData: any = [];

  filterMethod(query: any, item: any) {
    return item.code.indexOf(query) > -1 || item.name.indexOf(query) > -1;
  }

  cancel() {
    this.$emit("cancel", false);
  }

  finish() {
    this.$emit("finish", {});
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
    for (let index = 0; index < 10; index++) {
      this.tableData.push({
        name: "文员岗" + index,
        code: "abcd",
        roleList: "ROfficeClerk、RAgent"
      });
    }

    const { total, list } = await getRoleList();
    list.forEach((item: any) => {
      item.key = item.id;
      item.label = item.name + `（${item.code}）`;
    });
    console.log(total, list);
    this.leftData = list;
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