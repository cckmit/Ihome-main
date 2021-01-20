<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 17:16:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-16 15:03:51
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="资源新增"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1200px"
    style="text-align: left"
    class="dialog resources-list-add"
  >
    <el-form :rules="model.rules" :model="model" ref="form">
      <p>父编码：{{ pageData.parentCode }}</p>
      <p>父名称：{{ pageData.parentName }}</p>
      <el-table :data="model.tableData" style="width: 100%">
        <el-table-column prop="add" label="操作" width="60">
          <template slot-scope="scope">
            <i
              style="cursor: pointer"
              @click="reduceLine(scope)"
              class="el-icon-minus"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="150">
          <template slot-scope="scope">
            <span>
              <el-form-item
                :prop="'tableData.' + scope.$index + '.type'"
                :rules="model.rules.type"
              >
                <el-select v-model="scope.row.type" placeholder="类型">
                  <el-option
                    v-for="item in $root.dictAllList(
                      'ResourceType',
                      'AllowAdjust'
                    )"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="150">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.name'"
              :rules="model.rules.name"
            >
              <el-input v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="name" label="父编码">
          <template>
            <span>{{pageData.parentCode}}</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="code" label="编码">
          <template slot-scope="scope">
            <el-form-item
              :prop="'tableData.' + scope.$index + '.code'"
              :rules="model.rules.code"
            >
              <el-input v-model="scope.row.code"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="URL" width="250">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.url'">
              <el-input v-model="scope.row.url"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="ICON" width="200">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.icon'">
              <el-input v-model="scope.row.icon"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="seq" label="排序" width="150">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.icon'">
              <el-input v-model="scope.row.seq"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <p class="add-line">
        <i style="cursor: pointer" @click="addLine()" class="el-icon-plus"></i>
      </p>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
// import { DictionariesModule } from "../../store/modules/dictionaries";
import { post_resource_addBatch } from "../../api/system/index";
import { isUpperLetterValidato } from "ihome-common/util/base/form-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class ResourcesAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  model: any = {
    rules: {
      type: {
        type: "string",
        required: true,
        message: "类型必选",
        trigger: "change",
      },
      name: [
        { required: true, message: "请输入名称", trigger: "change" },
        {
          min: 1,
          max: 16,
          message: "长度在 1 到 16 个字符",
          trigger: "change",
        },
      ],
      code: [
        { required: true, message: "请输入编码", trigger: "change" },
        {
          min: 1,
          max: 16,
          message: "长度在 1 到 16 个字符",
          trigger: "change",
        },
        { validator: isUpperLetterValidato, trigger: "change" },
      ],
      url: [{ required: true, message: "请输入URL", trigger: "change" }],
    },
    tableData: [],
  };
  validateUrl(rule: any, value: any, callback: any) {
    if (value.length > 64) {
      callback(new Error("url不能超过64字符"));
    } else {
      callback();
    }
  }

  pageData: any = {};

  tableData: any[] = [];
  created() {
    console.log(this.data);
    this.pageData = this.data;

    this.push();
  }
  push() {
    this.model.tableData.push({
      code: null,
      name: null,
      parentId: this.pageData.parentId,
      type: null,
      url: null,
      icon: null,
      seq:null
    });
  }

  cancel() {
    this.$emit("cancel", false);
  }
  async finish() {
    console.log(this.model);
    (this.$refs["form"] as any).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any, model: any) {
    console.log(valid);
    console.log(model);
    if (valid) {
      const res = await post_resource_addBatch(this.model.tableData);
      console.log(res);
      this.$message({
        message: "添加成功",
        type: "success",
      });
      this.$emit("finish", res);
    }
  }
  reduceLine(item: any) {
    console.log(item);
    this.model.tableData.splice(item.$index, 1);
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
<style lang="scss" >
.resources-list-add {
  .el-form-item__content {
    margin-right: 0px;
  }
}
</style>