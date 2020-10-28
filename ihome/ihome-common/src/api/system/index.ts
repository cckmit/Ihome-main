/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-27 2:16:28 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/system"
/**查询所有行政区划信息*/
export async function get_area_getAll (d?: any) {
return await request.get<AreaBaseVO[],AreaBaseVO[]>(basePath+'/area/getAll', { params: d })
}
/**根据行政区划编码查询所有下级行政区划信息*/
export async function get_area_getAllChildArea__code (d?: any) {
return await request.get<AreaBaseVO[],AreaBaseVO[]>(basePath+'/area/getAllChildArea/{code}', { params: d })
}
/**查询所有省份信息*/
export async function get_area_getAllProvince (d?: any) {
return await request.get<AreaBaseVO[],AreaBaseVO[]>(basePath+'/area/getAllProvince', { params: d })
}
/**查询所有公司信息*/
export async function post_company_getAll (d?: any) {
return await request.post< CompanyBaseVO[],CompanyBaseVO[]> (basePath+'/company/getAll', d)
}
/**添加字典*/
export async function post_dict_add (d?: any) {
return await request.post< number,number> (basePath+'/dict/add', d)
}
/**查询所有字典项*/
export async function get_dict_getAll (d?: any) {
return await request.get<any,any>(basePath+'/dict/getAll', { params: d })
}
/**查询指定类型的所有字典项*/
export async function post_dict_getAllByType (d?: any) {
return await request.post< DictBaseVO[],DictBaseVO[]> (basePath+'/dict/getAllByType', d)
}
/**根据类型和编码查询字典项*/
export async function post_dict_getByTypeAndCode (d?: any) {
return await request.post< DictBaseVO,DictBaseVO> (basePath+'/dict/getByTypeAndCode', d)
}
/**添加岗位*/
export async function post_job_add (d?: any) {
return await request.post< number,number> (basePath+'/job/add', d)
}
/**批量添加岗位角色权限*/
export async function post_job_addJobRoleBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/job/addJobRoleBatch', d)
}
/**删除岗位*/
export async function post_job_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/job/delete/{id}', d)
}
/**查询岗位详情*/
export async function get_job_get__id (d?: any) {
return await request.get<JobVO,JobVO>(basePath+'/job/get/{id}', { params: d })
}
/**查询所有岗位*/
export async function post_job_getAll (d?: any) {
return await request.post< JobVO[],JobVO[]> (basePath+'/job/getAll', d)
}
/**查询岗位列表*/
export async function post_job_getList (d?: any) {
return await request.post< PageModel<JobVO>,PageModel<JobVO>> (basePath+'/job/getList', d)
}
/**查询拥有指定资源的岗位列表*/
export async function post_job_getListByResourceId (d?: any) {
return await request.post< PageModel<JobVO>,PageModel<JobVO>> (basePath+'/job/getListByResourceId', d)
}
/**查询拥有指定角色的岗位列表*/
export async function post_job_getListByRoleId (d?: any) {
return await request.post< PageModel<JobVO>,PageModel<JobVO>> (basePath+'/job/getListByRoleId', d)
}
/**修改岗位*/
export async function post_job_update (d?: any) {
return await request.post< number,number> (basePath+'/job/update', d)
}
/**添加组织*/
export async function post_org_add (d?: any) {
return await request.post< number,number> (basePath+'/org/add', d)
}
/**删除组织*/
export async function post_org_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/org/delete/{id}', d)
}
/**查询组织详情*/
export async function get_org_get__id (d?: any) {
return await request.get<OrgVO,OrgVO>(basePath+'/org/get/{id}', { params: d })
}
/**查询所有组织*/
export async function get_org_getAll (d?: any) {
return await request.get<OrgVO[],OrgVO[]>(basePath+'/org/getAll', { params: d })
}
/**查询组织列表*/
export async function post_org_getList (d?: any) {
return await request.post< PageModel<OrgVO>,PageModel<OrgVO>> (basePath+'/org/getList', d)
}
/**修改组织*/
export async function post_org_update (d?: any) {
return await request.post< number,number> (basePath+'/org/update', d)
}
/**批量添加资源*/
export async function post_resource_addBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/resource/addBatch', d)
}
/**批量将资源分配给角色*/
export async function post_resource_addResourceToRoleBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/resource/addResourceToRoleBatch', d)
}
/**删除资源*/
export async function post_resource_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/resource/delete/{id}', d)
}
/**查询资源详情*/
export async function get_resource_get__id (d?: any) {
return await request.get<ResourceVO,ResourceVO>(basePath+'/resource/get/{id}', { params: d })
}
/**查询所有资源*/
export async function get_resource_getAll (d?: any) {
return await request.get<ResourceMinVO[],ResourceMinVO[]>(basePath+'/resource/getAll', { params: d })
}
/**查询角色拥有的资源*/
export async function post_resource_getAllByRoleId (d?: any) {
return await request.post< ResourceMinVO[],ResourceMinVO[]> (basePath+'/resource/getAllByRoleId', d)
}
/**查询用户拥有的资源*/
export async function post_resource_getAllByUserId (d?: any) {
return await request.post< ResourceMinVO[],ResourceMinVO[]> (basePath+'/resource/getAllByUserId', d)
}
/**查询资源列表*/
export async function post_resource_getList (d?: any) {
return await request.post< PageModel<ResourceVO>,PageModel<ResourceVO>> (basePath+'/resource/getList', d)
}
/**修改资源*/
export async function post_resource_update (d?: any) {
return await request.post< number,number> (basePath+'/resource/update', d)
}
/**添加角色*/
export async function post_role_add (d?: any) {
return await request.post< number,number> (basePath+'/role/add', d)
}
/**批量添加角色资源权限*/
export async function post_role_addRoleResourceBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/role/addRoleResourceBatch', d)
}
/**将角色批量分配给岗位*/
export async function post_role_addRoleToJobBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/role/addRoleToJobBatch', d)
}
/**将角色批量分配给用户*/
export async function post_role_addRoleToUserBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/role/addRoleToUserBatch', d)
}
/**删除角色*/
export async function post_role_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/role/delete/{id}', d)
}
/**查询角色详情*/
export async function get_role_get__id (d?: any) {
return await request.get<RoleVO,RoleVO>(basePath+'/role/get/{id}', { params: d })
}
/**查询所有角色*/
export async function get_role_getAll (d?: any) {
return await request.get<Role[],Role[]>(basePath+'/role/getAll', { params: d })
}
/**查询指定岗位拥有的所有角色*/
export async function post_role_getAllByJobId__jobId (d?: any) {
return await request.post< RoleVO[],RoleVO[]> (basePath+'/role/getAllByJobId/{jobId}', d)
}
/**查询指定用户拥有的所有角色*/
export async function post_role_getAllByUserId__userId (d?: any) {
return await request.post< RoleVO[],RoleVO[]> (basePath+'/role/getAllByUserId/{userId}', d)
}
/**查询角色列表*/
export async function post_role_getList (d?: any) {
return await request.post< PageModel<RoleVO>,PageModel<RoleVO>> (basePath+'/role/getList', d)
}
/**查询拥有指定资源的角色列表*/
export async function post_role_getListByResourceId (d?: any) {
return await request.post< PageModel<RoleVO>,PageModel<RoleVO>> (basePath+'/role/getListByResourceId', d)
}
/**修改角色*/
export async function post_role_update (d?: any) {
return await request.post< number,number> (basePath+'/role/update', d)
}
/**查询登录用户信息*/
export async function post_sessionUser_getUserInfo (d?: any) {
return await request.post< LoginUserVO,LoginUserVO> (basePath+'/sessionUser/getUserInfo', d)
}
/**激活用户*/
export async function post_user_activate__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/user/activate/{id}', d)
}
/**添加用户*/
export async function post_user_add (d?: any) {
return await request.post< string,string> (basePath+'/user/add', d)
}
/**批量添加用户岗位及角色*/
export async function post_user_addJobAndRoleBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/user/addJobAndRoleBatch', d)
}
/**批量添加用户组织权限*/
export async function post_user_addUserOrgBatch (d?: any) {
return await request.post< boolean,boolean> (basePath+'/user/addUserOrgBatch', d)
}
/**复制用户岗位角色及组织权限*/
export async function post_user_copyJobAndRole (d?: any) {
return await request.post< boolean,boolean> (basePath+'/user/copyJobAndRole', d)
}
/**删除用户*/
export async function post_user_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/user/delete/{id}', d)
}
/**查询用户详情*/
export async function get_user_get__id (d?: any) {
return await request.get<UserVO,UserVO>(basePath+'/user/get/{id}', { params: d })
}
/**查询指定用户拥有的所有组织权限*/
export async function post_user_getAllUserOrgByUserId__userId (d?: any) {
return await request.post< OrgMinVO[],OrgMinVO[]> (basePath+'/user/getAllUserOrgByUserId/{userId}', d)
}
/**查询用户列表*/
export async function post_user_getList (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> (basePath+'/user/getList', d)
}
/**查询拥有指定岗位的用户列表*/
export async function post_user_getListByJobId (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> (basePath+'/user/getListByJobId', d)
}
/**查询拥有指定资源的用户列表*/
export async function post_user_getListByResourceId (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> (basePath+'/user/getListByResourceId', d)
}
/**查询拥有指定角色的用户列表*/
export async function post_user_getListByRoleId (d?: any) {
return await request.post< PageModel<UserVO>,PageModel<UserVO>> (basePath+'/user/getListByRoleId', d)
}
/**锁定用户*/
export async function post_user_lock__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/user/lock/{id}', d)
}
/**重置密码*/
export async function post_user_resetPassword__id (d?: any) {
return await request.post< string,string> (basePath+'/user/resetPassword/{id}', d)
}
/**修改用户*/
export async function post_user_update (d?: any) {
return await request.post< number,number> (basePath+'/user/update', d)
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
/**CompanyBaseVO*/
export interface CompanyBaseVO {
/**ID*/
id: number;
/**公司名称*/
name: string;
}
/**CompanyQueryVO*/
export interface CompanyQueryVO {
/**公司名称*/
name: string;
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
/**是否有效(Valid-有效、Invalid-无效)*/
valid: string;
}
/**DictTypeCodeQueryVO*/
export interface DictTypeCodeQueryVO {
/**(必填)编码*/
code: string;
/**(必填)类型*/
type: string;
/**是否有效(Valid-有效、Invalid-无效)*/
valid: string;
}
/**DictTypeQueryVO*/
export interface DictTypeQueryVO {
/**(必填)类型*/
type: string;
/**是否有效(Valid-有效、Invalid-无效)*/
valid: string;
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
/**图标*/
icon: string;
/**ID*/
id: number;
/**名称*/
name: string;
/**父ID*/
parentId: number;
/**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**URL*/
url: string;
}
/**ResourceBaseVO*/
export interface ResourceBaseVO {
/**(必填)编码*/
code: string;
/**图标*/
icon: string;
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
/**图标*/
icon: string;
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
/**图标*/
icon: string;
/**ID*/
id: number;
/**名称*/
name: string;
/**父资源编码*/
parentCode: string;
/**父ID*/
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
/**URL*/
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
