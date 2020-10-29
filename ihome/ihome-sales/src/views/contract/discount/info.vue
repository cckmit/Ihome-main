<!--
 * @Description: 优惠告知书详情页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 17:27:00
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-29 15:54:30
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
          <el-col :span="12">
            <el-form-item label="优惠告知书编号">
              {{resInfo.noticeCode}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板类型">
              电子模板/纸质模板
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="甲方">
              {{resInfo.partyA}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              {{resInfo.partyB}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系电话">
              {{resInfo.partyBMobile}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方证件号码">
              {{resInfo.partyBIdNo}}
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
              {{resInfo.roomNumber}}
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
              {{ resInfo.payment }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠方式说明">
              {{resInfo.explain}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="优惠期限">
              {{resInfo.beginTime | timestampToDate('YYYY-MM-DD')}} ~ {{resInfo.endTime | timestampToDate('YYYY-MM-DD')}}
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
              {{resInfo.refundDays}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经办人">
              {{resInfo.agent}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="告知书电子版">
              <el-button
                type="success"
                @click="preview()"
              >预览电子版</el-button>
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

import { get_notice_detail__id } from "@/api/contract/index";

@Component({})
export default class DiscountDetail extends Vue {
  private fileList: Array<object> = [];
  private resInfo: any = {};

  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) this.resInfo = await get_notice_detail__id({ id: id });
  }

  private async preview(): Promise<void> {
    this.$message.warning("接口没有实现");
    return;
    // let id = this.$route.query.id;
    // await get_notice_preview__id({ id });
  }

  created() {
    this.getInfo();
  }
}
</script>
