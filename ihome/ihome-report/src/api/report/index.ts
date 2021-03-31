/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-3-30 11:26:57
import { request } from '@/api/base'
const basePath = "/sales-api/report"
/**导出excel*/
export async function post_achievementRole_downExcel (d?: any) {
return await request.post< any,any> (basePath+'/achievementRole/downExcel', d)
}
/**查询报表*/
export async function get_achievementRole_get (d?: any) {
return await request.get<AchievementRole[],AchievementRole[]>(basePath+'/achievementRole/get', { params: d })
}
/**查询报表数据*/
export async function post_achievementRole_getList (d?: any) {
return await request.post< ReportVO[],ReportVO[]> (basePath+'/achievementRole/getList', d)
}
/**同步数据*/
export async function get_achievementRole_syncData (d?: any) {
return await request.get<AchievementRole[],AchievementRole[]>(basePath+'/achievementRole/syncData', { params: d })
}
/**定时器更新数据*/
export async function get_getreportAchievementRole (d?: any) {
return await request.get<any,any>(basePath+'/getreportAchievementRole', { params: d })
}
/**同步数据*/
export async function get_synchronousDate (d?: any) {
return await request.get<any,any>(basePath+'/synchronousDate', { params: d })
}
//===============================================================================================
/**ResModel模型*/
export interface ResModel<T> {
/**是否成功（0 是 -1 否）*/
code: number;
/**响应信息*/
msg: string;
/**返回对象*/
result: T;
}
/**PageModel模型*/
export interface PageModel<T> {
/**结果集*/
list:T[];
/**总记录数*/
total: number;
}
/**AchievementRole*/
export interface AchievementRole {
/**成交业绩分配ID*/
achieveId: number;
/**总业绩金额*/
achievement: number;
/**业绩比例*/
achievementRatio: number;
/**业绩日期(yyyy-MM-dd HH:mm:ss)*/
achievementTime: string;
/**业绩归类 [是否市场化](Yes-是、No-否)*/
achievementType: string;
/**面积*/
area: number;
/**业绩日期月*/
atmonth: number;
/**业绩日期季度*/
atquarter: number;
/**业绩日期日*/
atyday: number;
/**业绩日期年*/
atyear: number;
/**开发商归属*/
belongPoly: number;
/**片区ID*/
busiarId: number;
/**事业部ID*/
busibaId: number;
/**业务类型(New-新房、Finished-产成品)*/
businessType: string;
/**门店ID*/
busishId: number;
/**小战区ID*/
busiswzId: number;
/**战区ID*/
busiwzId: number;
/**业绩变更类型*/
changeType: string;
/**其他渠道费用*/
channelAmount: number;
/**产生其他渠道费用*/
channelAmountProduce: number;
/**使用其他渠道费用*/
channelAmountReduce: number;
/**业务分类(Rent-租赁、Sale-二手买卖、NewPolySelf-新房【保利自行成交】、NewNotPolySelf-新房【非保利自行成交】、FinishedStallPolySelf-产成品（车位、储藏室）【保利自行成交】、FinishedStallNotPolySelf-产成品（车位、储藏室）【非保利自行成交】、FinishedNotStallPolySelf-产成品（非车位、储藏室）【保利自行成交】、FinishedNotStallNotPolySelf-产成品（非车位、储藏室）【非保利自行成交】、NewPolyVisit-新房【保利自然来访成交】、NewNotPolyVisit-新房【非保利自然来访成交】、NewPolyDistributtion-新房【保利分销成交】、NewNotPolyDistribution-新房【非保利分销成交】、FinishedStallPolyDistribution-产成品（车位、储藏室）【保利分销成交】、FinishedStallNotPolyDistribution-产成品（车位、储藏室）【非保利分销成交】、FinishedNotStallPolyDistribution-产成品（非车位、储藏室）【保利分销成交】、FinishedNotStallNotPolyDistribution-产成品（非车位、储藏室）【非保利分销成交】、Other-其他)*/
classifyBusiness: string;
/**旧合同编号*/
contCode: string;
/**费用类型*/
contFeeType: string;
/**合同状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
contStat: string;
/**合同类型(Sale-销售、Rent-租赁、Self-自行成交、DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交、Other-其它)*/
contType: string;
/**undefined*/
createBy: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**签约日期月*/
ddmonth: number;
/**签约日期季度*/
ddquarter: number;
/**签约日期日*/
ddyday: number;
/**签约日期年*/
ddyear: number;
/**成交报告编号*/
dealCode: string;
/**签约日期(yyyy-MM-dd HH:mm:ss)*/
dealDate: string;
/**成交店组*/
dealGroup: string;
/**新成交Id*/
dealId: number;
/**成交价格*/
dealPrice: number;
/**已删除*/
deleted: number;
/**公司ID*/
depId: number;
/**拆佣金额*/
externalAmount: number;
/**店组ID*/
groupId: number;
/**成交套数*/
houseSets: number;
/**ID*/
id: number;
/**旧父合同编号*/
parentContCode: string;
/**新主成交Id*/
parentId: number;
/**角色业绩ID*/
pkid: number;
/**物业用途(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyUsage: string;
/**应收业绩*/
receivable: number;
/**已收金额*/
received: number;
/**实收比例*/
receivedRatio: number;
/**租金*/
rent: number;
/**角色人ID*/
roleId: number;
/**角色人类型*/
roleType: string;
/**公司业绩金额*/
shareAmount: number;
/**提交时间月*/
stmonth: number;
/**提交时间季度*/
stquarter: number;
/**提交时间日*/
styday: number;
/**提交时间年*/
styear: number;
/**提交时间(yyyy-MM-dd HH:mm:ss)*/
submitTime: string;
/**0 旧系统，1新系统*/
sysType: number;
/**未收金额*/
unreceived: number;
/**undefined*/
updateBy: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**AchievementRoleConditionVO*/
export interface AchievementRoleConditionVO {
/**查询条件*/
arguTimeType: string;
/**选中的组织ID*/
chooseOrgId: number;
/**终止时间 yyyy-MM-dd hh:mm:ss(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**选中的组织类型(Root-组织根节点、Company-公司、Department-事业部、Zone-战区、SmallZone-小战区、District-片区、Shop-门店、Group-店组)*/
orgTypeEnum: string;
/**起始时间 yyyy-MM-dd hh:mm:ss(yyyy-MM-dd HH:mm:ss)*/
startTime: string;
/**成交状态*/
status: string[];
}
/**ReportVO*/
export interface ReportVO {
/**[总包]成交面积/㎡*/
allNotnaturalArea: number;
/**[总包]含其他渠道费用/万元*/
allNotnaturalChannelAmount: number;
/**[总包]成交总价/万元*/
allNotnaturalDealPrice: number;
/**[总包]对外拆佣/万元*/
allNotnaturalExternalAmount: number;
/**[总包]成交套数*/
allNotnaturalHouseSets: number;
/**[总包]应收业绩/万元*/
allNotnaturalReceivable: number;
/**[总包]实收业绩/万元*/
allNotnaturalReceived: number;
/**[总包]公司业绩/万元*/
allNotnaturalShareAmount: number;
/**[总包]未收/万元*/
allNotnaturalUnreceived: number;
/**[产成品(非车位)非保利分销成交]考核业绩/万元*/
finishedNotStallNotPolyDistributionAchievement: number;
/**[产成品(非车位)非保利分销成交]成交总价/万元*/
finishedNotStallNotPolyDistributionAmount: number;
/**[产成品(非车位)非保利分销成交]成交面积/㎡*/
finishedNotStallNotPolyDistributionArea: number;
/**[产成品(非车位)非保利分销成交]含其他渠道费用/万元*/
finishedNotStallNotPolyDistributionChannelAmount: number;
/**[产成品(非车位)非保利分销成交]对外拆佣/万元*/
finishedNotStallNotPolyDistributionExternalAmount: number;
/**[产成品(非车位)非保利分销成交]成交套数*/
finishedNotStallNotPolyDistributionHouseSets: number;
/**[产成品(非车位)非保利分销成交]费率/个月*/
finishedNotStallNotPolyDistributionRatio: number;
/**[产成品(非车位)非保利分销成交]应收业绩/万元*/
finishedNotStallNotPolyDistributionReceivable: number;
/**[产成品(非车位)非保利分销成交]实收业绩/万元*/
finishedNotStallNotPolyDistributionReceived: number;
/**[产成品(非车位)非保利分销成交]未收/万元*/
finishedNotStallNotPolyDistributionUnreceived: number;
/**[产成品(非车位)非保利自行成交]考核业绩/万元*/
finishedNotStallNotPolySelfAchievement: number;
/**[产成品(非车位)非保利自行成交]成交总价/万元*/
finishedNotStallNotPolySelfAmount: number;
/**[产成品(非车位)非保利自行成交]成交面积/㎡*/
finishedNotStallNotPolySelfArea: number;
/**[产成品(非车位)非保利自行成交]含其他渠道费用/万元*/
finishedNotStallNotPolySelfChannelAmount: number;
/**[产成品(非车位)非保利自行成交]对外拆佣/万元*/
finishedNotStallNotPolySelfExternalAmount: number;
/**[产成品(非车位)非保利自行成交]成交套数*/
finishedNotStallNotPolySelfHouseSets: number;
/**[产成品(非车位)非保利自行成交]费率/个月*/
finishedNotStallNotPolySelfRatio: number;
/**[产成品(非车位)非保利自行成交]应收业绩/万元*/
finishedNotStallNotPolySelfReceivable: number;
/**[产成品(非车位)非保利自行成交]实收业绩/万元*/
finishedNotStallNotPolySelfReceived: number;
/**[产成品(非车位)非保利自行成交]未收/万元*/
finishedNotStallNotPolySelfUnreceived: number;
/**[产成品(非车位)保利分销成交]成交总价/万元*/
finishedNotStallPolyDistributionAmount: number;
/**[产成品(非车位)保利分销成交]成交面积/㎡*/
finishedNotStallPolyDistributionArea: number;
/**[产成品(非车位)保利分销成交]含其他渠道费用/万元*/
finishedNotStallPolyDistributionChannelAmount: number;
/**[产成品(非车位)保利分销成交]对外拆佣/万元*/
finishedNotStallPolyDistributionExternalAmount: number;
/**[产成品(非车位)保利分销成交]成交套数*/
finishedNotStallPolyDistributionHouseSets: number;
/**[产成品(非车位)保利分销成交]费率/个月*/
finishedNotStallPolyDistributionRatio: number;
/**[产成品(非车位)保利分销成交]应收业绩/万元*/
finishedNotStallPolyDistributionReceivable: number;
/**[产成品(非车位)保利分销成交]实收业绩/万元*/
finishedNotStallPolyDistributionReceived: number;
/**[产成品(非车位)保利分销成交]未收/万元*/
finishedNotStallPolyDistributionUnreceived: number;
/**[产成品(非车位)保利自行成交]考核业绩/万元*/
finishedNotStallPolySelfAchievement: number;
/**[产成品(非车位)保利自行成交]成交总价/万元*/
finishedNotStallPolySelfAmount: number;
/**[产成品(非车位)保利自行成交]成交面积/㎡*/
finishedNotStallPolySelfArea: number;
/**[产成品(非车位)保利自行成交]含其他渠道费用/万元*/
finishedNotStallPolySelfChannelAmount: number;
/**[产成品(非车位)保利自行成交]对外拆佣/万元*/
finishedNotStallPolySelfExternalAmount: number;
/**[产成品(非车位)保利自行成交]成交套数*/
finishedNotStallPolySelfHouseSets: number;
/**[产成品(非车位)保利自行成交]费率/个月*/
finishedNotStallPolySelfRatio: number;
/**[产成品(非车位)保利自行成交]应收业绩/万元*/
finishedNotStallPolySelfReceivable: number;
/**[产成品(非车位)保利自行成交]实收业绩/万元*/
finishedNotStallPolySelfReceived: number;
/**[产成品(非车位)保利自行成交]未收/万元*/
finishedNotStallPolySelfUnreceived: number;
/**[产成品非保利分销成交]考核业绩/万元*/
finishedStallNotPolyDistributionAchievement: number;
/**[产成品非保利分销成交]成交总价/万元*/
finishedStallNotPolyDistributionAmount: number;
/**[产成品非保利分销成交]成交面积/㎡*/
finishedStallNotPolyDistributionArea: number;
/**[产成品非保利分销成交]含其他渠道费用/万元*/
finishedStallNotPolyDistributionChannelAmount: number;
/**[产成品非保利分销成交]对外拆佣/万元*/
finishedStallNotPolyDistributionExternalAmount: number;
/**[产成品非保利分销成交]成交套数*/
finishedStallNotPolyDistributionHouseSets: number;
/**[产成品非保利分销成交]费率/个月*/
finishedStallNotPolyDistributionRatio: number;
/**[产成品非保利分销成交]应收业绩/万元*/
finishedStallNotPolyDistributionReceivable: number;
/**[产成品非保利分销成交]实收业绩/万元*/
finishedStallNotPolyDistributionReceived: number;
/**[产成品非保利分销成交]未收/万元*/
finishedStallNotPolyDistributionUnreceived: number;
/**[产成品非保利自行成交]考核业绩/万元*/
finishedStallNotPolySelfAchievement: number;
/**[产成品非保利自行成交]成交总价/万元*/
finishedStallNotPolySelfAmount: number;
/**[产成品非保利自行成交]成交面积/㎡*/
finishedStallNotPolySelfArea: number;
/**[产成品非保利自行成交]含其他渠道费用/万元*/
finishedStallNotPolySelfChannelAmount: number;
/**[产成品非保利自行成交]对外拆佣/万元*/
finishedStallNotPolySelfExternalAmount: number;
/**[产成品非保利自行成交]成交套数*/
finishedStallNotPolySelfHouseSets: number;
/**[产成品非保利自行成交]费率/个月*/
finishedStallNotPolySelfRatio: number;
/**[产成品非保利自行成交]应收业绩/万元*/
finishedStallNotPolySelfReceivable: number;
/**[产成品非保利自行成交]实收业绩/万元*/
finishedStallNotPolySelfReceived: number;
/**[产成品非保利自行成交]未收/万元*/
finishedStallNotPolySelfUnreceived: number;
/**[产成品保利分销成交]成交总价/万元*/
finishedStallPolyDistributionAmount: number;
/**[产成品保利分销成交]成交面积/㎡*/
finishedStallPolyDistributionArea: number;
/**[产成品保利分销成交]含其他渠道费用/万元*/
finishedStallPolyDistributionChannelAmount: number;
/**[产成品保利分销成交]对外拆佣/万元*/
finishedStallPolyDistributionExternalAmount: number;
/**[产成品保利分销成交]成交套数*/
finishedStallPolyDistributionHouseSets: number;
/**[产成品保利分销成交]费率/个月*/
finishedStallPolyDistributionRatio: number;
/**[产成品保利分销成交]应收业绩/万元*/
finishedStallPolyDistributionReceivable: number;
/**[产成品保利分销成交]实收业绩/万元*/
finishedStallPolyDistributionReceived: number;
/**[产成品保利分销成交]未收/万元*/
finishedStallPolyDistributionUnreceived: number;
/**[产成品保利自行成交]成交总价/万元*/
finishedStallPolySelfAmount: number;
/**[产成品保利自行成交]成交面积/㎡*/
finishedStallPolySelfArea: number;
/**[产成品保利自行成交]含其他渠道费用/万元*/
finishedStallPolySelfChannelAmount: number;
/**[产成品保利自行成交]对外拆佣/万元*/
finishedStallPolySelfExternalAmount: number;
/**[产成品保利自行成交]成交套数*/
finishedStallPolySelfHouseSets: number;
/**[产成品保利自行成交]费率/个月*/
finishedStallPolySelfRatio: number;
/**[产成品保利自行成交]应收业绩/万元*/
finishedStallPolySelfReceivable: number;
/**[产成品保利自行成交]实收业绩/万元*/
finishedStallPolySelfReceived: number;
/**[产成品保利自行成交]未收/万元*/
finishedStallPolySelfUnreceived: number;
/**[市场化]考核业绩/万元*/
marketAchievement: number;
/**[市场化]成交面积/㎡*/
marketArea: number;
/**[市场化]含其他渠道费用/万元*/
marketChannelAmount: number;
/**[市场化]成交总价/万元*/
marketDealPrice: number;
/**[市场化]对外拆佣/万元*/
marketExternalAmount: number;
/**[市场化]成交套数*/
marketHouseSets: number;
/**[市场化]应收业绩/万元*/
marketReceivable: number;
/**[市场化]实收业绩/万元*/
marketReceived: number;
/**[市场化]公司业绩/万元*/
marketShareAmount: number;
/**[市场化]未收/万元*/
marketUnreceived: number;
/**[自渠]成交面积/㎡*/
naturalArea: number;
/**[自渠]含其他渠道费用/万元*/
naturalChannelAmount: number;
/**[自渠]成交总价/万元*/
naturalDealPrice: number;
/**[自渠]对外拆佣/万元*/
naturalExternalAmount: number;
/**[自渠]成交套数*/
naturalHouseSets: number;
/**[自渠]费率/个月*/
naturalRatio: number;
/**[自渠]应收业绩/万元*/
naturalReceivable: number;
/**[自渠]实收业绩/万元*/
naturalReceived: number;
/**[自渠]未收/万元*/
naturalUnreceived: number;
/**[新房非保利分销成交]考核业绩/万元*/
newNotPolyDistributionAchievement: number;
/**[新房非保利分销成交]成交总价/万元*/
newNotPolyDistributionAmount: number;
/**[新房非保利分销成交]成交面积/㎡*/
newNotPolyDistributionArea: number;
/**[新房非保利分销成交]含其他渠道费用/万元*/
newNotPolyDistributionChannelAmount: number;
/**[新房非保利分销成交]对外拆佣/万元*/
newNotPolyDistributionExternalAmount: number;
/**[非保利分销成交]成交套数*/
newNotPolyDistributionHouseSets: number;
/**[新房非保利分销成交]费率/个月*/
newNotPolyDistributionRatio: number;
/**[新房非保利分销成交]应收业绩/万元*/
newNotPolyDistributionReceivable: number;
/**[新房非保利分销成交]实收业绩/万元*/
newNotPolyDistributionReceived: number;
/**[新房非保利分销成交]未收/万元*/
newNotPolyDistributionUnreceived: number;
/**[新房非保利自行成交]考核业绩/万元*/
newNotPolySelfAchievement: number;
/**[新房非保利自行成交]成交总价/万元*/
newNotPolySelfAmount: number;
/**[新房非保利自行成交]成交面积/㎡*/
newNotPolySelfArea: number;
/**[新房非保利自行成交]含其他渠道费用/万元*/
newNotPolySelfChannelAmount: number;
/**[新房非保利自行成交]对外拆佣/万元*/
newNotPolySelfExternalAmount: number;
/**[新房非保利自行成交]成交套数*/
newNotPolySelfHouseSets: number;
/**[新房非保利自行成交]费率/个月*/
newNotPolySelfRatio: number;
/**[新房非保利自行成交]应收业绩/万元*/
newNotPolySelfReceivable: number;
/**[新房非保利自行成交]实收业绩/万元*/
newNotPolySelfReceived: number;
/**[新房非保利自行成交]未收/万元*/
newNotPolySelfUnreceived: number;
/**[新房非保利自然来访]考核业绩/万元*/
newNotPolyVisitAchievement: number;
/**[新房非保利自然来访]成交总价/万元*/
newNotPolyVisitAmount: number;
/**[新房非保利自然来访]成交面积/㎡*/
newNotPolyVisitArea: number;
/**[新房非保利自然来访]含其他渠道费用/万元*/
newNotPolyVisitChannelAmount: number;
/**[新房非保利自然来访]对外拆佣/万元*/
newNotPolyVisitExternalAmount: number;
/**[新房非保利自然来访]成交套数*/
newNotPolyVisitHouseSets: number;
/**[新房非保利自然来访]费率/个月*/
newNotPolyVisitRatio: number;
/**[新房非保利自然来访]应收业绩/万元*/
newNotPolyVisitReceivable: number;
/**[新房非保利自然来访]实收业绩/万元*/
newNotPolyVisitReceived: number;
/**[新房非保利自然来访]未收/万元*/
newNotPolyVisitUnreceived: number;
/**[新房保利分销成交]成交总价/万元*/
newPolyDistributionAmount: number;
/**[新房保利分销成交]成交面积/㎡*/
newPolyDistributionArea: number;
/**[新房保利分销成交]含其他渠道费用/万元*/
newPolyDistributionChannelAmount: number;
/**[新房保利分销成交]对外拆佣/万元*/
newPolyDistributionExternalAmount: number;
/**[新房保利分销成交]成交套数*/
newPolyDistributionHouseSets: number;
/**[新房保利分销成交]费率/个月*/
newPolyDistributionRatio: number;
/**[新房保利分销成交]应收业绩/万元*/
newPolyDistributionReceivable: number;
/**[新房保利分销成交]实收业绩/万元*/
newPolyDistributionReceived: number;
/**[新房保利分销成交]未收/万元*/
newPolyDistributionUnreceived: number;
/**[新房保利自行成交]考核业绩/万元*/
newPolySelfAchievement: number;
/**[新房保利自行成交]成交总价/万元*/
newPolySelfAmount: number;
/**[新房保利自行成交]成交面积/㎡*/
newPolySelfArea: number;
/**[新房保利自行成交]含其他渠道费用/万元*/
newPolySelfChannelAmount: number;
/**[新房保利自行成交]对外拆佣/万元*/
newPolySelfExternalAmount: number;
/**[新房保利自行成交]成交套数*/
newPolySelfHouseSets: number;
/**[新房保利自行成交]费率/个月*/
newPolySelfRatio: number;
/**[新房保利自行成交]应收业绩/万元*/
newPolySelfReceivable: number;
/**[新房保利自行成交]实收业绩/万元*/
newPolySelfReceived: number;
/**[新房保利自行成交]未收/万元*/
newPolySelfUnreceived: number;
/**[新房保利自然来访]成交总价/万元*/
newPolyVisitAmount: number;
/**[新房保利自然来访]成交面积/㎡*/
newPolyVisitArea: number;
/**[新房保利自然来访]含其他渠道费用/万元*/
newPolyVisitChannelAmount: number;
/**[新房保利自然来访]对外拆佣/万元*/
newPolyVisitExternalAmount: number;
/**[新房保利自然来访]成交套数*/
newPolyVisitHouseSets: number;
/**[新房保利自然来访]费率/个月*/
newPolyVisitRatio: number;
/**[新房保利自然来访]应收业绩/万元*/
newPolyVisitReceivable: number;
/**[新房保利自然来访]实收业绩/万元*/
newPolyVisitReceived: number;
/**[新房保利自然来访]未收/万元*/
newPolyVisitUnreceived: number;
/**[非市场化]成交面积/㎡*/
notMarketArea: number;
/**[非市场化]含其他渠道费用/万元*/
notMarketChannelAmount: number;
/**[非市场化]成交总价/万元*/
notMarketDealPrice: number;
/**[非市场化]对外拆佣/万元*/
notMarketExternalAmount: number;
/**[非市场化]成交套数*/
notMarketHouseSets: number;
/**[非市场化]费率/个月*/
notMarketRatio: number;
/**[非市场化]应收业绩/万元*/
notMarketReceivable: number;
/**[非市场化]实收业绩/万元*/
notMarketReceived: number;
/**[非市场化]未收/万元*/
notMarketUnreceived: number;
/**组织Id*/
orgId: number;
/**组织*/
orgName: string;
/**[租]月租金/万元*/
rentAmount: number;
/**[租]成交面积/㎡*/
rentArea: number;
/**[租]对外拆佣/万元*/
rentExternalAmount: number;
/**[租]成交套数*/
rentHouseSets: number;
/**[租]费率/个月*/
rentRatio: number;
/**[租]应收业绩/万元*/
rentReceivable: number;
/**[租]实收业绩/万元*/
rentReceived: number;
/**[租]未收业绩/万元*/
rentUnreceived: number;
/**序号*/
rowNumber: number;
/**[二手]成交总价/万元*/
saleAmount: number;
/**[二手]成交面积/㎡*/
saleArea: number;
/**[二手]对外拆佣/万元*/
saleExternalAmount: number;
/**[二手]成交套数*/
saleHouseSets: number;
/**[二手]费率/个月*/
saleRatio: number;
/**[二手]应收业绩/万元*/
saleReceivable: number;
/**[二手]实收业绩/万元*/
saleReceived: number;
/**[二手]未收/万元*/
saleUnreceived: number;
}
