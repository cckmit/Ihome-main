/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-25 4:03:54 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/contract"
/**附件上传*/
export async function post_contract_annex (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/annex', d)
}
/**审核状态查询*/
export async function post_contract_approval_status (d?: any) {
return await request.post< ContractApprovalStatus[],ContractApprovalStatus[]> (basePath+'/contract/approval/status', d)
}
/**删除立项关联*/
export async function post_contract_associated (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/associated', d)
}
/**甲方合同录入*/
export async function post_contract_create (d?: any) {
return await request.post< number,number> (basePath+'/contract/create', d)
}
/**立项查询关联合同信息*/
export async function post_contract_cycle (d?: any) {
return await request.post< ContractRelatedCycleResponseVO[],ContractRelatedCycleResponseVO[]> (basePath+'/contract/cycle', d)
}
/**删除合同*/
export async function post_contract_delete (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/delete', d)
}
/**附件删除*/
export async function post_contract_delete_annex (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/delete/annex', d)
}
/**甲方合同详情*/
export async function get_contract_detail__id (d?: any) {
return await request.get<ContractDetailVO,ContractDetailVO>(basePath+'/contract/detail/{id}', { params: d })
}
/**扫描件归档*/
export async function post_contract_duplicate__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/duplicate/{id}', d)
}
/**附件查询*/
export async function post_contract_files (d?: any) {
return await request.post< AnnexListVO[],AnnexListVO[]> (basePath+'/contract/files', d)
}
/**甲方合同列表*/
export async function post_contract_list (d?: any) {
return await request.post< any,any> (basePath+'/contract/list', d)
}
/**原件归档*/
export async function post_contract_original_archive (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/original/archive', d)
}
/**结佣查询合同信息吗*/
export async function post_contract_please_help (d?: any) {
return await request.post< ContractPleaseHelpResponse[],ContractPleaseHelpResponse[]> (basePath+'/contract/please/help', d)
}
/**立项关联甲方合同*/
export async function post_contract_related_cycle (d?: any) {
return await request.post< ContractRelatedCycleResponseVO[],ContractRelatedCycleResponseVO[]> (basePath+'/contract/related/cycle', d)
}
/**审核状态更变*/
export async function post_contract_update_approval_status (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/update/approval/status', d)
}
/**甲方合同操作日志*/
export async function post_contractOperatingLog_list (d?: any) {
return await request.post< any,any> (basePath+'/contractOperatingLog/list', d)
}
/**新增盖章版附件*/
export async function post_distribution_annex (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/annex', d)
}
/**结佣查询渠道类型和中介行*/
export async function post_distribution_channel_type (d?: any) {
return await request.post< any,any> (basePath+'/distribution/channel/type', d)
}
/**通过周期ID查询渠道商*/
export async function get_distribution_channels__cycleId (d?: any) {
return await request.get<number[],number[]>(basePath+'/distribution/channels/{cycleId}', { params: d })
}
/**中介分销合同申领*/
export async function post_distribution_create (d?: any) {
return await request.post< number,number> (basePath+'/distribution/create', d)
}
/**渠道信息*/
export async function post_distribution_deal_channels (d?: any) {
return await request.post< DistributionChannelResponse[],DistributionChannelResponse[]> (basePath+'/distribution/deal/channels', d)
}
/**成交通过编号预览渠道合同详情*/
export async function get_distribution_deal_detail__contractNo (d?: any) {
return await request.get<DistributionDetailVO,DistributionDetailVO>(basePath+'/distribution/deal/detail/{contractNo}', { params: d })
}
/**删除渠道合同*/
export async function post_distribution_delete (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/delete', d)
}
/**盖章版删除*/
export async function post_distribution_delete_annex (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/delete/annex', d)
}
/**中介分销合同详情*/
export async function get_distribution_detail__id (d?: any) {
return await request.get<DistributionDetailVO,DistributionDetailVO>(basePath+'/distribution/detail/{id}', { params: d })
}
/**中介分销合同驳回*/
export async function post_distribution_disallowance (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/disallowance', d)
}
/**中介分销合同派发*/
export async function post_distribution_distribute (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/distribute', d)
}
/**中介分销合同扫描件归档*/
export async function post_distribution_duplicate (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/duplicate', d)
}
/**渠道合同编辑*/
export async function post_distribution_edit (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/edit', d)
}
/**中介分销合同列表*/
export async function post_distribution_list (d?: any) {
return await request.post< any,any> (basePath+'/distribution/list', d)
}
/**中介分销合同原件归档*/
export async function post_distribution_original_archive (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/original/archive', d)
}
/**结佣通过编号查询渠道合同附件*/
export async function post_distribution_pay_annex (d?: any) {
return await request.post< AnnexListVO[],AnnexListVO[]> (basePath+'/distribution/pay/annex', d)
}
/**结佣获取渠道合同信息*/
export async function get_distribution_payApply_detail (d?: any) {
return await request.get<Distribution[],Distribution[]>(basePath+'/distribution/payApply/detail', { params: d })
}
/**中介分销合同审核*/
export async function post_distribution_review (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/review', d)
}
/**中介分销合同撤回*/
export async function post_distribution_withdraw (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/withdraw', d)
}
/**甲方合同操作日志*/
export async function post_distributionOperatingLog_list (d?: any) {
return await request.post< any,any> (basePath+'/distributionOperatingLog/list', d)
}
/**分销协议收派套餐查询*/
export async function post_distributionmx_receive_detail (d?: any) {
return await request.post< DistributionMxQueryResponseVO[],DistributionMxQueryResponseVO[]> (basePath+'/distributionmx/receive/detail', d)
}
/**甲方合同导出附件*/
export async function post_export_contract_file (d?: any) {
return await request.post< any,any> (basePath+'/export/contract/file', d)
}
/**甲方合同导出列表*/
export async function post_export_contract_list (d?: any) {
return await request.post< any,any> (basePath+'/export/contract/list', d)
}
/**渠道合同导出附件*/
export async function post_export_distribution_file (d?: any) {
return await request.post< any,any> (basePath+'/export/distribution/file', d)
}
/**渠道合同导出*/
export async function post_export_distribution_list (d?: any) {
return await request.post< any,any> (basePath+'/export/distribution/list', d)
}
/**告知书导出附件*/
export async function post_export_notice_file (d?: any) {
return await request.post< any,any> (basePath+'/export/notice/file', d)
}
/**告知书导出*/
export async function post_export_notice_list (d?: any) {
return await request.post< any,any> (basePath+'/export/notice/list', d)
}
/**战略导出列表*/
export async function post_export_strategy_export (d?: any) {
return await request.post< string,string> (basePath+'/export/strategy/export', d)
}
/**战略导出附件*/
export async function post_export_strategy_file (d?: any) {
return await request.post< any,any> (basePath+'/export/strategy/file', d)
}
/**优惠告知书改变信息状态*/
export async function post_notice_Information_status (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/Information/status', d)
}
/**校验验证码*/
export async function post_notice_accounts_certification_check (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/accounts/certification/check', d)
}
/**增加附件*/
export async function post_notice_annex (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/annex', d)
}
/**删除附件*/
export async function post_notice_annex__fileNo (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/annex/{fileNo}', d)
}
/**房号确认书*/
export async function post_notice_confirmation (d?: any) {
return await request.post< number,number> (basePath+'/notice/confirmation', d)
}
/**优惠告知书申领*/
export async function post_notice_create (d?: any) {
return await request.post< NoticeTemplateDetailResponseVO,NoticeTemplateDetailResponseVO> (basePath+'/notice/create', d)
}
/**成交查询优惠告知书*/
export async function post_notice_customer_information (d?: any) {
return await request.post< NoticeCustomerInformationResponse[],NoticeCustomerInformationResponse[]> (basePath+'/notice/customer/information', d)
}
/**主成交报告查询优惠告知书*/
export async function post_notice_deal_list (d?: any) {
return await request.post< any,any> (basePath+'/notice/deal/list', d)
}
/**补充报告创建告知书*/
export async function post_notice_deal_protocol (d?: any) {
return await request.post< number[],number[]> (basePath+'/notice/deal/protocol', d)
}
/**补充报告审核通过后，需要把原告知书删除或者变成已失效*/
export async function post_notice_deal_replace_notice (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/deal/replace/notice', d)
}
/**优惠告知书明细*/
export async function get_notice_detail__id (d?: any) {
return await request.get<NoticeDetailResponseVO,NoticeDetailResponseVO>(basePath+'/notice/detail/{id}', { params: d })
}
/**财务通过客户名字获取优惠告知书ID*/
export async function get_notice_ids (d?: any) {
return await request.get<number[],number[]>(basePath+'/notice/ids', { params: d })
}
/**优惠告知书列表*/
export async function post_notice_list (d?: any) {
return await request.post< any,any> (basePath+'/notice/list', d)
}
/**获取客户信息，全部拼接在一起*/
export async function get_notice_payment__noticeId (d?: any) {
return await request.get<NoticeOwner,NoticeOwner>(basePath+'/notice/payment/{noticeId}', { params: d })
}
/**获取待业管审核的告知书*/
export async function post_notice_pending_list (d?: any) {
return await request.post< NoticeVO[],NoticeVO[]> (basePath+'/notice/pending/list', d)
}
/**支付后平台签署*/
export async function post_notice_platform_sign__noticeId (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/platform/sign/{noticeId}', d)
}
/**关联成交ID*/
export async function post_notice_related_deal_info (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/related/deal/info', d)
}
/**签署回调*/
export async function post_notice_signCallback (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/signCallback', d)
}
/**优惠告知书编辑*/
export async function post_notice_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/update', d)
}
/**获取实名认证验证码*/
export async function post_notice_verification_code (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/verification/code', d)
}
/**小程序查询告知书明细*/
export async function get_notice_wechat_detail__noticeId (d?: any) {
return await request.get<NoticeWeChatDetailResponseVo,NoticeWeChatDetailResponseVo>(basePath+'/notice/wechat/detail/{noticeId}', { params: d })
}
/**小程序查询优惠告知书列表*/
export async function post_notice_wechat_notices (d?: any) {
return await request.post< NoticeWeChatQueryResponseVo[],NoticeWeChatQueryResponseVo[]> (basePath+'/notice/wechat/notices', d)
}
/**告知书签署*/
export async function post_notice_wechat_sign (d?: any) {
return await request.post< NoticeSignResponseVo,NoticeSignResponseVo> (basePath+'/notice/wechat/sign', d)
}
/**甲方合同操作日志*/
export async function post_noticeLog_list (d?: any) {
return await request.post< any,any> (basePath+'/noticeLog/list', d)
}
/**删除业主信息*/
export async function post_noticeOwner_detail__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeOwner/detail/{id}', d)
}
/**创建*/
export async function post_strategy_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/create', d)
}
/**协议详情*/
export async function get_strategy_detail__id (d?: any) {
return await request.get<StrategyDetailVO,StrategyDetailVO>(basePath+'/strategy/detail/{id}', { params: d })
}
/**扫描件归档*/
export async function post_strategy_duplicate__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/duplicate/{id}', d)
}
/**中介战略协议列表*/
export async function post_strategy_list (d?: any) {
return await request.post< any,any> (basePath+'/strategy/list', d)
}
/**原件归档*/
export async function post_strategy_original (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/original', d)
}
/**推送OA审核*/
export async function post_strategy_push_oa__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/push/oa/{id}', d)
}
/**协议编辑*/
export async function post_strategy_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/update', d)
}
/**附件上传*/
export async function post_strategy_updating_file (d?: any) {
return await request.post< boolean,boolean> (basePath+'/strategy/updating/file', d)
}
/**渠道合同申领预览*/
export async function post_template_distribution_preview (d?: any) {
return await request.post< any,any> (basePath+'/template/distribution/preview', d)
}
/**成交报告告知书预览*/
export async function post_template_notice_deal_preview (d?: any) {
return await request.post< any,any> (basePath+'/template/notice/deal/preview', d)
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
/**AnnexCreateList*/
export interface AnnexCreateList {
/**(必填)附件后缀*/
attachmentSuffix: string;
/**(必填)附件编号*/
fileNo: string;
/**(必填)附件类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
}
/**AnnexCreateListRequest*/
export interface AnnexCreateListRequest {
/**(必填)附件列表*/
annexList: AnnexCreateList[];
/**(必填)id*/
contractId: number;
}
/**AnnexDeleteList*/
export interface AnnexDeleteList {
/**附件后缀*/
attachmentSuffix: string;
/**附件编号*/
fileNo: string;
/**附件类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
}
/**AnnexDeleteRequest*/
export interface AnnexDeleteRequest {
/**(必填)附件列表*/
annexDeleteLists: AnnexDeleteList[];
/**(必填)id*/
contractId: number;
}
/**AnnexEditVO*/
export interface AnnexEditVO {
/**附件后缀*/
attachmentSuffix: string;
/**id*/
contractId: number;
/**附件编号*/
fileNo: string;
/**附件类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
}
/**AnnexListVO*/
export interface AnnexListVO {
/**附件后缀*/
attachmentSuffix: string;
/**附件路径*/
fileNo: string;
/**附件ID*/
id: number;
/**类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
}
/**AnnexRequest*/
export interface AnnexRequest {
/**(必填)合同id*/
contractIds: number[];
/**(必填)附件类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
}
/**ContractApprovalStatus*/
export interface ContractApprovalStatus {
/**(必填)审核状态(Drafting-起草、OAUnderReview-OA审核中、OAReviewRejected-OA审核驳回、OAAudited-已审核)*/
approvalStatus: string;
/**(必填)合同ID*/
contractId: number;
}
/**ContractByTermIdsDTO*/
export interface ContractByTermIdsDTO {
/**呈批文号*/
approvalNo: string;
/**审核状态   CONDUCT-审核中 ADOPT-审核通过(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**市*/
city: string;
/**区*/
district: string;
/**项目id*/
proId: number;
/**项目名称*/
proName: string;
/**省*/
province: string;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**周期id*/
termId: number;
/**周期名称*/
termName: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**ContractCycleVO*/
export interface ContractCycleVO {
/**甲方合同(外键)*/
contractId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期ID*/
cycleId: number;
/**关联周期名字*/
cycleName: string;
/**已删除*/
deleted: number;
/**主键*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractDeleteRelatedCycleRequest*/
export interface ContractDeleteRelatedCycleRequest {
/**合同ID*/
contractId: number;
/**周期ID*/
cycleId: number;
}
/**ContractDetailVO*/
export interface ContractDetailVO {
/**审核状态(Drafting-起草、OAUnderReview-OA审核中、OAReviewRejected-OA审核驳回、OAAudited-已审核)*/
approvalStatus: string;
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**成交确认人*/
confirmer: string;
/**成交确认人联系方式*/
confirmerContact: string;
/**协议编号*/
contractNo: string;
/**合作项目名字*/
cooperationProjectsName: string;
/**合作时间(yyyy-MM-dd)*/
cooperationTime: string;
/**甲方合同已关联周期列表*/
cycleList: ContractByTermIdsDTO[];
/**附件信息*/
fileList: AnnexListVO[];
/**合同跟进人Id*/
handlerId: number;
/**合同跟进人名字*/
handlerName: string;
/**甲方合同ID*/
id: number;
/**归属组织id*/
organizationId: number;
/**归属组织名字*/
organizationName: string;
/**甲方*/
partyA: ContractPartyListVO[];
/**乙方ID*/
partyBId: number;
/**乙方名字*/
partyBName: string;
/**乙方收款账号*/
receivingAccount: string;
/**乙方收款账号ID*/
receivingAccountId: number;
/**标题*/
title: string;
}
/**ContractEditVO*/
export interface ContractEditVO {
/**审核状态： 有默认值(Drafting-起草、OAUnderReview-OA审核中、OAReviewRejected-OA审核驳回、OAAudited-已审核)*/
approvalStatus: string;
/**归档状态：有默认值(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**成交确认人*/
confirmer: string;
/**成交确认人联系方式*/
confirmerContact: string;
/**合作项目名称*/
cooperationProjectsName: string;
/**合作时间(yyyy-MM-dd)*/
cooperationTime: string;
/**周期ID*/
cycleId: number;
/**合同录入人*/
enteringPersonId: number;
/**合同跟进人*/
handlerId: number;
/**归属组织*/
organizationId: number;
/**附件信息*/
originalList: AnnexEditVO[];
/**甲方信息*/
partyA: ContractPartyEditVO[];
/**乙方*/
partyBId: number;
/**乙方收款账号*/
receivingAccountId: number;
/**合同标题*/
title: string;
}
/**ContractListVO*/
export interface ContractListVO {
/**审核状态(Drafting-起草、OAUnderReview-OA审核中、OAReviewRejected-OA审核驳回、OAAudited-已审核)*/
approvalStatus: string;
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**合同编号*/
contractNo: string;
/**合作项目*/
cooperationProjectsName: string;
/**合作开始时间(yyyy-MM-dd)*/
cooperationTime: string;
/**合同跟进人ID*/
handlerId: number;
/**合同跟进人名字*/
handlerName: string;
/**主键*/
id: number;
/**归属组织id*/
organizationId: number;
/**归属组织名字*/
organizationName: string;
/**乙方ID*/
partyBId: number;
/**乙方名字*/
partyBName: string;
/**甲方信息*/
partyList: ContractPartyListVO[];
/**合同标题*/
title: string;
}
/**ContractOperatingLogListRequest*/
export interface ContractOperatingLogListRequest {
/**甲方合同(外键)*/
contractId: number;
/**甲方合同编号*/
contractNo: string;
/**操作人*/
operatingId: number;
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、SignArchive-签署归档、GetVerificationCode-获取验证码、VerificationCode-短信验证码校验、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件、OaStateChange-OA状态更变、ChannelContractReview-渠道合同审核、ChannelContractDisallowance-渠道合同驳回、ChannelContractDistribute-渠道合同派发、ChannelContractWithdraw-渠道合同撤回、ChannelContractOriginalArchive-渠道合同原件归档、ChannelContractScannedFileArchive-渠道合同扫描件归档、ChannelContractDeleteAnnex-渠道合同删除附件、ChannelContractCreateAnnex-渠道合同新增附件、ChannelContractEdit-渠道合同编辑)*/
operatingType: string;
/**操作开始时间(yyyy-MM-dd HH:mm:ss)*/
operationBeginTime: string;
/**操作描述*/
operationDescription: string;
/**操作结束时间(yyyy-MM-dd HH:mm:ss)*/
operationEndTime: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**ContractOperatingLogListResponse*/
export interface ContractOperatingLogListResponse {
/**甲方合同(外键)*/
contractId: number;
/**甲方合同编号*/
contractNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**主键*/
id: number;
/**操作人*/
operatingId: number;
/**操作参数*/
operatingParameters: string;
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、SignArchive-签署归档、GetVerificationCode-获取验证码、VerificationCode-短信验证码校验、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件、OaStateChange-OA状态更变、ChannelContractReview-渠道合同审核、ChannelContractDisallowance-渠道合同驳回、ChannelContractDistribute-渠道合同派发、ChannelContractWithdraw-渠道合同撤回、ChannelContractOriginalArchive-渠道合同原件归档、ChannelContractScannedFileArchive-渠道合同扫描件归档、ChannelContractDeleteAnnex-渠道合同删除附件、ChannelContractCreateAnnex-渠道合同新增附件、ChannelContractEdit-渠道合同编辑)*/
operatingType: string;
/**操作描述*/
operationDescription: string;
/**操作结果*/
operationResult: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operationTime: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractOriginalVO*/
export interface ContractOriginalVO {
/**归档编号*/
archiveNo: string;
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
}
/**ContractPageQueryVO*/
export interface ContractPageQueryVO {
/**审核状态(Drafting-起草、OAUnderReview-OA审核中、OAReviewRejected-OA审核驳回、OAAudited-已审核)*/
approvalStatus: string;
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**合同编号*/
contractNo: string;
/**合作开始时间(yyyy-MM-dd)*/
cooperationBeginTime: string;
/**合作结束时间(yyyy-MM-dd)*/
cooperationEndTime: string;
/**合作项目*/
cooperationProjectsName: string;
/**合同录入人*/
enteringPersonId: number;
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
/**甲方ID*/
userId: number;
}
/**ContractPartyListQueryVO*/
export interface ContractPartyListQueryVO {
/**甲方合同ID*/
contractId: number;
/**ID*/
id: number;
/**甲方ID*/
userId: number;
}
/**ContractPartyListVO*/
export interface ContractPartyListVO {
/**合同id*/
contractId: number;
/**ID*/
id: number;
/**甲方ID*/
userId: number;
/**甲方名字*/
userName: string;
}
/**ContractPleaseHelpRequest*/
export interface ContractPleaseHelpRequest {
/**周期ID*/
cycleId: number;
/**甲方ID*/
partyAId: number;
/**乙方ID*/
partyBId: number;
/**乙方收款账号ID*/
receivingAccountId: number;
}
/**ContractPleaseHelpResponse*/
export interface ContractPleaseHelpResponse {
/**合同编号*/
contractNo: string;
/**关联周期ID*/
cycleDetails: ContractCycleVO[];
/**甲方合同ID*/
id: number;
/**甲方*/
partyAs: ContractPartyListQueryVO[];
/**乙方ID*/
partyBId: number;
/**乙方收款账号ID*/
receivingAccountId: number;
/**标题*/
title: string;
}
/**ContractRelatedCycleRequestVO*/
export interface ContractRelatedCycleRequestVO {
/**合同ID*/
contractIds: number[];
/**周期ID*/
cycleId: number;
}
/**ContractRelatedCycleResponseVO*/
export interface ContractRelatedCycleResponseVO {
/**甲方合同编号*/
contractNo: string;
/**合作时间(yyyy-MM-dd)*/
cooperationTime: string;
/**合同跟进人ID*/
handler: number;
/**合同跟进人名字*/
handlerName: string;
/**甲方合同ID*/
id: number;
/**乙方Id*/
partyB: number;
/**甲方信息*/
partyList: ContractPartyListVO[];
/**乙方名字*/
partyName: string;
/**乙方收款账号ID*/
receivingAccountId: number;
/**合同标题*/
title: string;
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
/**DealInfoRequest*/
export interface DealInfoRequest {
/**(必填)主成交ID*/
dealId: number;
/**(必填)告知书ID*/
noticeId: number;
}
/**DeleteDealNoticeInfoRequest*/
export interface DeleteDealNoticeInfoRequest {
/**(必填)主成交ID*/
dealId: number;
/**(必填)补充报告ID*/
supplementaryReportId: number;
}
/**Distribution*/
export interface Distribution {
/**代理费结算条件*/
agencyCostCondition: string;
/**代理费结算方式*/
agencyCostSettleWay: string;
/**代理费计付标准备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**分销协议ID*/
agencyId: number;
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**渠道账户*/
channelAccount: string;
/**渠道开户行*/
channelAccountBank: string;
/**渠道账户名*/
channelAccountName: string;
/**渠道地址*/
channelAddress: string;
/**渠道公司*/
channelCompanyId: number;
/**渠道联系人*/
channelContact: string;
/**渠道联系人*/
channelContactTel: string;
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelLevel: string;
/**客户成交以及确认*/
consumerComplete: string;
/**合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**合同编号*/
contractNo: string;
/**合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同副标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期ID*/
cycleId: number;
/**已删除*/
deleted: number;
/**指定中介行多选*/
designatedAgency: string;
/**指定中介行ID*/
designatedAgencyId: number;
/**审核状态(Distributed-已派发、NotDistributed-待派发、Pending-待审核、Drafting-起草、Disallowance-驳回)*/
distributionState: string;
/**合同电子版编号*/
electronicContractNo: string;
/**录入人*/
entryPersonId: number;
/**店组ID*/
groupId: number;
/**合同跟进人*/
handlerId: number;
/**主键*/
id: number;
/**归属组织*/
organizationId: number;
/**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司Id 甲方合同-乙方*/
partyCompanyId: string;
/**甲方地址*/
partyaAddr: string;
/**甲方联系人*/
partyaMan: string;
/**甲方联系人电话*/
partyaTel: string;
/**项目地址*/
projectAddress: string;
/**关联项目*/
projectId: number;
/**补充条款*/
supplementary: string;
/**违约责任*/
unContractLiability: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**版本号*/
version: number;
}
/**DistributionAnnexCreateList*/
export interface DistributionAnnexCreateList {
/**附件后缀*/
attachmentSuffix: string;
/**附件编码*/
fileNo: string;
/**附件类型(Stamped-战略已盖章扫描件、NotStamped-战略未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
}
/**DistributionAnnexCreateRequest*/
export interface DistributionAnnexCreateRequest {
/**(必填)附件编码*/
annexCreateListList: DistributionAnnexCreateList[];
/**(必填)渠道合同ID*/
distributionId: number;
}
/**DistributionAnnexDeleteRequestVo*/
export interface DistributionAnnexDeleteRequestVo {
/**渠道合同ID*/
distributionId: number;
/**(必填)附件编码列表*/
fileNos: string[];
}
/**DistributionAnnexScanArchiveVo*/
export interface DistributionAnnexScanArchiveVo {
/**分销协议ID*/
distributionId: number;
}
/**DistributionChangesStateRequestVO*/
export interface DistributionChangesStateRequestVO {
/**协议ID*/
ids: number[];
}
/**DistributionChannelRequest*/
export interface DistributionChannelRequest {
/**(必填)渠道ID*/
channelCompanyIds: number[];
/**(必填)周期ID*/
cycleId: number;
/**(必填)甲方ID*/
partyCompanyIds: number[];
}
/**DistributionChannelResponse*/
export interface DistributionChannelResponse {
/**(必填)渠道账户*/
channelAccount: string;
/**(必填)渠道开户行*/
channelAccountBank: string;
/**(必填)渠道账户名*/
channelAccountName: string;
/**(必填)渠道公司*/
channelCompanyId: number;
/**(必填)渠道联系人*/
channelContact: string;
/**(必填)渠道联系人电话*/
channelContactTel: string;
/**(必填)渠道等级(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelLevel: string;
}
/**DistributionChannelTypeResponse*/
export interface DistributionChannelTypeResponse {
/**(必填)渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**(必填)渠道合同编号*/
contractNo: string;
/**(必填)指定中介行ID*/
designatedAgencyId: number;
}
/**DistributionCreateRequestVO*/
export interface DistributionCreateRequestVO {
/**代理费结算条件*/
agencyCostCondition: string;
/**代理费结算方式*/
agencyCostSettleWay: string;
/**代理费计付标准备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**分销协议ID*/
agencyId: number;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**渠道账户*/
channelAccount: string;
/**渠道开户行*/
channelAccountBank: string;
/**渠道账户名*/
channelAccountName: string;
/**渠道地址*/
channelAddress: string;
/**渠道公司*/
channelCompanyId: number;
/**渠道联系人*/
channelContact: string;
/**渠道联系人电话*/
channelContactTel: string;
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelLevel: string;
/**客户成交以及确认*/
consumerComplete: string;
/**合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同副标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**周期ID*/
cycleId: number;
/**指定中介行多选*/
designatedAgency: string;
/**指定中介行ID*/
designatedAgencyId: number;
/**收派信息*/
distributionMxList: DistributionMxCreateRequestVO[];
/**派发状态(Distributed-已派发、NotDistributed-待派发、Pending-待审核、Drafting-起草、Disallowance-驳回)*/
distributionState: string;
/**合同跟进人*/
handlerId: number;
/**归属组织*/
organizationId: number;
/**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司Id 甲方合同-乙方*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**甲方联系人*/
partyaMan: string;
/**甲方联系人电话*/
partyaTel: string;
/**补充条款*/
supplementary: string;
/**违约责任*/
unContractLiability: string;
}
/**DistributionDetailVO*/
export interface DistributionDetailVO {
/**代理费结算条件*/
agencyCostCondition: string;
/**代理费结算方式*/
agencyCostSettleWay: string;
/**代理费计付标准备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**附件信息*/
annexList: AnnexListVO[];
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**渠道账户*/
channelAccount: string;
/**渠道开户行*/
channelAccountBank: string;
/**渠道账户名*/
channelAccountName: string;
/**渠道地址*/
channelAddress: string;
/**渠道公司*/
channelCompanyId: number;
/**渠道公司名字*/
channelCompanyName: string;
/**渠道联系人*/
channelContact: string;
/**渠道联系人*/
channelContactTel: string;
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**渠道等级(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelLevel: string;
/**客户成交以及确认*/
consumerComplete: string;
/**合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同副标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**指定中介行多选*/
designatedAgency: string;
/**指定中介行ID*/
designatedAgencyId: number;
/**收派条件*/
distributionMxList: DistributionMxQueryResponseVO[];
/**派发状态(Distributed-已派发、NotDistributed-待派发、Pending-待审核、Drafting-起草、Disallowance-驳回)*/
distributionState: string;
/**合同电子版编号*/
electronicContractNo: string;
/**合同跟进人Id*/
handlerId: number;
/**合同跟进人名字*/
handlerName: string;
/**主键*/
id: number;
/**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司 甲方合同-乙方*/
partyCompany: string;
/**甲方地址*/
partyaAddr: string;
/**甲方联系人*/
partyaMan: string;
/**甲方联系人电话*/
partyaTel: string;
/**补充条款*/
supplementary: string;
/**违约责任*/
unContractLiability: string;
}
/**DistributionEditRequest*/
export interface DistributionEditRequest {
/**(必填)代理费结算条件*/
agencyCostCondition: string;
/**(必填)代理费结算方式*/
agencyCostSettleWay: string;
/**(必填)代理费计付标准备注*/
agencyFeeRemark: string;
/**(必填)房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**(必填)房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**(必填)分销协议ID*/
agencyId: number;
/**(必填)渠道账户*/
channelAccount: string;
/**(必填)渠道开户行*/
channelAccountBank: string;
/**(必填)渠道账户名*/
channelAccountName: string;
/**(必填)渠道地址*/
channelAddress: string;
/**(必填)渠道公司*/
channelCompanyId: number;
/**(必填)渠道联系人*/
channelContact: string;
/**(必填)渠道联系人电话*/
channelContactTel: string;
/**(必填)渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**(必填)渠道等级(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelLevel: string;
/**(必填)客户成交以及确认*/
consumerComplete: string;
/**(必填)合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**(必填)合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**(必填)合同副标题*/
contractSubtitle: string;
/**(必填)合同主标题*/
contractTitle: string;
/**(必填)周期ID*/
cycleId: number;
/**(必填)指定中介行多选*/
designatedAgency: string;
/**(必填)指定中介行ID*/
designatedAgencyId: number;
/**(必填)收派信息*/
distributionMxList: DistributionMxCreateRequestVO[];
/**(必填)合同跟进人*/
handlerId: number;
/**(必填)归属组织*/
organizationId: number;
/**(必填)渠道合同ID*/
originalDistributionId: number;
/**(必填)是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**(必填)甲方公司Id 甲方合同-乙方*/
partyCompanyId: number;
/**(必填)甲方地址*/
partyaAddr: string;
/**(必填)甲方联系人*/
partyaMan: string;
/**(必填)甲方联系人电话*/
partyaTel: string;
/**(必填)补充条款*/
supplementary: string;
/**(必填)违约责任*/
unContractLiability: string;
}
/**DistributionMxCreateRequestVO*/
export interface DistributionMxCreateRequestVO {
/**收派套餐条件*/
condition: string;
/**收派套餐条件ID*/
conditionId: number;
/**佣金类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
propertyEnum: string;
/**派发条件*/
sendContext: string;
/**派发佣金标准*/
sendStandard: string;
}
/**DistributionMxPreviewResponseVO*/
export interface DistributionMxPreviewResponseVO {
/**佣金类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
propertyEnum: string;
/**派发条件*/
sendContext: string;
/**派发佣金标准*/
sendStandard: string;
}
/**DistributionMxQueryRequestVO*/
export interface DistributionMxQueryRequestVO {
/**渠道商公司ID*/
channelCompanyId: number;
/**周期ID*/
cycleId: number;
/**渠道合同编号*/
distributionNo: string;
}
/**DistributionMxQueryResponseVO*/
export interface DistributionMxQueryResponseVO {
/**垫佣情况：Yes 垫佣，No 未垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
advancementSituation: string;
/**收派套餐条件*/
condition: string;
/**条件ID*/
conditionId: number;
/**渠道合同编号*/
contractNo: string;
/**佣金类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
propertyEnum: string;
/**派发条件*/
sendContext: string;
/**派发佣金标准*/
sendStandard: string;
}
/**DistributionOperatingLogListRequest*/
export interface DistributionOperatingLogListRequest {
/**渠道合同(外键)*/
distributionId: number;
/**渠道合同编号*/
distributionNo: string;
/**操作人*/
operatingId: number;
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、SignArchive-签署归档、GetVerificationCode-获取验证码、VerificationCode-短信验证码校验、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件、OaStateChange-OA状态更变、ChannelContractReview-渠道合同审核、ChannelContractDisallowance-渠道合同驳回、ChannelContractDistribute-渠道合同派发、ChannelContractWithdraw-渠道合同撤回、ChannelContractOriginalArchive-渠道合同原件归档、ChannelContractScannedFileArchive-渠道合同扫描件归档、ChannelContractDeleteAnnex-渠道合同删除附件、ChannelContractCreateAnnex-渠道合同新增附件、ChannelContractEdit-渠道合同编辑)*/
operatingType: string;
/**操作开始时间(yyyy-MM-dd HH:mm:ss)*/
operationBeginTime: string;
/**操作描述*/
operationDescription: string;
/**操作结束时间(yyyy-MM-dd HH:mm:ss)*/
operationEndTime: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**DistributionOperatingLogListResponse*/
export interface DistributionOperatingLogListResponse {
/**渠道合同(外键)*/
distributionId: number;
/**渠道合同编号*/
distributionNo: string;
/**主键*/
id: number;
/**操作人*/
operatingId: number;
/**操作参数*/
operatingParameters: string;
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、SignArchive-签署归档、GetVerificationCode-获取验证码、VerificationCode-短信验证码校验、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件、OaStateChange-OA状态更变、ChannelContractReview-渠道合同审核、ChannelContractDisallowance-渠道合同驳回、ChannelContractDistribute-渠道合同派发、ChannelContractWithdraw-渠道合同撤回、ChannelContractOriginalArchive-渠道合同原件归档、ChannelContractScannedFileArchive-渠道合同扫描件归档、ChannelContractDeleteAnnex-渠道合同删除附件、ChannelContractCreateAnnex-渠道合同新增附件、ChannelContractEdit-渠道合同编辑)*/
operatingType: string;
/**操作描述*/
operationDescription: string;
/**操作结果*/
operationResult: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operationTime: string;
}
/**DistributionOriginalArchiveVO*/
export interface DistributionOriginalArchiveVO {
/**归档编号*/
archiveNo: string;
/**分销协议ID*/
distributionId: number;
}
/**DistributionPreviewResponseVO*/
export interface DistributionPreviewResponseVO {
/**代理费结算条件*/
agencyCostCondition: string;
/**代理费结算方式*/
agencyCostSettleWay: string;
/**备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费逾期违约金比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**乙方账户*/
channelAccount: string;
/**乙方开户行*/
channelAccountBank: string;
/**乙方账户名*/
channelAccountName: string;
/**乙方地址*/
channelAddress: string;
/**乙方公司*/
channelCompany: string;
/**乙方联系人*/
channelContact: string;
/**乙方电话*/
channelContactTel: string;
/**客户成交及确认*/
consumerComplete: string;
/**合同主标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**负责人*/
customer: string;
/**负责人电话*/
customerNo: string;
/**周期结束时间(yyyy-MM-dd HH:mm:ss)*/
cycleEnd: string;
/**周期开始时间(yyyy-MM-dd HH:mm:ss)*/
cycleStart: string;
/**收派条件*/
distributionMxList: DistributionMxPreviewResponseVO[];
/**甲方地址*/
partyCompany: string;
/**甲方联系人*/
partyaMan: string;
/**甲方电话*/
partyaTel: string;
/**合作项目*/
projectsName: string;
/**备案名称*/
recordName: string;
/**补充条款*/
supplementary: string;
/**违约责任*/
unContractLiability: string;
}
/**DistributionQueryRequestVO*/
export interface DistributionQueryRequestVO {
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**合作开始时间(yyyy-MM-dd)*/
beginTime: string;
/**乙方公司*/
channelCompanyId: number;
/**合同编号*/
contractNo: string;
/**周期*/
cycleId: number;
/**审核状态(Distributed-已派发、NotDistributed-待派发、Pending-待审核、Drafting-起草、Disallowance-驳回)*/
distributionState: string;
/**合作结束时间(yyyy-MM-dd)*/
endTime: string;
/**合同录入人*/
entryPerson: number;
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
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**合作开始时间(yyyy-MM-dd)*/
beginTime: string;
/**乙方公司*/
channelCompanyId: number;
/**乙方公司名字*/
channelCompanyName: string;
/**合同编号*/
contractNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期*/
cycleId: number;
/**周期名字*/
cycleName: string;
/**已删除*/
deleted: number;
/**审核状态(Distributed-已派发、NotDistributed-待派发、Pending-待审核、Drafting-起草、Disallowance-驳回)*/
distributionState: string;
/**合作结束时间(yyyy-MM-dd)*/
endTime: string;
/**合同跟进人*/
handler: number;
/**合同跟进人名字*/
handlerName: string;
/**主键*/
id: number;
/**归属组织*/
organizationId: number;
/**归属组织名字*/
organizationName: string;
/**甲方公司*/
partyACompanyId: number;
/**甲方公司名字*/
partyACompanyName: string;
/**项目地址*/
projectAddress: string;
/**项目*/
projectId: number;
/**项目名字*/
projectName: string;
/**标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**EqianbaoNoticeDeveloperParam*/
export interface EqianbaoNoticeDeveloperParam {
/**签署人账号ID*/
accountId: string;
/**业务类型 SIGN_FLOW_UPDATE(签署完成通知) SIGN_FLOW_FINISH(流程结束通知)*/
action: string;
/**签署任务发起时间 格式yyyy-MM-dd HH:mm:ss(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**签署任务结束时间 格式yyyy-MM-dd HH:mm:ss(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**流程ID*/
flowId: string;
/**任务状态 2-已完成: 所有签署人完成签署；3-已撤销: 发起方撤销签署任务；5-已过期: 签署截止日到期后触发；7-已拒签*/
flowStatus: string;
/**签署人顺序*/
order: number;
/**拒签或失败时，附加的原因描述*/
resultDescription: string;
/**签署结果 2:签署完成 3:失败 4:拒签*/
signResult: number;
/**签署时间或拒签时间 格式yyyy-MM-dd HH:MM:SS(yyyy-MM-dd HH:mm:ss)*/
signTime: string;
/**当流程异常结束时，附加终止原因描述*/
statusDescription: string;
/**订单号*/
thirdOrderNo: string;
/**时间戳*/
timestamp: number;
}
/**NoticeAgreementCreateRequest*/
export interface NoticeAgreementCreateRequest {
/**(必填)成交报告ID*/
dealId: number;
/**新房号：房号发生改变的时候，参数必传*/
newHouseId: number;
/**新栋座: 房号发生改变的时候，参数必传*/
newUnit: number;
/**(必填)告知书*/
noticeDealList: NoticeDealCreate[];
/**(必填)客户信息*/
ownerList: NoticeOwnerEditVO[];
/**(必填)客户类型(Personal-个人、Enterprise-企业)*/
ownerType: string;
/**(必填)补充报告应收费用*/
receivable: number;
/**应退款金额*/
refundableAmount: number;
/**(必填)补充成交报告ID*/
supplementDealId: number;
/**(必填)补充报告状态(Create-创建、Update-更新)*/
supplementalReportStatus: string;
}
/**NoticeConfirmationRequest*/
export interface NoticeConfirmationRequest {
/**(必填)栋座*/
buyUnit: number;
/**(必填)成交报告ID*/
dealId: number;
/**(必填)房号*/
roomNumberId: number;
}
/**NoticeCreateRequestVO*/
export interface NoticeCreateRequestVO {
/**栋座*/
buyUnit: number;
/**录入渠道(Customer-客户、CustomerService-客服)*/
channel: string;
/**立项周期主键*/
cycleId: number;
/**成交报告ID*/
dealId: number;
/**优惠方式说明*/
explain: string;
/**告知书附件*/
noticeAttachmentList: AnnexEditVO[];
/**业主信息不能为空*/
ownerList: NoticeOwnerEditVO[];
/**业主类型(Personal-个人、Enterprise-企业)*/
ownerType: string;
/**服务费缴纳金额*/
paymentAmount: number;
/**优惠方式-手动填写/自动选择(Manual-自定义、Automatic-选择)*/
promotionMethod: string;
/**退款天数*/
refundDays: number;
/**房号*/
roomNumberId: number;
/**电子模板/纸质模板(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
}
/**NoticeCustomerInformationRequest*/
export interface NoticeCustomerInformationRequest {
/**(必填)新栋座*/
buyUnit: number;
/**(必填)成交报告ID/补充报告ID*/
dealId: number;
/**(必填)新房号*/
roomNumberId: number;
}
/**NoticeCustomerInformationResponse*/
export interface NoticeCustomerInformationResponse {
/**客户信息*/
customerInformationList: CustomerInformation[];
/**告知书ID*/
noticeId: number;
/**告知书编号*/
noticeNo: string;
/**告知书状态(WaitDetermine-信息待确认、WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、BecomeEffective-已生效、Invalidation-失效)*/
notificationStatus: string;
/**告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**客户类型(Personal-个人、Enterprise-企业)*/
ownerType: string;
/**预览编号*/
templateId: string;
/**模版类型：PaperTemplate("纸质模板"), ElectronicTemplate("电子模版") (PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
}
/**NoticeDealCreate*/
export interface NoticeDealCreate {
/**附件列表*/
annexList: AnnexEditVO[];
/**优惠方式说明*/
explain: string;
/**(必填)告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**优惠金额*/
paymentAmount: number;
/**(必填)优惠选择方式  自定义：Manual  选择： Automatic (Manual-自定义、Automatic-选择)*/
promotionMethod: string;
/**原因： 终止协议必填(DiscountChange-换房涉及优惠折扣变更、Rename-更名、InformationError-原购房优惠告知书信息填写错误、checkOut-退房、ServiceFeeReduction-服务费减免、other-其他)*/
reason: string;
/**原因描述：终止协议必填*/
reasonDescription: string;
/**(必填)模版类型(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
}
/**NoticeDetailResponseVO*/
export interface NoticeDetailResponseVO {
/**案场经办人*/
agentId: number;
/**案场经办人名称*/
agentName: number;
/**优惠期限开始时间(yyyy-MM-dd)*/
beginTime: string;
/**栋座*/
buyUnit: number;
/**栋座名字*/
buyUnitName: string;
/**周期Id*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**优惠期限结束时间(yyyy-MM-dd)*/
endTime: string;
/**优惠方式说明*/
explain: string;
/**undefined*/
id: number;
/**告知书附件*/
noticeAttachmentList: AnnexListVO[];
/**告知书编号*/
noticeNo: string;
/**告知书状态(WaitDetermine-信息待确认、WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、BecomeEffective-已生效、Invalidation-失效)*/
notificationStatus: string;
/**告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**旧栋座*/
oldBuyUnit: number;
/**旧栋座名字*/
oldBuyUnitName: string;
/**旧房号*/
oldRoomNumberId: number;
/**旧房号名字*/
oldRoomNumberName: string;
/**乙方信息列表*/
ownerList: NoticeOwnerVO[];
/**甲方ID*/
partyAId: number;
/**甲方名字*/
partyAName: string;
/**优惠服务费缴纳金额*/
paymentAmount: number;
/**优惠项目Id*/
projectId: number;
/**优惠项目名称*/
projectName: string;
/**物业类型*/
propertyType: string;
/**退款天数*/
refundDays: number;
/**房号*/
roomNumberId: number;
/**房号名字*/
roomNumberName: string;
/**附件编号*/
templateId: string;
/**电子模板/纸质模板(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
}
/**NoticeDiscountInformationResponseVo*/
export interface NoticeDiscountInformationResponseVo {
/**经办人*/
agentId: number;
/**栋座*/
buyUnit: number;
/**栋座名字*/
buyUnitName: string;
/**立项周期主键*/
cycleId: number;
/**优惠描述说明*/
explain: string;
/**店组ID*/
groupId: number;
/**已付*/
paid: number;
/**甲方*/
partyAId: number;
/**应付*/
paymentAmount: number;
/**项目ID*/
projectId: number;
/**房号*/
roomNumberId: number;
/**房号名字*/
roomNumberName: number;
/**未付*/
unpaid: number;
}
/**NoticeEditRequestVo*/
export interface NoticeEditRequestVo {
/**栋座*/
buyUnit: number;
/**优惠告知书ID*/
noticeId: number;
/**业主信息列表*/
ownerEditList: NoticeOwnerEditVO[];
/**房号*/
roomNumberId: number;
}
/**NoticeInformationStatusRequestVo*/
export interface NoticeInformationStatusRequestVo {
/**优惠告知书ID*/
noticeId: number;
}
/**NoticeListResponseVo*/
export interface NoticeListResponseVo {
/**告知书ID*/
id: number;
/**告知书编号*/
noticeNo: string;
/**告知书状态(WaitDetermine-信息待确认、WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、BecomeEffective-已生效、Invalidation-失效)*/
notificationStatus: string;
/**告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**模版ID*/
templateId: string;
}
/**NoticeLogPageResponse*/
export interface NoticeLogPageResponse {
/**主键*/
id: number;
/**告知书协议主键*/
noticeId: number;
/**告知书协议编号*/
noticeNo: string;
/**协议类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**操作参数*/
operatingParameters: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operatingTime: string;
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、SignArchive-签署归档、GetVerificationCode-获取验证码、VerificationCode-短信验证码校验、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件、OaStateChange-OA状态更变、ChannelContractReview-渠道合同审核、ChannelContractDisallowance-渠道合同驳回、ChannelContractDistribute-渠道合同派发、ChannelContractWithdraw-渠道合同撤回、ChannelContractOriginalArchive-渠道合同原件归档、ChannelContractScannedFileArchive-渠道合同扫描件归档、ChannelContractDeleteAnnex-渠道合同删除附件、ChannelContractCreateAnnex-渠道合同新增附件、ChannelContractEdit-渠道合同编辑)*/
operatingType: string;
/**操作描述*/
operationDescription: string;
/**操作结果*/
operationResult: string;
/**操作人*/
operatorId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**NoticeLogQueryVO*/
export interface NoticeLogQueryVO {
/**告知书协议主键*/
noticeId: number;
/**告知书协议编号*/
noticeNo: string;
/**协议类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**操作开始时间(yyyy-MM-dd HH:mm:ss)*/
operatingBeginTime: string;
/**操作结束时间(yyyy-MM-dd HH:mm:ss)*/
operatingEndTime: string;
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、SignArchive-签署归档、GetVerificationCode-获取验证码、VerificationCode-短信验证码校验、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件、OaStateChange-OA状态更变、ChannelContractReview-渠道合同审核、ChannelContractDisallowance-渠道合同驳回、ChannelContractDistribute-渠道合同派发、ChannelContractWithdraw-渠道合同撤回、ChannelContractOriginalArchive-渠道合同原件归档、ChannelContractScannedFileArchive-渠道合同扫描件归档、ChannelContractDeleteAnnex-渠道合同删除附件、ChannelContractCreateAnnex-渠道合同新增附件、ChannelContractEdit-渠道合同编辑)*/
operatingType: string;
/**操作人*/
operatorId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**NoticeOwner*/
export interface NoticeOwner {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**主键*/
id: number;
/**通知书主键*/
noticeId: number;
/**业主证件号码*/
ownerCertificateNo: string;
/**业主联系电话*/
ownerMobile: string;
/**业主名字*/
ownerName: string;
/**签署标示(Yes-是、No-否)*/
signingStatus: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticeOwnerCertificationResponseVO*/
export interface NoticeOwnerCertificationResponseVO {
/**告知书ID*/
noticeId: number;
/**业主证件号码*/
ownerCertificateNo: string;
/**业主联系电话*/
ownerMobile: string;
/**业主名字*/
ownerName: string;
/**个人/公司(Personal-个人、Enterprise-企业)*/
ownerType: string;
}
/**NoticeOwnerCertificationVo*/
export interface NoticeOwnerCertificationVo {
/**告知书ID*/
noticeId: number;
/**业主证件号码*/
ownerCertificateNo: string;
/**业主联系电话*/
ownerMobile: string;
/**业主名字*/
ownerName: string;
}
/**NoticeOwnerEditVO*/
export interface NoticeOwnerEditVO {
/**ID*/
id: number;
/**业主证件号码*/
ownerCertificateNo: string;
/**业主联系电话*/
ownerMobile: string;
/**业主名字*/
ownerName: string;
}
/**NoticeOwnerInformationChangesRequest*/
export interface NoticeOwnerInformationChangesRequest {
/**(必填)业主证件号码*/
ownerCertificateNo: string;
/**(必填)业主联系电话*/
ownerMobile: string;
/**(必填)业主名字*/
ownerName: string;
/**(必填)签署标示: 默认第一条数据时Yes(Yes-是、No-否)*/
signingStatus: string;
}
/**NoticeOwnerVO*/
export interface NoticeOwnerVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**主键*/
id: number;
/**通知书主键*/
noticeId: number;
/**业主证件号码*/
ownerCertificateNo: string;
/**业主联系电话*/
ownerMobile: string;
/**业主名字*/
ownerName: string;
/**签署标示(Yes-是、No-否)*/
signingStatus: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticeOwnerVerificationRequestVO*/
export interface NoticeOwnerVerificationRequestVO {
/**告知书ID*/
noticeId: number;
/**业主证件号码*/
ownerCertificateNo: string;
/**业主联系电话*/
ownerMobile: string;
/**业主名字*/
ownerName: string;
/**短信验证码*/
verificationCode: string;
}
/**NoticeOwnerWeChatResponseVO*/
export interface NoticeOwnerWeChatResponseVO {
/**业主证件号码*/
ownerCertificateNo: string;
/**业主联系电话*/
ownerMobile: string;
/**业主名字*/
ownerName: string;
}
/**NoticePageResponseVO*/
export interface NoticePageResponseVO {
/**区域*/
area: string;
/**栋座*/
buyUnit: number;
/**栋座名字*/
buyUnitName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期Id*/
cycleId: number;
/**周期名字*/
cycleName: string;
/**已删除*/
deleted: number;
/**undefined*/
id: number;
/**编号*/
noticeNo: string;
/**状态(WaitDetermine-信息待确认、WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、BecomeEffective-已生效、Invalidation-失效)*/
notificationStatus: string;
/**类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**乙方信息*/
ownerList: NoticeOwnerEditVO[];
/**甲方ID*/
partyAId: number;
/**甲方名字*/
partyAName: string;
/**项目ID*/
projectId: number;
/**项目名称*/
projectName: string;
/**房号*/
roomNumberId: number;
/**房号名字*/
roomNumberName: string;
/**附件编号*/
templateId: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticePreview*/
export interface NoticePreview {
/**(必填)优惠方式说明*/
explain: string;
/**(必填)优惠方式说明*/
paymentAmount: number;
/**原因： 终止协议必填(DiscountChange-换房涉及优惠折扣变更、Rename-更名、InformationError-原购房优惠告知书信息填写错误、checkOut-退房、ServiceFeeReduction-服务费减免、other-其他)*/
reason: string;
/**原因描述：终止协议必填*/
reasonDescription: string;
}
/**NoticePreviewRequest*/
export interface NoticePreviewRequest {
/**(必填)栋座*/
buyUnit: number;
/**(必填)告知书*/
noticePreviewList: NoticePreview[];
/**(必填)告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**(必填)原告知书信息*/
originalNotices: string[];
/**(必填)客户信息*/
ownerList: NoticeOwnerInformationChangesRequest[];
/**(必填)房号*/
roomNumberId: number;
}
/**NoticePurchaseInformationResponseVo*/
export interface NoticePurchaseInformationResponseVo {
/**栋座*/
buyUnit: number;
/**栋座中文*/
buyUnitName: string;
/**业主信息*/
ownerWeChatList: NoticeOwnerWeChatResponseVO[];
/**项目ID*/
projectId: number;
/**项目名字*/
projectName: string;
/**物业信息*/
propertyType: string;
/**房号ID*/
roomNumberId: number;
/**房号中文*/
roomNumberName: string;
}
/**NoticeQueryRequestVo*/
export interface NoticeQueryRequestVo {
/**优惠告知书ID*/
noticeId: number;
/**业主联系电话*/
ownerMobile: string;
/**房号*/
roomNumberId: number;
}
/**NoticeQueryVO*/
export interface NoticeQueryVO {
/**区域*/
area: string;
/**优惠期限开始时间(yyyy-MM-dd)*/
beginTime: string;
/**栋座*/
buyUnit: number;
/**立项周期主键*/
cycleId: number;
/**优惠期限结束时间(yyyy-MM-dd)*/
endTime: string;
/**优惠告知书编号*/
noticeNo: string;
/**状态*/
notificationStatuses: string[];
/**类型*/
notificationTypes: string[];
/**客户电话*/
ownerMobile: string;
/**客户*/
ownerName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方ID*/
partyAId: number;
/**项目ID*/
projectId: number;
/**房号*/
roomNumberId: number;
}
/**NoticeSignRequestVo*/
export interface NoticeSignRequestVo {
/**告知书ID*/
id: number;
}
/**NoticeSignResponseVo*/
export interface NoticeSignResponseVo {
/**认证信息*/
certificationResponseVO: NoticeOwnerCertificationResponseVO;
/**认证状态,默认已认证状态(Verified-已认证、notCertified-未认证)*/
certificationStatus: string;
/**签署地址*/
signedAddress: string;
}
/**NoticeTemplateDetailResponseVO*/
export interface NoticeTemplateDetailResponseVO {
/**告知书信息*/
noticeId: number;
/**模版ID*/
templateId: string;
}
/**NoticeVO*/
export interface NoticeVO {
/**退款申请书银行账户*/
account: string;
/**退款申请书开户人名字*/
accountHolderName: string;
/**经办人*/
agentId: number;
/**区域*/
area: string;
/**退款申请书银行名字*/
bankName: string;
/**优惠期限开始时间(yyyy-MM-dd)*/
beginTime: string;
/**退款申请书支行名称*/
branchName: string;
/**栋座*/
buyUnit: number;
/**录入渠道(Customer-客户、CustomerService-客服)*/
channel: string;
/**退款申请书市编码*/
cityCode: string;
/**退款申请书市名字*/
cityName: string;
/**确认时间(yyyy-MM-dd HH:mm:ss)*/
confirmTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**立项周期主键*/
cycleId: number;
/**成交报告ID*/
dealId: number;
/**已删除*/
deleted: number;
/**生效时间(yyyy-MM-dd HH:mm:ss)*/
effectiveTime: string;
/**优惠期限结束时间(yyyy-MM-dd)*/
endTime: string;
/**优惠方式说明*/
explain: string;
/**告知书ID*/
fatherId: number;
/**E签宝文件ID*/
fileId: string;
/**E签宝流程ID*/
flowId: string;
/**店组ID*/
groupId: number;
/**主键*/
id: number;
/**通知书编号*/
noticeNo: string;
/**状态(WaitDetermine-信息待确认、WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、BecomeEffective-已生效、Invalidation-失效)*/
notificationStatus: string;
/**告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**业主类型(Personal-个人、Enterprise-企业)*/
ownerType: string;
/**甲方*/
partyAId: number;
/**优惠服务费缴纳金额*/
paymentAmount: number;
/**付款时间(yyyy-MM-dd HH:mm:ss)*/
paymentTime: string;
/**项目ID*/
projectId: number;
/**优惠方式-手动填写/自动选择(Manual-自定义、Automatic-选择)*/
promotionMethod: string;
/**退款申请书省编码*/
provinceCode: string;
/**退款申请书省名字*/
provinceName: string;
/**补充协议/终止协议原因(DiscountChange-换房涉及优惠折扣变更、Rename-更名、InformationError-原购房优惠告知书信息填写错误、checkOut-退房、ServiceFeeReduction-服务费减免、other-其他)*/
reason: string;
/**原因描述*/
reasonDescription: string;
/**甲方退款天数*/
refundDays: number;
/**房号*/
roomNumberId: number;
/**签署时间(yyyy-MM-dd HH:mm:ss)*/
signedTime: string;
/**模版ID*/
templateId: string;
/**电子模板/纸质模板(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticeWeChatDetailResponseVo*/
export interface NoticeWeChatDetailResponseVo {
/**优惠信息*/
discountInformationResponseVo: NoticeDiscountInformationResponseVo;
/**优惠告知书ID*/
noticeId: number;
/**告知书列表*/
noticeList: NoticeListResponseVo[];
/**购房信息*/
purchaseInformation: NoticePurchaseInformationResponseVo;
}
/**NoticeWeChatQueryResponseVo*/
export interface NoticeWeChatQueryResponseVo {
/**栋座*/
buyUnit: number;
/**栋座名字*/
buyUnitName: string;
/**优惠描述说明*/
explain: string;
/**优惠告知书ID*/
noticeId: number;
/**告知书状态(WaitDetermine-信息待确认、WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、BecomeEffective-已生效、Invalidation-失效)*/
notificationStatus: string;
/**服务费金额*/
paymentAmount: number;
/**项目ID*/
projectId: number;
/**项目名字*/
projectName: string;
/**物业信息*/
propertyType: string;
/**房号ID*/
roomNumberId: number;
/**房号中文*/
roomNumberName: string;
}
/**StrategyAnnexRequest*/
export interface StrategyAnnexRequest {
/**(必填)附件列表*/
annexs: AnnexCreateList[];
/**(必填)战略协议ID*/
strategyId: number;
}
/**StrategyDetailVO*/
export interface StrategyDetailVO {
/**战略协议状态：PartyA：甲方战略协议 Channel：渠道战略协议(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**盖章版归档*/
annexList: AnnexListVO[];
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveStatus: string;
/**协议开始时间(yyyy-MM-dd)*/
beginTime: string;
/**立项周期主键*/
cycleId: number;
/**立项周期名字*/
cycleName: string;
/**协议结束时间(yyyy-MM-dd)*/
endTime: string;
/**中介战略协议ID*/
id: number;
/**甲方*/
partyAId: number;
/**甲方*/
partyAName: string;
/**乙方*/
partyBId: number;
/**乙方*/
partyBNaem: string;
/**项目ID*/
projectId: number;
/**项目名字*/
projectName: string;
/**审核(Draft-草稿、BusinessUnderReview-业务系统审核中、OAUnderReview-OA审核中、ReviewRejected-审核驳回、Audited-已审核)*/
strategyApprovalStatus: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
/**StrategyEditVO*/
export interface StrategyEditVO {
/**(必填)协议类型(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**(必填)开始时间(yyyy-MM-dd)*/
beginTime: string;
/**(必填)立项周期主键*/
cycleId: number;
/**(必填)结束时间(yyyy-MM-dd)*/
endTime: string;
/**(必填)保存类型(Draft-草稿、Review-审核)*/
entryType: string;
/**(必填)id*/
id: number;
/**(必填)附件信息*/
originalList: AnnexEditVO[];
/**(必填)甲方ID*/
partyAId: number;
/**(必填)乙方ID*/
partyBId: number;
/**(必填)项目ID*/
projectId: number;
/**(必填)标题*/
title: string;
}
/**StrategyListVO*/
export interface StrategyListVO {
/**协议编号*/
agreementNo: string;
/**战略协议状态：PartyA：甲方战略协议 Channel：渠道战略协议(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveState: string;
/**主键*/
id: number;
/**甲方*/
partyAId: number;
/**甲方名字*/
partyAName: string;
/**乙方*/
partyBId: number;
/**乙方名字*/
partyBName: string;
/**审核状态(Draft-草稿、BusinessUnderReview-业务系统审核中、OAUnderReview-OA审核中、ReviewRejected-审核驳回、Audited-已审核)*/
strategyApprovalStatus: string;
/**标题*/
title: string;
}
/**StrategyOriginalRequest*/
export interface StrategyOriginalRequest {
/**(必填)归档编号*/
archiveNo: string;
/**(必填)id*/
id: number;
}
/**StrategyPageQueryVO*/
export interface StrategyPageQueryVO {
/**协议编号*/
agreementNo: string;
/**战略协议状态：PartyA：甲方战略协议 Channel：渠道战略协议(PartyA-甲方战略协议、Channel-渠道战略协议)*/
agreementType: string;
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、ScansAreArchived-扫描件已归档)*/
archiveState: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方*/
partyAId: number;
/**乙方*/
partyBId: number;
/**审核状态(Draft-草稿、BusinessUnderReview-业务系统审核中、OAUnderReview-OA审核中、ReviewRejected-审核驳回、Audited-已审核)*/
strategyApprovalStatus: string;
/**标题*/
title: string;
}
