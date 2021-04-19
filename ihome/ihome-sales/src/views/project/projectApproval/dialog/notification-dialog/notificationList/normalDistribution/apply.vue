<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 09:41:54
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-19 09:19:40
-->
<template>
  <ih-page class="text-left">
    <template #info>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
        :rules="rules"
      >
        <div class="title">
          <div class="title-contant">标准渠道分销合同模板</div>
          <div>编号：_____________________ </div>
        </div>
        <div class="top-title">
          <el-form-item
            label=" "
            prop="contractTitle"
            label-width="20px"
          >
            <el-input
              class="title-contract"
              v-model="info.contractTitle"
              placeholder="请输入合同主标题"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label=" "
            label-width="20px"
          >
            <el-input
              class="title-sub"
              v-model="info.contractSubtitle"
              placeholder="请输入合同副标题"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="标题备注"
            label-width="80px"
            class="margin-right-60"
          >
            <el-input
              class="title-sub"
              v-model="info.titleOrRemark"
              placeholder="请输入标题备注"
              clearable
            ></el-input>
          </el-form-item>
        </div>
        <div>甲方公司：<u>{{info.partyCompany}}</u></div>
        <div>甲方地址：<u>{{info.partyaAddr}}</u></div>
        <div>甲方联系人：
          <el-form-item
            label-width="12px"
            label=" "
            prop="partyaMan"
            style="display: inline-block"
          >
            <el-input
              v-model="info.partyaMan"
              placeholder="请输入甲方联系人"
              clearable
            />
          </el-form-item>
        </div>
        <div>甲方电话：
          <el-form-item
            label-width="12px"
            label=" "
            prop="partyaTel"
            style="display: inline-block"
          >
            <el-input
              v-model="info.partyaTel"
              placeholder="请输入甲方电话"
              clearable
            />
          </el-form-item>
        </div>
        <div>乙方公司： ___________________________________</div>
        <div>乙方地址： ___________________________________</div>
        <div>乙方账户名： ___________________________________</div>
        <div>乙方账号： ___________________________________</div>
        <div>乙方开户行： ___________________________________</div>
        <div>乙方联系人： ___________________________________</div>
        <div>乙方电话： ___________________________________</div>
        <br />
        <div>依照中华人民共和国相关的法律法规，甲、乙双方本着互惠互利的原则，经友好协商，就乙方为甲方提供客户资源实行场外销售合作服务，
          促成客户与甲方签订购房合同事宜，签订本协议，以资共同遵守。</div>
        <br />
        <div>
          <div class="font-weight"> 一、合作项目</div>
          <div>合作项目：<u class="font-weight">{{info.proName}}</u></div>
          <div>备案名称：<u class="font-weight">{{info.proRecord}}</u></div>
        </div>
        <br />
        <div>
          <div class="font-weight"> 二、合作方式及合作内容</div>
          <div>2.1 甲方接受开发商的授权，委托乙方为开发商的上述项目提供客户引荐服务，进行场外销售，即非在甲方售楼部内进行接待销售的，
            后续销售工作全程跟进，包括但不限于认购、签约、回款等销售工作，积极参与客户的场外沟通，努力促进成交，甲方给予必要协助。</div>
        </div>
        <br />
        <div>
          <div class="font-weight"> 三、双方权利与义务</div>
          <div>3.1 甲方权利与义务</div>
          <div class="margin-left-20">
            <div>3.1.1 乙方介绍的客户前来参观了解现场时，甲方应当尽力配合乙方的工作，协助促成交易。</div>
            <div>3.1.2 甲方负责收取乙方推荐客户支付的相关费用，并指导乙方推荐客户与项目发展商签订买卖合同。</div>
            <div>3.1.3 甲方应该按照本协议约定的费用标准和时间向乙方支付代理费。</div>
          </div>
          <br />
          <div>3.2 乙方权利与义务</div>
          <div class="margin-left-20">
            <div>3.2.1 乙方应当遵守合作项目销售的工作纪律，接受甲方规章制度的约束，保证在操作过程中的规范性、合法性。</div>
            <div>3.2.2 乙方应按照甲方的要求对甲方项目进行宣传推广，不得对客户进行虚假或不实的承诺、宣传。</div>
            <div>3.2.3 乙方负责签约台账和结算明细单的制作，经甲方领导逐级书面审核同意后，收取对应代理费。</div>
          </div>
        </div>
        <div class="padding-top-10 padding-bottom-10">
          <div class="font-weight">四、合作期限</div>
          该协议有效期自
          <el-form-item
            prop='timeList'
            label=" "
            label-width="12px"
            style="display: inline-block"
          >
            <el-date-picker
              v-model="info.timeList"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          ，到期后除双方另行续约外，本协议终止。服务期限内甲方可因销售情况单方终止本协议，
          甲方提前3日书面通知乙方终止本协议的，通知书送达乙方之日为协议终止日。
        </div>
        <div class="font-weight">五、代理费计付标准</div>
        <div>5.1 甲方按乙方实际完成的销售金额或销售套数计付代理费，
          实际完成的销售金额或销售套数指乙方在代理期内客户签订《商品房买卖合同》的签约总金额或签约总套数：</div>
        <br />
        <div>代理费计提标准</div>
        <br />
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="渠道类型"
              prop="channelEnum"
            >
              <el-select
                v-model="info.channelEnum"
                clearable
                placeholder="请选择渠道类型"
                style="width: 50%"
                @change="channelChange"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCustomer')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-if="isShow">
            <el-col
              :span='6'
              style="margin-left: -50px"
            >
              <el-form-item prop="companyKind">
                <el-select
                  v-model="info.companyKind"
                  clearable
                  placeholder="请选择"
                  @change="companyKindChange"
                >
                  <el-option
                    v-for="item in companyKindOption"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item label-width="0">
                <IhSelectPageByCompany
                  v-if="info.companyKind === 'InfieldCompany'"
                  style="flex: 1;max-width: 350px;"
                  clearable
                  v-model="info.designatedAgencyId"
                  @changeOption="getChannelInfo"
                  @clear="queryUnderData('123')"
                ></IhSelectPageByCompany>
                <IhSelectPageByChannel
                  v-else-if="info.companyKind === 'ChannelCompany'"
                  style="flex: 1;max-width: 350px;"
                  v-model="info.designatedAgencyId"
                  clearable
                  placeholder="渠道商名称"
                  :params="searchConditon"
                  :search-name="info.designatedAgency"
                  @changeOption="getChannelInfo"
                  @clear="queryUnderData('123')"
                ></IhSelectPageByChannel>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="垫佣周期"
              prop="padCommissionEnum"
            >
              <el-select
                v-model="info.padCommissionEnum"
                clearable
                placeholder="请选择垫佣周期"
                style="width: 50%"
                :disabled="padCommissionEnumOptions.length === 1"
                @change="queryUnderData(info.padCommissionEnum)"
              >
                <el-option
                  v-for="item in padCommissionEnumOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-right padding-right-10">
          <el-button
            type="success"
            @click="add()"
          >增加</el-button>
        </div>
        <br />
        <el-table
          class="ih-table partyA-table"
          :data="info.contractMxVOList"
        >
          <el-table-column
            label="物业类型"
            prop="propertyEnum"
          >
            <template v-slot="{ row }">{{
            row.propertyEnum ? $root.dictAllName(row.propertyEnum, "Property") : '-'
          }}</template>
          </el-table-column>
          <el-table-column
            label="佣金分类"
            prop="costTypeEnum"
          >
            <template v-slot="{ row }">{{
            row.costTypeEnum ? $root.dictAllName(row.costTypeEnum, "FeeType") : '-'
          }}</template>
          </el-table-column>
          <el-table-column
            label="条件"
            prop="standardPay"
          >
            <template v-slot="{ row }">{{ row.standardPay ? row.standardPay : '-' }}</template>
          </el-table-column>
          <el-table-column
            label="派发佣金标准"
            prop="sendContext"
          >
            <template v-slot="{ row }">{{ row.sendContext ? row.sendContext : '-' }}</template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center"
          >
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                size="small"
                @click="del($index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <div class="font-weight"></div>
        <div>
          <el-form-item
            prop="agencyFeeRemark"
            label="备注："
            label-width="70px"
          >
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入备注"
              v-model="info.agencyFeeRemark"
            />
          </el-form-item>
        </div>
        <div class="font-weight">六、客户成交及确认</div>
        <div>
          <el-form-item
            prop="consumerComplete"
            label=" "
            label-width="12px"
          >
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入客户成交及确认"
              v-model="info.consumerComplete"
            />
          </el-form-item>
        </div>
        <div>最终的判客标准以项目开发商的判定为准，乙方认可且无异议，若项目开发商判定乙方引荐的客户属于问题单，
          包括但不限于认定为自然来访客户、飞单等，甲方有权不予结算代理费，若甲方已支付部分代理费或销售奖励，
          乙方应在收到甲方通知之日起3日内予以退回，否则按所欠金额的千分之三支付违约金。</div>
        <br />
        <div class="font-weight">七、代理费结算方式</div>
        <el-form-item
          label="7.1 代理期间成交的单位："
          prop='agencySettleCondtion'
          label-width="200px"
        >
          <el-select
            v-model="info.agencySettleCondtion"
            clearable
            placeholder="请选择"
            @change="agencySettleCondtionChange"
          >
            <el-option
              v-for="item in $root.dictAllList('AgencySettleCondtion')"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label=" "
          label-width="50px"
        >
          <el-input
            class="textareaClass"
            maxlength="2000"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入代理费结算条件"
            v-model="info.agencyCostCondition"
          />
        </el-form-item>
        <div>
          <el-form-item
            prop="agencyCostSettleWay"
            label="7.2"
            label-width="50px"
          >
            <el-input
              show-word-limit
              class="textareaClass"
              maxlength="2000"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入客户成交及确认"
              v-model="info.agencyCostSettleWay"
            />
          </el-form-item>
        </div>
        <div>7.3 结算代理费前乙方需提供增值税专用发票，如乙方仅能提供增值税普通发票需扣除6%或3%税费。</div>
        <br />
        <div>7.4 无论出现任何原因导致客户无法成交或客户发生退房、挞定情形的或发生投诉、诉讼导致甲方需退回
          <span>{{ info.costSettleType ? $root.dictAllName(info.costSettleType, 'CostSettleType') : '___________'}}</span>
          的，在甲方提供客户退房、投诉等依据后，乙方应在
          <el-form-item
            prop="agencyFeeReturnTime"
            style="display: inline-block"
            label=" "
            label-width="12px"
          >
            <el-input
              v-model="info.agencyFeeReturnTime"
              placeholder="退回期限"
              style="max-width: 100px; width: 100%"
              v-digits="0"
            />
          </el-form-item>
          个工作日退回已支付的代理费，甲方亦有权在未结算的代理费中直接抵扣。
        </div>
        <br />
        <div>7.5 因乙方违约违规的行为导致项目开发商或甲方上游合作方罚款或造成甲方经济损失的，乙方应承担相应责任及损失，且甲方有权直接从未结的代理费中进行扣除，不足部分乙方应另行支付。</div>
        <br />
        <div>7.6 在支付代理费前，甲方及开发商有权对乙方推介客户的真实性、有效性进行核实并对乙方引荐的客户进行抽查回访，
          推荐客户的真实性、有效性以客户反馈的回访结果为准，如回访或复核存在不满足推介要求或属于违法推介等异常情况的（如飞单、洗客等），
          甲方有权不予支付代理费，若就该成交已经支付的代理费，甲方有权在其他应发未发的代理费中抵扣或者要求乙方退回。</div>
        <br />
        <div>7.7 若项目开发商或甲方的委托方最终判定乙方引荐的客户不予结算佣金的，则甲方有权不予结算该单的代理费。</div>
        <br />
        <div class="font-weight">八、违约责任</div>
        <el-form-item
          label="8.1"
          prop="unContractLiability"
          label-width="30px"
        >
          <div class="editParty">
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              :disabled="unContractDisabled"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入违约责任"
              v-model="info.unContractLiability"
            >
            </el-input>
            <i
              class="el-icon-edit-outline tubiao"
              @click="unContractDisabled = !unContractDisabled"
            ></i>
          </div>
        </el-form-item>
        <br />
        <div>8.2 如乙方向甲方公司开具的增值税专用发票是无效虚假发票或者发生延迟开具增值税专用发票的情况，乙方应负责赔偿甲方公司因为乙方开具虚假发票和延迟开具发票造成的一切损失或损害，包括但不限于税金、附加费、罚金、滞纳金和法律费用。</div>
        <br />
        <div>8.3 如乙方在收到甲方退回代理费的通知后未按约退回应退的款项，则乙方按应付未付总金额
          <el-form-item
            prop="agencyFeeReturnRate"
            style="display: inline-block"
            label=" "
            label-width="20px"
          >
            <el-input
              v-model="info.agencyFeeReturnRate"
              placeholder="违约金比例"
              style="max-width: 120px;"
              clearable
            />
          </el-form-item>
          /每日的违约金支付给甲方，并承担甲方为主张权利而发生的律师费和差旅费等。
        </div>
        <br />
        <div class="font-weight">九、附则</div>
        <div>9.1 本协议适用中华人民共和国现行有效之法律、行政法规和其他有约束力的规范性文件。</div>
        <br />
        <div>9.2 甲、乙双方均负有保守对方商业秘密的义务，未经对方允许，不得将任何对方信息、相关资料或本协议内容向本协议以外的第三方透露（需告知客户的必要信息或资料除外）。协议终止或解除后，双方应将对方资料归还或销毁。该保密期限为三年，本条款具有独立性，不随本协议终止、解除而失效。</div>
        <br />
        <div>9.3 未尽事宜，双方另行签订补充协议。本协议正本一式两份，双方各持一份，具有同等效力，经双方加盖公章后生效。双方就本协议及补充条款有任何异议，双方应本着友好协商的原则处理，协商不成，可向项目所在地人民法院起诉。</div>
        <br />
        <div class="font-weight">十、其他约定</div>
        <el-form-item
          label=" "
          label-width="0"
        >
          <el-input
            show-word-limit
            type="textarea"
            class="textareaClass"
            maxlength="2000"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="选填, 条款请从10.1开始编号"
            v-model="info.supplementary"
          >
          </el-input>
        </el-form-item>
        <br />
        <div class="under">
          <div class="partA">
            <div>甲 方： （盖章）</div>
            <div>日 期：</div>
          </div>
          <div class="partB">
            <div>乙 方： （盖章）</div>
            <div>日 期：</div>
          </div>
        </div>
        <br />
        <el-row v-if="!agencyContrictId">
          <el-col :span="12">
            <el-form-item
              label="合同电子版"
              required
            >
              <el-button
                type="primary"
                class="margin-left-20"
                @click="viewElectronic"
              >预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="agencyContrictId">
          <el-col :span="24">
            <el-form-item
              label="合同电子版"
              required
            >
              <IhUpload
                v-model="fileList"
                size="100px"
                :upload-show="!!fileList.length"
                :limit="fileList.length"
                :editPermi="false"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <el-button
          type="success"
          @click="finish()"
          :loading="finishLoading"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
    <ih-dialog :show="setmealDialogVisible">
      <SetMealDialog
        :searchdata="setMealDialogData"
        @cancel="() => (setmealDialogVisible = false)"
        @finish="(data) => setMealFinish(data)"
      />
    </ih-dialog>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  post_distributContract_getCollectByCondition,
  post_distributContract_getCheckCollectByCondition,
  post_distributContract_addStandChannel,
  get_distributContract_getDistri__agencyContrictId,
  post_distributContract_updateStandChannel,
} from "@/api/project/index";
import { get_company_get__id, post_dict_getAllByType } from "@/api/system";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import SetMealDialog from "../../setMealDialog.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import { phoneValidator } from "ihome-common/util/base/form-ui";
@Component({
  components: { SetMealDialog },
})
export default class NormalSalesApply extends Vue {
  private info: any = {
    proId: null,
    proName: null,
    proRecord: null,
    padCommissionEnum: null,
    termId: null,
    contractStartTime: null,
    contractEndTime: null,
    contractTitle: null,
    contractSubtitle: null,
    agencyFeeRemark:
      "成交时间节点判断以客户签订《认购书》为准。（根据实际情况添加）",
    timeList: [],
    channelEnum: null,
    designatedAgencyId: null,
    designatedAgency: null,
    contractMxVOList: [],
    consumerComplete: `系统内项目一般以悦家云系统确认客户，系统外项目以与开发商签订的合同为基础确定确认方式。客户成交及确认条款一般与开发商对我司的销售代理协议一致或严于该。（须要修改）`,
    agencyCostCondition: `乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书后(可根据实际情况更改条件)，并提交齐备的代理费核算文件及增值税专用发票的前提下，甲方在收到开发商相应单元代理费后，具备代理费结算条件。`,
    agencyCostSettleWay:
      "成交时间节点判断以客户签订《认购书》为准。（根据实际情况添加）",
    agencyFeeReturnTime: null,
    agencyFeeReturnRate: null,
    agencySettleCondtion: null,
    partyCompany: null,
    partyCompanyId: null,
    partyaAddr: null,
    companyKind: null,
    costSettleType: null,
    unContractLiability: `乙方在销售过程中有下列行为之一时，甲方有权解除本协议，乙方需向甲方赔偿因此行为对甲方造成的所有损失（包括但不限于律师费、诉讼费、公证费、差旅费等费用），并向甲方支付实际应付代理费总额的20%作为违约金：
      8.1.1 对客户做出任何虚假承诺或擅自向客户收取费用；
      8.1.2 乙方人员与甲方现场销售人员或其他人员相互勾结，将原本属于自然到访客户通过不正当手段转化为乙方客户；
      8.1.3 乙方人员在项目周边直径1公里范围以内，有揽客、举牌、打街霸活动的；
      8.1.4 乙方人员在销售现场不服从甲方人员管理的且拒不改正；
      8.1.5 乙方人员在销售现场出现争客抢客、打架斗殴行为；
      8.1.6 乙方人员带客到现场，未经甲方代表确认，私自带客户进入项目；
      8.1.7 擅自将甲方提供的资料及在工作过程中知悉的甲方商业秘密对外披露、提供、发布等；
      8.1.8 其他有损害甲方及其关联公司合法权益和声誉的行为。`,
    supplementary: null,
    titleOrRemark: null,
  };
  isShow: any = false;
  padCommissionEnumOptions: any = [];
  searchConditon: any = {};
  queryObj: any = {};
  setmealDialogVisible: any = false;
  setMealDialogData: any = {};
  finishLoading: any = false;
  unContractDisabled: any = true;
  fileList: any = [];
  rules: any = {
    contractTitle: [
      {
        required: true,
        message: "请输入合同主标题",
        trigger: "change",
      },
    ],
    partyaMan: [
      {
        required: true,
        message: "请输入甲方联系人",
        trigger: "change",
      },
    ],
    partyaTel: [
      {
        required: true,
        message: "请输入甲方电话",
        trigger: "change",
      },
      { validator: phoneValidator, trigger: "change" },
    ],
    timeList: [
      {
        required: true,
        message: "请选择合作期限",
        trigger: "change",
      },
    ],
    channelEnum: [
      {
        required: true,
        message: "请选择渠道类型",
        trigger: "change",
      },
    ],
    padCommissionEnum: [
      {
        required: true,
        message: "请选择垫佣周期",
        trigger: "change",
      },
    ],
    agencyFeeRemark: [
      {
        required: true,
        message: "请输入备注",
        trigger: "change",
      },
    ],
    consumerComplete: [
      {
        required: true,
        message: "请输入客户成交及确认",
        trigger: "change",
      },
    ],
    agencySettleCondtion: [
      {
        required: true,
        message: "请选择代理费结算条件",
        trigger: "change",
      },
    ],
    agencyCostSettleWay: [
      {
        required: true,
        message: "请输入客户成交及确认",
        trigger: "change",
      },
    ],
    costSettleType: [
      {
        required: true,
        message: "请选择费用结算类型",
        trigger: "change",
      },
    ],
    agencyFeeReturnTime: [
      {
        required: true,
        message: "请填写退回期限",
        trigger: "change",
      },
    ],
    unContractLiability: [
      {
        required: true,
        message: "请输入违约责任",
        trigger: "change",
      },
    ],
    agencyFeeReturnRate: [
      {
        required: true,
        message: "请填写违约金比例",
        trigger: "change",
      },
    ],
  };
  private companyKindOption: any = [];
  timeList: any = [];

