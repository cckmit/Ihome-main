/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-11-11 2:42:34 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/contract"
/**甲方合同录入*/
export async function post_contract_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/create', d)
}
/**协议详情*/
export async function get_contract_detail__id (d?: any) {
return await request.get<ContractDetailVO,ContractDetailVO>(basePath+'/contract/detail/{id}', { params: d })
}
/**扫描件归档*/
export async function post_contract_duplicate__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/duplicate/{id}', d)
}
/**导出*/
export async function post_contract_export (d?: any) {
return await request.post< string,string> (basePath+'/contract/export', d)
}
/**甲方合同列表*/
export async function post_contract_list (d?: any) {
return await request.post< PageModel<ContractListVO>,PageModel<ContractListVO>> (basePath+'/contract/list', d)
}
/**原件归档*/
export async function post_contract_original_archive (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/original/archive', d)
}
/**推送OA审核*/
export async function post_contract_push_oa__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/push/oa/{id}', d)
}
/**中介分销合同派发*/
export async function post_distribution_confirm__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/confirm/{id}', d)
}
/**中介分销合同申领*/
export async function post_distribution_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/create', d)
}
/**中介分销合同删除盖章版*/
export async function post_distribution_deleteAnnex__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/deleteAnnex/{id}', d)
}
/**中介分销合同详情*/
export async function get_distribution_detail__id (d?: any) {
return await request.get<DistributionDetailVO,DistributionDetailVO>(basePath+'/distribution/detail/{id}', { params: d })
}
/**中介分销合同扫描件归档*/
export async function post_distribution_duplicate (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/duplicate', d)
}
/**中介分销合同列表*/
export async function post_distribution_list (d?: any) {
return await request.post< PageModel<DistributionQueryResponseVO>,PageModel<DistributionQueryResponseVO>> (basePath+'/distribution/list', d)
}
/**中介分销合同原件归档*/
export async function post_distribution_original_archive (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/original/archive', d)
}
/**中介分销合同预览*/
export async function get_distribution_preview__id (d?: any) {
return await request.get<number,number>(basePath+'/distribution/preview/{id}', { params: d })
}
/**中介分销合同转派发*/
export async function post_distribution_repost_intermediary (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/repost/intermediary', d)
}
/**中介分销合同微信列表*/
export async function post_distribution_wechatList (d?: any) {
return await request.post< DistributionWeChatPreviewVO[],DistributionWeChatPreviewVO[]> (basePath+'/distribution/wechatList', d)
}
/**生成二维码*/
export async function post_notice_QRCode__id (d?: any) {
return await request.post< string,string> (basePath+'/notice/QRCode/{id}', d)
}
/**优惠告知书核查*/
export async function post_notice_check (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/check', d)
}
/**优惠告知书确认*/
export async function post_notice_confirm__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/confirm/{id}', d)
}
/**房号确认书预览*/
export async function get_notice_confirmPreview__id (d?: any) {
return await request.get<string,string>(basePath+'/notice/confirmPreview/{id}', { params: d })
}
/**优惠告知书申领*/
export async function post_notice_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/create', d)
}
/**优惠告知书明细*/
export async function get_notice_detail__id (d?: any) {
return await request.get<NoticeDetailVO,NoticeDetailVO>(basePath+'/notice/detail/{id}', { params: d })
}
/**优惠告知书导出*/
export async function post_notice_export (d?: any) {
return await request.post< string,string> (basePath+'/notice/export', d)
}
/**优惠告知书列表*/
export async function post_notice_list (d?: any) {
return await request.post< PageModel<NoticeListVO>,PageModel<NoticeListVO>> (basePath+'/notice/list', d)
}
/**根据编号查询告知书*/
export async function get_notice_noticeCode (d?: any) {
return await request.get<NoticeListVO,NoticeListVO>(basePath+'/notice/noticeCode', { params: d })
}
/**优惠告知书预览*/
export async function get_notice_preview__id (d?: any) {
return await request.get<string,string>(basePath+'/notice/preview/{id}', { params: d })
}
/**推送房号确认书*/
export async function get_notice_pushConfirm__id (d?: any) {
return await request.get<NoticeConfirmWechatVO,NoticeConfirmWechatVO>(basePath+'/notice/pushConfirm/{id}', { params: d })
}
/**推送优惠告知书*/
export async function get_notice_pushNotice__id (d?: any) {
return await request.get<NoticeWechatVO,NoticeWechatVO>(basePath+'/notice/pushNotice/{id}', { params: d })
}
/**优惠告知书签署*/
export async function post_notice_sign (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/sign', d)
}
/**微信告知书列表*/
export async function post_notice_wechatList (d?: any) {
return await request.post< NoticeWechatListVO[],NoticeWechatListVO[]> (basePath+'/notice/wechatList', d)
}
/**创建支付明细*/
export async function post_noticePriceDetail_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticePriceDetail/create', d)
}
/**告知书终止协议新增*/
export async function post_noticeStop_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeStop/create', d)
}
/**告知书终止协议预览*/
export async function get_noticeStop_detail__id (d?: any) {
return await request.get<string,string>(basePath+'/noticeStop/detail/{id}', { params: d })
}
/**推送终止协议*/
export async function post_noticeStop_push__id (d?: any) {
return await request.post< NoticeStopWechatVO,NoticeStopWechatVO> (basePath+'/noticeStop/push/{id}', d)
}
/**告知书终止协议签署*/
export async function post_noticeStop_sign (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeStop/sign', d)
}
/**告知书补充协议新增*/
export async function post_noticeSupplement_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeSupplement/create', d)
}
/**告知书补充协议预览*/
export async function get_noticeSupplement_detail__id (d?: any) {
return await request.get<string,string>(basePath+'/noticeSupplement/detail/{id}', { params: d })
}
/**推送补充协议*/
export async function post_noticeSupplement_push__id (d?: any) {
return await request.post< NoticeSupplementWechatVO,NoticeSupplementWechatVO> (basePath+'/noticeSupplement/push/{id}', d)
}
/**告知书补充协议签署*/
export async function post_noticeSupplement_sign (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeSupplement/sign', d)
}
/**优惠告知书模板创建*/
export async function post_noticeTemplate_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeTemplate/create', d)
}
/**优惠告知书模板删除*/
export async function post_noticeTemplate_delete__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeTemplate/delete/{id}', d)
}
/**优惠告知书模板列表*/
export async function post_noticeTemplate_list (d?: any) {
return await request.post< NoticeTemplateListVO[],NoticeTemplateListVO[]> (basePath+'/noticeTemplate/list', d)
}
/**优惠告知书模板预览*/
export async function get_noticeTemplate_preview__id (d?: any) {
return await request.get<string,string>(basePath+'/noticeTemplate/preview/{id}', { params: d })
}
/**协议录入*/
export async function post_strategy_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/create', d)
}
/**协议详情*/
export async function get_strategy_detail__id (d?: any) {
return await request.get<StrategyDetailVO,StrategyDetailVO>(basePath+'/strategy/detail/{id}', { params: d })
}
/**扫描件归档*/
export async function post_strategy_duplicate (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/duplicate', d)
}
/**导出*/
export async function post_strategy_export (d?: any) {
return await request.post< string,string> (basePath+'/strategy/export', d)
}
/**中介战略协议列表*/
export async function post_strategy_list (d?: any) {
return await request.post< PageModel<StrategyListVO>,PageModel<StrategyListVO>> (basePath+'/strategy/list', d)
}
/**原件归档*/
export async function post_strategy_original__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/original/{id}', d)
}
/**推送OA审核*/
export async function post_strategy_push_oa__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/push/oa/{id}', d)
}
/**协议编辑*/
export async function post_strategy_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/update', d)
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
/**AnnexEditVO*/
export interface AnnexEditVO {
/**附件后缀*/
attachmentSuffix: string;
/**关联ID*/
contractId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**附件编号*/
fileNo: string;
/**附件类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**AnnexListVO*/
export interface AnnexListVO {
/**附件后缀*/
attachmentSuffix: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**附件路径*/
fileNo: string;
/**附件ID*/
id: number;
/**类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelBusinessCreateRequestVO*/
export interface ChannelBusinessCreateRequestVO {
/**乙方ID*/
channelBusinessId: number;
/**渠道公司ID*/
channelCompanyId: number;
/**联系人电话*/
contactNumber: string;
/**联系人*/
contactPerson: string;
/**收款账号Id*/
receivingAccountId: string;
}
/**ContractDetailVO*/
export interface ContractDetailVO {
/**录入渠道(Cycle-立项周期、Contract-合同管理)*/
channel: string;
/**协议编号*/
contractCode: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交确认人*/
customer: number;
/**成交确认人联系方式*/
customerNo: string;
/**已删除*/
deleted: number;
/**执行时间(yyyy-MM-dd)*/
effectiveTime: string;
/**归档编号*/
fileCode: string;
/**附件信息*/
fileList: AnnexListVO[];
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**合同跟进人*/
handler: number;
/**甲方合同ID*/
id: number;
/**甲方*/
partyA: ContractPartyListVO[];
/**乙方*/
partyB: number;
/**当前状态(Submit-提交、Audit-审核中、Valid-有效、Invalid-无效)*/
state: string;
/**标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractEditVO*/
export interface ContractEditVO {
/**录入渠道(Cycle-立项周期、Contract-合同管理)*/
channel: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交确认人*/
customer: string;
/**成交确认人联系方式*/
customerNo: string;
/**项目周期*/
cycleId: number;
/**已删除*/
deleted: number;
/**执行时间(yyyy-MM-dd)*/
effectiveTime: string;
/**合同录入人*/
enteringPersonId: number;
/**归档编号*/
fileCode: string;
/**合同跟进人*/
handler: number;
/**归属组织*/
organizationId: number;
/**附件信息*/
originalList: AnnexEditVO[];
/**甲方信息*/
partyA: ContractPartyEditVO[];
/**乙方*/
partyB: number;
/**状态(Submit-提交、Audit-审核中、Valid-有效、Invalid-无效)*/
state: string;
/**合同标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractListQueryVO*/
export interface ContractListQueryVO {
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**合同编号*/
contractCode: string;
/**合同录入人*/
createUser: number;
/**周期*/
cycle: string;
/**执行时间(yyyy-MM-dd HH:mm:ss)*/
effectiveTime: string;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**合同跟进人*/
handler: number;
/**归属组织*/
organization: string;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**合作项目*/
projectName: string;
/**标题*/
title: string;
}
/**ContractListVO*/
export interface ContractListVO {
/**合同编号*/
contractCode: string;
/**合作项目*/
cooperativeProject: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**关联周期*/
cycleId: number;
/**已删除*/
deleted: number;
/**执行时间(yyyy-MM-dd)*/
effectiveTime: string;
/**归档编号*/
fileCode: string;
/**合同跟进人*/
handler: number;
/**主键*/
id: number;
/**归属组织id*/
organizationId: number;
/**乙方*/
partyB: number;
/**甲方信息*/
partyList: ContractPartyListVO[];
/**关联项目*/
projectId: number;
/**合同标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractOriginalVO*/
export interface ContractOriginalVO {
/**甲方合同ID*/
contractId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**归档编号*/
fileCode: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractPageQueryVO*/
export interface ContractPageQueryVO {
/**合同编号*/
contractCode: string;
/**合同录入人*/
createUserId: number;
/**周期*/
cycleId: number;
/**执行时间(yyyy-MM-dd)*/
effectiveTime: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**合同跟进人*/
handlerId: number;
/**归属组织*/
organizationId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方*/
partyAId: number;
/**乙方*/
partyBId: number;
/**标题*/
title: string;
}
/**ContractPartyEditVO*/
export interface ContractPartyEditVO {
/**甲方合同ID*/
contractId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**甲方ID*/
userId: number;
}
/**ContractPartyListVO*/
export interface ContractPartyListVO {
/**合同id*/
contractId: string;
/**ID*/
id: number;
/**甲方ID*/
userId: number;
}
/**DistributionAnnexScanArchiveVo*/
export interface DistributionAnnexScanArchiveVo {
/**附件列表*/
annexList: DistributionScanAnnexVO[];
/**分销协议ID*/
distributionId: number;
}
/**DistributionAnnexVO*/
export interface DistributionAnnexVO {
/**附件后缀*/
attachmentSuffix: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**主键*/
distributionId: number;
/**附件编码*/
fileNo: string;
/**主键*/
id: number;
/**附件类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DistributionChannelBusinessVO*/
export interface DistributionChannelBusinessVO {
/**开户行*/
accountBank: string;
/**账户名*/
accountName: string;
/**undefined*/
bankAccounts: string;
/**渠道商地址*/
channelBusinessAddress: string;
/**渠道商ID*/
channelBusinessId: number;
/**渠道商名字*/
channelBusinessName: string;
/**渠道公司ID*/
channelCompanyId: number;
/**渠道等级*/
channelLevel: string;
/**联系人电话*/
contactNumber: string;
/**联系人*/
contactPerson: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**分销协议主键*/
distributionId: number;
/**主键*/
id: number;
/**收款账号Id*/
receivingAccountId: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DistributionCreateRequestVO*/
export interface DistributionCreateRequestVO {
/**合作开始时间(yyyy-MM-dd)*/
beginTime: string;
/**乙方信息*/
channelBusinessList: ChannelBusinessCreateRequestVO[];
/**立项周期主键*/
cycleId: number;
/**合作结束时间(yyyy-MM-dd)*/
endTime: string;
/**合同录入人ID*/
entryPerson: number;
/**合同跟进人*/
handler: number;
/**归属组织ID*/
organizationId: number;
/**甲方公司*/
partyACompanyId: number;
/**项目地址*/
projectAddress: string;
/**关联项目*/
projectId: number;
/**模板主键*/
templateId: number;
/**主标题*/
title: string;
}
/**DistributionDetailVO*/
export interface DistributionDetailVO {
/**乙方信息*/
businessList: DistributionChannelBusinessVO[];
/**附件*/
fileList: DistributionAnnexVO[];
/**主键*/
id: number;
/**模板主键*/
templateId: number;
}
/**DistributionIntermediaryVO*/
export interface DistributionIntermediaryVO {
/**模板主键*/
distributionId: number;
/**中介id集合*/
mediationList: DistributionMediationForwardVO[];
}
/**DistributionMediationForwardVO*/
export interface DistributionMediationForwardVO {
/**中介ID*/
mediationId: number;
}
/**DistributionOriginalArchiveVO*/
export interface DistributionOriginalArchiveVO {
/**分销协议ID*/
distributionId: number;
/**归档编号*/
fileCode: string;
}
/**DistributionQueryRequestVO*/
export interface DistributionQueryRequestVO {
/**合作开始时间(yyyy-MM-dd)*/
beginTime: string;
/**乙方公司*/
channelCompanyId: number;
/**合同编号*/
contractNo: string;
/**周期*/
cycleId: number;
/**合作结束时间(yyyy-MM-dd)*/
endTime: string;
/**合同录入人*/
entryPerson: number;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**合同跟进人*/
handler: number;
/**归属组织*/
organizationId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方公司*/
partyACompanyId: number;
/**项目地址*/
projectAddress: string;
/**项目*/
projectId: number;
/**标题*/
title: string;
}
/**DistributionQueryResponseVO*/
export interface DistributionQueryResponseVO {
/**合作开始时间(yyyy-MM-dd)*/
beginTime: string;
/**乙方公司*/
channelCompanyId: number;
/**合同编号*/
contractNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期*/
cycleId: number;
/**已删除*/
deleted: number;
/**合作结束时间(yyyy-MM-dd)*/
endTime: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**合同跟进人*/
handler: number;
/**主键*/
id: number;
/**归属组织*/
organizationId: number;
/**甲方公司*/
partyACompanyId: number;
/**项目地址*/
projectAddress: string;
/**项目*/
projectId: number;
/**标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DistributionScanAnnexVO*/
export interface DistributionScanAnnexVO {
/**附件后缀*/
attachmentSuffix: string;
/**附件编码*/
fileNo: string;
/**附件类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档)*/
type: string;
}
/**DistributionWeChatPreviewVO*/
export interface DistributionWeChatPreviewVO {
/**项目*/
projectName: string;
}
/**NoticeCheckVO*/
export interface NoticeCheckVO {
/**核查人*/
checkUser: number;
/**ID*/
id: number;
/**核查状态(Yes-是、No-否、Valid-核查通过、Invalid-核查不通过)*/
isCheck: string;
}
/**NoticeConfirmWechatVO*/
export interface NoticeConfirmWechatVO {
/**单位*/
buyUnit: string;
/**优惠方式说明*/
explain: string;
/**住宅类型*/
housingType: string;
/**主键*/
id: number;
/**通知书编号*/
noticeCode: string;
/**乙方*/
ownerName: string;
/**优惠服务费缴纳金额*/
paymentAmount: number;
/**项目名字*/
projectName: string;
/**房号*/
roomNumber: string;
/**状态(Confirm-待确认、Sign-待签署、Check-待核查、Pay-待支付、Valid-有效、Invalid-无效)*/
state: string;
}
/**NoticeDetailVO*/
export interface NoticeDetailVO {
/**经办人*/
agent: string;
/**优惠期限开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**抵扣金额*/
deduction: number;
/**折扣*/
discount: number;
/**优惠期限结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**优惠方式说明*/
explain: string;
/**扫描件*/
fileList: AnnexListVO[];
/**主键*/
id: number;
/**通知书编号*/
noticeCode: string;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**乙方证件号码*/
partyBIdNo: string;
/**乙方联系电话*/
partyBMobile: string;
/**优惠服务费缴纳金额*/
payment: number;
/**项目名称*/
projectName: string;
/**甲方退款天数*/
refundDays: number;
/**购买单位*/
roomNumber: string;
/**模板附件*/
url: string;
}
/**NoticeEditVO*/
export interface NoticeEditVO {
/**附件*/
annexEditList: AnnexEditVO[];
/**优惠期限开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**单位*/
buyUnit: string;
/**录入渠道(Customer-客户、Employee-客服)*/
channel: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**立项周期主键*/
cycleId: number;
/**折扣金额*/
deduction: number;
/**已删除*/
deleted: number;
/**折扣*/
discount: number;
/**优惠期限结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**优惠方式说明*/
explain: string;
/**住宅类型*/
housingType: string;
/**业主证件号码*/
ownerCertificateNo: string;
/**手机号码*/
ownerMobile: string;
/**业主姓名*/
ownerName: string;
/**甲方id*/
partyA: number;
/**优惠服务费缴纳金额*/
paymentAmount: number;
/**项目名称*/
projectName: string;
/**甲方退款天数*/
refundNumberDay: number;
/**房号*/
roomNumber: string;
/**是否纸质(Yes-是、No-否)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticeListQueryVO*/
export interface NoticeListQueryVO {
/**区域*/
area: string;
/**优惠期限开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**周期*/
cycle: string;
/**抵扣金额*/
deduction: number;
/**折扣*/
discount: number;
/**优惠期限结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**客户电话*/
mobileB: string;
/**告知书编号*/
noticeCode: string;
/**甲方*/
partyA: string[];
/**客户*/
partyB: string[];
/**项目名称*/
projectName: string;
/**房号*/
room: string;
/**信息状态(Confirm-待确认、Sign-待签署、Check-待核查、Pay-待支付、Valid-有效、Invalid-无效)*/
state: string;
}
/**NoticeListVO*/
export interface NoticeListVO {
/**乙方常用地址*/
address: string;
/**区域*/
area: string;
/**优惠期限开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**周期*/
cycle: string;
/**抵扣金额*/
deduction: number;
/**折扣*/
discount: number;
/**优惠期限结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**主键*/
id: number;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**乙方证件号码*/
partyBIdNo: string;
/**乙方联系电话*/
partyBMobile: string;
/**优惠缴纳金额*/
payment: number;
/**优惠项目名称*/
projectName: string;
/**购买单位*/
room: string;
}
/**NoticePageQueryVO*/
export interface NoticePageQueryVO {
/**区域*/
area: string;
/**优惠期限开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**周期*/
cycleId: number;
/**抵扣金额*/
deduction: number;
/**折扣*/
discount: number;
/**优惠期限结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**告知书编号*/
noticeCode: string;
/**客户电话*/
ownerMobile: string;
/**客户*/
ownerName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方*/
partyA: number;
/**项目名称*/
projectName: string;
/**房号*/
roomNumber: string;
/**信息状态(Confirm-待确认、Sign-待签署、Check-待核查、Pay-待支付、Valid-有效、Invalid-无效)*/
state: string;
}
/**NoticePriceDetailEditVO*/
export interface NoticePriceDetailEditVO {
/**金额*/
amount: number;
/**付款渠道(Alipay-支付宝、Wechat-微信、UnionPay-银联)*/
channel: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**告知书主键*/
noticeId: number;
/**付款金额主键*/
priceId: number;
/**交易类型(Payment-付款、Refund-退款)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticeSignVO*/
export interface NoticeSignVO {
/**主键*/
id: number;
/**签署*/
sign: string;
}
/**NoticeStopEditVO*/
export interface NoticeStopEditVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**主键ID*/
id: number;
/**告知书主键*/
noticeId: number;
/**终止理由*/
reason: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**电子版*/
url: string;
}
/**NoticeStopSignVO*/
export interface NoticeStopSignVO {
/**ID*/
id: number;
/**签署*/
sign: string;
}
/**NoticeStopWechatVO*/
export interface NoticeStopWechatVO {
/**主键*/
id: number;
/**乙方*/
partyB: string;
/**优惠项目名称*/
projectName: string;
/**购买单位*/
room: string;
/**状态*/
state: string;
}
/**NoticeSupplementEditVO*/
export interface NoticeSupplementEditVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**现优惠抵扣金额*/
deduction: number;
/**已删除*/
deleted: number;
/**现优惠折扣*/
discount: number;
/**主键ID*/
id: number;
/**告知书主键*/
noticeId: number;
/**现需缴纳金额*/
payment: number;
/**现房号*/
room: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**电子版*/
url: string;
}
/**NoticeSupplementSignVO*/
export interface NoticeSupplementSignVO {
/**ID*/
id: number;
/**签署*/
sign: string;
}
/**NoticeSupplementWechatVO*/
export interface NoticeSupplementWechatVO {
/**主键*/
id: number;
/**乙方*/
partyB: string;
/**优惠项目名称*/
projectName: string;
/**购买单位*/
room: string;
/**状态*/
state: string;
}
/**NoticeTemplateEditVO*/
export interface NoticeTemplateEditVO {
/**优惠期限开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**立项周期主键*/
cycleId: number;
/**抵扣金额*/
deduction: number;
/**已删除*/
deleted: number;
/**折扣*/
discount: number;
/**优惠期限结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**优惠方式说明*/
explain: string;
/**甲方*/
partyA: string;
/**优惠服务费缴纳金额*/
payment: number;
/**甲方退款天数*/
refundDays: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticeTemplateListQueryVO*/
export interface NoticeTemplateListQueryVO {
/**周期ID*/
cycleId: number;
}
/**NoticeTemplateListVO*/
export interface NoticeTemplateListVO {
/**优惠方式说明*/
explain: string;
/**ID*/
id: number;
/**优惠服务费金额*/
payment: number;
/**甲方退款天数*/
refundDays: number;
}
/**NoticeWechatListQueryVO*/
export interface NoticeWechatListQueryVO {
/**查询条件(项目/房号/客户名称/客户电话/优惠告知书编号)*/
condition: string;
}
/**NoticeWechatListVO*/
export interface NoticeWechatListVO {
/**优惠告知书 -- 房号确认书*/
confirmWechatVO: NoticeConfirmWechatVO;
/**优惠告知书 -- 终止协议*/
stopWechatVO: NoticeStopWechatVO;
/**优惠告知书 -- 补充协议*/
supplementWechatVO: NoticeSupplementWechatVO;
/**优惠告知书*/
wechatVO: NoticeWechatVO;
}
/**NoticeWechatVO*/
export interface NoticeWechatVO {
/**主键*/
id: number;
/**乙方*/
partyB: string;
/**优惠项目名称*/
projectName: string;
/**购买单位*/
room: string;
/**状态(Confirm-待确认、Sign-待签署、Check-待核查、Pay-待支付、Valid-有效、Invalid-无效)*/
state: string;
}
/**StrategyDetailVO*/
export interface StrategyDetailVO {
/**战略协议状态：PartyA：甲方战略协议 Channel：渠道战略协议(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**协议开始时间(yyyy-MM-dd)*/
beginTime: string;
/**协议结束时间(yyyy-MM-dd)*/
endTime: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**中介战略协议ID*/
id: number;
/**盖章版归档*/
originalList: AnnexListVO[];
/**甲方*/
partyA: number;
/**乙方*/
partyB: number;
/**当前状态(Draft-草稿、BusinessUnderReview-业务系统审核中、OAUnderReview-OA审核中、ReviewRejected-审核驳回、Audited-已审核)*/
state: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
/**StrategyEditVO*/
export interface StrategyEditVO {
/**战略协议状态：PartyA：甲方战略协议 Channel：渠道战略协议(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**合作开始时间(yyyy-MM-dd)*/
beginTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**立项周期ID*/
cycleId: number;
/**已删除*/
deleted: number;
/**合作结束时间(yyyy-MM-dd)*/
endTime: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**ID*/
id: number;
/**附件信息*/
originalList: AnnexEditVO[];
/**原件归档状态(Yes-已归档、No-未归档)*/
originalState: string;
/**甲方*/
partyA: number;
/**乙方*/
partyB: number;
/**当前状态(Draft-草稿、BusinessUnderReview-业务系统审核中、OAUnderReview-OA审核中、ReviewRejected-审核驳回、Audited-已审核)*/
state: string;
/**标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**StrategyFileVO*/
export interface StrategyFileVO {
/**盖章版归档*/
fileList: AnnexEditVO[];
/**ID*/
id: number;
/**类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档)*/
type: string;
}
/**StrategyListQueryVO*/
export interface StrategyListQueryVO {
/**周期*/
cycle: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**项目*/
projectName: string;
/**协议状态(Draft-草稿、BusinessUnderReview-业务系统审核中、OAUnderReview-OA审核中、ReviewRejected-审核驳回、Audited-已审核)*/
state: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
/**StrategyListVO*/
export interface StrategyListVO {
/**战略协议状态：PartyA：甲方战略协议 Channel：渠道战略协议(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**关联周期*/
cycleId: number;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**主键*/
id: number;
/**甲方*/
partyA: number;
/**乙方*/
partyB: number;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
/**StrategyPageQueryVO*/
export interface StrategyPageQueryVO {
/**战略协议状态：PartyA：甲方战略协议 Channel：渠道战略协议(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**周期*/
cycleId: number;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方*/
partyA: number;
/**乙方*/
partyB: number;
/**项目*/
projectId: number;
/**协议状态(Draft-草稿、BusinessUnderReview-业务系统审核中、OAUnderReview-OA审核中、ReviewRejected-审核驳回、Audited-已审核)*/
state: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
