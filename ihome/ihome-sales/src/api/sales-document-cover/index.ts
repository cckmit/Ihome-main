/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-17 12:09:09 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/sales-document-cover"
/**签署回调通知地址*/
export async function post_eqianbao_callback_noticeDeveloperUrl (d?: any) {
return await request.post< boolean,boolean> (basePath+'/eqianbao/callback/noticeDeveloperUrl', d)
}
/**认证结束后异步通知地址*/
export async function post_eqianbao_callback_notifyUrl (d?: any) {
return await request.post< boolean,boolean> (basePath+'/eqianbao/callback/notifyUrl', d)
}
/**E签宝-个人实名认证*/
export async function post_eqianbao_sign_accounts_certification (d?: any) {
return await request.post< EqianbaoAccountCertificationResult,EqianbaoAccountCertificationResult> (basePath+'/eqianbao/sign/accounts/certification', d)
}
/**E签宝-个人实名认证-短信验证*/
export async function post_eqianbao_sign_accounts_certification_check (d?: any) {
return await request.post< boolean,boolean> (basePath+'/eqianbao/sign/accounts/certification/check', d)
}
/**E签宝-个人账号创建(返回账号ID)*/
export async function post_eqianbao_sign_accounts_create (d?: any) {
return await request.post< object,object> (basePath+'/eqianbao/sign/accounts/create', d)
}
/**E签宝-个人账号查询(按照用户ID查询)*/
export async function get_eqianbao_sign_accounts_user__userId (d?: any) {
return await request.get<EqianbaoAccountInfoResult,EqianbaoAccountInfoResult>(basePath+'/eqianbao/sign/accounts/user/{userId}', { params: d })
}
/**E签宝-个人账号查询(按照第三方账户ID查询)*/
export async function get_eqianbao_sign_accounts__accountId (d?: any) {
return await request.get<EqianbaoAccountInfoResult,EqianbaoAccountInfoResult>(basePath+'/eqianbao/sign/accounts/{accountId}', { params: d })
}
/**E签宝-添加客户签署*/
export async function post_eqianbao_sign_addCustomerSigning (d?: any) {
return await request.post< EqianbaoCustomerSigningAddResult,EqianbaoCustomerSigningAddResult> (basePath+'/eqianbao/sign/addCustomerSigning', d)
}
/**E签宝-添加平台自动签署*/
export async function post_eqianbao_sign_addPlatformSigning (d?: any) {
return await request.post< EqianbaoPlatformSigningAddResult,EqianbaoPlatformSigningAddResult> (basePath+'/eqianbao/sign/addPlatformSigning', d)
}
/**E签宝-归档*/
export async function get_eqianbao_sign_archive__flowId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/eqianbao/sign/archive/{flowId}', { params: d })
}
/**E签宝-文件合同上传*/
export async function get_eqianbao_sign_fileUpload__fileId (d?: any) {
return await request.get<EqianbaoFileUploadResult,EqianbaoFileUploadResult>(basePath+'/eqianbao/sign/fileUpload/{fileId}', { params: d })
}
/**E签宝-发起签署*/
export async function post_eqianbao_sign_initiateSigning (d?: any) {
return await request.post< EqianbaoInitiateSigningResult,EqianbaoInitiateSigningResult> (basePath+'/eqianbao/sign/initiateSigning', d)
}
/**E签宝-注销个人账号-根据 accountId*/
export async function get_eqianbao_sign_logout__accountId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/eqianbao/sign/logout/{accountId}', { params: d })
}
/**E签宝-注销个人账号-根据 accountId*/
export async function get_eqianbao_sign_logout__userId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/eqianbao/sign/logout/{userId}', { params: d })
}
/**E签宝-刷新token*/
export async function get_eqianbao_sign_refreshToken (d?: any) {
return await request.get<EqianbaoToken,EqianbaoToken>(basePath+'/eqianbao/sign/refreshToken', { params: d })
}
/**E签宝-获取签署地址*/
export async function post_eqianbao_sign_signingAddress (d?: any) {
return await request.post< EqianbaoSigningAddressResult,EqianbaoSigningAddressResult> (basePath+'/eqianbao/sign/signingAddress', d)
}
/**E签宝-流程文档下载*/
export async function get_eqianbao_sign_sin__flowId_documents (d?: any) {
return await request.get<EqianbaoDocumentDownloadResult,EqianbaoDocumentDownloadResult>(basePath+'/eqianbao/sign/sin/{flowId}/documents', { params: d })
}
/**E签宝-获取TOKEN信息*/
export async function get_eqianbao_sign_token (d?: any) {
return await request.get<EqianbaoToken,EqianbaoToken>(basePath+'/eqianbao/sign/token', { params: d })
}
/**download*/
export async function get_excel_download (d?: any) {
return await request.get<any,any>(basePath+'/excel/download', { params: d })
}
/**downloada*/
export async function get_excel_downloada (d?: any) {
return await request.get<any,any>(basePath+'/excel/downloada', { params: d })
}
/**test*/
export async function get_excel_test (d?: any) {
return await request.get<FileResourceVo,FileResourceVo>(basePath+'/excel/test', { params: d })
}
/**upload*/
export async function post_excel_upload (d?: any) {
return await request.post< object,object> (basePath+'/excel/upload', d)
}
/**batchUploadAndZip*/
export async function post_file_batchUploadAndZip (d?: any) {
return await request.post< FileResourceVo,FileResourceVo> (basePath+'/file/batchUploadAndZip', d)
}
/**文件浏览*/
export async function get_file_browse__fid (d?: any) {
return await request.get<any,any>(basePath+'/file/browse/{fid}', { params: d })
}
/**检测文件是否存在*/
export async function get_file_checkfile (d?: any) {
return await request.get<boolean,boolean>(basePath+'/file/checkfile', { params: d })
}
/**文件批量下载*/
export async function post_file_download_batch (d?: any) {
return await request.post< any,any> (basePath+'/file/download/batch', d)
}
/**文件批量下载(表单)*/
export async function post_file_download_batch_form (d?: any) {
return await request.post< any,any> (basePath+'/file/download/batch/form', d)
}
/**文件下载*/
export async function get_file_download__fid (d?: any) {
return await request.get<FileSystemResource,FileSystemResource>(basePath+'/file/download/{fid}', { params: d })
}
/**getFile*/
export async function get_file_getFile__fileId (d?: any) {
return await request.get<FileWithByteVo,FileWithByteVo>(basePath+'/file/getFile/{fileId}', { params: d })
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
/**文件上传(字节)*/
export async function post_file_uploadByte (d?: any) {
return await request.post< FileResourceVo,FileResourceVo> (basePath+'/file/uploadByte', d)
}
/**URL上传*/
export async function post_file_uploadurl (d?: any) {
return await request.post< FileResourceVo,FileResourceVo> (basePath+'/file/uploadurl', d)
}
/**文件替换*/
export async function get_file__fid_replace (d?: any) {
return await request.get<boolean,boolean>(basePath+'/file/{fid}/replace', { params: d })
}
/**freemarker模板列表*/
export async function post_fileTemplate_list (d?: any) {
return await request.post< any,any> (basePath+'/fileTemplate/list', d)
}
/**freemarker模板上传*/
export async function post_fileTemplate_upload (d?: any) {
return await request.post< string,string> (basePath+'/fileTemplate/upload', d)
}
/**删除模板*/
export async function delete_fileTemplate__templateId (d?: any) {
return await request.post< boolean,boolean> (basePath+'/fileTemplate/{templateId}', d)
}
/**生成水印*/
export async function get_image_thumbnail_watermark__imageid (d?: any) {
return await request.get<any,any>(basePath+'/image/thumbnail/watermark/{imageid}', { params: d })
}
/**生成缩略图*/
export async function get_image_thumbnail__imageid__width__height (d?: any) {
return await request.get<any,any>(basePath+'/image/thumbnail/{imageid}/{width}/{height}', { params: d })
}
/**PDF添加水印*/
export async function get_pdf_addWatermark__fileid (d?: any) {
return await request.get<FileResultVo,FileResultVo>(basePath+'/pdf/addWatermark/{fileid}', { params: d })
}
/**freemarker 转 PDF*/
export async function post_pdf_ftlToPdf (d?: any) {
return await request.post< FileResultVo,FileResultVo> (basePath+'/pdf/ftlToPdf', d)
}
/**freemarker 转 PDF 浏览*/
export async function post_pdf_ftlToPdf_brow (d?: any) {
return await request.post< any,any> (basePath+'/pdf/ftlToPdf/brow', d)
}
/**office 转 PDF (上传文件转换模式)*/
export async function post_pdf_officeToPdf (d?: any) {
return await request.post< FileResultVo,FileResultVo> (basePath+'/pdf/officeToPdf', d)
}
/**office 转 PDF (文件ID转换模式)*/
export async function get_pdf_officeToPdf__fileid (d?: any) {
return await request.get<FileResultVo,FileResultVo>(basePath+'/pdf/officeToPdf/{fileid}', { params: d })
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
/**EqianbaoAccountCertificationCheckParam*/
export interface EqianbaoAccountCertificationCheckParam {
/**(必填)用户收到的6位数值验证码*/
authcode: string;
/**(必填)认证流程Id*/
flowId: string;
}
/**EqianbaoAccountCertificationParam*/
export interface EqianbaoAccountCertificationParam {
/**(必填)待认证的e签宝账号id*/
accountId: string;
/**对接方业务上下文id，将在异步通知及跳转时携带返回对接方*/
contextId: string;
/**(必填)手机号,仅限中国大陆3大运营商开通的手机号*/
mobileNo: string;
/**是否允许账号重复实名（默认允许重复实名)*/
repetition: boolean;
}
/**EqianbaoAccountCertificationResult*/
export interface EqianbaoAccountCertificationResult {
/**实名流程Id*/
flowId: string;
}
/**EqianbaoAccountCreateParam*/
export interface EqianbaoAccountCreateParam {
/**联系方式，邮箱地址*/
email: string;
/**(必填)身份证*/
idNumber: string;
/**(必填)联系方式，手机号码*/
mobile: string;
/**(必填)姓名*/
name: string;
/**(必填)第三方平台的用户id*/
thirdPartyUserId: string;
}
/**EqianbaoAccountInfoResult*/
export interface EqianbaoAccountInfoResult {
/**个人账号id*/
accountId: string;
/**联系方式，邮箱地址*/
email: string;
/**证件号*/
idNumber: string;
/**证件类型*/
idType: string;
/**联系方式，手机号码*/
mobile: string;
/**姓名*/
name: string;
/**实名认证状态 true-已实名 false-未实名*/
status: boolean;
/**第三方平台的用户id*/
thirdPartyUserId: string;
}
/**EqianbaoCustomerSigningAddParam*/
export interface EqianbaoCustomerSigningAddParam {
/**(必填)流程ID*/
flowId: string;
/**(必填)客户签署区*/
signAreas: EqianbaoPosBeanParam[];
/**(必填)签署人账号*/
signerAccountId: string;
}
/**EqianbaoCustomerSigningAddResult*/
export interface EqianbaoCustomerSigningAddResult {
/**E签宝账号ID*/
accountId: string;
/**文件ID*/
fileId: string;
/**签署区id*/
signfieldId: string;
}
/**EqianbaoDocumentDownloadDocResult*/
export interface EqianbaoDocumentDownloadDocResult {
/**文件ID*/
fileId: string;
/**文件名*/
fileName: string;
/**文件地址*/
fileUrl: string;
}
/**EqianbaoDocumentDownloadResult*/
export interface EqianbaoDocumentDownloadResult {
/**合同文件结果集*/
docs: EqianbaoDocumentDownloadDocResult[];
}
/**EqianbaoFileUploadResult*/
export interface EqianbaoFileUploadResult {
/**E签宝文件Id*/
fileId: string;
/**文件直传地址, 可以重复使用，但是只能传一样的文件，有效期一小时*/
uploadUrl: string;
}
/**EqianbaoInitiateSigningDocParam*/
export interface EqianbaoInitiateSigningDocParam {
/**(必填)E签宝文件ID*/
eqianbaoFileId: string;
/**(必填)文件名*/
eqianbaoFileName: string;
}
/**EqianbaoInitiateSigningParam*/
export interface EqianbaoInitiateSigningParam {
/**(必填)客户签署区*/
eqianbaoCustomers: EqianbaoPosBeanParam[];
/**(必填)签署文档*/
eqianbaoDocs: EqianbaoInitiateSigningDocParam[];
/**平台自动签署区*/
eqianbaoPlats: EqianbaoPosBeanParam[];
/**(必填)合同类型*/
eqianbaoType: string;
/**平台签章ID*/
platformSealId: string;
/**签署人账号*/
signerAccountId: string;
}
/**EqianbaoInitiateSigningResult*/
export interface EqianbaoInitiateSigningResult {
/**流程ID*/
flowId: string;
}
/**EqianbaoNoticeDeveloperParam*/
export interface EqianbaoNoticeDeveloperParam {
/**签署人账号ID*/
accountId: string;
/**业务类型 SIGN_FLOW_UPDATE(签署完成通知) SIGN_FLOW_FINISH(流程结束通知)*/
action: string;
/**签署任务发起时间 格式yyyy-MM-dd HH:mm:ss(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**签署任务结束时间 格式yyyy-MM-dd HH:mm:ss(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**流程ID*/
flowId: string;
/**任务状态 2-已完成: 所有签署人完成签署；3-已撤销: 发起方撤销签署任务；5-已过期: 签署截止日到期后触发；7-已拒签*/
flowStatus: string;
/**签署人顺序*/
order: number;
/**拒签或失败时，附加的原因描述*/
resultDescription: string;
/**签署结果 2:签署完成 3:失败 4:拒签*/
signResult: number;
/**签署时间或拒签时间 格式yyyy-MM-dd HH:MM:SS(yyyy-MM-dd HH:mm:ss)*/
signTime: string;
/**当流程异常结束时，附加终止原因描述*/
statusDescription: string;
/**订单号*/
thirdOrderNo: string;
/**时间戳*/
timestamp: number;
}
/**EqianbaoNotifyUrlParam*/
export interface EqianbaoNotifyUrlParam {
/**个人账户id，核身认证时为nul*/
accountId: string;
/**业务上下文Id*/
contextId: string;
/**个人认证流程id*/
flowId: string;
/**历史版本兼容字段，新用户忽略，等价于flowId*/
serviceId: string;
/**历史版本兼容字段，新用户忽略，等价于success*/
status: boolean;
/**认证是否成功. true - 成功; false - 失败*/
success: boolean;
/**认证结果校验码,用于串联e签宝其他业务*/
verifycode: string;
}
/**EqianbaoPlatformSigningAddParam*/
export interface EqianbaoPlatformSigningAddParam {
/**(必填)平台自动签署区*/
eqianbaoPlats: EqianbaoPosBeanParam[];
/**(必填)流程ID*/
flowId: string;
/**(必填)平台签章ID*/
platformSealId: string;
}
/**EqianbaoPlatformSigningAddResult*/
export interface EqianbaoPlatformSigningAddResult {
/**E签宝账号ID*/
accountId: string;
/**文件ID*/
fileId: string;
/**签署区id*/
signfieldId: string;
}
/**EqianbaoPosBeanParam*/
export interface EqianbaoPosBeanParam {
/**(必填)文件ID*/
eqianbaoFileId: string;
/**(必填)X轴坐标 日期*/
posDateX: number;
/**(必填)y轴坐标 日期*/
posDateY: number;
/**页码 默认1 */
posPage: string;
/**(必填)X轴坐标 签章*/
posX: number;
/**(必填)y轴坐标 签章*/
posY: number;
}
/**EqianbaoSigningAddressParam*/
export interface EqianbaoSigningAddressParam {
/**签署人账号id*/
accountId: string;
/**流程id*/
flowId: string;
/**链接类型: 0-签署链接;1-预览链接;*/
urlType: number;
}
/**EqianbaoSigningAddressResult*/
export interface EqianbaoSigningAddressResult {
/**短链地址（30天有效）*/
shortUrl: string;
/**长链地址(永久有效)*/
url: string;
}
/**EqianbaoToken*/
export interface EqianbaoToken {
/**TOKEN_KEY*/
key: string;
/**剩余有效时间(分钟)*/
timeOut: string;
/**TOKEN_VALUE*/
value: string;
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
/**FileBatchUploadParam*/
export interface FileBatchUploadParam {
/**文件ID数组*/
fileIds: string[];
/**文件名称*/
fileName: string;
}
/**FileDownloadBatchFormParam*/
export interface FileDownloadBatchFormParam {
/**文件ID数组*/
fileIds: string[];
/**文件流数组*/
salesFileStreams: SalesFileStream[];
}
/**FileDownloadBatchParam*/
export interface FileDownloadBatchParam {
/**文件ID数组*/
fileIds: string[];
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
fileId: string;
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
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**FileResultVo*/
export interface FileResultVo {
/**undefined*/
fid: string;
/**返回信息*/
mes: string;
/**生成地址*/
targetPath: string;
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
/**FileTemplateQueryVO*/
export interface FileTemplateQueryVO {
/**文件ID*/
fileId: string;
/**模块名称*/
moduleName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**模板名称*/
templateName: string;
}
/**FileTemplateVO*/
export interface FileTemplateVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件ID*/
fileId: string;
/**undefined*/
id: number;
/**模块名称*/
moduleName: string;
/**模板名称*/
templateName: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**FileWithByteVo*/
export interface FileWithByteVo {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**文件字节数组*/
fileData: string;
/**undefined*/
fileId: string;
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
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**FtlToPdfParam*/
export interface FtlToPdfParam {
/**模板数据*/
data: object;
/**文件ID*/
fileId: string;
}
/**InputStream*/
export interface InputStream {
}
/**OutputStream*/
export interface OutputStream {
}
/**SalesFileStream*/
export interface SalesFileStream {
/**字节*/
bytes: string;
/**文件名*/
fileName: string;
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
