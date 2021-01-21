<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-10 16:45:20
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-11 10:25:10
-->
<template>
  <ih-page>
    <div class="notice-wrapper">
      <el-form :model="form" :rules="rules"  ref="ruleForm" label-width="150px">
        <div class="notice-item">
          <div class="notice-type">
            <div class="type">补充协议</div>
            <el-switch v-model="form.suppSwitch" active-color="#409EFF" inactive-color="#989898"></el-switch>
          </div>
          <div class="notice-form" v-if="form.suppSwitch">
            <el-form-item label="补充协议类型" :prop="form.suppSwitch ? 'suppProtocolType' : ''">
              <el-select
                v-model="form.suppProtocolType"
                clearable
                placeholder="请选择补充协议类型">
                <el-option
                  v-for="item in $root.dictAllList('TemplateType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.suppProtocolType === 'PaperTemplate'" label="纸质版附件">
              <IhUpload
                @newFileList="getNewFile"
                :isCrop="false"
                :isMove="false"
                :removePermi="true"
                size="100px"
                :limit="10"
                :file-size="10"
                :file-list.sync="form.suppAnnexList"
                :file-type="form.code"
              ></IhUpload>
            </el-form-item>
          </div>
        </div>
        <div class="notice-item">
          <div class="notice-type">
            <div class="type">终止协议</div>
            <el-switch v-model="form.finishSwitch" active-color="#409EFF" inactive-color="#989898"></el-switch>
          </div>
          <div class="notice-form" v-if="form.finishSwitch">
            <el-form-item label="终止协议类型" :prop="form.finishSwitch ? 'finishProtocolType' : ''">
              <el-select
                v-model="form.finishProtocolType"
                clearable
                placeholder="请选择终止协议类型">
                <el-option
                  v-for="item in $root.dictAllList('TemplateType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="终止原因" :prop="form.finishSwitch ? 'finishReason' : ''">
              <el-select
                v-model="form.finishReason"
                clearable
                placeholder="请选择终止协议类型">
                <el-option
                  v-for="item in $root.dictAllList('Reason')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.finishProtocolType === 'PaperTemplate'" label="纸质版附件">
              <IhUpload
                :isCrop="false"
                :file-list.sync="form.finishAnnexList"
                size="100px"
                :limit="1"
                :file-size="10"
                :isMove="false"
                @newFileList="getNewFile"
              ></IhUpload>
            </el-form-item>
          </div>
        </div>
        <div class="notice-item">
          <div class="notice-type">
            <div class="type">优惠告知书</div>
            <el-switch v-model="form.offerSwitch" active-color="#409EFF" inactive-color="#989898"></el-switch>
          </div>
          <div class="notice-form" v-if="form.offerSwitch">
            <el-row>
              <el-col :span="12">
                <el-form-item label="联动周期">
                  <el-input
                    disabled
                    placeholder="联动周期"
                    v-model="pageData.dealCode"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋座">
                  <el-input
                    disabled
                    placeholder="栋座"
                    v-model="pageData.dealCode"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房号">
                  <el-input
                    disabled
                    placeholder="房号"
                    v-model="pageData.dealCode"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业主类型">
                  <el-input
                    disabled
                    placeholder="业主类型"
                    v-model="pageData.dealCode"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠告知书类型" :prop="form.offerSwitch ? 'offerProtocolType' : ''">
                  <el-select
                    v-model="form.offerProtocolType"
                    clearable
                    placeholder="请选择优惠告知书类型">
                    <el-option
                      v-for="item in $root.dictAllList('TemplateType')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠方式" :prop="form.offerSwitch ? 'offerMode' : ''">
                  <el-select v-model="form.offerMode" placeholder="请选择优惠方式">
                    <el-option
                      v-for="item in preferentialList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠方式说明" :prop="form.offerSwitch ? 'offerRemark' : ''">
                  <el-input class="input" v-model="form.offerRemark" disabled placeholder="优惠方式说明"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠金额" :prop="form.offerSwitch ? 'offerMoney' : ''">
                  <el-input class="input" v-model="form.offerMoney" disabled placeholder="优惠金额"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-table
                  class="ih-table"
                  :data="pageData.customerList">
                  <el-table-column prop="customerNo" label="客户编号" min-width="150"></el-table-column>
                  <el-table-column prop="customerType" label="客户类型" min-width="120">
                    <template slot-scope="scope">
                      <div>{{$root.dictAllName(scope.row.customerType, 'CustType')}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
                  <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
                  <el-table-column prop="CardType" label="证件类型" min-width="120">
                    <template slot-scope="scope">
                      <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
                  <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
                  <el-table-column
                    v-if="changeType !== 'ChangeInternalAchieveInf'"
                    fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-link
                        class="margin-right-10"
                        type="primary"
                        @click.native.prevent="deleteAdd(scope, 'customer')"
                      >删除
                      </el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24">
                <el-form-item v-if="form.offerProtocolType === 'PaperTemplate'" label="纸质版附件">
                  <IhUpload
                    :isCrop="false"
                    :file-list.sync="form.offerAnnexList"
                    size="100px"
                    :limit="1"
                    :file-size="10"
                    :isMove="false"
                    @newFileList="getNewFile"
                  ></IhUpload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="notice-item">
          <div class="notice-type">
            <div class="type">退款申请书</div>
            <el-switch v-model="form.refundSwitch" active-color="#409EFF" inactive-color="#989898"></el-switch>
          </div>
          <div class="notice-form" v-if="form.refundSwitch">
            <el-form-item label="退款申请书类型" :prop="form.refundSwitch ? 'refundProtocolType' : ''">
              <el-select
                v-model="form.refundProtocolType"
                clearable
                placeholder="请选择退款申请书类型">
                <el-option
                  v-for="item in $root.dictAllList('TemplateType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.refundProtocolType === 'PaperTemplate'" label="纸质版附件">
              <IhUpload
                :isCrop="false"
                :file-list.sync="form.refundAnnexList"
                size="100px"
                :limit="1"
                :file-size="10"
                :isMove="false"
                @newFileList="getNewFile"
              ></IhUpload>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="handleUp">上一步</el-button>
        <el-button type="success" @click="handlePreview">预览变更</el-button>
      </div>
    </div>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {
    get_preferential_getListByTermId__termId
  } from "@/api/project";

  @Component({
    components: {},
  })
  export default class NoticePage extends Vue {
    @Prop() private pageData?: any; // 页面数据
    preferentialList: any = []; // 优惠方式下拉选项
    form: any = {
      suppSwitch: false, // 补充协议开关
      suppProtocolType: null, // 补充协议类型
      suppAnnexList: [], // 补充协议附件列表

      finishSwitch: false, // 终止协议开关
      finishProtocolType: null, // 终止协议类型
      finishReason: null, // 终止协议原因
      finishAnnexList: [], // 终止协议附件列表

      offerSwitch: false, // 优惠告知书开关
      offerProtocolType: null, // 优惠告知书协议类型
      offerMode: null, // 优惠告知书优惠方式
      offerRemark: null, // 优惠告知书优惠方式说明
      offerMoney: null, // 优惠告知书优惠金额
      offerAnnexList: [], // 优惠告知书协议附件列表

      refundSwitch: false, // 退款申请书开关
      refundProtocolType: null, // 退款申请书协议类型
      refundAnnexList: [], // 退款申请书协议附件列表
    };
    rules: any = {
      suppProtocolType: [
        { required: true, message: '请选择补充协议类型', trigger: 'change' }
      ],
      finishProtocolType: [
        { required: true, message: '请选择终止协议类型', trigger: 'change' }
      ],
      finishReason: [
        { required: true, message: '请选择终止原因', trigger: 'change' }
      ],
      offerProtocolType: [
        { required: true, message: '请选择优惠告知书类型', trigger: 'change' }
      ],
      offerMode: [
        { required: true, message: '请选择优惠方式', trigger: 'change' }
      ],
      offerRemark: [
        { required: true, message: '请输入优惠方式说明', trigger: 'change' }
      ],
      offerMoney: [
        { required: true, message: '请输入优惠金额', trigger: 'change' }
      ],
      refundProtocolType: [
        { required: true, message: '退款申请书类型', trigger: 'change' }
      ]
    };
    value: any = false;

    async created() {
      console.log('info:', this.pageData);
      console.log('$root.dictAllList():', (this as any).$root.dictAllList('TemplateType'));
      // await this.getPreferentialList();
    }

    // 根据周期id获取到优惠方式
    async getPreferentialList() {
      let preferentialList = await get_preferential_getListByTermId__termId({termId: ''});
      console.log('preferentialList', preferentialList);
    }

    // 上一步
    handleUp() {
      console.log('123');
      this.$emit("up");
    }

    // 预览变更
    handlePreview() {
      console.log('123');
      (this as any).$refs["ruleForm"].validate((v: any) => {
        if (v) {
          console.log(1);
          this.$emit("preview");
        } else {
          console.log(2)
        }
      })
    }

    // 上传附件的值
    getNewFile(val: any, type?: any) {
      console.log(val);
      console.log(type);
    }
  }
</script>
<style lang="scss" scoped>
  .notice-wrapper {
    width: 100%;
    box-sizing: border-box;

    .notice-item {
      width: 100%;
      min-height: 240px;

      .notice-type {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;

        .type {
          box-sizing: border-box;
          border-left: 5px solid #F90;
          padding-left: 5px;
          color: #f90;
          margin-left: 20px;
          margin-right: 20px;
        }
      }

      .notice-form {
        width: 100%;

        .input {
          width: 15%;
        }
      }
    }

    .btn {
      box-sizing: border-box;
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
