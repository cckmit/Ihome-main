/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-1-14 6:47:54 ├F10: PM┤
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
/**根据请佣ID返回详细信息*/
export async function get_applyRec_getApplyRecById__applyId (d?: any) {
return await request.get<ApplyRecBaseVO,ApplyRecBaseVO>(basePath+'/applyRec/getApplyRecById/{applyId}', { params: d })
}
/**查询请佣申请审核列表*/
export async function post_applyRec_getAuditList (d?: any) {
return await request.post< any,any> (basePath+'/applyRec/getAuditList', d)
}
/**获取上次请款单号、请款累计汇总信息*/
export async function post_applyRec_getHisRec (d?: any) {
return await request.post< GetHisSumRecVO,GetHisSumRecVO> (basePath+'/applyRec/getHisRec', d)
}
/**根据条件获取请佣ID列表(状态：已完成)*/
export async function post_applyRec_getIdByCon (d?: any) {
return await request.post< number[],number[]> (basePath+'/applyRec/getIdByCon', d)
}
/**查询请佣申请列表*/
export async function post_applyRec_getList (d?: any) {
return await request.post< any,any> (basePath+'/applyRec/getList', d)
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
export async function post_applyRec_stop__applyId (d?: any) {
return await request.post< number,number> (basePath+'/applyRec/stop/{applyId}', d)
}
/**同步OA审核日志*/
export async function post_applyRec_updateOaAudit__applyId (d?: any) {
return await request.post< number,number> (basePath+'/applyRec/updateOaAudit/{applyId}', d)
}
/**根据请佣ID返回已选成交报告列表*/
export async function get_applyRecDeal_getAll__applyId (d?: any) {
return await request.get<ListVO[],ListVO[]>(basePath+'/applyRecDeal/getAll/{applyId}', { params: d })
}
/**根据页面选择的信息加载项目周期请款汇总数据*/
export async function post_applyRecDeal_getTermTotalList (d?: any) {
return await request.post< GetTermTotalResVO[],GetTermTotalResVO[]> (basePath+'/applyRecDeal/getTermTotalList', d)
}
/**根据成交报告ID查询是否可发起补充成交报告*/
export async function get_applyRecDeal_isCanToAddDeal__dealId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/applyRecDeal/isCanToAddDeal/{dealId}', { params: d })
}
/**根据待选成交报告逻辑ID查询是否可发起请佣*/
export async function get_applyRecDeal_isCanToApply__fromDealId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/applyRecDeal/isCanToApply/{fromDealId}', { params: d })
}
/**根据请佣ID获取项目周期请款汇总记录*/
export async function get_applyRecDealTerm_getAll__applyId (d?: any) {
return await request.get<any,any>(basePath+'/applyRecDealTerm/getAll/{applyId}', { params: d })
}
/**根据请佣ID获取所包含项目周期合同信息记录*/
export async function get_applyRecDealTerm_getAllContractList__applyId (d?: any) {
return await request.get<ContractListVO[],ContractListVO[]>(basePath+'/applyRecDealTerm/getAllContractList/{applyId}', { params: d })
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
/**根据请佣ID返回已选甲方公司应扣除代理费明细列表*/
export async function get_devAgentFee_getAll__applyId (d?: any) {
return await request.get<DevAgentFeeListVO[],DevAgentFeeListVO[]>(basePath+'/devAgentFee/getAll/{applyId}', { params: d })
}
/**抵扣项费用明细新增*/
export async function post_devDeductDetail_add (d?: any) {
return await request.post< number,number> (basePath+'/devDeductDetail/add', d)
}
/**根据ID获取抵扣项费用明细*/
export async function get_devDeductDetail_get__id (d?: any) {
return await request.get<DevDeductDetailBaseVo,DevDeductDetailBaseVo>(basePath+'/devDeductDetail/get/{id}', { params: d })
}
/**根据冲正单号（非模糊查询）获取ID列表*/
export async function get_devDeductDetail_getIdListByCorrectNo__correctNo (d?: any) {
return await request.get<number[],number[]>(basePath+'/devDeductDetail/getIdListByCorrectNo/{correctNo}', { params: d })
}
/**查询抵扣项费用明细列表*/
export async function post_devDeductDetail_getList (d?: any) {
return await request.post< any,any> (basePath+'/devDeductDetail/getList', d)
}
/**根据甲方公司ID获取待冲正抵扣项费用明细列表*/
export async function get_devDeductDetail_getListAllByWait__developId (d?: any) {
return await request.get<DevDeductDetailBaseVo[],DevDeductDetailBaseVo[]>(basePath+'/devDeductDetail/getListAllByWait/{developId}', { params: d })
}
/**查询抵扣项费用汇总列表*/
export async function post_devDeductDetail_getListSumByDev (d?: any) {
return await request.post< any,any> (basePath+'/devDeductDetail/getListSumByDev', d)
}
/**查询抵扣项费用合计*/
export async function post_devDeductDetail_getTotal (d?: any) {
return await request.post< DevDeductSumBaseVo,DevDeductSumBaseVo> (basePath+'/devDeductDetail/getTotal', d)
}
/**根据逻辑ID更新冲正状态、冲正人、冲正单号、冲正时间*/
export async function post_devDeductDetail_updateCorrectInfo (d?: any) {
return await request.post< number,number> (basePath+'/devDeductDetail/updateCorrectInfo', d)
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
return await request.get<BaseVO[],BaseVO[]>(basePath+'/receConfirmDetail/getListByApplyId/{applyId}', { params: d })
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
/**(必填)本次扣除金额，默认为0*/
subMoney: number;
/**扣除项类别*/
subType: string;
/**(必填)实际收款金额：税额*/
taxMoney: number;
/**(必填)开票税率*/
taxRate: number;
}
/**AddFromPageVO_1*/
export interface AddFromPageVO_1 {
/**(必填)本次实际请款金额（含税）*/
actMoney: number;
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**(必填)历史实际请款金额（含税）*/
hisSumActMoney: number;
/**(必填)历史已申请请款金额（含税）*/
hisSumApplyMoney: number;
/**(必填)累计请款次数*/
hisSumApplyNum: number;
/**(必填)已回款金额（含税）*/
hisSumReceMoney: number;
/**(必填)累计扣除金额（含税）*/
hisSumSubMoney: number;
/**(必填)乙方公司（我司主体）ID*/
polyCompanyId: number;
/**(必填)项目ID*/
proId: number;
/**(必填)乙方（我司主体）收款账号ID*/
receAccountId: number;
/**(必填)累计实际请款金额（含税）*/
sumActMoney: number;
/**(必填)项目周期ID*/
termId: number;
}
/**AddFromPageVO_2*/
export interface AddFromPageVO_2 {
/**附件ID*/
fileId: string;
/**文件名，带文件后缀*/
fileName: string;
/**(必填)附件类型(Contract-合同附件、Invoice-开票资料、ApplyReport-请款报告、DealPDF-成交报告明细PDF、TermPDF-项目周期请款汇总PDF、AgentFeePDF-甲方公司应扣除代理费明细PDF)*/
type: string;
}
/**AddListFromPageVO*/
export interface AddListFromPageVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**(必填)附件列表*/
fileList: AddFromPageVO_2[];
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
/**ApplyRecBaseVO*/
export interface ApplyRecBaseVO {
/**本次实际请款金额（不含税）*/
actMoney: number;
/**本次实际请款金额（含税）*/
actMoneyTax: number;
/**本次请款金额（元）*/
applyMoney: number;
/**请佣申请单号*/
applyNo: string;
/**申请时间(yyyy-MM-dd HH:mm:ss)*/
applyTime: string;
/**申请费用类型(SaleAgentFee-销售代理费)*/
applyType: string;
/**发起人ID*/
applyUserId: number;
/**发起人姓名*/
applyUserName: string;
/**区域ID，发起人所属事业部ID，即组织ID*/
applyUserOrgId: number;
/**区域名称，发起人所属事业部，即组织*/
applyUserOrgName: string;
/**审核时间,记录到开票员审核通过这个节点(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**联行号*/
branchNo: string;
/**成交报告份数*/
dealCount: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**本次扣罚金额，默认为0*/
fineMoney: number;
/**扣罚项类别*/
fineType: string;
/**逻辑ID，主键，自增长*/
id: number;
/**是否驳回，0否1是，默认0否*/
isReject: number;
/**上次请款单号*/
lastApplyNo: string;
/**OA系统流水号*/
oaSysApplyId: number;
/**乙方公司（我司主体）ID*/
polyCompanyId: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**乙方（我司主体）收款账号ID*/
receAccountId: number;
/**经办部门意见*/
remark: string;
/**银行账号*/
sellerBankAccount: string;
/**收款单位名称*/
sellerName: string;
/**支行*/
sellerOpeningBankBranch: string;
/**开户行所属银行*/
sellerOpeningBankType: string;
/**纳税人识别号*/
sellerTaxNo: string;
/**状态(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
/**本次扣除金额（元）*/
subMoney: number;
/**累计实际请款不含税金额*/
sumActMoney: number;
/**累计实际请款金额*/
sumActMoneyTax: number;
/**累计实际请款税额*/
sumTaxMoney: number;
/**本次实际请款税额*/
taxMoney: number;
/**开票税率*/
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
/**所使用的模板ID*/
templateId: string;
/**附件类型(Contract-合同附件、Invoice-开票资料、ApplyReport-请款报告、DealPDF-成交报告明细PDF、TermPDF-项目周期请款汇总PDF、AgentFeePDF-甲方公司应扣除代理费明细PDF)*/
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
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**甲方公司（即开发商）ID*/
developId: number;
/**甲方公司名称*/
developName: string;
/**逻辑ID，主键，自增长*/
id: number;
/**是否驳回，0否1是，默认0否*/
isReject: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**状态(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
/**本次扣除金额（元）*/
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
/**状态(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
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
/**AuditVO*/
export interface AuditVO {
/**(必填)请佣申请单逻辑ID*/
applyId: number;
/**(必填)是否驳回，0否1是*/
isReject: number;
/**(必填)操作前状态(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opBefore: string;
/**(必填)备注*/
remark: string;
}
/**BaseVO*/
export interface BaseVO {
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
/**操作后状态(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opAfter: string;
}
/**ContractListVO*/
export interface ContractListVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**模式属性(甲方)(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
attributeEnum: string;
/**合同信息(跟甲方的合同)，多个合同以英文“;”分隔*/
contractInfo: string;
/**逻辑ID，主键，自增长*/
id: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
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
/**(必填)合同编号(购房)*/
propertyNo: string;
/**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
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
/**甲方公司名称*/
developName: string;
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
/**合同编号(购房)*/
propertyNo: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
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
tremOrgId: number;
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
/**合同编号(购房)*/
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
tremOrgId: number;
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
/**项目ID*/
proId: number;
/**(必填)乙方（我司主体）收款账号ID*/
receAccountId: number;
/**项目周期ID*/
termId: number;
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
/**(必填)合同编号(购房)*/
propertyNo: string;
/**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
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
/**DevAgentFeeListVO*/
export interface DevAgentFeeListVO {
/**请佣申请单逻辑ID*/
applyId: number;
/**数据来源(Deal-成交报告、DeductDetail-抵扣项费用明细)*/
dataSource: string;
/**数据来源逻辑ID*/
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
/**扣除代理费*/
subMoney: number;
/**抵扣项类别*/
subType: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**DevDeductDetailAddVo*/
export interface DevDeductDetailAddVo {
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
/**DevDeductDetailBaseVo*/
export interface DevDeductDetailBaseVo {
/**变更后应请款金额（元）*/
apllyMoneyShouldNew: number;
/**已请款金额（元）*/
applyMoneyGet: number;
/**合同类型(购买方)(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
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
/**DevDeductDetailCorrectVo*/
export interface DevDeductDetailCorrectVo {
/**冲正单号（请佣申请单号或退款单号）*/
correctNo: string;
/**(必填)冲正状态(Wait-待冲正、Ongoing-冲正审核中、Complete-已冲正)*/
correctStatus: string;
/**冲正人（指请佣申请单回款最后登记人ID或退款登记人ID）*/
correctUserId: number;
/**(必填)逻辑ID，主键，自增长*/
id: number;
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
/**DevDeductSumBaseVo*/
export interface DevDeductSumBaseVo {
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
/**GetHisSumConVO*/
export interface GetHisSumConVO {
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**(必填)乙方公司（我司主体）ID*/
polyCompanyId: number;
}
/**GetHisSumRecVO*/
export interface GetHisSumRecVO {
/**上次请款单号*/
lastApplyNo: string;
/**累计实际请款不含税金额*/
sumActMoney: number;
/**累计实际请款金额*/
sumActMoneyTax: number;
/**累计实际请款税额*/
sumTaxMoney: number;
}
/**GetIdConVO*/
export interface GetIdConVO {
/**甲方公司名称*/
developName: string;
}
/**GetTermTotalConVO*/
export interface GetTermTotalConVO {
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**(必填)乙方公司（我司主体）ID*/
polyCompanyId: number;
/**(必填)已选成交报告所包含周期ID、项目ID列表*/
termProList: TermProVO[];
}
/**GetTermTotalResVO*/
export interface GetTermTotalResVO {
/**历史实际请款金额（含税）*/
hisSumActMoney: number;
/**历史已申请请款金额（含税）*/
hisSumApplyMoney: number;
/**累计请款次数*/
hisSumApplyNum: number;
/**已回款金额（含税）*/
hisSumReceMoney: number;
/**累计扣除金额（含税）*/
hisSumSubMoney: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
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
/**状态，判断状态：Confirm 显示待回款，Complete 显示已回款(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
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
/**操作后状态，红冲时必传(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
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
/**合同编号(购房)*/
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
/**本次扣除金额，默认为0*/
subMoney: number;
/**扣除项类别*/
subType: string;
/**认购时间（购买方），认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**实际收款金额：税额*/
taxMoney: number;
}
/**ListVO_1*/
export interface ListVO_1 {
/**本次实际请款金额（含税）*/
actMoney: number;
/**请佣申请单逻辑ID*/
applyId: number;
/**甲方公司（即开发商）ID*/
developId: number;
/**历史实际请款金额（含税）*/
hisSumActMoney: number;
/**历史已申请请款金额（含税）*/
hisSumApplyMoney: number;
/**累计请款次数*/
hisSumApplyNum: number;
/**已回款金额（含税）*/
hisSumReceMoney: number;
/**累计扣除金额（含税）*/
hisSumSubMoney: number;
/**逻辑ID，主键，自增长*/
id: number;
/**乙方公司（我司主体）ID*/
polyCompanyId: number;
/**项目ID*/
proId: number;
/**项目推广名称*/
proName: string;
/**乙方（我司主体）收款账号ID*/
receAccountId: number;
/**累计实际请款金额（含税）*/
sumActMoney: number;
/**项目周期ID*/
termId: number;
/**周期名称*/
termName: string;
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
/**操作后状态(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
opAfter: string;
/**操作前状态(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
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
/**状态：回款待确认(Confirm)；回款已确认(Complete)，全部(不传值)(Draft-草稿、BusinessDepart-待事业部负责人审核、BusinessMan-待业管审核、BranchAccount-待分公司会计审核、Oa-OA领导审核中、InvoiceApply-待申请开票、BusinessManAgain-待业管复审、InvoiceClerk-待开票员审核、InvoiceMake-待开票员开票、Confirm-待回款确认、Complete-已完成、Stop-终止)*/
status: string;
}
/**SaveFromPageVO*/
export interface SaveFromPageVO {
/**(必填)本次实际请款金额（不含税）*/
actMoney: number;
/**(必填)本次实际请款金额（含税）*/
actMoneyTax: number;
/**已选甲方公司应扣除代理费明细来源：抵扣项费用明细*/
agentFeeFromDeductIdList: number[];
/**(必填)本次请款金额（元）*/
applyMoney: number;
/**(必填)发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
billTypeCode: string;
/**(必填)联行号*/
branchNo: string;
/**(必填)已选成交报告列表*/
dealList: AddFromPageVO[];
/**(必填)甲方公司（即开发商）ID*/
developId: number;
/**附件记录*/
fileList: AddListFromPageVO;
/**(必填)本次扣罚金额，默认为0*/
fineMoney: number;
/**扣罚项类别*/
fineType: string;
/**逻辑ID，主键，自增长，首次暂存或提交为空，其他不为空*/
id: number;
/**上次请款单号*/
lastApplyNo: string;
/**操作，暂存传入空，提交Submit,保存并发起开票申请SaveAndInvoiceApply(Submit-提交、Cancel-撤回、Stop-终止、Audit-审核、InvoiceApply-发起开票申请、SaveAndInvoiceApply-保存并发起开票申请、InvoiceMake-开票、RedInvoice-红冲、Confirm-回款登记)*/
op: string;
/**(必填)乙方公司（我司主体）ID*/
polyCompanyId: number;
/**(必填)项目ID*/
proId: number;
/**(必填)乙方（我司主体）收款账号ID*/
receAccountId: number;
/**(必填)经办部门意见*/
remark: string;
/**(必填)银行账号*/
sellerBankAccount: string;
/**(必填)收款单位名称*/
sellerName: string;
/**(必填)支行*/
sellerOpeningBankBranch: string;
/**(必填)开户行所属银行*/
sellerOpeningBankType: string;
/**(必填)纳税人识别号*/
sellerTaxNo: string;
/**(必填)本次扣除金额（元）*/
subMoney: number;
/**(必填)累计实际请款不含税金额*/
sumActMoney: number;
/**(必填)累计实际请款金额*/
sumActMoneyTax: number;
/**(必填)累计实际请款税额*/
sumTaxMoney: number;
/**(必填)本次实际请款税额*/
taxMoney: number;
/**(必填)开票税率*/
taxRate: number;
/**(必填)项目周期请款汇总信息*/
termList: AddFromPageVO_1[];
}
/**SaveResVO*/
export interface SaveResVO {
/**新增成交报告列表信息ID列表*/
addDealIdList: number[];
/**新增甲方应扣除代理费明细ID列表*/
addDevAgentFeeIdList: number[];
/**新增附件记录ID列表*/
addFileIdList: number[];
/**新增项目周期请款汇总ID列表*/
addTermIdList: number[];
/**请佣逻辑ID*/
applyId: number;
/**取消关联抵扣项费用明细ID列表*/
cancelDeductIdList: number[];
/**关联抵扣项费用明细ID列表*/
deductIdList: number[];
/**删除已选的甲方公司应扣除代理费明细数量*/
delAgentFeeCount: number;
/**删除已选的成交报告数量*/
delDealCount: number;
/**删除已选的附件记录数量*/
delFileCount: number;
/**删除已选的项目周期请款汇总数量*/
delTermCount: number;
/**日志ID*/
logId: number;
}
/**TermProVO*/
export interface TermProVO {
/**(必填)已选成交报告所包含项目ID*/
proId: number;
/**(必填)已选成交报告所包含周期ID*/
termId: number;
}
