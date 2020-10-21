<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="ruleForm"
    label-width="200px"
    class="text-left"
  >
    <el-form-item label="默认使用">
      <!-- clearable：是否可以清空选项；disabled：是否禁用；placeholder：占位符 -->
      <IhSelectPage
        v-model="form.testInput"
        placeholder="默认使用"
        clearable
        :props="{
          lable: 'name',
          value: 'id',
          key: 'id',
        }"
      >
      </IhSelectPage>
    </el-form-item>
    <el-form-item label="自定义模板使用">
      <IhSelectPage
        v-model="form.testInput1"
        clearable
        :props="{
          lable: 'name',
          value: 'id',
          key: 'id',
        }"
      >
        <!-- 自定义模板使用 v-slot返回来的data：当前每条的数据；index：每一条数据的下标 -->
        <template v-slot="{ data, index }">
          <span style="float: left">{{ data.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ index }}</span>
        </template>
      </IhSelectPage>
    </el-form-item>
    <el-form-item label="拓展其他列表接口使用">
      <IhSelectPage
        v-model="form.testInput2"
        clearable
        :promiseFun="handleFun"
        :props="{
          lable: 'name',
          value: 'id',
          key: 'id',
        }"
      >
      </IhSelectPage>
    </el-form-item>
    <el-form-item label="绑定值为对象">
      <!-- 如果需要绑定值为对象，value-key必须传 -->
      <IhSelectPage
        v-model="form.testInput3"
        clearable
        value-key="id"
        :props="{
          lable: 'name',
          value: 'id',
          key: 'id',
        }"
      >
      </IhSelectPage>
      <span>选中的值：{{form.testInput3}}</span>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_role_getList } from "@/api/system/index";

@Component({})
export default class SelectPageDemo extends Vue {
  form = {
    testInput: "",
    testInput1: "",
    testInput2: "",
    testInput3: {
      id: 2,
      name: "张三",
    },
  };
  private rules = {};

  /**
   * @description: 传递给下拉框列表数据的方法
   * @param {*} req 组件那边返回的参数 pageInfo...等
   * @return {*} promise方法 -- 必须
   */
  handleFun(req: any) {
    return post_role_getList(req);
  }
}
</script>
