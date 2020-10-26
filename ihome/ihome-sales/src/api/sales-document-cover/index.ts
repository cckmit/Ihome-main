/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-26 6:27:56 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/developer"
/**保存新增开发商信息*/
export async function post_company_add (d?: any) {
return await request.post< number,number> (basePath+'/company/add', d)
}
/**审核开发商*/
export async function post_company_audit (d?: any) {
return await request.post< number,number> (basePath+'/company/audit', d)
}
/**删除开发商*/
export async function get_company_delete__id (d?: any) {
return await request.get<number,number>(basePath+'/company/delete/{id}', { params: d })
}
/**开发商详情*/
export async function get_company_get__id (d?: any) {
return await request.get<CompanyEditDetailVO,CompanyEditDetailVO>(basePath+'/company/get/{id}', { params: d })
}
/**开发商列表*/
export async function post_company_getList (d?: any) {
return await request.post< PageModel<CompanyListVO>,PageModel<CompanyListVO>> (basePath+'/company/getList', d)
}
/**开发商列表(不分页)*/
export async function post_company_listAll (d?: any) {
return await request.post< CompanyListVO[],CompanyListVO[]> (basePath+'/company/listAll', d)
}
/**撤回开发商*/
export async function post_company_retract (d?: any) {
return await request.post< number,number> (basePath+'/company/retract', d)
}
/**变更信息*/
export async function post_company_update (d?: any) {
return await request.post< number,number> (basePath+'/company/update', d)
}
/**修改开发商信息*/
export async function post_company_updateDraft (d?: any) {
return await request.post< number,number> (basePath+'/company/updateDraft', d)
}
/**变更录入人*/
export async function post_company_updateInputUser (d?: any) {
return await request.post< number,number> (basePath+'/company/updateInputUser', d)
}
/**开发商操作日志列表*/
export async function get_companyLog_getAll__companyId (d?: any) {
return await request.get<CompanyLogDetailVO[],CompanyLogDetailVO[]>(basePath+'/companyLog/getAll/{companyId}', { params: d })
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
/**AuditVO*/
export interface AuditVO {
/**开发商ID*/
id: number;
/**审核结果*/
pass: boolean;
/**审核意见*/
reason: string;
}
/**CompanyAttachmentBaseVO*/
export interface CompanyAttachmentBaseVO {
/**文件ID*/
fileId: number;
/**类型(Licence-营业执照、BankLicence-开户许可证、Other-其他附件)*/
type: string;
}
/**CompanyBankBaseVO*/
export interface CompanyBankBaseVO {
/**开户银行*/
bank: string;
/**账户名称*/
name: string;
/**账户号码*/
number: string;
/**账号类型(Base-基本存款账户、Common-一般存款账户)*/
type: string;
}
/**CompanyBaseVO*/
export interface CompanyBaseVO {
/**(必填)住所*/
address: string;
/**附件列表*/
attachmentList: CompanyAttachmentBaseVO[];
/**账户信息*/
bankList: CompanyBankBaseVO[];
/**营业期限*/
businessTime: string;
/**(必填)注册资本*/
capital: string;
/**(必填)城市*/
city: string;
/**联系人信息*/
contactList: CompanyContactBaseVO[];
/**(必填)行政区*/
county: string;
/**(必填)统一社会信用代码*/
creditCode: string;
/**(必填)录入人*/
inputUser: number;
/**(必填)法人代表*/
legalPerson: string;
/**法人身份证*/
legalPersonId: string;
/**(必填)开发商名称*/
name: string;
/**(必填)省份*/
province: string;
/**企业概况*/
remark: string;
/**(必填)成立日期(yyyy-MM-dd)*/
setupTime: string;
/**(必填)简称*/
shortName: string;
/**状态(Draft-起草、WaitAuditByBranchHead-待分公司业管审核、Audited-已审核)*/
status: string;
/**(必填)公司类型(CompanyLimited-有限责任公司（自然人投资或控股）)*/
type: string;
}
/**CompanyContactBaseVO*/
export interface CompanyContactBaseVO {
/**联系人姓名*/
contactName: string;
/**联系电话*/
contactNum: string;
/**电子邮箱*/
email: string;
}
/**CompanyEditAuditedDatalVO*/
export interface CompanyEditAuditedDatalVO {
/**(必填)住所*/
address: string;
/**附件列表*/
attachmentList: CompanyAttachmentBaseVO[];
/**账户信息*/
bankList: CompanyBankBaseVO[];
/**营业期限*/
businessTime: string;
/**(必填)注册资本*/
capital: string;
/**(必填)城市*/
city: string;
/**联系人信息*/
contactList: CompanyContactBaseVO[];
/**(必填)行政区*/
county: string;
/**(必填)统一社会信用代码*/
creditCode: string;
/**开发商ID*/
id: number;
/**(必填)录入人*/
inputUser: number;
/**(必填)法人代表*/
legalPerson: string;
/**法人身份证*/
legalPersonId: string;
/**(必填)开发商名称*/
name: string;
/**(必填)省份*/
province: string;
/**变更原因*/
reason: string;
/**企业概况*/
remark: string;
/**(必填)成立日期(yyyy-MM-dd)*/
setupTime: string;
/**(必填)简称*/
shortName: string;
/**状态(Draft-起草、WaitAuditByBranchHead-待分公司业管审核、Audited-已审核)*/
status: string;
/**(必填)公司类型(CompanyLimited-有限责任公司（自然人投资或控股）)*/
type: string;
}
/**CompanyEditDetailVO*/
export interface CompanyEditDetailVO {
/**(必填)住所*/
address: string;
/**附件列表*/
attachmentList: CompanyAttachmentBaseVO[];
/**账户信息*/
bankList: CompanyBankBaseVO[];
/**营业期限*/
businessTime: string;
/**(必填)注册资本*/
capital: string;
/**(必填)城市*/
city: string;
/**联系人信息*/
contactList: CompanyContactBaseVO[];
/**(必填)行政区*/
county: string;
/**(必填)统一社会信用代码*/
creditCode: string;
/**开发商ID*/
id: number;
/**(必填)录入人*/
inputUser: number;
/**(必填)法人代表*/
legalPerson: string;
/**法人身份证*/
legalPersonId: string;
/**(必填)开发商名称*/
name: string;
/**(必填)省份*/
province: string;
/**企业概况*/
remark: string;
/**(必填)成立日期(yyyy-MM-dd)*/
setupTime: string;
/**(必填)简称*/
shortName: string;
/**状态(Draft-起草、WaitAuditByBranchHead-待分公司业管审核、Audited-已审核)*/
status: string;
/**(必填)公司类型(CompanyLimited-有限责任公司（自然人投资或控股）)*/
type: string;
}
/**CompanyListVO*/
export interface CompanyListVO {
/**城市*/
city: string;
/**行政区*/
county: string;
/**统一社会信用代码*/
creditCode: string;
/**开发商ID*/
id: number;
/**录入人*/
inputUser: number;
/**公司名称*/
name: string;
/**省份*/
province: string;
/**状态(Draft-起草、WaitAuditByBranchHead-待分公司业管审核、Audited-已审核)*/
status: string;
}
/**CompanyLogDetailVO*/
export interface CompanyLogDetailVO {
/**开发商ID*/
companyId: number;
/**处理结果*/
operateResult: string;
/**处理时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作*/
operation: string;
/**处理人*/
operator: number;
/**备注*/
remark: string;
}
/**CompanyQueryAllVO*/
export interface CompanyQueryAllVO {
/**公司名称*/
name: string;
}
/**CompanyQueryVO*/
export interface CompanyQueryVO {
/**城市*/
city: string;
/**行政区*/
county: string;
/**统一社会信用代码*/
creditCode: string;
/**录入人*/
inputUser: number;
/**公司名称*/
name: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**省份*/
province: string;
/**状态(Draft-起草、WaitAuditByBranchHead-待分公司业管审核、Audited-已审核)*/
status: string;
}
/**RetractVO*/
export interface RetractVO {
/**开发商ID*/
id: number;
/**撤回原因*/
reason: string;
}
/**UpdateInputUserVO*/
export interface UpdateInputUserVO {
/**开发商ID*/
companyId: number[];
/**(必填)新录入人*/
inputUser: number;
}
/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-26 6:27:56 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/sales-document-cover"
/**freemarker 转 PDF*/
export async function post_conver_ftltopdf (d?: any) {
return await request.post< any,any> (basePath+'/conver/ftltopdf', d)
}
/**office 转 PDF (上传文件转换模式)*/
export async function post_conver_officetopdf (d?: any) {
return await request.post< any,any> (basePath+'/conver/officetopdf', d)
}
/**office 转 PDF (文件ID转换模式)*/
export async function get_conver_officetopdf__fileid (d?: any) {
return await request.get<l,l>(basePath+'/conver/officetopdf/{fileid}', { params: d })
}
/**PDF添加水印*/
export async function get_conver_watermark__fileid (d?: any) {
return await request.get<l,l>(basePath+'/conver/watermark/{fileid}', { params: d })
}
/**文件浏览*/
export async function get_file_browse__fid (d?: any) {
return await request.get<any,any>(basePath+'/file/browse/{fid}', { params: d })
}
/**文件下载*/
export async function get_file_download__fid (d?: any) {
return await request.get<FileSystemResource,FileSystemResource>(basePath+'/file/download/{fid}', { params: d })
}
/**文件信息*/
export async function get_file_info__fid (d?: any) {
return await request.get<FileResourceVo,FileResourceVo>(basePath+'/file/info/{fid}', { params: d })
}
/**文件删除*/
export async function get_file_remove__fid (d?: any) {
return await request.get<boolean,boolean>(basePath+'/file/remove/{fid}', { params: d })
}
/**文件上传*/
export async function post_file_upload (d?: any) {
return await request.post< object,object> (basePath+'/file/upload', d)
}
/**生成水印*/
export async function get_image_thumbnail_watermark__imageid (d?: any) {
return await request.get<any,any>(basePath+'/image/thumbnail/watermark/{imageid}', { params: d })
}
/**图片原型*/
export async function get_image_thumbnail__imageid (d?: any) {
return await request.get<any,any>(basePath+'/image/thumbnail/{imageid}', { params: d })
}
/**生成缩略图*/
export async function get_image_thumbnail__imageid__width__height (d?: any) {
return await request.get<any,any>(basePath+'/image/thumbnail/{imageid}/{width}/{height}', { params: d })
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
/**File*/
export interface File {
/**undefined*/
absolute: boolean;
/**undefined*/
absoluteFile: File;
/**undefined*/
absolutePath: string;
/**undefined*/
canonicalFile: File;
/**undefined*/
canonicalPath: string;
/**undefined*/
directory: boolean;
/**undefined*/
file: boolean;
/**undefined*/
freeSpace: number;
/**undefined*/
hidden: boolean;
/**undefined*/
name: string;
/**undefined*/
parent: string;
/**undefined*/
parentFile: File;
/**undefined*/
path: string;
/**undefined*/
totalSpace: number;
/**undefined*/
usableSpace: number;
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
/**FileSystemResource*/
export interface FileSystemResource {
/**undefined*/
description: string;
/**undefined*/
file: File;
/**undefined*/
filename: string;
/**undefined*/
inputStream: InputStream;
/**undefined*/
open: boolean;
/**undefined*/
outputStream: OutputStream;
/**undefined*/
path: string;
/**undefined*/
readable: boolean;
/**undefined*/
uri: URI;
/**undefined*/
url: URL;
/**undefined*/
writable: boolean;
}
/**FtlToPdfParam*/
export interface FtlToPdfParam {
/**模板数据*/
data: object;
/**文件ID*/
fileId: number;
}
/**InputStream*/
export interface InputStream {
}
/**OutputStream*/
export interface OutputStream {
}
/**URI*/
export interface URI {
/**undefined*/
absolute: boolean;
/**undefined*/
authority: string;
/**undefined*/
fragment: string;
/**undefined*/
host: string;
/**undefined*/
opaque: boolean;
/**undefined*/
path: string;
/**undefined*/
port: number;
/**undefined*/
query: string;
/**undefined*/
rawAuthority: string;
/**undefined*/
rawFragment: string;
/**undefined*/
rawPath: string;
/**undefined*/
rawQuery: string;
/**undefined*/
rawSchemeSpecificPart: string;
/**undefined*/
rawUserInfo: string;
/**undefined*/
scheme: string;
/**undefined*/
schemeSpecificPart: string;
/**undefined*/
userInfo: string;
}
/**URL*/
export interface URL {
/**undefined*/
authority: string;
/**undefined*/
content: object;
/**undefined*/
defaultPort: number;
/**undefined*/
file: string;
/**undefined*/
host: string;
/**undefined*/
path: string;
/**undefined*/
port: number;
/**undefined*/
protocol: string;
/**undefined*/
query: string;
/**undefined*/
ref: string;
/**undefined*/
userInfo: string;
}
/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-26 6:27:56 ├F10: PM┤
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
/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-26 6:27:56 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/channel"
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
/**岗位*/
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
/**ID*/
id: number;
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
/**变更时间(yyyy-MM-dd)*/
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
/**变更时间(yyyy-MM-dd)*/
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
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
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
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**附件信息*/
channelGradeAttachments: ChannelGradeAttachment[];
/**渠道评级标准信息*/
channelGradeItems: ChannelGradeItem[];
/**渠道ID*/
channelId: number;
/**渠道类型(Platform-平台)*/
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
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**附件信息*/
channelGradeAttachmentChanges: ChannelGradeAttachmentChange[];
/**渠道评级标准信息*/
channelGradeItemChanges: ChannelGradeItemChange[];
/**渠道ID*/
channelId: number;
/**渠道类型(Platform-平台)*/
channelType: string;
/**业务开展城市*/
city: string;
/**城市等级(OneTierCity-一线城市、SecondTierCity-二线城市、ThirdTierCity-三线城市)*/
cityGrade: string;
/**事业部*/
departmentOrgId: number;
/**ID*/
id: number;
/**原渠道等级ID*/
oldGradeId: number;
/**1保存2提交*/
operateType: number;
/**业务开展省份*/
province: string;
/**是否特批入库(Yes-是、No-否)*/
special: string;
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
/**变更日期结束*/
changeTimeEnd: string;
/**变更日期开始*/
changeTimeStart: string;
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
/**变更时间(yyyy-MM-dd)*/
changeTime: string;
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
channelGrade: string;
/**附件信息*/
channelGradeAttachmentChanges: ChannelGradeAttachmentChange[];
/**渠道评级标准信息*/
channelGradeItemChanges: ChannelGradeItemChangeVO[];
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
/**ChannelGradeItemChangeVO*/
export interface ChannelGradeItemChangeVO {
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
/**渠道等级(BigPlatform-大平台、LargeIntermediary-大型中介、FirstPlatform-一级平台、MediumIntermediary-中型中介、SecondPlatform-二级平台、SmallIntermediary-小型中介)*/
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
/**渠道id数组*/
channelIds: number[];
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
