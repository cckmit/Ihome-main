<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="ruleForm"
    label-width="200px"
    class="text-left"
  >
  <h1>事业部下拉框分页</h1>
    <el-form-item
      label="默认使用"
      prop="testInput"
      :rules="[
        { required: true, message: '请选择用户'},
      ]"
    >
      <!-- clearable：是否可以清空选项；disabled：是否禁用；placeholder：占位符 -->
      <IhSelectPageDivision
        v-model="form.testInput"
        placeholder="默认使用"
        clearable
      >
      </IhSelectPageDivision>
    </el-form-item>
    <el-form-item label="自定义模板使用">
      <IhSelectPageDivision
        v-model="form.testInput1"
        clearable
      >
        <!-- 自定义模板使用 v-slot返回来的data：当前每条的数据；index：每一条数据的下标 -->
        <template v-slot="{ data }">
          <span style="float: left">{{ data.name }}</span>
          <span
            class="margin-left-30"
            style="float: right; color: #8492a6; font-size: 13px"
          >{{ data.employeeCode }}</span>
        </template>
      </IhSelectPageDivision>
    </el-form-item>
    <el-form-item label="绑定值为对象">
      <!-- 如果需要绑定值为对象，value-key必须传 -->
      <IhSelectPageDivision
        v-model="form.testInput3"
        class="width-300"
        clearable
        value-key="id"
      >
      </IhSelectPageDivision>
      <span>选中的值：{{form.testInput3}}</span>
    </el-form-item>
    <el-form-item label="测试继承">
      <!-- searchPlaceholder：搜索框提示语, isKeyUp：设置回车搜索 -->
      <SelectPageByOther
        class="width-300"
        v-model="form.testInput4"
        :isKeyUp="true"
        :props="{
          value: 'id',
          key: 'id',
          lable: 'name'
        }"
        :searchPlaceholder="'2020-10-27 10:10:00' | timestampToDate('YYYY-MM-DD')"
      >
      </SelectPageByOther>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_company_getAll } from "@/api/system/index";

import SelectPageByOther from "./components/SelectPageByOther.vue";
import { IhSelectPageDivision } from "../ihome-package/ui/packages/select-page/index";

@Component({
  components: { SelectPageByOther, IhSelectPageDivision },
})
export default class SelectPageDemo extends Vue {
  form = {
    testInput: "",
    testInput1: "",
    testInput2: "",
    testInput3: {
      id: 2,
      name: "张三",
    },
    testInput4: "",
  };
  private rules = {};

  /**
   * @description: 传递给下拉框列表数据的方法
   * @param {*} req 组件那边返回的参数 pageInfo...等
   * @return {*} promise方法 -- 必须
   */
  handleFun(req: any) {
    return post_company_getAll(req);
  }
}
</script>
