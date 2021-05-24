<!--
 * @Description: 成交信息
 * @version: 
 * @Author: lsj
 * @Date: 2021-05-18 11:20:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-18 14:36:22
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>成交信息</span>
      </div>
      <p class="p-title">项目信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>项目周期</span>
            <span class="red">
              <span v-if="infoForm.modelCode">
                [{{$root.dictAllName(infoForm.modelCode, "BusinessModel") }}]
              </span>
              <span v-if="infoForm.isConsign">
                [{{ infoForm.isConsign == "Yes" ? "代销" : "非代销" }}]
              </span>
              <span v-if="infoForm.isMarketProject">
                [{{infoForm.isMarketProject == "Yes" ? "市场化" : "非市场化" }}]
              </span>
            </span>
          </div>
          <el-link type="primary" class="font-weight-600" @click="gotoNew(infoForm, 'cycleName')">
            {{ infoForm.cycleName }}</el-link>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">细分业务模式</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.refineModel, "Subdivide") }}
          </div>
        </el-col>
      </el-row>
      <p class="line"></p>
      <p class="p-title">房产信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">物业类型</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.house.propertyType, "Property") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">栋座房号</div>
          <div class="line-item-bottom">
            {{ infoForm.house.buildingName }}{{ infoForm.house.roomNo }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">建筑面积</div>
          <div class="line-item-bottom">{{ infoForm.house.area }} m²</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">户型</div>
          <div class="line-item-bottom">
            <span>{{ infoForm.house.room }}室</span>
            <span>{{ infoForm.house.hall }}厅</span>
            <span>{{ infoForm.house.toilet }}卫</span>
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">房产证/预售合同编号</div>
          <div class="line-item-bottom">{{ infoForm.house.propertyNo ? infoForm.house.propertyNo : '-'}}</div>
        </el-col>
      </el-row>
      <p class="line"></p>
      <p class="p-title">成交信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">合同类型</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.contType, "ContType") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">成交阶段</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.stage, "DealStage") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约类型</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.signType, "SignUp") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">认购价格</div>
          <div class="line-item-bottom">{{ infoForm.subscribePrice }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">认购日期</div>
          <div class="line-item-bottom">{{ infoForm.subscribeDate }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约价格</div>
          <div class="line-item-bottom">{{ infoForm.signPrice }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">签约日期</div>
          <div class="line-item-bottom">{{ infoForm.signDate }}</div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">备案情况</div>
          <div class="line-item-bottom">
            {{ $root.dictAllName(infoForm.recordState, "HasOrNoType") }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">现场销售</div>
          <div class="line-item-bottom">{{ infoForm.sceneSales ? infoForm.sceneSales : '-'}}</div>
        </el-col>
        <el-col :span="24" class="line-item">
          <div class="line-item-top">房款回笼比例</div>
          <div class="line-item-bottom">
            {{ infoForm.returnRatio ? infoForm.returnRatio : 0 }}%
          </div>
        </el-col>
      </el-row>
      <p class="line"></p>
      <p class="p-title">拆佣公司</p>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">一手代理公司</div>
          <div class="line-item-bottom">
            <el-link type="primary" class="font-weight-600" @click="gotoNew(infoForm, 'oneAgentTeam')">
              {{ infoForm.oneAgentTeam ? infoForm.oneAgentTeam : '-'}}</el-link>
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">一手代理合同</div>
          <div class="line-item-bottom">
            <el-link type="primary" class="font-weight-600" @click="gotoNew(infoForm, 'firstContNo')">
              {{ infoForm.firstContTitle ? infoForm.firstContTitle : '-'}}</el-link>
          </div>
        </el-col>
      </el-row>
      <el-row class="ih-info-line">
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>渠道公司</span>
            <span class="red" v-if="companyKind">[{{ companyKind }}]</span>
          </div>
          <div class="line-item-bottom">
            <el-link type="primary" class="font-weight-600" @click="gotoNew(infoForm, 'agencyName')">
              {{infoForm.agencyList && infoForm.agencyList.length ? infoForm.agencyList[0].agencyName : "" }}
            </el-link>
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">经纪人</div>
          <div class="line-item-bottom">
            {{infoForm.agencyList && infoForm.agencyList.length ? infoForm.agencyList[0].broker : "" }}
          </div>
        </el-col>
        <el-col :span="8" class="line-item">
          <div class="line-item-top">
            <span>渠道分销合同</span>
            <span class="red">
              <span v-if="infoForm.isMat">
                [{{infoForm.isMat == "Veto" ? "不垫佣" : $root.dictAllName(infoForm.isMat, "PadCommission") }}]
              </span>
            </span>
          </div>
          <div class="line-item-bottom">
            <el-link type="primary" class="font-weight-600" @click="gotoNew(infoForm, 'contTitle')">
              {{ infoForm.contTitle }}</el-link>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <br />
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class BaseInfo extends Vue {
    @Prop() infoForm?: any;

    get companyKind() {
      let companyKind: any = null;
      if (this.infoForm.agencyList && this.infoForm.agencyList.length > 0) {
        let companyKindCode: any = this.infoForm.agencyList[0].companyKind;
        companyKind = (this as any).$root.dictAllName(companyKindCode, "CompanyKind");
      }
      return companyKind;
    }

    async created() {
      console.log('baseInfo');
    }

    // 链接跳转
    gotoNew(item: any, type: any) {
      if (type == "oneAgentTeam") {
        window.open(`/web-sales/firstAgency/info?id=${item.oneAgentTeamId}`);
      } else if (type == "agencyName") {
        let agencyId =
          item.agencyList && item.agencyList.length
            ? item.agencyList[0].agencyId
            : "";
        if (agencyId != "") {
          window.open(`/web-sales/channelBusiness/info?id=${agencyId}`);
        }
      } else if (type == "contTitle") {
        // 需要根据渠道合同类型跳转不同的页面
        if (item.contractKind === 'StandKindSaleConfirm') {
          // 标准联动销售确认书(启动函)
          window.open(`/web-sales/distribution/normalSalesInfo?id=${item.contId}`);
        } else if (item.contractKind === 'NoStandKindSaleConfirm') {
          // 非标联动销售确认书(启动函)
          window.open(`/web-sales/distribution/notSalesInfo?id=${item.contId}`);
        } else if (item.contractKind === 'StandChannel') {
          // 标准渠道分销合同
          window.open(`/web-sales/distribution/normalDistributionInfo?id=${item.contId}`);
        } else if (item.contractKind === 'NoStandChannel') {
          // 非标渠道分销合同
          window.open(`/web-sales/distribution/notDistributionInfo?id=${item.contId}`);
        } else if (item.contractKind === 'NoChannel') {
          // 非渠道类合同
          window.open(`/web-sales/distribution/notChannelInfo?id=${item.contId}`);
        }
      } else if (type == "firstContNo") {
        window.open(`/web-sales/distribution/notChannelInfo?id=${item.firstContId}`);
      } else if (type == "cycleName") {
        window.open(`/web-sales/projectApproval/info?id=${item.cycleId}`);
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
