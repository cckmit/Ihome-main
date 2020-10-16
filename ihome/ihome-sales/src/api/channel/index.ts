/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-16 10:08:36 ├F10: AM┤
import { request } from '@/api/base'
const basePath = "/channel-local"
/**添加渠道*/
export async function post_channel_add (d?: any) {
return await request.post< number,number> (basePath+'/channel/add', d)
}
/**渠道审核操作*/
export async function post_channel_approveRecord (d?: any) {
return await request.post< string,string> (basePath+'/channel/approveRecord', d)
}
/**退回起草*/
export async function post_channel_backToDraft__id (d?: any) {
return await request.post< number,number> (basePath+'/channel/backToDraft/{id}', d)
}
/**删除渠道信息*/
export async function post_channel_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channel/delete/{id}', d)
}
/**修改渠道*/
export async function post_channel_edit (d?: any) {
return await request.post< number,number> (basePath+'/channel/edit', d)
}
/**查询渠道详情*/
export async function get_channel_get__id (d?: any) {
return await request.get<ChannelDetail,ChannelDetail>(basePath+'/channel/get/{id}', { params: d })
}
/**查询所有渠道商*/
export async function get_channel_getAll (d?: any) {
return await request.get<ChannelVO[],ChannelVO[]>(basePath+'/channel/getAll', { params: d })
}
/**查询渠道列表*/
export async function post_channel_getList (d?: any) {
return await request.post< PageModel<ChannelVO>,PageModel<ChannelVO>> (basePath+'/channel/getList', d)
}
/**渠道信息变更跟进人*/
export async function post_channel_modifyFollowUser (d?: any) {
return await request.post< string,string> (basePath+'/channel/modifyFollowUser', d)
}
/**渠道等级信息变更录入人*/
export async function post_channel_modifyInputUser (d?: any) {
return await request.post< string,string> (basePath+'/channel/modifyInputUser', d)
}
/**添加渠道经纪人*/
export async function post_channelAgent_add (d?: any) {
return await request.post< string,string> (basePath+'/channelAgent/add', d)
}
/**删除渠道经纪人信息*/
export async function post_channelAgent_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelAgent/delete/{id}', d)
}
/**禁用渠道经纪人信息*/
export async function post_channelAgent_disable__id (d?: any) {
return await request.post< number,number> (basePath+'/channelAgent/disable/{id}', d)
}
/**修改渠道经纪人*/
export async function post_channelAgent_edit (d?: any) {
return await request.post< string,string> (basePath+'/channelAgent/edit', d)
}
/**启用渠道经纪人信息*/
export async function post_channelAgent_enable__id (d?: any) {
return await request.post< number,number> (basePath+'/channelAgent/enable/{id}', d)
}
/**查询渠道经纪人详情*/
export async function get_channelAgent_get__id (d?: any) {
return await request.get<ChannelAgentVO,ChannelAgentVO>(basePath+'/channelAgent/get/{id}', { params: d })
}
/**查询渠道经纪人列表*/
export async function get_channelAgent_getAllByChannelId__channelId (d?: any) {
return await request.get<ChannelAgent[],ChannelAgent[]>(basePath+'/channelAgent/getAllByChannelId/{channelId}', { params: d })
}
/**查询渠道经纪人列表*/
export async function post_channelAgent_getList (d?: any) {
return await request.post< PageModel<ChannelAgentVO>,PageModel<ChannelAgentVO>> (basePath+'/channelAgent/getList', d)
}
/**新增渠道呈批*/
export async function post_channelApproval_add (d?: any) {
return await request.post< number,number> (basePath+'/channelApproval/add', d)
}
/**退回起草*/
export async function post_channelApproval_backToDraft__id (d?: any) {
return await request.post< number,number> (basePath+'/channelApproval/backToDraft/{id}', d)
}
/**删除渠道呈批信息*/
export async function post_channelApproval_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelApproval/delete/{id}', d)
}
/**下载渠道供应商名录*/
export async function get_channelApproval_downloadML__id (d?: any) {
return await request.get<any,any>(basePath+'/channelApproval/downloadML/{id}', { params: d })
}
/**修改渠道呈批*/
export async function post_channelApproval_edit (d?: any) {
return await request.post< number,number> (basePath+'/channelApproval/edit', d)
}
/**查询渠道呈批详情*/
export async function get_channelApproval_get__id (d?: any) {
return await request.get<ChannelApprovalVO,ChannelApprovalVO>(basePath+'/channelApproval/get/{id}', { params: d })
}
/**查询渠道呈批列表*/
export async function post_channelApproval_getList (d?: any) {
return await request.post< PageModel<ChannelApprovalVO>,PageModel<ChannelApprovalVO>> (basePath+'/channelApproval/getList', d)
}
/**变更经办人*/
export async function post_channelApproval_modifyApprovalUser (d?: any) {
return await request.post< string,string> (basePath+'/channelApproval/modifyApprovalUser', d)
}
/**根据渠道呈批id查询渠道呈批OA处理列表*/
export async function get_channelApprovalOaRecord_getAll__approvalId (d?: any) {
return await request.get<ChannelApprovalOaRecord[],ChannelApprovalOaRecord[]>(basePath+'/channelApprovalOaRecord/getAll/{approvalId}', { params: d })
}
/**根据渠道呈批id查询当前代办人*/
export async function get_channelApprovalOaRecord_getCurrentToDoUser__approvalId (d?: any) {
return await request.get<string,string>(basePath+'/channelApprovalOaRecord/getCurrentToDoUser/{approvalId}', { params: d })
}
/**根据渠道呈批id查询渠道呈批处理列表*/
export async function get_channelApprovalRecord_getAll__approvalId (d?: any) {
return await request.get<ChannelApprovalRecord[],ChannelApprovalRecord[]>(basePath+'/channelApprovalRecord/getAll/{approvalId}', { params: d })
}
/**添加渠道商银行账户*/
export async function post_channelBank_add (d?: any) {
return await request.post< string,string> (basePath+'/channelBank/add', d)
}
/**删除渠道商银行账户信息*/
export async function post_channelBank_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelBank/delete/{id}', d)
}
/**修改渠道商银行账户*/
export async function post_channelBank_edit (d?: any) {
return await request.post< string,string> (basePath+'/channelBank/edit', d)
}
/**查询渠道商银行账户详情*/
export async function get_channelBank_get__id (d?: any) {
return await request.get<ChannelBankVO,ChannelBankVO>(basePath+'/channelBank/get/{id}', { params: d })
}
/**查询渠道商银行账户列表*/
export async function get_channelBank_getAll__channelId (d?: any) {
return await request.get<ChannelBank[],ChannelBank[]>(basePath+'/channelBank/getAll/{channelId}', { params: d })
}
/**添加变更渠道商银行账户*/
export async function post_channelBankChange_add (d?: any) {
return await request.post< string,string> (basePath+'/channelBankChange/add', d)
}
/**删除渠道商银行账户变更信息*/
export async function post_channelBankChange_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelBankChange/delete/{id}', d)
}
/**修改变更渠道商银行账户*/
export async function post_channelBankChange_edit (d?: any) {
return await request.post< string,string> (basePath+'/channelBankChange/edit', d)
}
/**查询渠道商银行账户变更详情*/
export async function get_channelBankChange_get__id (d?: any) {
return await request.get<ChannelBankChangeVO,ChannelBankChangeVO>(basePath+'/channelBankChange/get/{id}', { params: d })
}
/**查询渠道商银行账户变更列表*/
export async function get_channelBankChange_getAll__channelId (d?: any) {
return await request.get<ChannelBankChange[],ChannelBankChange[]>(basePath+'/channelBankChange/getAll/{channelId}', { params: d })
}
/**添加渠道变更*/
export async function post_channelChange_add (d?: any) {
return await request.post< number,number> (basePath+'/channelChange/add', d)
}
/**渠道变更审核操作*/
export async function post_channelChange_approveRecord (d?: any) {
return await request.post< string,string> (basePath+'/channelChange/approveRecord', d)
}
/**退回起草*/
export async function post_channelChange_backToDraft__id (d?: any) {
return await request.post< number,number> (basePath+'/channelChange/backToDraft/{id}', d)
}
/**删除渠道变更信息*/
export async function post_channelChange_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelChange/delete/{id}', d)
}
/**修改渠道变更*/
export async function post_channelChange_edit (d?: any) {
return await request.post< number,number> (basePath+'/channelChange/edit', d)
}
/**查询渠道变更详情*/
export async function get_channelChange_get__id (d?: any) {
return await request.get<ChannelChangeDetail,ChannelChangeDetail>(basePath+'/channelChange/get/{id}', { params: d })
}
/**查询渠道变更列表*/
export async function post_channelChange_getList (d?: any) {
return await request.post< PageModel<ChannelChangeVO>,PageModel<ChannelChangeVO>> (basePath+'/channelChange/getList', d)
}
/**渠道信息变更跟进人*/
export async function post_channelChange_modifyFollowUser (d?: any) {
return await request.post< string,string> (basePath+'/channelChange/modifyFollowUser', d)
}
/**渠道等级信息变更录入人*/
export async function post_channelChange_modifyInputUser (d?: any) {
return await request.post< string,string> (basePath+'/channelChange/modifyInputUser', d)
}
/**查询城市等级*/
export async function get_channelCityLevel_get__cityCode (d?: any) {
return await request.get<ChannelCityLevel,ChannelCityLevel>(basePath+'/channelCityLevel/get/{cityCode}', { params: d })
}
/**查询城市等级列表*/
export async function post_channelCityLevel_getList (d?: any) {
return await request.post< PageModel<ChannelCityLevelVO>,PageModel<ChannelCityLevelVO>> (basePath+'/channelCityLevel/getList', d)
}
/**批量更新城市等级*/
export async function post_channelCityLevel_updateLevel (d?: any) {
return await request.post< number,number> (basePath+'/channelCityLevel/updateLevel', d)
}
/**添加渠道等级信息*/
export async function post_channelGrade_add (d?: any) {
return await request.post< number,number> (basePath+'/channelGrade/add', d)
}
/**渠道等级审核操作*/
export async function post_channelGrade_approveRecord (d?: any) {
return await request.post< string,string> (basePath+'/channelGrade/approveRecord', d)
}
/**退回起草*/
export async function post_channelGrade_backToDraft__id (d?: any) {
return await request.post< number,number> (basePath+'/channelGrade/backToDraft/{id}', d)
}
/**删除等级信息*/
export async function post_channelGrade_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelGrade/delete/{id}', d)
}
/**修改渠道等级信息*/
export async function post_channelGrade_edit (d?: any) {
return await request.post< number,number> (basePath+'/channelGrade/edit', d)
}
/**查询渠道等级详情*/
export async function get_channelGrade_get__id (d?: any) {
return await request.get<ChannelGradeVO,ChannelGradeVO>(basePath+'/channelGrade/get/{id}', { params: d })
}
/**查询渠道等级列表*/
export async function post_channelGrade_getList (d?: any) {
return await request.post< PageModel<ChannelGradeVO>,PageModel<ChannelGradeVO>> (basePath+'/channelGrade/getList', d)
}
/**渠道等级信息变更录入人*/
export async function post_channelGrade_modifyInputUser (d?: any) {
return await request.post< string,string> (basePath+'/channelGrade/modifyInputUser', d)
}
/**添加渠道等级变更信息*/
export async function post_channelGradeChange_add (d?: any) {
return await request.post< number,number> (basePath+'/channelGradeChange/add', d)
}
/**渠道等级变更审核操作*/
export async function post_channelGradeChange_approveRecord (d?: any) {
return await request.post< string,string> (basePath+'/channelGradeChange/approveRecord', d)
}
/**退回起草*/
export async function post_channelGradeChange_backToDraft__id (d?: any) {
return await request.post< number,number> (basePath+'/channelGradeChange/backToDraft/{id}', d)
}
/**删除渠道等级变更信息*/
export async function post_channelGradeChange_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelGradeChange/delete/{id}', d)
}
/**修改渠道等级变更信息*/
export async function post_channelGradeChange_edit (d?: any) {
return await request.post< number,number> (basePath+'/channelGradeChange/edit', d)
}
/**查询渠道等级变更详情*/
export async function get_channelGradeChange_get__id (d?: any) {
return await request.get<ChannelGradeChangeVO,ChannelGradeChangeVO>(basePath+'/channelGradeChange/get/{id}', { params: d })
}
/**查询渠道等级变更列表*/
export async function post_channelGradeChange_getList (d?: any) {
return await request.post< PageModel<ChannelGradeChangeVO>,PageModel<ChannelGradeChangeVO>> (basePath+'/channelGradeChange/getList', d)
}
/**渠道等级变更信息变更录入人*/
export async function post_channelGradeChange_modifyInputUser (d?: any) {
return await request.post< string,string> (basePath+'/channelGradeChange/modifyInputUser', d)
}
/**查询渠道等级处理列表*/
export async function get_channelGradeRecord_getAll__gradeId (d?: any) {
return await request.get<ChannelGradeRecord[],ChannelGradeRecord[]>(basePath+'/channelGradeRecord/getAll/{gradeId}', { params: d })
}
/**查询渠道等级变更处理列表*/
export async function get_channelGradeRecordChange_getAll__gradeId (d?: any) {
return await request.get<ChannelGradeRecordChange[],ChannelGradeRecordChange[]>(basePath+'/channelGradeRecordChange/getAll/{gradeId}', { params: d })
}
/**添加渠道评级标准*/
export async function post_channelGradeStandard_add (d?: any) {
return await request.post< string,string> (basePath+'/channelGradeStandard/add', d)
}
/**保存渠道供应商管理办法附件*/
export async function post_channelGradeStandard_addManagementAttachment (d?: any) {
return await request.post< string,string> (basePath+'/channelGradeStandard/addManagementAttachment', d)
}
/**删除渠道评级标准信息*/
export async function post_channelGradeStandard_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/channelGradeStandard/delete/{id}', d)
}
/**下载渠道供应商管理办法附件【未实现】*/
export async function get_channelGradeStandard_download (d?: any) {
return await request.get<any,any>(basePath+'/channelGradeStandard/download', { params: d })
}
/**修改渠道评级标准*/
export async function post_channelGradeStandard_edit (d?: any) {
return await request.post< string,string> (basePath+'/channelGradeStandard/edit', d)
}
/**查询渠道评级标准详情*/
export async function get_channelGradeStandard_get__id (d?: any) {
return await request.get<ChannelGradeStandardVO,ChannelGradeStandardVO>(basePath+'/channelGradeStandard/get/{id}', { params: d })
}
/**根据城市编码渠道等级查询*/
export async function post_channelGradeStandard_getAllByCityCodeAndChannelGrade (d?: any) {
return await request.post< ChannelGradeStandardVO[],ChannelGradeStandardVO[]> (basePath+'/channelGradeStandard/getAllByCityCodeAndChannelGrade', d)
}
/**查询渠道评级标准列表*/
export async function post_channelGradeStandard_getList (d?: any) {
return await request.post< PageModel<ChannelGradeStandardVO>,PageModel<ChannelGradeStandardVO>> (basePath+'/channelGradeStandard/getList', d)
}
/**查询渠道供应商管理办法附件列表*/
export async function get_channelGradeStandard_getSupplierManagementAttachments (d?: any) {
return await request.get<ChannelSupplierManagementAttachment[],ChannelSupplierManagementAttachment[]>(basePath+'/channelGradeStandard/getSupplierManagementAttachments', { params: d })
}
/**查看渠道评级标准所需材料*/
export async function get_channelGradeStandard_viewMaterials (d?: any) {
return await request.get<ChannelGradeStandardBaseVO,ChannelGradeStandardBaseVO>(basePath+'/channelGradeStandard/viewMaterials', { params: d })
}
/**邀请码作废*/
export async function post_channelInvitationCode_cancel (d?: any) {
return await request.post< number,number> (basePath+'/channelInvitationCode/cancel', d)
}
/**生成邀请码*/
export async function get_channelInvitationCode_create (d?: any) {
return await request.get<string,string>(basePath+'/channelInvitationCode/create', { params: d })
}
/**删除邀请码*/
export async function get_channelInvitationCode_delete__invitationCode (d?: any) {
return await request.get<number,number>(basePath+'/channelInvitationCode/delete/{invitationCode}', { params: d })
}
/**获取/下载邀请码二维码图片*/
export async function get_channelInvitationCode_download (d?: any) {
return await request.get<any,any>(basePath+'/channelInvitationCode/download', { params: d })
}
/**获取/下载邀请码二维码图片*/
export async function get_channelInvitationCode_getInvitationCodeImage (d?: any) {
return await request.get<any,any>(basePath+'/channelInvitationCode/getInvitationCodeImage', { params: d })
}
/**查询渠道邀请码列表*/
export async function post_channelInvitationCode_getList (d?: any) {
return await request.post< PageModel<ChannelInvitationCodeVO>,PageModel<ChannelInvitationCodeVO>> (basePath+'/channelInvitationCode/getList', d)
}
/**查询渠道处理列表*/
export async function get_channelRecord_getAll__channelId (d?: any) {
return await request.get<ChannelRecord[],ChannelRecord[]>(basePath+'/channelRecord/getAll/{channelId}', { params: d })
}
/**查询渠道变更处理列表*/
export async function get_channelRecordChange_getAll__channelId (d?: any) {
return await request.get<ChannelRecordChange[],ChannelRecordChange[]>(basePath+'/channelRecordChange/getAll/{channelId}', { params: d })
}
/**检查公司是否已经注册*/
export async function get_channelRegistUser_checkIsExists (d?: any) {
return await request.get<boolean,boolean>(basePath+'/channelRegistUser/checkIsExists', { params: d })
}
/**校验短信*/
export async function get_channelRegistUser_checkVerifyCode (d?: any) {
return await request.get<boolean,boolean>(basePath+'/channelRegistUser/checkVerifyCode', { params: d })
}
/**查询注册用户列表*/
export async function post_channelRegistUser_getList (d?: any) {
return await request.post< PageModel<ChannelRegistUserVO>,PageModel<ChannelRegistUserVO>> (basePath+'/channelRegistUser/getList', d)
}
/**渠道用户注册*/
export async function post_channelRegistUser_regist (d?: any) {
return await request.post< string,string> (basePath+'/channelRegistUser/regist', d)
}
/**发送短信*/
export async function get_channelRegistUser_sendMessage (d?: any) {
return await request.get<string,string>(basePath+'/channelRegistUser/sendMessage', { params: d })
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
/**(必填)id*/
id: number;
/**(必填)处理意见*/
remark: string;
/**(必填)审核操作(Revoke-撤回、Confirm-确认、Pass-通过、Reject-驳回)*/
result: string;
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
/**是否结佣(Has-有、No-无)*/
settlementFlag: string;
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
/**是否结佣(Has-有、No-无)*/
settlementFlag: string;
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
/**是否结佣(Has-有、No-无)*/
settlementFlag: string;
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
/**是否结佣(Has-有、No-无)*/
settlementFlag: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelApprovalAttachment*/
export interface ChannelApprovalAttachment {
/**渠道呈批ID*/
approvalId: number;
/**渠道商ID*/
channelId: number;
/**城市*/
city: string;
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
/**ChannelApprovalAttachmentBaseVO*/
export interface ChannelApprovalAttachmentBaseVO {
/**渠道呈批ID*/
approvalId: number;
/**渠道商ID*/
channelId: number;
/**城市*/
city: string;
/**文件ID*/
fileId: string;
/**类型*/
type: string;
}
/**ChannelApprovalBaseVO*/
export interface ChannelApprovalBaseVO {
/**呈批说明*/
approvalDesc: string;
/**呈批标题*/
approvalTitle: string;
/**附件信息*/
channelApprovalAttachments: ChannelApprovalAttachmentBaseVO[];
/**渠道等级信息*/
channelApprovalGrades: ChannelApprovalGradeBaseVO[];
/**事业部*/
departmentOrgId: number;
/**ID*/
id: number;
/**1保存2提交*/
operateType: number;
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
/**ChannelApprovalGradeBaseVO*/
export interface ChannelApprovalGradeBaseVO {
/**渠道等级ID*/
gradeId: number;
}
/**ChannelApprovalModifyVO*/
export interface ChannelApprovalModifyVO {
/**渠道id数组*/
ids: number[];
/**undefined*/
userId: number;
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
operator: number;
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
/**ChannelAttachmentChange*/
export interface ChannelAttachmentChange {
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
/**账号类型(Base-基本存款账户、Commonly-一般存款账户)*/
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
/**ChannelBankChange*/
export interface ChannelBankChange {
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
/**ChannelBankChangeBaseVO*/
export interface ChannelBankChangeBaseVO {
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
/**ChannelBankChangeVO*/
export interface ChannelBankChangeVO {
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
/**账号类型(Base-基本存款账户、Commonly-一般存款账户)*/
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
/**ID*/
id: number;
/**法人身份证号码*/
legalIdentityCode: string;
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
/**ChannelChangeBaseVO*/
export interface ChannelChangeBaseVO {
/**营业住所*/
address: string;
/**营业期限*/
businessTime: string;
/**注册资本*/
capital: string;
/**变更原因*/
changeReason: string;
/**附件信息*/
channelAttachmentChanges: ChannelAttachmentChange[];
/**渠道银行账号信息*/
channelBankChanges: ChannelBankChange[];
/**渠道负责人信息*/
channelPersonChanges: ChannelPersonChange[];
/**渠道所在城市*/
city: string;
/**渠道所在行政区*/
county: string;
/**统一社会信用代码*/
creditCode: string;
/**跟进人*/
followUserId: number;
/**法人身份证号码*/
legalIdentityCode: string;
/**法人代表*/
legalPerson: string;
/**公司名称*/
name: string;
/**原渠道ID*/
oldChannelId: number;
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
/**ChannelChangeDetail*/
export interface ChannelChangeDetail {
/**营业住所*/
address: string;
/**营业期限*/
businessTime: string;
/**注册资本*/
capital: string;
/**变更原因*/
changeReason: string;
/**变更时间*/
changeTime: string;
/**附件信息*/
channelAttachmentChanges: ChannelAttachmentChange[];
/**银行账户信息*/
channelBankChanges: ChannelBankChange[];
/**负责人信息*/
channelPersonChanges: ChannelPersonChange[];
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
/**法人身份证号码*/
legalIdentityCode: string;
/**法人代表*/
legalPerson: string;
/**公司名称*/
name: string;
/**原渠道ID*/
oldChannelId: number;
/**渠道所在省份*/
province: string;
/**备注*/
remark: string;
/**成立日期(yyyy-MM-dd)*/
setupTime: string;
/**简称*/
shortName: string;
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Changing-变更中)*/
status: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelChangeModifyVO*/
export interface ChannelChangeModifyVO {
/**渠道id数组*/
channelIds: number[];
/**undefined*/
userId: number;
}
/**ChannelChangeQueryVO*/
export interface ChannelChangeQueryVO {
/**城市*/
city: string;
/**行政区*/
county: string;
/**信用代码*/
creditCode: string;
/**跟进人*/
followUserId: number;
/**录入人*/
inputUser: number;
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
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Changing-变更中)*/
status: string;
}
/**ChannelChangeVO*/
export interface ChannelChangeVO {
/**营业住所*/
address: string;
/**营业期限*/
businessTime: string;
/**注册资本*/
capital: string;
/**变更原因*/
changeReason: string;
/**变更时间*/
changeTime: string;
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
/**法人身份证号码*/
legalIdentityCode: string;
/**法人代表*/
legalPerson: string;
/**公司名称*/
name: string;
/**原渠道ID*/
oldChannelId: number;
/**渠道所在省份*/
province: string;
/**备注*/
remark: string;
/**成立日期(yyyy-MM-dd)*/
setupTime: string;
/**简称*/
shortName: string;
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Changing-变更中)*/
status: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelCityLevel*/
export interface ChannelCityLevel {
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**编码*/
code: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
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
/**ChannelCityLevelQueryVO*/
export interface ChannelCityLevelQueryVO {
/**城市编码*/
cityCode: string;
/**城市等级*/
cityGrade: ChannelCityLevel;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**省份编码*/
proviceCode: string;
}
/**ChannelCityLevelUpdateVO*/
export interface ChannelCityLevelUpdateVO {
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**需要更新城市ids*/
ids: number[];
}
/**ChannelCityLevelVO*/
export interface ChannelCityLevelVO {
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**编码*/
code: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
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
/**法人身份证号码*/
legalIdentityCode: string;
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
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Changing-变更中)*/
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
/**ChannelGradeAttachmentChange*/
export interface ChannelGradeAttachmentChange {
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
/**ID*/
id: number;
/**1保存2提交*/
operateType: number;
/**业务开展省份*/
province: string;
/**是否特批入库(Yes-是、No-否)*/
special: string;
/**入库编号*/
storageNum: string;
}
/**ChannelGradeChangeBaseVO*/
export interface ChannelGradeChangeBaseVO {
/**变更原因*/
changeReason: string;
/**渠道等级*/
channelGrade: string;
/**附件信息*/
channelGradeAttachmentChanges: ChannelGradeAttachmentChange[];
/**渠道评级标准信息*/
channelGradeItemChanges: ChannelGradeItemChange[];
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
/**ID*/
id: number;
/**1保存2提交*/
operateType: number;
/**业务开展省份*/
province: string;
/**是否特批入库*/
special: number;
/**入库编号*/
storageNum: string;
}
/**ChannelGradeChangeModifyVO*/
export interface ChannelGradeChangeModifyVO {
/**等级id数组*/
ids: number[];
/**undefined*/
userId: number;
}
/**ChannelGradeChangeQueryVO*/
export interface ChannelGradeChangeQueryVO {
/**变更原因*/
changeReason: string;
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
/**状态(DRAFT-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、PASS-已审核、SubmittedForApproval-已发起呈批、Approved-已审批、Withdrawn-已撤回)*/
status: string;
/**入库编号*/
storageNum: string;
}
/**ChannelGradeChangeVO*/
export interface ChannelGradeChangeVO {
/**变更原因*/
changeReason: string;
/**变更时间*/
changeTime: string;
/**统一社会信用代码*/
channelGrade: string;
/**附件信息*/
channelGradeAttachmentChanges: ChannelGradeAttachmentChange[];
/**渠道评级标准信息*/
channelGradeItemChanges: ChannelGradeItemChange[];
/**公司名称*/
channelId: number;
/**渠道商名称*/
channelName: string;
/**渠道类型(Platform-平台)*/
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
/**原渠道等级ID*/
oldGradeId: number;
/**营业住所*/
province: string;
/**是否特批入库*/
special: number;
/**状态(DRAFT-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、PASS-已审核、SubmittedForApproval-已发起呈批、Approved-已审批、Withdrawn-已撤回)*/
status: string;
/**入库编号*/
storageNum: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
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
/**ChannelGradeItemChange*/
export interface ChannelGradeItemChange {
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
/**文件ID*/
inputValue: string;
/**类型*/
standardId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeItemVO*/
export interface ChannelGradeItemVO {
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**渠道ID*/
gradeId: number;
/**评级项*/
gradeItem: string;
/**评级标准*/
gradeStandard: string;
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
/**ChannelGradeModifyVO*/
export interface ChannelGradeModifyVO {
/**等级id数组*/
ids: number[];
/**undefined*/
userId: number;
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
/**是否特批入库(Yes-是、No-否)*/
special: string;
/**状态(DRAFT-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、PASS-已审核、SubmittedForApproval-已发起呈批、Approved-已审批、Withdrawn-已撤回)*/
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
/**渠道等级ID*/
gradeId: number;
/**ID*/
id: number;
/**处理时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作*/
operation: string;
/**处理人*/
operator: number;
/**处理意见*/
remark: string;
/**结果(Revoke-撤回、Confirm-确认、Pass-通过、Reject-驳回)*/
result: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeRecordChange*/
export interface ChannelGradeRecordChange {
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
operator: number;
/**处理意见*/
remark: string;
/**结果(Revoke-撤回、Confirm-确认、Pass-通过、Reject-驳回)*/
result: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeStandardAttachment*/
export interface ChannelGradeStandardAttachment {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**类型*/
materialType: string;
/**渠道ID*/
standardId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelGradeStandardBaseVO*/
export interface ChannelGradeStandardBaseVO {
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
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
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**ChannelGradeStandardSearchVO*/
export interface ChannelGradeStandardSearchVO {
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**城市编码*/
cityCode: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**ChannelGradeStandardVO*/
export interface ChannelGradeStandardVO {
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**所需材料*/
channelGradeStandardAttachments: ChannelGradeStandardAttachment[];
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
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
/**附件信息*/
channelGradeAttachments: ChannelGradeAttachment[];
/**渠道评级标准信息*/
channelGradeItems: ChannelGradeItemVO[];
/**渠道ID*/
channelId: number;
/**渠道商名称*/
channelName: string;
/**渠道类型(Platform-平台)*/
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
/**是否特批入库(Yes-是、No-否)*/
special: string;
/**状态(DRAFT-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、PASS-已审核、SubmittedForApproval-已发起呈批、Approved-已审批、Withdrawn-已撤回)*/
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
/**失效时间开始(yyyy-MM-dd)*/
expiresTimeBegin: string;
/**失效时间结束(yyyy-MM-dd)*/
expiresTimeEnd: string;
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
/**ChannelModifyVO*/
export interface ChannelModifyVO {
/**营业住所*/
address: string;
/**营业期限*/
businessTime: string;
/**注册资本*/
capital: string;
/**渠道id数组*/
channelIds: number[];
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
/**法人身份证号码*/
legalIdentityCode: string;
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
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Changing-变更中)*/
status: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**undefined*/
userId: number;
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
/**ChannelPersonChange*/
export interface ChannelPersonChange {
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
/**录入人*/
inputUser: number;
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
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Changing-变更中)*/
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
operator: number;
/**处理意见*/
remark: string;
/**结果(Revoke-撤回、Confirm-确认、Pass-通过、Reject-驳回)*/
result: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ChannelRecordChange*/
export interface ChannelRecordChange {
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
operator: number;
/**处理意见*/
remark: string;
/**结果(Revoke-撤回、Confirm-确认、Pass-通过、Reject-驳回)*/
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
/**渠道商ID*/
channelId: number;
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
/**渠道商ID*/
channelId: number;
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
/**法人身份证号码*/
legalIdentityCode: string;
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
/**状态(DRAFT-草稿、ToBeConfirmed-待确认、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、ZBYGSH-待总部业管审核、Audited-已审核、Changing-变更中)*/
status: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
