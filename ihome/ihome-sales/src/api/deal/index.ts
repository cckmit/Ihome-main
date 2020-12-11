/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-7 10:08:08
//2020-12-11 9:36:08 ├F10: AM┤
import { request } from '@/api/base'
const basePath = "/sales-api/deal"
/**添加业绩比例方案信息*/
export async function post_achieveScaleScheme_add (d?: any) {
  return await request.post< number,number> (basePath+'/achieveScaleScheme/add', d)
}
/**删除业绩比例方案*/
export async function post_achieveScaleScheme_delete__id (d?: any) {
  return await request.post< number,number> (basePath+'/achieveScaleScheme/delete/{id}', d)
}
/**查询分公司业绩比例方案详情*/
export async function get_achieveScaleScheme_get__id (d?: any) {
  return await request.get<AchieveScaleSchemeVO,AchieveScaleSchemeVO>(basePath+'/achieveScaleScheme/get/{id}', { params: d })
}
/**查询分公司业绩比例方案列表*/
export async function post_achieveScaleScheme_getList (d?: any) {
  return await request.post< PageModel<AchieveScaleSchemeListVO>,PageModel<AchieveScaleSchemeListVO>> (basePath+'/achieveScaleScheme/getList', d)
}
/**查询分公司业绩比例方案*/
export async function post_achieveScaleScheme_listSpecial_ (d?: any) {
  return await request.post< PageModel<AchieveScaleSchemeListVO>,PageModel<AchieveScaleSchemeListVO>> (basePath+'/achieveScaleScheme/listSpecial/', d)
}
/**修改业绩比例方案*/
export async function post_achieveScaleScheme_update (d?: any) {
  return await request.post< number,number> (basePath+'/achieveScaleScheme/update', d)
}
/**添加业务模式信息*/
export async function post_businessModel_add (d?: any) {
  return await request.post< number,number> (basePath+'/businessModel/add', d)
}
/**删除业务模式*/
export async function post_businessModel_delete__id (d?: any) {
  return await request.post< number,number> (basePath+'/businessModel/delete/{id}', d)
}
/**查询业务模式详情*/
export async function get_businessModel_get__id (d?: any) {
  return await request.get<BusinessModelVO,BusinessModelVO>(basePath+'/businessModel/get/{id}', { params: d })
}
/**查询所有已配置的业务模式*/
export async function post_businessModel_getAll (d?: any) {
  return await request.post< BusinessModel[],BusinessModel[]> (basePath+'/businessModel/getAll', d)
}
/**根据业务模式名称，获取对应的所有合同类型*/
export async function get_businessModel_getByName__modelName (d?: any) {
  return await request.get<string[],string[]>(basePath+'/businessModel/getByName/{modelName}', { params: d })
}
/**根据业务模式名称，获取对应的已配置的合同类型*/
export async function get_businessModel_getContTypeByName__modelName (d?: any) {
  return await request.get<string[],string[]>(basePath+'/businessModel/getContTypeByName/{modelName}', { params: d })
}
/**查询业务模式列表*/
export async function post_businessModel_getList (d?: any) {
  return await request.post< PageModel<BusinessModelListVO>,PageModel<BusinessModelListVO>> (basePath+'/businessModel/getList', d)
}
/**修改业务模式*/
export async function post_businessModel_update (d?: any) {
  return await request.post< number,number> (basePath+'/businessModel/update', d)
}
/**成交业绩分配录入*/
export async function post_deal_achieveAllotEntry (d?: any) {
  return await request.post< number,number> (basePath+'/deal/achieveAllotEntry', d)
}
/**删除成交报告*/
export async function post_deal_delete__id (d?: any) {
  return await request.post< number,number> (basePath+'/deal/delete/{id}', d)
}
/**案场录入成交基础信息和业绩申报*/
export async function post_deal_entryDealBasicInf (d?: any) {
  return await request.post< number,number> (basePath+'/deal/entryDealBasicInf', d)
}
/**查询成交详情*/
export async function get_deal_get__id (d?: any) {
  return await request.get<DealDetailVO,DealDetailVO>(basePath+'/deal/get/{id}', { params: d })
}
/**根据成交报告编号，查取总应收金额及是否有补充成交报告*/
export async function get_deal_getByCode__code (d?: any) {
  return await request.get<DealReceiveAmountResponseVO,DealReceiveAmountResponseVO>(basePath+'/deal/getByCode/{code}', { params: d })
}
/**查询成交列表*/
export async function post_deal_getList (d?: any) {
  return await request.post< PageModel<DealListVO>,PageModel<DealListVO>> (basePath+'/deal/getList', d)
}
/**文员审核业绩申报*/
export async function post_deal_reviewDealBasicInf (d?: any) {
  return await request.post< number,number> (basePath+'/deal/reviewDealBasicInf', d)
}
/**去修改主成交*/
export async function get_deal_toUpdateMainDeal__id (d?: any) {
  return await request.get<DealDetailVO,DealDetailVO>(basePath+'/deal/toUpdateMainDeal/{id}', { params: d })
}
/**修改成交业绩分配*/
export async function post_deal_updateAchieveAllot (d?: any) {
  return await request.post< number,number> (basePath+'/deal/updateAchieveAllot', d)
}
/**案场修改成交基础信息和业绩申报*/
export async function post_deal_updateDealBasicInf (d?: any) {
  return await request.post< number,number> (basePath+'/deal/updateDealBasicInf', d)
}
/**撤回*/
export async function post_deal_withdrawDeal (d?: any) {
  return await request.post< number,number> (basePath+'/deal/withdrawDeal', d)
}
/**查询成交审核日志*/
export async function post_processRecord_getProcessRecordList (d?: any) {
  return await request.post< PageModel<ProcessRecordVO>,PageModel<ProcessRecordVO>> (basePath+'/processRecord/getProcessRecordList', d)
}
/**审核成交报告*/
export async function post_processRecord_reviewDeal (d?: any) {
  return await request.post< number,number> (basePath+'/processRecord/reviewDeal', d)
}
/**撤回审核*/
export async function post_processRecord_withdrawReview (d?: any) {
  return await request.post< number,number> (basePath+'/processRecord/withdrawReview', d)
}
/**录入业绩信息变更*/
export async function post_suppDeal_entryAchieveInfChange (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/entryAchieveInfChange', d)
}
/**录入基础信息变更*/
export async function post_suppDeal_entryBasicInfChange (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/entryBasicInfChange', d)
}
/**录入退房*/
export async function post_suppDeal_entryRetreatRoom (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/entryRetreatRoom', d)
}
/**录入内部员工业绩变更*/
export async function post_suppDeal_entryStaffAchieveChange (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/entryStaffAchieveChange', d)
}
/**预览录入业绩信息变更*/
export async function post_suppDeal_previewEntryAchieveInfChange (d?: any) {
  return await request.post< PreviewEntryAchieveInfChangeVO,PreviewEntryAchieveInfChangeVO> (basePath+'/suppDeal/previewEntryAchieveInfChange', d)
}
/**预览录入基础信息变更*/
export async function post_suppDeal_previewEntryBasicInfChange (d?: any) {
  return await request.post< PreviewEntryBasicInfChangeVO,PreviewEntryBasicInfChangeVO> (basePath+'/suppDeal/previewEntryBasicInfChange', d)
}
/**预览录入退房*/
export async function post_suppDeal_previewEntryRetreatRoom (d?: any) {
  return await request.post< PreviewEntryRetreatRoomVO,PreviewEntryRetreatRoomVO> (basePath+'/suppDeal/previewEntryRetreatRoom', d)
}
/**预览录入内部员工业绩变更*/
export async function post_suppDeal_previewEntryStaffAchieveChange (d?: any) {
  return await request.post< PreviewEntryStaffAchieveChangeVO,PreviewEntryStaffAchieveChangeVO> (basePath+'/suppDeal/previewEntryStaffAchieveChange', d)
}
/**预览修改业绩信息变更*/
export async function post_suppDeal_previewUpdateAchieveInfChange (d?: any) {
  return await request.post< PreviewUpdateAchieveInfChangeVO,PreviewUpdateAchieveInfChangeVO> (basePath+'/suppDeal/previewUpdateAchieveInfChange', d)
}
/**预览修改基础信息变更*/
export async function post_suppDeal_previewUpdateBasicInfChange (d?: any) {
  return await request.post< PreviewUpdateBasicInfChangeVO,PreviewUpdateBasicInfChangeVO> (basePath+'/suppDeal/previewUpdateBasicInfChange', d)
}
/**预览修改退房*/
export async function post_suppDeal_previewUpdateRetreatRoom (d?: any) {
  return await request.post< PreviewUpdateRetreatRoomVO,PreviewUpdateRetreatRoomVO> (basePath+'/suppDeal/previewUpdateRetreatRoom', d)
}
/**预览修改内部员工业绩变更*/
export async function post_suppDeal_previewUpdateStaffAchieveChange (d?: any) {
  return await request.post< PreviewUpdateStaffAchieveChangeVO,PreviewUpdateStaffAchieveChangeVO> (basePath+'/suppDeal/previewUpdateStaffAchieveChange', d)
}
/**去新增补充成交*/
export async function get_suppDeal_toAddSuppDeal__id (d?: any) {
  return await request.get<DealDetailVO,DealDetailVO>(basePath+'/suppDeal/toAddSuppDeal/{id}', { params: d })
}
/**查询子成交报告列表*/
export async function get_suppDeal_toGetSuppDealList (d?: any) {
  return await request.get<PageModel<DealListVO>,PageModel<DealListVO>>(basePath+'/suppDeal/toGetSuppDealList', { params: d })
}
/**去修改补充成交*/
export async function get_suppDeal_toUpdateSuppDeal__id (d?: any) {
  return await request.get<DealDetailVO,DealDetailVO>(basePath+'/suppDeal/toUpdateSuppDeal/{id}', { params: d })
}
/**修改业绩信息变更*/
export async function post_suppDeal_updateAchieveInfChangeVO (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/updateAchieveInfChangeVO', d)
}
/**修改基础信息变更*/
export async function post_suppDeal_updateBasicInfChange (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/updateBasicInfChange', d)
}
/**修改退房*/
export async function post_suppDeal_updateRetreatRoom (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/updateRetreatRoom', d)
}
/**修改内部员工业绩变更*/
export async function post_suppDeal_updateStaffAchieveChange (d?: any) {
  return await request.post< number,number> (basePath+'/suppDeal/updateStaffAchieveChange', d)
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
/**AchieveAddVO*/
export interface AchieveAddVO {
  /**业绩比例方案ID*/
  achieveSchemeId: number;
  /**归属组织ID*/
  belongOrgId: number;
  /**拆佣金额*/
  commFees: number;
  /**拆佣比例*/
  commFeesRatio: number;
  /**公司业绩*/
  corporateAchieve: number;
  /**成交ID*/
  dealId: number;
  /**应收业绩ID*/
  receiveAchieveId: number;


  /**角色业绩上限*/
  roleAchieveCap: number;
  /**角色业绩比例*/
  roleAchieveRatio: number;
  /**角色类型(Expand-拓盘方、SourcePartner-客源合作人、ChannelPost-渠道岗、CasePost-案场岗、AgentIntegrate-中介整合方、ParkingSalesTeam-车位销售小组、Dealer-成交人、SalesPost-销售代表岗、ClerkPost-文员岗、BranchOffice-分公司)*/
  roleType: string;
  /**角色人ID*/
  rolerId: number;
  /**角色人岗位*/
  rolerPosition: string;
  /**类型(TotalBag-总包、Distri-分销)*/
  type: string;
  /**成交管理者业绩信息*/
  managerAchieveList: ManagerAchieveAddVO[];
}
/**AchieveAllotEntryVO*/
export interface AchieveAllotEntryVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**业绩分配日期(yyyy-MM-dd HH:mm:ss)*/
  allotDate: string;
  /**业绩分配人ID*/
  alloterId: number;
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**成交ID*/
  id: number;
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**AchievePropertyTypeAddVO*/
export interface AchievePropertyTypeAddVO {
  /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
  propertyType: string;
}
/**AchievePropertyTypeVO*/
export interface AchievePropertyTypeVO {
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
  propertyType: string;
  /**业绩比例方案ID*/
  scaleSchemeId: number;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**AchieveScaleConfigAddVO*/
export interface AchieveScaleConfigAddVO {
  /**角色缺失处理方式(Expand-拓盘方、SourcePartner-客源合作人、ChannelPost-渠道岗、CasePost-案场岗、AgentIntegrate-中介整合方、ParkingSalesTeam-车位销售小组、Dealer-成交人、SalesPost-销售代表岗、ClerkPost-文员岗、BranchOffice-分公司)*/
  missingRole: string;
  /**拆分比例 (%)*/
  ratio: number;
  /**备注说明*/
  remarks: string;
  /**角色(Expand-拓盘方、SourcePartner-客源合作人、ChannelPost-渠道岗、CasePost-案场岗、AgentIntegrate-中介整合方、ParkingSalesTeam-车位销售小组、Dealer-成交人、SalesPost-销售代表岗、ClerkPost-文员岗、BranchOffice-分公司)*/
  role: string;
  /**类型(TotalBag-总包、Distri-分销)*/
  type: string;
}
/**AchieveScaleConfigVO*/
export interface AchieveScaleConfigVO {
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**角色缺失处理方式(Expand-拓盘方、SourcePartner-客源合作人、ChannelPost-渠道岗、CasePost-案场岗、AgentIntegrate-中介整合方、ParkingSalesTeam-车位销售小组、Dealer-成交人、SalesPost-销售代表岗、ClerkPost-文员岗、BranchOffice-分公司)*/
  missingRole: string;
  /**拆分比例 (%)*/
  ratio: number;
  /**备注说明*/
  remarks: string;
  /**角色(Expand-拓盘方、SourcePartner-客源合作人、ChannelPost-渠道岗、CasePost-案场岗、AgentIntegrate-中介整合方、ParkingSalesTeam-车位销售小组、Dealer-成交人、SalesPost-销售代表岗、ClerkPost-文员岗、BranchOffice-分公司)*/
  role: string;
  /**业绩比例方案ID*/
  scaleSchemeId: number;
  /**类型(TotalBag-总包、Distri-分销)*/
  type: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**AchieveScaleSchemeAddVO*/
export interface AchieveScaleSchemeAddVO {
  /**分公司ID*/
  branchCompanyId: number;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**分销同步总包(Yes-是、No-否)*/
  isSame: string;
  /**是否特殊方案(Yes-是、No-否)*/
  isSpecial: string;
  /**业务模式ID*/
  modelId: number;
  /**备注说明*/
  remarks: string;
  /**业绩配置物业类型*/
  achievePropertyTypeList: AchievePropertyTypeAddVO[];
  /**业绩比例配置*/
  achieveScaleConfigList: AchieveScaleConfigAddVO[];
}
/**AchieveScaleSchemeListVO*/
export interface AchieveScaleSchemeListVO {
  /**分公司名称*/
  branchCompany: string;
  /**分公司ID*/
  branchCompanyId: number;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**创建用户姓名*/
  createUserName: string;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**分销同步总包(Yes-是、No-否)*/
  isSame: string;
  /**是否特殊方案(Yes-是、No-否)*/
  isSpecial: string;
  /**岗位id*/
  jobId: number;
  /**岗位名称*/
  jobName: string;
  /**业务模式ID*/
  modelId: number;
  /**业务模式名称*/
  modelName: string;
  /**归属组织名称*/
  orgName: string;
  /**备注说明*/
  remarks: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
  /**更新用户姓名*/
  updateUserName: string;
  /**业绩配置物业类型*/
  propertyTypeStr: string;
}
/**AchieveScaleSchemeQueryVO*/
export interface AchieveScaleSchemeQueryVO {
  /**分公司ID*/
  branchCompanyId: number;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**分销同步总包(Yes-是、No-否)*/
  isSame: string;
  /**是否特殊方案(Yes-是、No-否)*/
  isSpecial: string;
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
  /**物业类型*/
  property: string[];
}
/**AchieveScaleSchemeUpdateVO*/
export interface AchieveScaleSchemeUpdateVO {
  /**分公司ID*/
  branchCompanyId: number;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**(必填)id*/
  id: number;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**分销同步总包(Yes-是、No-否)*/
  isSame: string;
  /**是否特殊方案(Yes-是、No-否)*/
  isSpecial: string;
  /**业务模式ID*/
  modelId: number;
  /**备注说明*/
  remarks: string;
  /**业绩配置物业类型*/
  achievePropertyTypeList: AchievePropertyTypeAddVO[];
  /**业绩比例配置*/
  achieveScaleConfigList: AchieveScaleConfigAddVO[];
}
/**AchieveScaleSchemeVO*/
export interface AchieveScaleSchemeVO {
  /**分公司ID*/
  branchCompanyId: number;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**创建用户姓名*/
  createUserName: string;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**分销同步总包(Yes-是、No-否)*/
  isSame: string;
  /**是否特殊方案(Yes-是、No-否)*/
  isSpecial: string;
  /**岗位id*/
  jobId: number;
  /**岗位名称*/
  jobName: string;
  /**业务模式ID*/
  modelId: number;
  /**业务模式名称*/
  modelName: string;
  /**归属组织名称*/
  orgName: string;
  /**备注说明*/
  remarks: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
  /**更新用户姓名*/
  updateUserName: string;
  /**业绩配置物业类型*/
  achievePropertyTypeList: AchievePropertyTypeVO[];
  /**业绩比例配置*/
  achieveScaleConfigList: AchieveScaleConfigVO[];
}










/**AchieveScaleSpecialSchemeVO*/
export interface AchieveScaleSpecialSchemeVO {
  /**分公司ID*/
  branchCompanyId: number;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**分销同步总包(Yes-是、No-否)*/
  isSame: string;
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
}















/**AchieveVO*/
export interface AchieveVO {
  /**业绩比例方案ID*/
  achieveSchemeId: number;
  /**归属组织ID*/
  belongOrgId: number;
  /**角色人归属组织名称*/
  belongOrgName: string;
  /**拆佣金额*/
  commFees: number;
  /**拆佣比例*/
  commFeesRatio: number;
  /**公司业绩*/
  corporateAchieve: number;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**应收业绩ID*/
  receiveAchieveId: number;
  /**角色业绩上限*/
  roleAchieveCap: number;
  /**角色业绩比例*/
  roleAchieveRatio: number;
  /**角色类型(Expand-拓盘方、SourcePartner-客源合作人、ChannelPost-渠道岗、CasePost-案场岗、AgentIntegrate-中介整合方、ParkingSalesTeam-车位销售小组、Dealer-成交人、SalesPost-销售代表岗、ClerkPost-文员岗、BranchOffice-分公司)*/
  roleType: string;
  /**角色人ID*/
  rolerId: number;
  /**角色人名称*/
  rolerName: string;
  /**角色人岗位*/
  rolerPosition: string;
  /**类型(TotalBag-总包、Distri-分销)*/
  type: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
  /**成交管理者业绩信息*/
  managerAchieveList: ManagerAchieveVO[];
}
/**AgencyAddVO*/
export interface AgencyAddVO {
  /**中介公司ID*/
  agencyId: number;
  /**经纪人ID*/
  brokerId: number;
  /**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
  channelLevel: string;
  /**门店ID*/
  storeId: number;
}
/**AgencyUpdateVO*/
export interface AgencyUpdateVO {
  /**中介公司ID*/
  agencyId: number;
  /**经纪人ID*/
  brokerId: number;
  /**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
  channelLevel: string;
  /**成交ID*/
  dealId: number;
  /**ID*/
  id: number;
  /**门店ID*/
  storeId: number;
}
/**AgencyVO*/
export interface AgencyVO {
  /**中介公司ID*/
  agencyId: number;
  /**中介公司名称*/
  agencyName: string;
  /**经纪人*/
  broker: string;
  /**经纪人ID*/
  brokerId: number;
  /**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
  channelLevel: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**门店ID*/
  storeId: number;
  /**门店名称*/
  storeIdName: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**BuModelContTypeAddVO*/
export interface BuModelContTypeAddVO {
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
}
/**BuModelContTypeUpdateVO*/
export interface BuModelContTypeUpdateVO {
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
}
/**BusinessModel*/
export interface BusinessModel {
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**BusinessModelAddVO*/
export interface BusinessModelAddVO {
  /**合同类型*/
  buModelContTypeList: BuModelContTypeAddVO[];
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
}
/**BusinessModelListVO*/
export interface BusinessModelListVO {
  /**合同类型*/
  contType: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**创建用户姓名*/
  createUserName: string;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**岗位id*/
  jobId: number;
  /**岗位名称*/
  jobName: string;
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
  /**归属组织名称*/
  orgName: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
  /**更新用户姓名*/
  updateUserName: string;
}
/**BusinessModelQueryVO*/
export interface BusinessModelQueryVO {
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
}
/**BusinessModelUpdateVO*/
export interface BusinessModelUpdateVO {
  /**合同类型*/
  buModelContTypeList: BuModelContTypeUpdateVO[];
  /**(必填)id*/
  id: number;
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
}
/**BusinessModelVO*/
export interface BusinessModelVO {
  /**合同类型*/
  buModelContTypeList: string[];
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**创建用户姓名*/
  createUserName: string;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**岗位id*/
  jobId: number;
  /**岗位名称*/
  jobName: string;
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
  /**归属组织名称*/
  orgName: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
  /**更新用户姓名*/
  updateUserName: string;
}
/**ChannelCommAddVO*/
export interface ChannelCommAddVO {
  /**拆佣公司ID*/
  agencyId: number;
  /**收款方(渠道公司)*/
  agencyName: string;
  /**拆佣金额*/
  amount: number;
  /**成交ID*/
  dealId: number;
  /**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
  feeType: string;
  /**甲方或客户*/
  partyACustomer: number;
  /**应收ID*/
  receiveAchieveId: number;
  /**备注*/
  remarks: string;
  /**拆佣对象(Personal-个人、Company-公司)*/
  target: string;
}
/**ChannelCommVO*/
export interface ChannelCommVO {
  /**拆佣公司ID*/
  agencyId: number;
  /**收款方(渠道公司)*/
  agencyName: string;
  /**金额*/
  amount: number;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
  feeType: string;
  /**ID*/
  id: number;
  /**已付金额*/
  paidAmount: number;
  /**甲方或客户*/
  partyACustomer: number;
  /**甲方或客户名称*/
  partyACustomerName: string;
  /**应收ID*/
  receiveAchieveId: number;
  /**备注*/
  remarks: string;
  /**拆佣对象(Personal-个人、Company-公司)*/
  target: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**CustomerAddVO*/
export interface CustomerAddVO {
  /**证件编号*/
  cardNo: string;
  /**证件类型(IDCard-居民身份证、certificateOfOfficers-军官证、ChinesePassport-中国护照、foreignPassport-外国护照、HongKongIdentityCard-香港身份证、MainlandTravelPermit-台胞证、ExitPermit-港澳通行证、Businesslicense-营业执照号、Others-其他)*/
  cardType: string;
  /**客户名称*/
  customerName: string;
  /**客户编号*/
  customerNo: string;
  /**联系方式*/
  customerPhone: string;
  /**客户类型(Individual-个人、Company-公司)*/
  customerType: string;
  /**邮箱*/
  email: string;
  /**客户标志(Yes-是、No-否)*/
  isCustomer: string;
}
/**CustomerUpdateVO*/
export interface CustomerUpdateVO {
  /**证件编号*/
  cardNo: string;
  /**证件类型(IDCard-居民身份证、certificateOfOfficers-军官证、ChinesePassport-中国护照、foreignPassport-外国护照、HongKongIdentityCard-香港身份证、MainlandTravelPermit-台胞证、ExitPermit-港澳通行证、Businesslicense-营业执照号、Others-其他)*/
  cardType: string;
  /**客户名称*/
  customerName: string;
  /**客户编号*/
  customerNo: string;
  /**联系方式*/
  customerPhone: string;
  /**客户类型(Individual-个人、Company-公司)*/
  customerType: string;
  /**成交ID*/
  dealId: number;
  /**邮箱*/
  email: string;
  /**ID*/
  id: number;
  /**客户标志(Yes-是、No-否)*/
  isCustomer: string;
}
/**CustomerVO*/
export interface CustomerVO {
  /**证件编号*/
  cardNo: string;
  /**证件类型(IDCard-居民身份证、certificateOfOfficers-军官证、ChinesePassport-中国护照、foreignPassport-外国护照、HongKongIdentityCard-香港身份证、MainlandTravelPermit-台胞证、ExitPermit-港澳通行证、Businesslicense-营业执照号、Others-其他)*/
  cardType: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**客户名称*/
  customerName: string;
  /**客户编号*/
  customerNo: string;
  /**联系方式*/
  customerPhone: string;
  /**客户类型(Individual-个人、Company-公司)*/
  customerType: string;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**邮箱*/
  email: string;
  /**ID*/
  id: number;
  /**客户标志(Yes-是、No-否)*/
  isCustomer: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**DealAddVO*/
export interface DealAddVO {
  /**业务类型(New-新房、Finished-产成品)*/
  businessType: string;
  /**分销协议编号*/
  contNo: string;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**周期ID*/
  cycleId: number;
  /**数据标志(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
  dataSign: string;
  /**成交组织ID*/
  dealOrgId: number;
  /**录入日期(yyyy-MM-dd HH:mm:ss)*/
  entryDate: string;
  /**录入人ID*/
  entryPersonId: number;
  /**是否代销(Yes-是、No-否)*/
  isConsign: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**是否垫佣(Yes-是、No-否)*/
  isMat: string;
  /**业务模式ID*/
  modelId: number;
  /**一手代理团队ID*/
  oneAgentTeamId: number;
  /**主成交ID*/
  parentId: number;
  /**备案情况(Has-有、No-无)*/
  recordState: string;
  /**细分业务模式(All-总包、District-分销)*/
  refineModel: string;
  /**备注*/
  remarks: string;
  /**报备信息ID*/
  reportId: number;
  /**明源房款回笼比例*/
  returnRatio: number;
  /**现场销售*/
  sceneSales: string;
  /**签约日期(yyyy-MM-dd)*/
  signDate: string;
  /**签约价格*/
  signPrice: number;
  /**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
  signType: string;
  /**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
  stage: string;
  /**成交状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**认购日期(yyyy-MM-dd)*/
  subscribeDate: string;
  /**认购价格*/
  subscribePrice: number;
}
/**DealAddVO_1*/
export interface DealAddVO_1 {
  /**业务类型(New-新房、Finished-产成品)*/
  businessType: string;
  /**分销协议编号*/
  contNo: string;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**周期ID*/
  cycleId: number;
  /**数据标志(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
  dataSign: string;
  /**成交组织ID*/
  dealOrgId: number;
  /**录入日期(yyyy-MM-dd HH:mm:ss)*/
  entryDate: string;
  /**录入人ID*/
  entryPersonId: number;
  /**是否代销(Yes-是、No-否)*/
  isConsign: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**是否垫佣(Yes-是、No-否)*/
  isMat: string;
  /**业务模式ID*/
  modelId: number;
  /**一手代理团队ID*/
  oneAgentTeamId: number;
  /**主成交ID*/
  parentId: number;
  /**备案情况(Has-有、No-无)*/
  recordState: string;
  /**细分业务模式(All-总包、District-分销)*/
  refineModel: string;
  /**备注*/
  remarks: string;
  /**报备信息ID*/
  reportId: number;
  /**明源房款回笼比例*/
  returnRatio: number;
  /**现场销售*/
  sceneSales: string;
  /**签约日期(yyyy-MM-dd)*/
  signDate: string;
  /**签约价格*/
  signPrice: number;
  /**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
  signType: string;
  /**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
  stage: string;
  /**成交状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**认购日期(yyyy-MM-dd)*/
  subscribeDate: string;
  /**认购价格*/
  subscribePrice: number;
}
/**DealDetailVO*/
export interface DealDetailVO {
  /**业绩分配日期(yyyy-MM-dd HH:mm:ss)*/
  allotDate: string;
  /**业绩分配人（文员）*/
  alloter: string;
  /**业绩分配人ID*/
  alloterId: number;
  /**业务类型(New-新房、Finished-产成品)*/
  businessType: string;
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**分销协议编号*/
  contNo: string;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**创建用户名*/
  createUserName: string;
  /**周期ID*/
  cycleId: number;
  /**数据标志(明源)(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
  dataSign: string;
  /**成交报告编号*/
  dealCode: string;
  /**成交组织ID*/
  dealOrgId: number;
  /**已删除*/
  deleted: number;
  /**录入日期(yyyy-MM-dd HH:mm:ss)*/
  entryDate: string;
  /**录入人（案场）*/
  entryPerson: string;
  /**录入人ID*/
  entryPersonId: number;
  /**ID*/
  id: number;
  /**是否代销(Yes-是、No-否)*/
  isConsign: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**是否垫佣(Yes-是、No-否)*/
  isMat: string;
  /**业务模式ID*/
  modelId: number;
  /**业务模式名称(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式、Other-其他)*/
  modelName: string;
  /**一手代理团队*/
  oneAgentTeam: string;
  /**一手代理团队ID*/
  oneAgentTeamId: number;
  /**主成交ID*/
  parentId: number;
  /**项目周期名称*/
  projectCycle: string;
  /**备案情况(Has-有、No-无)*/
  recordState: string;
  /**细分业务模式(All-总包、District-分销)*/
  refineModel: string;
  /**备注*/
  remarks: string;
  /**报备信息ID*/
  reportId: number;
  /**明源房款回笼比例(%)*/
  returnRatio: number;
  /**现场销售*/
  sceneSales: string;
  /**签约日期(yyyy-MM-dd)*/
  signDate: string;
  /**签约价格*/
  signPrice: number;
  /**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
  signType: string;
  /**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
  stage: string;
  /**成交状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**认购日期(yyyy-MM-dd)*/
  subscribeDate: string;
  /**认购价格*/
  subscribePrice: number;
  /**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
  suppContType: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
  /**平台费用（成交业绩分配）*/
  achieveList: AchieveVO[];
  /**中介信息*/
  agencyList: AgencyVO[];
  /**对外拆佣信息*/
  channelCommList: ChannelCommVO[];
  /**客户信息*/
  customerList: CustomerVO[];
  /**成交附件信息*/
  documentList: DocumentVO[];
  /**房产信息*/
  house: HouseVO;
  /**优惠告知书*/
  offerNoticeList: OfferNoticeVO[];
  /**成交操作记录信息*/
  processRecordList: ProcessRecordVO[];
  /**应收业绩*/
  receiveAchieveList: ReceiveAchieveVO[];
  /**成交应收信息（收派金额）*/
  receiveList: ReceiveVO[];
}
/**DealListVO*/
export interface DealListVO {
  /**业绩日期(yyyy-MM-dd HH:mm:ss)*/
  achieveConfirmTime: string;
  /**实收金额*/
  actualAmount: number;
  /**房屋地址*/
  address: string;
  /**业绩分配日期(yyyy-MM-dd HH:mm:ss)*/
  allotDate: string;
  /**业绩分配人（文员）*/
  alloter: string;
  /**业绩分配人ID*/
  alloterId: number;
  /**审批时间(yyyy-MM-dd HH:mm:ss)*/
  approveTime: string;
  /**业务类型(New-新房、Finished-产成品)*/
  businessType: string;
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**拆佣总金额*/
  commAmount: number;
  /**分销协议编号*/
  contNo: string;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**周期ID*/
  cycleId: number;
  /**数据标志(明源)(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
  dataSign: string;
  /**成交归属分公司*/
  dealBranchCompany: string;
  /**成交报告编号*/
  dealCode: string;
  /**成交归属组织（末级组织）*/
  dealOrg: string;
  /**成交组织ID*/
  dealOrgId: number;
  /**已删除*/
  deleted: number;
  /**录入日期(yyyy-MM-dd HH:mm:ss)*/
  entryDate: string;
  /**录入人(案场)*/
  entryPerson: string;
  /**录入人ID*/
  entryPersonId: number;
  /**ID*/
  id: number;
  /**是否代销(Yes-是、No-否)*/
  isConsign: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**是否垫佣(Yes-是、No-否)*/
  isMat: string;
  /**业务模式ID*/
  modelId: number;
  /**一手代理团队ID*/
  oneAgentTeamId: number;
  /**已付拆佣金额*/
  paidCommAmount: number;
  /**主成交ID*/
  parentId: number;
  /**应收金额*/
  receiveAmount: number;
  /**备案情况(Has-有、No-无)*/
  recordState: string;
  /**细分业务模式(All-总包、District-分销)*/
  refineModel: string;
  /**备注*/
  remarks: string;
  /**报备信息ID*/
  reportId: number;
  /**明源房款回笼比例(%)*/
  returnRatio: number;
  /**现场销售*/
  sceneSales: string;
  /**签约日期(yyyy-MM-dd)*/
  signDate: string;
  /**签约价格*/
  signPrice: number;
  /**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
  signType: string;
  /**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
  stage: string;
  /**成交状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**认购日期(yyyy-MM-dd)*/
  subscribeDate: string;
  /**认购价格*/
  subscribePrice: number;
  /**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
  suppContType: string;
  /**未付拆佣金额*/
  unpaidCommAmount: number;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**DealQueryVO*/
export interface DealQueryVO {
  /**房屋地址*/
  address: string;
  /**中介公司*/
  agency: number;
  /**开始时间(yyyy-MM-dd)*/
  beginTime: string;
  /**经纪人*/
  broker: number;
  /**栋座ID*/
  buildingId: number;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**客户名称*/
  customerName: string;
  /**客户电话*/
  customerPhone: string;
  /**成交报告编号*/
  dealCode: string;
  /**成交组织ID*/
  dealOrgId: number;
  /**结束时间(yyyy-MM-dd)*/
  endTime: string;
  /**录入人*/
  entryPerson: number;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
  /**项目周期*/
  projectCycle: number;
  /**房号*/
  roomNo: string;
  /**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
  stage: string;
  /**成交状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
  suppContType: string;
  /**查询时间类型(Write-录入日期、Subscribe-认购日期、SignUp-签约日期、AchieveConfirm-业绩日期)*/
  timeType: string;
}
/**DealReceiveAmountResponseVO*/
export interface DealReceiveAmountResponseVO {
  /**是否有补充成交报告*/
  hasSuppDeal: boolean;
  /**总应收金额*/
  totalReceiveAmount: number;
}
/**DealUpdateVO*/
export interface DealUpdateVO {
  /**业务类型(New-新房、Finished-产成品)*/
  businessType: string;
  /**分销协议编号*/
  contNo: string;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**周期ID*/
  cycleId: number;
  /**数据标志(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
  dataSign: string;
  /**成交报告编号*/
  dealCode: string;
  /**成交组织ID*/
  dealOrgId: number;
  /**录入日期(yyyy-MM-dd HH:mm:ss)*/
  entryDate: string;
  /**录入人ID*/
  entryPersonId: number;
  /**ID*/
  id: number;
  /**是否代销(Yes-是、No-否)*/
  isConsign: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**是否垫佣(Yes-是、No-否)*/
  isMat: string;
  /**业务模式ID*/
  modelId: number;
  /**一手代理团队ID*/
  oneAgentTeamId: number;
  /**主成交ID*/
  parentId: number;
  /**备案情况(Has-有、No-无)*/
  recordState: string;
  /**细分业务模式(All-总包、District-分销)*/
  refineModel: string;
  /**备注*/
  remarks: string;
  /**报备信息ID*/
  reportId: number;
  /**明源房款回笼比例*/
  returnRatio: number;
  /**现场销售*/
  sceneSales: string;
  /**签约日期(yyyy-MM-dd)*/
  signDate: string;
  /**签约价格*/
  signPrice: number;
  /**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
  signType: string;
  /**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
  stage: string;
  /**成交状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**认购日期(yyyy-MM-dd)*/
  subscribeDate: string;
  /**认购价格*/
  subscribePrice: number;
}
/**DealUpdateVO_1*/
export interface DealUpdateVO_1 {
  /**业务类型(New-新房、Finished-产成品)*/
  businessType: string;
  /**分销协议编号*/
  contNo: string;
  /**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
  contType: string;
  /**周期ID*/
  cycleId: number;
  /**数据标志(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
  dataSign: string;
  /**成交报告编号*/
  dealCode: string;
  /**成交组织ID*/
  dealOrgId: number;
  /**录入日期(yyyy-MM-dd HH:mm:ss)*/
  entryDate: string;
  /**录入人ID*/
  entryPersonId: number;
  /**ID*/
  id: number;
  /**是否代销(Yes-是、No-否)*/
  isConsign: string;
  /**是否市场化项目(Yes-是、No-否)*/
  isMarketProject: string;
  /**是否垫佣(Yes-是、No-否)*/
  isMat: string;
  /**业务模式ID*/
  modelId: number;
  /**一手代理团队ID*/
  oneAgentTeamId: number;
  /**主成交ID*/
  parentId: number;
  /**备案情况(Has-有、No-无)*/
  recordState: string;
  /**细分业务模式(All-总包、District-分销)*/
  refineModel: string;
  /**备注*/
  remarks: string;
  /**报备信息ID*/
  reportId: number;
  /**明源房款回笼比例*/
  returnRatio: number;
  /**现场销售*/
  sceneSales: string;
  /**签约日期(yyyy-MM-dd)*/
  signDate: string;
  /**签约价格*/
  signPrice: number;
  /**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
  signType: string;
  /**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
  stage: string;
  /**成交状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**认购日期(yyyy-MM-dd)*/
  subscribeDate: string;
  /**认购价格*/
  subscribePrice: number;
}
/**DocumentAddVO*/
export interface DocumentAddVO {
  /**文件ID*/
  fileId: number;
  /**文件类型(VisitConfirForm-来访确认单、DealConfirForm-成交确认单、SignVoucher-签约凭证、OwnerID-业主身份证、SubscribeBook-认购书、Deposit-定金、POSForm-POS单、Other-其他)*/
  fileType: string;
}
/**DocumentUpdateVO*/
export interface DocumentUpdateVO {
  /**成交ID*/
  dealId: number;
  /**文件ID*/
  fileId: number;
  /**文件类型(VisitConfirForm-来访确认单、DealConfirForm-成交确认单、SignVoucher-签约凭证、OwnerID-业主身份证、SubscribeBook-认购书、Deposit-定金、POSForm-POS单、Other-其他)*/
  fileType: string;
  /**ID*/
  id: number;
}
/**DocumentVO*/
export interface DocumentVO {
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**文件ID*/
  fileId: number;
  /**文件名称*/
  fileName: string;
  /**文件类型(VisitConfirForm-来访确认单、DealConfirForm-成交确认单、SignVoucher-签约凭证、OwnerID-业主身份证、SubscribeBook-认购书、Deposit-定金、POSForm-POS单、Other-其他)*/
  fileType: string;
  /**文件地址*/
  fileURL: string;
  /**ID*/
  id: number;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**EntryAchieveInfChangeVO*/
export interface EntryAchieveInfChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**EntryBasicInfChangeVO*/
export interface EntryBasicInfChangeVO {
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
}
/**EntryDealBasicInfVO*/
export interface EntryDealBasicInfVO {
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**EntryRetreatRoomVO*/
export interface EntryRetreatRoomVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**EntryStaffAchieveChangeVO*/
export interface EntryStaffAchieveChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**HouseAddVO*/
export interface HouseAddVO {
  /**房屋地址*/
  address: string;
  /**面积*/
  area: number;
  /**栋座ID*/
  buildingId: number;
  /**厅*/
  hall: number;
  /**厨*/
  kitchen: number;
  /**房产证/预售合同编号*/
  propertyNo: string;
  /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
  propertyType: string;
  /**室*/
  room: number;
  /**房号ID*/
  roomId: number;
  /**房号*/
  roomNo: string;
  /**卫*/
  toilet: number;
}
/**HouseUpdateVO*/
export interface HouseUpdateVO {
  /**房屋地址*/
  address: string;
  /**面积*/
  area: number;
  /**栋座ID*/
  buildingId: number;
  /**成交ID*/
  dealId: number;
  /**厅*/
  hall: number;
  /**ID*/
  id: number;
  /**厨*/
  kitchen: number;
  /**房产证/预售合同编号*/
  propertyNo: string;
  /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
  propertyType: string;
  /**室*/
  room: number;
  /**房号ID*/
  roomId: number;
  /**房号*/
  roomNo: string;
  /**卫*/
  toilet: number;
}
/**HouseVO*/
export interface HouseVO {
  /**房屋地址*/
  address: string;
  /**面积*/
  area: number;
  /**栋座ID*/
  buildingId: number;
  /**栋座名称*/
  buildingName: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**厅*/
  hall: number;
  /**ID*/
  id: number;
  /**厨*/
  kitchen: number;
  /**房产证/预售合同编号*/
  propertyNo: string;
  /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
  propertyType: string;
  /**室*/
  room: number;
  /**房号ID*/
  roomId: number;
  /**房号*/
  roomNo: string;
  /**卫*/
  toilet: number;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**ManagerAchieveAddVO*/
export interface ManagerAchieveAddVO {
  /**业绩金额*/
  achieveFees: number;
  /**业绩ID*/
  achieveId: number;
  /**归属组织ID*/
  belongOrgId: number;
  /**成交ID*/
  dealId: number;
  /**管理者ID*/
  managerId: number;
  /**管理者岗位*/
  managerPosition: string;
  /**业绩比例*/
  ratio: number;
  /**类型(Supervisor-主管、Manager-经理、Director-总监)*/
  type: string;
}
/**ManagerAchieveVO*/
export interface ManagerAchieveVO {
  /**业绩金额*/
  achieveFees: number;
  /**业绩ID*/
  achieveId: number;
  /**归属组织ID*/
  belongOrgId: number;
  /**归属组织名称*/
  belongOrgName: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**undefined*/
  id: number;
  /**管理者名称*/
  manager: string;
  /**管理者ID*/
  managerId: number;
  /**管理者岗位*/
  managerPosition: string;
  /**业绩比例*/
  ratio: number;
  /**类型(Supervisor-主管、Manager-经理、Director-总监)*/
  type: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**OfferNoticeAddVO*/
export interface OfferNoticeAddVO {
  /**告知书ID*/
  offerNoticeId: number;
}
/**OfferNoticeUpdateVO*/
export interface OfferNoticeUpdateVO {
  /**成交ID*/
  dealId: number;
  /**ID*/
  id: number;
  /**告知书ID*/
  offerNoticeId: number;
}
/**OfferNoticeVO*/
export interface OfferNoticeVO {
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**告知书编号*/
  offerNoticeCode: string;
  /**告知书ID*/
  offerNoticeId: number;
  /**告知书名称*/
  offerNoticeName: string;
  /**告知书状态*/
  offerNoticeStatus: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**PreviewEntryAchieveInfChangeVO*/
export interface PreviewEntryAchieveInfChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO_1;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**PreviewEntryAchieveInfChangeVO_1*/
export interface PreviewEntryAchieveInfChangeVO_1 {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**PreviewEntryBasicInfChangeVO*/
export interface PreviewEntryBasicInfChangeVO {
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO_1;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
}
/**PreviewEntryBasicInfChangeVO_1*/
export interface PreviewEntryBasicInfChangeVO_1 {
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
}
/**PreviewEntryRetreatRoomVO*/
export interface PreviewEntryRetreatRoomVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO_1;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**PreviewEntryRetreatRoomVO_1*/
export interface PreviewEntryRetreatRoomVO_1 {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**成交附件信息*/
  documentVO: DocumentAddVO[];
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**PreviewEntryStaffAchieveChangeVO*/
export interface PreviewEntryStaffAchieveChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO_1;
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**PreviewEntryStaffAchieveChangeVO_1*/
export interface PreviewEntryStaffAchieveChangeVO_1 {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyAddVO[];
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerAddVO[];
  /**成交信息*/
  dealVO: DealAddVO;
  /**房产信息*/
  houseVO: HouseAddVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeAddVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveAddVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveAddVO[];
}
/**PreviewUpdateAchieveInfChangeVO*/
export interface PreviewUpdateAchieveInfChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO_1;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**PreviewUpdateAchieveInfChangeVO_1*/
export interface PreviewUpdateAchieveInfChangeVO_1 {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**PreviewUpdateBasicInfChangeVO*/
export interface PreviewUpdateBasicInfChangeVO {
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO_1;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
}
/**PreviewUpdateBasicInfChangeVO_1*/
export interface PreviewUpdateBasicInfChangeVO_1 {
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
}
/**PreviewUpdateRetreatRoomVO*/
export interface PreviewUpdateRetreatRoomVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO_1;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**PreviewUpdateRetreatRoomVO_1*/
export interface PreviewUpdateRetreatRoomVO_1 {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**PreviewUpdateStaffAchieveChangeVO*/
export interface PreviewUpdateStaffAchieveChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO_1;
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**PreviewUpdateStaffAchieveChangeVO_1*/
export interface PreviewUpdateStaffAchieveChangeVO_1 {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**ProcessRecordQueryVO*/
export interface ProcessRecordQueryVO {
  /**成交ID*/
  dealId: number;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
}
/**ProcessRecordVO*/
export interface ProcessRecordVO {
  /**操作后状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  afterStatus: string;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**操作(Submit-提交、WithdrawSubmit-撤回提交、Review-审核、ReviewAchieveDeclare-审核业绩申报、AchieveAllot-业绩分配、Sign-签署、WithdrawReview-撤回审核)*/
  operate: string;
  /**操作时间(yyyy-MM-dd HH:mm:ss)*/
  operateTime: string;
  /**操作人*/
  operaterId: number;
  /**操作人岗位*/
  operaterJob: string;
  /**操作人姓名*/
  operaterName: string;
  /**操作前状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  preStatus: string;
  /**备注*/
  remark: string;
  /**处理结果*/
  result: string;
  /**系统*/
  system: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**ReceiveAchieveAddVO*/
export interface ReceiveAchieveAddVO {
  /**本单业绩*/
  achieveAmount: number;
  /**其他渠道费用*/
  otherChannelFees: number;
  /**本单应收*/
  receiveAmount: number;
}
/**ReceiveAchieveUpdateVO*/
export interface ReceiveAchieveUpdateVO {
  /**本单业绩*/
  achieveAmount: number;
  /**成交ID*/
  dealId: number;
  /**ID*/
  id: number;
  /**其他渠道费用*/
  otherChannelFees: number;
  /**本单应收*/
  receiveAmount: number;
}
/**ReceiveAchieveVO*/
export interface ReceiveAchieveVO {
  /**本单业绩*/
  achieveAmount: number;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**ID*/
  id: number;
  /**其他渠道费用*/
  otherChannelFees: number;
  /**本单应收*/
  receiveAmount: number;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**ReceiveAddVO*/
export interface ReceiveAddVO {
  /**派发佣金金额*/
  commAmount: number;
  /**分销业绩金额*/
  distributionAmount: number;
  /**其他渠道费用*/
  otherChannelFees: number;
  /**收派套餐*/
  packageId: number;
  /**甲方或客户*/
  partyACustomer: number;
  /**应收金额*/
  receiveAmount: number;
  /**派发内场奖励金额*/
  rewardAmount: number;
  /**总包业绩金额*/
  totalPackageAmount: number;
  /**类型(ServiceFee-服务费、AgencyFee-代理费)*/
  type: string;
}
/**ReceiveUpdateVO*/
export interface ReceiveUpdateVO {
  /**派发佣金金额*/
  commAmount: number;
  /**成交ID*/
  dealId: number;
  /**分销业绩金额*/
  distributionAmount: number;
  /**ID*/
  id: number;
  /**其他渠道费用*/
  otherChannelFees: number;
  /**收派套餐*/
  packageId: number;
  /**甲方或客户*/
  partyACustomer: number;
  /**应收业绩主表ID*/
  receiveAchieveId: number;
  /**应收金额*/
  receiveAmount: number;
  /**派发内场奖励金额*/
  rewardAmount: number;
  /**总包业绩金额*/
  totalPackageAmount: number;
  /**类型(ServiceFee-服务费、AgencyFee-代理费)*/
  type: string;
}
/**ReceiveVO*/
export interface ReceiveVO {
  /**业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
  achieveConfirmTime: string;
  /**派发佣金金额*/
  commAmount: number;
  /**创建时间(yyyy-MM-dd HH:mm:ss)*/
  createTime: string;
  /**创建用户*/
  createUser: number;
  /**成交ID*/
  dealId: number;
  /**已删除*/
  deleted: number;
  /**分销业绩金额*/
  distributionAmount: number;
  /**ID*/
  id: number;
  /**其他渠道费用*/
  otherChannelFees: number;
  /**收派套餐*/
  packageId: number;
  /**甲方或客户*/
  partyACustomer: number;
  /**甲方或客户名称*/
  partyACustomerName: string;
  /**应收业绩主表ID*/
  receiveAchieveId: number;
  /**应收金额*/
  receiveAmount: number;
  /**应收已收金额*/
  receivedAmount: number;
  /**派发内场奖励金额*/
  rewardAmount: number;
  /**总包业绩金额*/
  totalPackageAmount: number;
  /**类型(ServiceFee-服务费、AgencyFee-代理费)*/
  type: string;
  /**更新时间(yyyy-MM-dd HH:mm:ss)*/
  updateTime: string;
  /**更新用户*/
  updateUser: number;
}
/**ReviewDealBasicInfVO*/
export interface ReviewDealBasicInfVO {
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**ReviewDealVO*/
export interface ReviewDealVO {
  /**业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
  achieveConfirmTime: string;
  /**操作后状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  afterStatus: string;
  /**成交ID*/
  dealId: number;
  /**操作(Submit-提交、WithdrawSubmit-撤回提交、Review-审核、ReviewAchieveDeclare-审核业绩申报、AchieveAllot-业绩分配、Sign-签署、WithdrawReview-撤回审核)*/
  operate: string;
  /**操作时间(yyyy-MM-dd HH:mm:ss)*/
  operateTime: string;
  /**操作人ID*/
  operaterId: number;
  /**操作人岗位*/
  operaterJob: string;
  /**操作人姓名*/
  operaterName: string;
  /**操作前状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  preStatus: string;
  /**备注*/
  remark: string;
  /**处理结果*/
  result: string;
  /**系统*/
  system: string;
}
/**UpdateAchieveAllotVO*/
export interface UpdateAchieveAllotVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**业绩分配日期(yyyy-MM-dd HH:mm:ss)*/
  allotDate: string;
  /**业绩分配人ID*/
  alloterId: number;
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**成交ID*/
  id: number;
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**UpdateAchieveInfChangeVO*/
export interface UpdateAchieveInfChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**UpdateBasicInfChangeVO*/
export interface UpdateBasicInfChangeVO {
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
}
/**UpdateDealBasicInfVO*/
export interface UpdateDealBasicInfVO {
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**UpdateRetreatRoomVO*/
export interface UpdateRetreatRoomVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**计算方式(Auto-自动、Manual-手动)*/
  calculation: string;
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**成交附件信息*/
  documentVO: DocumentUpdateVO[];
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**UpdateStaffAchieveChangeVO*/
export interface UpdateStaffAchieveChangeVO {
  /**平台费用信息*/
  achieveVO: AchieveAddVO[];
  /**中介信息*/
  agencyVO: AgencyUpdateVO[];
  /**成交对外拆佣信息*/
  channelCommVO: ChannelCommAddVO[];
  /**客户信息*/
  customerVO: CustomerUpdateVO[];
  /**成交信息*/
  dealVO: DealUpdateVO;
  /**房产信息*/
  houseVO: HouseUpdateVO;
  /**优惠告知书*/
  offerNoticeVO: OfferNoticeUpdateVO[];
  /**应收业绩信息*/
  receiveAchieveVO: ReceiveAchieveUpdateVO[];
  /**应收信息（收派金额）*/
  receiveVO: ReceiveUpdateVO[];
}
/**WithdrawDealVO*/
export interface WithdrawDealVO {
  /**成交ID*/
  id: number;
  /**当前用户岗位ID*/
  jobId: number;
  /**成交当前状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**当前用户ID*/
  userId: number;
}
/**WithdrawReviewVO*/
export interface WithdrawReviewVO {
  /**成交ID*/
  id: number;
  /**当前用户岗位ID*/
  jobId: number;
  /**成交当前状态(Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、AchieveDeclareConfirm-业绩申报已确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核、Reject-驳回)*/
  status: string;
  /**当前用户ID*/
  userId: number;
}