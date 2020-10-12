/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-9-29 11:38:52
import { request } from '@/api/base'
/**查询所有行政区划信息*/
export async function get_area_getAll (d?: any) {
return await request.get<AreaBaseVO[],AreaBaseVO[]>('/system/area/getAll', { params: d })
}
/**根据行政区划编码查询所有下级行政区划信息*/
export async function get_area_getAllChildArea__code (d?: any) {
return await request.get<AreaBaseVO[],AreaBaseVO[]>('/system/area/getAllChildArea/{code}', { params: d })
}
/**查询所有省份信息*/
export async function get_area_getAllProvince (d?: any) {
return await request.get<AreaBaseVO[],AreaBaseVO[]>('/system/area/getAllProvince', { params: d })
}
/**查询所有字典项*/
export async function get_dict_getAll (d?: any) {
return await request.get<any,any>('/system/dict/getAll', { params: d })
}
/**查询指定类型的所有字典项*/
export async function post_dict_getAllByType__type (d?: any) {
return await request.post< DictBaseVO[],DictBaseVO[]> ('/system/dict/getAllByType/{type}', d)
}
/**根据类型和编码查询字典项*/
export async function post_dict_getByTypeAndCode (d?: any) {
return await request.post< DictBaseVO,DictBaseVO> ('/system/dict/getByTypeAndCode', d)
}
/**save*/
export async function post_fileResource_add (d?: any) {
return await request.post< any,any> ('/system/fileResource/add', d)
}
/**batchadd*/
export async function post_fileResource_batchadd (d?: any) {
return await request.post< any,any> ('/system/fileResource/batchadd', d)
}
/**save*/
export async function post_fileResource_update (d?: any) {
return await request.post< any,any> ('/system/fileResource/update', d)
}
/**添加岗位*/
export async function post_job_add (d?: any) {
return await request.post< number,number> ('/system/job/add', d)
}
/**批量添加岗位角色权限*/
export async function post_job_addJobRoleBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/job/addJobRoleBatch', d)
}
/**删除岗位*/
export async function post_job_delete__id (d?: any) {
return await request.post< number,number> ('/system/job/delete/{id}', d)
}
/**查询岗位详情*/
export async function get_job_get__id (d?: any) {
return await request.get<JobVO,JobVO>('/system/job/get/{id}', { params: d })
}
/**查询所有岗位*/
export async function post_job_getAll (d?: any) {
return await request.post< JobVO[],JobVO[]> ('/system/job/getAll', d)
}
/**查询岗位列表*/
export async function post_job_getList (d?: any) {
return await request.post< PageModel<JobVO>,PageModel<JobVO>> ('/system/job/getList', d)
}
/**查询拥有指定资源的岗位列表*/
export async function post_job_getListByResourceId (d?: any) {
return await request.post< PageModel<JobVO>,PageModel<JobVO>> ('/system/job/getListByResourceId', d)
}
/**查询拥有指定角色的岗位列表*/
export async function post_job_getListByRoleId (d?: any) {
return await request.post< PageModel<JobVO>,PageModel<JobVO>> ('/system/job/getListByRoleId', d)
}
/**修改岗位*/
export async function post_job_update (d?: any) {
return await request.post< number,number> ('/system/job/update', d)
}
/**添加组织*/
export async function post_org_add (d?: any) {
return await request.post< number,number> ('/system/org/add', d)
}
/**删除组织*/
export async function post_org_delete__id (d?: any) {
return await request.post< number,number> ('/system/org/delete/{id}', d)
}
/**查询组织详情*/
export async function get_org_get__id (d?: any) {
return await request.get<OrgVO,OrgVO>('/system/org/get/{id}', { params: d })
}
/**查询所有组织*/
export async function get_org_getAll (d?: any) {
return await request.get<OrgVO[],OrgVO[]>('/system/org/getAll', { params: d })
}
/**查询组织列表*/
export async function post_org_getList (d?: any) {
return await request.post< PageModel<OrgVO>,PageModel<OrgVO>> ('/system/org/getList', d)
}
/**修改组织*/
export async function post_org_update (d?: any) {
return await request.post< number,number> ('/system/org/update', d)
}
/**批量添加资源*/
export async function post_resource_addBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/resource/addBatch', d)
}
/**批量将资源分配给角色*/
export async function post_resource_addResourceToRoleBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/resource/addResourceToRoleBatch', d)
}
/**删除资源*/
export async function post_resource_delete__id (d?: any) {
return await request.post< number,number> ('/system/resource/delete/{id}', d)
}
/**查询资源详情*/
export async function get_resource_get__id (d?: any) {
return await request.get<ResourceVO,ResourceVO>('/system/resource/get/{id}', { params: d })
}
/**查询所有资源*/
export async function get_resource_getAll (d?: any) {
return await request.get<ResourceMinVO[],ResourceMinVO[]>('/system/resource/getAll', { params: d })
}
/**查询角色拥有的资源*/
export async function post_resource_getAllByRoleId (d?: any) {
return await request.post< ResourceMinVO[],ResourceMinVO[]> ('/system/resource/getAllByRoleId', d)
}
/**查询用户拥有的资源*/
export async function post_resource_getAllByUserId (d?: any) {
return await request.post< ResourceMinVO[],ResourceMinVO[]> ('/system/resource/getAllByUserId', d)
}
/**查询资源列表*/
export async function post_resource_getList (d?: any) {
return await request.post< PageModel<ResourceVO>,PageModel<ResourceVO>> ('/system/resource/getList', d)
}
/**修改资源*/
export async function post_resource_update (d?: any) {
return await request.post< number,number> ('/system/resource/update', d)
}
/**添加角色*/
export async function post_role_add (d?: any) {
return await request.post< number,number> ('/system/role/add', d)
}
/**批量添加角色资源权限*/
export async function post_role_addRoleResourceBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/role/addRoleResourceBatch', d)
}
/**将角色批量分配给岗位*/
export async function post_role_addRoleToJobBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/role/addRoleToJobBatch', d)
}
/**将角色批量分配给用户*/
export async function post_role_addRoleToUserBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/role/addRoleToUserBatch', d)
}
/**删除角色*/
export async function post_role_delete__id (d?: any) {
return await request.post< number,number> ('/system/role/delete/{id}', d)
}
/**查询角色详情*/
export async function get_role_get__id (d?: any) {
return await request.get<RoleVO,RoleVO>('/system/role/get/{id}', { params: d })
}
/**查询所有角色*/
export async function get_role_getAll (d?: any) {
return await request.get<Role[],Role[]>('/system/role/getAll', { params: d })
}
/**查询指定岗位拥有的所有角色*/
export async function post_role_getAllByJobId__jobId (d?: any) {
return await request.post< RoleVO[],RoleVO[]> ('/system/role/getAllByJobId/{jobId}', d)
}
/**查询指定用户拥有的所有角色*/
export async function post_role_getAllByUserId__userId (d?: any) {
return await request.post< RoleVO[],RoleVO[]> ('/system/role/getAllByUserId/{userId}', d)
}
/**查询角色列表*/
export async function post_role_getList (d?: any) {
return await request.post< PageModel<RoleVO>,PageModel<RoleVO>> ('/system/role/getList', d)
}
/**查询拥有指定资源的角色列表*/
export async function post_role_getListByResourceId (d?: any) {
return await request.post< PageModel<RoleVO>,PageModel<RoleVO>> ('/system/role/getListByResourceId', d)
}
/**修改角色*/
export async function post_role_update (d?: any) {
return await request.post< number,number> ('/system/role/update', d)
}
/**findAll*/
export async function get_scheJobGroup_findAll (d?: any) {
return await request.get<any,any>('/system/scheJobGroup/findAll', { params: d })
}
/**findByAddressType*/
export async function get_scheJobGroup_findByAddressType (d?: any) {
return await request.get<any,any>('/system/scheJobGroup/findByAddressType', { params: d })
}
/**load*/
export async function get_scheJobGroup_load (d?: any) {
return await request.get<ScheJobGroupVO,ScheJobGroupVO>('/system/scheJobGroup/load', { params: d })
}
/**pageList*/
export async function get_scheJobGroup_pageList (d?: any) {
return await request.get<any,any>('/system/scheJobGroup/pageList', { params: d })
}
/**pageListCount*/
export async function get_scheJobGroup_pageListCount (d?: any) {
return await request.get<any,any>('/system/scheJobGroup/pageListCount', { params: d })
}
/**remove*/
export async function get_scheJobGroup_remove (d?: any) {
return await request.get<any,any>('/system/scheJobGroup/remove', { params: d })
}
/**save*/
export async function put_scheJobGroup_save (d?: any) {
return await request.post< any,any> ('/system/scheJobGroup/save', d)
}
/**update*/
export async function put_scheJobGroup_update (d?: any) {
return await request.post< any,any> ('/system/scheJobGroup/update', d)
}
/**scheduleUpdate*/
export async function post_scheJobInfo (d?: any) {
return await request.post< any,any> ('/system/scheJobInfo', d)
}
/**delete*/
export async function delete_scheJobInfo_delete (d?: any) {
return await request.post< any,any> ('/system/scheJobInfo/delete', d)
}
/**findAllCount*/
export async function get_scheJobInfo_findAllCount (d?: any) {
return await request.get<any,any>('/system/scheJobInfo/findAllCount', { params: d })
}
/**getJobsByGroup*/
export async function get_scheJobInfo_getJobsByGroup (d?: any) {
return await request.get<any,any>('/system/scheJobInfo/getJobsByGroup', { params: d })
}
/**loadById*/
export async function get_scheJobInfo_loadById (d?: any) {
return await request.get<ScheJobInfoVO,ScheJobInfoVO>('/system/scheJobInfo/loadById', { params: d })
}
/**pageList*/
export async function get_scheJobInfo_pageList (d?: any) {
return await request.get<any,any>('/system/scheJobInfo/pageList', { params: d })
}
/**pageListCount*/
export async function get_scheJobInfo_pageListCount (d?: any) {
return await request.get<any,any>('/system/scheJobInfo/pageListCount', { params: d })
}
/**save*/
export async function put_scheJobInfo_save (d?: any) {
return await request.post< any,any> ('/system/scheJobInfo/save', d)
}
/**scheduleJobQuery*/
export async function get_scheJobInfo_scheduleJobQuery (d?: any) {
return await request.get<any,any>('/system/scheJobInfo/scheduleJobQuery', { params: d })
}
/**update*/
export async function put_scheJobInfo_update (d?: any) {
return await request.post< any,any> ('/system/scheJobInfo/update', d)
}
/**clearLog*/
export async function get_scheJobLog_clearLog (d?: any) {
return await request.get<any,any>('/system/scheJobLog/clearLog', { params: d })
}
/**delete*/
export async function get_scheJobLog_delete (d?: any) {
return await request.get<any,any>('/system/scheJobLog/delete', { params: d })
}
/**findClearLogIds*/
export async function get_scheJobLog_findClearLogIds (d?: any) {
return await request.get<any,any>('/system/scheJobLog/findClearLogIds', { params: d })
}
/**findFailJobLogIds*/
export async function get_scheJobLog_findFailJobLogIds (d?: any) {
return await request.get<any,any>('/system/scheJobLog/findFailJobLogIds', { params: d })
}
/**findLogReport*/
export async function get_scheJobLog_findLogReport (d?: any) {
return await request.get<any,any>('/system/scheJobLog/findLogReport', { params: d })
}
/**findLostJobIds*/
export async function get_scheJobLog_findLostJobIds (d?: any) {
return await request.get<any,any>('/system/scheJobLog/findLostJobIds', { params: d })
}
/**load*/
export async function get_scheJobLog_load (d?: any) {
return await request.get<ScheJobLogVO,ScheJobLogVO>('/system/scheJobLog/load', { params: d })
}
/**pageList*/
export async function get_scheJobLog_pageList (d?: any) {
return await request.get<any,any>('/system/scheJobLog/pageList', { params: d })
}
/**pageListCount*/
export async function get_scheJobLog_pageListCount (d?: any) {
return await request.get<any,any>('/system/scheJobLog/pageListCount', { params: d })
}
/**save*/
export async function put_scheJobLog_save (d?: any) {
return await request.post< any,any> ('/system/scheJobLog/save', d)
}
/**updateAlarmStatus*/
export async function get_scheJobLog_updateAlarmStatus (d?: any) {
return await request.get<any,any>('/system/scheJobLog/updateAlarmStatus', { params: d })
}
/**updateHandleInfo*/
export async function put_scheJobLog_updateHandleInfo (d?: any) {
return await request.post< any,any> ('/system/scheJobLog/updateHandleInfo', d)
}
/**updateTriggerInfo*/
export async function put_scheJobLog_updateTriggerInfo (d?: any) {
return await request.post< any,any> ('/system/scheJobLog/updateTriggerInfo', d)
}
/**deleteByJobId*/
export async function delete_scheJobLogGlue_deleteByJobId (d?: any) {
return await request.post< any,any> ('/system/scheJobLogGlue/deleteByJobId', d)
}
/**findByJobId*/
export async function get_scheJobLogGlue_findByJobId (d?: any) {
return await request.get<any,any>('/system/scheJobLogGlue/findByJobId', { params: d })
}
/**removeOld*/
export async function delete_scheJobLogGlue_removeOld (d?: any) {
return await request.post< any,any> ('/system/scheJobLogGlue/removeOld', d)
}
/**save*/
export async function put_scheJobLogGlue_save (d?: any) {
return await request.post< any,any> ('/system/scheJobLogGlue/save', d)
}
/**queryLogReport*/
export async function get_scheJobLogReport_queryLogReport (d?: any) {
return await request.get<any,any>('/system/scheJobLogReport/queryLogReport', { params: d })
}
/**queryLogReportTotal*/
export async function get_scheJobLogReport_queryLogReportTotal (d?: any) {
return await request.get<ScheJobLogReportVO,ScheJobLogReportVO>('/system/scheJobLogReport/queryLogReportTotal', { params: d })
}
/**save*/
export async function put_scheJobLogReport_save (d?: any) {
return await request.post< any,any> ('/system/scheJobLogReport/save', d)
}
/**update*/
export async function put_scheJobLogReport_update (d?: any) {
return await request.post< any,any> ('/system/scheJobLogReport/update', d)
}
/**findAll*/
export async function get_scheJobRegistry_findAll (d?: any) {
return await request.get<any,any>('/system/scheJobRegistry/findAll', { params: d })
}
/**findDead*/
export async function get_scheJobRegistry_findDead (d?: any) {
return await request.get<any,any>('/system/scheJobRegistry/findDead', { params: d })
}
/**registryDelete*/
export async function get_scheJobRegistry_registryDelete (d?: any) {
return await request.get<any,any>('/system/scheJobRegistry/registryDelete', { params: d })
}
/**registrySave*/
export async function get_scheJobRegistry_registrySave (d?: any) {
return await request.get<any,any>('/system/scheJobRegistry/registrySave', { params: d })
}
/**registryUpdate*/
export async function get_scheJobRegistry_registryUpdate (d?: any) {
return await request.get<any,any>('/system/scheJobRegistry/registryUpdate', { params: d })
}
/**removeDead*/
export async function get_scheJobRegistry_removeDead (d?: any) {
return await request.get<any,any>('/system/scheJobRegistry/removeDead', { params: d })
}
/**delete*/
export async function delete_scheJobUser_delete (d?: any) {
return await request.post< any,any> ('/system/scheJobUser/delete', d)
}
/**loadByUserName*/
export async function get_scheJobUser_loadByUserName (d?: any) {
return await request.get<ScheJobUserVO,ScheJobUserVO>('/system/scheJobUser/loadByUserName', { params: d })
}
/**pageList*/
export async function get_scheJobUser_pageList (d?: any) {
return await request.get<any,any>('/system/scheJobUser/pageList', { params: d })
}
/**pageListCount*/
export async function get_scheJobUser_pageListCount (d?: any) {
return await request.get<any,any>('/system/scheJobUser/pageListCount', { params: d })
}
/**save*/
export async function put_scheJobUser_save (d?: any) {
return await request.post< any,any> ('/system/scheJobUser/save', d)
}
/**update*/
export async function put_scheJobUser_update (d?: any) {
return await request.post< any,any> ('/system/scheJobUser/update', d)
}
/**查询登录用户信息*/
export async function post_sessionUser_getUserInfo (d?: any) {
return await request.post< LoginUserVO,LoginUserVO> ('/system/sessionUser/getUserInfo', d)
}
/**save*/
export async function post_smsSend_add (d?: any) {
return await request.post< any,any> ('/system/smsSend/add', d)
}
/**save*/
export async function get_smsTemplate_getByCode (d?: any) {
return await request.get<SmsTemplateVO,SmsTemplateVO>('/system/smsTemplate/getByCode', { params: d })
}
/**激活用户*/
export async function post_user_activate__id (d?: any) {
return await request.post< boolean,boolean> ('/system/user/activate/{id}', d)
}
/**添加用户*/
export async function post_user_add (d?: any) {
return await request.post< string,string> ('/system/user/add', d)
}
/**批量添加用户岗位及角色*/
export async function post_user_addJobAndRoleBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/user/addJobAndRoleBatch', d)
}
/**批量添加用户组织权限*/
export async function post_user_addUserOrgBatch (d?: any) {
return await request.post< boolean,boolean> ('/system/user/addUserOrgBatch', d)
}
/**复制用户岗位角色及组织权限*/
export async function post_user_copyJobAndRole (d?: any) {
return await request.post< boolean,boolean> ('/system/user/copyJobAndRole', d)
}
/**删除用户*/
export async function post_user_delete__id (d?: any) {
return await request.post< number,number> ('/system/user/delete/{id}', d)
}
/**查询用户详情*/
export async function get_user_get__id (d?: any) {
return await request.get<UserVO,UserVO>('/system/user/get/{id}', { params: d })
}
/**查询指定用户拥有的所有组织权限*/
export async function post_user_getAllUserOrgByUserId__userId (d?: any) {
return await request.post< OrgMinVO[],OrgMinVO[]> ('/system/user/getAllUserOrgByUserId/{userId}', d)
}
/**查询用户列表*/
export async function post_user_getList (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> ('/system/user/getList', d)
}
/**查询拥有指定岗位的用户列表*/
export async function post_user_getListByJobId (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> ('/system/user/getListByJobId', d)
}
/**查询拥有指定资源的用户列表*/
export async function post_user_getListByResourceId (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> ('/system/user/getListByResourceId', d)
}
/**查询拥有指定角色的用户列表*/
export async function post_user_getListByRoleId (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> ('/system/user/getListByRoleId', d)
}
/**锁定用户*/
export async function post_user_lock__id (d?: any) {
return await request.post< boolean,boolean> ('/system/user/lock/{id}', d)
}
/**重置密码*/
export async function post_user_resetPassword__id (d?: any) {
return await request.post< string,string> ('/system/user/resetPassword/{id}', d)
}
/**修改用户*/
export async function post_user_update (d?: any) {
return await request.post< number,number> ('/system/user/update', d)
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
/**AreaBaseVO*/
export interface AreaBaseVO {
/**拼音简称*/
abbr: string;
/**编码*/
code: string;
/**层级*/
level: number;
/**名称*/
name: string;
/**父编码*/
parentCode: string;
}
/**DictBaseVO*/
export interface DictBaseVO {
/**编码*/
code: string;
/**名称*/
name: string;
/**顺序*/
seq: number;
/**子类别*/
subType: string;
/**标签*/
tag: string;
/**类别*/
type: string;
/**是否有效*/
valid: number;
}
/**DictTypeCodeQueryVO*/
export interface DictTypeCodeQueryVO {
/**(必填)编码*/
code: string;
/**(必填)类型*/
type: string;
/**是否有效*/
valid: number;
}
/**DictTypeQueryVO*/
export interface DictTypeQueryVO {
/**(必填)类型*/
type: string;
/**是否有效*/
valid: number;
}
/**FileResourceUpdateVo*/
export interface FileResourceUpdateVo {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
fileId: number;
/**文件资源ID*/
fileSourceId: number;
/**生成文件名*/
generateFileName: string;
/**生成文件类型*/
generateFileType: string;
/**生成文件地址*/
generateFileUrl: string;
/**原文件名*/
originalFileName: string;
/**原文件类型*/
originalFileType: string;
/**原文件地址*/
originalFileUrl: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**FileResourceVo*/
export interface FileResourceVo {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
fileId: number;
/**生成文件名*/
generateFileName: string;
/**生成文件类型*/
generateFileType: string;
/**生成文件地址*/
generateFileUrl: string;
/**原文件名*/
originalFileName: string;
/**原文件类型*/
originalFileType: string;
/**原文件地址*/
originalFileUrl: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**JobBaseVO*/
export interface JobBaseVO {
/**(必填)编码*/
code: string;
/**(必填)名称*/
name: string;
/**(必填)备注*/
remark: string;
}
/**JobQueryVO*/
export interface JobQueryVO {
/**key*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**JobResourceQueryVO*/
export interface JobResourceQueryVO {
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**(必填)资源id*/
resourceId: number;
}
/**JobRoleQueryVO*/
export interface JobRoleQueryVO {
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**(必填)角色id*/
roleId: number;
}
/**JobRoleVO*/
export interface JobRoleVO {
/**undefined*/
jobId: number;
/**角色id数组*/
roleIds: number[];
}
/**JobUpdateVO*/
export interface JobUpdateVO {
/**(必填)编码*/
code: string;
/**(必填)id*/
id: number;
/**(必填)名称*/
name: string;
/**(必填)备注*/
remark: string;
}
/**JobVO*/
export interface JobVO {
/**编码*/
code: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户姓名*/
createUserName: string;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**岗位角色信息*/
jobRoles: string;
/**名称*/
name: string;
/**备注*/
remark: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
}
/**LoginUserVO*/
export interface LoginUserVO {
/**登录账号*/
account: string;
/**用户类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣)*/
accountType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘)*/
employeeType: string;
/**入职日期(yyyy-MM-dd)*/
employmentDate: string;
/**id*/
id: number;
/**离职日期(yyyy-MM-dd)*/
leaveDate: string;
/**手机号码*/
mobilePhone: string;
/**姓名*/
name: string;
/**用户归属组织*/
org: Org;
/**归属组织id*/
orgId: number;
/**密码*/
password: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
workType: string;
/**菜单列表*/
menuList: Resource[];
/**用户权限组织列表*/
permissionOrgList: OrgMinVO[];
/**资源列表*/
resourceList: Resource[];
}
/**Org*/
export interface Org {
/**关闭日期(yyyy-MM-dd)*/
closeDate: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**部门分类(Business-营业线、Function-职能线)*/
departmentType: string;
/**id*/
id: number;
/**组织层级*/
level: number;
/**名称*/
name: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**组织代码*/
orgCode: string;
/**组织类型(Company-公司、Department-部门、Root-组织根节点)*/
orgType: string;
/**父组织id*/
parentId: number;
/**简称*/
shortName: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**OrgBaseVO*/
export interface OrgBaseVO {
/**关闭日期(yyyy-MM-dd)*/
closeDate: string;
/**部门分类(Business-营业线、Function-职能线)*/
departmentType: string;
/**名称*/
name: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**组织代码*/
orgCode: string;
/**组织类型(Company-公司、Department-部门、Root-组织根节点)*/
orgType: string;
/**父组织id*/
parentId: number;
/**简称*/
shortName: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
}
/**OrgMinVO*/
export interface OrgMinVO {
/**id*/
id: number;
/**是否为末级节点*/
lastNodeFlag: boolean;
/**组织层级*/
level: number;
/**名称*/
name: string;
/**父组织id*/
parentId: number;
/**是否具有权限*/
permissionFlag: boolean;
}
/**OrgQueryVO*/
export interface OrgQueryVO {
/**部门分类(Business-营业线、Function-职能线)*/
departmentType: string;
/**组织层级*/
level: number;
/**名称*/
name: string;
/**组织类型(Company-公司、Department-部门、Root-组织根节点)*/
orgType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**父组织id*/
parentId: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
}
/**OrgUpdateVO*/
export interface OrgUpdateVO {
/**关闭日期(yyyy-MM-dd)*/
closeDate: string;
/**部门分类(Business-营业线、Function-职能线)*/
departmentType: string;
/**(必填)id*/
id: number;
/**名称*/
name: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**组织代码*/
orgCode: string;
/**组织类型(Company-公司、Department-部门、Root-组织根节点)*/
orgType: string;
/**父组织id*/
parentId: number;
/**简称*/
shortName: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
}
/**OrgVO*/
export interface OrgVO {
/**关闭日期(yyyy-MM-dd)*/
closeDate: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户姓名*/
createUserName: string;
/**已删除*/
deleted: number;
/**部门分类(Business-营业线、Function-职能线)*/
departmentType: string;
/**id*/
id: number;
/**组织层级*/
level: number;
/**名称*/
name: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**组织代码*/
orgCode: string;
/**组织类型(Company-公司、Department-部门、Root-组织根节点)*/
orgType: string;
/**父组织id*/
parentId: number;
/**简称*/
shortName: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
}
/**Resource*/
export interface Resource {
/**编码*/
code: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**名称*/
name: string;
/**父资源id*/
parentId: number;
/**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**url*/
url: string;
}
/**ResourceBaseVO*/
export interface ResourceBaseVO {
/**(必填)编码*/
code: string;
/**(必填)名称*/
name: string;
/**(必填)父资源id*/
parentId: number;
/**(必填)类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**url*/
url: string;
}
/**ResourceMinVO*/
export interface ResourceMinVO {
/**编码*/
code: string;
/**id*/
id: number;
/**名称*/
name: string;
/**父资源id*/
parentId: number;
/**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
}
/**ResourceQueryVO*/
export interface ResourceQueryVO {
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**父资源id*/
parentId: number;
/**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
}
/**ResourceRoleQueryVO*/
export interface ResourceRoleQueryVO {
/**关键字*/
key: string;
/**(必填)角色id*/
roleId: number;
}
/**ResourceRoleVO*/
export interface ResourceRoleVO {
/**(必填)资源id*/
resourceId: number;
/**(必填)角色id数组*/
roleIds: number[];
}
/**ResourceUpdateVO*/
export interface ResourceUpdateVO {
/**(必填)编码*/
code: string;
/**(必填)id*/
id: number;
/**(必填)名称*/
name: string;
/**(必填)父资源id*/
parentId: number;
/**(必填)类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**url*/
url: string;
}
/**ResourceUserQueryVO*/
export interface ResourceUserQueryVO {
/**关键字*/
key: string;
/**(必填)用户id*/
userId: number;
}
/**ResourceVO*/
export interface ResourceVO {
/**编码*/
code: string;
/**编码后缀*/
codeSuffix: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户姓名*/
createUserName: string;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**名称*/
name: string;
/**父资源编码*/
parentCode: string;
/**父资源id*/
parentId: number;
/**父资源名称*/
parentName: string;
/**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
/**url*/
url: string;
}
/**Role*/
export interface Role {
/**编码*/
code: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**名称*/
name: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RoleBaseVO*/
export interface RoleBaseVO {
/**(必填)编码*/
code: string;
/**(必填)名称*/
name: string;
}
/**RoleJobVO*/
export interface RoleJobVO {
/**(必填)岗位id数组*/
jobIds: number[];
/**(必填)角色id*/
roleId: number;
}
/**RoleQueryVO*/
export interface RoleQueryVO {
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**RoleResourceQueryVO*/
export interface RoleResourceQueryVO {
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**(必填)资源id*/
resourceId: number;
}
/**RoleResourceVO*/
export interface RoleResourceVO {
/**(必填)资源id数组*/
resourceIds: number[];
/**(必填)角色id*/
roleId: number;
}
/**RoleUpdateVO*/
export interface RoleUpdateVO {
/**(必填)编码*/
code: string;
/**(必填)id*/
id: number;
/**(必填)名称*/
name: string;
}
/**RoleUserVO*/
export interface RoleUserVO {
/**(必填)角色id*/
roleId: number;
/**(必填)用户id数组*/
userIds: number[];
}
/**RoleVO*/
export interface RoleVO {
/**编码*/
code: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户姓名*/
createUserName: string;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**名称*/
name: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
}
/**ScheJobGroupVO*/
export interface ScheJobGroupVO {
/**undefined*/
addressList: string;
/**undefined*/
addressType: number;
/**undefined*/
appName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
id: number;
/**undefined*/
title: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ScheJobInfoVO*/
export interface ScheJobInfoVO {
/**undefined*/
addTime: string;
/**undefined*/
alarmEmail: string;
/**undefined*/
author: string;
/**undefined*/
childJobId: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
executorBlockStrategy: string;
/**undefined*/
executorFailRetryCount: number;
/**undefined*/
executorHandler: string;
/**undefined*/
executorParam: string;
/**undefined*/
executorRouteStrategy: string;
/**undefined*/
executorTimeout: number;
/**undefined*/
glueRemark: string;
/**undefined*/
glueSource: string;
/**undefined*/
glueType: string;
/**undefined*/
glueUpdatetime: string;
/**undefined*/
id: number;
/**undefined*/
jobCron: string;
/**undefined*/
jobDesc: string;
/**undefined*/
jobGroup: number;
/**undefined*/
triggerLastTime: number;
/**undefined*/
triggerNextTime: number;
/**undefined*/
triggerStatus: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ScheJobLogReportVO*/
export interface ScheJobLogReportVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
failCount: number;
/**undefined*/
id: number;
/**undefined*/
runningCount: number;
/**undefined*/
sucCount: number;
/**undefined*/
triggerDay: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ScheJobLogVO*/
export interface ScheJobLogVO {
/**undefined*/
alarmStatus: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
executorAddress: string;
/**undefined*/
executorFailRetryCount: number;
/**undefined*/
executorHandler: string;
/**undefined*/
executorParam: string;
/**undefined*/
executorShardingParam: string;
/**undefined*/
handleCode: number;
/**undefined*/
handleMsg: string;
/**undefined*/
handleTime: string;
/**undefined*/
id: number;
/**undefined*/
jobGroup: number;
/**undefined*/
jobId: number;
/**undefined*/
triggerCode: number;
/**undefined*/
triggerMsg: string;
/**undefined*/
triggerTime: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ScheJobLogglueVO*/
export interface ScheJobLogglueVO {
/**undefined*/
addTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
glueRemark: string;
/**undefined*/
glueSource: string;
/**undefined*/
glueType: string;
/**undefined*/
id: number;
/**undefined*/
jobId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ScheJobRegistryVO*/
export interface ScheJobRegistryVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
id: number;
/**undefined*/
registryGroup: string;
/**undefined*/
registryKey: string;
/**undefined*/
registryValue: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ScheJobUserVO*/
export interface ScheJobUserVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**undefined*/
id: number;
/**undefined*/
password: string;
/**undefined*/
permission: string;
/**undefined*/
role: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**undefined*/
username: string;
}
/**SmsSendAddVO*/
export interface SmsSendAddVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**发送参数*/
smsSendData: string;
/**发送记录ID*/
smsSendId: number;
/**发送结果*/
smsSendResult: string;
/**发送类型 websocket、tx*/
smsSendType: string;
/**发送状态 (0:失败 1:成功)*/
smsState: number;
/**模板ID*/
smsTemplateId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**SmsTemplateVO*/
export interface SmsTemplateVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**模板代码*/
templateCode: string;
/**模板内容*/
templateContent: string;
/**模板ID*/
templateId: number;
/**undefined*/
tid: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**UserBaseVO*/
export interface UserBaseVO {
/**登录账号*/
account: string;
/**用户类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣)*/
accountType: string;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘)*/
employeeType: string;
/**入职日期(yyyy-MM-dd)*/
employmentDate: string;
/**离职日期(yyyy-MM-dd)*/
leaveDate: string;
/**手机号码*/
mobilePhone: string;
/**姓名*/
name: string;
/**归属组织id*/
orgId: number;
/**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
workType: string;
}
/**UserCopyVO*/
export interface UserCopyVO {
/**(必填)是否复制岗位角色*/
copyJobAndRole: boolean;
/**(必填)是否复制组织权限*/
copyOrg: boolean;
/**(必填)目标用户id*/
targetUserId: number;
/**(必填)要复制的用户id列表*/
userIds: number[];
}
/**UserJobQueryVO*/
export interface UserJobQueryVO {
/**(必填)岗位id*/
jobId: number;
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**UserJobRoleVO*/
export interface UserJobRoleVO {
/**(必填)用户id*/
id: number;
/**(必填)岗位id*/
jobId: number;
/**(必填)角色id数组*/
roleIds: number[];
}
/**UserOrgVO*/
export interface UserOrgVO {
/**(必填)用户id*/
id: number;
/**(必填)组织id数组*/
orgIds: number[];
}
/**UserQueryVO*/
export interface UserQueryVO {
/**登录账号*/
account: string;
/**用户类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣)*/
accountType: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘)*/
employeeType: string;
/**入职日期止期(yyyy-MM-dd)*/
employmentDateEnd: string;
/**入职日期起期(yyyy-MM-dd)*/
employmentDateStart: string;
/**离职日期止期(yyyy-MM-dd)*/
leaveDateEnd: string;
/**离职日期起期(yyyy-MM-dd)*/
leaveDateStart: string;
/**手机号码*/
mobilePhone: string;
/**姓名*/
name: string;
/**归属组织id*/
orgId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**权限组织id*/
permissionOrgId: number;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
workType: string;
}
/**UserResourceQueryVO*/
export interface UserResourceQueryVO {
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**(必填)资源id*/
resourceId: number;
}
/**UserRoleQueryVO*/
export interface UserRoleQueryVO {
/**关键字*/
key: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**(必填)角色id*/
roleId: number;
}
/**UserUpdateVO*/
export interface UserUpdateVO {
/**登录账号*/
account: string;
/**用户类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣)*/
accountType: string;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘)*/
employeeType: string;
/**入职日期(yyyy-MM-dd)*/
employmentDate: string;
/**(必填)id*/
id: number;
/**离职日期(yyyy-MM-dd)*/
leaveDate: string;
/**手机号码*/
mobilePhone: string;
/**姓名*/
name: string;
/**归属组织id*/
orgId: number;
/**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
workType: string;
}
/**UserVO*/
export interface UserVO {
/**登录账号*/
account: string;
/**用户类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣)*/
accountType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户姓名*/
createUserName: string;
/**已删除*/
deleted: number;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘)*/
employeeType: string;
/**入职日期(yyyy-MM-dd)*/
employmentDate: string;
/**id*/
id: number;
/**岗位id*/
jobId: number;
/**岗位名称*/
jobName: string;
/**离职日期(yyyy-MM-dd)*/
leaveDate: string;
/**手机号码*/
mobilePhone: string;
/**姓名*/
name: string;
/**归属组织id*/
orgId: number;
/**归属组织名称*/
orgName: string;
/**密码*/
password: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
/**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
workType: string;
}
