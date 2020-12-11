<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="ruleForm"
    label-width="200px"
    class="text-left"
  >
    <div class="text-center">下拉分页-- 默认宽度是100%</div>
    <el-form-item
      label="默认使用: "
      prop="testInput"
    >clearable：是否可以清空选项；disabled：是否禁用；placeholder：占位符</el-form-item>
    <el-form-item :rules="[
        { required: true, message: '请选择用户'},
      ]">
      <IhSelectPageUser
        v-model="form.testInput"
        placeholder="默认使用"
        clearable
      >
      </IhSelectPageUser>
    </el-form-item>
    <el-form-item label="自定义模板使用:">
      自定义模板使用 v-slot返回来的data：当前每条的数据；index：每一条数据的下标
    </el-form-item>
    <el-form-item>
      <IhSelectPageUser
        v-model="form.testInput1"
        clearable
      >

        <template v-slot="{ data }">
          <span style="float: left">{{ data.name }}</span>
          <span
            class="margin-left-30"
            style="float: right; color: #8492a6; font-size: 13px"
          >{{ data.employeeCode }}</span>
        </template>
      </IhSelectPageUser>
    </el-form-item>
    <el-form-item label="绑定值为对象">
      如果需要绑定值为对象,value-key必须传,searchName是指定的搜索值,changeOption是选中值的回调
    </el-form-item>
    <el-form-item>

      <IhSelectPageUser
        v-model="form.testInput3.id"
        :searchName="form.testInput3.name"
        @changeOption="(data) => {form.data = data}"
        class="width-300"
        clearable
        value-key="id"
      >
      </IhSelectPageUser>
      <span>选中的值：{{form.data}}</span>
    </el-form-item>
    <el-form-item label="测试继承">
      searchPlaceholder：搜索框提示语, isKeyUp：设置回车搜索
    </el-form-item>
    <el-form-item>
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
    <el-form-item label="事业部">事业部继承组件用法</el-form-item>
    <el-form-item>
      <IhSelectPageDivision v-model="form.testInput5"></IhSelectPageDivision>
    </el-form-item>
    <el-form-item label="渠道商">渠道商继承组件用法</el-form-item>
    <el-form-item>
      <IhSelectPageByChannel v-model="form.testInput6"></IhSelectPageByChannel>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_company_getAll } from "@/api/system/index";

import SelectPageByOther from "./components/SelectPageByOther.vue";
import {
  IhSelectPageUser,
  IhSelectPageDivision,
  IhSelectPageByChannel,
} from "../ihome-package/ui/packages/select-page/index";

@Component({
  components: {
    SelectPageByOther,
    IhSelectPageUser,
    IhSelectPageDivision,
    IhSelectPageByChannel,
  },
})
export default class SelectPageDemo extends Vue {
  form = {
    testInput: "",
    testInput1: "",
    testInput2: "",
    testInput3: {
      id: 15,
      name: "皮xq",
    },
    testInput4: "",
    testInput5: "",
    testInput6: "",
    data: null,
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
