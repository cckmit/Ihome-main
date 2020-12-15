<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 10:03:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-15 15:25:29
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
    style="text-align: left"
    class="dialog"
  >
    <div class="text-left dialog-transfer">
      <el-transfer
        style="max-height: 100%"
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
import {
  get_role_getAll,
  post_job_addJobRoleBatch,
} from "../../api/system/index";
@Component({
  components: {},
})
export default class JobAddEdit extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  leftData: any = [];
  rightData: any = [];
  filterMethod(query: any, item: any) {
    return item.code.indexOf(query) > -1 || item.name.indexOf(query) > -1;
  }

  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    console.log(this.rightData);
    if (this.rightData.length == 0) {
      this.$message.warning("右边列表有数据才能提交");
      return;
    }
    let p = {
      jobId: this.data.id,
      roleIds: this.rightData,
    };
    const res = await post_job_addJobRoleBatch(p);

    console.log(res);
    this.$message.success("操作成功");

    this.$emit("finish", res);
  }

  async created() {
    console.log(this.data);

    const list = await get_role_getAll();
    list.forEach((item: any) => {
      item.key = item.id;
      item.label = item.name + " (" + item.code + ")";
    });

    this.leftData = list;
    this.rightData = (this.data.jobRoleList || []).map((item: any) => {
      return item.id;
    });
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
  // .el-transfer-panel,
  // .el-transfer-panel__list,
  // .is-filterable {
  //   min-height: 500px;
  // }
  .el-transfer-panel__list.is-filterable {
  }
  .el-transfer-panel__body {
    height: 500px !important;
  }
  .el-transfer-panel__list.is-filterable {
    height: 430px !important;
  }
}
</style>