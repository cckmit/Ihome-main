/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-1 9:09:40 ├F10: AM┤
import { request } from '@/api/base'
const basePath = "/sales-api/contract"
/**附件上传*/
export async function post_contract_annex (d?: any) {
return await request.post< string,string> (basePath+'/contract/annex', d)
}
/**删除立项关联*/
export async function delete_contract_associated (d?: any) {
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
/**甲方合同详情*/
export async function get_contract_detail__id (d?: any) {
return await request.get<ContractDetailVO,ContractDetailVO>(basePath+'/contract/detail/{id}', { params: d })
}
/**扫描件归档*/
export async function post_contract_duplicate__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/duplicate/{id}', d)
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
/**立项关联甲方合同*/
export async function post_contract_related_cycle (d?: any) {
return await request.post< ContractRelatedCycleResponseVO[],ContractRelatedCycleResponseVO[]> (basePath+'/contract/related/cycle', d)
}
/**甲方合同操作日志*/
export async function post_contractOperatingLog_list (d?: any) {
return await request.post< PageModel<ContractOperatingLogListResponse>,PageModel<ContractOperatingLogListResponse>> (basePath+'/contractOperatingLog/list', d)
}
/**中介分销合同申领*/
export async function post_distribution_create (d?: any) {
return await request.post< number,number> (basePath+'/distribution/create', d)
}
/**盖章版删除*/
export async function delete_distribution_delete_annex (d?: any) {
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
/**中介分销合同列表*/
export async function post_distribution_list (d?: any) {
return await request.post< PageModel<DistributionQueryResponseVO>,PageModel<DistributionQueryResponseVO>> (basePath+'/distribution/list', d)
}
/**中介分销合同原件归档*/
export async function post_distribution_original_archive (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/original/archive', d)
}
/**中介分销合同审核*/
export async function post_distribution_review (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/review', d)
}
/**中介分销合同微信列表*/
export async function post_distribution_wechatList (d?: any) {
return await request.post< DistributionWeChatPreviewVO[],DistributionWeChatPreviewVO[]> (basePath+'/distribution/wechatList', d)
}
/**中介分销合同撤回*/
export async function post_distribution_withdraw (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/withdraw', d)
}
/**分销协议收派套餐查询*/
export async function post_distributionmx_receive_detail (d?: any) {
return await request.post< DistributionMxQueryResponseVO[],DistributionMxQueryResponseVO[]> (basePath+'/distributionmx/receive/detail', d)
}
/**甲方合同导出列表*/
export async function post_export_contract_list (d?: any) {
return await request.post< boolean,boolean> (basePath+'/export/contract/list', d)
}
/**优惠告知书改变信息状态*/
export async function post_notice_Information_status (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/Information/status', d)
}
/**优惠告知书申领*/
export async function post_notice_create (d?: any) {
return await request.post< NoticeTemplateDetailResponseVO,NoticeTemplateDetailResponseVO> (basePath+'/notice/create', d)
}
/**补充协议创建*/
export async function post_notice_create_supplementary_agreement (d?: any) {
return await request.post< number,number> (basePath+'/notice/create/supplementary/agreement', d)
}
/**优惠告知书明细*/
export async function get_notice_detail__id (d?: any) {
return await request.get<NoticeDetailResponseVO,NoticeDetailResponseVO>(basePath+'/notice/detail/{id}', { params: d })
}
/**优惠告知书列表*/
export async function post_notice_list (d?: any) {
return await request.post< PageModel<NoticePageResponseVO>,PageModel<NoticePageResponseVO>> (basePath+'/notice/list', d)
}
/**支付后平台签署*/
export async function post_notice_platform_sign__noticeId (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/platform/sign/{noticeId}', d)
}
/**优惠告知书预览*/
export async function post_notice_preview__noticeId (d?: any) {
return await request.post< NoticePreviewResponseVo,NoticePreviewResponseVo> (basePath+'/notice/preview/{noticeId}', d)
}
/**签署回调*/
export async function post_notice_signCallback (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/signCallback', d)
}
/**优惠告知书编辑*/
export async function post_notice_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/update', d)
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
/**删除业主信息*/
export async function post_noticeOwner_detail__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/noticeOwner/detail/{id}', d)
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
/**AnnexCreateRequest*/
export interface AnnexCreateRequest {
/**附件后缀*/
attachmentSuffix: string;
/**id*/
contractId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**附件编号*/
fileNo: string;
/**附件类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**AnnexDeleteRequest*/
export interface AnnexDeleteRequest {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**附件编号*/
fileNo: string;
/**附件类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
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
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**附件编号*/
fileNo: string;
/**附件类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
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
/**类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractDetailVO*/
export interface ContractDetailVO {
/**归档编号*/
archiveNo: string;
/**成交确认人*/
confirmer: number;
/**成交确认人联系方式*/
confirmerContact: string;
/**协议编号*/
contractNo: string;
/**合作项目ID*/
cooperationProjectsId: number;
/**合作项目名字*/
cooperationProjectsName: string;
/**合作时间(yyyy-MM-dd)*/
cooperationTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**附件信息*/
fileList: AnnexListVO[];
/**合同跟进人Id*/
handlerId: number;
/**合同跟进人名字*/
handlerName: string;
/**甲方合同ID*/
id: number;
/**甲方*/
partyA: ContractPartyListVO[];
/**乙方ID*/
partyBId: number;
/**乙方名字*/
partyBName: string;
/**标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractEditVO*/
export interface ContractEditVO {
/**审核状态： 有默认值(Drafting-起草、OAUnderReview-审核中、OAReviewRejected-有效、OAAudited-已审核)*/
approvalStatus: string;
/**归档状态：有默认值(NotArchived-未归档、Archived-已归档)*/
archiveStatus: string;
/**成交确认人*/
confirmer: string;
/**成交确认人联系方式*/
confirmerContact: string;
/**合作项目*/
cooperationProjectsId: number;
/**合作时间(yyyy-MM-dd)*/
cooperationTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
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
/**合同标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractListVO*/
export interface ContractListVO {
/**审核状态(Drafting-起草、OAUnderReview-审核中、OAReviewRejected-有效、OAAudited-已审核)*/
approvalStatus: string;
/**归档编号*/
archiveNo: string;
/**归档状态(NotArchived-未归档、Archived-已归档)*/
archiveStatus: string;
/**合同编号*/
contractNo: string;
/**合作项目Id*/
cooperationProjectsId: string;
/**合作项目*/
cooperationProjectsName: string;
/**合作开始时间(yyyy-MM-dd)*/
cooperationTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**关联周期ID*/
cycleId: number;
/**关联周期名字*/
cycleName: string;
/**已删除*/
deleted: number;
/**合同录入人id*/
enteringPersonId: number;
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
/**关联项目ID*/
projectsId: number;
/**关联项目名字*/
projectsName: string;
/**合同标题*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractOperatingLogListRequest*/
export interface ContractOperatingLogListRequest {
/**甲方合同(外键)*/
contractId: number;
/**甲方合同编号*/
contractNo: string;
/**操作人*/
operatingId: number;
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件)*/
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
/**操作类型(CustomerSigned-发起客户签署、CustomerSignedCallback-客户签署回调、PlatformSigning-发起平台签署、PlatformSigningCallback-平台签署回调、CustomerDetermined-客户确定、CustomerReturned-客户退回、PlatformDetermined-平台退回、PlatformReturned-平台退回、Archive-扫描件归档、OriginalArchive-原件归档、RelatedProjectCycle-关联立项周期、DeleteProjectAssociation-删除立项关联、DeleteAnnex-删除附件、InsertAnnex-新增附件)*/
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
/**审核状态(Drafting-起草、OAUnderReview-审核中、OAReviewRejected-有效、OAAudited-已审核)*/
approvalStatus: string;
/**归档编号*/
archiveNo: string;
/**归档状态(NotArchived-未归档、Archived-已归档)*/
archiveStatus: string;
/**合同编号*/
contractNo: string;
/**合作开始时间(yyyy-MM-dd)*/
cooperationBeginTime: string;
/**合作结束时间(yyyy-MM-dd)*/
cooperationEndTime: string;
/**合作项目*/
cooperationProjectsId: number;
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
/**关联项目ID*/
projectsId: number;
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
/**甲方名字*/
userName: string;
}
/**ContractRelatedCycleRequestVO*/
export interface ContractRelatedCycleRequestVO {
/**合同ID*/
contractIds: number[];
/**周期ID*/
cycleId: number;
/**项目ID*/
projectsId: number;
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
handlerName: number;
/**甲方合同ID*/
id: number;
/**乙方Id*/
partyB: number;
/**甲方信息*/
partyList: ContractPartyListVO[];
/**乙方名字*/
partyName: number;
/**合同标题*/
title: string;
}
/**DistributionAnnexScanArchiveVo*/
export interface DistributionAnnexScanArchiveVo {
/**附件列表*/
annexList: DistributionScanAnnexVO[];
/**分销协议ID*/
distributionId: number;
/**操作人*/
operatorId: number;
}
/**DistributionChangesStateRequestVO*/
export interface DistributionChangesStateRequestVO {
/**协议ID*/
ids: number[];
/**操作人*/
operatorId: number;
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
/**归档状态(ScansAreNotArchived-扫描件未归档、OriginalNotArchived-原件未归档、OriginalArchived-原件已归档)*/
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
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、FirstPlatform-大型中介/一级平台、MiddlePlatform-中型中介/二级平台、SmallPlatform-小型中介、Appoint-指定中介行)*/
channelEnum: string;
/**渠道等级(BigPlatform-大平台、FirstPlatform-大型中介/一级平台、MiddlePlatform-中型中介/二级平台、SmallPlatform-小型中介、Appoint-指定中介行)*/
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
partyCompanyId: string;
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
/**归档状态(ScansAreNotArchived-扫描件未归档、OriginalNotArchived-原件未归档、OriginalArchived-原件已归档)*/
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
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、FirstPlatform-大型中介/一级平台、MiddlePlatform-中型中介/二级平台、SmallPlatform-小型中介、Appoint-指定中介行)*/
channelEnum: string;
/**渠道等级(BigPlatform-大平台、FirstPlatform-大型中介/一级平台、MiddlePlatform-中型中介/二级平台、SmallPlatform-小型中介、Appoint-指定中介行)*/
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
/**DistributionMxCreateRequestVO*/
export interface DistributionMxCreateRequestVO {
/**收派套餐条件*/
condition: string;
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
}
/**DistributionMxQueryResponseVO*/
export interface DistributionMxQueryResponseVO {
/**垫佣情况：Yes 垫佣，No 未垫佣*/
advancementSituation: string;
/**收派套餐条件*/
condition: string;
/**佣金类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
propertyEnum: string;
/**派发条件*/
sendContext: string;
/**派发佣金标准*/
sendStandard: string;
}
/**DistributionOriginalArchiveVO*/
export interface DistributionOriginalArchiveVO {
/**归档编号*/
archiveNo: string;
/**分销协议ID*/
distributionId: number;
/**操作人*/
operatorId: number;
}
/**DistributionQueryRequestVO*/
export interface DistributionQueryRequestVO {
/**归档编号*/
archiveNo: string;
/**归档状态(ScansAreNotArchived-扫描件未归档、OriginalNotArchived-原件未归档、OriginalArchived-原件已归档)*/
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
/**归档编号*/
fileCode: string;
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
/**归档状态(ScansAreNotArchived-扫描件未归档、OriginalNotArchived-原件未归档、OriginalArchived-原件已归档)*/
archiveStatus: string;
/**合作开始时间(yyyy-MM-dd)*/
beginTime: string;
/**乙方公司*/
channelCompanyId: number;
/**乙方公司名字*/
channelCompanyName: number;
/**合同编号*/
contractNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期*/
cycleId: number;
/**周期名字*/
cycleName: number;
/**已删除*/
deleted: number;
/**审核状态(Distributed-已派发、NotDistributed-待派发、Pending-待审核、Drafting-起草、Disallowance-驳回)*/
distributionState: string;
/**合作结束时间(yyyy-MM-dd)*/
endTime: string;
/**合同跟进人*/
handler: number;
/**合同跟进人名字*/
handlerName: number;
/**主键*/
id: number;
/**归属组织*/
organizationId: number;
/**归属组织名字*/
organizationName: number;
/**甲方公司*/
partyACompanyId: number;
/**甲方公司名字*/
partyACompanyName: number;
/**项目地址*/
projectAddress: string;
/**项目*/
projectId: number;
/**项目名字*/
projectName: number;
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
/**附件类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
type: string;
}
/**DistributionWeChatPreviewVO*/
export interface DistributionWeChatPreviewVO {
/**项目*/
projectName: string;
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
/**NoticeCreateRequestVO*/
export interface NoticeCreateRequestVO {
/**案场经办人*/
agentId: number;
/**单位*/
buyUnit: string;
/**录入渠道(Customer-客户、CustomerService-客服)*/
channel: string;
/**立项周期主键*/
cycleId: number;
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
/**优惠方式-手动填写/自动选择(Manual-手动、Automatic-自动)*/
promotionMethod: string;
/**退款天数*/
refundDays: number;
/**房号*/
roomNumberId: number;
/**电子模板/纸质模板(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
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
/**单位*/
buyUnit: string;
/**优惠期限结束时间(yyyy-MM-dd)*/
endTime: string;
/**优惠方式说明*/
explain: string;
/**undefined*/
id: number;
/**告知书附件*/
noticeAttachmentList: AnnexListVO[];
/**undefined*/
noticeNo: string;
/**乙方信息列表*/
ownerList: NoticeOwnerVO[];
/**undefined*/
partyAId: number;
/**甲方名字*/
partyAName: string;
/**优惠服务费缴纳金额*/
paymentAmount: number;
/**优惠项目Id*/
projectId: number;
/**优惠项目名称*/
projectName: string;
/**退款天数*/
refundDays: number;
/**房号*/
roomNumberId: number;
/**电子模板/纸质模板(PaperTemplate-纸质模板、ElectronicTemplate-电子模版)*/
templateType: string;
}
/**NoticeDiscountInformationResponseVo*/
export interface NoticeDiscountInformationResponseVo {
/**优惠描述说明*/
explain: string;
/**已付*/
paid: number;
/**应付*/
paymentAmount: number;
/**未付*/
unpaid: number;
}
/**NoticeEditRequestVo*/
export interface NoticeEditRequestVo {
/**单位*/
buyUnit: string;
/**优惠告知书ID*/
noticeId: number;
/**业主信息列表*/
ownerEditList: NoticeOwnerEditVO[];
/**房号*/
roomNumberId: number;
}
/**NoticeInformationStatusRequestVo*/
export interface NoticeInformationStatusRequestVo {
/**信息状态(Determine-确定、Return-退回、WaitDetermine-待确定)*/
informationStatus: string;
/**优惠告知书ID*/
noticeId: number;
}
/**NoticeListResponseVo*/
export interface NoticeListResponseVo {
/**告知书ID*/
id: number;
/**告知书编号*/
noticeNo: string;
/**告知书状态(WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、becomeEffective-已生效)*/
notificationStatus: string;
/**告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
/**模版ID*/
templateId: string;
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
/**签署标示(Yes-是、No-否)*/
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
/**优惠期限开始时间(yyyy-MM-dd)*/
beginTime: string;
/**单位*/
buyUnit: string;
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
/**优惠期限结束时间(yyyy-MM-dd)*/
endTime: string;
/**优惠方式说明*/
explain: string;
/**undefined*/
id: number;
/**乙方信息*/
ownerList: NoticeOwnerEditVO[];
/**甲方ID*/
partyAId: number;
/**甲方名字*/
partyAName: number;
/**优惠服务费缴纳金额*/
paymentAmount: number;
/**项目ID*/
projectId: number;
/**项目名称*/
projectName: string;
/**房号*/
roomNumberId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NoticePreviewResponseVo*/
export interface NoticePreviewResponseVo {
/**经办人Id*/
agentId: number;
/**经办人名字*/
agentName: string;
/**优惠开始时间(yyyy-MM-dd)*/
beginTime: string;
/**单元*/
buyUnit: string;
/**优惠结束时间(yyyy-MM-dd)*/
endTime: string;
/**优惠描述说明*/
explain: string;
/**优惠告知书ID*/
noticeId: number;
/**优惠告知书编号*/
noticeNo: string;
/**告知书状态(WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、becomeEffective-已生效)*/
notificationStatus: string;
/**乙方证件号码*/
ownerCertificateNo: string;
/**乙方联系方式*/
ownerMobile: string;
/**乙方名字*/
ownerName: string;
/**个人/企业(Personal-个人、Enterprise-企业)*/
ownerType: string;
/**甲方ID*/
partyAId: number;
/**甲方名字*/
partyAName: string;
/**服务费金额*/
paymentAmount: number;
/**服务费金额*/
paymentAmountChinese: string;
/**项目ID*/
projectId: number;
/**项目名字*/
projectName: string;
/**退款天数*/
refundDays: string;
/**房号ID*/
roomNumberId: number;
/**房号中文*/
roomNumberName: string;
/**签署时间(yyyy-MM-dd HH:mm:ss)*/
signedTime: string;
}
/**NoticePurchaseInformationResponseVo*/
export interface NoticePurchaseInformationResponseVo {
/**单元*/
buyUnit: string;
/**业主信息*/
ownerWeChatList: NoticeOwnerWeChatResponseVO[];
/**项目ID*/
projectId: number;
/**项目名字*/
projectName: string;
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
/**立项周期主键*/
cycleId: number;
/**优惠期限结束时间(yyyy-MM-dd)*/
endTime: string;
/**信息状态(Determine-确定、Return-退回、WaitDetermine-待确定)*/
informationStatus: string;
/**优惠告知书编号*/
noticeNo: string;
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
/**告知书类型(Notification-优惠告知书、SupplementaryAgreement-补充协议、TerminationAgreement-终止协议、Confirmation-房号确定书、RefundApplication-退款申请书)*/
notificationType: string;
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
/**单元*/
buyUnit: string;
/**优惠描述说明*/
explain: string;
/**优惠告知书ID*/
noticeId: number;
/**告知书状态(WaitBeSigned-客户待签署、WaitPay-客户待支付、WaitReview-分公司业管待审核、becomeEffective-已生效)*/
notificationStatus: string;
/**服务费金额*/
paymentAmount: number;
/**项目ID*/
projectId: number;
/**项目名字*/
projectName: string;
/**房号ID*/
roomNumberId: number;
/**房号中文*/
roomNumberName: string;
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
/**类型(Seal-已盖章扫描件、NoSeal-未盖章扫描件、ContractAnnex-甲方合同附件、ArchiveAnnex-盖章版归档附件、ScanArchiveAnnex-扫描件归档、NoticeAttachment-告知书附件)*/
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
/**SupplementaryAgreementCreateRequest*/
export interface SupplementaryAgreementCreateRequest {
/**新房号*/
newHouseId: number;
/**新项目*/
newProjectId: number;
/**新单位*/
newUnit: string;
/**告知书ID*/
noticeId: number;
/**原因*/
reason: string;
}
