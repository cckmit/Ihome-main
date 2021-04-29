<!--
 * @Description: 组织权限
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-29 11:26:14
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-29 14:45:35
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
          label="ID"
          prop="id"
        ></el-table-column>
        <el-table-column label="组织类型">
          <template v-slot="{ row }">
            {{$root.dictAllName(row.orgType, 'OrgType')}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="修改时间"></el-table-column> -->
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_user_getAllUserOrgByUserId__userId } from "../../../api/system/index";
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
      this.list = await post_user_getAllUserOrgByUserId__userId({ userId });
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
