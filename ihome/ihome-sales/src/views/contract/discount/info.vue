<!--
 * @Description: 优惠告知书详情页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 17:27:00
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-27 17:46:51
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">基础信息</p>
      <el-form
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="优惠告知书编号">
              128418458315
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="甲方">
              广州居恒信息科技有限公司
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              刘伟
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系电话">
              13812345678
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方证件号码">
              12345776897
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠项目名称">
              保利XX项目
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="(拟)购买单位">
              住宅-10栋-1301
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <p class="ih-info-title">优惠信息</p>
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠服务费缴纳金额">
              50000
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠方式说明">
              5万抵10万优惠折扣
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="优惠期限">
              2020-8-1 ~ 2020-8-31
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <p class="ih-info-title">其他</p>
      <el-form
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方退款天数">
              30
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人">
              爱家案场A
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="告知书电子版">
              <el-button type="success">预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="告知书扫描件">
              <IhUpload
                :file-list="fileList"
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
export default class DiscountDetail extends Vue {
  private fileList: Array<object> = [
    {
      name: "abc.pdf",
      url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
      img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
    },
  ];
}
</script>
