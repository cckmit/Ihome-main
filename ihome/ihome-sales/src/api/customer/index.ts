/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-7 11:53:55
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
return await request.post< PageModel<CollectVO>,PageModel<CollectVO>> (basePath+'/collect/getList', d)
}
/**添加客户*/
export async function post_customer_add (d?: any) {
return await request.post< number,number> (basePath+'/customer/add', d)
}
/**查询客户列表*/
export async function post_customer_getCustList (d?: any) {
return await request.post< PageModel<CustomerVO>,PageModel<CustomerVO>> (basePath+'/customer/getCustList', d)
}
/**通过CUST_CODE查询客户*/
export async function post_customer_getCustomer (d?: any) {
return await request.post< Customer,Customer> (basePath+'/customer/getCustomer', d)
}
/**通过客户查询条件查询客户*/
export async function post_customer_getCustomerByCondition (d?: any) {
return await request.post< Customer,Customer> (basePath+'/customer/getCustomerByCondition', d)
}
/**更新客户信息*/
export async function post_customer_updateCustomer (d?: any) {
return await request.post< number,number> (basePath+'/customer/updateCustomer', d)
}
/**成交登记*/
export async function post_deal_add (d?: any) {
return await request.post< any,any> (basePath+'/deal/add', d)
}
/**成交有效无效操作*/
export async function post_deal_dealValidOrInvalid (d?: any) {
return await request.post< number,number> (basePath+'/deal/dealValidOrInvalid', d)
}
/**查询报备成交详情*/
export async function get_deal_get__id (d?: any) {
return await request.get<DealDetail,DealDetail>(basePath+'/deal/get/{id}', { params: d })
}
/**查询我的报备成交列表*/
export async function post_deal_getList (d?: any) {
return await request.post< PageModel<DealVO>,PageModel<DealVO>> (basePath+'/deal/getList', d)
}
/**get*/
export async function get_demo_get__id (d?: any) {
return await request.get<any,any>(basePath+'/demo/get/{id}', { params: d })
}
/**客户报备*/
export async function post_report_add (d?: any) {
return await request.post< any,any> (basePath+'/report/add', d)
}
/**查询报备详情*/
export async function get_report_get__id (d?: any) {
return await request.get<ReportDetail,ReportDetail>(basePath+'/report/get/{id}', { params: d })
}
/**查询我的报备列表*/
export async function post_report_getList (d?: any) {
return await request.post< PageModel<ReportListVO>,PageModel<ReportListVO>> (basePath+'/report/getList', d)
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
return await request.post< any,any> (basePath+'/reportAttachment/add', d)
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
return await request.post< PageModel<ReportCustomerListVO>,PageModel<ReportCustomerListVO>> (basePath+'/reportCustomer/getList', d)
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
/**客户创建时间(yyyy-MM-dd HH:mm:ss)*/
createTimeReal: string;
/**创建用户*/
createUser: number;
/**客户编号*/
custCode: string;
/**客户名称*/
custName: string;
/**客户来源(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
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
/**客户来源(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
custOrg: string;
/**客户联系方式*/
custTel: string;
/**客户类型(Individual-个人、Company-公司)*/
custType: string;
}
/**CustomerQueryCustTelORCustNameVO*/
export interface CustomerQueryCustTelORCustNameVO {
/**客户创建最大时间(yyyy-MM-dd HH:mm:ss)*/
createTimeRealMax: string;
/**客户创建最小时间(yyyy-MM-dd HH:mm:ss)*/
createTimeRealMin: string;
/**客户名称*/
custName: string;
/**客户来源(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
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
/**CustomerQueryVO*/
export interface CustomerQueryVO {
/**证件编号*/
certificateNumber: string;
/**客户编号*/
custCode: string;
/**客户名称*/
custName: string;
/**客户来源(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
custOrg: string;
/**客户联系方式*/
custTel: string;
/**客户类型(Individual-个人、Company-公司)*/
custType: string;
}
/**CustomerUpdateBaseVO*/
export interface CustomerUpdateBaseVO {
/**证件编号*/
certificateNumber: string;
/**客户联系方式*/
custTel: string;
/**undefined*/
eaccountId: string;
/**undefined*/
ecertificationStatus: number;
/**undefined*/
eflowId: string;
}
/**CustomerVO*/
export interface CustomerVO {
/**证件类型(IDCard-居民身份证、certificateOfOfficers-军官证、ChinesePassport-中国护照、foreignPassport-外国护照、HongKongIdentityCard-香港身份证、MainlandTravelPermit-台胞证、ExitPermit-港澳通行证、Businesslicense-营业执照号、Others-其他)*/
cardType: string;
/**证件编号*/
certificateNumber: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**客户创建时间(yyyy-MM-dd HH:mm:ss)*/
createTimeReal: string;
/**创建用户*/
createUser: number;
/**客户编号*/
custCode: string;
/**客户名称*/
custName: string;
/**客户来源(FriendIntroduced-朋友介绍、Activity-活动、RoomExhibition-房展会、Internet-网络、Store-门店、OldCustomers-老客户、Magazine-杂志、Other-其他)*/
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
/**DealBseVO*/
export interface DealBseVO {
/**是否市场化项目*/
exMarket: number;
/**手机号码*/
mobile: string;
/**姓名*/
name: string;
/**项目ID*/
proId: number;
/**性别(Mr-先生、Ms-女士)*/
sex: string;
/**认购栋座*/
subscriptionBuilding: string;
/**认购房号*/
subscriptionRoom: string;
/**是否悦家云(Y-悦家云、N-非悦家云)*/
yueJiaYun: string;
}
/**DealDetail*/
export interface DealDetail {
/**评论意见*/
comments: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交状态(UnderReview-审核中、ValidDeal-成交有效、InvalidDeal-成交无效)*/
dealStatus: string;
/**成交时间(yyyy-MM-dd HH:mm:ss)*/
dealTime: string;
/**已删除*/
deleted: number;
/**是否市场化项目*/
exMarket: number;
/**ID*/
id: number;
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**项目ID*/
proId: number;
/**报备ID*/
reportId: number;
/**性别(Mr-先生、Ms-女士)*/
sex: string;
/**认购栋座*/
subscriptionBuilding: string;
/**认购房号*/
subscriptionRoom: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**是否悦家云(Y-悦家云、N-非悦家云)*/
yueJiaYun: string;
}
/**DealQueryVO*/
export interface DealQueryVO {
/**成交状态(UnderReview-审核中、ValidDeal-成交有效、InvalidDeal-成交无效)*/
dealStatus: string;
/**手机号码*/
mobile: string;
/**姓名*/
name: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**报备时间结束*/
reportDateEnd: string;
/**报备时间开始(yyyy-MM-dd HH:mm:ss)*/
reportDateStart: string;
}
/**DealVO*/
export interface DealVO {
/**评论意见*/
comments: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交状态(UnderReview-审核中、ValidDeal-成交有效、InvalidDeal-成交无效)*/
dealStatus: string;
/**成交时间(yyyy-MM-dd HH:mm:ss)*/
dealTime: string;
/**已删除*/
deleted: number;
/**是否市场化项目*/
exMarket: number;
/**ID*/
id: number;
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**项目ID*/
proId: number;
/**报备ID*/
reportId: number;
/**性别(Mr-先生、Ms-女士)*/
sex: string;
/**认购栋座*/
subscriptionBuilding: string;
/**认购房号*/
subscriptionRoom: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**是否悦家云(Y-悦家云、N-非悦家云)*/
yueJiaYun: string;
}
/**DealValidOrInvalidVO*/
export interface DealValidOrInvalidVO {
/**无效意见*/
comments: string;
/**成交时间(yyyy-MM-dd HH:mm:ss)*/
dealTime: string;
/**ID*/
id: number;
/**报备成交状态操作类型【有效/无效】(Valid-有效、Invalid-无效)*/
validOrInvalid: string;
}
/**ReportAttachmentBaseVO*/
export interface ReportAttachmentBaseVO {
/**文件ID*/
fileId: string;
/**类型*/
fileType: string;
/**报备ID*/
reportId: number;
/**具体附件(ReferralsConfirmedList-转介客户确认单、OfferNotice-优惠告知书、Pos-pos小票、NewHouseBook-新房认购书、DepositReceipt-定金收据、IdCard-身份证、OnlineVisa-网签证明)*/
specific: string;
/**附件类型(Visit-到访附件、RecognizeChips-认筹附件、Subscribe-认购附件、Sign-签约附件)*/
type: string;
}
/**ReportAttachmentQueryVO*/
export interface ReportAttachmentQueryVO {
/**报备ID*/
reportId: number;
/**具体附件(ReferralsConfirmedList-转介客户确认单、OfferNotice-优惠告知书、Pos-pos小票、NewHouseBook-新房认购书、DepositReceipt-定金收据、IdCard-身份证、OnlineVisa-网签证明)*/
specific: string;
/**附件类型(Visit-到访附件、RecognizeChips-认筹附件、Subscribe-认购附件、Sign-签约附件)*/
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
/**类型*/
fileType: string;
/**ID*/
id: number;
/**报备ID*/
reportId: number;
/**具体附件(ReferralsConfirmedList-转介客户确认单、OfferNotice-优惠告知书、Pos-pos小票、NewHouseBook-新房认购书、DepositReceipt-定金收据、IdCard-身份证、OnlineVisa-网签证明)*/
specific: string;
/**附件类型(Visit-到访附件、RecognizeChips-认筹附件、Subscribe-认购附件、Sign-签约附件)*/
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
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效)*/
reportStatus: string;
}
/**ReportListVO*/
export interface ReportListVO {
/**联系方式*/
mobile: string;
/**姓名*/
name: string;
/**报备楼盘*/
realEstate: string;
/**报备时间(yyyy-MM-dd HH:mm:ss)*/
reportDate: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效)*/
reportStatus: string;
}
/**ReportQueryVO*/
export interface ReportQueryVO {
/**中介公司*/
channelName: string;
/**周期所属事业部*/
departmentId: number;
/**联系方式*/
mobile: string;
/**报备人姓名*/
name: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目周期*/
proCycle: string;
/**项目名称*/
proName: string;
/**报备时间结束*/
reportDateEnd: string;
/**报备时间开始(yyyy-MM-dd HH:mm:ss)*/
reportDateStart: string;
/**报备状态(UnderReview-审核中、ValidReport-报备有效、InvalidReport-报备无效)*/
reportStatus: string;
/**到访状态(UnderReview-审核中、ValidVisit-到访有效、InvalidVisit-到访无效)*/
visitStatus: string;
}
/**ReportUpdateMobile*/
export interface ReportUpdateMobile {
/**报备ID*/
id: number;
/**联系方式*/
mobile: string;
}
/**ReportVO*/
export interface ReportVO {
/**渠道ID*/
channelId: number;
/**是否市场化项目*/
exMarket: number;
/**预计到访人数*/
expectedNumber: number;
/**预计到访时间(yyyy-MM-dd HH:mm:ss)*/
expectedTime: string;
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
/**报备类型(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportType: string;
/**性别(Mr-先生、Ms-女士)*/
sex: string;
/**是否悦家云(Y-悦家云、N-非悦家云)*/
yueJiaYun: string;
}
/**ReportValidOrInvalidVO*/
export interface ReportValidOrInvalidVO {
/**ID集合*/
ids: number[];
/**操作类型【有效/无效】(Valid-有效、Invalid-无效)*/
validOrInvalid: string;
}
/**VisitValidOrInvalidVO*/
export interface VisitValidOrInvalidVO {
/**无效意见*/
comments: string;
/**ID集合*/
id: number;
/**操作类型【有效/无效】(Valid-有效、Invalid-无效)*/
validOrInvalid: string;
/**到访时间(yyyy-MM-dd HH:mm:ss)*/
visitDate: string;
}
