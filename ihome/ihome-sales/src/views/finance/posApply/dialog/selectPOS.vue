<!--
 * @Description: 选择POS机
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-23 11:50:23
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-23 11:56:01
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择POS机列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="80%"
  >
    <el-form label-width="80">
      <el-row>
        <el-col :span="8">
          <el-form-item label="序列号">
            <el-input
              v-model="queryPageParameters.noticeNo"
              placeholder="请输入序列号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="账户名称">
            <el-input
              v-model="queryPageParameters.noticeNo"
              placeholder="请输入账户名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select
              v-model="queryPageParameters.status"
              placeholder="请选择状态"
              clearable
              class="width--100"
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('PosTerminalStatus')"
                :key="n"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="商户号">
            <el-input
              v-model="queryPageParameters.merchantNo"
              placeholder="请输入商户号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="终端号">
            <el-input
              v-model="queryPageParameters.terminalNo"
              placeholder="请输入终端号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
