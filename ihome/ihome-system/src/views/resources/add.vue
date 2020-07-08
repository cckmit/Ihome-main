<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 17:16:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 10:11:20
--> 
<template>
  <el-dialog
    title="资源新增"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left;"
    class="dialog"
  >
    <el-table sum-text="+" :data="tableData" style="width: 100%">
      <el-table-column prop="add" label="操作" width="60">
        <template slot-scope="scope">
          <i style=" cursor: pointer;" @click="reduceLine(scope)" class="el-icon-minus"></i>
        </template>
      </el-table-column>
       <el-table-column label="类型" width="100">
        <template>
           <el-select v-model="value"  placeholder="类型" style="width:100%;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template>
          <el-input placeholder="名称"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="父编码">
        <template>
          <el-input placeholder="父编码"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="编码">
        <template>
          <el-input placeholder="编码"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="URL" width="300">
        <template>
          <el-input placeholder="URL"></el-input>
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
@Component({
  components: {}
})
export default class ResourcesAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  get options() {
    DictionariesModule.getModular();
    return DictionariesModule.modular;
  }
  value: any = "";

  tableData: any = [
    {
      add: "-",
      name: "王小虎"
    },
    {
      add: "-",
      name: "王小虎"
    }
  ];

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    this.$emit("finish", {});
  }
  created() {
    console.log(this.data);
  }
  reduceLine(item: any) {
    console.log(item);
    this.tableData.splice(item.$index, 1);
  }
  addLine() {
    this.tableData.push({
      add: "-",
      name: "王小虎"
    });
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