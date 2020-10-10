<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-10 16:21:03
-->

<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">基础信息</p>
      <el-form
        ref="form"
        :rules="rules"
        label-width="120px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="渠道商名称"
              prop="distributorsName"
            >
              <el-select
                v-model="queryPageParameters.distributorsName"
                clearable
                placeholder="渠道商名称"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('distributorsName')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="渠道等级"
              prop="ChannelLevel"
            >
              <el-select
                v-model="queryPageParameters.ChannelLevel"
                clearable
                placeholder="渠道等级"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('ChannelLevel')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="渠道类型"
              prop="ChannelType"
            >
              <el-input v-model="queryPageParameters.ChannelType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="业务开展省份"
              prop="provinces"
            >
              <el-select
                v-model="queryPageParameters.provinces"
                clearable
                placeholder="业务开展省份"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('provinces')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="业务开展城市"
              prop="city"
            >
              <el-select
                v-model="queryPageParameters.city"
                clearable
                placeholder="业务开展城市"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('city')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市等级">
              <el-input v-model="queryPageParameters.cityLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="特批入库"
              prop="checked"
            >
              <el-checkbox v-model="queryPageParameters.checked">特批入库</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库编号">
              <el-input
                v-model="queryPageParameters.account"
                placeholder="入库编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.division"
                clearable
                placeholder="事业部"
                class="width--100"
              >
                <el-option
                  v-for="item in  $root.displayList('division')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:table>
      <p class="ih-info-title">
        <span class="info">评级信息</span>
        <el-link>以下标准任选一项</el-link>
        <!-- <el-button type="success" class="add" @click.native="addAccount()">添加</el-button> -->
        <el-link>查看所有标准</el-link>
        <el-link>复制评级信息</el-link>
      </p>

      <el-table
        :data="resPageInfo.list"
        border
        style="width:100%"
      >
        <el-table-column
          prop="date"
          label="城市等级"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="渠道等级"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="评级项"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="录入信息"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="评级标准"
          width="300"
        ></el-table-column>
      </el-table>
    </template>

    <template v-slot:btn>
      <el-button type="primary">保存</el-button>
      <el-button type="success">提交</el-button>
    </template>
    <p class="ih-info-title">
      <span>附件信息</span>
      <el-link>综合查询执行人</el-link>
    </p>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
// import { post_channelGrade_add } from "../../../../api/channel/index";

@Component({
  components: {},
})
export default class Home extends Vue {
  queryPageParameters: any = {
    distributorsName: "",
    provinces: "",
    city: "",
    ChannelType: "",
    ChannelLevel: "",
    checked: false,
    division: "",
  };
  info: any = {};
  rules: any = {
    distributorsName: [
      { required: true, message: "请输入账户名称", trigger: "blur" },
    ],
    ChannelLevel: [
      { required: true, message: "请选择渠道等级", trigger: "blur" },
    ],
    city: [{ required: true, message: "请选择城市", trigger: "blur" }],
    provinces: [{ required: true, message: "请输入省份", trigger: "blur" }],
    cityLevel: [
      { required: false, max: 32, message: "城市等级", trigger: "blur" },
    ],
    ChannelType: [
      { required: false, max: 64, message: "请输入渠道类型", trigger: "blur" },
    ],
    checked: [
      {
        required: true,
        max: 64,
        message: "请选择是否特批入库",
        trigger: "blur",
      },
    ],
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };

  // async created() {
  //   let id = this.$route.query.id;
  //   this.info = await get_channel_get__id({ id: id });
  //   console.log(this.info);
  // }
  // async created() {
  //   this.getData();
  // }
  // async getData() {
  //   this.list = await post_channelGrade_add();
  // }
}
//请求数据
//   };
//   async getListMixin() {
//     this.resPageInfo = await post_role_getList(this.queryPageParameters);
//     debugger;
//   }
//   async created() {
//     this.getListMixin;
//   }
// }
</script>
<style lang="scss" scoped>
.ih-info-title {
  border-left: 5px solid #4cccec;
  .info {
    margin-right: 5px;
  }
}
.line {
  padding: 15px;
}
.ih-info-item-left {
  text-align: right;
  line-height: 21px;
}
.ih-info-item-right {
  text-align: left;
  padding-left: 20px;
  line-height: 21px;
}
.title {
  font-weight: 600;
  text-align: left;
  margin-left: 15px;
}
.el-input__inner {
  width: 1060px;
}
a {
  margin-left: 10px;
}
.el-checkbox {
  position: relative;
  left: -150px;
}
</style>
