/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-9 14:34:00
import { request } from '@/api/base'
/**添加渠道*/
export async function post_channel_add (d?: any) {
return await request.post< string,string> ('/channel/channel/add', d)
}
/**渠道审核操作【未实现】*/
export async function get_channel_approveRecord (d?: any) {
return await request.get<string,string>('/channel/channel/approveRecord', { params: d })
}
/**渠道基础信息变更【未实现】*/
export async function post_channel_edit (d?: any) {
return await request.post< string,string> ('/channel/channel/edit', d)
}
/**查询渠道详情*/
export async function get_channel_get__id (d?: any) {
return await request.get<ChannelDetail,ChannelDetail>('/channel/channel/get/{id}', { params: d })
}
/**查询渠道列表*/
export async function post_channel_getList (d?: any) {
return await request.post< PageModel<ChannelVO>,PageModel<ChannelVO>> ('/channel/channel/getList', d)
}
/**渠道等级信息变更录入人*/
export async function post_channel_modifyInputUser (d?: any) {
return await request.post< string,string> ('/channel/channel/modifyInputUser', d)
}
/**添加渠道经纪人*/
export async function post_channelAgent_add (d?: any) {
return await request.post< string,string> ('/channel/channelAgent/add', d)
}
/**修改渠道经纪人*/
export async function post_channelAgent_edit (d?: any) {
return await request.post< string,string> ('/channel/channelAgent/edit', d)
}
/**查询渠道经纪人详情*/
export async function get_channelAgent_get__id (d?: any) {
return await request.get<ChannelAgentVO,ChannelAgentVO>('/channel/channelAgent/get/{id}', { params: d })
}
/**查询渠道经纪人列表*/
export async function get_channelAgent_getAllByChannelId__channelId (d?: any) {
return await request.get<ChannelAgent[],ChannelAgent[]>('/channel/channelAgent/getAllByChannelId/{channelId}', { params: d })
}
/**查询渠道经纪人列表*/
export async function post_channelAgent_getList (d?: any) {
return await request.post< PageModel<ChannelAgentVO>,PageModel<ChannelAgentVO>> ('/channel/channelAgent/getList', d)
}
/**新增渠道呈批*/
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
export async function get_channelApprovalOaRecord_getAll__approvalId (d?: any) {
return await request.get<ChannelApprovalOaRecord[],ChannelApprovalOaRecord[]>('/channel/channelApprovalOaRecord/getAll/{approvalId}', { params: d })
}
/**查询渠道呈批列表*/
export async function get_channelApprovalRecord_getAll__approvalId (d?: any) {
return await request.get<ChannelApprovalRecord[],ChannelApprovalRecord[]>('/channel/channelApprovalRecord/getAll/{approvalId}', { params: d })
}
/**添加渠道商银行账户*/
export async function post_channelBank_add (d?: any) {
return await request.post< string,string> ('/channel/channelBank/add', d)
}
/**修改渠道商银行账户*/
export async function post_channelBank_edit (d?: any) {
return await request.post< string,string> ('/channel/channelBank/edit', d)
}
/**查询渠道商银行账户详情*/
export async function get_channelBank_get__id (d?: any) {
return await request.get<ChannelBankVO,ChannelBankVO>('/channel/channelBank/get/{id}', { params: d })
}
/**查询渠道商银行账户列表*/
export async function get_channelBank_getAll__channelId (d?: any) {
return await request.get<ChannelBank[],ChannelBank[]>('/channel/channelBank/getAll/{channelId}', { params: d })
}
/**查询城市等级列表*/
export async function post_channelCityLevel_getList (d?: any) {
return await request.post< PageModel<ChannelCityLevelVO>,PageModel<ChannelCityLevelVO>> ('/channel/channelCityLevel/getList', d)
}
/**批量更新城市等级*/
export async function post_channelCityLevel_updateLevel (d?: any) {
return await request.post< number,number> ('/channel/channelCityLevel/updateLevel', d)
}
/**添加渠道等级信息*/
export async function post_channelGrade_add (d?: any) {
return await request.post< string,string> ('/channel/channelGrade/add', d)
}
/**渠道等级审核操作【未实现】*/
export async function get_channelGrade_approveRecord (d?: any) {
return await request.get<string,string>('/channel/channelGrade/approveRecord', { params: d })
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
/**渠道等级信息变更录入人*/
export async function post_channelGrade_modifyInputUser (d?: any) {
return await request.post< string,string> ('/channel/channelGrade/modifyInputUser', d)
}
/**查询渠道等级处理列表*/
export async function get_channelGradeRecord_getAll__gradeId (d?: any) {
return await request.get<ChannelGradeRecord[],ChannelGradeRecord[]>('/channel/channelGradeRecord/getAll/{gradeId}', { params: d })
}
/**添加渠道评级标准*/
export async function post_channelGradeStandard_add (d?: any) {
return await request.post< string,string> ('/channel/channelGradeStandard/add', d)
}
/**保存渠道供应商管理办法附件*/
export async function post_channelGradeStandard_addManagementAttachment (d?: any) {
return await request.post< string,string> ('/channel/channelGradeStandard/addManagementAttachment', d)
}
/**下载渠道供应商管理办法附件【未实现】*/
export async function get_channelGradeStandard_download (d?: any) {
return await request.get<any,any>('/channel/channelGradeStandard/download', { params: d })
}
/**修改渠道评级标准*/
export async function post_channelGradeStandard_edit (d?: any) {
return await request.post< string,string> ('/channel/channelGradeStandard/edit', d)
}
/**查询渠道评级标准列表*/
export async function post_channelGradeStandard_getList (d?: any) {
return await request.post< PageModel<ChannelGradeStandardVO>,PageModel<ChannelGradeStandardVO>> ('/channel/channelGradeStandard/getList', d)
}
/**查询渠道供应商管理办法附件列表*/
export async function get_channelGradeStandard_getSupplierManagementAttachments (d?: any) {
return await request.get<ChannelSupplierManagementAttachment[],ChannelSupplierManagementAttachment[]>('/channel/channelGradeStandard/getSupplierManagementAttachments', { params: d })
}
/**查看渠道评级标准所需材料*/
export async function get_channelGradeStandard_viewMaterials (d?: any) {
return await request.get<ChannelGradeStandardBaseVO,ChannelGradeStandardBaseVO>('/channel/channelGradeStandard/viewMaterials', { params: d })
}
/**邀请码作废*/
export async function post_channelInvitationCode_cancel (d?: any) {
return await request.post< number,number> ('/channel/channelInvitationCode/cancel', d)
}
/**生成邀请码*/
export async function get_channelInvitationCode_create (d?: any) {
return await request.get<string,string>('/channel/channelInvitationCode/create', { params: d })
}
/**删除邀请码*/
export async function get_channelInvitationCode_delete__invitationCode (d?: any) {
return await request.get<number,number>('/channel/channelInvitationCode/delete/{invitationCode}', { params: d })
}
/**获取/下载邀请码二维码图片*/
export async function get_channelInvitationCode_download (d?: any) {
return await request.get<any,any>('/channel/channelInvitationCode/download', { params: d })
}
/**获取/下载邀请码二维码图片*/
export async function get_channelInvitationCode_getInvitationCodeImage (d?: any) {
return await request.get<any,any>('/channel/channelInvitationCode/getInvitationCodeImage', { params: d })
}
/**查询渠道邀请码列表*/
export async function post_channelInvitationCode_getList (d?: any) {
return await request.post< PageModel<ChannelInvitationCodeVO>,PageModel<ChannelInvitationCodeVO>> ('/channel/channelInvitationCode/getList', d)
}
/**查询渠道处理列表*/
export async function get_channelRecord_getAll__channelId (d?: any) {
return await request.get<ChannelRecord[],ChannelRecord[]>('/channel/channelRecord/getAll/{channelId}', { params: d })
}
/**检查公司是否已经注册*/
export async function get_channelRegistUser_checkIsExists (d?: any) {
return await request.get<boolean,boolean>('/channel/channelRegistUser/checkIsExists', { params: d })
}
/**校验短信*/
export async function get_channelRegistUser_checkVerifyCode (d?: any) {
return await request.get<boolean,boolean>('/channel/channelRegistUser/checkVerifyCode', { params: d })
}
/**查询注册用户列表*/
export async function post_channelRegistUser_getList (d?: any) {
return await request.post< PageModel<ChannelRegistUserVO>,PageModel<ChannelRegistUserVO>> ('/channel/channelRegistUser/getList', d)
}
/**渠道用户注册*/
export async function post_channelRegistUser_regist (d?: any) {
return await request.post< string,string> ('/channel/channelRegistUser/regist', d)
}
/**发送短信*/
export async function get_channelRegistUser_sendMessage (d?: any) {
return await request.get<string,string>('/channel/channelRegistUser/sendMessage', { params: d })
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
/**ApproveRecordVO*/
export interface ApproveRecordVO {
/**(必填)审核操作*/
approveStatus: number;
/**(必填)id*/
id: number;
/**(必填)处理意见*/
remark: string;
}
/**ChannelAgent*/
export interface ChannelAgent {
/**渠道商ID*/
chanelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**邮箱*/
email: string;
/**ID*/
id: number;
/**手机号码*/
mobile: string;
/**姓名*/
name: string;
/**是否结佣*/
settlementFlag: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelAgentBaseVO*/
export interface ChannelAgentBaseVO {
/**渠道商ID*/
chanelId: number;
/**邮箱*/
email: string;
/**ID*/
id: number;
/**手机号码*/
mobile: string;
/**姓名*/
name: string;
/**是否结佣*/
settlementFlag: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
}
/**ChannelAgentQueryVO*/
export interface ChannelAgentQueryVO {
/**手机号码*/
mobile: string;
/**姓名*/
name: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**是否结佣*/
settlementFlag: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
}
/**ChannelAgentVO*/
export interface ChannelAgentVO {
/**渠道商ID*/
chanelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**邮箱*/
email: string;
/**ID*/
id: number;
/**手机号码*/
mobile: string;
/**姓名*/
name: string;
/**是否结佣*/
settlementFlag: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelApprovalAttachment*/
export interface ChannelApprovalAttachment {
/**渠道ID*/
approvalId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**ID*/
id: number;
/**类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelApprovalAttachment_1*/
export interface ChannelApprovalAttachment_1 {
/**渠道ID*/
approvalId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**ID*/
id: number;
/**类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelApprovalBaseVO*/
export interface ChannelApprovalBaseVO {
/**呈批说明*/
approvalDesc: string;
/**呈批标题*/
approvalTitle: string;
/**附件信息*/
channelApprovalAttachments: ChannelApprovalAttachment_1[];
/**渠道等级信息*/
channelApprovalGrades: ChannelApprovalGrade_1[];
/**事业部*/
departmentOrgId: number;
}
/**ChannelApprovalGrade*/
export interface ChannelApprovalGrade {
/**渠道ID*/
approvalId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**渠道等级ID*/
gradeId: number;
/**ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelApprovalGrade_1*/
export interface ChannelApprovalGrade_1 {
/**渠道ID*/
approvalId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**渠道等级ID*/
gradeId: number;
/**ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelApprovalOaRecord*/
export interface ChannelApprovalOaRecord {
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
/**ChannelApprovalQueryVO*/
export interface ChannelApprovalQueryVO {
/**申请编号*/
approvalNo: string;
/**经办人*/
approvalUser: number;
/**事业部*/
departmentOrgId: number;
/**发起日期结束*/
inputTimeEnd: string;
/**发起日期开始*/
inputTimeStart: string;
/**OA发文文号*/
oaNo: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**状态(Draft-草稿、SubmittedForApproval-已发起呈批、Approved-审批通过、ApprovalFailed-审批不通过)*/
status: string;
}
/**ChannelApprovalRecord*/
export interface ChannelApprovalRecord {
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
/**ChannelApprovalVO*/
export interface ChannelApprovalVO {
/**呈批说明*/
approvalDesc: string;
/**申请编号*/
approvalNo: string;
/**呈批标题*/
approvalTitle: string;
/**经办人*/
approvalUser: number;
/**附件信息*/
channelApprovalAttachments: ChannelApprovalAttachment[];
/**渠道等级信息*/
channelApprovalGrades: ChannelApprovalGrade[];
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
/**发起日期(yyyy-MM-dd)*/
inputTime: string;
/**OA发文文号*/
oaNo: string;
/**状态(Draft-草稿、SubmittedForApproval-已发起呈批、Approved-审批通过、ApprovalFailed-审批不通过)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelAttachment*/
export interface ChannelAttachment {
/**渠道ID*/
channelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**ID*/
id: number;
/**类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelBank*/
export interface ChannelBank {
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
/**账号类型(BasicDepositAccount-基本存款账户、GeneralDepositAccount-一般存款账户)*/
type: string;
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
/**账号类型*/
type: string;
}
/**ChannelBankVO*/
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
/**账号类型(BasicDepositAccount-基本存款账户、GeneralDepositAccount-一般存款账户)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelBaseVO*/
export interface ChannelBaseVO {
/**营业住所*/
address: string;
/**营业期限*/
businessTime: string;
/**注册资本*/
capital: string;
/**附件信息*/
channelAttachments: ChannelAttachment[];
/**渠道银行账号信息*/
channelBanks: ChannelBank[];
/**渠道负责人信息*/
channelPersons: ChannelPerson[];
/**渠道所在城市*/
city: string;
/**渠道所在行政区*/
county: string;
/**统一社会信用代码*/
creditCode: string;
/**跟进人*/
followUserId: number;
/**法人代表*/
legalPerson: string;
/**公司名称*/
name: string;
/**1保存2提交*/
operateType: number;
/**渠道所在省份*/
province: string;
/**企业概况*/
remark: string;
/**成立日期(yyyy-MM-dd)*/
setupTime: string;
/**简称*/
shortName: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
type: string;
}
/**ChannelCityLevelQueryVO*/
export interface ChannelCityLevelQueryVO {
/**城市编码*/
cityCode: string;
/**城市等级*/
grade: number;
/**城市等级*/
level: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**省份编码*/
proviceCode: string;
}
/**ChannelCityLevelUpdateVO*/
export interface ChannelCityLevelUpdateVO {
/**城市等级*/
cityGrade: number;
/**需要更新城市ids*/
ids: number[];
}
/**ChannelCityLevelVO*/
export interface ChannelCityLevelVO {
/**编码*/
code: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**城市等级*/
grade: number;
/**ID*/
id: number;
/**层级*/
level: number;
/**名称*/
name: string;
/**父编码*/
parentCode: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelDetail*/
export interface ChannelDetail {
/**营业住所*/
address: string;
/**营业期限*/
businessTime: string;
/**注册资本*/
capital: string;
/**附件信息*/
channelAttachments: ChannelAttachment[];
/**银行账户信息*/
channelBanks: ChannelBank[];
/**负责人信息*/
channelPersons: ChannelPerson[];
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
/**录入人*/
inputUser: number;
/**法人代表*/
legalPerson: string;
/**公司名称*/
name: string;
/**渠道所在省份*/
province: string;
/**企业概况*/
remark: string;
/**成立日期(yyyy-MM-dd)*/
setupTime: string;
/**简称*/
shortName: string;
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Approved-变更中)*/
status: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeAttachment*/
export interface ChannelGradeAttachment {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**渠道ID*/
gradeId: number;
/**ID*/
id: number;
/**类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeBaseVO*/
export interface ChannelGradeBaseVO {
/**渠道等级*/
channelGrade: string;
/**附件信息*/
channelGradeAttachments: ChannelGradeAttachment[];
/**渠道评级标准信息*/
channelGradeItems: ChannelGradeItem[];
/**渠道ID*/
channelId: number;
/**渠道类型(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelType: string;
/**业务开展城市*/
city: string;
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**事业部*/
departmentOrgId: number;
/**1保存2提交*/
operateType: number;
/**业务开展省份*/
province: string;
/**是否特批入库*/
special: number;
/**入库编号*/
storageNum: string;
}
/**ChannelGradeItem*/
export interface ChannelGradeItem {
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
/**录入信息*/
inputValue: string;
/**评级标准id*/
standardId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeQueryVO*/
export interface ChannelGradeQueryVO {
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**渠道ID*/
channelId: number;
/**业务开展城市*/
city: string;
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**事业部*/
departmentOrgId: number;
/**录入人*/
inputUser: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**业务开展省份*/
province: string;
/**是否特批入库*/
special: number;
/**状态(DRAFT-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、PASS-审核通过、SubmittedForApproval-已发起呈批、Approved-已审批)*/
status: string;
/**入库编号*/
storageNum: string;
}
/**ChannelGradeRecord*/
export interface ChannelGradeRecord {
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
/**ChannelGradeStandardQueryVO*/
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
/**ChannelGradeStandardVO*/
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
/**ChannelGradeVO*/
export interface ChannelGradeVO {
/**渠道等级*/
channelGrade: string;
/**渠道ID*/
channelId: number;
/**渠道商名称*/
channelName: string;
/**渠道类型(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelType: string;
/**业务开展城市*/
city: string;
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
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
/**录入人*/
inputUser: number;
/**业务开展省份*/
province: string;
/**是否特批入库*/
special: number;
/**状态(DRAFT-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、PASS-审核通过、SubmittedForApproval-已发起呈批、Approved-已审批)*/
status: string;
/**入库编号*/
storageNum: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelInvitationCodeQueryVO*/
export interface ChannelInvitationCodeQueryVO {
/**事业部*/
departmentOrgId: number;
/**失效时间(yyyy-MM-dd)*/
expiresTime: string;
/**邀请码*/
invitationCode: string;
/**邀请人ID*/
invitationUserId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
}
/**ChannelInvitationCodeVO*/
export interface ChannelInvitationCodeVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**事业部*/
departmentOrgId: number;
/**失效时间(yyyy-MM-dd)*/
expiresTime: string;
/**ID*/
id: number;
/**邀请码*/
invitationCode: string;
/**邀请人ID/创建人*/
invitationUserId: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelPerson*/
export interface ChannelPerson {
/**手机号码*/
bobile: string;
/**渠道商ID*/
channelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**邮箱 */
email: string;
/**ID*/
id: number;
/**证件编号*/
identityCode: string;
/**证件类型*/
identityType: string;
/**姓名*/
name: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelQueryVO*/
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
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Approved-变更中)*/
status: string;
}
/**ChannelRecord*/
export interface ChannelRecord {
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
/**公司名称*/
companyName: string;
/**信用代码*/
creditCode: string;
/**电子邮箱*/
email: string;
/**身份证号码*/
identityCode: string;
/**邀请码*/
invitationCode: string;
/**手机号码*/
mobile: string;
/**密码*/
password: string;
/**确认密码*/
rePassword: string;
/**姓名*/
username: string;
/**短信验证码*/
verifyCode: string;
}
/**ChannelRegistUserQueryVO*/
export interface ChannelRegistUserQueryVO {
/**渠道商名称*/
companyName: string;
/**邀请码*/
invitationCode: string;
/**手机号码*/
mobile: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**姓名*/
username: string;
}
/**ChannelRegistUserVO*/
export interface ChannelRegistUserVO {
/**公司名称*/
companyName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**信用代码*/
creditCode: string;
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
/**注册日期(yyyy-MM-dd)*/
registTime: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**姓名*/
username: string;
}
/**ChannelSupplierManagementAttachment*/
export interface ChannelSupplierManagementAttachment {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**ID*/
id: number;
/**类型*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelSupplierManagementAttachmentVO*/
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
/**ChannelVO*/
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
/**录入人*/
inputUser: number;
/**法人代表*/
legalPerson: string;
/**公司名称*/
name: string;
/**渠道所在省份*/
province: string;
/**企业概况*/
remark: string;
/**成立日期(yyyy-MM-dd)*/
setupTime: string;
/**简称*/
shortName: string;
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Approved-变更中)*/
status: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
