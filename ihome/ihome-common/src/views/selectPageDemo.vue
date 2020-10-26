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
      <IhSelectPageUser
        v-model="form.testInput"
        placeholder="默认使用"
        clearable
      >
      </IhSelectPageUser>
    </el-form-item>
    <el-form-item label="自定义模板使用">
      <IhSelectPageUser
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
      </IhSelectPageUser>
    </el-form-item>
    <el-form-item label="绑定值为对象">
      <!-- 如果需要绑定值为对象，value-key必须传 -->
      <IhSelectPageUser
        v-model="form.testInput3"
        clearable
        value-key="id"
      >
      </IhSelectPageUser>
      <span>选中的值：{{form.testInput3}}</span>
    </el-form-item>
    <el-form-item label="测试继承">
      <!-- searchPlaceholder：搜索框提示语 -->
      <SelectPageByOther
        v-model="form.testInput4"
        :props="{
          value: 'id',
          key: 'id',
          lable: 'name'
        }"
        searchPlaceholder="hhah"
      >
      </SelectPageByOther>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_role_getList } from "@/api/system/index";

import SelectPageByOther from "./components/SelectPageByOther.vue";
import { IhSelectPageUser } from "../ihome-package/ui/packages/select-page/index";

@Component({
  components: { SelectPageByOther, IhSelectPageUser },
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
    return post_role_getList(req);
  }
}
</script>
