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
      自定义模板使用 isTempOption开启自定义模板, optionProps自定义左右两边的值label, value
    </el-form-item>
    <el-form-item>
      <IhSelectPageUser
        v-model="form.testInput1"
        clearable
      ></IhSelectPageUser>
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
          label: 'name'
        }"
        :searchPlaceholder="'2020-10-27 10:10:00' | timestampToDate('YYYY-MM-DD')"
      >
      </SelectPageByOther>
      <span>{{'0.6690001' | percent}}</span>
    </el-form-item>
    <el-form-item label="事业部">事业部继承组件用法</el-form-item>
    <el-form-item>
      <IhSelectPageDivision v-model="form.testInput5"></IhSelectPageDivision>
    </el-form-item>
    <el-form-item label="渠道商">渠道商继承组件用法 (isInit: 控制是否要初始化加载数据 默认是true(加载数据))</el-form-item>
    <el-form-item>
      <IhSelectPageByChannel
        :isInit="false"
        v-model="form.testInput6"
      ></IhSelectPageByChannel>
    </el-form-item>
    <el-form-item label="项目">项目继承组件用法</el-form-item>
    <el-form-item>
      <IhSelectPageByProject
        v-model="form.testInput7"
        clearable
      ></IhSelectPageByProject>
    </el-form-item>
    <el-form-item label="周期">周期继承组件用法</el-form-item>
    <el-form-item>
      <IhSelectPageByCycle
        v-model="form.testInput8"
        clearable
      ></IhSelectPageByCycle>
    </el-form-item>
    <el-form-item label="栋座">栋座继承组件用法 (proId: 默认需要项目的id来请求接口, isBlur: 不做项目id的限制)</el-form-item>
    <el-form-item label="限制">
      <IhSelectPageByBuild
        v-model="form.testInput9"
        :proId="form.testInput7"
        clearable
      ></IhSelectPageByBuild>
    </el-form-item>
    <el-form-item label="没限制">
      <IhSelectPageByBuild
        v-model="form.testInput9"
        :proId="form.testInput7"
        :isBlur="false"
        clearable
      ></IhSelectPageByBuild>
    </el-form-item>
    <el-form-item label="房号">房号继承组件用法 (proId: 默认需要项目的id来请求接口, isBlur: 不做项目id的限制)</el-form-item>
    <el-form-item label="限制">
      <IhSelectPageByRoom
        v-model="form.testInput10"
        :proId="form.testInput7"
        clearable
      ></IhSelectPageByRoom>
    </el-form-item>
    <el-form-item label="没限制">
      <IhSelectPageByRoom
        v-model="form.testInput10"
        :proId="form.testInput7"
        :isBlur="false"
        clearable
      ></IhSelectPageByRoom>
    </el-form-item>
    <el-form-item label="我司">我司继承组件</el-form-item>
    <el-form-item>
      <IhSelectPageByCompany
        v-model="form.testInput11"
        :proId="form.testInput5"
      ></IhSelectPageByCompany>
    </el-form-item>
    <el-form-item label="开发商">开发商继承组件</el-form-item>
    <el-form-item>
      <IhSelectPageByDeveloper v-model="form.testInput12"></IhSelectPageByDeveloper>
    </el-form-item>
    <el-form-item label="组织">查询店组</el-form-item>
    <el-form-item>
      <IhSelectPageOrg v-model="form.testInput13"></IhSelectPageOrg>
    </el-form-item>
    <el-form-item label="付款方">付款方</el-form-item>
    <el-form-item>
      <IhSelectPageByPayer
        v-model="form.testInput14"
        :proId="form.testInput5"
      ></IhSelectPageByPayer>
    </el-form-item>
    <el-form-item label="公司主体">需要先选启动事业部才能选择公司主体</el-form-item>
    <el-form-item>
      <IhSelectPageByOrgCompany
        v-model="form.testInput15"
        :proId="form.testInput5"
      ></IhSelectPageByOrgCompany>
    </el-form-item>
    <el-form-item label="经纪人">需要先选渠道公司才能选择经纪人</el-form-item>
    <el-form-item>
      <IhSelectPageByBroker
        v-model="form.testInput16"
        @changeOption="(data) => {form.brokerId = data.userId}"
        :proId="form.testInput6"
      ></IhSelectPageByBroker>
    </el-form-item>
    <el-form-item label="绑定的值">{{form.brokerId}}</el-form-item>
    <el-form-item label="渠道公司">需要先渠道公司类型</el-form-item>
    <el-form-item>
      <el-select v-model="form.agencyType" placeholder="请选择">
        <el-option
          label="内部公司"
          value="InfieldCompany"
        ></el-option>
        <el-option
          label="外部公司"
          value="ChannelCompany"
        ></el-option>
      </el-select>
      <IhSelectPageByChannelCompany
        v-model="form.agencyId"
        :proId="form.agencyType"
        @change="changeAgency"
        clearable
      ></IhSelectPageByChannelCompany>
    </el-form-item>
    <el-form-item label="绑定的值">{{form.agencyId}}</el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_company_getAll } from "@/api/system/index";

import SelectPageByOther from "./components/SelectPageByOther.vue";
import {
  IhSelectPageOrg,
  IhSelectPageUser,
  IhSelectPageDivision,
  IhSelectPageByChannel,
  IhSelectPageByProject,
  IhSelectPageByCycle,
  IhSelectPageByBuild,
  IhSelectPageByRoom,
  IhSelectPageByCompany,
  IhSelectPageByDeveloper,
  IhSelectPageByPayer,
  IhSelectPageByOrgCompany,
  IhSelectPageByBroker,
  IhSelectPageByChannelCompany
} from "../ihome-package/ui/packages/select-page/index";

@Component({
  components: {
    SelectPageByOther,
    IhSelectPageUser,
    IhSelectPageDivision,
    IhSelectPageByChannel,
    IhSelectPageByProject,
    IhSelectPageByCycle,
    IhSelectPageByBuild,
    IhSelectPageByRoom,
    IhSelectPageByCompany,
    IhSelectPageByDeveloper,
    IhSelectPageOrg,
    IhSelectPageByPayer,
    IhSelectPageByOrgCompany,
    IhSelectPageByBroker,
    IhSelectPageByChannelCompany
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
    testInput7: null,
    testInput8: null,
    testInput9: null,
    testInput10: null,
    testInput11: null,
    testInput12: null,
    testInput13: null,
    testInput14: null,
    testInput15: null,
    testInput16: null,
    data: null,
    brokerId: null,
    agencyType: null,
    agencyId: null,
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

  changeAgency(value: any) {
    console.log(value);
  }
}
</script>
