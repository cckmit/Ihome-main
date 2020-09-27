<!--
 * @Description: 甲方/中介战略协议详情页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 14:41:06
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-27 16:34:59
-->
<template>
  <IhPage class="text-left">
    <template #info>
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
              XXX合作框架协议
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              保利地产
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              广州居恒
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议时间">
              2020-09-01 至 2020-09-27
              <!-- <el-date-picker
                style="width:100%;"
                v-model="ruleForm.employmentDate"
                type="date"
                align="left"
                placeholder="年/月/日"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
              ></el-date-picker> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议编号">
              (自动生成)
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              (自动生成)
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
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class StrategyDetail extends Vue {
  private ruleForm: any = {};
  private fileList: Array<object> = [
    {
      name: "abc.pdf",
      url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
      img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
    },
  ];
  private fileList2: Array<object> = [];
}
</script>
