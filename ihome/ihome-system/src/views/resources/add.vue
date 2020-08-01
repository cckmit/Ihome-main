<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 17:16:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 15:40:28
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="资源新增"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left;"
    class="dialog"
  >
    <el-table sum-text="+" :data="formList" style="width: 100%">
      <el-table-column prop="add" label="操作" width="60">
        <template slot-scope="scope">
          <i style=" cursor: pointer;" @click="reduceLine(scope)" class="el-icon-minus"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" placeholder="类型" style="width:100%;">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="名称"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="父编码">
        <template>
          <span>{{pageData.parentCode}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="编码">
        <template slot-scope="scope">
          <el-input v-model="scope.row.code" placeholder="编码"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="URL" width="300">
        <template slot-scope="scope">
          <el-input v-model="scope.row.url" placeholder="URL"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <p class="add-line">
      <i style=" cursor: pointer;" @click="addLine()" class="el-icon-plus"></i>
    </p>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DictionariesModule } from "../../store/modules/dictionaries";
import { post_resource_addBatch } from "../../api/system/index";
@Component({
  components: {},
})
export default class ResourcesAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  get options() {
    // DictionariesModule.getModular();
    return DictionariesModule.modular;
    // let list = [
    //   // { value: "Root", label: "资源根节点" },
    //   { value: "System", label: "系统" },
    //   { value: "Service", label: "服务模块" },
    //   { value: "Menu", label: "功能菜单" },
    //   { value: "Api", label: "API" },
    //   { value: "Button", label: "按钮" },
    //   { value: "Element", label: "元素" },
    // ];
    // return list;
  }

  pageData: any = {};

  formList: any[] = [];
  created() {
    console.log(this.data);
    this.pageData = this.data;

    this.push();
  }
  push() {
    this.formList.push({
      code: null,
      name: null,
      parentId: this.pageData.parentId,
      type: null,
      url: null,
    });
  }

  cancel() {
    this.$emit("cancel", false);
  }
  async finish() {
    console.log(this.formList);
    const res = await post_resource_addBatch(this.formList);
    console.log(res);
    this.$message({
      message: "添加成功",
      type: "success",
    });
    this.$emit("finish", {});
    // this.$emit("finish", {});
  }

  reduceLine(item: any) {
    console.log(item);
    this.formList.splice(item.$index, 1);
  }
  addLine() {
    this.push();
  }
}
</script>
<style lang="scss" scoped>
.add-line {
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}
</style>