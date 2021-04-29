<!--
 * @Description: 角色列表
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-29 14:15:19
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-29 14:36:08
-->
<template>
  <div>
    <el-row>
      <el-col
        :span="24"
        class="text-right"
      >
        <el-input
          class="width-250"
          placeholder="请输入名称"
          v-model="name"
          clearable
        ></el-input>
        <!-- @keyup.enter.native="search()" -->
        <!-- <el-button
          class="margin-left-10"
          type="primary"
          @click="search()"
        >查询</el-button> -->
      </el-col>
    </el-row>
    <el-row>
      <br />
      <el-table
        class="ih-table"
        :data="searchList"
      >
        <el-table-column
          type="index"
          width="55px"
          align="center"
          label="序号"
          fixed
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="编码"
          prop="code"
        ></el-table-column>
        <el-table-column
          label="修改时间"
          prop="updateTime"
        ></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_role_getAllByUserId__userId } from "../../../api/system/index";
// import PaginationMixin from "../../../mixins/pagination";

@Component({
  // mixins: [PaginationMixin],
})
export default class UserOrg extends Vue {
  queryPageParameters: any = {
    name: null,
  };
  name: any = "";
  list: any[] = [];
  resPageInfo: any = {
    total: null,
    list: [],
  };

  created() {
    this.getListMixin();
  }
  async getListMixin() {
    let userId = this.$route.query.id;
    try {
      this.list = await post_role_getAllByUserId__userId({ userId });
    } catch (error) {
      console.log(error);
    }
  }
  get searchList() {
    return this.list.filter((i: any) => i.name.includes(this.name));
  }
  private search() {
    // this.getListMixin();
  }
}
</script>
