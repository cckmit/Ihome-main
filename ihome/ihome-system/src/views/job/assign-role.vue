<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 10:03:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-04 15:09:53
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
    style="text-align: left;"
    class="dialog"
  >
    <div class="text-left dialog-transfer">
      <el-transfer
        style="height:500px;"
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
import { getRoleList } from "../../api/system/index2";
// import { DictionariesModule } from "../../store/modules/dictionaries";
@Component({
  components: {},
})
export default class JobAddEdit extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

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
      "chengdu",
    ];
    cities.forEach((city, index) => {
      dataList.push({
        label: city,
        key: index,
        pinyin: pinyin[index],
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

  async created() {
    console.log(this.data);
    const { total, list } = await getRoleList();
    list.forEach((item: any) => {
      item.key = item.id;
      item.label = item.name;
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
  .el-transfer-panel,
  .el-transfer-panel__list,
  .is-filterable {
    min-height: 500px;
  }
}
</style>