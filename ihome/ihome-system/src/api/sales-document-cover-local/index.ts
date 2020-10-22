/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-10-20 4:19:51 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-document-cover-local"
/**文档转换(上传)*/
export async function post_conver_local (d?: any) {
return await request.post< any,any> (basePath+'/conver/local', d)
}
/**文档转换(URL)*/
export async function post_conver_online (d?: any) {
return await request.post< object,object> (basePath+'/conver/online', d)
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
/**ConverParam*/
export interface ConverParam {
/**数据*/
data: object;
/**undefined*/
fid: number;
/**备注信息*/
mes: string;
/**URL地址*/
sourcePath: string;
/**印章*/
stamperUrl: string;
/**生成地址*/
targetPath: string;
/**水印文字*/
watermarkWord: string;
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
