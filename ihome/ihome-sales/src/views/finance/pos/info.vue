<!--
 * @Description: POS机详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-19 08:39:59
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-19 09:07:44
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">POS机信息</p>
      <el-form
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款账户">
              <span>xxxx</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号">xxxx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品型号">xxxx</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="序列号">xxxx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">xxxx</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">银行卡收款信息</p>
      <el-form
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户号">xxxx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终端号">xxxx</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">POS通信息</p>
      <el-form
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="商户号">xxxx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终端号">xxxx</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">使用信息</p>
      <el-form
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="当前保管人">xxxx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在事业部">xxxx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在店组">xxxx</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联动项目">xxxx</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">操作日志</p>
      <div class="padding-left-20">
        <el-table style="width: 100%">
          <el-table-column
            prop="operateTime"
            label="操作"
          ></el-table-column>
          <el-table-column
            prop="operateTime"
            label="操作人"
          ></el-table-column>
          <el-table-column
            prop="operateTime"
            label="操作时间"
          ></el-table-column>
          <el-table-column
            prop="operateTime"
            label="处理结果"
          ></el-table-column>
          <el-table-column
            prop="operateTime"
            label="备注"
          ></el-table-column>
        </el-table>
      </div>
    </template>
  </IhPage>
</template>

<style lang="scss" scoped>
.text-ellipsis {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