  @Watch("info.contractMxVOList")
  getContractMxVOList(val: any) {
    if (val.length) {
      let contractArr: any = val.map((v: any) => v.costTypeEnum);
      if (contractArr.every((v: any) => v === "ServiceFee")) {
        this.info.costSettleType = "CustomerServFee";
      } else if (contractArr.every((v: any) => v === "AgencyFee")) {
        this.info.costSettleType = "DevelopAgenFee";
      } else {
        this.info.costSettleType = "DevelopAgenFeeOrCustServFee";
      }
    } else {
      this.info.costSettleType = null;
    }
  }

  pickerOptions: any = {
    disabledDate: (time: any) => {
      return this.dataTimeChange(time);
    },
  };

  get agencyContrictId() {
    return this.$route.query.id;
  }

  dataTimeChange(time: any) {
    let start: any = new Date(this.timeList[0]).getTime() - 8.64e7;
    let end: any = new Date(this.timeList[1]).getTime();
    return time.getTime() < start || time.getTime() > end;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    const res: any = sessionStorage.getItem("addContract");
    this.timeList = [JSON.parse(res).termStart, JSON.parse(res).termEnd];
    if (this.agencyContrictId) {
      const data = await get_distributContract_getDistri__agencyContrictId({
        agencyContrictId: this.agencyContrictId,
      });
      this.info = { ...data, ...JSON.parse(res), timeList: [] };
      this.info.timeList = [data.contractStartTime, data.contractEndTime];
      this.fileList = data.attachTermItemVOS.map((v: any) => ({
        fileId: v.fileId,
        fileName: v.fileName,
        type: v.type,
        exAuto: v.exAuto,
      }));
      if (data.channelEnum === "Appoint" || data.channelEnum === "Strategic") {
        this.isShow = true;
        this.companyKindOption = await post_dict_getAllByType({
          tag: "Channel",
          type: "CompanyKind",
          valid: "Valid",
        });
        if (data.companyKind === "ChannelCompany") {
          this.searchConditon = {
            cycleCity: window.sessionStorage.getItem("shengshiqu"),
            departmentOrgId: window.sessionStorage.getItem("departmentOrgId"),
          };
        }
      } else {
        this.isShow = false;
      }
    } else {
      Object.assign(this.info, JSON.parse(res));
      if (this.info.preferentialPartyAId) {
        const item = await get_company_get__id({
          id: this.info.preferentialPartyAId,
        });
        this.info.partyCompany = item?.name;
        this.info.partyCompanyId = item?.id;
        this.info.partyaAddr = item?.address;
      }
    }
    if (this.info?.padCommissionEnum) {
      if (this.info?.padCommissionEnum !== "Veto") {
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
          {
            code: this.info.padCommissionEnum,
            name: (this.$root as any).dictAllName(
              this.info.padCommissionEnum,
              "PadCommission"
            ),
          },
        ];
      } else {
        this.info.padCommissionEnum = "Veto";
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
        ];
      }
    } else {
      this.info.padCommissionEnum = "Veto";
      this.padCommissionEnumOptions = [
        {
          code: "Veto",
          name: "否",
        },
      ];
    }
  }

  async channelChange(val: any) {
    if (val === "Appoint" || val === "Strategic") {
      this.isShow = true;
      this.companyKindOption = await post_dict_getAllByType({
        tag: "Channel",
        type: "CompanyKind",
        valid: "Valid",
      });
    } else {
      this.isShow = false;
      this.companyKindOption = [];
    }
    this.queryUnderData(val);
  }

  getChannelInfo(item: any) {
    this.info.designatedAgency = item.name;
    this.info.designatedAgencyId = item.id;
    this.queryUnderData(this.info.designatedAgencyId);
  }

  companyKindChange(val: any) {
    this.info.designatedAgencyId = null;
    this.info.designatedAgency = null;
    if (val) {
      switch (val) {
        case "ChannelCompany":
          this.searchConditon = {
            cycleCity: window.sessionStorage.getItem("shengshiqu"),
            departmentOrgId: window.sessionStorage.getItem("departmentOrgId"),
            // channelEnum: this.info.channelEnum,
          };
          break;
        case "InfieldCompany":
          this.searchConditon = {};
          break;
      }
    } else {
      this.queryUnderData("123");
    }
  }

  // 根据渠道类型,垫佣周期,中介公司获取下表数据
  queryUnderData(data: any) {
    this.info.contractMxVOList = [];
    if (data) {
      this.queryObj = {
        padCommissionEnum: this.info.padCommissionEnum,
        termId: this.info.termId,
        channelEnum: this.info.channelEnum,
        designatedAgency: null,
        designatedAgencyId: null,
        contractKind: "StandChannel",
      };
      if (this.isShow) {
        if (
          this.info.designatedAgencyId &&
          this.info.padCommissionEnum &&
          this.info.channelEnum
        ) {
          this.queryObj.designatedAgency = this.info.designatedAgency;
          this.queryObj.designatedAgencyId = this.info.designatedAgencyId;
          this.queryObj.companyKind = this.info.companyKind;
          this.queryCondition();
        }
      } else {
        this.info.designatedAgency = null;
        this.info.companyKind = null;
        this.info.designatedAgencyId = null;
        if (this.info.padCommissionEnum && this.info.channelEnum) {
          this.queryObj.designatedAgency = null;
          this.queryObj.designatedAgencyId = null;
          this.queryObj.companyKind = null;
          this.queryCondition();
        }
      }
    } else {
      this.info.designatedAgency = null;
      this.info.companyKind = null;
      this.info.designatedAgencyId = null;
    }
  }

  // 表数据
  async queryCondition() {
    const res = await post_distributContract_getCollectByCondition(
      this.queryObj
    );
    this.info.contractMxVOList = res ? res : [];
  }

  add() {
    this.setMealDialogData.channelEnum = this.info.channelEnum;
    this.setMealDialogData.padCommissionEnum = this.info.padCommissionEnum;
    this.setMealDialogData.id = this.info.termId;
    this.setMealDialogData.contractKind = "StandChannel";
    if (this.isShow) {
      this.setMealDialogData.companyKind = this.info.companyKind;
      this.setMealDialogData.designatedAgencyId = this.info.designatedAgencyId;
    }
    this.setmealDialogVisible = true;
  }

  async del(index: number) {
    try {
      this.info.contractMxVOList.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async setMealFinish(data: any) {
    if (data.length) {
      let arr: any = [];
      arr = data.map((v: any) => v.packageMxId);
      this.queryObj.packMxIds = [
        ...new Set(
          arr.concat(this.info.contractMxVOList.map((v: any) => v.conditionId))
        ),
      ];
      this.queryObj.termId = this.info.termId;
      this.queryObj.channelEnum = this.info.channelEnum;
      this.queryObj.padCommissionEnum = this.info.padCommissionEnum;
      this.queryObj.contractKind = "StandChannel";
      if (this.isShow) {
        this.queryObj.designatedAgencyId = this.info.designatedAgencyId;
        this.queryObj.designatedAgency = this.info.designatedAgency;
        this.queryObj.companyKind = this.info.companyKind;
      }
      const item = await post_distributContract_getCheckCollectByCondition(
        this.queryObj
      );
      this.info.contractMxVOList = item;
      this.$message.success("新增成功");
      this.setmealDialogVisible = false;
    } else {
      this.$message.warning("请勾选详细收派标准信息");
    }
  }

  agencySettleCondtionChange(val: any) {
    if (val === "ComNoPad") {
      this.info.agencyCostCondition = `乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书（须要修改），乙方提交齐备的代理费核算文件（。。。。。。）及增值税发票的前提下，且甲方收到项目开发商或委托方相应代理费后，具备代理费结算条件。`;
    } else if (val === "ComPad") {
      this.info.agencyCostCondition = `乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书（须要修改），开发商完成结算明细确认（即开发商明源系统转签约且项目开发商相关营销负责人书面签字确认），乙方提交齐备的代理费核算文件（。。。。。。）及增值税发票的前提下，具备代理费结算条件。`;
    } else if (val === "SpecialDiscount") {
      this.info.agencyCostCondition = `乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书（须要修改），且开发商完成结算明细确认（即项目开发商总经理书面签字确认）后，乙方提交齐备的代理费核算文件（。。。。。。）及增值税发票的前提下，具备代理费结算条件。`;
    } else {
      this.info.agencyCostCondition = "";
    }
  }

  // 预览电子版
  viewElectronic() {
    if (this.agencyContrictId) {
      window.open(
        `/sales-api/sales-document-cover/file/browse/${this.info.fileId}`
      );
    } else {
      const token: any = getToken();
      axios({
        method: "POST",
        url: `/sales-api/project/distributContract/getPreView`,
        xsrfHeaderName: "Authorization",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        data: {
          ...this.info,
          contractStartTime: this.info.timeList[0],
          contractEndTime: this.info.timeList[1],
          contractKind: "StandChannel",
        },
      }).then((res: any) => {
        const arr = new Blob([res.data], { type: "application/pdf" });
        const href = window.URL.createObjectURL(arr);
        window.open(href);
      });
    }
  }

  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }

  @NoRepeatHttp()
  async submit(v: any) {
    if (v) {
      let obj: any = {};
      obj = { ...this.info };
      let flag = this.info.timeList && this.info.timeList.length;
      obj.contractStartTime = flag ? this.info.timeList[0] : null;
      obj.contractEndTime = flag ? this.info.timeList[1] : null;
      delete obj.timeList;
      delete obj.preferentialPartyAId;
      console.log(obj);
      if (!this.agencyContrictId) {
        try {
          this.finishLoading = true;
          await post_distributContract_addStandChannel(obj);
          this.$message.success("模板添加成功");
          this.finishLoading = false;
          window.sessionStorage.setItem("tabStatus", "Notification");
          this.$router.go(-1);
        } catch (err) {
          this.finishLoading = false;
          console.log(err);
        }
      } else {
        if (this.$route.name === "copyNormalDistributionApply") {
          try {
            this.finishLoading = true;
            await post_distributContract_addStandChannel(obj);
            this.$message.success("模板复制成功");
            this.finishLoading = false;
            window.sessionStorage.setItem("tabStatus", "Notification");
            this.$router.go(-1);
          } catch (err) {
            this.finishLoading = false;
            console.log(err);
          }
        } else if (this.$route.name === "normalDistributionApply") {
          try {
            await post_distributContract_updateStandChannel(obj);
            this.$message.success("模板编辑成功");
            this.finishLoading = false;
            window.sessionStorage.setItem("tabStatus", "Notification");
            this.$router.go(-1);
          } catch (err) {
            this.finishLoading = false;
            console.log(err);
          }
        }
      }
    } else {
      setTimeout(() => {
        let isError: any = document.getElementsByClassName("is-error");
        if (isError != null) {
          isError[0].querySelector("input").focus();
        }
      }, 100);
      return false;
    }
  }

  cancel() {
    window.sessionStorage.setItem("tabStatus", "Notification");
    this.$router.go(-1);
  }
}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  .title-contant {
    font-size: 18px;
    font-weight: 600;
  }
}

.top-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -50px;
  .title-contract {
    width: 300px;
  }
  .title-sub {
    width: 300px;
  }
}

.textareaClass {
  /deep/ .el-input__count {
    background: transparent;
    bottom: -5px;
    right: 20px;
  }
}

.editParty {
  position: relative;
  .tubiao {
    position: absolute;
    bottom: 20px;
    right: 25px;
    font-size: 24px;
    cursor: pointer;
  }
}

.font-weight {
  font-weight: 600;
}

.under {
  display: flex;
  justify-content: space-around;
}

.inline-block {
  display: inline-block;
  margin: 0 0 10px -90px;
}
</style>