/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-9-22 16:21:23
import { request } from '@/api/base'
/**添加渠道【未实现】*/
export async function post_channel_add (d?: any) {
return await request.post< string,string> ('/channel/channel/add', d)
}
/**渠道基础信息变更【未实现】*/
export async function post_channel_edit (d?: any) {
return await request.post< string,string> ('/channel/channel/edit', d)
}
/**查询渠道详情*/
export async function get_channel_get__id (d?: any) {
return await request.get<ChannelVO,ChannelVO>('/channel/channel/get/{id}', { params: d })
}
/**查询渠道列表*/
export async function post_channel_getList (d?: any) {
return await request.post< PageModel<ChannelVO>,PageModel<ChannelVO>> ('/channel/channel/getList', d)
}
/**渠道审核确认操作【未实现】*/
export async function get_channel_operate (d?: any) {
return await request.get<string,string>('/channel/channel/operate', { params: d })
}
/**变更跟进人【未实现】*/
export async function post_channel_updateFlowUser (d?: any) {
return await request.post< string,string> ('/channel/channel/updateFlowUser', d)
}
/**添加/修改渠道经纪人【未实现】*/
export async function post_channelAgent_addOrEdit (d?: any) {
return await request.post< string,string> ('/channel/channelAgent/addOrEdit', d)
}
/**查询渠道经纪人详情*/
export async function get_channelAgent_get__id (d?: any) {
return await request.get<ChannelAgentVO,ChannelAgentVO>('/channel/channelAgent/get/{id}', { params: d })
}
/**查询渠道经纪人列表*/
export async function get_channelAgent_getList__channelId (d?: any) {
return await request.get<ChannelAgent对象[],ChannelAgent对象[]>('/channel/channelAgent/getList/{channelId}', { params: d })
}
/**新增渠道呈批【未实现】*/
export async function post_channelApproval_add (d?: any) {
return await request.post< string,string> ('/channel/channelApproval/add', d)
}
/**查询渠道呈批详情*/
export async function get_channelApproval_get__id (d?: any) {
return await request.get<ChannelApprovalVO,ChannelApprovalVO>('/channel/channelApproval/get/{id}', { params: d })
}
/**查询渠道呈批列表*/
export async function post_channelApproval_getList (d?: any) {
return await request.post< PageModel<ChannelApprovalVO>,PageModel<ChannelApprovalVO>> ('/channel/channelApproval/getList', d)
}
/**查询渠道呈批OA处理列表*/
export async function post_channelApprovalOaRecord_getList__approvalId (d?: any) {
return await request.post< ChannelApprovalOaRecord对象[],ChannelApprovalOaRecord对象[]> ('/channel/channelApprovalOaRecord/getList/{approvalId}', d)
}
/**查询渠道呈批列表*/
export async function post_channelApprovalRecord_getList__approvalId (d?: any) {
return await request.post< ChannelApprovalRecord对象[],ChannelApprovalRecord对象[]> ('/channel/channelApprovalRecord/getList/{approvalId}', d)
}
/**添加/修改渠道银行账户*/
export async function post_channelBank_addOrEdit (d?: any) {
return await request.post< string,string> ('/channel/channelBank/addOrEdit', d)
}
/**查询渠道银行账户详情*/
export async function get_channelBank_get__id (d?: any) {
return await request.get<ChannelBankVO,ChannelBankVO>('/channel/channelBank/get/{id}', { params: d })
}
/**查询渠道银行账户列表*/
export async function get_channelBank_getList__channelId (d?: any) {
return await request.get<ChannelBank对象[],ChannelBank对象[]>('/channel/channelBank/getList/{channelId}', { params: d })
}
/**添加渠道等级信息*/
export async function post_channelGrade_add (d?: any) {
return await request.post< string,string> ('/channel/channelGrade/add', d)
}
/**渠道等级信息变更【未实现】*/
export async function post_channelGrade_edit (d?: any) {
return await request.post< string,string> ('/channel/channelGrade/edit', d)
}
/**查询渠道等级详情*/
export async function get_channelGrade_get__id (d?: any) {
return await request.get<ChannelGradeVO,ChannelGradeVO>('/channel/channelGrade/get/{id}', { params: d })
}
/**查询渠道等级列表*/
export async function post_channelGrade_getList (d?: any) {
return await request.post< PageModel<ChannelGradeVO>,PageModel<ChannelGradeVO>> ('/channel/channelGrade/getList', d)
}
/**渠道等级审核操作【未实现】*/
export async function get_channelGrade_operate (d?: any) {
return await request.get<string,string>('/channel/channelGrade/operate', { params: d })
}
/**查询渠道等级处理列表*/
export async function get_channelGradeRecord_getList__gradeId (d?: any) {
return await request.get<ChannelGradeRecord对象[],ChannelGradeRecord对象[]>('/channel/channelGradeRecord/getList/{gradeId}', { params: d })
}
/**上传渠道供应商管理办法附件【未实现】*/
export async function post_channelGradeStandard_add (d?: any) {
return await request.post< any,any> ('/channel/channelGradeStandard/add', d)
}
/**添加/修改渠道评级标准*/
export async function post_channelGradeStandard_addOrEdit (d?: any) {
return await request.post< string,string> ('/channel/channelGradeStandard/addOrEdit', d)
}
/**下载渠道供应商管理办法附件【未实现】*/
export async function get_channelGradeStandard_download (d?: any) {
return await request.get<any,any>('/channel/channelGradeStandard/download', { params: d })
}
/**查询渠道评级标准列表*/
export async function post_channelGradeStandard_getList (d?: any) {
return await request.post< PageModel<ChannelGradeStandardVO>,PageModel<ChannelGradeStandardVO>> ('/channel/channelGradeStandard/getList', d)
}
/**查询渠道供应商管理办法附件列表【未实现】*/
export async function get_channelGradeStandard_getSupplierManagementAttachments (d?: any) {
return await request.get<ChannelSupplierManagementAttachmentVO[],ChannelSupplierManagementAttachmentVO[]>('/channel/channelGradeStandard/getSupplierManagementAttachments', { params: d })
}
/**查看渠道评级标准所需材料*/
export async function get_channelGradeStandard_viewMaterials (d?: any) {
return await request.get<ChannelGradeStandardBaseVO,ChannelGradeStandardBaseVO>('/channel/channelGradeStandard/viewMaterials', { params: d })
}
/**生成邀请码*/
export async function get_channelInvitationCode_create (d?: any) {
return await request.get<any,any>('/channel/channelInvitationCode/create', { params: d })
}
/**获取/下载邀请码二维码图片*/
export async function get_channelInvitationCode_download (d?: any) {
return await request.get<any,any>('/channel/channelInvitationCode/download', { params: d })
}
/**获取/下载邀请码二维码图片*/
export async function get_channelInvitationCode_getInvitationCodeImage (d?: any) {
return await request.get<any,any>('/channel/channelInvitationCode/getInvitationCodeImage', { params: d })
}
/**查询渠道处理列表*/
export async function post_channelRecord_getList__channelId (d?: any) {
return await request.post< ChannelRecord对象[],ChannelRecord对象[]> ('/channel/channelRecord/getList/{channelId}', d)
}
/**查询注册用户列表*/
export async function post_channelRegistUser_getList (d?: any) {
return await request.post< PageModel<ChannelRegistUserVO>,PageModel<ChannelRegistUserVO>> ('/channel/channelRegistUser/getList', d)
}
/**渠道用户注册【未实现】*/
export async function post_channelRegistUser_regist (d?: any) {
return await request.post< string,string> ('/channel/channelRegistUser/regist', d)
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
/**ChannelAgentBaseVO*/
export interface ChannelAgentBaseVO {
/**渠道等级*/
channelGrade: string;
/**城市等级*/
cityGrade: string;
/**手机号码*/
mobile: string;
/**密码*/
password: string;
/**确认密码*/
rePassword: string;
/**姓名*/
username: string;
}
/**渠道经纪人信息*/
export interface ChannelAgentVO {
/**处理人*/
bobile: string;
/**渠道ID*/
companyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**处理意见*/
email: string;
/**ID*/
id: number;
/**操作*/
name: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**渠道经纪人信息*/
export interface ChannelAgent对象 {
/**处理人*/
bobile: string;
/**渠道ID*/
companyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**处理意见*/
email: string;
/**ID*/
id: number;
/**操作*/
name: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelApprovalBaseVO*/
export interface ChannelApprovalBaseVO {
/**手机号码*/
mobile: string;
/**密码*/
password: string;
/**确认密码*/
rePassword: string;
/**姓名*/
username: string;
}
/**渠道呈批OA处理记录*/
export interface ChannelApprovalOaRecord对象 {
/**渠道ID*/
approvalId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**处理时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**处理人*/
operator: string;
/**处理意见*/
remark: string;
/**结果*/
result: string;
/**操作*/
stations: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**渠道呈批信息*/
export interface ChannelApprovalQueryVO {
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**渠道呈批处理记录*/
export interface ChannelApprovalRecord对象 {
/**渠道ID*/
approvalId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**处理时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作*/
operation: string;
/**处理人*/
operator: string;
/**处理意见*/
remark: string;
/**结果*/
result: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**渠道呈批信息*/
export interface ChannelApprovalVO {
/**公司名���*/
approvalNo: string;
/**统一社会信用代码*/
approvalUser: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**事业部*/
departmentOrgId: number;
/**名录文件*/
directoryFileId: string;
/**ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelBankBaseVO*/
export interface ChannelBankBaseVO {
/**账户名称*/
accountName: string;
/**账户号码*/
accountNum: string;
/**开户银行*/
bank: string;
/**渠道商ID*/
channelId: number;
/**ID*/
id: number;
}
/**渠道银行账户信息*/
export interface ChannelBankVO {
/**账户名称*/
accountName: string;
/**账户号码*/
accountNum: string;
/**开户银行*/
bank: string;
/**渠道商ID*/
channelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**账号类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**渠道银行账户信息*/
export interface ChannelBank对象 {
/**账户名称*/
accountName: string;
/**账户号码*/
accountNum: string;
/**开户银行*/
bank: string;
/**渠道商ID*/
channelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**账号类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelBaseVO*/
export interface ChannelBaseVO {
}
/**ChannelGradeBaseVO*/
export interface ChannelGradeBaseVO {
/**渠道等级*/
channelGrade: string;
/**渠道ID*/
channelId: number;
/**渠道类型*/
channelType: string;
/**业务开展城市*/
city: string;
/**城市等级*/
cityGrade: string;
/**事业部*/
departmentOrgId: number;
/**业务开展省份*/
province: string;
/**是否特批入库*/
special: number;
/**入库编号*/
storageNum: string;
}
/**渠道等级信息*/
export interface ChannelGradeQueryVO {
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**渠道等级处理记录*/
export interface ChannelGradeRecord对象 {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**渠道ID*/
gradeId: number;
/**ID*/
id: number;
/**处理时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作*/
operation: string;
/**处理人*/
operator: string;
/**处理意见*/
remark: string;
/**结果*/
result: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeStandardBaseVO*/
export interface ChannelGradeStandardBaseVO {
/**渠道等级*/
channelGrade: string;
/**城市等级*/
cityGrade: string;
/**评级项*/
gradeItem: string;
/**评级标准*/
gradeStandard: string;
/**ID*/
id: number;
/**所需材料*/
standardAttachments: string[];
}
/**渠道评级标准信息*/
export interface ChannelGradeStandardQueryVO {
/**渠道等级*/
channelGrade: string;
/**城市等级*/
cityGrade: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**渠道评级标准信息*/
export interface ChannelGradeStandardVO {
/**渠道等级*/
channelGrade: string;
/**城市等级*/
cityGrade: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**评级项*/
gradeItem: string;
/**评级标准*/
gradeStandard: string;
/**ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeUpdateVO*/
export interface ChannelGradeUpdateVO {
/**渠道等级*/
channelGrade: string;
/**渠道ID*/
channelId: number;
/**渠道类型*/
channelType: string;
/**业务开展城市*/
city: string;
/**城市等级*/
cityGrade: string;
/**事业部*/
departmentOrgId: number;
/**(必填)id*/
id: number;
/**(必填)审核操作*/
operate: number;
/**业务开展省份*/
province: string;
/**(必填)处理意见*/
remark: number;
/**是否特批入库*/
special: number;
/**入库编号*/
storageNum: string;
}
/**渠道等级信息*/
export interface ChannelGradeVO {
/**渠道等级*/
channelGrade: string;
/**渠道ID*/
channelId: number;
/**渠道商名称*/
channelName: string;
/**渠道类型*/
channelType: string;
/**业务开展城市*/
city: string;
/**城市等级*/
cityGrade: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**事业部*/
departmentOrgId: number;
/**ID*/
id: number;
/**业务开展省份*/
province: string;
/**是否特批入库*/
special: number;
/**入库编号*/
storageNum: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**渠道查询条件信息*/
export interface ChannelQueryVO {
/**城市*/
city: string;
/**行政区*/
county: string;
/**信用代码*/
creditCode: string;
/**跟进人*/
followUserId: number;
/**名称*/
name: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**省份*/
province: string;
/**简称*/
shortName: string;
/**状态*/
status: string;
}
/**渠道处理记录*/
export interface ChannelRecord对象 {
/**渠道ID*/
channelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**处理时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作*/
operation: string;
/**处理人*/
operator: string;
/**处理意见*/
remark: string;
/**结果*/
result: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelRegistUserBaseVO*/
export interface ChannelRegistUserBaseVO {
}
/**渠道用户注册信息*/
export interface ChannelRegistUserQueryVO {
/**手机号码*/
mobile: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**姓名*/
username: string;
}
/**渠道用户注册信息*/
export interface ChannelRegistUserVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**电子邮箱*/
email: string;
/**ID*/
id: number;
/**身份证号码*/
identityCode: string;
/**邀请码*/
invitationCode: string;
/**手机号码*/
mobile: string;
/**密码*/
password: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**姓名*/
username: string;
}
/**渠道供应商管理办法附件信息*/
export interface ChannelSupplierManagementAttachmentVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**文件名*/
fileName: string;
/**ID*/
id: number;
/**类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelUpdateVO*/
export interface ChannelUpdateVO {
/**(必填)id*/
id: number;
/**(必填)审核操作*/
operate: number;
/**(必填)处理意见*/
remark: number;
}
/**渠道公司信息*/
export interface ChannelVO {
/**营业住所*/
address: string;
/**营业期限*/
businessTime: string;
/**注册资本*/
capital: string;
/**渠道所在城市*/
city: string;
/**渠道所在行政区*/
county: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**统一社会信用代码*/
creditCode: string;
/**已删除*/
deleted: number;
/**跟进人*/
followUserId: number;
/**ID*/
id: number;
/**法人代表*/
legalPerson: string;
/**公司名称*/
name: string;
/**渠道所在省份*/
province: string;
/**成立日期(yyyy-MM-dd)*/
setupTime: string;
/**简称*/
shortName: string;
/**状态*/
status: string;
/**公司类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
