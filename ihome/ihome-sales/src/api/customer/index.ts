/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021/2/6 上午10:28:17
import { request } from '@/api/base'
const basePath = "/sales-api/customer"
/**批量取消项目收藏*/
export async function post_collect_BatchUpdate (d?: any) {
return await request.post< string,string> (basePath+'/collect/BatchUpdate', d)
}
/**收藏或者取消项目*/
export async function post_collect_addOrUpdate (d?: any) {
return await request.post< string,string> (basePath+'/collect/addOrUpdate', d)
}
/**查询项目收藏列表*/
export async function post_collect_getList (d?: any) {
return await request.post< any,any> (basePath+'/collect/getList', d)
}
/**E签宝认证*/
export async function post_customer_EqianbaoAddCustomer (d?: any) {
return await request.post< Customer[],Customer[]> (basePath+'/customer/EqianbaoAddCustomer', d)
}
/**添加客户*/
export async function post_customer_add (d?: any) {
return await request.post< string,string> (basePath+'/customer/add', d)
}
/**更新成交报告客户信息*/
export async function post_customer_dealAddCustomer (d?: any) {
return await request.post< MingYuanCheckCustomerVO,MingYuanCheckCustomerVO> (basePath+'/customer/dealAddCustomer', d)
}
/**通过Code获取Id*/
export async function get_customer_getCodeById__customerNo (d?: any) {
return await request.get<number,number>(basePath+'/customer/getCodeById/{customerNo}', { params: d })
}
/**通过手机号吗和名称查询客户*/
export async function post_customer_getCustByCustTelOrName (d?: any) {
return await request.post< Customer[],Customer[]> (basePath+'/customer/getCustByCustTelOrName', d)
}
/**通过手机号与身份证查找客户*/
export async function post_customer_getCustByTelAndCerrfNum (d?: any) {
return await request.post< Customer,Customer> (basePath+'/customer/getCustByTelAndCerrfNum', d)
}
/**通过手机号与名字查找客户*/
export async function post_customer_getCustByTelAndCerrfNumnew (d?: any) {
return await request.post< Customer,Customer> (basePath+'/customer/getCustByTelAndCerrfNumnew', d)
}
/**查询客户列表*/
export async function post_customer_getCustList (d?: any) {
return await request.post< any,any> (basePath+'/customer/getCustList', d)
}
/**通过CUST_CODE查询客户*/
export async function post_customer_getCustomer (d?: any) {
return await request.post< Customer,Customer> (basePath+'/customer/getCustomer', d)
}
/**通过customerId获取CustomerName*/
export async function get_customer_getCustomerNameById__customerId (d?: any) {
return await request.get<string,string>(basePath+'/customer/getCustomerNameById/{customerId}', { params: d })
}
/**保存E签宝认证状态*/
export async function post_customer_saveEqianbaoCustomerStats (d?: any) {
return await request.post< boolean,boolean> (basePath+'/customer/saveEqianbaoCustomerStats', d)
}
/**客户报备*/
export async function post_report_add (d?: any) {
return await request.post< number,number> (basePath+'/report/add', d)
}
/**成交登记*/
export async function post_report_addDeal (d?: any) {
return await request.post< number,number> (basePath+'/report/addDeal', d)
}
/**成交有效无效操作*/
export async function post_report_dealValidOrInvalid (d?: any) {
return await request.post< number,number> (basePath+'/report/dealValidOrInvalid', d)
}
/**客户报备-根据查询条件导出excel*/
export async function post_report_exportReportData (d?: any) {
return await request.post< any,any> (basePath+'/report/exportReportData', d)
}
/**报备成交-根据查询条件导出excel*/
export async function post_report_exportReportDealData (d?: any) {
return await request.post< any,any> (basePath+'/report/exportReportDealData', d)
}
/**报备到访-根据查询条件导出excel*/
export async function post_report_exportReportVisitData (d?: any) {
return await request.post< any,any> (basePath+'/report/exportReportVisitData', d)
}
/**查询报备成交详情*/
export async function get_report_get__id (d?: any) {
return await request.get<ReportDetail,ReportDetail>(basePath+'/report/get/{id}', { params: d })
}
/**查询我的已成交列表-小程序端*/
export async function post_report_getAlreadyDealList (d?: any) {
return await request.post< any,any> (basePath+'/report/getAlreadyDealList', d)
}
/**查询我的已报备列表-小程序端*/
export async function post_report_getAlreadyReportList (d?: any) {
return await request.post< any,any> (basePath+'/report/getAlreadyReportList', d)
}
/**查询我的已到访列表-小程序端*/
export async function post_report_getAlreadyVisitList (d?: any) {
return await request.post< any,any> (basePath+'/report/getAlreadyVisitList', d)
}
/**查询我的报备成交列表*/
export async function post_report_getDealList (d?: any) {
return await request.post< any,any> (basePath+'/report/getDealList', d)
}
/**查询我的无效单列表-小程序端*/
export async function post_report_getInvalidReportList (d?: any) {
return await request.post< any,any> (basePath+'/report/getInvalidReportList', d)
}
/**查询我的报备列表*/
export async function post_report_getList (d?: any) {
return await request.post< any,any> (basePath+'/report/getList', d)
}
/**查询报备成交详情-小程序端*/
export async function get_report_getReportById__id (d?: any) {
return await request.get<ReportDetailInfo,ReportDetailInfo>(basePath+'/report/getReportById/{id}', { params: d })
}
/**根据房间ID城市编码，查询栋座报备id，渠道商id、名称、等级、经纪人、来访确认单附件id、成交确认单附件id、客户姓名电话*/
export async function post_report_getReportDataByRoomId (d?: any) {
return await request.post< ReportRoomSubBuildingVo,ReportRoomSubBuildingVo> (basePath+'/report/getReportDataByRoomId', d)
}
/**查询我的已报备列表-小程序端*/
export async function post_report_getReportList (d?: any) {
return await request.post< any,any> (basePath+'/report/getReportList', d)
}
/**查询我的报备到访列表*/
export async function post_report_getVisitList (d?: any) {
return await request.post< any,any> (basePath+'/report/getVisitList', d)
}
/**非市场化项目的，根据手机号码，同步悦家报备数据*/
export async function post_report_getYueJiaReport (d?: any) {
return await request.post< YueJiaReportResultItem,YueJiaReportResultItem> (basePath+'/report/getYueJiaReport', d)
}
/**定时从悦家云同步数据*/
export async function get_report_queryYueJiaYunReportList (d?: any) {
return await request.get<string,string>(basePath+'/report/queryYueJiaYunReportList', { params: d })
}
/**报备有效无效操作*/
export async function post_report_reportValidOrInvalid (d?: any) {
return await request.post< number,number> (basePath+'/report/reportValidOrInvalid', d)
}
/**补全客户手机号码*/
export async function post_report_update_mobile (d?: any) {
return await request.post< any,any> (basePath+'/report/update/mobile', d)
}
/**到访有效无效操作*/
export async function post_report_visitValidOrInvalid (d?: any) {
return await request.post< number,number> (basePath+'/report/visitValidOrInvalid', d)
}
/**上传附件*/
export async function post_reportAttachment_add (d?: any) {
return await request.post< number,number> (basePath+'/reportAttachment/add', d)
}
/**批量上传附件*/
export async function post_reportAttachment_addAttachment (d?: any) {
return await request.post< number,number> (basePath+'/reportAttachment/addAttachment', d)
}
/**删除报备附件*/
export async function post_reportAttachment_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/reportAttachment/delete/{id}', d)
}
/**查询该报备的所有附件*/
export async function post_reportAttachment_getAll (d?: any) {
return await request.post< ReportAttachmentVO[],ReportAttachmentVO[]> (basePath+'/reportAttachment/getAll', d)
}
/**添加客户*/
export async function post_reportCustomer_add (d?: any) {
return await request.post< any,any> (basePath+'/reportCustomer/add', d)
}
/**查询报备客户详情*/
export async function get_reportCustomer_get__id (d?: any) {
return await request.get<ReportCustomerDetail,ReportCustomerDetail>(basePath+'/reportCustomer/get/{id}', { params: d })
}
/**查询客户池列表*/
export async function post_reportCustomer_getList (d?: any) {
return await request.post< any,any> (basePath+'/reportCustomer/getList', d)
}
/**编辑客户*/
export async function post_reportCustomer_update (d?: any) {
return await request.post< any,any> (basePath+'/reportCustomer/update', d)
}
/**写跟进*/
export async function post_reportCustomerFollowup_add (d?: any) {
return await request.post< any,any> (basePath+'/reportCustomerFollowup/add', d)
}
/**删除客户跟进*/
export async function post_reportCustomerFollowup_delete__customerId (d?: any) {
return await request.post< number,number> (basePath+'/reportCustomerFollowup/delete/{customerId}', d)
}
/**查询该客户的所有跟进*/
export async function get_reportCustomerFollowup_getAll (d?: any) {
return await request.get<ReportCustomerFollowupVO[],ReportCustomerFollowupVO[]>(basePath+'/reportCustomerFollowup/getAll', { params: d })
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
/**CollectBatchUpdateVO*/
export interface CollectBatchUpdateVO {
/**要取消收藏的ID集合*/
ids: number[];
/**有效标识(Valid-有效、Invalid-无效)*/
status: string;
}
/**CollectIsValidVO*/
export interface CollectIsValidVO {
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**有效标识(Valid-有效、Invalid-无效)*/
status: string;
}
/**CollectQueryVO*/
export interface CollectQueryVO {
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目名称*/
proName: string;
}
/**CollectVO*/
export interface CollectVO {
/**项目封面地址*/
attachAddr: string;
/**项目均价*/
averagePrice: number;
/**佣金规则*/
commissionRules: string;
/**所属区域*/
district: string;
/**收藏ID*/
id: number;
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**是否有效标识(Valid-有效、Invalid-无效)*/
status: string;
}
/**Customer*/
export interface Customer {
/**证件类型(IDCard-居民身份证、certificateOfOfficers-军官证、ChinesePassport-中国护照、foreignPassport-外国护照、HongKongIdentityCard-香港身份证、MainlandTravelPermit-台胞证、ExitPermit-港澳通行证、Businesslicense-营业执照号、Others-其他)*/
cardType: string;
/**证件编号*/
certificateNumber: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户编号*/
custCode: string;
/**客户名称*/
custName: string;
/**客户来源(NaturalVisiting-自然来访、IntermediaryChannels-中介渠道、CompanyStore-公司门店)*/
custOrg: string;
/**客户联系方式*/
custTel: string;
/**客户类型(Individual-个人、Company-公司)*/
custType: string;
/**已删除*/
deleted: number;
/**undefined*/
eaccountId: string;
/**undefined*/
ecertificationStatus: number;
/**undefined*/
eflowId: string;
/**邮箱*/
email: string;
/**客户ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**CustomerBaseVO*/
export interface CustomerBaseVO {
/**证件类型(IDCard-居民身份证、certificateOfOfficers-军官证、ChinesePassport-中国护照、foreignPassport-外国护照、HongKongIdentityCard-香港身份证、MainlandTravelPermit-台胞证、ExitPermit-港澳通行证、Businesslicense-营业执照号、Others-其他)*/
cardType: string;
/**证件编号*/
certificateNumber: string;
/**客户名称*/
custName: string;
/**客户来源(NaturalVisiting-自然来访、IntermediaryChannels-中介渠道、CompanyStore-公司门店)*/
custOrg: string;
/**客户联系方式*/
custTel: string;
/**客户类型(Individual-个人、Company-公司)*/
custType: string;
/**邮箱*/
email: string;
}
/**CustomerQueryCustTelORCustNameVO*/
export interface CustomerQueryCustTelORCustNameVO {
/**客户创建时间(yyyy-MM-dd HH:mm:ss)*/
createTimeRealMax: string;
/**客户创建时间(yyyy-MM-dd HH:mm:ss)*/
createTimeRealMin: string;
/**客户编号*/
custCode: string;
/**客户名称*/
custName: string;
/**客户来源(NaturalVisiting-自然来访、IntermediaryChannels-中介渠道、CompanyStore-公司门店)*/
custOrg: string;
/**客户联系方式*/
custTel: string;
/**客户类型(Individual-个人、Company-公司)*/
custType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**CustomerTelOrNameVO*/
export interface CustomerTelOrNameVO {
/**客户名称*/
custName: string;
/**客户联系方式*/
custTel: string;
}
/**CustomerVO*/
export interface CustomerVO {
/**证件类型(IDCard-居民身份证、certificateOfOfficers-军官证、ChinesePassport-中国护照、foreignPassport-外国护照、HongKongIdentityCard-香港身份证、MainlandTravelPermit-台胞证、ExitPermit-港澳通行证、Businesslicense-营业执照号、Others-其他)*/
cardType: string;
/**证件编号*/
certificateNumber: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户编号*/
custCode: string;
/**客户名称*/
custName: string;
/**客户来源(NaturalVisiting-自然来访、IntermediaryChannels-中介渠道、CompanyStore-公司门店)*/
custOrg: string;
/**客户联系方式*/
custTel: string;
/**客户类型(Individual-个人、Company-公司)*/
custType: string;
/**已删除*/
deleted: number;
/**undefined*/
eaccountId: string;
/**undefined*/
ecertificationStatus: number;
/**undefined*/
eflowId: string;
/**邮箱*/
email: string;
/**客户ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DealReportListVO*/
export interface DealReportListVO {
/**审核时间(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**审核人Id*/
auditUser: number;
/**审核人*/
auditUserName: string;
/**渠道ID*/
channelId: number;
/**所属公司*/
channelName: string;
/**无效原因*/
comment: string;
/**成交时间(yyyy-MM-dd HH:mm:ss)*/
dealDate: string;
/**成交状态(UnderReview-审核中、ValidDeal-成交有效、InvalidDeal-成交无效)*/
dealStatus: string;
/**是否市场化项目*/
exMarket: number;
/**预计到访人数*/
expectedNumber: number;
/**预计到访时间(yyyy-MM-dd HH:mm:ss)*/
expectedTime: string;
/**预计到访时间(年月日时分)*/
expectedTimeFormat: string;
/**ID*/
id: number;
/**联系方式*/
mobile: string;
/**客户姓名*/
name: string;
/**周期名称*/
proCycle: string;
/**项目周期事业部*/
proCycleDept: string;
/**项目周期事业部ID*/
proCycleDeptId: number;
/**项目周期ID*/
proCycleId: number;
/**项目ID*/
proId: number;
/**报备项目*/
proName: string;
/**报备确认时间(yyyy-MM-dd HH:mm:ss)*/
reportConfirmTime: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备人/经纪人手机号*/
reportMobile: string;
/**报备人/经纪人姓名*/
reportName: string;
/**报备类型(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportType: string;
/**报备人*/
reportUser: number;
/**客户性别(Mr-先生、Ms-女士)*/
sex: string;
}
/**DealReportMobileListVO*/
export interface DealReportMobileListVO {
/**成交状态(UnderReview-审核中、ValidDeal-成交有效、InvalidDeal-成交无效)*/
dealStatus: string;
/**是否市场化项目*/
exMarket: number;
/**报备ID*/
id: number;
/**联系方式*/
mobile: string;
/**客户姓名*/
name: string;
/**项目ID*/
proId: number;
/**报备项目*/
proName: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
}
/**InvalidReportMobileListVO*/
export interface InvalidReportMobileListVO {
/**无效原因*/
comment: string;
/**成交状态(UnderReview-审核中、ValidDeal-成交有效、InvalidDeal-成交无效)*/
dealStatus: string;
/**是否市场化项目*/
exMarket: number;
/**报备ID*/
id: number;
/**联系方式*/
mobile: string;
/**客户姓名*/
name: string;
/**项目ID*/
proId: number;
/**报备项目*/
proName: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
reportStatus: string;
/**到访状态(UnderReview-审核中、ValidVisit-到访有效、InvalidVisit-到访无效)*/
visitStatus: string;
}
/**MingYuanCheckCustomerVO*/
export interface MingYuanCheckCustomerVO {
/**客户表中的客户数据*/
customer: Customer;
/**undefined*/
same: boolean;
}
/**QueryReportVO*/
export interface QueryReportVO {
/**城市代码（取自周期）*/
city: string;
/**房间ID*/
roomId: number;
}
/**ReportAddAttachmentBaseVO*/
export interface ReportAddAttachmentBaseVO {
/**附件列表*/
attachments: ReportAttachment[];
/**报备ID*/
reportId: number;
}
/**ReportAttachment*/
export interface ReportAttachment {
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
/**ID*/
id: number;
/**报备ID*/
reportId: number;
/**附件类型(VisitConfirmForm-来访确认单、DealConfirmForm-成交确认单、SubscribeBook-认购书、SignVoucher-首期收据、OwnerID-身份证)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ReportAttachmentBaseVO*/
export interface ReportAttachmentBaseVO {
/**文件ID*/
fileId: string;
/**文件名称*/
fileName: string;
/**类型*/
fileType: string;
/**报备ID*/
reportId: number;
/**附件类型(VisitConfirmForm-来访确认单、DealConfirmForm-成交确认单、SubscribeBook-认购书、SignVoucher-首期收据、OwnerID-身份证)*/
type: string;
}
/**ReportAttachmentQueryVO*/
export interface ReportAttachmentQueryVO {
/**报备ID*/
reportId: number;
/**附件类型(VisitConfirmForm-来访确认单、DealConfirmForm-成交确认单、SubscribeBook-认购书、SignVoucher-首期收据、OwnerID-身份证)*/
type: string;
}
/**ReportAttachmentVO*/
export interface ReportAttachmentVO {
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
/**ID*/
id: number;
/**报备ID*/
reportId: number;
/**附件类型(VisitConfirmForm-来访确认单、DealConfirmForm-成交确认单、SubscribeBook-认购书、SignVoucher-首期收据、OwnerID-身份证)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ReportCustomerDetail*/
export interface ReportCustomerDetail {
/**年龄段(M22-22岁以下、M22_30-22-30岁、M30_40-30-40岁、M40_50-40-50岁、M50-50岁以上)*/
ageGroup: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**关注因素集合*/
factorsOfConcerns: string[];
/**房屋装修集合*/
houseDecorations: string[];
/**ID*/
id: number;
/**录入时间(yyyy-MM-dd HH:mm:ss)*/
inputTime: string;
/**录入人*/
inputUser: number;
/**意向面积集合*/
intentAreas: string[];
/**意向户型集合*/
intentHouseTypes: string[];
/**意向城市*/
intentionCity: string;
/**意向县区*/
intentionCounty: string;
/**意向省份*/
intentionProvince: string;
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**现住城市*/
nowliveCity: string;
/**现住县区*/
nowliveCounty: string;
/**现住省份*/
nowliveProvince: string;
/**购房目的集合*/
purposeOfPurchases: string[];
/**报备楼盘总数*/
reportCount: number;
/**跟进列表*/
reportCustomerFollowups: ReportCustomerFollowupVO[];
/**报备列表*/
reportDetails: ReportDetail[];
/**性别(Mr-先生、Ms-女士)*/
sex: string;
/**客户来源(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
source: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**工作城市*/
workCity: string;
/**工作县区*/
workCounty: string;
/**工作省份*/
workProvince: string;
}
/**ReportCustomerFollowupBaseVO*/
export interface ReportCustomerFollowupBaseVO {
/**跟进情况*/
describe: string;
/**报备用户ID*/
reportCustomerId: number;
/**类型(Tel-电联、Look-约看、Interview-面谈)*/
type: string;
}
/**ReportCustomerFollowupVO*/
export interface ReportCustomerFollowupVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**跟进情况*/
describe: string;
/**跟进时间(yyyy-MM-dd HH:mm:ss)*/
followTime: string;
/**ID*/
id: number;
/**报备用户ID*/
reportCustomerId: number;
/**类型(Tel-电联、Look-约看、Interview-面谈)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ReportCustomerListVO*/
export interface ReportCustomerListVO {
/**客户ID*/
id: number;
/**录入时间(yyyy-MM-dd HH:mm:ss)*/
inputTime: string;
/**客户手机号*/
mobile: string;
/**客户姓名*/
name: string;
/**客户性别(Mr-先生、Ms-女士)*/
sex: string;
}
/**ReportCustomerQueryVO*/
export interface ReportCustomerQueryVO {
/**客户手机号*/
mobile: string;
/**客户姓名*/
name: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**用户ID*/
userId: number;
}
/**ReportCustomerUpdateVO*/
export interface ReportCustomerUpdateVO {
/**年龄段(M22-22岁以下、M22_30-22-30岁、M30_40-30-40岁、M40_50-40-50岁、M50-50岁以上)*/
ageGroup: string;
/**关注因素集合*/
factorsOfConcerns: string[];
/**房屋装修集合*/
houseDecorations: string[];
/**客户ID*/
id: number;
/**意向面积集合*/
intentAreas: string[];
/**意向户型集合*/
intentHouseTypes: string[];
/**意向城市*/
intentionCity: string;
/**意向县区*/
intentionCounty: string;
/**意向省份*/
intentionProvince: string;
/**客户手机号*/
mobile: string;
/**客户姓名*/
name: string;
/**现住城市*/
nowliveCity: string;
/**现住县区*/
nowliveCounty: string;
/**现住省份*/
nowliveProvince: string;
/**购房目的集合*/
purposeOfPurchases: string[];
/**客户性别(Mr-先生、Ms-女士)*/
sex: string;
/**客户来源渠道(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
source: string;
/**工作城市*/
workCity: string;
/**工作县区*/
workCounty: string;
/**工作省份*/
workProvince: string;
}
/**ReportCustomerVO*/
export interface ReportCustomerVO {
/**年龄段(M22-22岁以下、M22_30-22-30岁、M30_40-30-40岁、M40_50-40-50岁、M50-50岁以上)*/
ageGroup: string;
/**关注因素集合*/
factorsOfConcerns: string[];
/**房屋装修集合*/
houseDecorations: string[];
/**意向面积集合*/
intentAreas: string[];
/**意向户型集合*/
intentHouseTypes: string[];
/**意向城市*/
intentionCity: string;
/**意向县区*/
intentionCounty: string;
/**意向省份*/
intentionProvince: string;
/**客户手机号*/
mobile: string;
/**客户姓名*/
name: string;
/**现住城市*/
nowliveCity: string;
/**现住县区*/
nowliveCounty: string;
/**现住省份*/
nowliveProvince: string;
/**购房目的集合*/
purposeOfPurchases: string[];
/**客户性别(Mr-先生、Ms-女士)*/
sex: string;
/**客户来源渠道(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
source: string;
/**工作城市*/
workCity: string;
/**工作县区*/
workCounty: string;
/**工作省份*/
workProvince: string;
}
/**ReportDealVO*/
export interface ReportDealVO {
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**报备ID*/
reportId: number;
/**认购房号*/
roomId: number;
/**性别(Mr-先生、Ms-女士)*/
sex: string;
/**认购栋座*/
subBuildingId: number;
}
/**ReportDetail*/
export interface ReportDetail {
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**项目ID*/
proId: number;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
reportStatus: string;
/**报备人*/
reportUser: number;
}
/**ReportDetailInfo*/
export interface ReportDetailInfo {
/**渠道ID*/
channelId: number;
/**所属公司*/
channelName: string;
/**成交照片*/
dealAttachments: ReportAttachment[];
/**成交时间(yyyy-MM-dd HH:mm:ss)*/
dealDate: string;
/**拍照上传时间(yyyy-MM-dd HH:mm:ss)*/
dealPhotoDate: string;
/**成交状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
dealStatus: string;
/**区*/
district: string;
/**预计到访人数*/
expectedNumber: number;
/**预计到访时间(yyyy-MM-dd HH:mm:ss)*/
expectedTime: string;
/**店组ID*/
groupId: number;
/**是否拍照*/
isPhotoDeal: string;
/**是否拍照*/
isPhotoVisit: string;
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**项目图片*/
projectPic: string;
/**备注*/
remark: string;
/**审核结果*/
reportComment: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备人/经纪人手机号*/
reportMobile: string;
/**报备审核时间(yyyy-MM-dd HH:mm:ss)*/
reportReviewDate: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
reportStatus: string;
/**报备类型(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportType: string;
/**报备人*/
reportUser: number;
/**认购房号*/
roomId: number;
/**房号*/
roomName: string;
/**性别(Mr-先生、Ms-女士)*/
sex: string;
/**认购栋座*/
subBuildingId: number;
/**栋座*/
subBuildingName: string;
/**到访照片*/
visitAttachments: ReportAttachment[];
/**审核结果*/
visitComment: string;
/**到访时间(yyyy-MM-dd HH:mm:ss)*/
visitDate: string;
/**拍照上传时间(yyyy-MM-dd HH:mm:ss)*/
visitPhotoDate: string;
/**到访审核时间(yyyy-MM-dd HH:mm:ss)*/
visitReviewDate: string;
/**到访状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
visitStatus: string;
}
/**ReportListVO*/
export interface ReportListVO {
/**审核时间(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**审核人Id*/
auditUser: number;
/**审核人*/
auditUserName: string;
/**渠道ID*/
channelId: number;
/**所属公司*/
channelName: string;
/**无效原因*/
comment: string;
/**是否市场化项目*/
exMarket: number;
/**预计到访人数*/
expectedNumber: number;
/**预计到访时间(yyyy-MM-dd HH:mm:ss)*/
expectedTime: string;
/**预计到访时间(年月日时分)*/
expectedTimeFormat: string;
/**ID*/
id: number;
/**联系方式*/
mobile: string;
/**客户姓名*/
name: string;
/**周期名称*/
proCycle: string;
/**项目周期事业部*/
proCycleDept: string;
/**项目周期事业部ID*/
proCycleDeptId: number;
/**项目周期ID*/
proCycleId: number;
/**项目ID*/
proId: number;
/**报备项目*/
proName: string;
/**报备确认时间(yyyy-MM-dd HH:mm:ss)*/
reportConfirmTime: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备人/经纪人手机号*/
reportMobile: string;
/**报备人/经纪人姓名*/
reportName: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
reportStatus: string;
/**报备类型(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportType: string;
/**报备人*/
reportUser: number;
/**客户性别(Mr-先生、Ms-女士)*/
sex: string;
}
/**ReportMobileListVO*/
export interface ReportMobileListVO {
/**无效原因*/
comment: string;
/**是否市场化项目*/
exMarket: number;
/**报备ID*/
id: number;
/**联系方式*/
mobile: string;
/**客户姓名*/
name: string;
/**项目ID*/
proId: number;
/**报备项目*/
proName: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
reportStatus: string;
}
/**ReportMobileQueryVo*/
export interface ReportMobileQueryVo {
/**客户姓名或者电话*/
nameOrTel: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**列表查询类型(Report-报备列表、Visit-到访列表、Deal-成交列表、Invalid-无效列表)*/
type: string;
}
/**ReportQueryVO*/
export interface ReportQueryVO {
/**中介公司*/
channelName: string;
/**周期所属事业部*/
department: string;
/**是否市场化项目*/
exMarket: number;
/**报备人姓名*/
name: string;
/**客户姓名或者电话*/
nameOrTel: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目周期*/
proCycle: string;
/**项目ID*/
proId: string;
/**项目名称*/
proName: string;
/**报备时间结束(yyyy-MM-dd HH:mm:ss)*/
reportDateEnd: string;
/**报备时间开始(yyyy-MM-dd HH:mm:ss)*/
reportDateStart: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效、ValidVisit-到访有效、InvalidVisit-到访无效、NewDeal-新增成交、ValidDeal-成交有效、InvalidDeal-成交无效)*/
reportStatus: string;
}
/**ReportRoomSubBuildingVo*/
export interface ReportRoomSubBuildingVo {
/**经纪人ID*/
channelAgentId: number;
/**报备的经纪人名字*/
channelAgentName: string;
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**渠道商ID*/
channelId: number;
/**渠道商名字*/
channelName: string;
/**客户名字*/
customerName: string;
/**客户电话*/
customerPhone: string;
/**成交确认单附件id*/
dealConfirm: string[];
/**业主身份证附件id*/
ownerIDs: string[];
/**报备ID*/
reportId: number;
/**来访确认单附件ID*/
visitConfirm: string[];
}
/**ReportUpdateMobile*/
export interface ReportUpdateMobile {
/**联系方式*/
mobile: string;
/**报备ID*/
reportId: number;
}
/**ReportVO*/
export interface ReportVO {
/**渠道ID*/
channelId: number;
/**是否市场化项目*/
exMarket: number;
/**预计到访人数*/
expectedNumber: number;
/**预计到访时间*/
expectedTime: string;
/**是否帮录：1是/0否*/
helpRecord: number;
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**项目ID*/
proId: number;
/**备注*/
remark: string;
/**报备用户ID*/
reportCustomerId: number;
/**报备人手机号*/
reportMobile: string;
/**报备人姓名*/
reportName: string;
/**报备类型(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportType: string;
/**性别(Mr-先生、Ms-女士)*/
sex: string;
}
/**ReportValidOrInvalidVO*/
export interface ReportValidOrInvalidVO {
/**报备ID集合*/
reportIds: number[];
/**操作类型【有效/无效】(Valid-有效、Invalid-无效)*/
validOrInvalid: string;
}
/**VisitDealValidOrInvalidVO*/
export interface VisitDealValidOrInvalidVO {
/**无效意见*/
comment: string;
/**报备id*/
reportId: number;
/**操作类型【有效/无效】(Valid-有效、Invalid-无效)*/
validOrInvalid: string;
/**到访成交时间(yyyy-MM-dd HH:mm:ss)*/
visitDealTime: string;
}
/**VisitReportListVO*/
export interface VisitReportListVO {
/**审核时间(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**审核人Id*/
auditUser: number;
/**审核人*/
auditUserName: string;
/**渠道ID*/
channelId: number;
/**所属公司*/
channelName: string;
/**无效原因*/
comment: string;
/**是否市场化项目*/
exMarket: number;
/**预计到访人数*/
expectedNumber: number;
/**预计到访时间(yyyy-MM-dd HH:mm:ss)*/
expectedTime: string;
/**预计到访时间(年月日时分)*/
expectedTimeFormat: string;
/**ID*/
id: number;
/**联系方式*/
mobile: string;
/**客户姓名*/
name: string;
/**周期名称*/
proCycle: string;
/**项目周期事业部*/
proCycleDept: string;
/**项目周期事业部ID*/
proCycleDeptId: number;
/**项目周期ID*/
proCycleId: number;
/**项目ID*/
proId: number;
/**报备项目*/
proName: string;
/**报备确认时间(yyyy-MM-dd HH:mm:ss)*/
reportConfirmTime: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备人/经纪人手机号*/
reportMobile: string;
/**报备人/经纪人姓名*/
reportName: string;
/**报备类型(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportType: string;
/**报备人*/
reportUser: number;
/**客户性别(Mr-先生、Ms-女士)*/
sex: string;
/**到访时间(yyyy-MM-dd HH:mm:ss)*/
visitDate: string;
/**到访状态(UnderReview-审核中、ValidVisit-到访有效、InvalidVisit-到访无效)*/
visitStatus: string;
}
/**VisitReportMobileListVO*/
export interface VisitReportMobileListVO {
/**是否市场化项目*/
exMarket: number;
/**报备ID*/
id: number;
/**联系方式*/
mobile: string;
/**客户姓名*/
name: string;
/**项目ID*/
proId: number;
/**报备项目*/
proName: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**到访状态(UnderReview-审核中、ValidVisit-到访有效、InvalidVisit-到访无效)*/
visitStatus: string;
}
/**YueJiaReportResultItem*/
export interface YueJiaReportResultItem {
/**undefined*/
appointAgentId: number;
/**undefined*/
appointAgentName: string;
/**undefined*/
appointAgentOperatorName: string;
/**undefined*/
brokerCompanyId: number;
/**undefined*/
brokerCompanyName: string;
/**undefined*/
brokerName: string;
/**undefined*/
brokerTel: string;
/**undefined*/
buildingProjectId: number;
/**undefined*/
buildingProjectName: string;
/**undefined*/
confirmOperatorName: string;
/**undefined*/
confirmTime: string;
/**undefined*/
currentAuditName: string;
/**undefined*/
currentAuditResult: string;
/**undefined*/
currentAuditTime: string;
/**undefined*/
currentStatus: string;
/**undefined*/
customInfoId: string;
/**undefined*/
customName: string;
/**undefined*/
customSex: string;
/**undefined*/
customTel: string;
/**undefined*/
estimatedVisitTime: string;
/**undefined*/
managerAuditResult: string;
/**undefined*/
managerAuditTime: string;
/**undefined*/
managerName: string;
/**undefined*/
operatorTel: string;
/**undefined*/
orderCustomRecordId: string;
/**undefined*/
orderInfoCode: string;
/**undefined*/
orderInfoId: number;
/**undefined*/
projectInfoId: number;
/**undefined*/
projectInfoName: string;
/**undefined*/
realVisitTime: string;
/**undefined*/
recordRemark: string;
/**undefined*/
recordStatus: string;
/**undefined*/
recordTime: string;
/**undefined*/
rejectionReason: string;
}
/**YueJiaReportVo*/
export interface YueJiaReportVo {
/**报备ID*/
reportId: number;
}
