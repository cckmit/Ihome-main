<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 16:53:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-04 11:48:32
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="批量分配用户"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left;"
    class="dialog"
    top="50px"
  >
    <div>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="登录账号">
              <el-input placeholder="登录账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户类型">
              <el-select v-model="value" clearable placeholder="请选择用户类型" class="width--100">
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
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号码">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入职日期">
                <el-date-picker
                  style="width:100%;"
                  v-model="valuedate"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号状态">
                <el-select v-model="value" clearable placeholder="请选择状态" class="width--100">
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
              <el-form-item label="雇员状态">
                <el-select v-model="value" clearable placeholder="请选择状态" class="width--100">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="归属组织">
                <IhSelectTree
                  min-height="400px"
                  class="width--100"
                  :props="props"
                  :options="list"
                  :value="valueId"
                  :clearable="true"
                  :accordion="true"
                  @getValue="getValue($event)"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <br />

      <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="code" label="登录账号"></el-table-column>
        <el-table-column prop="code" label="入职日期"></el-table-column>
        <el-table-column prop="code" label="雇员状态"></el-table-column>
        <el-table-column prop="code" label="状态"></el-table-column>
        <el-table-column prop="code" label="归属组织"></el-table-column>
      </el-table>
      <div class="text-right padding-right-40">
        <el-pagination
          @size-change="handleSizeChangeMixin"
          @current-change="handleCurrentChangeMixin"
          :current-page.sync="queryPageParameters.pageNum"
          :page-sizes="$root.pageSizes"
          :page-size="queryPageParameters.pageSize"
          :layout="$root.paginationLayout"
          :total="resPageInfo.total"
        ></el-pagination>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  post_role_addRoleToUserBatch,
  post_user_getList,
} from "../../api/system/index";
// import { Form as ElForm } from "element-ui";
import PaginationMixin from "../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class BatchOperationUser extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  selectList: any = [];
  queryPageParameters: any = {
    key: null,
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    if (this.selectList.length > 0) {
      let p: any = {
        roleId: this.data.id,
        userIds: this.selectList.map((item: any) => item.id),
      };
      console.log(p);
      const res = await post_role_addRoleToUserBatch(p);
      this.$message.success("操作成功");

      this.$emit("finish", res);
    } else {
      this.$message.warning("请先选择数据");
    }
  }

  async getListMixin() {
    this.resPageInfo = await post_user_getList();
  }
  async created() {
    this.getListMixin();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val;
  }
}
</script>
<style lang="scss" scoped>
</style>