/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-26 6:28:43 ├F10: PM┤
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
