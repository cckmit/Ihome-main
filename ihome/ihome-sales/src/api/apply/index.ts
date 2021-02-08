/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-2-8 4:22:34 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/apply"
/**发起开票申请*/
export async function post_applyRec_InvoiceApply__applyId (d?: any) {
return await request.post< number,number> (basePath+'/applyRec/InvoiceApply/{applyId}', d)
}
/**开票或红冲*/
export async function post_applyRec_InvoiceMakeOrRed (d?: any) {
return await request.post< number,number> (basePath+'/applyRec/InvoiceMakeOrRed', d)
}
/**请佣申请单审核*/
export async function post_applyRec_audit (d?: any) {
return await request.post< number,number> (basePath+'/applyRec/audit', d)
}
/**请佣申请单撤销*/
export async function post_applyRec_cancel__applyId (d?: any) {
return await request.post< number,number> (basePath+'/applyRec/cancel/{applyId}', d)
}
/**根据请佣ID批量删除*/
export async function post_applyRec_deleteBatch (d?: any) {
return await request.post< DelResVO[],DelResVO[]> (basePath+'/applyRec/deleteBatch', d)
}
/**批量导出(excel或压缩包)*/
export async function get_applyRec_excelBatchApplyInfo (d?: any) {
return await request.get<any,any>(basePath+'/applyRec/excelBatchApplyInfo', { params: d })
}
/**根据请佣ID返回详细信息*/
export async function get_applyRec_getApplyRecById__applyId (d?: any) {
return await request.get<ApplyRecBaseVO,ApplyRecBaseVO>(basePath+'/applyRec/getApplyRecById/{applyId}', { params: d })
}
/**查询请佣申请审核列表*/
export async function post_applyRec_getAuditList (d?: any) {
return await request.post< any,any> (basePath+'/applyRec/getAuditList', d)
}
/**根据条件获取请佣ID列表(状态：已完成，上限100条)*/
export async function post_applyRec_getIdByCon (d?: any) {
return await request.post< number[],number[]> (basePath+'/applyRec/getIdByCon', d)
}
/**获取上次请款单号*/
export async function post_applyRec_getLastApplyNo (d?: any) {
return await request.post< string,string> (basePath+'/applyRec/getLastApplyNo', d)
}
/**查询请佣申请列表*/
export async function post_applyRec_getList (d?: any) {
return await request.post< any,any> (basePath+'/applyRec/getList', d)
}
/**获取OA当前待办人*/
export async function get_applyRec_getOaAuditUser__applyId (d?: any) {
return await request.get<string,string>(basePath+'/applyRec/getOaAuditUser/{applyId}', { params: d })
}
/**获取所有的OA审核中的请佣申请单记录的OA流水号*/
export async function post_applyRec_getOaSysApplyIdList (d?: any) {
return await request.post< number[],number[]> (basePath+'/applyRec/getOaSysApplyIdList', d)
}
/**根据请佣ID获取流程列表*/
export async function get_applyRec_getProcessList__applyId (d?: any) {
return await request.get<ApplyProcessVO[],ApplyProcessVO[]>(basePath+'/applyRec/getProcessList/{applyId}', { params: d })
}
/**根据请佣ID返回是否可开票*/
export async function get_applyRec_isInvoiceMake__applyId (d?: any) {
return await request.get<ApplyRecIsOkVo,ApplyRecIsOkVo>(basePath+'/applyRec/isInvoiceMake/{applyId}', { params: d })
}
/**根据请佣ID返回是否可红冲*/
export async function get_applyRec_isRedCorrect__applyId (d?: any) {
return await request.get<ApplyRecIsOkVo,ApplyRecIsOkVo>(basePath+'/applyRec/isRedCorrect/{applyId}', { params: d })
}
/**请佣申请单保存（草稿、提交、保存并发起开票申请）*/
export async function post_applyRec_save (d?: any) {
return await request.post< SaveResVO,SaveResVO> (basePath+'/applyRec/save', d)
}
/**请佣申请单终止*/
export async function post_applyRec_stop (d?: any) {
return await request.post< number,number> (basePath+'/applyRec/stop', d)
}
/**根据请佣ID同步请款信息至OA*/
export async function get_applyRec_toOaApplyInfo__applyId (d?: any) {
return await request.get<number,number>(basePath+'/applyRec/toOaApplyInfo/{applyId}', { params: d })
}
/**批量同步OA审核日志(OA回调)*/
export async function post_applyRec_updateAuditBatchFromOa (d?: any) {
return await request.post< OaAuditResVO[],OaAuditResVO[]> (basePath+'/applyRec/updateAuditBatchFromOa', d)
}
/**根据条件同步OA审核日志*/
export async function post_applyRec_updateOaAudit (d?: any) {
return await request.post< OaAuditResVO,OaAuditResVO> (basePath+'/applyRec/updateOaAudit', d)
}
/**根据请佣ID返回已选成交报告列表*/
export async function get_applyRecDeal_getAll__applyId (d?: any) {
return await request.get<ListVO[],ListVO[]>(basePath+'/applyRecDeal/getAll/{applyId}', { params: d })
}
/**根据成交报告ID查询是否可发起补充成交报告*/
export async function get_applyRecDeal_isCanToAddDeal__dealId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/applyRecDeal/isCanToAddDeal/{dealId}', { params: d })
}
/**根据待选成交报告逻辑ID查询是否可发起请佣*/
export async function get_applyRecDeal_isCanToApply__fromDealId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/applyRecDeal/isCanToApply/{fromDealId}', { params: d })
}
/**根据请佣ID获取请款汇总清单*/
export async function get_applyRecDealTerm_getAll__applyId (d?: any) {
return await request.get<BaseVO[],BaseVO[]>(basePath+'/applyRecDealTerm/getAll/{applyId}', { params: d })
}
/**根据页面选择的条件加载请款汇总清单数据*/
export async function post_applyRecDealTerm_getTermTotalList (d?: any) {
return await request.post< TermTotalResVO[],TermTotalResVO[]> (basePath+'/applyRecDealTerm/getTermTotalList', d)
}
/**根据条件返回附件列表*/
export async function post_applyRecFile_getAll (d?: any) {
return await request.post< ApplyRecFileBaseVO[],ApplyRecFileBaseVO[]> (basePath+'/applyRecFile/getAll', d)
}
/**待选成交报告新增*/
export async function post_deal_add (d?: any) {
return await request.post< DealSaveResVO[],DealSaveResVO[]> (basePath+'/deal/add', d)
}
/**待选成交报告请佣结算*/
export async function get_deal_calculationDeal (d?: any) {
return await request.get<any,any>(basePath+'/deal/calculationDeal', { params: d })
}
/**查询待选成交报告详细信息*/
export async function get_deal_get__id (d?: any) {
return await request.get<DealBaseVO,DealBaseVO>(basePath+'/deal/get/{id}', { params: d })
}
/**查询待选成交报告列表*/
export async function post_deal_getList (d?: any) {
return await request.post< any,any> (basePath+'/deal/getList', d)
}
/**待选成交报告修改*/
export async function post_deal_update (d?: any) {
return await request.post< DealSaveResVO[],DealSaveResVO[]> (basePath+'/deal/update', d)
}
/**抵扣项费用明细新增*/
export async function post_devDeductDetail_add (d?: any) {
return await request.post< number,number> (basePath+'/devDeductDetail/add', d)
}
/**根据冲正ID和冲正类型取消关联*/
export async function post_devDeductDetail_cancelRelation (d?: any) {
return await request.post< number[],number[]> (basePath+'/devDeductDetail/cancelRelation', d)
}
/**根据冲正单号取消关联*/
export async function get_devDeductDetail_cancelRelationByNo__correctNo (d?: any) {
return await request.get<number[],number[]>(basePath+'/devDeductDetail/cancelRelationByNo/{correctNo}', { params: d })
}
/**根据ID获取抵扣项费用明细*/
export async function get_devDeductDetail_get__id (d?: any) {
return await request.get<DevDeductDetailBaseVO,DevDeductDetailBaseVO>(basePath+'/devDeductDetail/get/{id}', { params: d })
}
/**根据冲正ID和冲正类型获取ID列表*/
export async function post_devDeductDetail_getIdList (d?: any) {
return await request.post< number[],number[]> (basePath+'/devDeductDetail/getIdList', d)
}
/**根据冲正单号（非模糊查询）获取ID列表*/
export async function get_devDeductDetail_getIdListByCorrectNo__correctNo (d?: any) {
return await request.get<number[],number[]>(basePath+'/devDeductDetail/getIdListByCorrectNo/{correctNo}', { params: d })
}
/**查询抵扣项费用明细列表*/
export async function post_devDeductDetail_getList (d?: any) {
return await request.post< any,any> (basePath+'/devDeductDetail/getList', d)
}
/**根据条件获取待冲正抵扣项费用明细列表*/
export async function post_devDeductDetail_getListAllByWait (d?: any) {
return await request.post< DevDeductDetailBaseVO[],DevDeductDetailBaseVO[]> (basePath+'/devDeductDetail/getListAllByWait', d)
}
/**查询抵扣项费用汇总列表*/
export async function post_devDeductDetail_getListSumByDev (d?: any) {
return await request.post< any,any> (basePath+'/devDeductDetail/getListSumByDev', d)
}
/**查询抵扣项费用合计*/
export async function post_devDeductDetail_getTotal (d?: any) {
return await request.post< DevDeductSumBaseVO,DevDeductSumBaseVO> (basePath+'/devDeductDetail/getTotal', d)
}
/**根据逻辑ID更新冲正信息*/
export async function post_devDeductDetail_updateCorrectInfo (d?: any) {
return await request.post< number,number> (basePath+'/devDeductDetail/updateCorrectInfo', d)
}
/**根据请佣ID获取请款抵扣金额明细*/
export async function get_devDeductRec_getAll__applyId (d?: any) {
return await request.get<any,any>(basePath+'/devDeductRec/getAll/{applyId}', { params: d })
}
/**根据请佣ID返回 其他扣除项明细 列表*/
export async function get_devOtherSub_getAll__applyId (d?: any) {
return await request.get<any,any>(basePath+'/devOtherSub/getAll/{applyId}', { params: d })
}
/**根据请佣申请单ID返回全部操作日志列表*/
export async function get_opLog_getAllListByApplyId__applyId (d?: any) {
return await request.get<OpLogListVO[],OpLogListVO[]>(basePath+'/opLog/getAllListByApplyId/{applyId}', { params: d })
}
/**根据条件获取操作日志列表*/
export async function post_opLog_getList (d?: any) {
return await request.post< OpLogListVO[],OpLogListVO[]> (basePath+'/opLog/getList', d)
}
/**批量录入回款登记信息*/
export async function post_receConfirmDetail_addBatch (d?: any) {
return await request.post< AddResVO[],AddResVO[]> (basePath+'/receConfirmDetail/addBatch', d)
}
/**查询回款登记确认明细列表*/
export async function post_receConfirmDetail_getList (d?: any) {
return await request.post< any,any> (basePath+'/receConfirmDetail/getList', d)
}
/**根据请佣ID获取回款登记详细信息列表*/
export async function get_receConfirmDetail_getListByApplyId__applyId (d?: any) {
return await request.get<any,any>(basePath+'/receConfirmDetail/getListByApplyId/{applyId}', { params: d })
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
/**AddFromPageVO*/
export interface AddFromPageVO {
/**(必填)本次请款金额，默认为对应的【系统计算本次可提金额】*/
applyMoney: number;
/**(必填)本次请款比例*/
applyPercent: number;
/**渠道公司（中介公司）经纪人，中介业务员*/
channelAgentName: string;
/**(必填)成交报告编号*/
dealCode: string;
/**(必填)待选成交报告逻辑ID*/
fromDealId: number;
/**(必填)是否达到请款条件，0否1是*/
isCanApply: number;
/**(必填)实际收款金额：不含税金额*/
noTaxMoney: number;
/**代理公司*/
oneAgentTeamName: string;
/**备注*/
remark: string;
/**项目现场销售*/
sceneSales: string;
/**(必填)实际收款金额：税额*/
taxMoney: number;
}
/**AddFromPageVO_1*/
export interface AddFromPageVO_1 {
/**(必填)本次实际请款金额（含税）*/
actMoney: number;
/**(必填)本期申请请款金额(含税)*/
applyMoney: number;
/**(必填)本期扣罚金额（含税）*/
fineMoney: number;
/**(必填)历史实际请款金额（含税）*/
hisSumActMoney: number;
/**(必填)历史已申请请款金额（含税）*/
hisSumApplyMoney: number;
/**(必填)累计请款次数(不含本次)*/
hisSumApplyNum: number;
/**(必填)已回款金额（含税）*/
hisSumReceMoney: number;
/**(必填)本期扣除金额（含税）*/
subMoney: number;
/**(必填)累计实际请款金额（含税）*/
sumActMoney: number;
/**(必填)累计申请请款金额（含税）*/
sumApplyMoney: number;
/**(必填)项目周期ID*/
termId: number;
}
/**AddFromPageVO_2*/
export interface AddFromPageVO_2 {
/**附件ID*/
fileId: string;
/**文件名，带文件后缀*/
fileName: string;
/**(必填)附件类型(Contract-合同附件、Invoice-开票资料、ApplyReport-请款报告、DealPdf-成交报告明细PDF、DeductPdf-需扣除金额明细PDF、OtherSubPdf-其他扣除项明细PDF、TermPdf-请款汇总清单PDF)*/
type: string;
}
/**AddFromPageVO_3*/
export interface AddFromPageVO_3 {
/**抵扣项费用明细逻辑ID*/
dataSourceId: number;
/**抵扣金额不含税(元)*/
subMoneyNoTax: number;
/**抵扣金额税额(元)*/
subMoneyTax: number;
}
/**AddFromPageVO_4*/
export interface AddFromPageVO_4 {
/**原因及扣罚依据*/
reason: string;
/**(必填)扣除金额*/
subMoney: number;
/**(必填)不含税金额*/
subMoneyNoTax: number;
/**(必填)税额*/
subMoneyTax: number;
/**(必填)扣除类型(Tax-税额差、Fine-扣罚、Other-其他)*/
subType: string;
/**(必填)项目周期ID*/
termId: number;
/**(必填)项目周期名称*/
termName: string;
}
/**AddListBatchVO*/
export interface AddListBatchVO {
/**(必填)回款信息*/
addReceList: AddListVO[];
}
/**AddListVO*/
export interface AddListVO {
/**(必填)请佣申请单逻辑ID*/
applyId: number;
/**(必填)回款信息*/
receiveList: AddVO[];
}
/**AddResVO*/
export interface AddResVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**回款确认逻辑ID*/
idList: number[];
}
/**AddVO*/
export interface AddVO {
/**(必填)回款金额*/
receiveMoney: number;
/**(必填)回款流水编号*/
receiveNo: string;
}
/**ApplyProcessVO*/
export interface ApplyProcessVO {
/**日志逻辑ID，主键，自增长*/
logId: number;
/**节点名称*/
processName: string;
/**时间(yyyy-MM-dd HH:mm:ss)*/
time: string;
}
/**ApplyRecBaseVO*/
export interface ApplyRecBaseVO {
/**本期实际请款金额（不含税）*/
actMoney: number;
/**本期实际请款金额（含税）*/
actMoneyTax: number;
/**本期请款金额（元）*/
applyMoney: number;
/**请佣申请单号*/
applyNo: string;
/**申请时间(yyyy-MM-dd HH:mm:ss)*/
applyTime: string;
/**发起人ID*/
applyUserId: number;
/**发起人姓名*/
applyUserName: string;
/**审核时间,记录到开票员审核通过这个节点(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**成交报告份数*/
dealCount: number;
/**甲方开票账号*/
developAccount: string;
/**甲方开票账号ID*/
developAccountId: number;
/**住所（地址）*/
developAddress: string;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称，请款单位名称*/
developName: string;
/**开户行*/
developOpenBank: string;
/**电话*/
developPhone: string;
/**纳税人识别号*/
developTaxNo: string;
/**本期扣罚金额，默认为0*/
fineMoney: number;
/**扣罚项类别*/
fineType: string;
/**逻辑ID，主键，自增长*/
id: number;
/**发票抬头(甲方公司名称)*/
invoiceTitle: string;
/**是否允许撤销*/
isCancel: boolean;
/**是否驳回，0否1是，默认0否*/
isReject: number;
/**上次请款单号*/
lastApplyNo: string;
/**OA系统流水号*/
oaSysApplyId: number;
/**事业部ID*/
orgId: number;
/**事业部名称*/
orgName: string;
/**收款公司ID（乙方公司，我司主体）*/
polyCompanyId: number;
/**收款公司名称*/
polyCompanyName: string;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**收款账号ID（乙方公司，我司主体）*/
receAccountId: number;
/**收款账号*/
receBankAccount: string;
/**联行号（收款公司）*/
receBranchNo: string;
/**经办部门意见*/
remark: string;
/**状态(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
/**本期扣除金额（元）*/
subMoney: number;
/**本期实际请款税额*/
taxMoney: number;
/**发票税率（收款公司）*/
taxRate: number;
}
/**ApplyRecFileBaseVO*/
export interface ApplyRecFileBaseVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**附件ID*/
fileId: string;
/**文件名，带文件后缀*/
fileName: string;
/**逻辑ID，主键，自增长*/
id: number;
/**OA返回的文件ID*/
oaFileId: number;
/**附件类型(Contract-合同附件、Invoice-开票资料、ApplyReport-请款报告、DealPdf-成交报告明细PDF、DeductPdf-需扣除金额明细PDF、OtherSubPdf-其他扣除项明细PDF、TermPdf-请款汇总清单PDF)*/
type: string;
}
/**ApplyRecFileConVO*/
export interface ApplyRecFileConVO {
/**(必填)请佣申请单逻辑ID*/
applyId: number;
/**附件类型列表*/
typeList: string[];
}
/**ApplyRecIsOkVo*/
export interface ApplyRecIsOkVo {
/**返回提示信息*/
msg: string;
/**是否允许*/
okFlag: boolean;
}
/**ApplyRecListVO*/
export interface ApplyRecListVO {
/**本期实际请款金额（含税）*/
actMoneyTax: number;
/**本期请款金额（元）*/
applyMoney: number;
/**请佣申请单号*/
applyNo: string;
/**申请时间(yyyy-MM-dd HH:mm:ss)*/
applyTime: string;
/**发起人ID*/
applyUserId: number;
/**发起人姓名*/
applyUserName: string;
/**审核时间,记录到开票员审核通过这个节点(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**本期扣罚金额，默认为0*/
fineMoney: number;
/**逻辑ID，主键，自增长*/
id: number;
/**是否驳回，0否1是，默认0否*/
isReject: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**状态(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
/**本期扣除金额（元）*/
subMoney: number;
}
/**ApplyRecQueryVO*/
export interface ApplyRecQueryVO {
/**请佣申请单号*/
applyNo: string;
/**申请时间：结束(yyyy-MM-dd)*/
applyTimeEnd: string;
/**申请时间：开始(yyyy-MM-dd)*/
applyTimeStart: string;
/**发起人ID*/
applyUserId: number;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**甲方公司名称*/
developName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
proId: number;
/**状态(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
}
/**AuditListVO*/
export interface AuditListVO {
/**本次实际请款金额（含税）*/
actMoneyTax: number;
/**本次请款金额（元）*/
applyMoney: number;
/**请佣申请单号*/
applyNo: string;
/**申请时间(yyyy-MM-dd HH:mm:ss)*/
applyTime: string;
/**发起人ID*/
applyUserId: number;
/**发起人姓名*/
applyUserName: string;
/**审核时间,记录到开票员审核通过这个节点(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**成交报告份数*/
dealCount: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**本次扣罚金额，默认为0*/
fineMoney: number;
/**逻辑ID，主键，自增长*/
id: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**本次扣除金额（元）*/
subMoney: number;
}
/**AuditQueryVO*/
export interface AuditQueryVO {
/**请佣申请单号*/
applyNo: string;
/**申请时间：结束(yyyy-MM-dd)*/
applyTimeEnd: string;
/**申请时间：开始(yyyy-MM-dd)*/
applyTimeStart: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**甲方公司名称*/
developName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
proId: number;
/**查询是否审核，已审核（true），未审核（false），全部（传入空）*/
queryIsAudit: boolean;
}
/**AuditUpdateDealVO*/
export interface AuditUpdateDealVO {
/**(必填)成交报告编号*/
dealCode: string;
/**(必填)已选成交报告逻辑ID*/
id: number;
/**(必填)实际收款金额：不含税金额*/
noTaxMoney: number;
/**(必填)实际收款金额：税额*/
taxMoney: number;
}
/**AuditVO*/
export interface AuditVO {
/**本期实际请款金额（不含税），财务审核时未变动可不传*/
actMoney: number;
/**(必填)请佣申请单逻辑ID*/
applyId: number;
/**(必填)是否驳回，0否1是*/
isReject: number;
/**(必填)操作前状态(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opBefore: string;
/**(必填)备注*/
remark: string;
/**本期实际请款税额，财务审核时未变动可不传*/
taxMoney: number;
/**已选成交报告财务审核时税额变动列表，未变动可不传*/
updateDealList: AuditUpdateDealVO[];
}
/**BaseVO*/
export interface BaseVO {
/**本次实际请款金额（含税）*/
actMoney: number;
/**请佣申请单逻辑ID*/
applyId: number;
/**本期申请请款金额(含税)*/
applyMoney: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**本期扣罚金额（含税）*/
fineMoney: number;
/**历史实际请款金额（含税）*/
hisSumActMoney: number;
/**历史已申请请款金额（含税）*/
hisSumApplyMoney: number;
/**累计请款次数(不含本次)*/
hisSumApplyNum: number;
/**已回款金额（含税）*/
hisSumReceMoney: number;
/**逻辑ID，主键，自增长*/
id: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**本期扣除金额（含税）*/
subMoney: number;
/**累计实际请款金额（含税）*/
sumActMoney: number;
/**累计申请请款金额（含税）*/
sumApplyMoney: number;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**BaseVO_1*/
export interface BaseVO_1 {
/**请佣申请单逻辑ID*/
applyId: number;
/**抵扣项费用明细逻辑ID*/
dataSourceId: number;
/**成交报告编号*/
dealCode: string;
/**成交报告ID*/
dealId: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**逻辑ID，主键，自增长*/
id: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**扣除金额*/
subMoney: number;
/**抵扣金额不含税(元)*/
subMoneyNoTax: number;
/**抵扣金额税额(元)*/
subMoneyTax: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
subType: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**BaseVO_2*/
export interface BaseVO_2 {
/**请佣申请单逻辑ID*/
applyId: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**逻辑ID，主键，自增长*/
id: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**原因及扣罚依据*/
reason: string;
/**扣除金额*/
subMoney: number;
/**不含税金额*/
subMoneyNoTax: number;
/**税额*/
subMoneyTax: number;
/**扣除类型(Tax-税额差、Fine-扣罚、Other-其他)*/
subType: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**BaseVO_3*/
export interface BaseVO_3 {
/**请佣申请单逻辑ID*/
applyId: number;
/**逻辑ID，主键，自增长*/
id: number;
/**回款金额*/
receiveMoney: number;
/**回款流水编号*/
receiveNo: string;
/**回款确认时间：出纳回款登记时间(yyyy-MM-dd HH:mm:ss)*/
receiveTime: string;
/**回款确认人：回款登记操作人姓名*/
receiveUserId: number;
}
/**ConVO*/
export interface ConVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**操作后状态(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opAfter: string;
}
/**CorrectConVO*/
export interface CorrectConVO {
/**(必填)冲正ID（请佣申请单逻辑ID或退款逻辑ID）*/
correctId: number;
/**(必填)冲正类型(Apply-请款抵扣、Refund-直接退款)*/
correctType: string;
}
/**CorrectVO*/
export interface CorrectVO {
/**冲正ID（请佣申请单逻辑ID或退款逻辑ID）*/
correctId: number;
/**冲正单号（请佣申请单号或退款单号）*/
correctNo: string;
/**(必填)冲正状态(Wait-待冲正、Ongoing-冲正审核中、Complete-已冲正)*/
correctStatus: string;
/**冲正时间(yyyy-MM-dd HH:mm:ss)*/
correctTime: string;
/**冲正人（指请佣申请单回款最后登记人ID或退款登记人ID）*/
correctUserId: number;
/**(必填)逻辑ID，主键，自增长*/
id: number;
}
/**DealAddVO*/
export interface DealAddVO {
/**(必填)业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**(必填)签约信息：签约面积（购买方）,成交面积*/
area: number;
/**(必填)栋座ID*/
buildingId: number;
/**渠道公司（中介公司）经纪人ID，中介业务员ID*/
channelAgentId: number;
/**渠道公司ID(中介公司ID)*/
channelId: number;
/**(必填)合同类型（购买方）(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**(必填)客户姓名，多个用“;”分隔（购买方）*/
customerName: string;
/**(必填)成交报告编号*/
dealCode: string;
/**(必填)成交报告ID*/
dealId: number;
/**(必填)成交组织ID*/
dealOrgId: number;
/**(必填)甲方公司信息列表*/
developList: DealDevelopListVO[];
/**(必填)成交报告录入人*/
entryPersonId: number;
/**成交总套数*/
houseCount: number;
/**代理公司ID，一手代理团队ID*/
oneAgentTeamId: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**(必填)项目ID*/
proId: number;
/**房产证/预售合同编号(购房)*/
propertyNo: string;
/**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、Other-其他)*/
propertyType: string;
/**备案情况(Has-有、No-无)*/
recordState: string;
/**明源房款回笼比例(%)*/
returnRatio: number;
/**室*/
room: number;
/**(必填)房号ID*/
roomId: number;
/**项目现场销售*/
sceneSales: string;
/**(必填)签约信息：签约时间（购买方），签约日期(yyyy-MM-dd)*/
signDate: string;
/**(必填)签约信息：签约金额（购买方）,签约总价（元）*/
signPrice: number;
/**(必填)签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**(必填)认购时间（购买方），认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**(必填)项目周期ID*/
termId: number;
}
/**DealBaseVO*/
export interface DealBaseVO {
/**业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**签约信息：签约面积（购买方）,成交面积*/
area: number;
/**栋座ID*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**应可请款金额*/
canApplyAmount: number;
/**当前可请款金额，系统计算本次可请款金额*/
canApplyAmountNow: number;
/**渠道公司（中介公司）经纪人ID，中介业务员ID*/
channelAgentId: number;
/**渠道公司（中介公司）经纪人，中介业务员*/
channelAgentName: string;
/**渠道公司ID(中介公司ID)*/
channelId: number;
/**渠道公司名称(中介公司名称)*/
channelName: string;
/**合同类型（购买方）(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**客户姓名，多个用“;”分隔（购买方）*/
customerName: string;
/**成交报告编号*/
dealCode: string;
/**成交报告ID*/
dealId: number;
/**成交组织ID*/
dealOrgId: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**成交报告录入人*/
entryPersonId: number;
/**成交总套数*/
houseCount: number;
/**逻辑ID，主键，自增长*/
id: number;
/**是否达到请款条件，0否1是*/
isCanApply: number;
/**代理费金额：已提未回款金额*/
noConfirmAmount: number;
/**代理费金额：未收*/
noReceiveAmount: number;
/**代理公司ID，一手代理团队ID*/
oneAgentTeamId: number;
/**代理公司名称，一手代理团队名称*/
oneAgentTeamName: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**乙方公司（我司主体）ID*/
polyCompanyId: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**房产证/预售合同编号(购房)*/
propertyNo: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、Other-其他)*/
propertyType: string;
/**乙方（我司主体）收款账号ID*/
receAccountId: number;
/**代理费金额：应收*/
receiveAmount: number;
/**代理费金额：已收*/
receivedAmount: number;
/**备案情况(Has-有、No-无)*/
recordState: string;
/**获取应可请款金额、是否达到请款条件的查询条件*/
requestCon: string;
/**返回结果*/
resultInfo: string;
/**返回结果时间(yyyy-MM-dd HH:mm:ss)*/
resultTime: string;
/**明源房款回笼比例(%)*/
returnRatio: number;
/**室*/
room: number;
/**房号ID*/
roomId: number;
/**房号名称*/
roomName: string;
/**项目现场销售*/
sceneSales: string;
/**签约信息：签约时间（购买方），签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约信息：签约金额（购买方）,签约总价（元）*/
signPrice: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**认购时间（购买方），认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**最新补充成交报告编号*/
suppDealCode: string;
/**最新补充成交报告ID*/
suppDealId: number;
/**最新补充成交报告更新时间(yyyy-MM-dd HH:mm:ss)*/
suppDealTime: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
/**该周期所归属的事业部ID层级*/
termOrgId: number;
}
/**DealDevelopListVO*/
export interface DealDevelopListVO {
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**(必填)代理费金额：应收*/
receiveAmount: number;
}
/**DealListVO*/
export interface DealListVO {
/**业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**签约信息：签约面积（购买方）,成交面积*/
area: number;
/**栋座ID*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**当前可请款金额，系统计算本次可请款金额*/
canApplyAmountNow: number;
/**渠道公司（中介公司）经纪人ID，中介业务员ID*/
channelAgentId: number;
/**渠道公司（中介公司）经纪人，中介业务员*/
channelAgentName: string;
/**渠道公司ID(中介公司ID)*/
channelId: number;
/**渠道公司名称(中介公司名称)*/
channelName: string;
/**合同类型（购买方）(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**客户姓名，多个用“;”分隔（购买方）*/
customerName: string;
/**成交报告编号*/
dealCode: string;
/**成交报告ID*/
dealId: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**逻辑ID，主键，自增长*/
id: number;
/**是否达到请款条件，0否1是*/
isCanApply: number;
/**代理费金额：已提未回款金额*/
noConfirmAmount: number;
/**代理费金额：未收*/
noReceiveAmount: number;
/**代理公司ID，一手代理团队ID*/
oneAgentTeamId: number;
/**代理公司名称，一手代理团队名称*/
oneAgentTeamName: string;
/**乙方公司（我司主体）ID*/
polyCompanyId: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**房产证/预售合同编号(购房)*/
propertyNo: string;
/**乙方（我司主体）收款账号ID*/
receAccountId: number;
/**代理费金额：应收*/
receiveAmount: number;
/**代理费金额：已收*/
receivedAmount: number;
/**房号ID*/
roomId: number;
/**房号名称*/
roomName: string;
/**项目现场销售*/
sceneSales: string;
/**签约信息：签约时间（购买方），签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约信息：签约金额（购买方）,签约总价（元）*/
signPrice: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**认购时间（购买方），认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
/**该周期所归属的事业部ID层级*/
termOrgId: number;
}
/**DealQueryVO*/
export interface DealQueryVO {
/**业绩确认时间：结束(yyyy-MM-dd)*/
achieveConfirmTimeEnd: string;
/**业绩确认时间:开始(yyyy-MM-dd)*/
achieveConfirmTimeStart: string;
/**合同类型（购买方）(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**成交报告编号*/
dealCode: string;
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**是否达到请款条件，0否1是*/
isCanApply: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**(必填)乙方公司（我司主体）ID*/
polyCompanyId: number;
/**(必填)项目ID*/
proId: number;
/**(必填)乙方（我司主体）收款账号ID*/
receAccountId: number;
/**项目周期ID*/
termId: number;
/**(必填)该周期所归属的事业部ID层级*/
termOrgId: number;
}
/**DealSaveResVO*/
export interface DealSaveResVO {
/**成交报告ID*/
dealId: number;
/**抵扣项费用逻辑ID*/
devDeductDetailId: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**逻辑ID*/
id: number;
}
/**DealUpdatetVO*/
export interface DealUpdatetVO {
/**(必填)业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**(必填)签约信息：签约面积（购买方）,成交面积*/
area: number;
/**(必填)栋座ID*/
buildingId: number;
/**渠道公司（中介公司）经纪人ID，中介业务员ID*/
channelAgentId: number;
/**渠道公司ID(中介公司ID)*/
channelId: number;
/**(必填)合同类型（购买方）(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**(必填)客户姓名，多个用“;”分隔（购买方）*/
customerName: string;
/**(必填)成交报告编号*/
dealCode: string;
/**(必填)成交报告ID*/
dealId: number;
/**(必填)成交组织ID*/
dealOrgId: number;
/**(必填)甲方公司信息列表*/
developList: DealDevelopListVO[];
/**(必填)成交报告录入人*/
entryPersonId: number;
/**成交总套数*/
houseCount: number;
/**代理公司ID，一手代理团队ID*/
oneAgentTeamId: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**(必填)项目ID*/
proId: number;
/**房产证/预售合同编号(购房)*/
propertyNo: string;
/**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、Other-其他)*/
propertyType: string;
/**备案情况(Has-有、No-无)*/
recordState: string;
/**明源房款回笼比例(%)*/
returnRatio: number;
/**室*/
room: number;
/**(必填)房号ID*/
roomId: number;
/**项目现场销售*/
sceneSales: string;
/**(必填)签约信息：签约时间（购买方），签约日期(yyyy-MM-dd)*/
signDate: string;
/**(必填)签约信息：签约金额（购买方）,签约总价（元）*/
signPrice: number;
/**(必填)签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**(必填)认购时间（购买方），认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**(必填)抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**(必填)最新补充成交报告编号*/
suppDealCode: string;
/**(必填)最新补充成交报告ID*/
suppDealId: number;
/**(必填)项目周期ID*/
termId: number;
}
/**DelResVO*/
export interface DelResVO {
/**请佣逻辑ID*/
applyId: number;
/**请佣申请单号*/
applyNo: string;
/**删除已选的成交报告数量*/
delDealCount: number;
/**删除已选的本期需抵扣金额明细数量*/
delDeductCount: number;
/**删除已保存的附件记录数量*/
delFileCount: number;
/**删除日志数量*/
delOpLogcount: number;
/**删除已录入的其他扣除项数量*/
delOtherSubCount: number;
/**删除已录入的请款汇总清单数量*/
delTermCount: number;
}
/**DevDeductDetailAddVO*/
export interface DevDeductDetailAddVO {
/**(必填)变更后应请款金额（元）*/
apllyMoneyShouldNew: number;
/**(必填)已请款金额（元）*/
applyMoneyGet: number;
/**(必填)合同类型(购买方)(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**(必填)冲正类型(Apply-请款抵扣、Refund-直接退款)*/
correctType: string;
/**(必填)发起抵扣项费用明细人ID*/
creationUserId: number;
/**(必填)产生时间(yyyy-MM-dd HH:mm:ss)*/
cteationTime: string;
/**(必填)主成交报告编号*/
dealCode: string;
/**(必填)主成交报告ID*/
dealId: number;
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**(必填)项目ID*/
proId: number;
/**(必填)产生抵扣费用金额（元）*/
subMoney: number;
/**(必填)抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**(必填)补充成交报告编号*/
suppDealCode: string;
/**(必填)补充成交报告ID*/
suppDealId: number;
/**(必填)项目周期ID*/
termId: number;
}
/**DevDeductDetailBaseVO*/
export interface DevDeductDetailBaseVO {
/**变更后应请款金额（元）*/
apllyMoneyShouldNew: number;
/**已请款金额（元）*/
applyMoneyGet: number;
/**合同类型(购买方)(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**冲正ID（请佣申请单逻辑ID或退款逻辑ID）*/
correctId: number;
/**冲正单号（请佣申请单号或退款单号）*/
correctNo: string;
/**冲正状态(Wait-待冲正、Ongoing-冲正审核中、Complete-已冲正)*/
correctStatus: string;
/**冲正时间(yyyy-MM-dd HH:mm:ss)*/
correctTime: string;
/**冲正类型(Apply-请款抵扣、Refund-直接退款)*/
correctType: string;
/**冲正人（指请佣申请单回款最后登记人ID或退款登记人ID）*/
correctUserId: number;
/**发起抵扣项费用明细人ID*/
creationUserId: number;
/**产生时间(yyyy-MM-dd HH:mm:ss)*/
cteationTime: string;
/**主成交报告编号*/
dealCode: string;
/**主成交报告ID*/
dealId: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**逻辑ID，主键，自增长*/
id: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**产生抵扣费用金额（元）*/
subMoney: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**补充成交报告编号*/
suppDealCode: string;
/**补充成交报告ID*/
suppDealId: number;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**DevDeductDetailQueryVO*/
export interface DevDeductDetailQueryVO {
/**冲正单号（请佣申请单号或退款单号）*/
correctNo: string;
/**冲正状态(Wait-待冲正、Ongoing-冲正审核中、Complete-已冲正)*/
correctStatus: string;
/**冲正时间：结束(yyyy-MM-dd)*/
correctTimeEnd: string;
/**冲正时间:开始(yyyy-MM-dd)*/
correctTimeStart: string;
/**冲正类型(Apply-请款抵扣、Refund-直接退款)*/
correctType: string;
/**产生时间：结束(yyyy-MM-dd)*/
cteationTimeEnd: string;
/**产生时间:开始(yyyy-MM-dd)*/
cteationTimeStart: string;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**补充成交报告编号*/
suppDealCode: string;
}
/**DevDeductSumBaseVO*/
export interface DevDeductSumBaseVO {
/**已冲正抵扣项费用（元）*/
completeSumSubMoney: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**冲正中抵扣项费用（元）*/
ongoingSumSubMoney: number;
/**已产生抵扣项费用（元）*/
sumSubMoney: number;
/**待冲正抵扣项费用（元）*/
waitSumSubMoney: number;
}
/**DevDeductSumQueryVO*/
export interface DevDeductSumQueryVO {
/**甲方公司名称*/
developName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**DevDeductTotalQueryVO*/
export interface DevDeductTotalQueryVO {
/**甲方公司名称*/
developName: string;
}
/**FlowComment*/
export interface FlowComment {
/**事项id*/
affairId: number;
/**审核时间(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**审核类型*/
auditType: string;
/**审核类型名称*/
auditTypeDesc: string;
/**审核用户id*/
auditUserId: number;
/**审核用户姓名*/
auditUserName: string;
/**审核意见内容*/
content: string;
/**部门id*/
departmentId: number;
/**部门名称*/
departmentName: string;
/**拓展属性1*/
extAttr1: string;
/**拓展属性2*/
extAttr2: string;
/**拓展属性3*/
extAttr3: string;
/**id*/
id: number;
/**节点名称*/
nodeName: string;
/**节点用户*/
nodeUserName: string;
/**组织id*/
orgId: number;
/**组织名称*/
orgName: string;
/**岗位id*/
postId: number;
/**岗位名称*/
postName: string;
/**流程id*/
summaryId: number;
}
/**GetIdConVO*/
export interface GetIdConVO {
/**甲方公司名称*/
developName: string;
}
/**GetLastApplyNoVO*/
export interface GetLastApplyNoVO {
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**(必填)收款公司ID（乙方公司，我司主体）*/
polyCompanyId: number;
}
/**InfoVO*/
export interface InfoVO {
/**本次实际请款金额（含税）*/
actMoneyTax: number;
/**本次请款金额（元）*/
applyMoney: number;
/**请佣申请单号*/
applyNo: string;
/**申请时间(yyyy-MM-dd HH:mm:ss)*/
applyTime: string;
/**发起人ID*/
applyUserId: number;
/**发起人姓名*/
applyUserName: string;
/**审核时间,记录到开票员审核通过这个节点(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**本次扣罚金额，默认为0*/
fineMoney: number;
/**请佣逻辑ID*/
id: number;
/**回款信息：未回款金额*/
noReceMoney: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**回款信息：已回款金额*/
receMoney: number;
/**回款确认时间：出纳回款登记时间(yyyy-MM-dd HH:mm:ss)*/
receiveTime: string;
/**回款确认人：回款登记操作人ID*/
receiveUserId: number;
/**回款确认人：回款登记操作人姓名*/
receiveUserName: number;
/**回款信息：应回款金额*/
shuoldReceMoney: number;
/**状态，判断状态：Confirm 显示待回款，Complete 显示已回款(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
/**本次扣除金额（元）*/
subMoney: number;
}
/**InvoiceMakeOrRedVO*/
export interface InvoiceMakeOrRedVO {
/**(必填)请佣申请单逻辑ID*/
applyId: number;
/**(必填)操作（开票：InvoiceMake,红冲：RedInvoice)(Submit-提交、Cancel-撤回、Stop-终止、Audit-审核、InvoiceApply-发起开票申请、SaveAndInvoiceApply-保存并发起开票申请、InvoiceMake-开票、RedInvoice-红冲、Confirm-回款登记)*/
op: string;
/**操作后状态，红冲时必传(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opAfter: string;
/**备注*/
remark: string;
}
/**ListVO*/
export interface ListVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**本次请款金额，默认为对应的【系统计算本次可提金额】*/
applyMoney: number;
/**本次请款比例*/
applyPercent: number;
/**签约信息：签约面积（购买方）,成交面积*/
area: number;
/**栋座ID*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**当前可请款金额，系统计算本次可请款金额*/
canApplyAmountNow: number;
/**渠道公司（中介公司）经纪人，中介业务员*/
channelAgentName: string;
/**渠道公司ID(中介公司ID)*/
channelId: number;
/**渠道公司名称(中介公司名称)*/
channelName: string;
/**合同类型（购买方）(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**客户姓名，多个用“;”分隔（购买方）*/
customerName: string;
/**成交报告编号*/
dealCode: string;
/**成交报告ID*/
dealId: number;
/**待选成交报告逻辑ID*/
fromDealId: number;
/**逻辑ID，主键，自增长*/
id: number;
/**是否达到请款条件，0否1是*/
isCanApply: number;
/**提佣金额：已提未回款金额*/
noConfirmAmount: number;
/**提佣金额：未提金额*/
noReceiveAmount: number;
/**实际收款金额：不含税金额*/
noTaxMoney: number;
/**代理公司*/
oneAgentTeamName: string;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**房产证/预售合同编号(购房)*/
propertyNo: string;
/**提佣金额：应提金额*/
receiveAmount: number;
/**提佣金额：已提金额*/
receivedAmount: number;
/**备注*/
remark: string;
/**房号ID*/
roomId: number;
/**房号名称*/
roomName: string;
/**项目现场销售*/
sceneSales: string;
/**签约信息：签约时间（购买方），签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约信息：签约金额（购买方）,签约总价（元）*/
signPrice: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**认购时间（购买方），认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**实际收款金额：税额*/
taxMoney: number;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**OaAuditConVO*/
export interface OaAuditConVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**OA系统流水号*/
oaSysApplyId: number;
}
/**OaAuditResVO*/
export interface OaAuditResVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**请佣申请单号*/
applyNo: string;
/**错误信息*/
errMsg: string;
/**Oa日志流水号对应的操作日志ID列表*/
logList: OaLogResVO[];
/**OA系统流水号*/
oaSysApplyId: number;
}
/**OaFlowInfoModel*/
export interface OaFlowInfoModel {
/**OA流程审批日志*/
commentList: FlowComment[];
/**OA流程状态枚举(Process-处理中、Pass-通过、NoPass-不通过)*/
stateEnum: string;
/**OA流程ID*/
summaryId: number;
}
/**OaLogResVO*/
export interface OaLogResVO {
/**逻辑ID，主键，自增长*/
id: number;
/**OA系统流水号，OA唯一标识*/
oaSysId: number;
}
/**OpLogListVO*/
export interface OpLogListVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**逻辑ID，主键，自增长*/
id: number;
/**OA系统流水号，OA唯一标识*/
oaSysId: number;
/**操作(Submit-提交、Cancel-撤回、Stop-终止、Audit-审核、InvoiceApply-发起开票申请、SaveAndInvoiceApply-保存并发起开票申请、InvoiceMake-开票、RedInvoice-红冲、Confirm-回款登记)*/
op: string;
/**操作后状态(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opAfter: string;
/**操作前状态(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opBefore: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
opTime: string;
/**操作人ID*/
opUserId: number;
/**岗位*/
opUserJob: string;
/**操作人姓名*/
opUserName: string;
/**备注*/
remark: string;
/**处理结果*/
result: string;
}
/**QueryVO*/
export interface QueryVO {
/**请佣申请单号*/
applyNo: string;
/**申请时间：结束(yyyy-MM-dd)*/
applyTimeEnd: string;
/**申请时间：开始(yyyy-MM-dd)*/
applyTimeStart: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**甲方公司名称*/
developName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
proId: number;
/**状态：回款待确认(Confirm)；回款已确认(Complete)，全部(不传值)(Draft-草稿、PlatformClerk-待平台文员审核、BusinessMan-待分公司业管审核、BranchAccount-待分公司财务审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待分公司业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
}
/**QueryWaitVO*/
export interface QueryWaitVO {
/**(必填)冲正类型(Apply-请款抵扣、Refund-直接退款)*/
correctType: string;
/**(必填)甲方公司（即开发商）ID*/
developId: number;
}
/**SaveFromPageVO*/
export interface SaveFromPageVO {
/**(必填)本期实际请款金额（不含税）*/
actMoney: number;
/**(必填)本期实际请款金额（含税）*/
actMoneyTax: number;
/**(必填)本期请款金额（元）*/
applyMoney: number;
/**(必填)发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**(必填)待请款列表*/
dealList: AddFromPageVO[];
/**本期需抵扣金额明细*/
deductRecList: AddFromPageVO_3[];
/**(必填)甲方开票账号*/
developAccount: string;
/**(必填)甲方开票账号ID*/
developAccountId: number;
/**(必填)住所（地址）*/
developAddress: string;
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**(必填)开户行*/
developOpenBank: string;
/**(必填)电话*/
developPhone: string;
/**(必填)纳税人识别号*/
developTaxNo: string;
/**(必填)附件列表*/
fileList: AddFromPageVO_2[];
/**(必填)本期扣罚金额，默认为0*/
fineMoney: number;
/**扣罚项类别*/
fineType: string;
/**逻辑ID，主键，自增长，首次暂存或提交为空，其他不为空*/
id: number;
/**(必填)发票抬头(甲方公司名称)*/
invoiceTitle: string;
/**上次请款单号*/
lastApplyNo: string;
/**操作，暂存传入空，提交Submit,保存并发起开票申请SaveAndInvoiceApply(Submit-提交、Cancel-撤回、Stop-终止、Audit-审核、InvoiceApply-发起开票申请、SaveAndInvoiceApply-保存并发起开票申请、InvoiceMake-开票、RedInvoice-红冲、Confirm-回款登记)*/
op: string;
/**(必填)事业部ID*/
orgId: number;
/**其他扣除项*/
otherSubList: AddFromPageVO_4[];
/**(必填)收款公司ID（乙方公司，我司主体）*/
polyCompanyId: number;
/**(必填)项目ID*/
proId: number;
/**(必填)收款账号ID（乙方公司，我司主体）*/
receAccountId: number;
/**(必填)收款账号*/
receBankAccount: string;
/**(必填)联行号（收款公司）*/
receBranchNo: string;
/**(必填)经办部门意见*/
remark: string;
/**(必填)本期扣除金额（元）*/
subMoney: number;
/**(必填)本期实际请款税额*/
taxMoney: number;
/**(必填)发票税率（收款公司）*/
taxRate: number;
/**请款汇总清单*/
termList: AddFromPageVO_1[];
}
/**SaveResVO*/
export interface SaveResVO {
/**新增成交报告列表信息ID列表/待请款列表*/
addDealIdList: number[];
/**新增本期需抵扣金额明细ID列表*/
addDeductRecIdList: number[];
/**新增附件记录ID列表*/
addFileIdList: number[];
/**新增其他扣除项ID列表*/
addOtherSubIdList: number[];
/**新增请款汇总清单ID列表*/
addTermIdList: number[];
/**请佣逻辑ID*/
applyId: number;
/**取消关联抵扣项费用明细ID列表*/
cancelDeductIdList: number[];
/**关联抵扣项费用明细ID列表*/
deductIdList: number[];
/**删除已选的成交报告数量*/
delDealCount: number;
/**删除已选的本期需抵扣金额明细数量*/
delDeductCount: number;
/**删除已保存的附件记录数量*/
delFileCount: number;
/**删除已录入的其他扣除项数量*/
delOtherSubCount: number;
/**删除已录入的请款汇总清单数量*/
delTermCount: number;
/**日志ID*/
logId: number;
}
/**StopVO*/
export interface StopVO {
/**(必填)请佣申请单逻辑ID*/
applyId: number;
/**(必填)备注*/
remark: string;
}
/**TermTotalConVO*/
export interface TermTotalConVO {
/**甲方公司（即开发商）ID*/
developId: number;
/**事业部ID*/
orgId: number;
/**收款公司ID（乙方公司，我司主体）*/
polyCompanyId: number;
/**项目ID*/
proId: number;
/**收款账户ID（乙方公司，我司主体）*/
receAccountId: number;
/**周期ID列表*/
termIdList: number[];
}
/**TermTotalResVO*/
export interface TermTotalResVO {
/**历史实际请款金额（含税）*/
hisSumActMoney: number;
/**历史已申请请款金额（含税）*/
hisSumApplyMoney: number;
/**累计请款次数(不含本次)*/
hisSumApplyNum: number;
/**已回款金额（含税）*/
hisSumReceMoney: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
}
