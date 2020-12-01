/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-1 10:42:09 ├F10: AM┤
import { request } from '@/api/base'
const basePath = "/sales-api/finance"
/**新增收款账号在线支付信息*/
export async function post_accountOnlinePay_add (d?: any) {
return await request.post< number,number> (basePath+'/accountOnlinePay/add', d)
}
/**添加公司收款账户*/
export async function post_bankAccount_add (d?: any) {
return await request.post< number,number> (basePath+'/bankAccount/add', d)
}
/**删除公司收款账户*/
export async function post_bankAccount_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/bankAccount/delete/{id}', d)
}
/**查询公司收款账户信息列表数据*/
export async function post_bankAccount_getList (d?: any) {
return await request.post< PageModel<BankAccountVO>,PageModel<BankAccountVO>> (basePath+'/bankAccount/getList', d)
}
/**修改公司收款账户*/
export async function post_bankAccount_update (d?: any) {
return await request.post< number,number> (basePath+'/bankAccount/update', d)
}
/**删除银行网点*/
export async function post_bankBranch_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/bankBranch/delete/{id}', d)
}
/**查询银行网点详情*/
export async function get_bankBranch_get__id (d?: any) {
return await request.get<BankBranchVO,BankBranchVO>(basePath+'/bankBranch/get/{id}', { params: d })
}
/**查询银行网点信息列表数据*/
export async function post_bankBranch_getList (d?: any) {
return await request.post< PageModel<BankBranchVO>,PageModel<BankBranchVO>> (basePath+'/bankBranch/getList', d)
}
/**(已实现)航天自动红冲-可批量*/
export async function post_invoice_autoHongChong (d?: any) {
return await request.post< string,string> (basePath+'/invoice/autoHongChong', d)
}
/**(已实现)航天自动开正票-可批量*/
export async function post_invoice_autoKaiPiao (d?: any) {
return await request.post< string,string> (basePath+'/invoice/autoKaiPiao', d)
}
/**(未实现)下载发票文件-可批量*/
export async function post_invoice_downloadFile (d?: any) {
return await request.post< number,number> (basePath+'/invoice/downloadFile', d)
}
/**(未实现)导出数据*/
export async function post_invoice_exportData (d?: any) {
return await request.post< number,number> (basePath+'/invoice/exportData', d)
}
/**[已实现]查询航天发票文件信息*/
export async function post_invoice_getHtFileInfo (d?: any) {
return await request.post< InvoiceBillHtPdfInfo,InvoiceBillHtPdfInfo> (basePath+'/invoice/getHtFileInfo', d)
}
/**(未实现)查询开票信息列表数据*/
export async function post_invoice_getList (d?: any) {
return await request.post< PageModel<InvoiceVO>,PageModel<InvoiceVO>> (basePath+'/invoice/getList', d)
}
/**(未实现)Excel导入历史发票信息*/
export async function post_invoice_importData (d?: any) {
return await request.post< number,number> (basePath+'/invoice/importData', d)
}
/**(实现中)手动开票*/
export async function post_invoice_manualKaiPiao (d?: any) {
return await request.post< string,string> (basePath+'/invoice/manualKaiPiao', d)
}
/**(未实现)查询开票详情*/
export async function post_invoice_queryInvoiceInfo (d?: any) {
return await request.post< InvoiceInfoVO,InvoiceInfoVO> (basePath+'/invoice/queryInvoiceInfo', d)
}
/**测试航天开票*/
export async function post_invoice_test (d?: any) {
return await request.post< number,number> (basePath+'/invoice/test', d)
}
/**(未实现)Excel导入开票基础数据*/
export async function post_invoiceBase_importData (d?: any) {
return await request.post< number,number> (basePath+'/invoiceBase/importData', d)
}
/**(未实现)下载航天发票文件-可批量*/
export async function post_invoiceBill_downloadFile (d?: any) {
return await request.post< number,number> (basePath+'/invoiceBill/downloadFile', d)
}
/**(未实现)查询航天发票信息列表数据*/
export async function post_invoiceBill_getList (d?: any) {
return await request.post< PageModel<InvoiceBillVO>,PageModel<InvoiceBillVO>> (basePath+'/invoiceBill/getList', d)
}
/**添加发票税率配置信息*/
export async function post_invoiceConfig_add (d?: any) {
return await request.post< number,number> (basePath+'/invoiceConfig/add', d)
}
/**删除发票税率配置信息*/
export async function post_invoiceConfig_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/invoiceConfig/delete/{id}', d)
}
/**查询发票税率配置信息详情*/
export async function get_invoiceConfig_get__id (d?: any) {
return await request.get<InvoiceConfigVO,InvoiceConfigVO>(basePath+'/invoiceConfig/get/{id}', { params: d })
}
/**查询公司收款账户信息列表数据*/
export async function post_invoiceConfig_getList (d?: any) {
return await request.post< PageModel<InvoiceConfigVO>,PageModel<InvoiceConfigVO>> (basePath+'/invoiceConfig/getList', d)
}
/**修改发票税率配置信息*/
export async function post_invoiceConfig_update (d?: any) {
return await request.post< number,number> (basePath+'/invoiceConfig/update', d)
}
/**查询收款列表*/
export async function post_payment_getList (d?: any) {
return await request.post< PageModel<PaymentVO>,PageModel<PaymentVO>> (basePath+'/payment/getList', d)
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
/**AccountOnlinePayAddVO*/
export interface AccountOnlinePayAddVO {
/**(必填)公司收款账号ID*/
accountId: number;
/**对账密码*/
checkPasswd: string;
/**(必填)对账账号*/
checkUser: string;
/**(必填)商户ID*/
merId: string;
/**(必填)秘钥*/
secret: string;
}
/**BankAccountAddVO*/
export interface BankAccountAddVO {
/**(必填)账户名称*/
accountName: string;
/**(必填)账号*/
accountNo: string;
/**(必填)账号类型(Basic-基本存款账户、General-一般存款账户)*/
accountType: string;
/**(必填)开户银行*/
branchName: string;
/**(必填)联行号*/
branchNo: string;
/**(必填)账户类别(MainAccount-主账号、SubAccount-分账号)*/
category: string;
/**(必填)公司主体ID*/
companyId: number;
}
/**BankAccountQueryVO*/
export interface BankAccountQueryVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**账号类型(Basic-基本存款账户、General-一般存款账户)*/
accountType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**BankAccountUpdateVO*/
export interface BankAccountUpdateVO {
/**(必填)账户名称*/
accountName: string;
/**(必填)账号*/
accountNo: string;
/**(必填)账号类型(Basic-基本存款账户、General-一般存款账户)*/
accountType: string;
/**(必填)开户银行*/
branchName: string;
/**(必填)联行号*/
branchNo: string;
/**(必填)账户类别(MainAccount-主账号、SubAccount-分账号)*/
category: string;
/**(必填)公司主体ID*/
companyId: number;
/**(必填)id*/
id: number;
}
/**BankAccountVO*/
export interface BankAccountVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**账号类型*/
accountType: string;
/**开户银行*/
branchName: string;
/**联行号*/
branchNo: string;
/**账户类别*/
category: string;
/**公司主体ID*/
companyId: number;
/**ID*/
id: number;
}
/**BankBranchQueryVO*/
export interface BankBranchQueryVO {
/**所属银行*/
bankName: string;
/**开户行*/
branchName: string;
/**联行号*/
branchNo: string;
/**城市*/
cityName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**省份*/
provinceName: string;
}
/**BankBranchVO*/
export interface BankBranchVO {
/**所属银行*/
bankName: string;
/**开户行*/
branchName: string;
/**联行号*/
branchNo: string;
/**城市*/
cityName: string;
/**ID*/
id: number;
/**省份*/
provinceName: string;
}
/**HandInvoiceBillVO*/
export interface HandInvoiceBillVO {
/**发票金额[含税]*/
billAmount: number;
/**发票代码*/
billCode: string;
/**发票号码*/
billNo: string;
/**发票抬头*/
billTitle: string;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）、Special_ZZ-增值税专用发票(纸质）)*/
billTypeCode: string;
/**附件ID*/
fileId: string;
/**附件名称*/
fileName: string;
/**附件类型*/
fileType: string;
/**附件链接*/
fileUrl: string;
/**开票票据信息ID*/
id: number;
/**开票日期(yyyy-MM-dd HH:mm:ss)*/
invoiceTime: string;
/**确认主营[不含税]*/
mainAmount: number;
/**NC凭证号*/
ncCode: string;
/**备注*/
remark: string;
/**税额[公式]*/
taxAmount: number;
}
/**InvoiceBaseVO*/
export interface InvoiceBaseVO {
/**商品分类编码*/
classifyCode: string;
/**公司名称*/
companyName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**开票员*/
handlers: string;
/**undefined*/
id: number;
/**收款员*/
payee: string;
/**项目名称*/
projectName: string;
/**项目单位*/
projectUnit: string;
/**复核人*/
reviewer: string;
/**销方地址*/
sellerAddress: string;
/**销方银行账号*/
sellerBankAccount: string;
/**销方公司ID*/
sellerCompanyId: number;
/**销方公司名称*/
sellerName: string;
/**销方开户行支行*/
sellerOpeningBankBranch: string;
/**销方开户行类型*/
sellerOpeningBankType: string;
/**销方电话*/
sellerPhone: string;
/**销方税号*/
sellerTaxNo: string;
/**税率*/
taxRate: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**InvoiceBasicVO*/
export interface InvoiceBasicVO {
/**(必填)业务编号*/
businessCodes: string[];
/**购方类型Code[CUSTOMER表示客户, PARTYA表示甲方](CUSTOMER-客户、PARTYA-甲方)*/
buyerTypeCode: string;
}
/**InvoiceBilIdslVO*/
export interface InvoiceBilIdslVO {
/**(必填)航天发票信息id数组*/
billIds: number[];
}
/**InvoiceBillHtPdfInfo*/
export interface InvoiceBillHtPdfInfo {
/**undefined*/
htPdfFile: string;
/**undefined*/
htPdfUrl: string;
}
/**InvoiceBillQueryVO*/
export interface InvoiceBillQueryVO {
/**发票号码*/
billNo: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**InvoiceBillVO*/
export interface InvoiceBillVO {
/**发票金额[含税]*/
billAmount: number;
/**发票代码*/
billCode: string;
/**发票号码*/
billNo: string;
/**发票抬头*/
billTitle: string;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）、Special_ZZ-增值税专用发票(纸质）)*/
billTypeCode: string;
/**业务编码[成交报告编号或请佣申请单号]*/
businessCode: number;
/**开票票据信息ID*/
id: number;
/**开票信息ID*/
invoiceId: number;
/**开票方式(HAND-手动开票、AUTO-自动开票)*/
invoiceModeCode: string;
/**开票日期(yyyy-MM-dd HH:mm:ss)*/
invoiceTime: string;
/**开票类型[1正票、2红票]*/
invoiceType: number;
/**确认主营[不含税]*/
mainAmount: number;
/**NC凭证号*/
ncCode: string;
/**订单号*/
orderNo: string;
/**备注*/
remark: string;
/**流水号*/
serialNo: string;
/**税额[公式]*/
taxAmount: number;
}
/**InvoiceConfigAddVO*/
export interface InvoiceConfigAddVO {
/**地址*/
address: string;
/**收款员*/
cashier: string;
/**商品分类编码*/
categoryCode: string;
/**复核人*/
checker: string;
/**公司主体ID*/
companyId: number;
/**名称*/
companyName: string;
/**开票员*/
invoiceClerk: string;
/**项目名称*/
itemName: string;
/**项目单位*/
itemUnits: string;
/**电话*/
phone: string;
/**税率*/
taxRate: string;
/**纳税人规模(General-一般纳税人、SmallScale-小规模纳税人)*/
taxScale: string;
/**纳税人识别号*/
taxpayerNo: string;
}
/**InvoiceConfigQueryVO*/
export interface InvoiceConfigQueryVO {
/**名称*/
companyName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**纳税人规模(General-一般纳税人、SmallScale-小规模纳税人)*/
taxScale: string;
/**纳税人识别号*/
taxpayerNo: string;
}
/**InvoiceConfigUpdateVO*/
export interface InvoiceConfigUpdateVO {
/**地址*/
address: string;
/**收款员*/
cashier: string;
/**商品分类编码*/
categoryCode: string;
/**复核人*/
checker: string;
/**公司主体ID*/
companyId: number;
/**名称*/
companyName: string;
/**(必填)id*/
id: number;
/**开票员*/
invoiceClerk: string;
/**项目名称*/
itemName: string;
/**项目单位*/
itemUnits: string;
/**电话*/
phone: string;
/**税率*/
taxRate: string;
/**纳税人规模(General-一般纳税人、SmallScale-小规模纳税人)*/
taxScale: string;
/**纳税人识别号*/
taxpayerNo: string;
}
/**InvoiceConfigVO*/
export interface InvoiceConfigVO {
/**地址*/
address: string;
/**收款员*/
cashier: string;
/**商品分类编码*/
categoryCode: string;
/**复核人*/
checker: string;
/**公司主体ID*/
companyId: number;
/**名称*/
companyName: string;
/**ID*/
id: number;
/**开票员*/
invoiceClerk: string;
/**项目名称*/
itemName: string;
/**项目单位*/
itemUnits: string;
/**电话*/
phone: string;
/**税率*/
taxRate: string;
/**纳税人规模(General-一般纳税人、SmallScale-小规模纳税人)*/
taxScale: string;
/**纳税人识别号*/
taxpayerNo: string;
}
/**InvoiceInfoVO*/
export interface InvoiceInfoVO {
/**undefined*/
baseInfo: InvoiceBaseVO;
/**undefined*/
billList: InvoiceBillVO[];
/**undefined*/
invoiceInfo: InvoiceVO;
}
/**InvoiceManualInfoVO*/
export interface InvoiceManualInfoVO {
/**发票信息*/
billList: HandInvoiceBillVO[];
/**(必填)业务编号[成交报告编号 或 请佣申请单号]*/
businessCode: string;
/**购方类型Code[CUSTOMER表示客户, PARTYA表示甲方](CUSTOMER-客户、PARTYA-甲方)*/
buyerTypeCode: string;
}
/**InvoiceOperateListVO*/
export interface InvoiceOperateListVO {
/**(必填)发票信息*/
datas: InvoiceOperateVO[];
}
/**InvoiceOperateVO*/
export interface InvoiceOperateVO {
/**(必填)业务编号[成交报告编号 或 请佣申请单号]*/
businessCode: string;
/**购方类型Code[CUSTOMER表示客户, PARTYA表示甲方]*/
buyerTypeCode: string;
}
/**InvoiceQueryHtFileVO*/
export interface InvoiceQueryHtFileVO {
/**发票代码*/
billCode: string;
/**发票号码*/
billNo: string;
}
/**InvoiceQueryVO*/
export interface InvoiceQueryVO {
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**InvoiceVO*/
export interface InvoiceVO {
/**业绩确认时间(yyyy-MM-dd HH:mm:ss)*/
achieveConfirmTime: string;
/**申请费用类型Code[甲方]*/
applyFeeTypeCode: string;
/**业务编码*/
businessCode: string;
/**购方邮箱*/
buyerEmail: string;
/**购方名称*/
buyerName: string;
/**购方手机*/
buyerPhone: string;
/**购方类型(CUSTOMER-客户、PARTYA-甲方)*/
buyerTypeCode: string;
/**立项周期ID*/
cycleId: number;
/**立项周期名称*/
cycleName: string;
/**成交组织ID*/
dealOrgId: number;
/**成交人ID*/
dealPersonId: number;
/**房屋地址*/
houseAddress: string;
/**发票信息ID*/
id: number;
/**开票方式Code(HAND-手动开票、AUTO-自动开票)*/
invoiceModeCode: string;
/**正票状态Code(NotInvoiced-未开票、Invoiced-已开票)*/
normalStatusCode: string;
/**已付金额*/
paidAmount: number;
/**应付金额*/
payableAmount: number;
/**收款银行账号*/
payeeBankAccount: string;
/**收款方公司ID*/
payeeCompanyId: number;
/**收款方公司名称*/
payeeCompanyName: string;
/**联动项目ID*/
projectId: number;
/**联动项目名称*/
projectName: string;
/**红冲状态Code(NotRed-未红冲、Red-已红冲、PendingRefundRed-待退款红冲)*/
redDashedStatusCode: string;
/**退款金额*/
refundAmount: number;
/**备注信息*/
remark: string;
}
/**PaymentQueryVO*/
export interface PaymentQueryVO {
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**PaymentVO*/
export interface PaymentVO {
/**栋座ID*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**对账状态Code*/
checkingStatusCode: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户姓名*/
customerName: string;
/**客户付款时间(yyyy-MM-dd HH:mm:ss)*/
customerPaymentTime: string;
/**手机号码*/
customerPhone: string;
/**立项周期ID*/
cycleId: number;
/**立项周期名称*/
cycleName: string;
/**已删除*/
deleted: number;
/**楼层*/
floor: number;
/**楼层名称*/
floorName: string;
/**款项类型Code*/
fundTypeCode: string;
/**房屋地址(项目+栋座+楼层+房号)*/
houseAddress: string;
/**undefined*/
id: number;
/**优惠告知书编号*/
noticeCode: string;
/**优惠告知书ID*/
noticeId: number;
/**订单编号*/
orderNo: string;
/**甲方ID*/
partyAId: number;
/**甲方名称*/
partyAName: string;
/**付款人姓名*/
payerName: string;
/**付款人手机*/
payerPhone: string;
/**支付方Code*/
payerTypeCode: string;
/**付款账号*/
paymentAccount: string;
/**支付金额*/
paymentAmount: number;
/**收款公司账号名称*/
paymentCompanyAccountName: string;
/**收款公司银行账号*/
paymentCompanyBankAccount: string;
/**收款经办人ID*/
paymentHandlerId: number;
/**支付方式Code*/
paymentModeCode: string;
/**入账金额*/
paymentReceivingAmount: number;
/**入账日期(yyyy-MM-dd HH:mm:ss)*/
paymentReceivingTime: string;
/**付款状态Code*/
paymentStatusCode: string;
/**联动项目ID*/
projectId: number;
/**联动项目名称*/
projectName: string;
/**备注信息*/
remark: string;
/**房号ID*/
roomId: number;
/**房号名称*/
roomName: string;
/**交易参考号*/
tradeRefNo: string;
/**银联清算日期(yyyy-MM-dd HH:mm:ss)*/
unionpayClearingTime: string;
/**银联手续费*/
unionpayServiceChargeAmount: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
