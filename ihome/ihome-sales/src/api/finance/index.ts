/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-12-8 8:43:43 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/finance"
/**新增收款账号在线支付信息*/
export async function post_accountOnlinePay_add(d?: any) {
  return await request.post<number, number>(basePath + '/accountOnlinePay/add', d)
}
/**查询收款账号在线支付信息*/
export async function get_accountOnlinePay_get__id(d?: any) {
  return await request.get<AccountOnlinePayVO, AccountOnlinePayVO>(basePath + '/accountOnlinePay/get/{id}', { params: d })
}
/**根据收款账号ID查询收款账号在线支付信息*/
export async function get_accountOnlinePay_getByAccountId__accountId(d?: any) {
  return await request.get<AccountOnlinePayVO, AccountOnlinePayVO>(basePath + '/accountOnlinePay/getByAccountId/{accountId}', { params: d })
}
/**修改收款账号在线支付信息*/
export async function post_accountOnlinePay_update(d?: any) {
  return await request.post<number, number>(basePath + '/accountOnlinePay/update', d)
}
/**添加公司收款账户*/
export async function post_bankAccount_add(d?: any) {
  return await request.post<number, number>(basePath + '/bankAccount/add', d)
}
/**删除公司收款账户*/
export async function post_bankAccount_delete__id(d?: any) {
  return await request.post<number, number>(basePath + '/bankAccount/delete/{id}', d)
}
/**获取公司对应收款账户信息*/
export async function get_bankAccount_get__companyId(d?: any) {
  return await request.get<BankAccountVO[], BankAccountVO[]>(basePath + '/bankAccount/get/{companyId}', { params: d })
}
/**查询公司收款账户信息列表数据*/
export async function post_bankAccount_getList(d?: any) {
  return await request.post<PageModel<BankAccountVO>, PageModel<BankAccountVO>>(basePath + '/bankAccount/getList', d)
}
/**修改公司收款账户*/
export async function post_bankAccount_update(d?: any) {
  return await request.post<number, number>(basePath + '/bankAccount/update', d)
}
/**删除银行网点*/
export async function post_bankBranch_delete__id(d?: any) {
  return await request.post<number, number>(basePath + '/bankBranch/delete/{id}', d)
}
/**查询银行网点详情*/
export async function get_bankBranch_get__id(d?: any) {
  return await request.get<BankBranchVO, BankBranchVO>(basePath + '/bankBranch/get/{id}', { params: d })
}
/**查询银行网点信息列表数据*/
export async function post_bankBranch_getList(d?: any) {
  return await request.post<PageModel<BankBranchVO>, PageModel<BankBranchVO>>(basePath + '/bankBranch/getList', d)
}
/**(已实现)新增甲方开票信息数据*/
export async function post_invoice_add(d?: any) {
  return await request.post<string, string>(basePath + '/invoice/add', d)
}
/**(已实现)航天自动红冲-可批量*/
export async function post_invoice_autoHongChong(d?: any) {
  return await request.post<string, string>(basePath + '/invoice/autoHongChong', d)
}
/**(已实现)航天自动开正票-可批量*/
export async function post_invoice_autoKaiPiao(d?: any) {
  return await request.post<string, string>(basePath + '/invoice/autoKaiPiao', d)
}
/**(已实现)下载发票文件-可批量*/
export async function post_invoice_downloadFile(d?: any) {
  return await request.post<string[], string[]>(basePath + '/invoice/downloadFile', d)
}
/**(未实现)导出数据*/
export async function post_invoice_exportData(d?: any) {
  return await request.post<any, any>(basePath + '/invoice/exportData', d)
}
/**[已实现]查询航天发票文件信息*/
export async function post_invoice_getHtFileInfo(d?: any) {
  return await request.post<InvoiceBillHtPdfInfo, InvoiceBillHtPdfInfo>(basePath + '/invoice/getHtFileInfo', d)
}
/**(未实现)查询开票信息列表数据*/
export async function post_invoice_getList(d?: any) {
  return await request.post<PageModel<InvoiceVO>, PageModel<InvoiceVO>>(basePath + '/invoice/getList', d)
}
/**(未实现)查询甲方正票信息列表数据*/
export async function post_invoice_getPartyAList(d?: any) {
  return await request.post<PageModel<InvoicePartyAVO>, PageModel<InvoicePartyAVO>>(basePath + '/invoice/getPartyAList', d)
}
/**(未实现)查询甲方红票信息列表数据*/
export async function post_invoice_getPartyARedList(d?: any) {
  return await request.post<PageModel<InvoicePartyAVO>, PageModel<InvoicePartyAVO>>(basePath + '/invoice/getPartyARedList', d)
}
/**(已实现)Excel导入历史发票信息*/
export async function post_invoice_importData(d?: any) {
  return await request.post<number, number>(basePath + '/invoice/importData', d)
}
/**(已实现)手动开票*/
export async function post_invoice_manualKaiPiao(d?: any) {
  return await request.post<string, string>(basePath + '/invoice/manualKaiPiao', d)
}
/**(实现中)甲方手动开票*/
export async function post_invoice_partyAManualKaiPiao(d?: any) {
  return await request.post<string, string>(basePath + '/invoice/partyAManualKaiPiao', d)
}
/**(实现中)查询开票详情*/
export async function post_invoice_queryInvoiceInfo(d?: any) {
  return await request.post<InvoiceInfoVO, InvoiceInfoVO>(basePath + '/invoice/queryInvoiceInfo', d)
}
/**测试航天开票*/
export async function post_invoice_test(d?: any) {
  return await request.post<number, number>(basePath + '/invoice/test', d)
}
/**(未实现)Excel导入开票基础数据*/
export async function post_invoiceBase_importData(d?: any) {
  return await request.post<number, number>(basePath + '/invoiceBase/importData', d)
}
/**(未实现)下载航天发票文件-可批量*/
export async function post_invoiceBill_downloadFile(d?: any) {
  return await request.post<number, number>(basePath + '/invoiceBill/downloadFile', d)
}
/**(已实现)查询航天发票信息列表数据*/
export async function post_invoiceBill_getList(d?: any) {
  return await request.post<PageModel<InvoiceHTBillVO>, PageModel<InvoiceHTBillVO>>(basePath + '/invoiceBill/getList', d)
}
/**添加发票税率配置信息*/
export async function post_invoiceConfig_add(d?: any) {
  return await request.post<number, number>(basePath + '/invoiceConfig/add', d)
}
/**删除发票税率配置信息*/
export async function post_invoiceConfig_delete__id(d?: any) {
  return await request.post<number, number>(basePath + '/invoiceConfig/delete/{id}', d)
}
/**查询发票税率配置信息详情*/
export async function get_invoiceConfig_get__id(d?: any) {
  return await request.get<InvoiceConfigVO, InvoiceConfigVO>(basePath + '/invoiceConfig/get/{id}', { params: d })
}
/**查询公司收款账户信息列表数据*/
export async function post_invoiceConfig_getList(d?: any) {
  return await request.post<PageModel<InvoiceConfigVO>, PageModel<InvoiceConfigVO>>(basePath + '/invoiceConfig/getList', d)
}
/**修改发票税率配置信息*/
export async function post_invoiceConfig_update(d?: any) {
  return await request.post<number, number>(basePath + '/invoiceConfig/update', d)
}
/**添加付款记录*/
export async function post_payment_add(d?: any) {
  return await request.post<number, number>(basePath + '/payment/add', d)
}
/**检查订单是否未支付*/
export async function get_payment_checkIsExistNoPay__id(d?: any) {
  return await request.get<boolean, boolean>(basePath + '/payment/checkIsExistNoPay/{id}', { params: d })
}
/**删除付款记录*/
export async function post_payment_delete__id(d?: any) {
  return await request.post<number, number>(basePath + '/payment/delete/{id}', d)
}
/**向银联发起支付请求*/
export async function get_payment_doPayment__id(d?: any) {
  return await request.get<object, object>(basePath + '/payment/doPayment/{id}', { params: d })
}
/**获取待付款记录ID*/
export async function get_payment_get_businessId__businessId(d?: any) {
  return await request.get<number, number>(basePath + '/payment/get/businessId/{businessId}', { params: d })
}
/**查询一条付款记录*/
export async function get_payment_get__id(d?: any) {
  return await request.get<PaymentVO, PaymentVO>(basePath + '/payment/get/{id}', { params: d })
}
/**查询收款信息列表数据*/
export async function get_payment_getList__businessId(d?: any) {
  return await request.get<PaymentVO[], PaymentVO[]>(basePath + '/payment/getList/{businessId}', { params: d })
}
/**查询收款信息列表数据*/
export async function get_payment_getNotCheckList__businessId(d?: any) {
  return await request.get<PaymentVO[], PaymentVO[]>(basePath + '/payment/getNotCheckList/{businessId}', { params: d })
}
/**获取二维码信息*/
export async function get_payment_getPaymentQRCodeInfo__id(d?: any) {
  return await request.get<PaymentQRCodeVO, PaymentQRCodeVO>(basePath + '/payment/getPaymentQRCodeInfo/{id}', { params: d })
}
/**修改付款记录*/
export async function post_payment_update(d?: any) {
  return await request.post<number, number>(basePath + '/payment/update', d)
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
  list: T[];
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
/**AccountOnlinePayUpdateVO*/
export interface AccountOnlinePayUpdateVO {
  /**(必填)公司收款账号ID*/
  accountId: number;
  /**对账密码*/
  checkPasswd: string;
  /**(必填)对账账号*/
  checkUser: string;
  /**ID*/
  id: number;
  /**(必填)商户ID*/
  merId: string;
  /**(必填)秘钥*/
  secret: string;
}
/**AccountOnlinePayVO*/
export interface AccountOnlinePayVO {
  /**公司收款账号ID*/
  accountId: number;
  /**对账密码*/
  checkPasswd: string;
  /**对账账号*/
  checkUser: string;
  /**ID*/
  id: number;
  /**商户ID*/
  merId: string;
  /**秘钥*/
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
  /**账号类型(Basic-基本存款账户、General-一般存款账户)*/
  accountType: string;
  /**开户银行*/
  branchName: string;
  /**联行号*/
  branchNo: string;
  /**账户类别(MainAccount-主账号、SubAccount-分账号)*/
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
/**InvoiceBillHandVO*/
export interface InvoiceBillHandVO {
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
  /**业务编码[成交报告编号]*/
  businessCode: number;
  /**文件ID*/
  fileId: string;
  /**文件名称*/
  fileName: string;
  /**文件类型*/
  fileType: string;
  /**文件地址*/
  fileUrl: string;
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
/**InvoiceBillHtPdfInfo*/
export interface InvoiceBillHtPdfInfo {
  /**undefined*/
  htPdfFile: string;
  /**undefined*/
  htPdfUrl: string;
}
/**InvoiceBillQueryVO*/
export interface InvoiceBillQueryVO {
  /**开票起始日期(yyyy-MM-dd HH:mm:ss)*/
  beginTime: string;
  /**发票代码*/
  billCode: string;
  /**发票号码*/
  billNo: string;
  /**发票抬头*/
  billTitle: string;
  /**业务编号[成交报告编号,请款申请单号]*/
  businessCode: string;
  /**开票截止日期(yyyy-MM-dd HH:mm:ss)*/
  endTime: string;
  /**发票类型[1正票、2红票]*/
  invoiceType: number;
  /**订单号*/
  orderNo: string;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
  /**是否已红冲(NotRed-未红冲、Red-已红冲、PendingRefundRed-待退款红冲)*/
  redDashedStatus: string;
  /**流水号*/
  serialNo: string;
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
/**InvoiceHTBillVO*/
export interface InvoiceHTBillVO {
  /**发票金额[含税]*/
  billAmount: number;
  /**发票代码*/
  billCode: string;
  /**发票号码*/
  billNo: string;
  /**发票抬头*/
  billTitle: string;
  /**业务编码[成交报告编号]*/
  businessCode: string;
  /**开票票据信息ID*/
  id: number;
  /**开票日期(yyyy-MM-dd HH:mm:ss)*/
  invoiceTime: string;
  /**开票类型[1正票、2红票]*/
  invoiceType: string;
  /**确认主营[不含税]*/
  mainAmount: number;
  /**NC凭证号*/
  ncCode: string;
  /**订单号*/
  orderNo: string;
  /**红冲状态(NotRed-未红冲、Red-已红冲、PendingRefundRed-待退款红冲)*/
  redDashedStatus: string;
  /**流水号*/
  serialNo: string;
  /**税额[公式]*/
  taxAmount: number;
}
/**InvoiceInfoVO*/
export interface InvoiceInfoVO {
  /**undefined*/
  baseInfo: InvoiceBaseVO;
  /**undefined*/
  billList: InvoiceBillHandVO[];
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
  /**购方类型Code[CUSTOMER表示客户, PARTYA表示甲方](CUSTOMER-客户、PARTYA-甲方)*/
  buyerTypeCode: string;
}
/**InvoicePartyAAddVO*/
export interface InvoicePartyAAddVO {
  /**申请费用类型Code[甲方](SaleAgentFee-销售代理费)*/
  applyFeeTypeCode: string;
  /**请佣申请单号*/
  businessCode: string;
  /**购方邮箱*/
  buyerEmail: string;
  /**甲方名称*/
  buyerName: string;
  /**甲方手机*/
  buyerPhone: string;
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
  /**退款金额*/
  refundAmount: number;
  /**开票备注信息*/
  remark: string;
}
/**InvoicePartyAQueryVO*/
export interface InvoicePartyAQueryVO {
  /**开票起始日期(yyyy-MM-dd HH:mm:ss)*/
  beginTime: string;
  /**请款申请单号*/
  businessCode: string;
  /**甲方公司名称*/
  buyerName: string;
  /**开票截止日期(yyyy-MM-dd HH:mm:ss)*/
  endTime: string;
  /**开票方式(HAND-手动开票、AUTO-自动开票)*/
  invoiceModeCode: string;
  /**开票状态(NotInvoiced-未开票、Invoiced-已开票)*/
  invoicingStatus: string;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
  /**红冲起始日期(yyyy-MM-dd HH:mm:ss)*/
  redBeginTime: string;
  /**红冲状态(NotRed-未红冲、Red-已红冲、PendingRefundRed-待退款红冲)*/
  redDashedStatus: string;
  /**红冲截止日期(yyyy-MM-dd HH:mm:ss)*/
  redEndTime: string;
}
/**InvoicePartyARedQueryVO*/
export interface InvoicePartyARedQueryVO {
  /**开票起始日期(yyyy-MM-dd HH:mm:ss)*/
  beginTime: string;
  /**请款申请单号*/
  businessCode: string;
  /**甲方公司名称*/
  buyerName: string;
  /**开票截止日期(yyyy-MM-dd HH:mm:ss)*/
  endTime: string;
  /**(必填)当前页*/
  pageNum: number;
  /**(必填)每页条数*/
  pageSize: number;
  /**红冲起始日期(yyyy-MM-dd HH:mm:ss)*/
  redBeginTime: string;
  /**红冲状态(NotRed-未红冲、Red-已红冲、PendingRefundRed-待退款红冲)*/
  redDashedStatus: string;
  /**红冲截止日期(yyyy-MM-dd HH:mm:ss)*/
  redEndTime: string;
}
/**InvoicePartyAVO*/
export interface InvoicePartyAVO {
  /**申请费用类型(SaleAgentFee-销售代理费)*/
  applyFeeTypeCode: string;
  /**业务编码*/
  businessCode: string;
  /**甲方公司名称*/
  buyerName: string;
  /**发票信息ID*/
  id: number;
  /**开票方式(HAND-手动开票、AUTO-自动开票)*/
  invoiceModeCode: string;
  /**开票时间(yyyy-MM-dd HH:mm:ss)*/
  invoiceTime: string;
  /**开票状态(NotInvoiced-未开票、Invoiced-已开票)*/
  invoicingStatus: string;
  /**正票状态Code(NotInvoiced-未开票、Invoiced-已开票)*/
  normalStatusCode: string;
  /**本次申请金额(元)*/
  payableAmount: number;
  /**收款银行账号*/
  payeeBankAccount: string;
  /**收款方公司名称*/
  payeeCompanyName: string;
  /**红冲状态Code(NotRed-未红冲、Red-已红冲、PendingRefundRed-待退款红冲)*/
  redDashedStatusCode: string;
  /**红冲时间(yyyy-MM-dd HH:mm:ss)*/
  redInvoiceTime: string;
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
  /**(必填)业务编号*/
  businessCodes: string[];
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
/**PaymentAddVO*/
export interface PaymentAddVO {
  /**(必填)支付金额*/
  amount: number;
  /**(必填)优惠告知书I*/
  businessId: number;
  /**文件ID-转账方式才传*/
  fileId: string;
  /**(必填)款项类型(ServiceCharge-服务费、AgentFee-代理费)*/
  foundType: string;
  /**(必填)店组ID*/
  groupId: number;
  /**(必填)经办人*/
  operator: number;
  /**(必填)项目ID*/
  orgId: number;
  /**(必填)支付方式(Pos-银联刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
  payType: string;
  /**(必填)付款方(Customer-客户、PartyA-甲方)*/
  payer: string;
  /**(必填)项目ID*/
  proId: number;
  /**(必填)房号ID*/
  roomId: number;
  /**(必填)付款服务费*/
  serviceAmount: number;
  /**(必填)已付服务费*/
  serviceFeePaid: number;
  /**(必填)立项ID*/
  termId: number;
  /**录入终端(WeChatApp-微信小程序、Pc-电脑)*/
  terminal: string;
  /**(必填)未付服务费*/
  unpaidServiceFee: number;
}
/**PaymentQRCodeVO*/
export interface PaymentQRCodeVO {
  /**订单编码*/
  billNo: string;
  /**商户号*/
  merchantNoList: string[];
  /**支付方式*/
  terminalNoList: string[];
  /**交易金额*/
  transAmount: number;
}
/**PaymentUpdateVO*/
export interface PaymentUpdateVO {
  /**(必填)支付金额*/
  amount: number;
  /**(必填)优惠告知书I*/
  businessId: number;
  /**文件ID-转账方式才传*/
  fileId: string;
  /**(必填)款项类型(ServiceCharge-服务费、AgentFee-代理费)*/
  foundType: string;
  /**(必填)ID*/
  id: number;
  /**(必填)支付方式(Pos-银联刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
  payType: string;
  /**(必填)付款服务费*/
  serviceAmount: number;
  /**(必填)已付服务费*/
  serviceFeePaid: number;
  /**(必填)未付服务费*/
  unpaidServiceFee: number;
}
/**PaymentVO*/
export interface PaymentVO {
  /**支付金额*/
  amount: number;
  /**业务编号*/
  businessId: number;
  /**ID*/
  id: number;
  /**收款日期(yyyy-MM-dd)*/
  payDate: string;
  /**收款编号*/
  payNo: string;
  /**支付方式(Pos-银联刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
  payType: string;
  /**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账)*/
  status: string;
}
