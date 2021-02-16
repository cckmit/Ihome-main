/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-2-15 2:13:29 ├F10: PM┤
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
/**根据行政区划编码查询行政区划名称*/
export async function get_area_getAreaNameByCode__code (d?: any) {
return await request.get<string,string>(basePath+'/area/getAreaNameByCode/{code}', { params: d })
}
/**根据行政区划编码查询行政区划信息*/
export async function get_area_getByCode__code (d?: any) {
return await request.get<AreaBaseVO,AreaBaseVO>(basePath+'/area/getByCode/{code}', { params: d })
}
/**获取请款单编号*/
export async function post_codeGenerate_getApplyNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getApplyNo', d)
}
/**获取渠道呈批编号*/
export async function post_codeGenerate_getChannelApproveNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getChannelApproveNo', d)
}
/**获取渠道商分销协议编号*/
export async function post_codeGenerate_getChannelContractNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getChannelContractNo', d)
}
/**获取渠道等级编号*/
export async function post_codeGenerate_getChannelLevelNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getChannelLevelNo', d)
}
/**获取优惠告知书房号确认书编号*/
export async function post_codeGenerate_getCustomerConfirmContractNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getCustomerConfirmContractNo', d)
}
/**获取优惠告知书编号*/
export async function post_codeGenerate_getCustomerContractNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getCustomerContractNo', d)
}
/**获取客户编号*/
export async function post_codeGenerate_getCustomerNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getCustomerNo', d)
}
/**获取优惠告知书退款申请书编号*/
export async function post_codeGenerate_getCustomerRefundContractNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getCustomerRefundContractNo', d)
}
/**获取客户报备单编号*/
export async function post_codeGenerate_getCustomerReportNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getCustomerReportNo', d)
}
/**获取成交报告编号*/
export async function post_codeGenerate_getDealNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getDealNo', d)
}
/**获取甲方合同编号*/
export async function post_codeGenerate_getDeveloperContractNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getDeveloperContractNo', d)
}
/**推送集团支付系统批次号*/
export async function post_codeGenerate_getJTZFBatchNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getJTZFBatchNo', d)
}
/**获取OA呈批编号*/
export async function post_codeGenerate_getOANo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getOANo', d)
}
/**获取收款编号*/
export async function post_codeGenerate_getPaymentNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getPaymentNo', d)
}
/**获取付款单编号*/
export async function post_codeGenerate_getPayoffNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getPayoffNo', d)
}
/**获取付款支付编号（推送集团支付系统）*/
export async function post_codeGenerate_getPayoffPayNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getPayoffPayNo', d)
}
/**获取POS机申请事项编号*/
export async function post_codeGenerate_getPosApplyNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getPosApplyNo', d)
}
/**获取联动项目编号*/
export async function post_codeGenerate_getProjectNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getProjectNo', d)
}
/**获取退款项编号*/
export async function post_codeGenerate_getRefundItemNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getRefundItemNo', d)
}
/**获取退款编号*/
export async function post_codeGenerate_getRefundNo (d?: any) {
return await request.post< string,string> (basePath+'/codeGenerate/getRefundNo', d)
}
/**查询公司主体详情*/
export async function get_company_get__id (d?: any) {
return await request.get<Company,Company>(basePath+'/company/get/{id}', { params: d })
}
/**查询所有公司信息*/
export async function post_company_getAll (d?: any) {
return await request.post< CompanyBaseVO[],CompanyBaseVO[]> (basePath+'/company/getAll', d)
}
/**查询所有公司分页信息*/
export async function post_company_getPage (d?: any) {
return await request.post< any,any> (basePath+'/company/getPage', d)
}
/**E签宝--批量创建机构印章*/
export async function post_companySeal_batchCreateOrg (d?: any) {
return await request.post< boolean,boolean> (basePath+'/companySeal/batchCreateOrg', d)
}
/**E签宝--批量保存机构印章*/
export async function post_companySeal_batchCreatePlatform (d?: any) {
return await request.post< boolean,boolean> (basePath+'/companySeal/batchCreatePlatform', d)
}
/**E签宝--创建平台印章*/
export async function post_companySeal_createPlatformSeal (d?: any) {
return await request.post< boolean,boolean> (basePath+'/companySeal/createPlatformSeal', d)
}
/**根据公司、类型 获取印章*/
export async function post_companySeal_getOrgSeal (d?: any) {
return await request.post< CompanyOrgSealResult,CompanyOrgSealResult> (basePath+'/companySeal/getOrgSeal', d)
}
/**添加字典项*/
export async function post_dict_add (d?: any) {
return await request.post< number,number> (basePath+'/dict/add', d)
}
/**添加字典类型*/
export async function post_dict_addDictType (d?: any) {
return await request.post< number,number> (basePath+'/dict/addDictType', d)
}
/**停用字典项*/
export async function post_dict_close__id (d?: any) {
return await request.post< number,number> (basePath+'/dict/close/{id}', d)
}
/**删除字典项*/
export async function post_dict_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/dict/delete/{id}', d)
}
/**删除字典类型*/
export async function post_dict_deleteDictType__id (d?: any) {
return await request.post< number,number> (basePath+'/dict/deleteDictType/{id}', d)
}
/**查询所有字典项*/
export async function get_dict_getAll (d?: any) {
return await request.get<any,any>(basePath+'/dict/getAll', { params: d })
}
/**查询指定类型的所有字典项*/
export async function post_dict_getAllByType (d?: any) {
return await request.post< DictBaseVO[],DictBaseVO[]> (basePath+'/dict/getAllByType', d)
}
/**根据类型查询查询所有字典项*/
export async function post_dict_getAllByTypes (d?: any) {
return await request.post< any,any> (basePath+'/dict/getAllByTypes', d)
}
/**查询指定字典类型的所有字典项*/
export async function post_dict_getAllDictItemByType (d?: any) {
return await request.post< DictBaseVO[],DictBaseVO[]> (basePath+'/dict/getAllDictItemByType', d)
}
/**查询所有字典类型*/
export async function post_dict_getAllDictType (d?: any) {
return await request.post< DictTypeVO[],DictTypeVO[]> (basePath+'/dict/getAllDictType', d)
}
/**根据类型和编码查询字典项*/
export async function post_dict_getByTypeAndCode (d?: any) {
return await request.post< DictBaseVO,DictBaseVO> (basePath+'/dict/getByTypeAndCode', d)
}
/**启用字典项*/
export async function post_dict_open__id (d?: any) {
return await request.post< number,number> (basePath+'/dict/open/{id}', d)
}
/**枚举同步字典*/
export async function post_dict_syncdictionary (d?: any) {
return await request.post< any,any> (basePath+'/dict/syncdictionary', d)
}
/**修改字典项*/
export async function post_dict_update (d?: any) {
return await request.post< number,number> (basePath+'/dict/update', d)
}
/**修改字典类型*/
export async function post_dict_updateDictType (d?: any) {
return await request.post< number,number> (basePath+'/dict/updateDictType', d)
}
/**idm根据HR系统用户账号查询分销系统用户数据*/
export async function post_idm_idmByAccountFindUser (d?: any) {
return await request.post< UserVO,UserVO> (basePath+'/idm/idmByAccountFindUser', d)
}
/**idm根据HR系统组织ID查询分销系统组织数据*/
export async function post_idm_idmByHrOrgIdFindOrg (d?: any) {
return await request.post< OrgVO,OrgVO> (basePath+'/idm/idmByHrOrgIdFindOrg', d)
}
/**idm处理HR系统组织数据到分销系统*/
export async function post_idm_idmDealOrg (d?: any) {
return await request.post< any,any> (basePath+'/idm/idmDealOrg', d)
}
/**idm处理HR系统用户数据到分销系统*/
export async function post_idm_idmDealUser (d?: any) {
return await request.post< any,any> (basePath+'/idm/idmDealUser', d)
}
/**idm分页查询分销系统所有组织数据*/
export async function post_idm_idmFindAllOrgs (d?: any) {
return await request.post< any,any> (basePath+'/idm/idmFindAllOrgs', d)
}
/**idm分页查询分销系统所有用户数据*/
export async function post_idm_idmFindAllUsers (d?: any) {
return await request.post< any,any> (basePath+'/idm/idmFindAllUsers', d)
}
/**idm访问*/
export async function get_idmLogin_index (d?: any) {
return await request.get<any,any>(basePath+'/idmLogin/index', { params: d })
}
/**获取登录凭证*/
export async function post_idmLogin_loginCertificate (d?: any) {
return await request.post< string,string> (basePath+'/idmLogin/loginCertificate', d)
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
return await request.post< any,any> (basePath+'/job/getList', d)
}
/**查询拥有指定资源的岗位列表*/
export async function post_job_getListByResourceId (d?: any) {
return await request.post< any,any> (basePath+'/job/getListByResourceId', d)
}
/**查询拥有指定角色的岗位列表*/
export async function post_job_getListByRoleId (d?: any) {
return await request.post< any,any> (basePath+'/job/getListByRoleId', d)
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
/**查询组织层次树*/
export async function get_org_getLevelTree__id (d?: any) {
return await request.get<OrgLevelTreeVO,OrgLevelTreeVO>(basePath+'/org/getLevelTree/{id}', { params: d })
}
/**查询组织列表*/
export async function post_org_getList (d?: any) {
return await request.post< any,any> (basePath+'/org/getList', d)
}
/**递归查询组织列表*/
export async function post_org_getListRecursion (d?: any) {
return await request.post< any,any> (basePath+'/org/getListRecursion', d)
}
/**查询用户可选事业部列表*/
export async function get_org_getUserDepartmentList (d?: any) {
return await request.get<Org[],Org[]>(basePath+'/org/getUserDepartmentList', { params: d })
}
/**修改组织*/
export async function post_org_update (d?: any) {
return await request.post< number,number> (basePath+'/org/update', d)
}
/**查询组织参数*/
export async function post_paramDefine_getOrgParam (d?: any) {
return await request.post< ParamDefineOrg,ParamDefineOrg> (basePath+'/paramDefine/getOrgParam', d)
}
/**查询参数*/
export async function post_paramDefine_getParam (d?: any) {
return await request.post< ParamDefine,ParamDefine> (basePath+'/paramDefine/getParam', d)
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
return await request.post< any,any> (basePath+'/resource/getList', d)
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
return await request.post< any,any> (basePath+'/role/getList', d)
}
/**查询拥有指定资源的角色列表*/
export async function post_role_getListByResourceId (d?: any) {
return await request.post< any,any> (basePath+'/role/getListByResourceId', d)
}
/**修改角色*/
export async function post_role_update (d?: any) {
return await request.post< number,number> (basePath+'/role/update', d)
}
/**激活用户*/
export async function post_sessionUser_activateChannelUser__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/sessionUser/activateChannelUser/{id}', d)
}
/**添加渠道用户*/
export async function post_sessionUser_addChannelUser (d?: any) {
return await request.post< number,number> (basePath+'/sessionUser/addChannelUser', d)
}
/**添加个人用户*/
export async function post_sessionUser_addCustomerUser (d?: any) {
return await request.post< number,number> (basePath+'/sessionUser/addCustomerUser', d)
}
/**验证短信验证码*/
export async function post_sessionUser_checkSms (d?: any) {
return await request.post< boolean,boolean> (basePath+'/sessionUser/checkSms', d)
}
/**删除用户*/
export async function post_sessionUser_deleteChannelUser__id (d?: any) {
return await request.post< number,number> (basePath+'/sessionUser/deleteChannelUser/{id}', d)
}
/**重新设置密码*/
export async function post_sessionUser_getBackPassword (d?: any) {
return await request.post< string,string> (basePath+'/sessionUser/getBackPassword', d)
}
/**获取系统参数*/
export async function get_sessionUser_getSystemParam (d?: any) {
return await request.get<SystemParamVO,SystemParamVO>(basePath+'/sessionUser/getSystemParam', { params: d })
}
/**查询登录用户信息*/
export async function post_sessionUser_getUserInfo (d?: any) {
return await request.post< LoginUserVO,LoginUserVO> (basePath+'/sessionUser/getUserInfo', d)
}
/**获取图形验证码*/
export async function get_sessionUser_getcaptch (d?: any) {
return await request.get<CaptchaModel,CaptchaModel>(basePath+'/sessionUser/getcaptch', { params: d })
}
/**锁定用户*/
export async function post_sessionUser_lockChannelUser__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/sessionUser/lockChannelUser/{id}', d)
}
/**退出登录*/
export async function get_sessionUser_logout (d?: any) {
return await request.get<boolean,boolean>(basePath+'/sessionUser/logout', { params: d })
}
/**注册渠道负责人信息*/
export async function post_sessionUser_registerChannelLeader (d?: any) {
return await request.post< number,number> (basePath+'/sessionUser/registerChannelLeader', d)
}
/**发送验证码*/
export async function post_sessionUser_sendSms (d?: any) {
return await request.post< string,string> (basePath+'/sessionUser/sendSms', d)
}
/**手机号码登录发送验证码*/
export async function get_sessionUser_sendSms__mobilePhone (d?: any) {
return await request.get<string,string>(basePath+'/sessionUser/sendSms/{mobilePhone}', { params: d })
}
/**修改渠道用户*/
export async function post_sessionUser_updateChannelUser (d?: any) {
return await request.post< number,number> (basePath+'/sessionUser/updateChannelUser', d)
}
/**激活用户*/
export async function post_user_activate__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/user/activate/{id}', d)
}
/**添加用户*/
export async function post_user_add (d?: any) {
return await request.post< number,number> (basePath+'/user/add', d)
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
return await request.post< any,any> (basePath+'/user/getList', d)
}
/**查询拥有指定岗位的用户列表*/
export async function post_user_getListByJobId (d?: any) {
return await request.post< any,any> (basePath+'/user/getListByJobId', d)
}
/**查询拥有指定资源的用户列表*/
export async function post_user_getListByResourceId (d?: any) {
return await request.post< any,any> (basePath+'/user/getListByResourceId', d)
}
/**查询拥有指定角色的用户列表*/
export async function post_user_getListByRoleId (d?: any) {
return await request.post< any,any> (basePath+'/user/getListByRoleId', d)
}
/**锁定用户*/
export async function post_user_lock__id (d?: any) {
return await request.post< boolean,boolean> (basePath+'/user/lock/{id}', d)
}
/**重置密码*/
export async function post_user_resetPassword (d?: any) {
return await request.post< number,number> (basePath+'/user/resetPassword', d)
}
/**修改用户*/
export async function post_user_update (d?: any) {
return await request.post< number,number> (basePath+'/user/update', d)
}
/**微信获取用户手机号*/
export async function post_wx_getNumberInfo (d?: any) {
return await request.post< object,object> (basePath+'/wx/getNumberInfo', d)
}
/**微信根据code获取 认证信息*/
export async function get_wx_getOpenid__code (d?: any) {
return await request.get<WxCodeVo,WxCodeVo>(basePath+'/wx/getOpenid/{code}', { params: d })
}
/**微信根据code获取 临时token*/
export async function get_wx_getTemporaryToken__code (d?: any) {
return await request.get<string,string>(basePath+'/wx/getTemporaryToken/{code}', { params: d })
}
/**微信获取token*/
export async function get_wx_getToken (d?: any) {
return await request.get<string,string>(basePath+'/wx/getToken', { params: d })
}
/**微信获取小程序二维码*/
export async function get_wx_getWxACodeUnLimit (d?: any) {
return await request.get<SalesFileStream,SalesFileStream>(basePath+'/wx/getWxACodeUnLimit', { params: d })
}
/**微信授权获取token*/
export async function post_wx_getWxOauthToken (d?: any) {
return await request.post< any,any> (basePath+'/wx/getWxOauthToken', d)
}
/**微信刷新token*/
export async function get_wx_refreshToken (d?: any) {
return await request.get<string,string>(basePath+'/wx/refreshToken', { params: d })
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
/**CaptchaModel*/
export interface CaptchaModel {
/**图片 base64*/
base64String: string;
/**验证码唯一标识,验证过程中需要回传*/
iv: string;
}
/**ChannelUserUpdateVO*/
export interface ChannelUserUpdateVO {
/**渠道id*/
channelId: number;
/**(必填)渠道用户类型(Leader-渠道负责人、Agent-渠道经纪人、Commission-渠道结佣)*/
channelUserType: string;
/**email*/
email: string;
/**(必填)手机号码*/
mobilePhone: string;
/**(必填)姓名*/
name: string;
/**密码*/
password: string;
/**(必填)userId*/
userId: number;
}
/**ChannelUserVO*/
export interface ChannelUserVO {
/**渠道id*/
channelId: number;
/**(必填)渠道用户类型(Leader-渠道负责人、Agent-渠道经纪人、Commission-渠道结佣)*/
channelUserType: string;
/**email*/
email: string;
/**(必填)手机号码*/
mobilePhone: string;
/**(必填)姓名*/
name: string;
/**密码*/
password: string;
}
/**Company*/
export interface Company {
/**营业住所*/
address: string;
/**城市*/
city: string;
/**行政区*/
county: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**统一社会信用代码*/
creditCode: string;
/**已删除*/
deleted: number;
/**undefined*/
eorgId: string;
/**undefined*/
eplatformFlag: number;
/**ID*/
id: number;
/**法定代表人*/
legalPerson: string;
/**法人身份证号码*/
legalPersonNo: string;
/**名称*/
name: string;
/**省份*/
province: string;
/**成立日期(yyyy-MM-dd)*/
setupDate: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**CompanyBaseVO*/
export interface CompanyBaseVO {
/**营业住所*/
address: string;
/**统一社会信用代码*/
creditCode: string;
/**ID*/
id: number;
/**公司名称*/
name: string;
}
/**CompanyOrgCreateBatchVO*/
export interface CompanyOrgCreateBatchVO {
/**undefined*/
begin: number;
/**undefined*/
length: number;
}
/**CompanyOrgCreateSealBatchVO*/
export interface CompanyOrgCreateSealBatchVO {
/**undefined*/
begin: number;
/**undefined*/
length: number;
}
/**CompanyOrgSealResult*/
export interface CompanyOrgSealResult {
/**签约主体账号 机构ID*/
authorizedAccountId: string;
/**印章ID*/
platformSealId: string;
}
/**CompanyOrgSealVo*/
export interface CompanyOrgSealVo {
/**(必填)公司ID*/
companyId: number;
/**(必填)类型(OfficialSeal-公章、ElectronicReceiptSpecialStamp-电子回单专用章)*/
type: string;
}
/**CompanyPlatformSealCreateVO*/
export interface CompanyPlatformSealCreateVO {
/**(必填)图片地址*/
picUrl: string;
/**(必填)印章ID*/
sealId: string;
/**(必填)类型(OfficialSeal-公章、ElectronicReceiptSpecialStamp-电子回单专用章)*/
type: string;
}
/**CompanyQueryPageVO*/
export interface CompanyQueryPageVO {
/**公司名称*/
name: string;
/**组织id*/
orgId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**CompanyQueryVO*/
export interface CompanyQueryVO {
/**公司名称*/
name: string;
/**组织id*/
orgId: number;
}
/**CustomerUserVO*/
export interface CustomerUserVO {
/**email*/
email: string;
/**(必填)手机号码*/
mobilePhone: string;
/**(必填)姓名*/
name: string;
/**密码*/
password: string;
}
/**DepartmentVO*/
export interface DepartmentVO {
/**事业部ID*/
departmentId: number;
}
/**DictAddVO*/
export interface DictAddVO {
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
}
/**DictBaseVO*/
export interface DictBaseVO {
/**编码*/
code: string;
/**id*/
id: number;
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
/**类别名称*/
typeName: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**是否有效(Valid-有效、Invalid-无效)*/
valid: string;
}
/**DictItemKeyQueryVO*/
export interface DictItemKeyQueryVO {
/**关键字*/
key: string;
/**类型*/
type: string;
/**是否有效(Valid-有效、Invalid-无效)*/
valid: string;
}
/**DictListQueryVO*/
export interface DictListQueryVO {
/**需要查询的字典类型*/
types: string[];
}
/**DictTypeAddVO*/
export interface DictTypeAddVO {
/**编码*/
code: string;
/**名称*/
name: string;
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
/**DictTypeKeyQueryVO*/
export interface DictTypeKeyQueryVO {
/**关键字*/
key: string;
}
/**DictTypeQueryVO*/
export interface DictTypeQueryVO {
/**标签*/
tag: string;
/**(必填)类型*/
type: string;
/**是否有效(Valid-有效、Invalid-无效)*/
valid: string;
}
/**DictTypeUpdateVO*/
export interface DictTypeUpdateVO {
/**编码*/
code: string;
/**(必填)id*/
id: number;
/**名称*/
name: string;
}
/**DictTypeVO*/
export interface DictTypeVO {
/**编码*/
code: string;
/**id*/
id: number;
/**名称*/
name: string;
/**是否有效(Valid-有效、Invalid-无效)*/
valid: string;
}
/**DictUpdateVO*/
export interface DictUpdateVO {
/**编码*/
code: string;
/**(必填)id*/
id: number;
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
}
/**GetBackPasswordVO*/
export interface GetBackPasswordVO {
/**undefined*/
mobilePhone: string;
/**undefined*/
password: string;
/**undefined*/
smsCode: string;
}
/**JobBaseVO*/
export interface JobBaseVO {
/**(必填)编码*/
code: string;
/**数据权限(OrgLimit-员工组织数据权限、SelfLimit-员工个人数据权限、ChannelLimit-渠道数据权限、ChannelSelfLimit-渠道个人数据权限、CustomerLimit-客户数据权限)*/
dataLimit: string;
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
/**数据权限(OrgLimit-员工组织数据权限、SelfLimit-员工个人数据权限、ChannelLimit-渠道数据权限、ChannelSelfLimit-渠道个人数据权限、CustomerLimit-客户数据权限)*/
dataLimit: string;
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
/**数据权限(OrgLimit-员工组织数据权限、SelfLimit-员工个人数据权限、ChannelLimit-渠道数据权限、ChannelSelfLimit-渠道个人数据权限、CustomerLimit-客户数据权限)*/
dataLimit: string;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**岗位角色列表*/
jobRoleList: RoleVO[];
/**名称*/
name: string;
/**备注*/
remark: string;
/**特殊岗位*/
special: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
}
/**LoginUserTypeVO*/
export interface LoginUserTypeVO {
/**用户类型(Staff-员工、Channel-渠道、Customer-客户)*/
userType: string;
/**用户类型名称*/
userTypeName: string;
}
/**LoginUserVO*/
export interface LoginUserVO {
/**登录账号*/
account: string;
/**账号类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣、RestUser-外部接口调用)*/
accountType: string;
/**渠道商ID*/
channelId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户姓名*/
createUserName: string;
/**数据权限(OrgLimit-员工组织数据权限、SelfLimit-员工个人数据权限、ChannelLimit-渠道数据权限、ChannelSelfLimit-渠道个人数据权限、CustomerLimit-客户数据权限)*/
dataLimit: string;
/**已删除*/
deleted: number;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘、Other-其他)*/
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
/**当前登录用户类别(Staff-员工、Channel-渠道、Customer-客户)*/
loginUserType: string;
/**菜单列表*/
menuList: Resource[];
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
/**资源列表*/
resourceList: Resource[];
/**角色列表*/
roleList: Role[];
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
/**用户类别(Staff-员工、Channel-渠道、Customer-客户)*/
userType: string;
/**用户类别列表*/
userTypeList: LoginUserTypeVO[];
/**微信小程序端菜单列表*/
wechatAppMenuList: Resource[];
/**微信小程序端资源列表*/
wechatAppResourceList: Resource[];
/**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
workType: string;
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
/**OA呈字*/
oaChar: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**组织类型(Root-组织根节点、Company-公司、Department-事业部、Zone-战区、SmallZone-小战区、District-片区、Shop-门店、Group-店组)*/
orgType: string;
/**父组织id*/
parentId: number;
/**简称*/
shortName: string;
/**简称首字母*/
shortNameAbbr: string;
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
/**OA呈字*/
oaChar: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**父组织id*/
parentId: number;
/**简称*/
shortName: string;
/**简称首字母*/
shortNameAbbr: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
}
/**OrgLevelTreeVO*/
export interface OrgLevelTreeVO {
/**公司id*/
companyId: number;
/**公司名称*/
companyName: string;
/**公司OA呈字*/
companyOaChar: string;
/**公司简称*/
companyShortName: string;
/**公司简称首字母*/
companyShortNameAbbr: string;
/**事业部id*/
departmentId: number;
/**事业部名称*/
departmentName: string;
/**事业部OA呈字*/
departmentOaChar: string;
/**事业部简称*/
departmentShortName: string;
/**事业部简称首字母*/
departmentShortNameAbbr: string;
/**片区id*/
districtId: number;
/**片区名称*/
districtName: string;
/**店组id*/
groupId: number;
/**店组名称*/
groupName: string;
/**组织层级*/
level: number;
/**组织id*/
orgId: number;
/**组织名称*/
orgName: string;
/**组织类型(Root-组织根节点、Company-公司、Department-事业部、Zone-战区、SmallZone-小战区、District-片区、Shop-门店、Group-店组)*/
orgType: string;
/**门店id*/
shopId: number;
/**门店名称*/
shopName: string;
/**小战区id*/
smallZoneId: number;
/**小战区名称*/
smallZoneName: string;
/**战区id*/
zoneId: number;
/**战区名称*/
zoneName: string;
}
/**OrgMinVO*/
export interface OrgMinVO {
/**id*/
id: number;
/**是否为末级节点*/
lastNodeFlag: boolean;
/**名称*/
name: string;
/**组织类型(Root-组织根节点、Company-公司、Department-事业部、Zone-战区、SmallZone-小战区、District-片区、Shop-门店、Group-店组)*/
orgType: string;
/**父组织id*/
parentId: number;
/**是否具有权限*/
permissionFlag: boolean;
}
/**OrgQueryVO*/
export interface OrgQueryVO {
/**部门分类(Business-营业线、Function-职能线)*/
departmentType: string;
/**名称*/
name: string;
/**组织类型(Root-组织根节点、Company-公司、Department-事业部、Zone-战区、SmallZone-小战区、District-片区、Shop-门店、Group-店组)*/
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
/**OrgRecursionQueryVO*/
export interface OrgRecursionQueryVO {
/**id*/
id: number;
/**名称*/
name: string;
/**组织类型(Root-组织根节点、Company-公司、Department-事业部、Zone-战区、SmallZone-小战区、District-片区、Shop-门店、Group-店组)*/
orgType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
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
/**OA呈字*/
oaChar: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**父组织id*/
parentId: number;
/**简称*/
shortName: string;
/**简称首字母*/
shortNameAbbr: string;
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
/**OA呈字*/
oaChar: string;
/**开业日期(yyyy-MM-dd)*/
openDate: string;
/**组织类型(Root-组织根节点、Company-公司、Department-事业部、Zone-战区、SmallZone-小战区、District-片区、Shop-门店、Group-店组)*/
orgType: string;
/**父组织id*/
parentId: number;
/**父组织名称*/
parentOrgName: string;
/**简称*/
shortName: string;
/**简称首字母*/
shortNameAbbr: string;
/**状态(Valid-有效、Invalid-无效)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
}
/**ParamDefine*/
export interface ParamDefine {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**默认值*/
defaultValue: string;
/**已删除*/
deleted: number;
/**是否全局参数*/
globalFlag: number;
/**ID*/
id: number;
/**模块(System-系统管理、Customer-客户管理、Developer-开发商管理、Channel-渠道管理、Contract-合同管理、Project-项目管理、Deal-成交管理、Finance-财务管理、UnionPay-银联支付管理、Payoff-结佣付款管理、MyData-明源数据处理、Apply-请款管理、MySync-明源数据同步、Exteral-外部接口、Document-文件处理、QuratzJob-定时调度、Mes-消息处理)*/
module: string;
/**参数编码*/
paramCode: string;
/**参数名称*/
paramName: string;
/**描述*/
remark: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ParamDefineCodeOrgQueryVO*/
export interface ParamDefineCodeOrgQueryVO {
/**模块(System-系统管理、Customer-客户管理、Developer-开发商管理、Channel-渠道管理、Contract-合同管理、Project-项目管理、Deal-成交管理、Finance-财务管理、UnionPay-银联支付管理、Payoff-结佣付款管理、MyData-明源数据处理、Apply-请款管理、MySync-明源数据同步、Exteral-外部接口、Document-文件处理、QuratzJob-定时调度、Mes-消息处理)*/
module: string;
/**组织id*/
orgId: number;
/**参数编码*/
paramCode: string;
/**是否使用全局参数值(默认为true)*/
userGlobalValue: boolean;
}
/**ParamDefineCodeQueryVO*/
export interface ParamDefineCodeQueryVO {
/**模块(System-系统管理、Customer-客户管理、Developer-开发商管理、Channel-渠道管理、Contract-合同管理、Project-项目管理、Deal-成交管理、Finance-财务管理、UnionPay-银联支付管理、Payoff-结佣付款管理、MyData-明源数据处理、Apply-请款管理、MySync-明源数据同步、Exteral-外部接口、Document-文件处理、QuratzJob-定时调度、Mes-消息处理)*/
module: string;
/**参数编码*/
paramCode: string;
}
/**ParamDefineOrg*/
export interface ParamDefineOrg {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**参数定义ID*/
defineId: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**组织ID*/
orgId: number;
/**参数值*/
paramValue: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ResetPasswordVO*/
export interface ResetPasswordVO {
/**(必填)id*/
id: number;
/**(必填)密码*/
password: string;
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
/**顺序*/
seq: number;
/**终端类型(Pc-Pc端、WechatApp-微信小程序)*/
terminalType: string;
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
/**顺序*/
seq: number;
/**(必填)类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**url*/
url: string;
}
/**ResourceMinVO*/
export interface ResourceMinVO {
/**编码*/
code: string;
/**图标*/
icon: string;
/**id*/
id: number;
/**名称*/
name: string;
/**父资源id*/
parentId: number;
/**顺序*/
seq: number;
/**类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**URL*/
url: string;
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
/**终端类型(Pc-Pc端、WechatApp-微信小程序)*/
terminalType: string;
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
/**顺序*/
seq: number;
/**(必填)类型(Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素)*/
type: string;
/**url*/
url: string;
}
/**ResourceUserQueryVO*/
export interface ResourceUserQueryVO {
/**关键字*/
key: string;
/**终端类型(Pc-Pc端、WechatApp-微信小程序)*/
terminalType: string;
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
/**顺序*/
seq: number;
/**终端类型(Pc-Pc端、WechatApp-微信小程序)*/
terminalType: string;
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
/**备注*/
remark: string;
/**特殊角色*/
special: number;
/**角色类别(ResourceGroup-资源组、JobRole-岗位角色)*/
type: string;
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
/**备注*/
remark: string;
/**特殊角色*/
special: number;
/**角色类别(ResourceGroup-资源组、JobRole-岗位角色)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**更新用户姓名*/
updateUserName: string;
}
/**SalesFileStream*/
export interface SalesFileStream {
/**字节*/
bytes: string;
/**文件名*/
fileName: string;
/**阿里巴巴字体 1,2,3,4,5*/
fontstyle: number;
/**字体大小*/
size: number;
/**标题*/
title: string;
}
/**SendSmsCodeCheckVO*/
export interface SendSmsCodeCheckVO {
/**undefined*/
mobilePhone: string;
/**undefined*/
smsCode: string;
/**undefined*/
smsCodeType: string;
}
/**SendSmsCodeVO*/
export interface SendSmsCodeVO {
/**undefined*/
mobilePhone: string;
/**undefined*/
smsCodeType: string;
}
/**SystemParamVO*/
export interface SystemParamVO {
/**api域名*/
apiDomain: string;
/**客户端ip*/
clientIP: string;
/**当前环境*/
env: string;
/**当前环境名称*/
envName: string;
/**文件域名*/
fileDomain: string;
/**h5域名*/
h5Domain: string;
/**pc域名*/
pcDomain: string;
/**协议*/
protocol: string;
}
/**UserBaseVO*/
export interface UserBaseVO {
/**登录账号*/
account: string;
/**账号类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣、RestUser-外部接口调用)*/
accountType: string;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘、Other-其他)*/
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
/**角色id数组*/
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
/**账号类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣、RestUser-外部接口调用)*/
accountType: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘、Other-其他)*/
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
/**用户类别(Staff-员工、Channel-渠道、Customer-客户)*/
userType: string;
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
/**账号类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣、RestUser-外部接口调用)*/
accountType: string;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘、Other-其他)*/
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
/**账号类型(Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣、RestUser-外部接口调用)*/
accountType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**创建用户姓名*/
createUserName: string;
/**数据权限(OrgLimit-员工组织数据权限、SelfLimit-员工个人数据权限、ChannelLimit-渠道数据权限、ChannelSelfLimit-渠道个人数据权限、CustomerLimit-客户数据权限)*/
dataLimit: string;
/**已删除*/
deleted: number;
/**email*/
email: string;
/**员工工号*/
employeeCode: string;
/**雇员状态(On-在职、Leave-离职)*/
employeeStatus: string;
/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘、Other-其他)*/
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
/**用户类别(Staff-员工、Channel-渠道、Customer-客户)*/
userType: string;
/**职能类别(FrontLine-一线、NotFrontLine-非一线)*/
workType: string;
}
/**WxCodeVo*/
export interface WxCodeVo {
/**undefined*/
uuid: string;
}
/**WxTokenVo*/
export interface WxTokenVo {
/**(必填)encryptedData*/
encryptedData: string;
/**(必填)iv*/
iv: string;
/**(必填)uuid*/
uuid: string;
}
