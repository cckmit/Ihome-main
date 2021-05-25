/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-4-23 9:57:16
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
return await request.post< any,any> (basePath+'/achieveScaleScheme/getList', d)
}
/**根据比例分配方案Id获取remark*/
export async function get_achieveScaleScheme_getRemark__id (d?: any) {
return await request.get<string,string>(basePath+'/achieveScaleScheme/getRemark/{id}', { params: d })
}
/**查询分公司特殊业绩比例方案*/
export async function post_achieveScaleScheme_listSpecial_ (d?: any) {
return await request.post< any,any> (basePath+'/achieveScaleScheme/listSpecial/', d)
}
/**修改业绩比例方案*/
export async function post_achieveScaleScheme_update (d?: any) {
return await request.post< number,number> (basePath+'/achieveScaleScheme/update', d)
}
/**新增业务模式——合同类型对应关系信息*/
export async function post_buModelContType_add (d?: any) {
return await request.post< number,number> (basePath+'/buModelContType/add', d)
}
/**查询可配置的【业务模式——合同类型】对应关系列表*/
export async function get_buModelContType_chooseAble__modelName (d?: any) {
return await request.get<string[],string[]>(basePath+'/buModelContType/chooseAble/{modelName}', { params: d })
}
/**删除业务模式——合同类型对应关系信息*/
export async function post_buModelContType_delete (d?: any) {
return await request.post< number,number> (basePath+'/buModelContType/delete', d)
}
/**获取业务模式——合同类型对应关系信息*/
export async function post_buModelContType_get (d?: any) {
return await request.post< BuModelContTypeListVO,BuModelContTypeListVO> (basePath+'/buModelContType/get', d)
}
/**查询已配置的【业务模式——合同类型】对应关系列表*/
export async function post_buModelContType_getList (d?: any) {
return await request.post< BuModelContTypeListVO[],BuModelContTypeListVO[]> (basePath+'/buModelContType/getList', d)
}
/**根据业务模式获取可选择的细分业务模式*/
export async function post_buModelContType_subList (d?: any) {
return await request.post< any,any> (basePath+'/buModelContType/subList', d)
}
/**修改业务模式——合同类型对应关系信息*/
export async function post_buModelContType_update (d?: any) {
return await request.post< number,number> (basePath+'/buModelContType/update', d)
}
/**文员岗录入成交基础信息、业绩申报及业绩分配*/
export async function post_deal_achieveAllotEntry (d?: any) {
return await request.post< number,number> (basePath+'/deal/achieveAllotEntry', d)
}
/**成交报告新增附件*/
export async function post_deal_addDocs (d?: any) {
return await request.post< number,number> (basePath+'/deal/addDocs', d)
}
/**根据主成交报告Id，查询是否有未审核完成的【业绩变更】类型补充报告； 返回True：可以发起请佣 ；返回False：不可发起请佣 ；*/
export async function get_deal_canPayoff__id (d?: any) {
return await request.get<boolean,boolean>(basePath+'/deal/canPayoff/{id}', { params: d })
}
/**根据主成交报告编号及渠道商id，查询房产信息、主客户信息及佣金数据；*/
export async function post_deal_dealReportRecord (d?: any) {
return await request.post< DealReportRecordDataResponseVO,DealReportRecordDataResponseVO> (basePath+'/deal/dealReportRecord', d)
}
/**删除成交报告*/
export async function post_deal_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/deal/delete/{id}', d)
}
/**案场录入成交基础信息和业绩申报*/
export async function post_deal_entryDealBasicInf (d?: any) {
return await request.post< number,number> (basePath+'/deal/entryDealBasicInf', d)
}
/**财务实收，关联已审核的成交报告)*/
export async function post_deal_financeUpdateDeal (d?: any) {
return await request.post< boolean,boolean> (basePath+'/deal/financeUpdateDeal', d)
}
/**查询成交详情*/
export async function get_deal_get__id (d?: any) {
return await request.get<DealDetailVO,DealDetailVO>(basePath+'/deal/get/{id}', { params: d })
}
/**用成交报告编号，查询成交详情*/
export async function get_deal_getByCode__dealCode (d?: any) {
return await request.get<DealDetailVO,DealDetailVO>(basePath+'/deal/getByCode/{dealCode}', { params: d })
}
/**优惠告知书，根据成交报告id，查询主成交报告信息*/
export async function get_deal_getByIdForNotice__id (d?: any) {
return await request.get<DealInfoForNotice,DealInfoForNotice>(basePath+'/deal/getByIdForNotice/{id}', { params: d })
}
/**根据主成交报告编号，查取主成交报告信息及对应的成交房产*/
export async function post_deal_getDealAndHouseByCode (d?: any) {
return await request.post< DealHouseResponseVO[],DealHouseResponseVO[]> (basePath+'/deal/getDealAndHouseByCode', d)
}
/**实数成交详情，流水详情*/
export async function get_deal_getDealSumAmount__id (d?: any) {
return await request.get<DealSumAmountVO,DealSumAmountVO>(basePath+'/deal/getDealSumAmount/{id}', { params: d })
}
/**查询前一天中删除的成交报告*/
export async function get_deal_getDeletedIds_ (d?: any) {
return await request.get<number[],number[]>(basePath+'/deal/getDeletedIds/', { params: d })
}
/**查询成交列表*/
export async function post_deal_getList (d?: any) {
return await request.post< any,any> (basePath+'/deal/getList', d)
}
/**根据成交报告编号，查取总应收金额及是否有补充成交报告*/
export async function get_deal_getReceiveAndSuppByCode__code (d?: any) {
return await request.get<DealReceiveAmountResponseVO,DealReceiveAmountResponseVO>(basePath+'/deal/getReceiveAndSuppByCode/{code}', { params: d })
}
/**根据主成交报告Id，查询是否有审核完成的成交报告，有则返回成交报告的业绩确认时间；*/
export async function get_deal_getReviewPassed__id (d?: any) {
return await request.get<any,any>(basePath+'/deal/getReviewPassed/{id}', { params: d })
}
/**根据主成交id，查询主成交及其所有已审核的补充成交合并数据详情*/
export async function get_deal_getSumData__id (d?: any) {
return await request.get<DealDetailVO,DealDetailVO>(basePath+'/deal/getSumData/{id}', { params: d })
}
/**查询实数成交列表*/
export async function post_deal_getSumList (d?: any) {
return await request.post< any,any> (basePath+'/deal/getSumList', d)
}
/**实数成交详情，流水详情*/
export async function get_deal_listByParent__id (d?: any) {
return await request.get<DealListVO[],DealListVO[]>(basePath+'/deal/listByParent/{id}', { params: d })
}
/**结佣，多个成交报告编号，查询对应的事业部id及名称*/
export async function post_deal_listDealDepartment (d?: any) {
return await request.post< DealDepartmentListVO[],DealDepartmentListVO[]> (basePath+'/deal/listDealDepartment', d)
}
/**请佣模块，根据主成交报告id，查详细成交信息及已付应付佣金总额)*/
export async function post_deal_payoffCheckChannelComm (d?: any) {
return await request.post< PayoffCheckChannelCommDetailReturnVO,PayoffCheckChannelCommDetailReturnVO> (basePath+'/deal/payoffCheckChannelComm', d)
}
/**根据主成交报告编号，查询房产信息、主客户信息及佣金数据；*/
export async function get_deal_payoffGetDealInfo__dealCode (d?: any) {
return await request.get<GetDealCustomerAndHouseDataVO,GetDealCustomerAndHouseDataVO>(basePath+'/deal/payoffGetDealInfo/{dealCode}', { params: d })
}
/**根据多个【成交编号，服务费，代理费已结+甲方列表】，更新已结（回滚）；*/
export async function post_deal_rollbackPaidComm (d?: any) {
return await request.post< PayDealAddVO[],PayDealAddVO[]> (basePath+'/deal/rollbackPaidComm', d)
}
/**根据主成交报告编号，返回服务费开票信息；*/
export async function get_deal_serviceFeeInvoice__dealCode (d?: any) {
return await request.get<DealInvoiceVO,DealInvoiceVO>(basePath+'/deal/serviceFeeInvoice/{dealCode}', { params: d })
}
/**批量查询每个甲方的已收请佣已收*/
export async function post_deal_sumApplyReceived (d?: any) {
return await request.post< ProjectSumApply[],ProjectSumApply[]> (basePath+'/deal/sumApplyReceived', d)
}
/**根据成交报告编号、渠道商id，获取主成交+补充成交报告，合计已付及应付佣金*/
export async function post_deal_sumCommBySuppDeal (d?: any) {
return await request.post< PayoffCheckChannelCommReturnVO,PayoffCheckChannelCommReturnVO> (basePath+'/deal/sumCommBySuppDeal', d)
}
/**根据周期id列表，查询所有成交报告的签约价*/
export async function post_deal_sumPriceByTerms (d?: any) {
return await request.post< number,number> (basePath+'/deal/sumPriceByTerms', d)
}
/**根据主成交报告Id，查待付服务费*/
export async function get_deal_unpaidServiceFee__id (d?: any) {
return await request.get<number,number>(basePath+'/deal/unpaidServiceFee/{id}', { params: d })
}
/**文员岗修改/审核成交基础信息、业绩申报，新增业绩分配*/
export async function post_deal_updateAchieveAllot (d?: any) {
return await request.post< number,number> (basePath+'/deal/updateAchieveAllot', d)
}
/**案场修改成交基础信息和业绩申报*/
export async function post_deal_updateDealBasicInf (d?: any) {
return await request.post< number,number> (basePath+'/deal/updateDealBasicInf', d)
}
/**根据多个【成交编号，服务费，代理费已结+甲方列表】，更新已结（回滚）；*/
export async function post_deal_updatePaidComm (d?: any) {
return await request.post< PayDealAddVO[],PayDealAddVO[]> (basePath+'/deal/updatePaidComm', d)
}
/**重新计算平台费用部分*/
export async function post_house_test (d?: any) {
return await request.post< number,number> (basePath+'/house/test', d)
}
/**根据收派套餐，计算收派金额*/
export async function post_pageData_calculateReceiveAmount (d?: any) {
return await request.post< CalculateReceiveReturnVO,CalculateReceiveReturnVO> (basePath+'/pageData/calculateReceiveAmount', d)
}
/**根据收派套餐，计算收派金额*/
export async function post_pageData_calculateReceiveAmounts (d?: any) {
return await request.post< CalculateReceiveReturnVOs,CalculateReceiveReturnVOs> (basePath+'/pageData/calculateReceiveAmounts', d)
}
/**根据项目周期及房号，查询明源数据*/
export async function post_pageData_getMingYuanData (d?: any) {
return await request.post< MingYuanQueryReturnVO,MingYuanQueryReturnVO> (basePath+'/pageData/getMingYuanData', d)
}
/**初始化平台费用部分*/
export async function post_pageData_initAchieve (d?: any) {
return await request.post< AchieveInitDataReturnVO,AchieveInitDataReturnVO> (basePath+'/pageData/initAchieve', d)
}
/**初始化页面，选择周期、房号之后，带出成交基础、房产、渠道、客户、优惠告知书、收派金额、部分附件*/
export async function post_pageData_initBasic (d?: any) {
return await request.post< DealInitPageResponseVO,DealInitPageResponseVO> (basePath+'/pageData/initBasic', d)
}
/**初始化对外拆佣*/
export async function post_pageData_initChannelComm (d?: any) {
return await request.post< ChannelCommInitDataVO[],ChannelCommInitDataVO[]> (basePath+'/pageData/initChannelComm', d)
}
/**选择渠道商后，带出分销协议*/
export async function post_pageData_initDistribution (d?: any) {
return await request.post< DealInitDistributionReturnVO,DealInitDistributionReturnVO> (basePath+'/pageData/initDistribution', d)
}
/**派发套餐明细*/
export async function post_pageData_initSelectablePackage (d?: any) {
return await request.post< any,any> (basePath+'/pageData/initSelectablePackage', d)
}
/**重新计算平台费用部分*/
export async function post_pageData_recalculateAchieve (d?: any) {
return await request.post< AchieveRefreshDataVO,AchieveRefreshDataVO> (basePath+'/pageData/recalculateAchieve', d)
}
/**当总包分销一致时，重新计算平台费用的拆佣金额及拆用比例*/
export async function post_pageData_recalculateAchieveComm (d?: any) {
return await request.post< AchieveRecalculateCommReturnVO,AchieveRecalculateCommReturnVO> (basePath+'/pageData/recalculateAchieveComm', d)
}
/**查询成交审核日志*/
export async function post_processRecord_getProcessRecordList (d?: any) {
return await request.post< any,any> (basePath+'/processRecord/getProcessRecordList', d)
}
/**审核驳回成交报告*/
export async function post_processRecord_rejectDeal (d?: any) {
return await request.post< number,number> (basePath+'/processRecord/rejectDeal', d)
}
/**审核成交报告*/
export async function post_processRecord_reviewDeal (d?: any) {
return await request.post< number,number> (basePath+'/processRecord/reviewDeal', d)
}
/**撤回*/
export async function get_processRecord_withdraw__id (d?: any) {
return await request.get<number,number>(basePath+'/processRecord/withdraw/{id}', { params: d })
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
return await request.post< PreviewEntryStaffAchieveChangeInputVO,PreviewEntryStaffAchieveChangeInputVO> (basePath+'/suppDeal/previewEntryStaffAchieveChange', d)
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
return await request.post< PreviewUpdateStaffAchieveChangeInputShowVO,PreviewUpdateStaffAchieveChangeInputShowVO> (basePath+'/suppDeal/previewUpdateStaffAchieveChange', d)
}
/**定时器*/
export async function get_suppDeal_quartzSupAudit (d?: any) {
return await request.get<any,any>(basePath+'/suppDeal/quartzSupAudit', { params: d })
}
/**定时器测试*/
export async function get_suppDeal_quartzSupAuditWq (d?: any) {
return await request.get<any,any>(basePath+'/suppDeal/quartzSupAuditWq', { params: d })
}
/**去新增补充成交*/
export async function post_suppDeal_toAddSuppDeal (d?: any) {
return await request.post< DealDetailVO,DealDetailVO> (basePath+'/suppDeal/toAddSuppDeal', d)
}
/**去修改补充成交*/
export async function get_suppDeal_toUpdateSuppDeal__id (d?: any) {
return await request.get<DealDetailVO,DealDetailVO>(basePath+'/suppDeal/toUpdateSuppDeal/{id}', { params: d })
}
/**查看补充成交报告 返回所有数据信息*/
export async function get_suppDeal_toauditBasicInfChang (d?: any) {
return await request.get<DealDetailVO,DealDetailVO>(basePath+'/suppDeal/toauditBasicInfChang', { params: d })
}
/**修改业绩信息变更*/
export async function post_suppDeal_updateAchieveInfChangeVO (d?: any) {
return await request.post< number,number> (basePath+'/suppDeal/updateAchieveInfChangeVO', d)
}
/**修改基础信息变更*/
export async function post_suppDeal_updateBasicInfChange (d?: any) {
return await request.post< number,number> (basePath+'/suppDeal/updateBasicInfChange', d)
}
/**修改优惠告知书附件*/
export async function post_suppDeal_updateNoticDocument (d?: any) {
return await request.post< string,string> (basePath+'/suppDeal/updateNoticDocument', d)
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
/**归属组织ID*/
belongOrgId: number;
/**角色人归属组织名称*/
belongOrgName: string;
/**拆佣金额*/
commFees: number;
/**角色业绩*/
corporateAchieve: number;
/**是否主成交*/
isMainDeal: boolean;
/**应收业绩ID*/
receiveAchieveId: number;
/**角色业绩上限*/
roleAchieveCap: number;
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
/**成交管理者业绩信息*/
managerAchieveList: ManagerAchieveAddVO[];
}
/**AchieveAllotEntryVO*/
export interface AchieveAllotEntryVO {
/**平台费用信息*/
achieveVO: AchieveAddVO[];
/**成交基础信息*/
basic: EntryDealBasicInfVO;
/**计算方式(Auto-自动、Manual-手动)*/
calculation: string;
/**成交对外拆佣信息*/
channelCommVO: ChannelCommAddVO[];
}
/**AchieveInitDataReturnVO*/
export interface AchieveInitDataReturnVO {
/**平台费用——分销部分*/
distri: AchieveRefreshDataDetailVO[];
/**平台费用——分销部分——可选角色*/
distriRoles: string[];
/**undefined*/
same: boolean;
/**平台费用——总包部分——可选角色*/
totablBagRoles: string[];
/**平台费用——总包部分*/
totalBag: AchieveRefreshDataDetailVO[];
}
/**AchieveInitDataVO*/
export interface AchieveInitDataVO {
/**分公司Id*/
branchCompanyId: number;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**分销金额*/
distriAmount: number;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyType: string;
/**特殊方案Id*/
specialId: number;
/**总包金额*/
totalBagAmount: number;
}
/**AchievePropertyTypeAddVO*/
export interface AchievePropertyTypeAddVO {
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
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
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyType: string;
/**业绩比例方案ID*/
scaleSchemeId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**AchieveRecalculateCommDetailVO*/
export interface AchieveRecalculateCommDetailVO {
/**拆佣金额*/
commAmount: number;
/**拆佣金额比例*/
commRatio: number;
}
/**AchieveRecalculateCommReturnVO*/
export interface AchieveRecalculateCommReturnVO {
/**分销拆佣金额*/
distriCommAmount: number;
/**分销拆佣*/
distriList: AchieveRecalculateCommDetailVO[];
/**总包拆佣金额*/
totalBagCommAmount: number;
/**总包拆佣*/
totalBagList: AchieveRecalculateCommDetailVO[];
/**总拆佣金额*/
totalCommAmount: number;
}
/**AchieveRecalculateCommVO*/
export interface AchieveRecalculateCommVO {
/**总包拆佣*/
totalBagList: AchieveRecalculateCommDetailVO[];
/**总拆佣金额*/
totalCommAmount: number;
}
/**AchieveRefreshDataDetailVO*/
export interface AchieveRefreshDataDetailVO {
/**角色业绩*/
corporateAchieve: number;
/**undefined*/
correct: boolean;
/**角色业绩上限——出参*/
roleAchieveCap: number;
/**角色业绩比例——出参*/
roleAchieveRatio: number;
/**角色类型(Expand-拓盘方、SourcePartner-客源合作人、ChannelPost-渠道岗、CasePost-案场岗、AgentIntegrate-中介整合方、ParkingSalesTeam-车位销售小组、Dealer-成交人、SalesPost-销售代表岗、ClerkPost-文员岗、BranchOffice-分公司)*/
roleType: string;
/**角色人Id*/
rolerId: number;
/**角色人名字*/
rolerName: string;
}
/**AchieveRefreshDataVO*/
export interface AchieveRefreshDataVO {
/**分公司Id*/
branchCompanyId: number;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**分销总金额*/
distriAmount: number;
/**分销已分配的平台费用*/
distriList: AchieveRefreshDataDetailVO[];
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyType: string;
/**特殊方案Id*/
specialId: number;
/**总包总金额*/
totalBagAmount: number;
/**总包已分配的平台费用*/
totalBagList: AchieveRefreshDataDetailVO[];
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
/**AchieveScaleConfigSnapshot*/
export interface AchieveScaleConfigSnapshot {
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
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
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
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
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
/**AchieveScaleSchemeQueryPageVO*/
export interface AchieveScaleSchemeQueryPageVO {
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
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**物业类型*/
property: string[];
}
/**AchieveScaleSchemeSnapshot*/
export interface AchieveScaleSchemeSnapshot {
/**分公司ID*/
branchCompanyId: number;
/**分公司名称*/
companyName: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**关联成交ID*/
dealId: number;
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
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**备注说明*/
remarks: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
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
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
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
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**已关联的项目*/
projects: TermSpecialVO[];
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
/**分公司ID【启动事业部Id】*/
branchCompanyId: number;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**分销同步总包(Yes-是、No-否)*/
isSame: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**AchieveVO*/
export interface AchieveVO {
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
/**undefined*/
correct: boolean;
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
/**主成交ID*/
parentId: number;
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
/**渠道商类型(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
}
/**AgencyInitPageVO*/
export interface AgencyInitPageVO {
/**中介公司ID*/
agencyId: number;
/**中介公司名称*/
agencyName: string;
/**经纪人ID*/
brokerId: number;
/**经纪人名称*/
brokerName: string;
/**渠道商类型(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
}
/**AgencyUpdateVO*/
export interface AgencyUpdateVO {
/**中介公司ID*/
agencyId: number;
/**经纪人ID*/
brokerId: number;
/**渠道商类型(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**成交ID*/
dealId: number;
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
/**渠道商类型(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**内部公司名称*/
companyName: string;
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
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**AnnexEditVO*/
export interface AnnexEditVO {
/**附件后缀*/
attachmentSuffix: string;
/**id*/
contractId: number;
/**附件编号*/
fileNo: string;
/**附件类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、NoArchiveAnnex-未盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件、Subscription-认购书附件、ChannelContractElectronicAnnex-渠道合同电子版附件、OriginalChannelContractElectronicAnnex-原渠道合同电子版附件)*/
type: string;
}
/**AnnexListVO*/
export interface AnnexListVO {
/**附件后缀*/
attachmentSuffix: string;
/**合同编号*/
contractNo: string;
/**附件ID*/
fileNo: string;
/**附件ID*/
id: number;
/**类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、NoArchiveAnnex-未盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件、Subscription-认购书附件、ChannelContractElectronicAnnex-渠道合同电子版附件、OriginalChannelContractElectronicAnnex-原渠道合同电子版附件)*/
type: string;
}
/**BuModelContTypeAddVO*/
export interface BuModelContTypeAddVO {
/**合同类型*/
contTypeList: string[];
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
}
/**BuModelContTypeListVO*/
export interface BuModelContTypeListVO {
/**合同类型*/
contTypeList: string[];
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
}
/**BuModelContTypeQueryByNameVO*/
export interface BuModelContTypeQueryByNameVO {
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
}
/**BuModelContTypeQueryVO*/
export interface BuModelContTypeQueryVO {
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
}
/**CalculateReceiveReturnVO*/
export interface CalculateReceiveReturnVO {
/**undefined*/
comm: number;
/**undefined*/
distri: number;
/**undefined*/
isData: boolean;
/**undefined*/
other: number;
/**undefined*/
receiveAmount: number;
/**undefined*/
reward: number;
/**undefined*/
totalBag: number;
}
/**CalculateReceiveReturnVOs*/
export interface CalculateReceiveReturnVOs {
/**undefined*/
vos: CalculateReceiveReturnVO[];
}
/**CalculateReceiveVO*/
export interface CalculateReceiveVO {
/**收派套餐明细数据*/
detail: CollectandsendDetailDealVO;
/**签约价*/
signPrice: number;
/**认购价*/
subscribePrice: number;
}
/**CalculateReceiveVOs*/
export interface CalculateReceiveVOs {
/**undefined*/
vos: CalculateReceiveVO[];
}
/**ChannelCommAddVO*/
export interface ChannelCommAddVO {
/**拆佣公司ID*/
agencyId: number;
/**收款方(渠道公司)*/
agencyName: string;
/**拆佣金额*/
amount: number;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**是否主成交*/
isMainDeal: boolean;
/**收派标准*/
packageId: number;
/**甲方或客户*/
partyACustomer: number;
/**甲方或客户名称*/
partyACustomerName: string;
/**备注*/
remarks: string;
/**拆佣对象(Personal-个人、AgentCompany-一手代理公司、ChannelCompany-渠道公司)*/
target: string;
}
/**ChannelCommInitDataVO*/
export interface ChannelCommInitDataVO {
/**拆佣公司ID*/
agencyId: number;
/**收款方(渠道公司)*/
agencyName: string;
/**拆佣金额*/
amount: number;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**是否主成交*/
isMainDeal: boolean;
/**收派标准*/
packageId: number;
/**甲方或客户*/
partyACustomer: number;
/**甲方或客户名称*/
partyACustomerName: string;
/**备注*/
remarks: string;
/**拆佣对象(Personal-个人、AgentCompany-一手代理公司、ChannelCompany-渠道公司)*/
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
/**收派标准ID*/
packageId: number;
/**已付金额*/
paidAmount: number;
/**主成交ID*/
parentId: number;
/**甲方或客户*/
partyACustomer: number;
/**甲方或客户名称*/
partyACustomerName: string;
/**应收ID*/
receiveAchieveId: number;
/**备注*/
remarks: string;
/**拆佣对象(Personal-个人、AgentCompany-一手代理公司、ChannelCompany-渠道公司)*/
target: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**CollectandsendConditionVO*/
export interface CollectandsendConditionVO {
/**条件 (GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compare: string;
/**条件 <> <= >= ==(GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compareB: string;
/**且*/
conditionAnd: number;
/**条件依据  HouseType("户型"),Area("面积"),ContractPrice("签约价格"),SubscriPrice("认购价格");(HouseType-户型、Area-面积、ContractPrice-签约价格、SubscriPrice-认购价格、OtherMsg-其它条件)*/
conditionEnum: string;
/**条件ID*/
conditionId: number;
/**值A*/
conditionNumA: number;
/**值B*/
conditionNumB: number;
/**其它条件信息*/
otherMsg: string;
}
/**CollectandsendDetailDealVO*/
export interface CollectandsendDetailDealVO {
/**基准费用  CONTRACT-按签约价 SUBSCRIPTION-按认购价(Contract-按签约价、Subscription-按认购价)*/
baseCostEnum: string;
/**undefined*/
collectandsendConditionVOS: CollectandsendConditionVO[];
/**条件*/
condition: string;
/**成交客户ID*/
consumerId: number;
/**合同类型  Natural("自然到访"),Distribut("分销成交"),Self("自行成交"),SelfChannel("自渠");(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contractEnum: string;
/**分销业绩金额*/
distributeAchieveAmount: number;
/**分销业绩点数*/
distributeAchievePoint: number;
/**预计成交房款*/
estimateComplateAmount: number;
/**预计成交套数*/
estimateComplateNum: number;
/**预计应收金额*/
estimateReceiveAmount: number;
/**是否免收服务费,0否 1是*/
exVoidService: number;
/**总包业绩金额*/
generalAchieveAmount: number;
/**总包业绩点数*/
generalAchievePoint: number;
/**其他渠道费用金额*/
otherChannelAmount: number;
/**其他渠道费用点数*/
otherChannelPoint: number;
/**收派明细ID*/
packageMxId: number;
/**是否垫佣  Veto("否"),Tree("3个月"),Six("6个月"),Nine("9个月"),MoreTen("10个月以上");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**应收金额*/
receivableAmout: number;
/**应收点数*/
receivablePoint: number;
/**备注*/
remark: string;
/**派发金额*/
sendAmount: number;
/**派发内场金额*/
sendInAmount: number;
/**派发内场点数*/
sendInPoint: number;
/**派发点数*/
sendPoint: number;
/**细分业务(All-总包、District-分销)*/
subdivideEnum: string;
/**周期ID*/
termId: number;
/**客户类型(成交方式) NationalMarket("全民营销"),Natural("自然到访"),Self("自行成交"),SelfChannel("自渠"),Big("一级大行"),Middle("二级中行"),Small("三级小行"),Appoint("指定中介行");(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方、InfieldCompany-内部公司)*/
transactionEnum: string;
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
/**undefined*/
id: string;
/**客户标志(Yes-是、No-否)*/
isCustomer: string;
}
/**CustomerInformation*/
export interface CustomerInformation {
/**(必填)业主证件号码*/
ownerCertificateNo: string;
/**(必填)业主联系电话*/
ownerMobile: string;
/**(必填)业主名字*/
ownerName: string;
/**(必填)签署标示: 默认第一条数据时Yes(Yes-是、No-否)*/
signingStatus: string;
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
/**undefined*/
id: string;
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
/**客户ID*/
customerId: string;
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
/**Deal*/
export interface Deal {
/**业绩分配日期(yyyy-MM-dd HH:mm:ss)*/
allotDate: string;
/**业绩分配人ID*/
alloterId: number;
/**业务类型(New-新房、Finished-产成品)*/
businessType: string;
/**计算方式(Auto-自动、Manual-手动)*/
calculation: string;
/**收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
charge: string;
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
/**成交报告编号*/
dealCode: string;
/**成交组织ID*/
dealOrgId: number;
/**已删除*/
deleted: number;
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**录入人ID*/
entryPersonId: number;
/**一手代理合同编号*/
firstContNo: string;
/**ID*/
id: number;
/**是否代销(Yes-是、No-否)*/
isConsign: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**周期ID*/
mainId: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**一手代理团队ID*/
oneAgentTeamId: number;
/**主成交ID*/
parentId: number;
/**项目id*/
proId: number;
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
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
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
}
/**DealAddDocumentVO*/
export interface DealAddDocumentVO {
/**成交id*/
dealId: number;
/**新增附件*/
documentAddVOS: DocumentAddVO[];
}
/**DealAddInputVO*/
export interface DealAddInputVO {
/**主成交ID*/
parentId: number;
/**现场销售*/
sceneSales: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
stage: string;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
}
/**DealAddSelectVo*/
export interface DealAddSelectVo {
/**成交Id*/
dealId: number;
/**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
}
/**DealAddVO*/
export interface DealAddVO {
/**业务类型(New-新房、Finished-产成品)*/
businessType: string;
/**收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
charge: string;
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
/**一手代理合同编号*/
firstContNo: string;
/**是否代销(Yes-是、No-否)*/
isConsign: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**优惠告知书*/
notices: NoticeCustomerInformationResponse[];
/**一手代理团队ID*/
oneAgentTeamId: number;
/**主成交ID*/
parentId: number;
/**项目ID*/
proId: number;
/**应收服务费*/
receiveServiceFee: number;
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
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**认购价格*/
subscribePrice: number;
}
/**DealApplyDetailsResponse*/
export interface DealApplyDetailsResponse {
/**渠道商Id*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**收款金额*/
applyAmount: number;
/**付款申请单编号*/
applyCode: string;
/**ID*/
applyId: number;
/**收款方类型(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**制单人*/
makerId: number;
/**制单人名字*/
makerName: string;
/**甲方ID*/
partyA: number;
/**甲方名字*/
partyAName: string;
/**付款时间(yyyy-MM-dd)*/
paymentDate: string;
/**付款状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
}
/**DealApplyDetailsResponse_1*/
export interface DealApplyDetailsResponse_1 {
/**已收*/
paidAmount: number;
/**应收*/
payAmount: number;
/**服务费收款信息*/
paymentInfos: DealApplyDetailsResponse[];
/**费用类型 + 甲方名称*/
title: string;
/**未收*/
unpaidAmount: number;
}
/**DealDepartmentListVO*/
export interface DealDepartmentListVO {
/**成交报告编号*/
dealCode: string;
/**事业部id*/
departmentId: number;
/**事业部名称*/
departmentName: string;
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
/**收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
charge: string;
/**undefined*/
configs: AchieveScaleConfigSnapshot[];
/**分销协议Id*/
contId: number;
/**分销协议编号*/
contNo: string;
/**合同名称*/
contTitle: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**分销协议合同类型(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非标渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户名*/
createUserName: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**数据标志(明源)(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
dataSign: string;
/**成交报告编号*/
dealCode: string;
/**成交归属组织（末级组织）*/
dealOrg: string;
/**成交组织ID*/
dealOrgId: number;
/**已删除*/
deleted: number;
/**补充成交新增附件*/
documentShowList: DocumentVO[];
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**录入人（案场）*/
entryPerson: string;
/**录入人ID*/
entryPersonId: number;
/**一手代理合同Id*/
firstContId: number;
/**一手代理合同编号*/
firstContNo: string;
/**一手代理合同名称*/
firstContTitle: string;
/**一手代理合同类型(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非标渠道分销合同、NoChannel-非渠道类合同)*/
firstContractKind: string;
/**ID*/
id: number;
/**是否代销(Yes-是、No-否)*/
isConsign: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**周期ID*/
mainId: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**优惠告知书，只要主成交报告未审核时，才会后台查询赋值*/
notice: NoticeCustomerInformationResponse[];
/**一手代理团队*/
oneAgentTeam: string;
/**一手代理团队ID*/
oneAgentTeamId: number;
/**主成交ID*/
parentId: number;
/**项目id*/
proId: number;
/**项目名称*/
projectCycle: string;
/**项目Id*/
projectId: number;
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
/**undefined*/
scheme: AchieveScaleSchemeSnapshot;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
stage: string;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
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
/**主成交附件信息*/
documentList: DocumentVO[];
/**房产信息*/
house: HouseVO;
/**成交操作记录信息*/
processRecordList: ProcessRecordVO[];
/**应收业绩*/
receiveAchieveList: ReceiveAchieveVO[];
/**成交应收信息（收派金额）*/
receiveList: ReceiveVO[];
}
/**DealHouseRequestVO*/
export interface DealHouseRequestVO {
/**主成家报告*/
codes: string[];
}
/**DealHouseResponseVO*/
export interface DealHouseResponseVO {
/**渠道商ID*/
channelId: number;
/**主成家报告*/
deal: Deal;
/**成交房产*/
house: House;
}
/**DealInfoForNotice*/
export interface DealInfoForNotice {
/**undefined*/
deal: Deal;
}
/**DealInitDistributionReturnVO*/
export interface DealInitDistributionReturnVO {
/**分销协议——是否垫佣——收派套餐*/
contracts: DealInitPageDistributionVO[];
}
/**DealInitDistributionVO*/
export interface DealInitDistributionVO {
/**渠道商id*/
channelId: number;
/**周期id*/
cycleId: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
property: string;
}
/**DealInitPageDistributionVO*/
export interface DealInitPageDistributionVO {
/**垫佣情况：Yes 垫佣，No 未垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
advancementSituation: string;
/**渠道合同编号*/
contractNo: string;
/**渠道合同标题*/
contractTitle: string;
/**收派套餐标准id*/
packageMxIds: number[];
/**undefined*/
voidService: boolean;
}
/**DealInitPageRequestVO*/
export interface DealInitPageRequestVO {
/**周期id*/
cycleId: number;
/**主成交ID*/
parentId: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
property: string;
/**细分业务模式(All-总包、District-分销)*/
refineModel: string;
/**房间id*/
roomId: number;
}
/**DealInitPageResponseVO*/
export interface DealInitPageResponseVO {
/**渠道商*/
agencyVOs: AgencyInitPageVO[];
/**房产补充数据——栋座ID*/
buildingId: number;
/**房产补充数据——栋数名称*/
buildingName: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**分销协议（编号、是否垫佣、收派标准id）*/
contracts: DealInitPageDistributionVO[];
/**显示的客户列表*/
customerAddVOS: CustomerAddVO[];
/**明源客户与优惠告知书客户有差异*/
customerIsDifferent: boolean;
/**同房号是否存在多份优惠告知书(NoneNotice-没有优惠告知书、OneNotice-一份优惠告知书、MultipleNotice-多份优惠告知书)*/
dealNoticeStatus: string;
/**附件*/
docs: DocumentAddVO[];
/**错误信息*/
errorMsgs: string[];
/**是否有成交报备*/
hasRecord: boolean;
/**明源返回数据*/
myReturnVO: MingYuanQueryReturnVO;
/**优惠告知书*/
notice: NoticeCustomerInformationResponse[];
/**收派金额*/
receiveVOS: ReceiveVO[];
/**报备ID*/
recordId: number;
/**报备信息*/
recordStr: string;
/**房产补充数据——房号ID*/
roomId: number;
/**房产补充数据——房号*/
roomNo: string;
}
/**DealInvoiceVO*/
export interface DealInvoiceVO {
/**地址*/
address: string;
/**栋座*/
buildingName: string;
/**成交报告编号*/
dealCode: string;
/**事业部名称*/
departmentName: string;
/**邮箱*/
email: string;
/**电话*/
phone: string;
/**项目名*/
proName: string;
/**房号*/
roomNo: string;
}
/**DealListVO*/
export interface DealListVO {
/**本单业绩*/
achieveAmount: number;
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
/**审批时间*/
approveTime: string;
/**渠道商经纪人Id*/
brokerId: number;
/**渠道商经纪人*/
brokerName: string;
/**栋座名称*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**业务类型(New-新房、Finished-产成品)*/
businessType: string;
/**计算方式(Auto-自动、Manual-手动)*/
calculation: string;
/**可付拆佣金额*/
canPaidCommAmount: number;
/**渠道商Id*/
channelId: number;
/**渠道商*/
channelName: string;
/**收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
charge: string;
/**应付拆佣总金额*/
commAmount: number;
/**渠道商类型(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**内部公司名称*/
companyName: string;
/**分销协议编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customerName: string;
/**电话*/
customerPhone: string;
/**周期ID*/
cycleId: number;
/**数据标志(明源)(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
dataSign: string;
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
/**一手代理合同编号*/
firstContNo: string;
/**ID*/
id: number;
/**是否代销(Yes-是、No-否)*/
isConsign: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**周期ID*/
mainId: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**是否禁止添加补充成交*/
noApplySupp: boolean;
/**一手代理团队ID*/
oneAgentTeamId: number;
/**已付拆佣总金额*/
paidCommAmount: number;
/**主成交ID*/
parentId: number;
/**项目id*/
proId: number;
/**项目名称*/
projectName: string;
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
/**房号*/
roomNo: string;
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
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**认购价格*/
subscribePrice: number;
/**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**周期名称*/
termName: string;
/**未付拆佣金额*/
unpaidCommAmount: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DealMainListVO*/
export interface DealMainListVO {
/**中介公司ID*/
agencyId: number;
/**经纪人ID*/
brokerId: number;
/**渠道商经纪人*/
brokerName: string;
/**栋座ID*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**渠道商*/
channelName: string;
/**应付拆佣总金额*/
commAmount: number;
/**内部公司名称*/
companyName: string;
/**成交确认ID*/
confirmDealId: number;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户名称*/
customerName: string;
/**联系方式*/
customerPhone: string;
/**周期ID*/
cycleId: number;
/**成交报告编号*/
dealCode: string;
/**成交组织ID*/
dealOrgId: number;
/**已删除*/
deleted: number;
/**本单派发佣金*/
dispenseAmount: number;
/**本单已派发佣金*/
dispensedAmount: number;
/**分销业绩总额*/
distributeAmount: number;
/**ID*/
id: number;
/**本单已收*/
paidAmount: number;
/**已付拆佣总金额*/
paidCommAmount: number;
/**项目Id*/
proId: number;
/**本单应收*/
receiveAmount: number;
/**备案情况(Has-有、No-无)*/
recordState: string;
/**报备信息ID*/
reportId: number;
/**本单派发内场奖励*/
rewardAmount: number;
/**本单已派发内场奖励*/
rewardedAmount: number;
/**房号ID*/
roomId: number;
/**房号*/
roomNo: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
stage: string;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**周期名称*/
termName: string;
/**总包业绩总额*/
totalPackageAmount: number;
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
agencyId: number;
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**经纪人*/
brokerId: number;
/**栋座ID*/
buildingId: number;
/**渠道公司类型(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**客户名称*/
customerName: string;
/**客户电话*/
customerPhone: string;
/**成交报告编号*/
dealCode: string;
/**成交报告编号或客户姓名*/
dealCodeOrCusName: string;
/**成交组织ID*/
dealOrgId: number;
/**结束时间(yyyy-MM-dd)*/
endTime: string;
/**录入人*/
entryPerson: number;
/**小程序端分页，是否已确认，false为草稿及驳回，true为已确认（包括从平台文员待审核 至 已审核）*/
isConfirmed: boolean;
/**是否主成交报告*/
isMainDealOnly: boolean;
/**是否移动端分页列表*/
isMobileTermination: boolean;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**成交报告客户电话或客户姓名*/
phoneOrCusName: string;
/**项目id*/
proId: number;
/**周期id*/
projectCycle: number;
/**房号*/
roomNo: string;
/**房间ID*/
roomNumberId: number;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
stage: string;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**查询时间类型(Write-录入日期、Subscribe-认购日期、SignUp-签约日期、AchieveConfirm-业绩日期、AchieveAllot-业绩分配日期)*/
timeType: string;
}
/**DealReceiveAmountResponseVO*/
export interface DealReceiveAmountResponseVO {
/**是否有补充成交报告*/
hasSuppDeal: boolean;
/**总应收金额*/
totalReceiveAmount: number;
}
/**DealReportRecordDataRequestVO*/
export interface DealReportRecordDataRequestVO {
/**成交编号*/
dealCode: string;
}
/**DealReportRecordDataResponseVO*/
export interface DealReportRecordDataResponseVO {
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
/**可结佣金（代理费）*/
channelAgentComm: number;
/**总应结佣金*/
channelComm: number;
/**可结佣金（服务费）*/
channelServiceComm: number;
/**收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
charge: string;
/**undefined*/
configs: AchieveScaleConfigSnapshot[];
/**分销协议Id*/
contId: number;
/**分销协议编号*/
contNo: string;
/**合同名称*/
contTitle: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**分销协议合同类型(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非标渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户名*/
createUserName: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**数据标志(明源)(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
dataSign: string;
/**成交报告编号*/
dealCode: string;
/**成交归属组织（末级组织）*/
dealOrg: string;
/**成交组织ID*/
dealOrgId: number;
/**已删除*/
deleted: number;
/**补充成交新增附件*/
documentShowList: DocumentVO[];
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**录入人（案场）*/
entryPerson: string;
/**录入人ID*/
entryPersonId: number;
/**一手代理合同Id*/
firstContId: number;
/**一手代理合同编号*/
firstContNo: string;
/**一手代理合同名称*/
firstContTitle: string;
/**一手代理合同类型(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非标渠道分销合同、NoChannel-非渠道类合同)*/
firstContractKind: string;
/**ID*/
id: number;
/**是否代销(Yes-是、No-否)*/
isConsign: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**周期ID*/
mainId: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**优惠告知书，只要主成交报告未审核时，才会后台查询赋值*/
notice: NoticeCustomerInformationResponse[];
/**一手代理团队*/
oneAgentTeam: string;
/**一手代理团队ID*/
oneAgentTeamId: number;
/**已结佣金（代理费）*/
paidChannelAgentComm: number;
/**已结佣金（服务费）*/
paidChannelServiceComm: number;
/**主成交ID*/
parentId: number;
/**项目id*/
proId: number;
/**项目名称*/
projectCycle: string;
/**项目Id*/
projectId: number;
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
/**undefined*/
scheme: AchieveScaleSchemeSnapshot;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
stage: string;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**认购价格*/
subscribePrice: number;
/**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**未结佣金（代理费）*/
unpaidChannelAgentComm: number;
/**未结佣金（服务费）*/
unpaidChannelServiceComm: number;
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
/**主成交附件信息*/
documentList: DocumentVO[];
/**房产信息*/
house: HouseVO;
/**成交操作记录信息*/
processRecordList: ProcessRecordVO[];
/**应收业绩*/
receiveAchieveList: ReceiveAchieveVO[];
/**成交应收信息（收派金额）*/
receiveList: ReceiveVO[];
}
/**DealSumAmountVO*/
export interface DealSumAmountVO {
/**代理费收款信息*/
agentPaymentInfos: PaymentDealVO_1[];
/**代理费付款明细*/
agentPays: DealApplyDetailsResponse_1[];
/**开票信息*/
invoiceInfos: Invoice[];
/**应收业绩信息*/
receiveAchieve: ReceiveAchieveSumDataVO;
/**退款信息*/
refundItemInfos: RefundItem[];
/**服务费收款信息*/
servicePaymentInfos: PaymentDealVO_1;
/**服务费付款明细*/
servicePays: DealApplyDetailsResponse_1;
}
/**DealSumSignPriceVO*/
export interface DealSumSignPriceVO {
/**undefined*/
termIds: number[];
}
/**DealUpdateInputVO*/
export interface DealUpdateInputVO {
/**成交报告编号*/
dealCode: string;
/**ID*/
id: number;
/**主成交ID*/
parentId: number;
/**现场销售*/
sceneSales: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
stage: string;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
}
/**DealUpdateVO*/
export interface DealUpdateVO {
/**业务类型(New-新房、Finished-产成品)*/
businessType: string;
/**收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
charge: string;
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
/**一手代理合同编号*/
firstContNo: string;
/**ID*/
id: number;
/**是否代销(Yes-是、No-否)*/
isConsign: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**优惠告知书*/
notices: NoticeCustomerInformationResponse[];
/**一手代理团队ID*/
oneAgentTeamId: number;
/**主成交ID*/
parentId: number;
/**项目ID*/
proId: number;
/**应收服务费*/
receiveServiceFee: number;
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
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**认购价格*/
subscribePrice: number;
}
/**Document*/
export interface Document {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**文件名*/
fileName: string;
/**文件类型(VisitConfirForm-来访确认单、DealConfirForm-成交确认单、Notice-优惠告知书、OwnerID-业主身份证、SubscribeBook-认购书、SignVoucher-签约凭证、POSForm-POS单、Deposit-定金、ContractInfo-合同信息、Other-其他)*/
fileType: string;
/**ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DocumentAddVO*/
export interface DocumentAddVO {
/**文件ID*/
fileId: string;
/**文件名称*/
fileName: string;
/**文件类型(VisitConfirForm-来访确认单、DealConfirForm-成交确认单、Notice-优惠告知书、OwnerID-业主身份证、SubscribeBook-认购书、SignVoucher-签约凭证、POSForm-POS单、Deposit-定金、ContractInfo-合同信息、Other-其他)*/
fileType: string;
}
/**DocumentUpdateVO*/
export interface DocumentUpdateVO {
/**文件ID*/
fileId: string;
/**文件名称*/
fileName: string;
/**文件类型(VisitConfirForm-来访确认单、DealConfirForm-成交确认单、Notice-优惠告知书、OwnerID-业主身份证、SubscribeBook-认购书、SignVoucher-签约凭证、POSForm-POS单、Deposit-定金、ContractInfo-合同信息、Other-其他)*/
fileType: string;
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
fileId: string;
/**文件名*/
fileName: string;
/**文件类型(VisitConfirForm-来访确认单、DealConfirForm-成交确认单、Notice-优惠告知书、OwnerID-业主身份证、SubscribeBook-认购书、SignVoucher-签约凭证、POSForm-POS单、Deposit-定金、ContractInfo-合同信息、Other-其他)*/
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
/**undefined*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveAddVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveAddVO[];
/**退款金额*/
refundAmount: number;
}
/**EntryBasicInfChangeVO*/
export interface EntryBasicInfChangeVO {
/**中介信息*/
agencyVO: AgencyAddVO[];
/**客户信息*/
customerVO: CustomerAddVO[];
/**成交信息*/
dealAddInputVO: DealAddInputVO;
/**成交附件信息*/
documentVO: DocumentAddVO[];
/**房产信息*/
houseAddInputVO: HouseAddInputVO;
/**优惠告知书信息*/
noticeDealList: NoticeDealCreate[];
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
/**undefined*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveAddVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveAddVO[];
/**退款金额*/
refundAmount: number;
}
/**FinanceConnectDealVO*/
export interface FinanceConnectDealVO {
/**主成交ID*/
dealId: number;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**甲方ID*/
partyAId: number;
/**最终总实收金额——总已收减去总已退款（待退款不计入其中）*/
receivedAmount: number;
/**待退款金额*/
waitRefundAmount: number;
}
/**GetDealCustomerAndHouseDataVO*/
export interface GetDealCustomerAndHouseDataVO {
/**房号*/
buildingNo: string;
/**可结佣金（佣金总额）*/
channelComm: number;
/**客户名称*/
customerName: string;
/**联系方式*/
customerPhone: string;
/**已结佣金*/
paidChannelComm: number;
/**楼盘名称*/
proName: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyType: string;
/**房号*/
roomNo: string;
/**未结佣金*/
unpaidChannelComm: number;
}
/**House*/
export interface House {
/**房屋地址*/
address: string;
/**面积*/
area: number;
/**栋座ID*/
buildingId: number;
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
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
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
/**HouseAddInputVO*/
export interface HouseAddInputVO {
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
/**室*/
room: number;
/**房号ID*/
roomId: number;
/**房号*/
roomNo: string;
/**卫*/
toilet: number;
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
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
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
/**HouseUpdateInputVO*/
export interface HouseUpdateInputVO {
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
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
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
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
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
/**InitChannelCommVO*/
export interface InitChannelCommVO {
/**undefined*/
channelId: number;
/**undefined*/
channelName: string;
/**undefined*/
firstAgencyCompanyId: number;
/**undefined*/
firstAgencyCompanyName: string;
/**收派金额*/
receives: ReceiveInitChannelCommVO[];
}
/**Invoice*/
export interface Invoice {
/**金额（含税）*/
amount: number;
/**业务ID*/
businessId: number;
/**业务单号*/
businessNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**事业部ID*/
departmentId: number;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**ID*/
id: number;
/**发票抬头*/
invoiceTitle: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
invoiceType: string;
/**NC凭证号*/
ncCode: string;
/**确认主营（不含税）*/
noTax: number;
/**开票日期(yyyy-MM-dd)*/
operationDate: string;
/**开票类型(Hand-手工开票、Auto-自动开票)*/
operationType: string;
/**开票人*/
operationUser: number;
/**收款方*/
payee: string;
/**收款方账号*/
payeeAccountNo: string;
/**备注*/
remark: string;
/**状态(Done-已开票、NotDone-未开票、Invalid-废弃)*/
status: string;
/**税额*/
tax: number;
/**税率*/
taxRate: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ManagerAchieveAddVO*/
export interface ManagerAchieveAddVO {
/**业绩金额*/
achieveFees: number;
/**归属组织ID*/
belongOrgId: number;
/**归属组织名称*/
belongOrgName: string;
/**是否主成交*/
isMainDeal: boolean;
/**管理者名称*/
manager: string;
/**管理者ID*/
managerId: number;
/**管理者岗位*/
managerPosition: string;
/**类型——默认【主管】(Supervisor-主管、Manager-经理、Director-总监)*/
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
/**主成交ID*/
parentId: number;
/**业绩比例*/
ratio: number;
/**类型(Supervisor-主管、Manager-经理、Director-总监)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**MingYuanCustomerVO*/
export interface MingYuanCustomerVO {
/**(必填)证件编号*/
cardNo: string;
/**(必填)客户名称*/
customerName: string;
/**联系方式*/
customerPhone: string;
}
/**MingYuanDealVO*/
export interface MingYuanDealVO {
/**成交阶段类型(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**备案情况(Has-有、No-无)*/
recordState: string;
/**明源房款回笼比例(%)*/
returnRatio: number;
/**置业顾问*/
sceneSales: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**认购价格*/
subscribePrice: number;
}
/**MingYuanHouseVO*/
export interface MingYuanHouseVO {
/**建筑面积*/
area: number;
/**厅*/
hall: number;
/**预售合同编号*/
propertyNo: string;
/**室*/
room: number;
/**卫*/
toilet: number;
}
/**MingYuanQueryReturnVO*/
export interface MingYuanQueryReturnVO {
/**明源返回客户数据，初始化页面时，如果没有明源数据，则返回优惠告知书客户*/
customerVOS: MingYuanCustomerVO[];
/**数据标志(明源)(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
dataSign: string;
/**明源返回成交数据*/
dealVO: MingYuanDealVO;
/**明源返回房产数据，初始化页面时，如果明源没有数据，则此对象为空*/
houseVO: MingYuanHouseVO;
}
/**NoticeCustomerInformationResponse*/
export interface NoticeCustomerInformationResponse {
/**客户信息*/
customerInformationList: CustomerInformation[];
/**成交ID*/
dealId: number;
/**告知书附件*/
noticeAttachmentList: AnnexListVO[];
/**告知书ID*/
noticeId: number;
/**告知书编号*/
noticeNo: string;
/**告知书状态(WaitDetermine-信息待确认、WaitBeSigned-客户待签署、WaitPay-客户待支付、Paid-客户已支付、BecomeEffective-已生效、Invalidation-失效)*/
notificationStatus: string;
/**告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确认书、RefundApplication-退款申请书)*/
notificationType: string;
/**客户类型(Personal-个人、Enterprise-企业)*/
ownerType: string;
/**预览编号*/
paymentAmount: number;
/**优惠方式(Manual-自定义、Automatic-选择)*/
promotionMethod: string;
/**预览编号*/
templateId: string;
/**模版类型：PaperTemplate("纸质模板"), ElectronicTemplate("电子模版") (PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
}
/**NoticeDealCreate*/
export interface NoticeDealCreate {
/**退款申请书银行账户*/
account: string;
/**退款申请书开户人名字*/
accountHolderName: string;
/**附件列表*/
annexList: AnnexEditVO[];
/**退款申请书银行名字*/
bankName: string;
/**退款申请书支行名称*/
branchName: string;
/**退款申请书市名字*/
cityName: string;
/**认购描述 1 = 显示 2 = 隐藏*/
exPreferentialItem: number;
/**优惠方式说明*/
explain: string;
/**(必填)告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确认书、RefundApplication-退款申请书)*/
notificationType: string;
/**优惠金额*/
paymentAmount: number;
/**(必填)优惠选择方式  自定义：Manual  选择： Automatic (Manual-自定义、Automatic-选择)*/
promotionMethod: string;
/**退款申请书省名字*/
provinceName: string;
/**原因： 终止协议必填(DiscountChange-换房涉及优惠折扣变更、Rename-更名、InformationError-原购房优惠告知书信息填写错误、checkOut-退房、ServiceFeeReduction-服务费减免、other-其他)*/
reason: string;
/**原因描述：终止协议必填*/
reasonDescription: string;
/**(必填)模版类型(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
}
/**PackageMXInitRequestVO*/
export interface PackageMXInitRequestVO {
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**分销协议带出的收派标准Id，分销成交时不能为空*/
distributionIds: number[];
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方ID，非分销成交时不能为空*/
partyACustomerId: number;
/**物业类型，非分销成交时不能为空(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
property: string;
/**细分业务模式，非分销成交时不能为空(All-总包、District-分销)*/
subdivide: string;
/**周期ID，非分销成交时不能为空*/
termId: number;
}
/**PayDealAddVO*/
export interface PayDealAddVO {
/**(必填)地址*/
address: string;
/**(必填)代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**(必填)代理费拆佣*/
ageCommFees: number;
/**(必填)代理费应收*/
ageReceiveFees: number;
/**(必填)代理费已结佣*/
ageSettledCommFees: number;
/**(必填)代理费未收*/
ageUnpaidFees: number;
/**(必填)代理费未结佣*/
ageUnsetCommFees: number;
/**(必填)渠道商ID*/
agencyId: number;
/**(必填)渠道商名称*/
agencyName: string;
/**(必填)业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**代理费信息*/
commFeesList: PayDealCommCreateRequest[];
/**(必填)分销协议编号*/
contNo: string;
/**(必填)合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**(必填)客户*/
customer: string;
/**(必填)周期ID*/
cycleId: number;
/**(必填)周期名称*/
cycleName: string;
/**(必填)成交报告编号*/
dealCode: string;
/**(必填)成交ID*/
dealId: number;
/**成交信息*/
dealInfoResults: DealHouseResponseVO[];
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**(必填)录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**(必填)是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**结算状态(AlreadyNotSettlement-已结算、NotSettlement-未结算)*/
payDealStatus: string;
/**(必填)服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**(必填)服务费拆佣*/
serCommFees: number;
/**(必填)服务费应收*/
serReceiveFees: number;
/**(必填)服务费已结佣*/
serSettledCommFees: number;
/**(必填)服务费未收*/
serUnpaidFees: number;
/**(必填)服务费未结佣*/
serUnsetCommFees: number;
/**(必填)签约日期(yyyy-MM-dd)*/
signDate: string;
/**(必填)签约价格*/
signPrice: number;
/**(必填)认购日期(yyyy-MM-dd)*/
subscribeDate: string;
}
/**PayDealCommCreateRequest*/
export interface PayDealCommCreateRequest {
/**代理费金额*/
agencyFeesAmount: number;
/**代理费类型(CommFees-拆佣、SettledCommFees-已结佣、UnsetCommFees-未结佣、CanCommFees-可结佣、ThisCommFees-申请金额)*/
agencyFeesType: string;
/**成交报告编号*/
dealCode: string;
/**甲方ID*/
partyA: number;
/**甲方名字*/
partyAName: string;
}
/**PayUpdatePaidCommAgentFeeVO*/
export interface PayUpdatePaidCommAgentFeeVO {
/**undefined*/
paidAgentFee: number;
/**undefined*/
partyAId: number;
/**undefined*/
partyAName: string;
}
/**PayUpdatePaidCommVO*/
export interface PayUpdatePaidCommVO {
/**代理费信息*/
agentFees: PayUpdatePaidCommAgentFeeVO[];
/**成交报告编号*/
dealCode: string;
/**服务费*/
serviceFee: number;
}
/**PayUpdatePaidRequestVO*/
export interface PayUpdatePaidRequestVO {
/**undefined*/
vos: PayUpdatePaidCommVO[];
}
/**PaymentDealVO*/
export interface PaymentDealVO {
/**支付金额*/
amount: number;
/**业务编号[优惠告知书和请款单号]*/
businessCode: string;
/**业务ID*/
businessId: number;
/**对账时间(yyyy-MM-dd HH:mm:ss)*/
checkTime: string;
/**实收确认时间(yyyy-MM-dd HH:mm:ss)*/
confirmTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交报告编号[冗余字段]*/
dealCode: string;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**款项类型(ServiceFee-服务费、AgencyFee-代理费)*/
foundType: string;
/**店组ID*/
groupId: number;
/**ID*/
id: number;
/**经办人*/
operator: number;
/**经办人*/
operatorName: string;
/**甲方公司ID*/
partyAId: number;
/**甲方公司名字*/
partyAName: string;
/**凭证号*/
payCode: string;
/**收款日期(yyyy-MM-dd)*/
payDate: string;
/**收款编号*/
payNo: string;
/**支付时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**支付方式(Pos-POS刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
payType: string;
/**收款账号*/
payeeAccount: string;
/**收款账户*/
payeeName: string;
/**付款方(Customer-客户、PartyA-甲方)*/
payer: string;
/**项目ID*/
proId: number;
/**房号ID*/
roomId: number;
/**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账、Revoked-已撤销、Flushed-已冲正)*/
status: string;
/**立项ID*/
termId: number;
/**录入终端(WeChatApp-微信小程序、Pc-电脑)*/
terminal: string;
/**银联微信小程序订单号[按银联要求格式生成,15位商户号+8位日期+9位随机数字]*/
unionPayWeChatNo: string;
/**银联微信小程序订单时间[yyyyMMddHHssmm]*/
unionPayWeChatTime: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PaymentDealVO_1*/
export interface PaymentDealVO_1 {
/**服务费收款信息*/
paymentInfos: PaymentDealVO[];
/**应收*/
receiveAmount: number;
/**已收*/
receivedAmount: number;
/**费用类型 + 甲方名称*/
title: string;
/**未收*/
unreceiveAmount: number;
}
/**PayoffCheckChannelCommDetailRequestVO*/
export interface PayoffCheckChannelCommDetailRequestVO {
/**主成交报告编号*/
dealCodes: string[];
}
/**PayoffCheckChannelCommDetailReturnVO*/
export interface PayoffCheckChannelCommDetailReturnVO {
/**返回数据明细列表*/
details: PayoffCheckChannelCommDetailVO[];
}
/**PayoffCheckChannelCommDetailVO*/
export interface PayoffCheckChannelCommDetailVO {
/**面积*/
area: number;
/**报告编号*/
code: string;
/**佣金计付标准*/
commPaymentStandard: string;
/**合同编号*/
contractNo: string;
/**客户姓名*/
customerName: string;
/**地址*/
houseAddress: string;
/**序号*/
index: string;
/**签约价*/
price: number;
/**项目名*/
projectName: string;
/**物业类型*/
property: string;
/**回笼比例*/
returnRatio: number;
/**签约日期*/
signDate: string;
/**签约类型*/
signUp: string;
/**认购日期*/
subscribeDate: string;
/**周期Id*/
termId: number;
/**周期名*/
termName: string;
}
/**PayoffCheckChannelCommReturnVO*/
export interface PayoffCheckChannelCommReturnVO {
/**主成交+补充成交报告，合计应付佣金*/
amount: number;
/**渠道商ID*/
channelId: number;
/**成交报告编号*/
dealCode: string;
/**主成交+补充成交报告，合计已付佣金*/
paidAmount: number;
}
/**PayoffCheckChannelCommVO*/
export interface PayoffCheckChannelCommVO {
/**渠道商ID*/
channelId: number;
/**成交报告编号*/
dealCode: string;
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
dealVO: DealAddVO;
/**成交附件信息*/
documentVO: DocumentAddVO[];
/**房产信息*/
houseVO: HouseAddVO;
/**undefined*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveAddVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveAddVO[];
/**退款金额*/
refundAmount: number;
}
/**PreviewEntryBasicInfChangeInputVO*/
export interface PreviewEntryBasicInfChangeInputVO {
/**中介信息*/
agencyVO: AgencyAddVO[];
/**客户信息*/
customerVO: CustomerAddVO[];
/**成交信息*/
dealAddInputVO: DealAddInputVO;
/**成交附件信息*/
documentVO: DocumentAddVO[];
/**房产信息*/
houseAddInputVO: HouseAddInputVO;
/**优惠告知书信息*/
noticeDealList: NoticeDealCreate[];
}
/**PreviewEntryBasicInfChangeVO*/
export interface PreviewEntryBasicInfChangeVO {
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
noticeDealList: NoticeDealCreate[];
/**退款金额*/
refundAmount: number;
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
dealVO: DealAddVO;
/**成交附件信息*/
documentVO: DocumentAddVO[];
/**房产信息*/
houseVO: HouseAddVO;
/**undefined*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveAddVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveAddVO[];
/**退款金额*/
refundAmount: number;
}
/**PreviewEntryStaffAchieveChangeInputVO*/
export interface PreviewEntryStaffAchieveChangeInputVO {
/**平台费用信息*/
achieveVO: AchieveAddVO[];
/**父成交Id*/
parentId: number;
}
/**PreviewEntryStaffEnterIngAchieveChangeInputVO*/
export interface PreviewEntryStaffEnterIngAchieveChangeInputVO {
/**平台费用信息*/
achieveVO: AchieveAddVO[];
/**父成交Id*/
parentId: number;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
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
dealVO: DealUpdateVO;
/**成交附件信息*/
documentVO: DocumentUpdateVO[];
/**房产信息*/
houseVO: HouseUpdateVO;
/**优惠告知书是否必传*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveUpdateVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveUpdateVO[];
/**退款金额*/
refundAmount: number;
}
/**PreviewUpdateBasicInfChangeInputVO*/
export interface PreviewUpdateBasicInfChangeInputVO {
/**中介信息*/
agencyVO: AgencyUpdateVO[];
/**客户信息*/
customerVO: CustomerUpdateVO[];
/**成交信息*/
dealUpdateInputVO: DealUpdateInputVO;
/**成交附件信息*/
documentVO: DocumentUpdateVO[];
/**房产信息*/
houseUpdateInputVO: HouseUpdateInputVO;
/**(必填)告知书*/
noticeAgreementCreateRequest: NoticeDealCreate[];
}
/**PreviewUpdateBasicInfChangeVO*/
export interface PreviewUpdateBasicInfChangeVO {
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
/**(必填)优惠告知书*/
noticeDealList: NoticeDealCreate[];
/**退款金额*/
refundAmount: number;
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
dealVO: DealUpdateVO;
/**成交附件信息*/
documentVO: DocumentUpdateVO[];
/**房产信息*/
houseVO: HouseUpdateVO;
/**优惠告知书是否必传*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveUpdateVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveUpdateVO[];
/**退款金额*/
refundAmount: number;
}
/**PreviewUpdateStaffAchieveChangeInputShowVO*/
export interface PreviewUpdateStaffAchieveChangeInputShowVO {
/**平台费用信息*/
achieveVO: AchieveAddVO[];
/**成交Id*/
dealId: number;
/**父成交Id*/
parentId: number;
}
/**PreviewUpdateStaffAchieveChangeInputVO*/
export interface PreviewUpdateStaffAchieveChangeInputVO {
/**平台费用信息*/
achieveVO: AchieveAddVO[];
/**成交Id*/
dealId: number;
/**父成交Id*/
parentId: number;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
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
/**操作后状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
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
/**操作(Submit-提交、WithdrawSubmit-撤回提交、Review-审核、WithdrawReview-撤回审核、AchieveAllot-业绩分配、Sign-签署)*/
operate: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作人*/
operaterId: number;
/**操作人岗位*/
operaterJob: string;
/**操作人姓名*/
operaterName: string;
/**操作前状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
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
/**ProjectSumApply*/
export interface ProjectSumApply {
/**undefined*/
dealId: number;
/**undefined*/
details: ProjectSumApplyDetail[];
}
/**ProjectSumApplyDetail*/
export interface ProjectSumApplyDetail {
/**undefined*/
amount: number;
/**undefined*/
partyAId: number;
}
/**ReceiveAchieveAddVO*/
export interface ReceiveAchieveAddVO {
/**本单业绩*/
achieveAmount: number;
/**本单派发佣金*/
dispenseAmount: number;
/**分销业绩总额*/
distributeAmount: number;
/**其他渠道费用*/
otherChannelFees: number;
/**本单应收*/
receiveAmount: number;
/**本单派发内场奖励*/
rewardAmount: number;
/**总包业绩总额*/
totalPackageAmount: number;
}
/**ReceiveAchieveSumDataVO*/
export interface ReceiveAchieveSumDataVO {
/**本单业绩*/
achieveAmount: number;
/**业绩确认日期(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**代理费派发佣金总额*/
ageDispenseAmount: number;
/**代理费已派发佣金总额*/
ageDispensedAmount: number;
/**付款额度（服务费）*/
ageLimitFees: number;
/**代理费总已收、已收金额（代理费）*/
agePaidAmount: number;
/**代理费总应收、应收金额（代理费）*/
ageReceiveAmount: number;
/**代理费派发内场奖励总额*/
ageRewardAmount: number;
/**代理费已派发内场奖励总额*/
ageRewardedAmount: number;
/**付款额度（代理费）*/
agentPayQuota: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**本单派发佣金*/
dispenseAmount: number;
/**本单已派发佣金*/
dispensedAmount: number;
/**分销业绩总额*/
distributeAmount: number;
/**ID*/
id: number;
/**是否开发商已签字(Yes-是、No-否)*/
isSigned: string;
/**其他渠道费用*/
otherChannelFees: number;
/**已付金额（代理费）*/
paidAgentAmount: number;
/**本单已收、已收金额*/
paidAmount: number;
/**已付金额（服务费）*/
paidServiceAmount: number;
/**已付金额*/
paidTotalAmount: number;
/**主成交ID*/
parentId: number;
/**应付金额（代理费）*/
payAgentAmount: number;
/**应付金额*/
payAmount: number;
/**付款额度*/
payQuota: number;
/**应付金额（服务费）*/
payServiceAmount: number;
/**本单应收、应收金额*/
receiveAmount: number;
/**退款金额*/
refundAmount: number;
/**已退款金额*/
refundedAmount: number;
/**本单派发内场奖励*/
rewardAmount: number;
/**本单已派发内场奖励*/
rewardedAmount: number;
/**服务费派发佣金总额*/
serDispenseAmount: number;
/**服务费已派发佣金总额*/
serDispensedAmount: number;
/**付款额度（代理费）*/
serLimitFees: number;
/**服务费总已收、已收金额（服务费）*/
serPaidAmount: number;
/**服务费总应收、应收金额（服务费）*/
serReceiveAmount: number;
/**服务费派发内场奖励总额*/
serRewardAmount: number;
/**服务费已派发内场奖励总额*/
serRewardedAmount: number;
/**付款额度（服务费）*/
servicePayQuota: number;
/**总包业绩总额*/
totalPackageAmount: number;
/**未付金额（代理费）*/
unpaidAgentAmount: number;
/**未付金额*/
unpaidAmount: number;
/**未付金额（服务费）*/
unpaidServiceAmount: number;
/**未收金额（代理费）*/
unreceiveAgentAmount: number;
/**未收金额*/
unreceiveAmount: number;
/**未收金额（服务费）*/
unreceiveServiceAmount: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**待退款金额*/
waitRefundAmount: number;
}
/**ReceiveAchieveUpdateVO*/
export interface ReceiveAchieveUpdateVO {
/**本单业绩*/
achieveAmount: number;
/**成交ID*/
dealId: number;
/**本单派发佣金*/
dispenseAmount: number;
/**分销业绩总额*/
distributeAmount: number;
/**ID*/
id: number;
/**其他渠道费用*/
otherChannelFees: number;
/**本单应收*/
receiveAmount: number;
/**本单派发内场奖励*/
rewardAmount: number;
/**总包业绩总额*/
totalPackageAmount: number;
}
/**ReceiveAchieveVO*/
export interface ReceiveAchieveVO {
/**本单业绩*/
achieveAmount: number;
/**业绩确认日期(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**代理费派发佣金总额*/
ageDispenseAmount: number;
/**代理费已派发佣金总额*/
ageDispensedAmount: number;
/**付款额度（服务费）*/
ageLimitFees: number;
/**代理费总已收、已收金额（代理费）*/
agePaidAmount: number;
/**代理费总应收、应收金额（代理费）*/
ageReceiveAmount: number;
/**代理费派发内场奖励总额*/
ageRewardAmount: number;
/**代理费已派发内场奖励总额*/
ageRewardedAmount: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**本单派发佣金*/
dispenseAmount: number;
/**本单已派发佣金*/
dispensedAmount: number;
/**分销业绩总额*/
distributeAmount: number;
/**ID*/
id: number;
/**是否开发商已签字(Yes-是、No-否)*/
isSigned: string;
/**其他渠道费用*/
otherChannelFees: number;
/**本单已收、已收金额*/
paidAmount: number;
/**主成交ID*/
parentId: number;
/**本单应收、应收金额*/
receiveAmount: number;
/**本单派发内场奖励*/
rewardAmount: number;
/**本单已派发内场奖励*/
rewardedAmount: number;
/**服务费派发佣金总额*/
serDispenseAmount: number;
/**服务费已派发佣金总额*/
serDispensedAmount: number;
/**付款额度（代理费）*/
serLimitFees: number;
/**服务费总已收、已收金额（服务费）*/
serPaidAmount: number;
/**服务费总应收、应收金额（服务费）*/
serReceiveAmount: number;
/**服务费派发内场奖励总额*/
serRewardAmount: number;
/**服务费已派发内场奖励总额*/
serRewardedAmount: number;
/**总包业绩总额*/
totalPackageAmount: number;
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
/**收派标准*/
packageId: number;
/**收派名字*/
packgeName: string;
/**甲方或客户*/
partyACustomer: number;
/**甲方名称*/
partyACustomerName: string;
/**应收金额*/
receiveAmount: number;
/**派发内场奖励金额*/
rewardAmount: number;
/**总包业绩金额*/
totalPackageAmount: number;
/**类型(ServiceFee-服务费、AgencyFee-代理费)*/
type: string;
}
/**ReceiveInitChannelCommVO*/
export interface ReceiveInitChannelCommVO {
/**派发佣金金额*/
commAmount: number;
/**分销业绩金额*/
distributionAmount: number;
/**其他渠道费用*/
otherChannelFees: number;
/**收派标准*/
packageId: number;
/**收派名字*/
packgeName: string;
/**甲方或客户*/
partyACustomer: number;
/**甲方或客户名称*/
partyACustomerName: string;
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
/**分销业绩金额*/
distributionAmount: number;
/**ID*/
id: number;
/**其他渠道费用*/
otherChannelFees: number;
/**收派标准*/
packageId: number;
/**收派名字*/
packgeName: string;
/**甲方或客户*/
partyACustomer: number;
/**甲方名称*/
partyACustomerName: string;
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
/**收派明细*/
collectandsendDetailDealVO: CollectandsendDetailDealVO;
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
/**收派标准*/
packageId: number;
/**收派名字*/
packgeName: string;
/**主成交ID*/
parentId: number;
/**甲方或客户*/
partyACustomer: number;
/**甲方名称*/
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
/**RefundItem*/
export interface RefundItem {
/**服务费实收金额*/
actualAmount: number;
/**退款金额*/
amount: number;
/**退款项附件是否齐全标识[0-否1-是]*/
attachmentComplete: number;
/**优惠告知书ID*/
businessId: number;
/**对外拆佣总合*/
commission: number;
/**业绩确认时间(yyyy-MM-dd)*/
confirmationTime: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**生成日期(yyyy-MM-dd)*/
createDate: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交单位*/
dealCompany: string;
/**成交客户姓名*/
dealCustomerName: string;
/**成交ID*/
dealId: number;
/**成交报告编号*/
dealNo: string;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**发票业务单号*/
invoiceNo: string;
/**退款项来源(NOTICE-优惠告知书发起补充协议发起退款申请、PerformanceChanges-补充成交报告业绩变更、CheckOutRefund-补充成交退房退款)*/
itemSource: string;
/**优惠告知书收款金额*/
noticeAmount: number;
/**组织id*/
orgId: number;
/**项目id*/
proId: number;
/**服务费应收金额*/
receivableAmount: number;
/**退款人账号*/
refundAccount: string;
/**退款申请书ID*/
refundApplyId: number;
/**关联退款申请单编号*/
refundApplyNO: string;
/**退款人开户行*/
refundBankName: string;
/**退款发起人*/
refundItemUser: string;
/**退款人姓名*/
refundName: string;
/**退款项编号*/
refundNo: string;
/**退款完成日期(yyyy-MM-dd)*/
refundedDate: string;
/**成交房间ID*/
roomId: number;
/**待退款项退款状态(PendingApply-待申请、UnderReview-审核中、Refunding-退款中、Refunded-已退款)*/
status: string;
/**服务费未收金额*/
uncollectedAmount: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ReviewDealVO*/
export interface ReviewDealVO {
/**业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**成交ID*/
dealId: number;
/**备注*/
remark: string;
}
/**TermSpecialVO*/
export interface TermSpecialVO {
/**ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**UpdateAchieveAllotVO*/
export interface UpdateAchieveAllotVO {
/**平台费用信息*/
achieveVO: AchieveAddVO[];
/**业绩分配日期(yyyy-MM-dd HH:mm:ss)*/
allotDate: string;
/**业绩分配人ID*/
alloterId: number;
/**成交基础信息*/
basic: UpdateDealBasicInfVO;
/**计算方式(Auto-自动、Manual-手动)*/
calculation: string;
/**成交对外拆佣信息*/
channelCommVO: ChannelCommAddVO[];
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
/**优惠告知书是否必传*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveUpdateVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveUpdateVO[];
/**退款金额*/
refundAmount: number;
}
/**UpdateBasicInfChangeVO*/
export interface UpdateBasicInfChangeVO {
/**中介信息*/
agencyVO: AgencyUpdateVO[];
/**客户信息*/
customerVO: CustomerUpdateVO[];
/**成交信息*/
dealUpdateInputVO: DealUpdateInputVO;
/**成交附件信息*/
documentVO: DocumentUpdateVO[];
/**房产信息*/
houseUpdateInputVO: HouseUpdateInputVO;
/**(必填)告知书*/
noticeAgreementCreateRequest: NoticeDealCreate[];
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
/**优惠告知书是否必传*/
isNotic: boolean;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**应收业绩信息*/
receiveAchieveVO: ReceiveAchieveUpdateVO[];
/**应收信息（收派金额）*/
receiveVO: ReceiveUpdateVO[];
/**退款金额*/
refundAmount: number;
}
