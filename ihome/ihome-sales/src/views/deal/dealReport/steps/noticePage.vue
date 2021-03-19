<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-10 16:45:20
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-16 15:15:35
-->
<template>
  <ih-page>
    <div class="notice-wrapper">
      <div class="supp-deal-tips">
        <div
          class="item-tips"
          v-for="(item, index) in tips"
          :key="index">{{item}}</div>
      </div>
      <el-form :model="form" :rules="rules"  ref="ruleForm" label-width="150px" @submit.native.prevent>
        <div class="notice-item">
          <div class="notice-type">
            <div class="type">补充协议</div>
            <el-switch v-model="form.suppSwitch" active-color="#409EFF" inactive-color="#989898"></el-switch>
          </div>
          <div class="notice-form" v-if="form.suppSwitch">
            <el-row>
              <el-col :span="12">
                <el-form-item label="补充协议类型" :prop="form.suppSwitch ? 'suppProtocolType' : 'empty'">
                  <el-select
                    v-model="form.suppProtocolType"
                    clearable
                    placeholder="请选择补充协议类型">
                    <el-option
                      v-for="item in TemplateTypeByOther"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋座">
                  <el-input disabled class="input" placeholder="栋座" v-model="pageData.buildingName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房号">
                  <el-input disabled class="input" placeholder="房号" v-model="pageData.roomNo"/>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form.suppProtocolType === 'PaperTemplate'">
                <el-form-item label="纸质版附件">
                  <IhUpload
                    @newFileList="getNewFile"
                    :isCrop="false"
                    :isMove="false"
                    :removePermi="true"
                    size="100px"
                    :limit="10"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                    :file-size="10"
                    :file-list.sync="fileList"
                    file-type="suppAnnexList"
                  ></IhUpload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="notice-item">
          <div class="notice-type">
            <div class="type">终止协议</div>
            <el-switch v-model="form.finishSwitch" active-color="#409EFF" inactive-color="#989898"></el-switch>
          </div>
          <div class="notice-form" v-if="form.finishSwitch">
            <el-form-item label="终止协议类型" :prop="form.finishSwitch ? 'finishProtocolType' : 'empty'">
              <el-select
                v-model="form.finishProtocolType"
                clearable
                placeholder="请选择终止协议类型">
                <el-option
                  v-for="item in TemplateTypeByOther"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="终止原因" :prop="form.finishSwitch ? 'finishReason' : 'empty'">
              <el-select
                v-model="form.finishReason"
                @change="handleChangeReasonType"
                placeholder="请选择终止协议类型">
                <el-option
                  v-for="item in $root.dictAllList('Reason')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-input
                class="reason-input"
                v-if="form.finishReason === 'other'"
                placeholder="请输入其他原因" v-model="form.finishReasonDescription"/>
            </el-form-item>
            <el-form-item v-if="form.finishProtocolType === 'PaperTemplate'" label="纸质版附件">
              <IhUpload
                @newFileList="getNewFile"
                :isCrop="false"
                :isMove="false"
                :removePermi="true"
                size="100px"
                :limit="10"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                :file-size="10"
                :file-list.sync="fileList"
                file-type="finishAnnexList"
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
                  <el-input disabled class="input" placeholder="联动周期" v-model="pageData.cycleName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋座">
                  <el-input disabled class="input" placeholder="栋座" v-model="pageData.buildingName"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房号">
                  <el-input disabled class="input" placeholder="房号" v-model="pageData.roomNo"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="业主类型">
                  <el-input disabled class="input" placeholder="业主类型" v-model="customType"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠告知书类型" :prop="form.offerSwitch ? 'offerProtocolType' : 'empty'">
                  <el-select
                    v-model="form.offerProtocolType"
                    clearable
                    placeholder="请选择优惠告知书类型">
                    <el-option
                      v-for="item in TemplateTypeByNotice"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠方式" :prop="form.offerSwitch ? 'offerMode' : 'empty'">
                  <el-select
                    @change="handleSelectMode"
                    v-model="form.offerMode"
                    placeholder="请选择优惠方式">
                    <el-option
                      v-for="item in preferentialList"
                      :key="item.preferentialMxId"
                      :label="item.modeDescription"
                      :value="item.preferentialMxId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠方式说明" :prop="form.offerSwitch ? 'offerRemark' : 'empty'">
                  <el-input
                    class="input"
                    v-model="form.offerRemark"
                    :disabled="form.offerMode !== 'Manual'"
                    placeholder="优惠方式说明"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="优惠金额" :prop="form.offerSwitch ? 'offerMoney' : 'empty'">
                  <el-input
                    v-digits="2"
                    class="input"
                    v-model="form.offerMoney"
                    :disabled="form.offerMode !== 'Manual'"
                    placeholder="优惠金额"></el-input>
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
                </el-table>
              </el-col>
              <el-col class="margin-top-10" :span="24" v-if="form.offerProtocolType === 'PaperTemplate'">
                <el-form-item label="纸质版附件">
                  <IhUpload
                    @newFileList="getNewFile"
                    :isCrop="false"
                    :isMove="false"
                    :removePermi="true"
                    size="100px"
                    :limit="10"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                    :file-size="10"
                    :file-list.sync="fileList"
                    file-type="offerAnnexList"
                  ></IhUpload>
                </el-form-item>
              </el-col>
              <el-col class="margin-top-10" :span="24" v-if="form.offerMode === 'Manual'">
                <el-form-item label="认购书附件" :prop="form.offerMode === 'Manual' ? 'offerAnnexList' : 'empty'">
                  <IhUpload
                    @newFileList="getNewFile"
                    :isCrop="false"
                    :isMove="false"
                    :removePermi="true"
                    size="100px"
                    :limit="10"
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                    :file-size="10"
                    :file-list.sync="fileList"
                    file-type="Subscription"
                  ></IhUpload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="notice-item margin-top-10">
          <div class="notice-type">
            <div class="type">退款申请书</div>
            <el-switch v-model="form.refundSwitch" active-color="#409EFF" inactive-color="#989898"></el-switch>
          </div>
          <div class="notice-form" v-if="form.refundSwitch">
            <el-form-item label="退款申请书类型" :prop="form.refundSwitch ? 'refundProtocolType' : 'empty'">
              <el-select
                v-model="form.refundProtocolType"
                clearable
                placeholder="请选择退款申请书类型">
                <el-option
                  v-for="item in TemplateTypeByOther"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退款金额">
              <el-input disabled class="input" placeholder="退款金额" v-model="pageData.refundAmount"/>
            </el-form-item>
            <el-form-item
              :prop="form.refundSwitch && form.refundProtocolType === 'refundBranchName' ? '' : 'empty'"
              v-if="form.refundProtocolType === 'PaperTemplate'"
              label="开户银行">
              <el-input v-model="form.refundBranchName" readonly>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click.native="dialogFormVisible = true"
                ></el-button>
              </el-input>
            </el-form-item>
            <el-form-item
              :prop="form.refundSwitch && form.refundProtocolType === 'refundAccountName' ? '' : 'empty'"
              v-if="form.refundProtocolType === 'PaperTemplate'"
              label="开户人">
              <el-input v-model="form.refundAccountName"></el-input>
            </el-form-item>
            <el-form-item
              :prop="form.refundSwitch && form.refundProtocolType === 'refundAccount' ? '' : 'empty'"
              v-if="form.refundProtocolType === 'PaperTemplate'"
              label="银行账号">
              <el-input v-digits="0" v-model="form.refundAccount"></el-input>
            </el-form-item>
            <el-form-item v-if="form.refundProtocolType === 'PaperTemplate'" label="纸质版附件">
              <IhUpload
                @newFileList="getNewFile"
                :isCrop="false"
                :isMove="false"
                :removePermi="true"
                size="100px"
                :limit="10"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
                :file-size="10"
                :file-list.sync="fileList"
                file-type="refundAnnexList"
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
    <IhDialog
      :show="dialogFormVisible"
      desc="银行网点档案库">
      <BankRecord
        @cancel="() => (dialogFormVisible = false)"
        @finish="handleFinish"/>
    </IhDialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import BankRecord from "@/components/bankRecord.vue";
  import {
    get_preferential_getListByTermId__termId
  } from "@/api/project";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {BankRecord},
  })
  export default class NoticePage extends Vue {
    private checkFileList: any = (rule: any, value: any, callback: any) => {
      if (this.form.offerMode === 'Manual') {
        // 自定义下，认购书必上传
        let flag: any = false;
        if (this.form.offerAnnexList && this.form.offerAnnexList.length) {
          flag = this.form.offerAnnexList.some((list: any) => {
            return list.type === 'Subscription';
          });
        }
        if (!flag) {
          return callback(new Error('优惠方式为自定义时，必须上传认购书附件'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    private checkReason: any = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error('请选择终止原因'));
      } else {
        if (value === 'other') {
          // 终止原因是其他的情况下，需要输入原因描述
          if (!this.form.finishReasonDescription) {
            return callback(new Error('请输入其他原因描述'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    };
    @Prop() private pageData?: any; // 页面数据
    tips: any = [
      '请根据本成交报告单位的实际情况选择相关合同文书：',
      '1、换房、且不涉及优惠折扣变更及费用变更：补充协议',
      '2、换房、且涉及优惠折扣变更或费用变更：终止协议、优惠告知书',
      '3、特批优惠-服务费部分减免：终止协议、优惠告知书、退款申请书',
      '4、特批优惠-服务费全部减免：终止协议、退款申请书',
      '5、服务费增加：终止协议、优惠告知书',
      '6、服务费金额不变，优惠方式变更：终止协议、优惠告知书',
      '7、客户更名：终止协议、优惠告知书',
      '8、告知书信息填写错误：终止协议、优惠告知书',
      '9、退房：终止协议、退款申请书',
      '10、其他：操作人自由选择合同文书',
    ]; // 补充成交类型tips
    fileList: any = [];
    preferentialList: any = []; // 优惠方式下拉选项
    dialogFormVisible: any = false; // 银行网点档案库弹窗
    form: any = {
      suppSwitch: false, // 补充协议开关
      suppProtocolType: null, // 补充协议类型
      suppAnnexList: [], // 补充协议附件列表

      finishSwitch: false, // 终止协议开关
      finishProtocolType: null, // 终止协议类型
      finishReason: null, // 终止协议原因
      finishReasonDescription: null, // 原因描述：终止协议必填：特别是其他的时候
      finishAnnexList: [], // 终止协议附件列表

      offerSwitch: false, // 优惠告知书开关
      offerProtocolType: null, // 优惠告知书协议类型
      offerMode: null, // 优惠告知书优惠方式
      offerRemark: null, // 优惠告知书优惠方式说明
      offerMoney: null, // 优惠告知书优惠金额
      offerExPreferentialItem: null, // 是否显示“本优惠不在《认购书》上重复体现”条款
      offerAnnexList: [], // 优惠告知书协议附件列表

      refundSwitch: false, // 退款申请书开关
      refundProtocolType: null, // 退款申请书协议类型
      refundBankName: null, // 银行名字
      refundBranchName: null, // 支行名称
      refundAccountName: null, // 开户人
      refundAccount: null, // 银行账户
      refundAccountHolderName: null, // 开户人名字
      refundProvinceName: null, // 省名字
      refundCityName: null, // 市名字
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
        { validator: this.checkReason, trigger: 'change' }
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
      ],
      refundBranchName: [
        { required: true, message: '请选择开户银行', trigger: 'change' }
      ],
      refundAccountName: [
        { required: true, message: '请输入开户人', trigger: 'change' }
      ],
      refundAccount: [
        { required: true, message: '请输入银行账号', trigger: 'change' }
      ],
      offerAnnexList: [
        { validator: this.checkFileList, trigger: 'change' }
      ],
      empty: []
    };
    value: any = false;
    TemplateTypeByNotice: any = []; // 优惠告知书类型的文件类型
    TemplateTypeByOther: any = []; // 其他类型的文件类型

    // 业主类型取客户列表中第一个客户的类型
    get customType() {
      let type: any = '';
      if (this.pageData && this.pageData.customerList && this.pageData.customerList.length) {
        type = (this as any).$root.dictAllName(this.pageData.customerList[0].customerType, 'CustType');
      }
      return type;
    }

    async created() {
      // console.log('$root.dictAllList():', (this as any).$root.dictAllList('TemplateType'));
      await this.getPreferentialList();
      await this.initTemplateType();
    }

    async activated() {
      console.log('noticePage-activated');
      // 处理其他类型的文件类型选项
      this.TemplateTypeByOther = await this.getTemplateTypeList(this.pageData?.originalCustType);
      console.log('noticePage-activated', this.TemplateTypeByOther);
      await this.initTemplateType();
    }

    // 初始化优惠告知书类型的选项
    initTemplateType() {
      if (this.pageData && this.pageData.customerList && this.pageData.customerList.length) {
        // 处理优惠告知书类型的附件类型可选值
        this.TemplateTypeByNotice = this.getTemplateTypeList(this.pageData.customerList[0].customerType);
      } else {
        this.TemplateTypeByNotice = this.getTemplateTypeList();
      }
      console.log('this.TemplateTypeByOther', this.TemplateTypeByNotice);
    }

    // 获取附件类型选项值
    getTemplateTypeList(customerType: any = '') {
      let list: any = (this as any).$root.dictAllList('TemplateType');
      let tempList: any = [];
      if (customerType && customerType === 'Company') {
        // 客户类型是企业客户，相关的协议只能使用纸质版。
        tempList = list.filter((item: any) => {
          return item.code === 'PaperTemplate';
        });
      } else {
        tempList = list;
      }
      return tempList;
    }

    // 根据周期id获取到优惠方式
    async getPreferentialList() {
      if (this.pageData && this.pageData.cycleId) {
        this.preferentialList = await get_preferential_getListByTermId__termId({termId: this.pageData.cycleId});
        // console.log('preferentialList', this.preferentialList);
        // 多个自定义选项
        this.preferentialList.push(
          {
            modeDescription: '自定义',
            preferentialMxId: 'Manual'
          }
        )
      }
    }

    // 改变终止原因
    handleChangeReasonType(value: any) {
      if (value === 'other') {
        // 其他
        this.form.finishReasonDescription = '';
      } else {
        // 其他的终止原因
        const LIST: any = (this as any).$root.dictAllList('Reason'); // 终止原因
        if (LIST && LIST.length) {
          LIST.forEach((item: any) => {
            if (item.code === value) {
              this.form.finishReasonDescription = item.name;
            }
          });
        }
      }
    }

    // 选择优惠方式
    handleSelectMode(value: any) {
      if (value && value !== 'Manual') {
        if (this.preferentialList && this.preferentialList.length) {
          this.preferentialList.forEach((item: any) => {
            if (item.preferentialMxId === value) {
              this.form.offerRemark = item.modeDescription;
              this.form.offerMoney = item.premiumReceived;
              this.form.offerExPreferentialItem = item.exPreferentialItem;
            }
          });
        }
      } else {
        this.form.offerRemark = "";
        this.form.offerMoney = "";
        this.form.offerExPreferentialItem = 1;
      }
    }

    // 选择银行
    handleFinish(data: any) {
      console.log(123);
      this.dialogFormVisible = false;
      this.form.refundBankName = data.bankName;
      this.form.refundBranchName = data.branchName;
      this.form.refundCityName = data.cityName;
      this.form.refundProvinceName = data.provinceName;
    }

    // 上一步
    handleUp() {
      this.$emit("up");
    }

    // 上传附件的值
    getNewFile(list: any, type?: any) {
      // console.log(list);
      // console.log(type);
      // 保存上传的文件
      if (type) {
        if (type !== "Subscription") {
          if (list && list.length > 0) {
            let tempList: any = [];
            list.forEach((item: any) => {
              tempList.push(
                {
                  attachmentSuffix: item.response.length ? item.response[0].generateFileType : '', // 附件后缀
                  fileNo: item.fileId, // 附件编号
                  type: 'NoticeAttachment' // 告知书附件
                }
              )
            });
            if (type === "offerAnnexList") {
              // 优惠告知书
              if (this.form["offerAnnexList"] && this.form["offerAnnexList"].length) {
                this.form["offerAnnexList"] = [...this.form["offerAnnexList"], ...tempList];
              } else {
                this.form["offerAnnexList"] = tempList;
              }
            } else {
              // 其他
              this.form[type] = tempList;
            }
          }
        } else {
          // 认购书附件
          if (list && list.length > 0) {
            let tempList: any = [];
            list.forEach((item: any) => {
              tempList.push(
                {
                  attachmentSuffix: item.response.length ? item.response[0].generateFileType : '', // 附件后缀
                  fileNo: item.fileId, // 附件编号
                  type: 'Subscription' // 告知书附件
                }
              )
            });
            if (this.form["offerAnnexList"] && this.form["offerAnnexList"].length) {
              this.form["offerAnnexList"] = [...this.form["offerAnnexList"], ...tempList];
            } else {
              this.form["offerAnnexList"] = tempList;
            }
          }
        }
      }
    }

    // 预览变更
    handlePreview() {
      // console.log(this.form);
      (this.$refs["ruleForm"] as ElForm).validate(this.submitPreview);
    }

    @NoRepeatHttp()
    async submitPreview(valid: any) {
      if (valid) {
        // 补充成交类型
        switch (this.pageData.changeTypeByDeal) {
          case "ChangeBasicInf":
            // 变更基础信息
            break
          case "ChangeAchieveInf":
            // 变更业绩信息
            console.log(1);
            break
          case "RetreatRoom":
            // 退房
            console.log(1);
            break
          case "ChangeInternalAchieveInf":
            // 内部员工业绩变更
            console.log(1);
            break
        }
        this.$emit('next', 'next', {
          ...this.pageData,
          noticeDealList: this.initNoticeData(),
        });
      } else {
        this.$message.warning("请先填好数据再保存");
        return false;
      }
    }

    // 构建补充的优惠告知书数据
    initNoticeData() {
      let tempList: any = []; // 优惠告知书列表
      // 补充协议
      if (this.form.suppSwitch) {
        tempList.push(
          {
            annexList: this.form.suppAnnexList,
            explain: null, // 优惠方式说明
            notificationType: 'SupplementaryAgreement', // 告知书类型
            paymentAmount: null, // 优惠金额
            promotionMethod: null, // 优惠选择方式 Manual-自定义、Automatic-选择
            reason: null, // 原因 --- 终止协议必填
            reasonDescription: null, // 原因描述：终止协议必填
            templateType: this.form.suppProtocolType // 模版类型(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)
          }
        )
      }
      // 终止协议
      if (this.form.finishSwitch) {
        tempList.push(
          {
            annexList: this.form.finishAnnexList,
            explain: null, // 优惠方式说明
            notificationType: 'TerminationAgreement', // 告知书类型
            paymentAmount: null, // 优惠金额
            promotionMethod: null, // 优惠选择方式 Manual-自定义、Automatic-选择
            reason: this.form.finishReason, // 原因 --- 终止协议必填
            reasonDescription: this.form.finishReasonDescription, // 原因描述：终止协议必填
            templateType: this.form.finishProtocolType // 模版类型(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)
          }
        )
      }
      // 优惠告知书
      if (this.form.offerSwitch) {
        tempList.push(
          {
            annexList: this.form.offerAnnexList,
            explain: this.form.offerRemark, // 优惠方式说明
            notificationType: 'Notification', // 告知书类型
            paymentAmount: this.form.offerMoney, // 优惠金额
            promotionMethod: this.form.offerMode === 'Manual' ? 'Manual' : 'Automatic', // 优惠选择方式 Manual-自定义、Automatic-选择
            reason: null, // 原因 --- 终止协议必填
            reasonDescription: null, // 原因描述：终止协议必填
            exPreferentialItem: this.form.offerExPreferentialItem, // 原因描述：终止协议必填
            templateType: this.form.offerProtocolType // 模版类型(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)
          }
        )
      }
      // 退款申请书
      if (this.form.refundSwitch) {
        tempList.push(
          {
            annexList: this.form.refundAnnexList,
            explain: null, // 优惠方式说明
            notificationType: 'RefundApplication', // 告知书类型
            paymentAmount: null, // 优惠金额
            promotionMethod: null, // 优惠选择方式 Manual-自定义、Automatic-选择
            reason: null, // 原因 --- 终止协议必填
            reasonDescription: null, // 原因描述：终止协议必填
            templateType: this.form.refundProtocolType, // 模版类型(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)
            account: this.form.refundProtocolType === 'PaperTemplate' ? this.form.refundAccount : null, // 退款申请书银行账户
            accountHolderName: this.form.refundProtocolType === 'PaperTemplate' ? this.form.refundAccountName : null, // 退款申请书开户人名字
            bankName: this.form.refundProtocolType === 'PaperTemplate' ? this.form.refundBankName : null, // 退款申请书银行名字
            branchName: this.form.refundProtocolType === 'PaperTemplate' ? this.form.refundBranchName : null, // 退款申请书支行名称
            cityName: this.form.refundProtocolType === 'PaperTemplate' ? this.form.refundCityName : null, // 退款申请书市名字
            provinceName: this.form.refundProtocolType === 'PaperTemplate' ? this.form.refundProvinceName : null, // 退款申请书省名字
          }
        )
      }
      return tempList;
    }

    // 获取附件信息
    getDocumentList(list: any = []) {
      let tempList: any = [];
      if (list && list.length > 0) {
        list.forEach((item: any) => {
          // console.log(item);
          if (item.fileList && item.fileList.length) {
            item.fileList.forEach((L: any) => {
              if (!L.exAuto) {
                // 只获取新上传的
                tempList.push(
                  {
                    fileId: L.fileId,
                    fileName: L.name,
                    fileType: item.code
                  }
                );
              }
            });
          }
        });
      }
      return tempList;
    }

    // 获取客户信息
    initOwnerList(data: any = []) {
      let tempList: any = [];
      if (data && data.length) {
        data.forEach((item: any) => {
          tempList.push(
            {
              id: item.id,
              ownerCertificateNo: item.cardNo,
              ownerMobile: item.customerPhone,
              ownerName: item.customerName,
            }
          )
        });
      }
      return tempList;
    }
  }
</script>
<style lang="scss" scoped>
  .notice-wrapper {
    width: 100%;
    box-sizing: border-box;

    .supp-deal-tips {
      box-sizing: border-box;
      padding: 0px 20px 20px 20px;

      .item-tips {
        &:first-child {
          margin-bottom: 10px;
        }

        &:not(:first-child) {
          box-sizing: border-box;
          padding: 2px 0px;
        }
      }
    }

    .notice-item {
      width: 100%;
      min-height: 80px;

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
          width: 50%;
        }
      }
    }

    .btn {
      box-sizing: border-box;
      margin-top: 30px;
      text-align: center;
    }

    .reason-input {
      width: 20%;
      box-sizing: border-box;
      margin-top: 5px;
    }
  }
</style>
