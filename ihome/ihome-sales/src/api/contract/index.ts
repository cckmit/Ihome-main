/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-26 10:09:50 ├F10: AM┤
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
export async function post_contract_duplicate (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/duplicate', d)
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
export async function post_contract_original__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/contract/original/{id}', d)
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
/**中介分销合同导出*/
export async function post_distribution_export (d?: any) {
return await request.post< string,string> (basePath+'/distribution/export', d)
}
/**中介分销合同列表*/
export async function post_distribution_list (d?: any) {
return await request.post< PageModel<DistributionListVO>,PageModel<DistributionListVO>> (basePath+'/distribution/list', d)
}
/**中介分销合同原件归档*/
export async function post_distribution_original__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/original/{id}', d)
}
/**中介分销合同预览*/
export async function get_distribution_preview__id (d?: any) {
return await request.get<string,string>(basePath+'/distribution/preview/{id}', { params: d })
}
/**中介分销合同转派发*/
export async function post_distribution_push__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/push/{id}', d)
}
/**中介分销合同上传盖章版*/
export async function post_distribution_upload (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distribution/upload', d)
}
/**中介分销合同微信列表*/
export async function post_distribution_wechatList (d?: any) {
return await request.post< DistributionWechatListVO[],DistributionWechatListVO[]> (basePath+'/distribution/wechatList', d)
}
/**中介分销合同模板创建*/
export async function post_distributionTemplate_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distributionTemplate/create', d)
}
/**中介分销合同模板删除*/
export async function post_distributionTemplate_delete__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/distributionTemplate/delete/{id}', d)
}
/**中介分销合同模板列表*/
export async function post_distributionTemplate_list (d?: any) {
return await request.post< DistributionTemplateListVO[],DistributionTemplateListVO[]> (basePath+'/distributionTemplate/list', d)
}
/**中介分销合同模板预览*/
export async function get_distributionTemplate_preview__id (d?: any) {
return await request.get<string,string>(basePath+'/distributionTemplate/preview/{id}', { params: d })
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
/**优惠告知书扫描件归档*/
export async function post_notice_duplicate (d?: any) {
return await request.post< boolean,boolean> (basePath+'/notice/duplicate', d)
}
/**优惠告知书导出*/
export async function post_notice_export (d?: any) {
return await request.post< string,string> (basePath+'/notice/export', d)
}
/**优惠告知书列表*/
export async function post_notice_list (d?: any) {
return await request.post< PageModel<NoticeListVO>,PageModel<NoticeListVO>> (basePath+'/notice/list', d)
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
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**关联ID*/
relationId: number;
/**附件类型(Annex-附件、Seal-已盖章扫描件、NoSeal-未盖章扫描件)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**附件路径*/
url: string;
}
/**AnnexListVO*/
export interface AnnexListVO {
/**附件ID*/
id: number;
/**附件路径*/
url: string;
}
/**ConditionListVO*/
export interface ConditionListVO {
/**收派套餐主键*/
chargeId: number;
/**主键*/
id: number;
/**逻辑条件1(GtOrEq-大于等于、Gt-大于、Eq-等于、Lt-小于、LtOrEq-小于或等于)*/
logic1: string;
/**逻辑条件2(GtOrEq-大于等于、Gt-大于、Eq-等于、Lt-小于、LtOrEq-小于或等于)*/
logic2: string;
/**类型(House-户型、Area-面积、Sign-签约价格、Offer-认购价格)*/
type: string;
/**数值1*/
value1: number;
/**数值2*/
value2: number;
}
/**ContractDetailVO*/
export interface ContractDetailVO {
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**协议编号*/
contractCode: string;
/**成交确认人*/
customer: string;
/**成交确认人联系方式*/
customerNo: string;
/**执行时间(yyyy-MM-dd HH:mm:ss)*/
effectiveTime: string;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**归档编号*/
fileCode: string;
/**盖章版归档*/
fileList: AnnexListVO[];
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**合同跟进人*/
handler: string;
/**甲方合同ID*/
id: number;
/**中介合同电子版*/
originalList: AnnexListVO[];
/**甲方*/
partyA: ContractPartyListVO[];
/**乙方*/
partyB: number;
/**当前状态(Submit-提交、Audit-审核中、Valid-有效、Invalid-无效)*/
state: string;
/**标题*/
title: string;
}
/**ContractEditVO*/
export interface ContractEditVO {
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**录入渠道(Cycle-立项周期、Contract-合同管理)*/
channel: string;
/**成交确认人*/
customer: string;
/**成交确认人联系方式*/
customerNo: string;
/**执行时间(yyyy-MM-dd)*/
effectiveTime: string;
/**结束时间(yyyy-MM-dd)*/
endTime: string;
/**合同跟进人*/
handler: number;
/**中介合同电子版*/
originalList: AnnexEditVO[];
/**甲方*/
partyA: ContractPartyEditVO[];
/**乙方*/
partyB: number;
/**合同标题*/
title: string;
}
/**ContractFileVO*/
export interface ContractFileVO {
/**盖章版归档*/
fileList: AnnexEditVO[];
/**甲方合同ID*/
id: number;
/**类型(Annex-附件、Seal-已盖章扫描件、NoSeal-未盖章扫描件)*/
type: string;
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
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**合同编号*/
contractCode: string;
/**关联周期*/
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
handler: string;
/**主键*/
id: number;
/**归属组织*/
organization: string;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**关联项目*/
projectName: string;
/**标题*/
title: string;
}
/**ContractPageQueryVO*/
export interface ContractPageQueryVO {
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
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**合作项目*/
projectName: string;
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
/**ContractPartyListVO*/
export interface ContractPartyListVO {
/**ID*/
id: number;
/**甲方*/
partyA: string;
/**甲方ID*/
userId: number;
}
/**DistributionChargeEditVO*/
export interface DistributionChargeEditVO {
/**收派套餐条件*/
conditionList: ConditionListVO[];
/**费用类型(Service-服务费、Agency-代理费)*/
costType: string;
/**收派套餐ID*/
distributionId: number;
/**物业类型(Residence-住宅、Apartment-公寓、Villa-别墅、Shops-商铺、OfficeBuilding-写字楼、ParkingLot-车位、Workshop-厂房、Othre-其它)*/
estateType: string;
/**收派套餐计费标准*/
priceList: PriceListVO[];
}
/**DistributionChargeListVO*/
export interface DistributionChargeListVO {
/**收派套餐条件*/
conditionList: ConditionListVO[];
/**费用类型(Service-服务费、Agency-代理费)*/
costType: string;
/**物业类型(Residence-住宅、Apartment-公寓、Villa-别墅、Shops-商铺、OfficeBuilding-写字楼、ParkingLot-车位、Workshop-厂房、Othre-其它)*/
estateType: string;
/**ID*/
id: number;
/**收派套餐计费标准*/
priceList: PriceListVO[];
}
/**DistributionDetailVO*/
export interface DistributionDetailVO {
/**是否垫佣(Yes-是、No-否)*/
advancePayment: string;
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**违约责任*/
breachOfContract: string;
/**渠道类型(Big-大行/大平台、Medium-中行/中平台、Small-小行/小平台)*/
channelType: string;
/**计费标准表*/
chargeList: DistributionChargeListVO[];
/**分销协议编号*/
code: string;
/**客户成交*/
customerTransaction: string;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**归档编号*/
fileCode: string;
/**扫描件*/
fileList: AnnexListVO[];
/**扫描件归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**跟进人*/
handler: string;
/**主键*/
id: number;
/**中介行*/
intermediaryList: DistributionIntermediaryListVO[];
/**原件归档状态(Yes-已归档、No-未归档)*/
originalState: string;
/**甲方地址*/
partyAAddress: string;
/**甲方公司*/
partyACompany: string;
/**甲方联系人*/
partyAContact: string;
/**甲方联系电话*/
partyAMobile: string;
/**乙方账户名*/
partyBAccountName: string;
/**乙方账号*/
partyBAccountNo: string;
/**乙方地址*/
partyBAddress: string;
/**乙方开户行*/
partyBBank: string;
/**乙方公司*/
partyBCompany: string;
/**乙方联系人*/
partyBContact: string;
/**乙方联系电话*/
partyBMobile: string;
/**支付标准*/
paymentStandard: string;
/**项目地址*/
projectAddress: string;
/**退还代理费期限*/
refundPeriod: string;
/**退还代理费比例*/
refundRatio: string;
/**结算条件*/
settlementCondition: string;
/**结算方式*/
settlementMethod: string;
/**副标题*/
subtitle: string;
/**补充条款*/
supplementaryProvision: string;
/**主标题*/
title: string;
/**模板附件*/
url: string;
}
/**DistributionEditVO*/
export interface DistributionEditVO {
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**跟进人*/
handler: number;
/**乙方账户名*/
partyBAccountName: string;
/**乙方账号*/
partyBAccountNo: string;
/**乙方地址*/
partyBAddress: string;
/**乙方开户行*/
partyBBank: string;
/**乙方公司*/
partyBCompany: string;
/**乙方联系人*/
partyBContact: string;
/**乙方渠道等级*/
partyBLevel: string;
/**乙方联系电话*/
partyBMobile: string;
/**项目地址*/
projectAddress: string;
/**中介战略协议ID*/
strategyId: number;
/**模板ID*/
templateId: number;
}
/**DistributionFileVO*/
export interface DistributionFileVO {
/**扫描件*/
fileList: AnnexListVO[];
/**ID*/
id: number;
/**类型(Annex-附件、Seal-已盖章扫描件、NoSeal-未盖章扫描件)*/
type: string;
}
/**DistributionIntermediaryListVO*/
export interface DistributionIntermediaryListVO {
/**ID*/
id: number;
/**中介行主键*/
intermediaryId: number;
/**中介行*/
intermediaryName: string;
}
/**DistributionIntermediaryTemplateEditVO*/
export interface DistributionIntermediaryTemplateEditVO {
/**中介行主键*/
intermediaryId: number;
/**中介分销合同模板ID*/
templateId: number;
}
/**DistributionListQueryVO*/
export interface DistributionListQueryVO {
/**项目地址*/
address: number[];
/**中介战略协议*/
agreement: number[];
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**合同编号*/
contractCode: number[];
/**合同录入人*/
creator: number[];
/**周期*/
cycle: string;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**归档编号*/
fileCode: number[];
/**归档状态*/
fileState: string[];
/**合同跟进人*/
handler: number[];
/**归属组织*/
organization: string;
/**甲方公司*/
partyA: number[];
/**乙方公司*/
partyB: number[];
/**项目*/
project: string;
/**合同模板*/
template: number[];
/**标题*/
title: string;
}
/**DistributionListVO*/
export interface DistributionListVO {
/**项目地址*/
address: string;
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**合同编号*/
contractCode: string;
/**周期*/
cycle: string;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**合同跟进人*/
handler: string;
/**归属组织*/
organization: string;
/**甲方公司*/
partyA: string;
/**乙方公司*/
partyB: string;
/**项目*/
project: string;
/**标题*/
title: string;
}
/**DistributionPageQueryVO*/
export interface DistributionPageQueryVO {
/**项目地址*/
address: number[];
/**中介战略协议*/
agreement: number[];
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**合同编号*/
contractCode: number[];
/**合同录入人*/
creator: number[];
/**周期*/
cycle: string;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**归档编号*/
fileCode: number[];
/**归档状态*/
fileState: string[];
/**合同跟进人*/
handler: number[];
/**归属组织*/
organization: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方公司*/
partyA: number[];
/**乙方公司*/
partyB: number[];
/**项目*/
project: string;
/**合同模板*/
template: number[];
/**标题*/
title: string;
}
/**DistributionTemplateEditVO*/
export interface DistributionTemplateEditVO {
/**是否垫佣(Yes-是、No-否)*/
advancePayment: string;
/**违约责任*/
breachOfContract: string;
/**渠道类型(Big-大行/大平台、Medium-中行/中平台、Small-小行/小平台)*/
channelType: string;
/**收派套餐*/
chargeEditList: DistributionChargeEditVO[];
/**客户成交*/
customerTransaction: string;
/**立项周期主键*/
cycleId: number;
/**中介行*/
editList: DistributionIntermediaryTemplateEditVO[];
/**甲方地址*/
partyAAddress: string;
/**甲方公司*/
partyACompany: string;
/**甲方联系人*/
partyAContact: string;
/**甲方联系电话*/
partyAMobile: string;
/**支付标准*/
paymentStandard: string;
/**退还代理费期限*/
refundPeriod: string;
/**退还代理费比例*/
refundRatio: string;
/**结算条件*/
settlementCondition: string;
/**结算方式*/
settlementMethod: string;
/**副标题*/
subtitle: string;
/**补充条款*/
supplementaryProvision: string;
/**主标题*/
title: string;
}
/**DistributionTemplateListQueryVO*/
export interface DistributionTemplateListQueryVO {
/**立项周期主键*/
cycleId: number;
/**ID*/
id: number;
/**渠道等级*/
level: string;
}
/**DistributionTemplateListVO*/
export interface DistributionTemplateListVO {
/**是否垫佣(Yes-是、No-否)*/
advancePayment: string;
/**渠道等级(Big-大行/大平台、Medium-中行/中平台、Small-小行/小平台)*/
channelType: string;
/**ID*/
id: number;
/**指定中介行*/
intermediary: string;
/**甲方公司*/
partyA: string;
/**派发佣金标准*/
paymentStandard: string;
/**合同主标题*/
title: string;
}
/**DistributionWechatListQueryVO*/
export interface DistributionWechatListQueryVO {
/**项目*/
projectName: string;
}
/**DistributionWechatListVO*/
export interface DistributionWechatListVO {
/**ID*/
id: number;
/**协议名称*/
name: string;
/**状态*/
state: string;
}
/**NoticeCheckVO*/
export interface NoticeCheckVO {
/**核查状态(Yes-是、No-否、Valid-核查通过、Invalid-核查不通过)*/
check: string;
/**ID*/
id: number;
}
/**NoticeConfirmWechatVO*/
export interface NoticeConfirmWechatVO {
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
/**录入渠道(Customer-客户、CustomerService-客服)*/
channel: string;
/**乙方*/
partyB: string;
/**乙方证件号码*/
partyBIdNo: string;
/**乙方联系电话*/
partyBMobile: string;
/**优惠服务费缴纳金额*/
payment: number;
/**购买单位*/
roomNumber: string;
/**模板主键*/
templateId: number;
/**是否纸质(Yes-是、No-否)*/
type: string;
}
/**NoticeFileVO*/
export interface NoticeFileVO {
/**盖章版归档*/
fileList: AnnexEditVO[];
/**ID*/
id: number;
/**类型(Annex-附件、Seal-已盖章扫描件、NoSeal-未盖章扫描件)*/
type: string;
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
/**乙方证件号码*/
idNo: string;
/**乙方联系电话*/
mobileB: string;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
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
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
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
/**NoticePriceDetailEditVO*/
export interface NoticePriceDetailEditVO {
/**金额*/
amount: number;
/**付款渠道(Alipay-支付宝、Wechat-微信、UnionPay-银联)*/
channel: string;
/**告知书主键*/
noticeId: number;
/**付款金额主键*/
priceId: number;
/**交易类型(Payment-付款、Refund-退款)*/
type: string;
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
/**告知书主键*/
noticeId: number;
/**终止理由*/
reason: string;
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
/**现优惠抵扣金额*/
deduction: number;
/**现优惠折扣*/
discount: number;
/**告知书主键*/
noticeId: number;
/**现需缴纳金额*/
payment: number;
/**现房号*/
room: number;
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
/**立项周期主键*/
cycleId: number;
/**抵扣金额*/
deduction: number;
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
/**PriceListVO*/
export interface PriceListVO {
/**主键*/
id: number;
/**数值1*/
price: number;
/**数值2*/
rate: number;
/**类型(Commission-派发佣金、Reward-派发内场奖励)*/
type: string;
}
/**StrategyDetailVO*/
export interface StrategyDetailVO {
/**合作开始时间*/
beginTime: string;
/**合作结束时间*/
endTime: string;
/**归档编号*/
fileCode: string;
/**盖章版归档*/
fileList: AnnexListVO[];
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**中介战略协议ID*/
id: number;
/**中介合同电子版*/
originalList: AnnexListVO[];
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**当前状态(Push-待提交、Audit-审核中、Valid-有效、Invalid-无效)*/
state: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
/**StrategyEditVO*/
export interface StrategyEditVO {
/**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**立项周期ID*/
cycleId: number;
/**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**ID*/
id: number;
/**中介合同电子版*/
originalList: AnnexEditVO[];
/**甲方*/
partyA: number;
/**乙方*/
partyB: string;
/**标题*/
title: string;
}
/**StrategyFileVO*/
export interface StrategyFileVO {
/**盖章版归档*/
fileList: AnnexEditVO[];
/**ID*/
id: number;
/**类型(Annex-附件、Seal-已盖章扫描件、NoSeal-未盖章扫描件)*/
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
/**协议状态(Push-待提交、Audit-审核中、Valid-有效、Invalid-无效)*/
state: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
/**StrategyListVO*/
export interface StrategyListVO {
/**关联周期*/
cycle: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**主键*/
id: number;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**关联项目*/
projectName: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
/**StrategyPageQueryVO*/
export interface StrategyPageQueryVO {
/**周期*/
cycle: string;
/**归档编号*/
fileCode: string;
/**归档状态(Yes-已归档、No-未归档)*/
fileState: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方*/
partyA: string;
/**乙方*/
partyB: string;
/**项目*/
projectName: string;
/**协议状态(Push-待提交、Audit-审核中、Valid-有效、Invalid-无效)*/
state: string;
/**协议编号*/
strategyCode: string;
/**标题*/
title: string;
}
