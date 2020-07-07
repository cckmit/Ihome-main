<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 09:41:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-06 17:25:25
--> 
<template>
  <div>
    <el-card class="ih-card-form">
      <el-row>
        <el-col :span="6" style="border-right: 1px solid #e6e6e6;padding-right: 20px">
          <div>
            <el-select style="width:100%;" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <br />
          <div>
            <el-input clearable placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          </div>
          <br />
          <!-- <div>
            <div style="text-align: left;">
              <el-checkbox v-model="checked1" label="全部展开" border></el-checkbox>
            </div>
          </div>-->
          <br />
          <div>
            <el-tree
              class="filter-tree"
              :data="dataTree"
              :props="defaultProps"
              :default-expand-all="true"
              :filter-node-method="filterNode"
              :highlight-current="true"
              node-key="id"
              @current-change="currentChange"
              ref="tree"
            ></el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <el-form ref="form" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称">
                  <el-input placeholder="名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="编码">
                  <el-input placeholder="编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-select v-model="value" clearable placeholder="请选择类型" style="width:100%;">
                    <el-option
                      v-for="item in options"
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
                <el-form-item label="url">
                  <el-input placeholder="url"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="btn-list">
              <el-button type="primary">查询</el-button>
              <el-button @click="add()" type="success">添加</el-button>
              <el-button type="info">重置</el-button>
            </el-row>
          </el-form>
          <el-table
            :data="resourceList"
            style="margin:20px;"
            class="ih-table"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column fixed prop="name" label="名称" sortable width="180"></el-table-column>
            <el-table-column prop="code" label="编码" sortable width="90"></el-table-column>

            <el-table-column prop="type" label="类型" sortable width="90"></el-table-column>
            <el-table-column prop="url" label="URL" sortable></el-table-column>
            <el-table-column prop="parentName" label="父资源" sortable width="180"></el-table-column>

            <el-table-column prop="createUser" label="创建人" sortable width="90"></el-table-column>

            <el-table-column prop="createTime" label="创建时间" sortable width="180"></el-table-column>

            <el-table-column prop="updateUser" label="修改人" sortable width="90"></el-table-column>

            <el-table-column prop="updateTime" label="修改人时间" sortable width="180"></el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-link type="primary">详情</el-link>
                <el-dropdown trigger="click" style="margin-left:15px;">
                  <span class="el-dropdown-link" style>
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>编辑{{scope.row.id}}</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    <el-dropdown-item>批量分配角色</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="text-align: right;margin-top:20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <ih-dialog :show="dialogVisible">
      <ResourcesAdd
        data="xxx"
        @cancel="()=>dialogVisible=false"
        @finish="(data)=>{dialogVisible=false;finish(data)}"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import ResourcesAdd from "./add.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  getResourceList,
  getResourceCategory
} from "../../api/system/resource";
@Component({
  components: {ResourcesAdd}
})
export default class ResourcesList extends Vue {
  checked1 = false;
  resourceList: any = [];
  total: any = null;
  input3: any = "";
  filterText: any = "";
  currentPage: any = 1;
  dialogVisible = false;
  options: any = [
    {
      value: "1",
      label: "所有资源"
    },
    {
      value: "2",
      label: "菜单"
    },
    {
      value: "3",
      label: "按钮"
    },
    {
      value: "4",
      label: "接口"
    },
    {
      value: "5",
      label: "系统"
    },
    {
      value: "6",
      label: "模块"
    }
  ];
  value: any = "1";
  dataTree: any = [];

  defaultProps: any = {
    children: "children",
    label: "name"
  };

  @Watch("filterText")
  filterTextWatch(val: any) {
    console.log(val);
    (this.$refs.tree as any).filter(val);
  }
  filterNode(value: any, data: any) {
    if (!value) return true;
    return data[this.defaultProps.label].indexOf(value) !== -1;
  }
  search() {
    this.checked1 = !this.checked1;
  }
  async created() {
    const res: any = await getResourceCategory();
    console.log(res);
    this.dataTree = this.$tool.listToGruop(res.result, { rootId: 0 });
    this.getList();
  }
  currentChange(item: any) {
    console.log(item);
  }

  handleSizeChange(a: any) {
    console.log(a);
    this.getList();
  }
  handleCurrentChange(a: any) {
    console.log(a);
    this.getList();
  }
  async getList() {
    const { result } = await getResourceList();
    const { total, list } = result;
    console.log(list, total);
    this.resourceList = list;
    this.total = total;
  }
  
  add() {
    this.dialogVisible = true;
  }
  finish(data: any) {
    console.log(data);
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
</style>
