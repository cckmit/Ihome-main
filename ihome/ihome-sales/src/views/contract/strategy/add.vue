<!--
 * @Description: 甲方/中介战略协议 ‘录入-编辑’ 页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 14:41:06
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-27 16:34:49
-->
<template>
  <ih-page>
    <template v-slot:info>
      <p class="ih-info-title">基础信息</p>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              <el-input
                v-model="ruleForm.name"
                placeholder="标题"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              <el-select
                v-model="ruleForm.name"
                placeholder="甲方"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              <el-select
                v-model="ruleForm.name"
                placeholder="乙方"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议时间">
              <el-date-picker
                style="width:100%;"
                v-model="ruleForm.employmentDate"
                type="date"
                align="left"
                placeholder="年/月/日"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议编号">
              <el-input
                v-model="ruleForm.name"
                placeholder="协议编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              <el-input
                v-model="ruleForm.name"
                placeholder="归档编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              <el-select
                v-model="ruleForm.name"
                placeholder="归档状态"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态">
              <el-select
                v-model="ruleForm.name"
                placeholder="当前状态"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="未盖章扫描件">
              <IhUpload
                :file-list="fileList"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                :file-list="fileList2"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="text-align:left;">
              <el-button type="primary">保存草稿</el-button>
              <el-button type="primary">提交审核</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
Component.registerHooks(["beforeRouteEnter"]);
@Component({})
export default class StrategyAdd extends Vue {
  private ruleForm: any = {};
  private isAdd!: boolean;
  private fileList: Array<object> = [
    {
      name: "abc.pdf",
      url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
      img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
    },
  ];
  private fileList2: Array<object> = [];

  private beforeRouteEnter(to: any, from: any, next: any) {
    console.log(to, next, "asdasd");
    next((vm: any) => {
      vm.isAdd = to.name === "StrategyAdd";
    });
  }
}
</script>