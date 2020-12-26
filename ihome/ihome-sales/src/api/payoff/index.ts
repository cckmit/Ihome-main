/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-26 11:49:01 ├F10: AM┤
import { request } from '@/api/base'
const basePath = "/sales-api/payoff"
/**计算成本归属*/
export async function post_costApportion_calculateCostApportion (d?: any) {
return await request.post< any,any> (basePath+'/costApportion/calculateCostApportion', d)
}
/**查询成本归属列表*/
export async function post_costApportion_getCostApportionList (d?: any) {
return await request.post< any,any> (basePath+'/costApportion/getCostApportionList', d)
}
/**导出列表*/
export async function post_export_list (d?: any) {
return await request.post< any,any> (basePath+'/export/list', d)
}
/**计算结佣统计数据*/
export async function post_payApply_calculation_results (d?: any) {
return await request.post< CalculationResultsResponse,CalculationResultsResponse> (basePath+'/payApply/calculation/results', d)
}
/**删除付款单*/
export async function post_payApply_delete_ids (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/delete/ids', d)
}
/**录入付款单*/
export async function post_payApply_entryApply (d?: any) {
return await request.post< number,number> (basePath+'/payApply/entryApply', d)
}
/**分公司财务审核*/
export async function post_payApply_financeReviewApply (d?: any) {
return await request.post< number,number> (basePath+'/payApply/financeReviewApply', d)
}
/**查询付款详情*/
export async function get_payApply_get__id (d?: any) {
return await request.get<ShowPayApplyDetailVO,ShowPayApplyDetailVO>(basePath+'/payApply/get/{id}', { params: d })
}
/**查询付款列表*/
export async function post_payApply_getList (d?: any) {
return await request.post< any,any> (basePath+'/payApply/getList', d)
}
/**付款申请单补充附件*/
export async function post_payApply_payApplySuppFile (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/payApplySuppFile', d)
}
/**修改付款单*/
export async function post_payApply_updateApply (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/updateApply', d)
}
/**撤回提交*/
export async function post_payApply_withdrawSubmit (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/withdrawSubmit', d)
}
/**结佣成交数据创建*/
export async function post_payDeal_create (d?: any) {
return await request.post< number,number> (basePath+'/payDeal/create', d)
}
/**查询结佣成交列表*/
export async function post_payDeal_getList (d?: any) {
return await request.post< any,any> (basePath+'/payDeal/getList', d)
}
/**定时任务*/
export async function get_payDeal_timed_task (d?: any) {
return await request.get<any,any>(basePath+'/payDeal/timed/task', { params: d })
}
/**结佣成交数据更新*/
export async function post_payDeal_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDeal/update', d)
}
/**根据成交编号查询结佣成交数据*/
export async function get_payDeal__dealNo (d?: any) {
return await request.get<PayDealVO,PayDealVO>(basePath+'/payDeal/{dealNo}', { params: d })
}
/**创建抵扣项*/
export async function post_payDeductDetail_create (d?: any) {
return await request.post< number,number> (basePath+'/payDeductDetail/create', d)
}
/**保存付款单ID,更新状态*/
export async function get_payDeductDetail_detail (d?: any) {
return await request.get<PayDeductDetailVO[],PayDeductDetailVO[]>(basePath+'/payDeductDetail/detail', { params: d })
}
/**查询结佣抵扣明细列表*/
export async function post_payDeductDetail_getPayDeductDetailList (d?: any) {
return await request.post< any,any> (basePath+'/payDeductDetail/getPayDeductDetailList', d)
}
/**保存付款单ID,更新状态*/
export async function post_payDeductDetail_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDeductDetail/update', d)
}
/**查询付款审核日志*/
export async function get_processRecord_getProcessRecordList (d?: any) {
return await request.get<ProcessRecordVO[],ProcessRecordVO[]>(basePath+'/processRecord/getProcessRecordList', { params: d })
}
/**非分公司财务审核付款单*/
export async function post_processRecord_noFinanceReviewApply (d?: any) {
return await request.post< number,number> (basePath+'/processRecord/noFinanceReviewApply', d)
}
/**设置已付款*/
export async function post_processRecord_setUpPaid (d?: any) {
return await request.post< number,number> (basePath+'/processRecord/setUpPaid', d)
}
/**设置未付款*/
export async function post_processRecord_setUpUnpaid (d?: any) {
return await request.post< number,number> (basePath+'/processRecord/setUpUnpaid', d)
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
/**CalculateCostApportionVO*/
export interface CalculateCostApportionVO {
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
/**抵扣信息*/
payDeductDetailList: PayDeductDetailAddVO[];
}
/**CalculationResultsRequest*/
export interface CalculationResultsRequest {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**发票税率*/
taxRate: number;
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
}
/**CalculationResultsResponse*/
export interface CalculationResultsResponse {
/**本期实际支付金额*/
actualAmount: number;
/**本期申请支付金额*/
applyAmount: number;
/**渠道公司周期结佣汇总*/
cycleCommissionList: CommissionSummary[];
/**本期应扣*/
deductAmount: number;
/**不含税金额*/
noTaxAmount: number;
/**累计抵扣*/
payDeductDetailList: PayDeductDetailVO[];
/**税额*/
tax: number;
/**累计付款金额*/
totalPayFees: number;
/**累计扣除金额*/
totalPdeductFees: number;
/**附件信息*/
documentList: DocumentAddVO[];
}
/**CommissionSummary*/
export interface CommissionSummary {
/**本期实际支付金额*/
actualAmount: number;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**本期扣除金额*/
deductAmount: number;
/**历史累计发生金额*/
historyTotalPayFees: number;
/**历史累计扣除金额*/
historyTotalPdeductFees: number;
/**累计结佣次数*/
num: number;
/**所属项目ID*/
projectId: number;
/**所属项目名称*/
projectName: string;
/**累计发生金额(含本次)*/
totalPayFees: number;
/**累计扣除金额(含本次)*/
totalPdeductFees: number;
}
/**CostApportionQueryVO*/
export interface CostApportionQueryVO {
/**付款单ID*/
applyId: number;
/**周期ID*/
cycleId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**CostApportionVO*/
export interface CostApportionVO {
/**付款单ID*/
applyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**成本归属区域*/
ownedAreaName: string;
/**成本归属门店*/
ownedStoreId: number;
/**成本归属门店*/
ownedStoreName: string;
/**应承担总成本*/
shouldTotalCost: number;
/**本次分摊成本金额（合计）*/
thisApportionCost: number;
/**本次分摊不含税金额 */
thisApportionNoTaxCost: number;
/**本次分摊税额*/
thisApportionTax: number;
/**累计已分摊成本金额*/
totalApportionCost: number;
/**未分摊成本金额*/
unapportionCost: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DocumentAddVO*/
export interface DocumentAddVO {
/**(必填)文件ID*/
fileId: string;
/**(必填)文件名称*/
fileName: string;
/**(必填)文件类型(Contract-合同、BusinessLicense-营业执照、Invoice-发票、RequestForm-请款单、ConfirmDetail-开发签字确认明细、SetteDetail-结算明细、Other-其他)*/
fileType: string;
}
/**DocumentVO*/
export interface DocumentVO {
/**付款申请ID*/
applyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**文件名称*/
fileName: string;
/**文件类型(Contract-合同、BusinessLicense-营业执照、Invoice-发票、RequestForm-请款单、ConfirmDetail-开发签字确认明细、SetteDetail-结算明细、Other-其他)*/
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
/**EntryApplyVO*/
export interface EntryApplyVO {
/**付款单主体信息*/
payApplyVO: PayApplyAddVO;
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
}
/**FinanceReviewApplyVO*/
export interface FinanceReviewApplyVO {
/**付款单主体信息*/
payApplyVO: PayApplyAddVO;
/**(必填)本期实际支付金额*/
actualAmount: number;
/**(必填)审核意见*/
auditOpinion: string;
/**附件信息*/
documentList: DocumentAddVO[];
/**(必填)待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
/**(必填)操作状态(TemporaryStorage-暂存、Through-通过、Reject-驳回、Saving-保存)*/
payoffApproval: string;
}
/**NoFinanceReviewApplyVO*/
export interface NoFinanceReviewApplyVO {
/**ID*/
id: number;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、OneLineUnreview-待一线业务审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAUnreview-待OA审批、OAReviewing-OA流程审批中、ReviewPass-终审通过、CompletePay-完成支付、ReviewReject-终审驳回、ReviewEnd-审批终止)*/
status: string;
/**付款操作记录信息*/
processRecord: ProcessRecordAddVO;
}
/**PayApplyAddVO*/
export interface PayApplyAddVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**付款单编号*/
applyCode: string;
/**区域*/
area: string;
/**区域ID*/
areaId: number;
/**所属组织ID*/
belongOrgId: number;
/**(必填)申请说明*/
description: string;
/**undefined*/
id: number;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）、Special_ZZ-增值税专用发票(纸质）)*/
invoiceType: string;
/**制单人ID*/
makerId: number;
/**制单日期(yyyy-MM-dd HH:mm:ss)*/
makerTime: string;
/**项目*/
projectName: string;
/**渠道收款账号*/
receiveAccount: string;
/**当前状态： 保存 = Unconfirm ；提交 = PlatformClerkUnreview(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、OneLineUnreview-待一线业务审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAUnreview-待OA审批、OAReviewing-OA流程审批中、ReviewPass-终审通过、CompletePay-完成支付、ReviewReject-终审驳回、ReviewEnd-审批终止)*/
status: string;
/**发票税率*/
taxRate: number;
/**累计付款金额*/
totalPayFees: number;
/**累计扣除金额*/
totalPdeductFees: number;
}
/**PayApplyDetailAddVO*/
export interface PayApplyDetailAddVO {
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费付款限额*/
ageLimitFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**本次代理费结佣付款金额*/
ageThisCommFees: number;
/**(必填)代理费未收*/
ageUnpaidFees: number;
/**(必填)代理费未结佣*/
ageUnsetCommFees: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**分销协议编号*/
contNo: string;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**扣除项类别*/
deductType: string;
/**是否垫佣(Yes-是、No-否)*/
isMat: string;
/**不含税金额*/
noTaxAmount: number;
/**本次支付比例(%)*/
ratio: number;
/**服务费实收*/
serActualFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费付款限额*/
serLimitFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**本次服务费结佣付款金额*/
serThisCommFees: number;
/**(必填)服务费未收*/
serUnpaidFees: number;
/**(必填)服务费未结佣*/
serUnsetCommFees: number;
/**签字确认*/
signConfirm: string;
/**签约日期(yyyy-MM-dd HH:mm:ss)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**税额*/
tax: number;
/**本次应扣*/
thisDeduct: number;
}
/**PayApplyDetailVO*/
export interface PayApplyDetailVO {
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费付款限额*/
ageLimitFees: number;
/**代理费未结佣*/
ageNoCommFees: number;
/**代理费未收*/
ageNoFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**本次代理费结佣付款金额*/
ageThisCommFees: number;
/**代理费未收*/
ageUnpaidFees: number;
/**代理费未结佣*/
ageUnsetCommFees: number;
/**合计拆佣金额*/
allCommFees: number;
/**付款单ID*/
applyId: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**分销协议编号*/
contNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**扣除项类别*/
deductType: string;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**是否垫佣(Yes-是、No-否)*/
isMat: string;
/**不含税金额*/
noTaxAmount: number;
/**本次支付比例(%)*/
ratio: number;
/**服务费实收*/
serActualFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费付款限额*/
serLimitFees: number;
/**服务费未结佣*/
serNoCommFees: number;
/**服务费未收*/
serNoFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**本次服务费结佣付款金额*/
serThisCommFees: number;
/**服务费未收*/
serUnpaidFees: number;
/**服务费未结佣*/
serUnsetCommFees: number;
/**签字确认*/
signConfirm: string;
/**签约日期(yyyy-MM-dd HH:mm:ss)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**税额*/
tax: number;
/**本次应扣*/
thisDeduct: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayApplyDocumentRequest*/
export interface PayApplyDocumentRequest {
/**(必填)附件信息*/
documents: DocumentAddVO[];
/**(必填)ID*/
id: number;
/**附言*/
postscript: string;
}
/**PayApplyListVO*/
export interface PayApplyListVO {
/**实际支付金额*/
actualAmount: number;
/**渠道商名称*/
agencyName: string;
/**申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**所属组织*/
belongOrgName: string;
/**扣除金额*/
deductAmount: number;
/**付款单ID*/
id: number;
/**制单人*/
maker: string;
/**制单日期(yyyy-MM-dd HH:mm:ss)*/
makerTime: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、OneLineUnreview-待一线业务审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAUnreview-待OA审批、OAReviewing-OA流程审批中、ReviewPass-终审通过、CompletePay-完成支付、ReviewReject-终审驳回、ReviewEnd-审批终止)*/
status: string;
}
/**PayApplyQueryVO*/
export interface PayApplyQueryVO {
/**渠道商名称*/
agencyName: string;
/**付款单编号*/
applyCode: string;
/**制单日期起(yyyy-MM-dd HH:mm:ss)*/
beginMakerTime: string;
/**组织*/
belongOrgId: number;
/**制单日期止(yyyy-MM-dd HH:mm:ss)*/
endMakerTime: string;
/**制单人*/
makerId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**审核人*/
reviewerId: number;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、OneLineUnreview-待一线业务审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAUnreview-待OA审批、OAReviewing-OA流程审批中、ReviewPass-终审通过、CompletePay-完成支付、ReviewReject-终审驳回、ReviewEnd-审批终止)*/
status: string;
}
/**PayDealAddVO*/
export interface PayDealAddVO {
/**(必填)地址*/
address: string;
/**(必填)代理费实收*/
ageActualFees: number;
/**(必填)代理费可结佣*/
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
/**(必填)录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**(必填)是否垫佣(Yes-是、No-否)*/
isMat: string;
/**结算状态(AlreadyNotSettlement-已结算、NotSettlement-未结算)*/
payDealStatus: string;
/**(必填)服务费实收*/
serActualFees: number;
/**(必填)服务费可结佣*/
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
/**(必填)签约日期(yyyy-MM-dd HH:mm:ss)*/
signDate: string;
/**(必填)签约价格*/
signPrice: number;
/**(必填)认购日期(yyyy-MM-dd HH:mm:ss)*/
subscribeDate: string;
}
/**PayDealListVO*/
export interface PayDealListVO {
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**代理费未收*/
ageUnpaidFees: number;
/**代理费未结佣*/
ageUnsetCommFees: number;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**分销协议编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**(必填)累计扣款*/
countDeduction: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**ID*/
id: number;
/**是否垫佣(Yes-是、No-否)*/
isMat: string;
/**没有勾选：0 已勾选：1(Yes-是、No-否)*/
isSelected: string;
/**结算状态(AlreadyNotSettlement-已结算、NotSettlement-未结算)*/
payDealStatus: string;
/**服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**服务费未收*/
serUnpaidFees: number;
/**服务费未结佣*/
serUnsetCommFees: number;
/**签约日期(yyyy-MM-dd HH:mm:ss)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**认购日期(yyyy-MM-dd HH:mm:ss)*/
subscribeDate: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayDealQueryVO*/
export interface PayDealQueryVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**业务模式*/
busModel: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**客户*/
customer: string;
/**立项周期*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**结束时间(yyyy-MM-dd)*/
endTime: string;
/**是否可结佣(Yes-是、No-否)*/
isComm: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**PayDealVO*/
export interface PayDealVO {
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**代理费未收*/
ageUnpaidFees: number;
/**代理费未结佣*/
ageUnsetCommFees: number;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**分销协议编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**ID*/
id: number;
/**是否垫佣(Yes-是、No-否)*/
isMat: string;
/**没有勾选：0 已勾选：1(Yes-是、No-否)*/
isSelected: string;
/**结算状态(AlreadyNotSettlement-已结算、NotSettlement-未结算)*/
payDealStatus: string;
/**服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**服务费未收*/
serUnpaidFees: number;
/**服务费未结佣*/
serUnsetCommFees: number;
/**签约日期(yyyy-MM-dd HH:mm:ss)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**认购日期(yyyy-MM-dd HH:mm:ss)*/
subscribeDate: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayDeductDetailAddVO*/
export interface PayDeductDetailAddVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**抵扣金额*/
deductAmount: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**产生时间(yyyy-MM-dd HH:mm:ss)*/
generateTime: string;
/**抵扣状态(Undeduction-待抵扣、Deducting-抵扣审核中、Deducted-已抵扣)*/
status: string;
/**抵扣项类别(PayoffDeducted-结佣抵扣、DirectRefund-直接退款)*/
type: string;
}
/**PayDeductDetailInfo*/
export interface PayDeductDetailInfo {
/**渠道商名称*/
agencyName: string;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**抵扣金额*/
deductAmount: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
}
/**PayDeductDetailQueryVO*/
export interface PayDeductDetailQueryVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**抵扣的付款单ID*/
applyId: number;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**PayDeductDetailUpdateVO*/
export interface PayDeductDetailUpdateVO {
/**抵扣的付款单ID*/
applyId: number;
/**抵扣时间(yyyy-MM-dd HH:mm:ss)*/
deductTime: string;
/**ID*/
ids: number[];
/**抵扣状态(Undeduction-待抵扣、Deducting-抵扣审核中、Deducted-已抵扣)*/
status: string;
/**抵扣类型(PayoffDeducted-结佣抵扣、DirectRefund-直接退款)*/
type: string;
}
/**PayDeductDetailVO*/
export interface PayDeductDetailVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**抵扣的付款单ID*/
applyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**抵扣金额*/
deductAmount: number;
/**抵扣时间(yyyy-MM-dd HH:mm:ss)*/
deductTime: string;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**已删除*/
deleted: number;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**产生时间(yyyy-MM-dd HH:mm:ss)*/
generateTime: string;
/**ID*/
id: number;
/**抵扣状态(Undeduction-待抵扣、Deducting-抵扣审核中、Deducted-已抵扣)*/
status: string;
/**抵扣类型(PayoffDeducted-结佣抵扣、DirectRefund-直接退款)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ProcessRecordAddVO*/
export interface ProcessRecordAddVO {
/**操作后状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
afterStatus: string;
/**付款单ID*/
applyId: number;
/**操作(Submit-提交、WithdrawSubmit-撤回提交、Review-审核、WithdrawReview-撤回审核、AchieveAllot-业绩分配、Sign-签署)*/
operate: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作人ID*/
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
}
/**ProcessRecordVO*/
export interface ProcessRecordVO {
/**操作后状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、OneLineUnreview-待一线业务审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAUnreview-待OA审批、OAReviewing-OA流程审批中、ReviewPass-终审通过、CompletePay-完成支付、ReviewReject-终审驳回、ReviewEnd-审批终止)*/
afterStatus: string;
/**付款单ID*/
applyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**操作(Submit-提交、Withdraw-撤回、Review-审核、WithdrawReview-撤回审核、FinancialContr-财务管控、SetupPaid-设置已付款、SetupUnPaid-设置未付款、SuppInfo-补充信息)*/
operate: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作人*/
operaterId: number;
/**操作人岗位*/
operaterJob: string;
/**操作人姓名*/
operaterName: string;
/**操作前状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、OneLineUnreview-待一线业务审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAUnreview-待OA审批、OAReviewing-OA流程审批中、ReviewPass-终审通过、CompletePay-完成支付、ReviewReject-终审驳回、ReviewEnd-审批终止)*/
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
/**SetUpPaidApplyVO*/
export interface SetUpPaidApplyVO {
/**付款单ID*/
applyId: number;
/**抵扣项ID*/
payDeductDetailId: number;
/**付款操作记录信息*/
processRecord: ProcessRecordAddVO;
}
/**SetUpUnpaidApplyVO*/
export interface SetUpUnpaidApplyVO {
/**付款单ID*/
applyId: number;
/**抵扣项ID*/
payDeductDetailId: number;
/**付款操作记录信息*/
processRecord: ProcessRecordAddVO;
}
/**ShowPayApplyDetailVO*/
export interface ShowPayApplyDetailVO {
/**本期实际支付金额*/
actualAmount: number;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**本期申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**区域*/
area: string;
/**所属组织*/
belongOrgId: number;
/**所属组织*/
belongOrgName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**本期应扣*/
deductAmount: number;
/**已删除*/
deleted: number;
/**申请说明*/
description: string;
/**ID*/
id: number;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）、Special_ZZ-增值税专用发票(纸质）)*/
invoiceType: string;
/**制单人*/
maker: string;
/**制单人*/
makerId: number;
/**制单日期(yyyy-MM-dd HH:mm:ss)*/
makerTime: string;
/**不含税金额*/
noTaxAmount: number;
/**累计抵扣*/
payDeductDetailList: PayDeductDetailVO[];
/**项目*/
projectName: string;
/**渠道收款账号*/
receiveAccount: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、OneLineUnreview-待一线业务审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAUnreview-待OA审批、OAReviewing-OA流程审批中、ReviewPass-终审通过、CompletePay-完成支付、ReviewReject-终审驳回、ReviewEnd-审批终止)*/
status: string;
/**税额*/
tax: number;
/**发票税率*/
taxRate: number;
/**累计付款金额*/
totalPayFees: number;
/**累计扣除金额*/
totalPdeductFees: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**成本归属列表信息*/
costApportionList: CostApportionVO[];
/**附件信息*/
documentList: DocumentVO[];
/**付款列表信息*/
payApplyDetailList: PayApplyDetailVO[];
/**抵扣项信息*/
payDeductDetailInfos: PayDeductDetailInfo[];
/**付款操作记录信息*/
processRecordList: ProcessRecordVO[];
}
/**UpdateApplyVO*/
export interface UpdateApplyVO {
/**付款单主体信息*/
payApplyVO: PayApplyAddVO;
/**附件信息*/
documentList: DocumentAddVO[];
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
}
/**WithdrawSubmitVO*/
export interface WithdrawSubmitVO {
/**ID*/
id: number;
}
