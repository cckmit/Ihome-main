/* eslint-disable */
//Fri Jul 31 2020 18:06:08 GMT+0800 (GMT+08:00)
import { request } from './base'
/**添加岗位*/
export async function post_system_job_add(d?: JobBaseVO) {
    return await request.post<JobBaseVO, number>('/system/job/add', d)
}
/**批量添加岗位角色权限*/
export async function post_system_job_addJobRoleBatch(d?: JobRoleVO) {
    return await request.post<JobRoleVO, boolean>('/system/job/addJobRoleBatch', d)
}
/**删除岗位*/
export async function post_system_job_delete_ID(d?: any) {
    return await request.post<any, number>('/system/job/delete/{id}', d)
}
/**demo*/
export async function get_system_job_demo(d?: any) {
    return await request.get<any, JobDemoVO>('/system/job/demo', { params: d })
}
/**查询岗位详情*/
export async function get_system_job_get_ID(d?: any) {
    return await request.get<any, JobVO>('/system/job/get/{id}', { params: d })
}
/**查询岗位列表*/
export async function post_system_job_getList(d?: JobQueryVO) {
    return await request.post<JobQueryVO, PageModel<JobVO>>('/system/job/getList', d)
}
/**查询拥有指定资源的岗位列表*/
export async function post_system_job_getListByResourceId(d?: JobResourceQueryVO) {
    return await request.post<JobResourceQueryVO, PageModel<JobVO>>('/system/job/getListByResourceId', d)
}
/**查询拥有指定角色的岗位列表*/
export async function post_system_job_getListByRoleId(d?: JobRoleQueryVO) {
    return await request.post<JobRoleQueryVO, PageModel<JobVO>>('/system/job/getListByRoleId', d)
}
/**修改岗位*/
export async function post_system_job_update(d?: JobUpdateVO) {
    return await request.post<JobUpdateVO, number>('/system/job/update', d)
}
/**添加组织*/
export async function post_system_org_add(d?: OrgBaseVO) {
    return await request.post<OrgBaseVO, number>('/system/org/add', d)
}
/**删除组织*/
export async function post_system_org_delete_ID(d?: any) {
    return await request.post<any, number>('/system/org/delete/{id}', d)
}
/**查询组织详情*/
export async function get_system_org_get_ID(d?: any) {
    return await request.get<any, OrgVO>('/system/org/get/{id}', { params: d })
}
/**查询所有组织*/
export async function get_system_org_getAll(d?: any) {
    return await request.get<any, PageModel<OrgVO>>('/system/org/getAll', { params: d })
}
/**查询组织列表*/
export async function post_system_org_getList(d?: OrgQueryVO) {
    return await request.post<OrgQueryVO, PageModel<OrgVO>>('/system/org/getList', d)
}
/**修改组织*/
export async function post_system_org_update(d?: OrgUpdateVO) {
    return await request.post<OrgUpdateVO, number>('/system/org/update', d)
}
/**批量添加资源*/
export async function post_system_resource_addBatch(d?: undefined) {
    return await request.post<undefined, boolean>('/system/resource/addBatch', d)
}
/**批量将资源分配给角色*/
export async function post_system_resource_addResourceToRoleBatch(d?: ResourceRoleVO) {
    return await request.post<ResourceRoleVO, boolean>('/system/resource/addResourceToRoleBatch', d)
}
/**删除资源*/
export async function post_system_resource_delete_ID(d?: any) {
    return await request.post<any, number>('/system/resource/delete/{id}', d)
}
/**查询资源详情*/
export async function get_system_resource_get_ID(d?: any) {
    return await request.get<any, ResourceVO>('/system/resource/get/{id}', { params: d })
}
/**查询所有资源*/
export async function get_system_resource_getAll(d?: any) {
    return await request.get<any, ResourceMinVO[]>('/system/resource/getAll', { params: d })
}
/**查询资源列表*/
export async function post_system_resource_getList(d?: ResourceQueryVO) {
    return await request.post<ResourceQueryVO, PageModel<ResourceVO>>('/system/resource/getList', d)
}
/**查询用户拥有的资源*/
export async function post_system_resource_getListByUserId(d?: ResourceUserQueryVO) {
    return await request.post<ResourceUserQueryVO, PageModel<ResourceMinVO>>('/system/resource/getListByUserId', d)
}
/**修改资源*/
export async function post_system_resource_update(d?: ResourceUpdateVO) {
    return await request.post<ResourceUpdateVO, number>('/system/resource/update', d)
}
/**添加角色*/
export async function post_system_role_add(d?: RoleBaseVO) {
    return await request.post<RoleBaseVO, number>('/system/role/add', d)
}
/**批量添加角色资源权限*/
export async function post_system_role_addRoleResourceBatch(d?: RoleResourceVO) {
    return await request.post<RoleResourceVO, boolean>('/system/role/addRoleResourceBatch', d)
}
/**将角色批量分配给岗位*/
export async function post_system_role_addRoleToJobBatch(d?: RoleJobVO) {
    return await request.post<RoleJobVO, boolean>('/system/role/addRoleToJobBatch', d)
}
/**将角色批量分配给用户*/
export async function post_system_role_addRoleToUserBatch(d?: RoleUserVO) {
    return await request.post<RoleUserVO, boolean>('/system/role/addRoleToUserBatch', d)
}
/**删除角色*/
export async function post_system_role_delete_ID(d?: any) {
    return await request.post<any, number>('/system/role/delete/{id}', d)
}
/**查询角色详情*/
export async function get_system_role_get_ID(d?: any) {
    return await request.get<any, RoleVO>('/system/role/get/{id}', { params: d })
}
/**查询所有角色*/
export async function get_system_role_getAll(d?: any) {
    return await request.get<any, Role[]>('/system/role/getAll', { params: d })
}
/**查询角色列表*/
export async function post_system_role_getList(d?: RoleQueryVO) {
    return await request.post<RoleQueryVO, PageModel<RoleVO>>('/system/role/getList', d)
}
/**查询拥有指定资源的角色列表*/
export async function post_system_role_getListByResourceId(d?: RoleResourceQueryVO) {
    return await request.post<RoleResourceQueryVO, PageModel<RoleVO>>('/system/role/getListByResourceId', d)
}
/**查询指定用户拥有的所有角色*/
export async function post_system_role_getListByUserId(d?: RoleUserQueryVO) {
    return await request.post<RoleUserQueryVO, PageModel<RoleVO>>('/system/role/getListByUserId', d)
}
/**修改角色*/
export async function post_system_role_update(d?: RoleUpdateVO) {
    return await request.post<RoleUpdateVO, number>('/system/role/update', d)
}
/**激活用户*/
export async function post_system_user_activate_ID(d?: any) {
    return await request.post<any, boolean>('/system/user/activate/{id}', d)
}
/**添加用户*/
export async function post_system_user_add(d?: UserBaseVO) {
    return await request.post<UserBaseVO, number>('/system/user/add', d)
}
/**批量添加用户岗位及角色*/
export async function post_system_user_addJobAndRoleBatch(d?: UserJobRoleVO) {
    return await request.post<UserJobRoleVO, boolean>('/system/user/addJobAndRoleBatch', d)
}
/**批量添加用户组织权限*/
export async function post_system_user_addUserOrgBatch(d?: UserOrgVO) {
    return await request.post<UserOrgVO, boolean>('/system/user/addUserOrgBatch', d)
}
/**复制用户岗位角色及组织权限*/
export async function post_system_user_copyJobAndRole(d?: UserCopyVO) {
    return await request.post<UserCopyVO, boolean>('/system/user/copyJobAndRole', d)
}
/**删除用户*/
export async function post_system_user_delete_ID(d?: any) {
    return await request.post<any, number>('/system/user/delete/{id}', d)
}
/**查询用户详情*/
export async function get_system_user_get_ID(d?: any) {
    return await request.get<any, UserVO>('/system/user/get/{id}', { params: d })
}
/**查询用户列表*/
export async function post_system_user_getList(d?: UserQueryVO) {
    return await request.post<UserQueryVO, PageModel<UserVO>>('/system/user/getList', d)
}
/**查询拥有指定岗位的用户列表*/
export async function post_system_user_getListByJobId(d?: UserJobQueryVO) {
    return await request.post<UserJobQueryVO, PageModel<UserVO>>('/system/user/getListByJobId', d)
}
/**查询拥有指定资源的用户列表*/
export async function post_system_user_getListByResourceId(d?: UserResourceQueryVO) {
    return await request.post<UserResourceQueryVO, PageModel<UserVO>>('/system/user/getListByResourceId', d)
}
/**查询拥有指定角色的用户列表*/
export async function post_system_user_getListByRoleId(d?: UserRoleQueryVO) {
    return await request.post<UserRoleQueryVO, PageModel<UserVO>>('/system/user/getListByRoleId', d)
}
/**锁定用户*/
export async function post_system_user_lock_ID(d?: any) {
    return await request.post<any, boolean>('/system/user/lock/{id}', d)
}
/**通过手机号码重置密���*/
export async function post_system_user_resetPasswordByPhone(d?: undefined) {
    return await request.post<undefined, boolean>('/system/user/resetPasswordByPhone', d)
}
/**修改用户*/
export async function post_system_user_update(d?: UserUpdateVO) {
    return await request.post<UserUpdateVO, number>('/system/user/update', d)
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
    list: T;
    /**总记录数*/
    total: number;
}
/**undefined*/
export interface JobBaseVO {
    /**编码*/
    code: string;
    /**名称*/
    name: string;
    /**备注*/
    remark: string;
}
/**undefined*/
export interface JobDemoVO {
    /**金额*/
    amount: number;
    /**日志id*/
    logId: number;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
}
/**undefined*/
export interface JobQueryVO {
    /**编码*/
    code: string;
    /**名称*/
    name: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**资源id*/
    resourceId: number;
    /**角色id*/
    roleId: number;
}
/**undefined*/
export interface JobResourceQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**资源id*/
    resourceId: number;
}
/**undefined*/
export interface JobRoleQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**角色id*/
    roleId: number;
}
/**undefined*/
export interface JobRoleVO {
    /**岗位id*/
    jobId: number;
    /**角色id数组*/
    roleIds: undefined[];
}
/**undefined*/
export interface JobUpdateVO {
    /**编码*/
    code: string;
    /**id*/
    id: number;
    /**名称*/
    name: string;
    /**备注*/
    remark: string;
}
/**undefined*/
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
/**undefined*/
export interface OrgBaseVO {
    /**关闭日期(yyyy-MM-dd)*/
    closeDate: string;
    /**部门分类(Business-营业线、Function-职能线)*/
    departmentType: string;
    /**组织层级*/
    level: number;
    /**名称*/
    name: string;
    /**开业日期(yyyy-MM-dd)*/
    openDate: string;
    /**组织代码*/
    orgCode: number;
    /**组织类型(Company-公司、Department-部门)*/
    orgType: string;
    /**父组织id*/
    parentId: number;
    /**简称*/
    shortName: string;
    /**状态(Valid-有效、Invalid-无效)*/
    status: string;
}
/**undefined*/
export interface OrgQueryVO {
    /**部门分类(Business-营业线、Function-职能线)*/
    departmentType: string;
    /**组织层级*/
    level: number;
    /**名称*/
    name: string;
    /**组织类型(Company-公司、Department-部门)*/
    orgType: string;
    /**当���页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**父组织id*/
    parentId: number;
}
/**undefined*/
export interface OrgUpdateVO {
    /**关闭日期(yyyy-MM-dd)*/
    closeDate: string;
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
    orgCode: number;
    /**组织类型(Company-公司、Department-部门)*/
    orgType: string;
    /**父组织id*/
    parentId: number;
    /**简称*/
    shortName: string;
    /**状态(Valid-有效、Invalid-无效)*/
    status: string;
}
/**undefined*/
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
    orgCode: number;
    /**组织类型(Company-公司、Department-部门)*/
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
/**undefined*/
export interface ResourceBaseVO {
    /**编码*/
    code: string;
    /**名称*/
    name: string;
    /**父资源id*/
    parentId: number;
    /**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
    type: string;
    /**url*/
    url: string;
}
/**undefined*/
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
/**undefined*/
export interface ResourceQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**父资源id*/
    parentId: number;
    /**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
    type: string;
}
/**undefined*/
export interface ResourceRoleVO {
    /**资源id*/
    resourceId: number;
    /**角色id数组*/
    roleIds: undefined[];
}
/**undefined*/
export interface ResourceUpdateVO {
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
    /**url*/
    url: string;
}
/**undefined*/
export interface ResourceUserQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**用户id*/
    userId: number;
}
/**undefined*/
export interface ResourceVO {
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
/**undefined*/
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
/**undefined*/
export interface RoleBaseVO {
    /**编码*/
    code: string;
    /**名称*/
    name: string;
}
/**undefined*/
export interface RoleJobVO {
    /**岗位id数组*/
    jobIds: undefined[];
    /**角色id*/
    roleId: number;
}
/**undefined*/
export interface RoleQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
}
/**undefined*/
export interface RoleResourceQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**资源id*/
    resourceId: number;
}
/**undefined*/
export interface RoleResourceVO {
    /**资源id数组*/
    resourceIds: undefined[];
    /**角色id*/
    roleId: number;
}
/**undefined*/
export interface RoleUpdateVO {
    /**编码*/
    code: string;
    /**id*/
    id: number;
    /**名称*/
    name: string;
}
/**undefined*/
export interface RoleUserQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**用户id*/
    userId: number;
}
/**undefined*/
export interface RoleUserVO {
    /**角色id*/
    roleId: number;
    /**用户id数组*/
    userIds: undefined[];
}
/**undefined*/
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
/**undefined*/
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
/**undefined*/
export interface UserCopyVO {
    /**是否复制岗位角色*/
    copyJobAndRole: number;
    /**是否复制组织权限*/
    copyOrg: number;
    /**目标用户id*/
    id: number;
    /**要复制的用户id列表*/
    userIds: undefined[];
}
/**undefined*/
export interface UserJobQueryVO {
    /**岗位id*/
    jobId: number;
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
}
/**undefined*/
export interface UserJobRoleVO {
    /**用户id*/
    id: number;
    /**岗位id*/
    jobId: number;
    /**角色id数组*/
    roleIds: undefined[];
}
/**undefined*/
export interface UserOrgVO {
    /**用户id*/
    id: number;
    /**组织id数组*/
    orgIds: undefined[];
}
/**undefined*/
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
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**权限组织id*/
    permissionOrgId: number;
    /**状态(Valid-有效、Invalid-无效)*/
    status: string;
    /**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
    workType: string;
}
/**undefined*/
export interface UserResourceQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**资源id*/
    resourceId: number;
}
/**undefined*/
export interface UserRoleQueryVO {
    /**关键字*/
    key: string;
    /**当前页*/
    pageNum: number;
    /**每页条数*/
    pageSize: number;
    /**角色id*/
    roleId: number;
}
/**undefined*/
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
    /**id*/
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
/**undefined*/
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
