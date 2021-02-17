/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-2-17 4:29:36 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/finance"
/**新增收款账号在线支付信息*/
export async function post_accountOnlinePay_add (d?: any) {
return await request.post< number,number> (basePath+'/accountOnlinePay/add', d)
}
/**查询收款账号在线支付信息*/
export async function get_accountOnlinePay_get__id (d?: any) {
return await request.get<AccountOnlinePayVO,AccountOnlinePayVO>(basePath+'/accountOnlinePay/get/{id}', { params: d })
}
/**根据收款账号ID查询收款账号在线支付信息*/
export async function get_accountOnlinePay_getByAccountId__accountId (d?: any) {
return await request.get<AccountOnlinePayVO,AccountOnlinePayVO>(basePath+'/accountOnlinePay/getByAccountId/{accountId}', { params: d })
}
/**修改收款账号在线支付信息*/
export async function post_accountOnlinePay_update (d?: any) {
return await request.post< number,number> (basePath+'/accountOnlinePay/update', d)
}
/**添加公司收款账户*/
export async function post_bankAccount_add (d?: any) {
return await request.post< number,number> (basePath+'/bankAccount/add', d)
}
/**删除公司收款账户*/
export async function post_bankAccount_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/bankAccount/delete/{id}', d)
}
/**获取公司对应收款账户信息列表*/
export async function get_bankAccount_get__companyId (d?: any) {
return await request.get<BankAccountVO[],BankAccountVO[]>(basePath+'/bankAccount/get/{companyId}', { params: d })
}
/**查询公司收款账户信息下拉列表数据*/
export async function get_bankAccount_getAll (d?: any) {
return await request.get<BankAccountAllVO[],BankAccountAllVO[]>(basePath+'/bankAccount/getAll', { params: d })
}
/**根据公司收款账户ID获取银行信息*/
export async function get_bankAccount_getBankInfoByAccountId__accountId (d?: any) {
return await request.get<BankAccountBackInfoVO,BankAccountBackInfoVO>(basePath+'/bankAccount/getBankInfoByAccountId/{accountId}', { params: d })
}
/**查询公司收款账户信息详情*/
export async function get_bankAccount_getById__id (d?: any) {
return await request.get<BankAccountVO,BankAccountVO>(basePath+'/bankAccount/getById/{id}', { params: d })
}
/**查询公司下面的所有银行账号信息*/
export async function post_bankAccount_getByOrgId__orgId (d?: any) {
return await request.post< BankAccountAllVO[],BankAccountAllVO[]> (basePath+'/bankAccount/getByOrgId/{orgId}', d)
}
/**查询公司收款账户信息列表数据*/
export async function post_bankAccount_getList (d?: any) {
return await request.post< any,any> (basePath+'/bankAccount/getList', d)
}
/**修改公司收款账户*/
export async function post_bankAccount_update (d?: any) {
return await request.post< number,number> (basePath+'/bankAccount/update', d)
}
/**切换为公司默认账号*/
export async function post_bankAccount_updateFlag (d?: any) {
return await request.post< number,number> (basePath+'/bankAccount/updateFlag', d)
}
/**删除银行网点*/
export async function post_bankBranch_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/bankBranch/delete/{id}', d)
}
/**查询银行网点详情*/
export async function get_bankBranch_get__id (d?: any) {
return await request.get<BankBranchVO,BankBranchVO>(basePath+'/bankBranch/get/{id}', { params: d })
}
/**查询银行网点详情根据银行账号*/
export async function get_bankBranch_getByAccountNo__accountNo (d?: any) {
return await request.get<BankBranchVO,BankBranchVO>(basePath+'/bankBranch/getByAccountNo/{accountNo}', { params: d })
}
/**查询银行网点信息列表数据*/
export async function post_bankBranch_getList (d?: any) {
return await request.post< any,any> (basePath+'/bankBranch/getList', d)
}
/**Excel导入银行网点信息*/
export async function post_bankBranch_importData (d?: any) {
return await request.post< number,number> (basePath+'/bankBranch/importData', d)
}
/**请款单开票员审核通过后生成一笔开票信息*/
export async function post_invoice_applyRecAdd (d?: any) {
return await request.post< number,number> (basePath+'/invoice/applyRecAdd', d)
}
/**航天自动红冲可批量*/
export async function post_invoice_autoHCInvoicing (d?: any) {
return await request.post< number,number> (basePath+'/invoice/autoHCInvoicing', d)
}
/**航天自动开票可批量*/
export async function post_invoice_autoZPInvoicing (d?: any) {
return await request.post< number,number> (basePath+'/invoice/autoZPInvoicing', d)
}
/**成交报告审核通过后新增开票信息*/
export async function post_invoice_dealAdd (d?: any) {
return await request.post< number,number> (basePath+'/invoice/dealAdd', d)
}
/**删除开票信息*/
export async function post_invoice_delete_businessId__businessId (d?: any) {
return await request.post< number,number> (basePath+'/invoice/delete/businessId/{businessId}', d)
}
/**下载发票文件-可批量*/
export async function post_invoice_downloadFile (d?: any) {
return await request.post< string[],string[]> (basePath+'/invoice/downloadFile', d)
}
/**查询开票详情*/
export async function get_invoice_get__id (d?: any) {
return await request.get<InvoiceDetailVO,InvoiceDetailVO>(basePath+'/invoice/get/{id}', { params: d })
}
/**根据业务编码获取开票信息*/
export async function get_invoice_getInvoiceInfo__businessCode (d?: any) {
return await request.get<InvoiceVO,InvoiceVO>(basePath+'/invoice/getInvoiceInfo/{businessCode}', { params: d })
}
/**查询开票信息列表数据*/
export async function post_invoice_getList (d?: any) {
return await request.post< any,any> (basePath+'/invoice/getList', d)
}
/**手动红冲可批量*/
export async function post_invoice_handHCInvoicing (d?: any) {
return await request.post< number,number> (basePath+'/invoice/handHCInvoicing', d)
}
/**手动开票可批量*/
export async function post_invoice_handInvoicing (d?: any) {
return await request.post< number,number> (basePath+'/invoice/handInvoicing', d)
}
/**终止操作废除开票信息*/
export async function post_invoice_invalid_businessNo__businessNo (d?: any) {
return await request.post< number,number> (basePath+'/invoice/invalid/businessNo/{businessNo}', d)
}
/**(未实现)Excel导入开票基础数据*/
export async function post_invoiceBase_importData (d?: any) {
return await request.post< number,number> (basePath+'/invoiceBase/importData', d)
}
/**(未实现)下载航天发票文件-可批量*/
export async function post_invoiceBillOld_downloadFile (d?: any) {
return await request.post< number,number> (basePath+'/invoiceBillOld/downloadFile', d)
}
/**(已实现)查询航天发票信息列表数据*/
export async function post_invoiceBillOld_getList (d?: any) {
return await request.post< any,any> (basePath+'/invoiceBillOld/getList', d)
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
/**查询发票税率配置信息列表数据*/
export async function post_invoiceConfig_getList (d?: any) {
return await request.post< any,any> (basePath+'/invoiceConfig/getList', d)
}
/**修改发票税率配置信息*/
export async function post_invoiceConfig_update (d?: any) {
return await request.post< number,number> (basePath+'/invoiceConfig/update', d)
}
/**保存在线支付银联账单*/
export async function post_payBill_addOnlinePayBill (d?: any) {
return await request.post< number,number> (basePath+'/payBill/addOnlinePayBill', d)
}
/**保存POS机支付银联账单*/
export async function post_payBill_addPOSPayBill (d?: any) {
return await request.post< number,number> (basePath+'/payBill/addPOSPayBill', d)
}
/**检验是否已有银联支付账单*/
export async function post_payBill_checkExistBill (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payBill/checkExistBill', d)
}
/**添加代理费付款记录*/
export async function post_payment_addAgency (d?: any) {
return await request.post< number,number> (basePath+'/payment/addAgency', d)
}
/**添加服务费付款记录*/
export async function post_payment_addService (d?: any) {
return await request.post< object,object> (basePath+'/payment/addService', d)
}
/**小程序删除付款记录*/
export async function post_payment_appDelete__id (d?: any) {
return await request.post< number,number> (basePath+'/payment/appDelete/{id}', d)
}
/**模拟银联支付回调*/
export async function get_payment_autoPay__id (d?: any) {
return await request.get<object,object>(basePath+'/payment/autoPay/{id}', { params: d })
}
/**付款批量解除关联成交报告*/
export async function post_payment_batchRelieveDeal (d?: any) {
return await request.post< number,number> (basePath+'/payment/batchRelieveDeal', d)
}
/**根据付款编号查询是否存在记录*/
export async function get_payment_checkExistOrder__payNo (d?: any) {
return await request.get<boolean,boolean>(basePath+'/payment/checkExistOrder/{payNo}', { params: d })
}
/**检查订单是否未支付*/
export async function get_payment_checkIsExistNoPay__id (d?: any) {
return await request.get<boolean,boolean>(basePath+'/payment/checkIsExistNoPay/{id}', { params: d })
}
/**付款对账*/
export async function post_payment_checkPayment__id (d?: any) {
return await request.post< number,number> (basePath+'/payment/checkPayment/{id}', d)
}
/**PC端删除付款记录*/
export async function post_payment_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/payment/delete/{id}', d)
}
/**根据优惠告知书ID删除未付款付款记录*/
export async function post_payment_deleteByBusinessId__businessId (d?: any) {
return await request.post< number,number> (basePath+'/payment/deleteByBusinessId/{businessId}', d)
}
/**查询一条付款记录*/
export async function get_payment_get__id (d?: any) {
return await request.get<PaymentVO,PaymentVO>(basePath+'/payment/get/{id}', { params: d })
}
/**根据优惠告知书ID获取已付金额*/
export async function get_payment_getAmountPaidByBusinessId__businessId (d?: any) {
return await request.get<number,number>(basePath+'/payment/getAmountPaidByBusinessId/{businessId}', { params: d })
}
/**根据成交ID获取已付金额*/
export async function get_payment_getAmountPaidByDealId__dealId (d?: any) {
return await request.get<number,number>(basePath+'/payment/getAmountPaidByDealId/{dealId}', { params: d })
}
/**查询收款信息列表数据*/
export async function get_payment_getAppList__businessId (d?: any) {
return await request.get<PaymentVO[],PaymentVO[]>(basePath+'/payment/getAppList/{businessId}', { params: d })
}
/**根据立项周期ID查询付款银行基本信息*/
export async function get_payment_getBankInfo__termId (d?: any) {
return await request.get<PaymentBankInfoVO,PaymentBankInfoVO>(basePath+'/payment/getBankInfo/{termId}', { params: d })
}
/**获取待付款记录ID*/
export async function get_payment_getBusinessId__businessId (d?: any) {
return await request.get<number,number>(basePath+'/payment/getBusinessId/{businessId}', { params: d })
}
/**根据微信小程序订单号查询付款记录*/
export async function get_payment_getByWxPayOrder__unionPayWeChatNo (d?: any) {
return await request.get<Payment,Payment>(basePath+'/payment/getByWxPayOrder/{unionPayWeChatNo}', { params: d })
}
/**查询一条付款记录详情*/
export async function get_payment_getDetail__id (d?: any) {
return await request.get<PaymentPCDetailVO,PaymentPCDetailVO>(basePath+'/payment/getDetail/{id}', { params: d })
}
/**查询PC端收款信息列表*/
export async function post_payment_getList (d?: any) {
return await request.post< any,any> (basePath+'/payment/getList', d)
}
/**根据交易参考号*/
export async function get_payment_getNoOrderInfo__orderNo (d?: any) {
return await request.get<PaymentNoOrderVO,PaymentNoOrderVO>(basePath+'/payment/getNoOrderInfo/{orderNo}', { params: d })
}
/**查询待审核数列表数据*/
export async function get_payment_getNotCheckList__businessId (d?: any) {
return await request.get<PaymentVO[],PaymentVO[]>(basePath+'/payment/getNotCheckList/{businessId}', { params: d })
}
/**查询待审核数据数量*/
export async function get_payment_getNotCheckNum__businessId (d?: any) {
return await request.get<number,number>(basePath+'/payment/getNotCheckNum/{businessId}', { params: d })
}
/**获取订单支付状态*/
export async function get_payment_getPayStatus__id (d?: any) {
return await request.get<any,any>(basePath+'/payment/getPayStatus/{id}', { params: d })
}
/**获取二维码信息*/
export async function get_payment_getPaymentQRCodeInfo__id (d?: any) {
return await request.get<PaymentQRCodeVO,PaymentQRCodeVO>(basePath+'/payment/getPaymentQRCodeInfo/{id}', { params: d })
}
/**根据付款编号查询在线支付信息列表*/
export async function get_payment_getRefundInfo__businessId (d?: any) {
return await request.get<PaymentRefundVO,PaymentRefundVO>(basePath+'/payment/getRefundInfo/{businessId}', { params: d })
}
/**根据付款编号查询在线支付信息*/
export async function get_payment_getSecretKeyByPayNo__payNo (d?: any) {
return await request.get<AccountOnlinePayVO,AccountOnlinePayVO>(basePath+'/payment/getSecretKeyByPayNo/{payNo}', { params: d })
}
/**获取银联支付接口参数*/
export async function post_payment_getUnionPayParameter (d?: any) {
return await request.post< PaymentOnlinePayParamVO,PaymentOnlinePayParamVO> (basePath+'/payment/getUnionPayParameter', d)
}
/**获取银联请求url*/
export async function post_payment_getUnionPayUrl (d?: any) {
return await request.post< string,string> (basePath+'/payment/getUnionPayUrl', d)
}
/**查询待付款订单或者已付金额,没有待付款订单则只返回已付金额*/
export async function get_payment_getUnpaidOrderOrAmountPaid__businessId (d?: any) {
return await request.get<any,any>(basePath+'/payment/getUnpaidOrderOrAmountPaid/{businessId}', { params: d })
}
/**获取小程序支付JSAPI*/
export async function get_payment_getWeChatJsApi__id (d?: any) {
return await request.get<string,string>(basePath+'/payment/getWeChatJsApi/{id}', { params: d })
}
/**index*/
export async function get_payment_index__id (d?: any) {
return await request.get<object,object>(basePath+'/payment/index/{id}', { params: d })
}
/**在线支付支付成功 业务处理*/
export async function post_payment_onlinePayBusinessDeal (d?: any) {
return await request.post< number,number> (basePath+'/payment/onlinePayBusinessDeal', d)
}
/**POS机支付 业务处理*/
export async function post_payment_posPayBusinessDeal (d?: any) {
return await request.post< number,number> (basePath+'/payment/posPayBusinessDeal', d)
}
/**广州银联在线支付-查询支付交易结果（实时对账）接口*/
export async function post_payment_queryOnlinePayTradeResult (d?: any) {
return await request.post< string,string> (basePath+'/payment/queryOnlinePayTradeResult', d)
}
/**付款关联成交报告*/
export async function post_payment_relevanceDeal (d?: any) {
return await request.post< number,number> (basePath+'/payment/relevanceDeal', d)
}
/**电子回单签署回调*/
export async function post_payment_signCallback (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payment/signCallback', d)
}
/**查询并更新银联微信小程序支付状态*/
export async function get_payment_syncWXPayStatus__id (d?: any) {
return await request.get<number,number>(basePath+'/payment/syncWXPayStatus/{id}', { params: d })
}
/**定时任务查询并更新微信支付订单状态*/
export async function get_payment_taskSyncWXPayStatus (d?: any) {
return await request.get<number,number>(basePath+'/payment/taskSyncWXPayStatus', { params: d })
}
/**修改付款记录*/
export async function post_payment_update (d?: any) {
return await request.post< object,object> (basePath+'/payment/update', d)
}
/**删除草稿状态的POS机事项*/
export async function post_posApplyItem_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/posApplyItem/delete/{id}', d)
}
/**查询POS机申请事项*/
export async function get_posApplyItem_get__id (d?: any) {
return await request.get<PosApplyVO,PosApplyVO>(basePath+'/posApplyItem/get/{id}', { params: d })
}
/**查询POS机申请事项详情*/
export async function get_posApplyItem_getDetail__id (d?: any) {
return await request.get<PosApplyDetailVO,PosApplyDetailVO>(basePath+'/posApplyItem/getDetail/{id}', { params: d })
}
/**查询POS机申请事项信息列表数据*/
export async function post_posApplyItem_getList (d?: any) {
return await request.post< any,any> (basePath+'/posApplyItem/getList', d)
}
/**POS机操作[领用,申领,调动,退还,归还]*/
export async function post_posApplyItem_posApply (d?: any) {
return await request.post< number,number> (basePath+'/posApplyItem/posApply', d)
}
/**POS机操作[多种操作]*/
export async function post_posApplyItem_posOperate (d?: any) {
return await request.post< number,number> (basePath+'/posApplyItem/posOperate', d)
}
/**添加POS机终端信息*/
export async function post_posTerminal_add (d?: any) {
return await request.post< number,number> (basePath+'/posTerminal/add', d)
}
/**删除POS机终端*/
export async function post_posTerminal_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/posTerminal/delete/{id}', d)
}
/**查询POS机终端信息详情*/
export async function get_posTerminal_get__id (d?: any) {
return await request.get<Merchant[],Merchant[]>(basePath+'/posTerminal/get/{id}', { params: d })
}
/**查询POS机终端信息详情*/
export async function get_posTerminal_getDetail__id (d?: any) {
return await request.get<PosTerminalDetailVO,PosTerminalDetailVO>(basePath+'/posTerminal/getDetail/{id}', { params: d })
}
/**查询POS机终端信息列表数据*/
export async function post_posTerminal_getList (d?: any) {
return await request.post< any,any> (basePath+'/posTerminal/getList', d)
}
/**Excel导入Pos机信息*/
export async function post_posTerminal_importData (d?: any) {
return await request.post< number,number> (basePath+'/posTerminal/importData', d)
}
/**POS机终端撤机*/
export async function post_posTerminal_revoke (d?: any) {
return await request.post< number,number> (basePath+'/posTerminal/revoke', d)
}
/**修改POS机终端*/
export async function post_posTerminal_update (d?: any) {
return await request.post< number,number> (basePath+'/posTerminal/update', d)
}
/**新增退款申请信息*/
export async function post_refundApply_add (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/add', d)
}
/**批量删除草稿或终审驳回状态退款申请信息*/
export async function post_refundApply_batchDelete (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/batchDelete', d)
}
/**Excel导出待审核退款申请数据*/
export async function post_refundApply_checkExportData (d?: any) {
return await request.post< any,any> (basePath+'/refundApply/checkExportData', d)
}
/**退款申请计算*/
export async function post_refundApply_collect (d?: any) {
return await request.post< RefundApplyCollectVO,RefundApplyCollectVO> (basePath+'/refundApply/collect', d)
}
/**删除草稿或终审驳回状态退款申请信息*/
export async function post_refundApply_delete__id (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/delete/{id}', d)
}
/**Excel导出退款申请数据*/
export async function post_refundApply_exportData (d?: any) {
return await request.post< any,any> (basePath+'/refundApply/exportData', d)
}
/**财务审核*/
export async function post_refundApply_financialAudit (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/financialAudit', d)
}
/**查询退款申请信息详情*/
export async function get_refundApply_get__id (d?: any) {
return await request.get<RefundApplyVO,RefundApplyVO>(basePath+'/refundApply/get/{id}', { params: d })
}
/**获取退款申请业务审核流程*/
export async function get_refundApply_getBusinessProcess__id (d?: any) {
return await request.get<RefundApplyBusinessProcessVO[],RefundApplyBusinessProcessVO[]>(basePath+'/refundApply/getBusinessProcess/{id}', { params: d })
}
/**查询待审核退款申请信息列表数据*/
export async function post_refundApply_getCheckList (d?: any) {
return await request.post< any,any> (basePath+'/refundApply/getCheckList', d)
}
/**查询OA审批日志*/
export async function post_refundApply_getFlowCommentList__id (d?: any) {
return await request.post< RefundRecord[],RefundRecord[]> (basePath+'/refundApply/getFlowCommentList/{id}', d)
}
/**查询当前OA审批状态*/
export async function post_refundApply_getFlowState__id (d?: any) {
return await request.post< string,string> (basePath+'/refundApply/getFlowState/{id}', d)
}
/**查询退款申请信息列表数据*/
export async function post_refundApply_getList (d?: any) {
return await request.post< any,any> (basePath+'/refundApply/getList', d)
}
/**获取已经提交OA的流程id【排除审核通过】*/
export async function get_refundApply_getSummaryIds (d?: any) {
return await request.get<number[],number[]>(basePath+'/refundApply/getSummaryIds', { params: d })
}
/**非财务审核*/
export async function post_refundApply_notFinancialAudit (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/notFinancialAudit', d)
}
/**查询当前OA待办人*/
export async function post_refundApply_queryOaApprovalUser__id (d?: any) {
return await request.post< string,string> (basePath+'/refundApply/queryOaApprovalUser/{id}', d)
}
/**撤回待平台文员审核状态退款申请信息*/
export async function post_refundApply_revoke__id (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/revoke/{id}', d)
}
/**同步OA审核状态*/
export async function post_refundApply_syncState (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/syncState', d)
}
/**修改退款申请信息*/
export async function post_refundApply_update (d?: any) {
return await request.post< number,number> (basePath+'/refundApply/update', d)
}
/**发起退款申请书新增待退款项信息*/
export async function post_refundItem_addRefundItem (d?: any) {
return await request.post< number,number> (basePath+'/refundItem/addRefundItem', d)
}
/**Excel导出退款项数据*/
export async function post_refundItem_exportData (d?: any) {
return await request.post< any,any> (basePath+'/refundItem/exportData', d)
}
/**查询待退款项详情*/
export async function get_refundItem_get__id (d?: any) {
return await request.get<RefundItemVO,RefundItemVO>(basePath+'/refundItem/get/{id}', { params: d })
}
/**查询编辑待退款项列表数据*/
export async function post_refundItem_getEditList (d?: any) {
return await request.post< any,any> (basePath+'/refundItem/getEditList', d)
}
/**查询待退款项附件详情*/
export async function get_refundItem_getItemAttachment__id (d?: any) {
return await request.get<RefundItemAttachmentVO[],RefundItemAttachmentVO[]>(basePath+'/refundItem/getItemAttachment/{id}', { params: d })
}
/**查询待退款项列表数据*/
export async function post_refundItem_getList (d?: any) {
return await request.post< any,any> (basePath+'/refundItem/getList', d)
}
/**查询待退款推送详情*/
export async function get_refundItemPush_get__id (d?: any) {
return await request.get<RefundItemPush,RefundItemPush>(basePath+'/refundItemPush/get/{id}', { params: d })
}
/**查询待退款推送信息列表数据*/
export async function post_refundItemPush_getList (d?: any) {
return await request.post< any,any> (basePath+'/refundItemPush/getList', d)
}
/**退款推送*/
export async function post_refundItemPush_refundPush (d?: any) {
return await request.post< number,number> (basePath+'/refundItemPush/refundPush', d)
}
/**设置已退款*/
export async function post_refundItemPush_setUpARefund (d?: any) {
return await request.post< number,number> (basePath+'/refundItemPush/setUpARefund', d)
}
/**同步状态*/
export async function post_refundItemPush_syncStatus (d?: any) {
return await request.post< PayDetailPushResponse,PayDetailPushResponse> (basePath+'/refundItemPush/syncStatus', d)
}
/**修改待退款推送数据*/
export async function post_refundItemPush_update (d?: any) {
return await request.post< number,number> (basePath+'/refundItemPush/update', d)
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
/**BankAccountAllVO*/
export interface BankAccountAllVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**开户银行*/
branchName: string;
/**联行号*/
branchNo: string;
/**公司主体ID*/
companyId: number;
/**默认标识[0-非默认 1-默认]*/
defaultFlag: number;
/**ID*/
id: number;
}
/**BankAccountBackInfoVO*/
export interface BankAccountBackInfoVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**开户银行*/
bankName: string;
/**支行名称*/
branchName: string;
/**联行号*/
branchNo: string;
/**默认标识[0-非默认 1-默认]*/
defaultFlag: number;
/**税率*/
taxRate: string;
/**纳税人识别号*/
taxpayerNo: string;
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
/**BankAccountUpdateFlagVO*/
export interface BankAccountUpdateFlagVO {
/**(必填)公司主体ID*/
companyId: number;
/**(必填)id*/
id: number;
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
/**默认标识[0-非默认 1-默认]*/
defaultFlag: number;
/**ID*/
id: number;
/**税率*/
taxRate: number;
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
/**CollectParamVO*/
export interface CollectParamVO {
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**退款金额*/
refundAmount: number;
/**待退款项编号*/
refundApplyNo: string;
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
/**FlowComment*/
export interface FlowComment {
/**事项id*/
affairId: number;
/**审核时间(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**审核类型*/
auditType: string;
/**审核类型名称*/
auditTypeDesc: string;
/**审核用户id*/
auditUserId: number;
/**审核用户姓名*/
auditUserName: string;
/**审核意见内容*/
content: string;
/**部门id*/
departmentId: number;
/**部门名称*/
departmentName: string;
/**拓展属性1*/
extAttr1: string;
/**拓展属性2*/
extAttr2: string;
/**拓展属性3*/
extAttr3: string;
/**id*/
id: number;
/**节点名称*/
nodeName: string;
/**节点用户*/
nodeUserName: string;
/**组织id*/
orgId: number;
/**组织名称*/
orgName: string;
/**岗位id*/
postId: number;
/**岗位名称*/
postName: string;
/**流程id*/
summaryId: number;
}
/**InvoiceApplyRecAddVO*/
export interface InvoiceApplyRecAddVO {
/**请款单代理费金额（含税）*/
amount: number;
/**请款信息ID*/
businessId: number;
/**请款单编号*/
businessNo: string;
/**事业部ID*/
departmentId: number;
/**发票抬头为请款单中的甲方公司名称*/
invoiceTitle: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
invoiceType: string;
/**请款单收款方*/
payee: string;
/**收款方账号*/
payeeAccountNo: string;
/**税率*/
taxRate: number;
}
/**InvoiceAttachmentVO*/
export interface InvoiceAttachmentVO {
/**附件ID*/
fileId: string;
/**附件名称*/
fileName: string;
/**附件类型*/
type: string;
}
/**InvoiceBilIdslVO*/
export interface InvoiceBilIdslVO {
/**(必填)航天发票信息id数组*/
billIds: number[];
}
/**InvoiceBillInfoVO*/
export interface InvoiceBillInfoVO {
/**金额（含税）*/
amount: number;
/**红冲状态*/
cancelFlag: number;
/**ID*/
id: number;
/**发票代码*/
invoiceCode: string;
/**开票ID*/
invoiceId: number;
/**发票号码*/
invoiceNo: string;
/**发票类别*/
invoiceType: number;
/**确认主营（不含税）*/
noTax: number;
/**航天开票流水号*/
serialNo: string;
/**税额*/
tax: number;
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
/**InvoiceDealAddVO*/
export interface InvoiceDealAddVO {
/**服务费金额（含税）*/
amount: number;
/**成交报告ID*/
businessId: number;
/**成交报告编号*/
businessNo: string;
/**事业部ID*/
departmentId: number;
/**发票抬头为业主姓名（多个业主使用；分隔）*/
invoiceTitle: string;
/**立项ID*/
termId: number;
}
/**InvoiceDetailVO*/
export interface InvoiceDetailVO {
/**undefined*/
attachmentVOs: InvoiceAttachmentVO[];
/**发票信息集合*/
invoiceBillInfos: InvoiceBillInfoVO[];
/**开票信息*/
invoiceInfo: InvoiceInfoVO;
/**开票历史记录信息集合*/
invoiceRecords: InvoiceRecordVO[];
}
/**InvoiceDownloadVO*/
export interface InvoiceDownloadVO {
/**开票信息ID集合*/
ids: number[];
}
/**InvoiceHCVO*/
export interface InvoiceHCVO {
/**开票信息ID集合*/
ids: number[];
/**代理费红冲备注*/
remark: string;
/**代理费红冲初始化状态*/
state: number;
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
/**InvoiceHTZPVO*/
export interface InvoiceHTZPVO {
/**开票信息ID集合*/
ids: number[];
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
operationType: string;
}
/**InvoiceHandVO*/
export interface InvoiceHandVO {
/**附件集合信息集合*/
attachments: InvoiceAttachmentVO[];
/**开票信息ID*/
invoiceId: number;
/**map: key-发票号码 value-发票代码)*/
invoiceNoAndInvoiceCodeMap: object;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
invoiceType: string;
/**NC凭证号*/
ncCode: string;
/**开票日期(yyyy-MM-dd)*/
operationDate: string;
/**备注*/
remark: string;
/**税额*/
tax: number;
}
/**InvoiceInfoVO*/
export interface InvoiceInfoVO {
/**金额（含税）*/
amount: number;
/**业务ID*/
businessId: number;
/**业务单号*/
businessNo: string;
/**事业部ID*/
departmentId: number;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**ID*/
id: number;
/**发票抬头*/
invoiceTitle: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
invoiceType: string;
/**NC凭证号*/
ncCode: string;
/**确认主营（不含税）*/
noTax: number;
/**开票日期(yyyy-MM-dd)*/
operationDate: string;
/**开票类型(Hand-手工开票、Auto-自动开票)*/
operationType: string;
/**开票人*/
operationUser: number;
/**收款方*/
payee: string;
/**收款方账号*/
payeeAccountNo: string;
/**备注*/
remark: string;
/**状态(Done-已开票、NotDone-未开票、Invalid-废弃)*/
status: string;
/**税额*/
tax: number;
/**税率*/
taxRate: number;
}
/**InvoiceQueryVO*/
export interface InvoiceQueryVO {
/**业务单号*/
businessNo: string;
/**截止开票日期(yyyy-MM-dd)*/
endTime: string;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**发票抬头*/
invoiceTitle: string;
/**开票类型(Hand-手工开票、Auto-自动开票)*/
operationType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**起始开票日期(yyyy-MM-dd)*/
startTime: string;
/**开票状态(Done-已开票、NotDone-未开票、Invalid-废弃)*/
status: string;
}
/**InvoiceRecordVO*/
export interface InvoiceRecordVO {
/**开票ID*/
invoiceId: number;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作(HandMake-手工开票、AutoMake-自动开票、HandCancel-手工红冲、AutoCancel-自动红冲)*/
operation: string;
/**操作人*/
operator: number;
/**操作人姓名*/
operatorName: string;
/**备注*/
remark: string;
}
/**InvoiceVO*/
export interface InvoiceVO {
/**金额（含税）*/
amount: number;
/**业务ID*/
businessId: number;
/**业务单号*/
businessNo: string;
/**费用类型(ServiceFee-服务费、AgencyFee-代理费)*/
feeType: string;
/**ID*/
id: number;
/**发票抬头*/
invoiceTitle: string;
/**发票类型(SpecialElectron-增值税专用发票（电子）、OrdinaryElectron-增值税普通发票（电子）、OrdinaryPaper-增值税普通发票（纸质)、SpecialPaper-增值税专用发票（纸质）)*/
invoiceType: string;
/**NC凭证号*/
ncCode: string;
/**确认主营（不含税）*/
noTax: number;
/**开票日期(yyyy-MM-dd)*/
operationDate: string;
/**开票类型(Hand-手工开票、Auto-自动开票)*/
operationType: string;
/**收款方*/
payee: string;
/**收款方账号*/
payeeAccountNo: string;
/**状态(Done-已开票、NotDone-未开票、Invalid-废弃)*/
status: string;
/**税额*/
tax: number;
/**税率*/
taxRate: number;
}
/**ItemAttachmentVO*/
export interface ItemAttachmentVO {
/**文件ID*/
fileId: string;
/**文件名*/
fileName: string;
/**文件类型(NoticeBook-优惠告知书、RefundBook-退款申请书、CopyOfIdCardRefund-退款人身份证扫描件、CollectionAttachment-收款附件、CopyOfBankCard-退款人银行卡复印件、MyCertificate-明源退房证明、Other-其他)*/
type: string;
}
/**Merchant*/
export interface Merchant {
/**ID[修改时候有值,新增时候为空]*/
id: number;
/**商户号*/
merchantNo: string;
/**终端号*/
terminalNo: string;
/**商户类型(Card-银行卡收款、Pos-POS通)*/
type: string;
}
/**OaFlowInfoModel*/
export interface OaFlowInfoModel {
/**OA流程审批日志*/
commentList: FlowComment[];
/**OA流程状态枚举(Process-处理中、Pass-通过、NoPass-不通过)*/
stateEnum: string;
/**OA流程ID*/
summaryId: number;
}
/**OnlinePayQueryVO*/
export interface OnlinePayQueryVO {
/**undefined*/
beginTime: string;
/**undefined*/
endTime: string;
/**(必填)付款编号不能为空*/
payNo: string;
/**undefined*/
payStatus: string;
/**undefined*/
shoppingTime: string;
}
/**OnlinePayVO*/
export interface OnlinePayVO {
/**undefined*/
currCode: string;
/**undefined*/
getordertime: string;
/**undefined*/
orderNo: string;
/**undefined*/
payAmount: number;
/**undefined*/
payNo: string;
/**支付时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**undefined*/
reserved01: string;
/**undefined*/
reserved02: string;
/**undefined*/
respCode: string;
/**undefined*/
settDate: string;
/**undefined*/
signMsg: string;
/**undefined*/
systemSSN: string;
}
/**PayDetailPushResponse*/
export interface PayDetailPushResponse {
/**原因*/
reason: string;
/**推送状态*/
status: boolean;
}
/**Payment*/
export interface Payment {
/**支付金额*/
amount: number;
/**业务编号[优惠告知书和请款单号]*/
businessCode: string;
/**业务ID*/
businessId: number;
/**对账时间(yyyy-MM-dd HH:mm:ss)*/
checkTime: string;
/**实收确认时间(yyyy-MM-dd HH:mm:ss)*/
confirmTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交报告编号[冗余字段]*/
dealCode: string;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**款项类型(ServiceFee-服务费、AgencyFee-代理费)*/
foundType: string;
/**店组ID*/
groupId: number;
/**ID*/
id: number;
/**经办人*/
operator: number;
/**凭证号*/
payCode: string;
/**收款日期(yyyy-MM-dd)*/
payDate: string;
/**收款编号*/
payNo: string;
/**支付时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**支付方式(Pos-POS刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
payType: string;
/**收款账号*/
payeeAccount: string;
/**收款账户*/
payeeName: string;
/**付款方(Customer-客户、PartyA-甲方)*/
payer: string;
/**项目ID*/
proId: number;
/**房号ID*/
roomId: number;
/**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账、Revoked-已撤销、Flushed-已冲正)*/
status: string;
/**立项ID*/
termId: number;
/**录入终端(WeChatApp-微信小程序、Pc-电脑)*/
terminal: string;
/**银联微信小程序订单号[按银联要求格式生成,15位商户号+8位日期+9位随机数字]*/
unionPayWeChatNo: string;
/**银联微信小程序订单时间[yyyyMMddHHssmm]*/
unionPayWeChatTime: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PaymentAddVO*/
export interface PaymentAddVO {
/**(必填)支付金额*/
amount: number;
/**文件ID集合[银行转账方式才必填,其他方式不填]*/
attachments: PaymentAttachmentDetailVO[];
/**(必填)优惠告知书编号*/
businessCode: string;
/**(必填)优惠告知书ID*/
businessId: number;
/**(必填)店组ID*/
groupId: number;
/**(必填)经办人*/
operator: number;
/**交易参考号[无订单刷卡时才填]*/
orderNo: string;
/**支付时间[无订单刷卡时才填](yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**(必填)支付方式(Pos-POS刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
payType: string;
/**收款账号[银行转账方式才必填,其他方式不填]*/
payeeAccount: string;
/**收款账户[银行转账方式才必填,其他方式不填]*/
payeeName: string;
/**(必填)付款方(Customer-客户、PartyA-甲方)*/
payer: string;
/**(必填)项目ID*/
proId: number;
/**房号ID*/
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
/**PaymentAgencyAddVO*/
export interface PaymentAgencyAddVO {
/**undefined*/
list: PaymentAgencyVO[];
}
/**PaymentAgencyVO*/
export interface PaymentAgencyVO {
/**(必填)支付金额*/
amount: number;
/**(必填)请款单号*/
businessCode: string;
/**(必填)请款单ID*/
businessId: number;
/**(必填)成交ID*/
dealId: number;
/**(必填)店组ID*/
groupId: number;
/**(必填)经办人*/
operator: number;
/**(必填)甲方公司ID*/
partyAId: number;
/**(必填)每份代理费回款时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**(必填)项目ID*/
proId: number;
/**房号ID*/
roomId: number;
/**(必填)立项ID*/
termId: number;
/**(必填)操作人*/
userId: number;
}
/**PaymentAttachmentDetailVO*/
export interface PaymentAttachmentDetailVO {
/**文件ID*/
fileId: string;
/**文件名称*/
fileName: string;
/**类型[新增和修改时候不传](Evidence-收款凭证、ElectronicReceipt-电子回单)*/
type: string;
}
/**PaymentBankInfoVO*/
export interface PaymentBankInfoVO {
/**公司收款账号ID*/
accountId: number;
/**收款账号*/
payeeAccount: string;
/**收款账户*/
payeeName: string;
}
/**PaymentBatchRelieveDealVO*/
export interface PaymentBatchRelieveDealVO {
/**undefined*/
ids: number[];
}
/**PaymentNoOrderVO*/
export interface PaymentNoOrderVO {
/**支付金额*/
amount: number;
/**交易参考号*/
orderNo: string;
/**收款时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
}
/**PaymentOnlinePayParamVO*/
export interface PaymentOnlinePayParamVO {
}
/**PaymentOnlinePayVO*/
export interface PaymentOnlinePayVO {
/**付款ID*/
id: number;
/**微信openId*/
openId: string;
}
/**PaymentPCDetailVO*/
export interface PaymentPCDetailVO {
/**收款信息*/
attachments: PaymentAttachmentDetailVO[];
/**收款信息*/
payment: PaymentPCVO;
/**undefined*/
recordVOs: PaymentRecordVO[];
}
/**PaymentPCVO*/
export interface PaymentPCVO {
/**支付金额*/
amount: number;
/**业务编号[优惠告知书和请款单号]*/
businessCode: string;
/**业务ID*/
businessId: number;
/**对账时间(yyyy-MM-dd HH:mm:ss)*/
checkTime: string;
/**实收确认时间(yyyy-MM-dd HH:mm:ss)*/
confirmTime: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交报告编号[冗余字段]*/
dealCode: string;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**款项类型(ServiceFee-服务费、AgencyFee-代理费)*/
foundType: string;
/**店组ID*/
groupId: number;
/**店组名称*/
groupName: string;
/**ID*/
id: number;
/**经办人*/
operator: number;
/**经办人*/
operatorName: string;
/**凭证号*/
payCode: string;
/**收款日期(yyyy-MM-dd)*/
payDate: string;
/**收款编号*/
payNo: string;
/**支付时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**支付方式(Pos-POS刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
payType: string;
/**收款账号*/
payeeAccount: string;
/**收款账户*/
payeeName: string;
/**付款方(Customer-客户、PartyA-甲方)*/
payer: string;
/**项目ID*/
proId: number;
/**项目名称*/
projectName: string;
/**房号ID*/
roomId: number;
/**房号*/
roomNo: string;
/**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账、Revoked-已撤销、Flushed-已冲正)*/
status: string;
/**立项ID*/
termId: number;
/**立项周期名称*/
termName: string;
/**录入终端(WeChatApp-微信小程序、Pc-电脑)*/
terminal: string;
/**银联微信小程序订单号[按银联要求格式生成,15位商户号+8位日期+9位随机数字]*/
unionPayWeChatNo: string;
/**银联微信小程序订单时间[yyyyMMddHHssmm]*/
unionPayWeChatTime: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PaymentQRCodeVO*/
export interface PaymentQRCodeVO {
/**订单编码*/
billNo: string;
/**商户号集合*/
merchantNo: string[];
/**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账、Revoked-已撤销、Flushed-已冲正)*/
status: string;
/**终端号集合*/
terminalNoList: string[];
/**交易金额[以分为单位]*/
transAmount: string;
}
/**PaymentQueryVO*/
export interface PaymentQueryVO {
/**业务编号*/
businessCode: string;
/**业务ID*/
businessId: number;
/**业主姓名*/
customerName: string;
/**成交报告编号*/
dealCode: string;
/**截止对账时间(yyyy-MM-dd)*/
endCheckTime: string;
/**截止确认时间(yyyy-MM-dd)*/
endConfirmTime: string;
/**截止收款日期(yyyy-MM-dd)*/
endPayDate: string;
/**截止支付时间(yyyy-MM-dd HH:mm:ss)*/
endPayTime: string;
/**款项类型(ServiceFee-服务费、AgencyFee-代理费)*/
foundType: string;
/**店组ID*/
groupId: number;
/**是否关联成交:0否1是*/
isRelation: number;
/**经办人*/
operator: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**收款编号*/
payNo: string;
/**支付方式(Pos-POS刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
payType: string;
/**付款方(Customer-客户、PartyA-甲方)*/
payer: string;
/**项目ID*/
proId: number;
/**房号*/
roomId: number;
/**起始对账时间(yyyy-MM-dd)*/
startCheckTime: string;
/**起始确认时间(yyyy-MM-dd)*/
startConfirmTime: string;
/**起始收款日期(yyyy-MM-dd)*/
startPayDate: string;
/**起始支付时间(yyyy-MM-dd HH:mm:ss)*/
startPayTime: string;
/**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账、Revoked-已撤销、Flushed-已冲正)*/
status: string;
/**立项ID*/
termId: number;
}
/**PaymentRecordVO*/
export interface PaymentRecordVO {
/**ID*/
id: number;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作(Pay-支付、Check-对账、Link-关联、CancelLink-取消关联、Revoke-撤销、Rush-冲正)*/
operation: string;
/**操作人*/
operator: number;
/**操作人*/
operatorName: string;
/**收款ID*/
paymentId: number;
/**备注*/
remark: string;
/**操作结果*/
result: string;
}
/**PaymentRefundVO*/
export interface PaymentRefundVO {
/**支付金额*/
amount: number;
/**业务ID*/
businessId: number;
/**退款时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**收款人*/
payee: string;
/**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账、Revoked-已撤销、Flushed-已冲正)*/
status: string;
}
/**PaymentRelevanceDealVO*/
export interface PaymentRelevanceDealVO {
/**成交报告编号*/
dealCode: string;
/**成交报告ID*/
dealId: number;
/**付款ID*/
id: number;
}
/**PaymentUpdateVO*/
export interface PaymentUpdateVO {
/**(必填)支付金额*/
amount: number;
/**文件ID集合[银行转账方式才必填,其他方式不填]*/
attachments: PaymentAttachmentDetailVO[];
/**(必填)优惠告知书I*/
businessId: number;
/**(必填)ID*/
id: number;
/**(必填)支付方式(Pos-POS刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
payType: string;
/**收款账号[银行转账方式才必填,其他方式不填]*/
payeeAccount: string;
/**收款账户[银行转账方式才必填,其他方式不填]*/
payeeName: string;
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
/**文件ID集合*/
attachments: PaymentAttachmentDetailVO[];
/**业务编号*/
businessId: number;
/**附件ID集合*/
fileIds: string[];
/**ID*/
id: number;
/**收款日期(yyyy-MM-dd)*/
payDate: string;
/**收款编号*/
payNo: string;
/**支付时间(yyyy-MM-dd HH:mm:ss)*/
payTime: string;
/**支付方式(Pos-POS刷卡、WeChatPay-微信支付、UnionPay-银联支付、Alipay-支付宝支付、Transfer-银行转账、PosNoOrder-无订单刷卡)*/
payType: string;
/**状态(NotPaid-待支付、Paid-已支付、NotCheck-待对账、Revoked-已撤销、Flushed-已冲正)*/
status: string;
}
/**PosApplyDetailVO*/
export interface PosApplyDetailVO {
/**申请人*/
applyUser: number;
/**申请人名称*/
applyUserName: string;
/**所在事业部*/
departmentId: number;
/**事业部名称*/
departmentName: string;
/**所在店组*/
groupId: number;
/**店组名称*/
groupName: string;
/**事项ID*/
id: number;
/**事项编号*/
itemNo: string;
/**事项类别(Use-领用、Apply-申领、Move-调动、Return-退还、GiveBack-归还)*/
itemType: string;
/**undefined*/
posTerminals: PosTerminalVO[];
/**所在项目*/
proId: number;
/**项目推广名称*/
proName: string;
/**undefined*/
records: PosApplyItemRecordVO[];
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
}
/**PosApplyItemQueryVO*/
export interface PosApplyItemQueryVO {
/**申请人*/
applyUser: number;
/**事项编号*/
itemNo: string;
/**事项类别(Use-领用、Apply-申领、Move-调动、Return-退还、GiveBack-归还)*/
itemType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**所在项目*/
proId: number;
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
}
/**PosApplyItemRecordVO*/
export interface PosApplyItemRecordVO {
/**事项ID*/
applyItemId: number;
/**ID*/
id: number;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作(PutIn-入库、Revocation-撤机、Modify-修改、Use-领用、UseApprove-领用审核、UseSend-领用寄出、UseSign-领用签收、Return-退还、ReturnConfirm-确认退还、Apply-申领、ApplyApprove-申领审核、ApplySend-申领寄出、ApplySign-申领签收、GiveBack-归还、GiveBackConfirm-确认归还、Move-调动、MoveApprove-调动审核、MoveSend-调动寄出、MoveSign-调动签收)*/
operation: string;
/**操作人*/
operator: number;
/**操作人*/
operatorName: string;
/**备注*/
remark: string;
/**操作结果(Pass-通过、NoPass-不通过)*/
result: string;
}
/**PosApplyItemVO*/
export interface PosApplyItemVO {
/**申请人*/
applyUser: number;
/**申请人名称*/
applyUserName: string;
/**所在事业部*/
departmentId: number;
/**事业部名称*/
departmentName: string;
/**所在店组*/
groupId: number;
/**店组名称*/
groupName: string;
/**ID*/
id: number;
/**事项编号*/
itemNo: string;
/**事项类别(Use-领用、Apply-申领、Move-调动、Return-退还、GiveBack-归还)*/
itemType: string;
/**所在项目*/
proId: number;
/**项目推广名称*/
proName: string;
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
}
/**PosApplyOperateAddVO*/
export interface PosApplyOperateAddVO {
/**申请人*/
applyUser: number;
/**所在事业部*/
departmentId: number;
/**所在店组*/
groupId: number;
/**事项ID[只有修改时候才传ID]*/
id: number;
/**事项类别(Use-领用、Apply-申领、Move-调动、Return-退还、GiveBack-归还)*/
itemType: string;
/**pos机终端ID*/
posTerminalIds: number[];
/**所在项目*/
proId: number;
/**事项备注[非必填]*/
remark: string;
/**报存OR提交[0-保存 1-提交]*/
type: number;
}
/**PosApplyOperateVO*/
export interface PosApplyOperateVO {
/**事项ID*/
id: number;
/**事项操作类型(PutIn-入库、Revocation-撤机、Modify-修改、Use-领用、UseApprove-领用审核、UseSend-领用寄出、UseSign-领用签收、Return-退还、ReturnConfirm-确认退还、Apply-申领、ApplyApprove-申领审核、ApplySend-申领寄出、ApplySign-申领签收、GiveBack-归还、GiveBackConfirm-确认归还、Move-调动、MoveApprove-调动审核、MoveSend-调动寄出、MoveSign-调动签收)*/
operateType: string;
/**审核意见Or快递单号[审核和寄出时候必填]*/
remark: string;
/**审核状态[审核时候必填](Pass-通过、NoPass-不通过)*/
type: string;
}
/**PosApplyVO*/
export interface PosApplyVO {
/**申请人*/
applyUser: number;
/**申请人名称*/
applyUserName: string;
/**所在事业部*/
departmentId: number;
/**事业部名称*/
departmentName: string;
/**所在店组*/
groupId: number;
/**店组名称*/
groupName: string;
/**事项ID*/
id: number;
/**事项编号*/
itemNo: string;
/**事项类别(Use-领用、Apply-申领、Move-调动、Return-退还、GiveBack-归还)*/
itemType: string;
/**undefined*/
posTerminals: PosTerminalVO[];
/**所在项目*/
proId: number;
/**项目推广名称*/
proName: string;
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
}
/**PosPayResultVO*/
export interface PosPayResultVO {
/**undefined*/
acctNo: string;
/**undefined*/
amount: string;
/**undefined*/
busCode: string;
/**undefined*/
businessModel: string;
/**undefined*/
cardType: string;
/**undefined*/
indexnum: string;
/**undefined*/
payCode: string;
/**undefined*/
payNo: string;
/**undefined*/
payResultCode: string;
/**undefined*/
payResultMessage: string;
/**undefined*/
payType: string;
/**undefined*/
posCode: string;
/**undefined*/
settDate: string;
/**undefined*/
tranCurr: string;
/**undefined*/
tranTime: string;
/**undefined*/
transMark: string;
}
/**PosTerminalAddVO*/
export interface PosTerminalAddVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**商户信息*/
merchants: Merchant[];
/**产品型号*/
productModel: string;
/**序列号*/
serialNo: string;
}
/**PosTerminalDetailVO*/
export interface PosTerminalDetailVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**所在事业部*/
departmentId: number;
/**所在事业部*/
departmentName: string;
/**所在店组*/
groupId: number;
/**所在店组*/
groupName: string;
/**当前保管人*/
holder: number;
/**当前保管人*/
holderName: string;
/**ID*/
id: number;
/**商户信息*/
merchants: Merchant[];
/**所在项目*/
proId: number;
/**所在项目*/
proName: string;
/**产品型号*/
productModel: string;
/**操作日志*/
records: PosTerminalRecordVO[];
/**序列号*/
serialNo: string;
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PosTerminalQueryVO*/
export interface PosTerminalQueryVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**所在事业部*/
departmentId: number;
/**所在店组*/
groupId: number;
/**当前保管人*/
holder: number;
/**商户号*/
merchantNo: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
proId: number;
/**序列号*/
serialNo: string;
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
/**终端号*/
terminalNo: string;
}
/**PosTerminalRecordVO*/
export interface PosTerminalRecordVO {
/**ID*/
id: number;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作(PutIn-入库、Revocation-撤机、Modify-修改、Use-领用、UseApprove-领用审核、UseSend-领用寄出、UseSign-领用签收、Return-退还、ReturnConfirm-确认退还、Apply-申领、ApplyApprove-申领审核、ApplySend-申领寄出、ApplySign-申领签收、GiveBack-归还、GiveBackConfirm-确认归还、Move-调动、MoveApprove-调动审核、MoveSend-调动寄出、MoveSign-调动签收)*/
operation: string;
/**操作人*/
operator: number;
/**操作人名称*/
operatorName: string;
/**备注*/
remark: string;
/**操作结果*/
result: string;
/**POS终端ID*/
terminalId: number;
}
/**PosTerminalUpdateVO*/
export interface PosTerminalUpdateVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**ID*/
id: number;
/**商户信息*/
merchants: Merchant[];
/**产品型号*/
productModel: string;
/**序列号*/
serialNo: string;
}
/**PosTerminalVO*/
export interface PosTerminalVO {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**账户名称*/
id: number;
/**产品型号*/
productModel: string;
/**序列号*/
serialNo: string;
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
}
/**PosTerminalVO_1*/
export interface PosTerminalVO_1 {
/**账户名称*/
accountName: string;
/**账号*/
accountNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**所在事业部*/
departmentId: number;
/**所在事业部*/
departmentName: string;
/**所在店组*/
groupId: number;
/**所在店组*/
groupName: string;
/**当前保管人*/
holder: number;
/**当前保管人*/
holderName: string;
/**ID*/
id: number;
/**所在项目*/
proId: number;
/**所在项目*/
proName: string;
/**产品型号*/
productModel: string;
/**序列号*/
serialNo: string;
/**状态(CentralStock-总部库存、UseWaitApprove-领用待审、UseWaitSend-领用待寄、UseOneTheWay-领用在途、ReturnOnTheWay-退还在途、BranchStock-分公司库存、ApplyWaitApprove-申领待审、ApplyWaitSend-申领待寄、ApplyOnTheWay-申领在途、Using-项目在用、GiveBackOnTheWay-归还在途、MoveWaitApprove-调动待审、MoveWaitSend-调动待寄、MoveOnTheWay-调动在途、Stop-停用、Draft-草稿、Finished-已结束、Terminated-已终止)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundApplyAddParamVO*/
export interface RefundApplyAddParamVO {
/**账户id*/
accountId: number;
/**付款方账户名称*/
accountName: string;
/**付款方账号*/
accountNo: string;
/**申请事由*/
applyReason: string;
/**退款单附件集合*/
approvalForms: RefundAttachmentVO[];
/**付款方开户银行*/
branchName: string;
/**付款方联行号*/
branchNo: string;
/**按钮0-保存 1-提交*/
buttonType: number;
/**公司主体ID*/
companyId: number;
/**退款汇总清单*/
countVOs: RefundApplyCountVO[];
/**制单日期(yyyy-MM-dd)*/
createDate: string;
/**制单人*/
inputUser: number;
/**待退款项数据集合*/
itemAttachmentVOs: RefundItemAttachmentVO[];
/**事业部ID*/
orgId: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款信息汇总数据*/
refundInfo: RefundInfoVO;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
status: string;
}
/**RefundApplyBusinessProcessVO*/
export interface RefundApplyBusinessProcessVO {
/**是否有效标识[0-无效;1-有效]*/
flag: number;
/**处理时间(yyyy-MM-dd)*/
operateTime: string;
/**结果*/
result: string;
}
/**RefundApplyCWCheckVO*/
export interface RefundApplyCWCheckVO {
/**账户id*/
accountId: number;
/**付款方账户名称*/
accountName: string;
/**付款方账号*/
accountNo: string;
/**付款方开户银行*/
branchName: string;
/**付款方联行号*/
branchNo: string;
/**审核按钮类型(TemporaryStorage-暂存、Through-通过、Reject-驳回、Saving-保存)*/
buttonType: string;
/**退款汇总清单*/
countVOs: RefundApplyCountVO[];
/**ID*/
id: number;
/**待退款项数据集合*/
itemAttachmentVOs: RefundItemAttachmentVO[];
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款信息汇总数据*/
refundInfo: RefundInfoVO;
/**审核意见[驳回和暂存时必填]*/
remark: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**当前状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
status: string;
}
/**RefundApplyCheckQueryVO*/
export interface RefundApplyCheckQueryVO {
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**截止时间(yyyy-MM-dd)*/
endTime: string;
/**制单人*/
inputUser: number;
/**事业部ID*/
orgId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款申请单编号*/
refundApplyNo: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
}
/**RefundApplyCheckVO*/
export interface RefundApplyCheckVO {
/**审核按钮类型(TemporaryStorage-暂存、Through-通过、Reject-驳回、Saving-保存)*/
buttonType: string;
/**ID*/
id: number;
/**审核意见[驳回和暂存时必填]*/
remark: string;
/**当前状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
status: string;
}
/**RefundApplyCollectParamVO*/
export interface RefundApplyCollectParamVO {
/**付款方账号*/
accountNo: string;
/**本次申请退款总金额*/
amount: number;
/**付款方开户银行*/
branchName: string;
/**待退款项集合*/
collectParamVOs: CollectParamVO[];
/**原收款总金额*/
contAmount: number;
/**第一个收款人姓名*/
payName: string;
/**付款方*/
payer: string;
}
/**RefundApplyCollectVO*/
export interface RefundApplyCollectVO {
/**退款汇总清单*/
countVOs: RefundApplyCountVO[];
/**退款信息*/
refundInfo: RefundInfoVO;
}
/**RefundApplyCountVO*/
export interface RefundApplyCountVO {
/**项目id*/
proId: number;
/**退款项目名称*/
proName: string;
/**本期退款金额*/
refundAmount: number;
/**退款笔数*/
total: number;
/**累计退款金额*/
totalAmount: number;
/**历史已退款金额*/
totalRefundedAmount: number;
}
/**RefundApplyExportQueryVO*/
export interface RefundApplyExportQueryVO {
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**付款方[公司ID]*/
companyId: number;
/**截止时间(yyyy-MM-dd)*/
endTime: string;
/**制单人*/
inputUser: number;
/**事业部ID*/
orgId: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款申请单编号*/
refundApplyNo: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
status: string;
}
/**RefundApplyQueryVO*/
export interface RefundApplyQueryVO {
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**付款方[公司ID]*/
companyId: number;
/**截止时间(yyyy-MM-dd)*/
endTime: string;
/**制单人*/
inputUser: number;
/**事业部ID*/
orgId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款申请单编号*/
refundApplyNo: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
status: string;
}
/**RefundApplyUpdateParamVO*/
export interface RefundApplyUpdateParamVO {
/**账户id*/
accountId: number;
/**付款方账户名称*/
accountName: string;
/**付款方账号*/
accountNo: string;
/**申请事由*/
applyReason: string;
/**退款单附件集合*/
approvalForms: RefundAttachmentVO[];
/**付款方开户银行*/
branchName: string;
/**付款方联行号*/
branchNo: string;
/**按钮0-保存 1-提交*/
buttonType: number;
/**公司主体ID*/
companyId: number;
/**退款汇总清单*/
countVOs: RefundApplyCountVO[];
/**制单日期(yyyy-MM-dd)*/
createDate: string;
/**ID*/
id: number;
/**制单人*/
inputUser: number;
/**待退款项数据集合*/
itemAttachmentVOs: RefundItemAttachmentVO[];
/**事业部ID*/
orgId: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款申请单编号[编辑时候必传]*/
refundApplyNo: string;
/**退款信息汇总数据*/
refundInfo: RefundInfoVO;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
status: string;
}
/**RefundApplyVO*/
export interface RefundApplyVO {
/**账户id*/
accountId: number;
/**付款方账户名称*/
accountName: string;
/**付款方账号*/
accountNo: string;
/**本次退款金额*/
amount: number;
/**申请事由*/
applyReason: string;
/**付款方开户银行*/
branchName: string;
/**付款方联行号*/
branchNo: string;
/**公司主体ID*/
companyId: number;
/**退款汇总清单集合*/
countVOs: RefundApplyCountVO[];
/**制单日期(yyyy-MM-dd)*/
createDate: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**事业部*/
departmentName: string;
/**ID*/
id: number;
/**制单人*/
inputUser: number;
/**制单人*/
inputUserName: string;
/**优惠告知书金额*/
noticeAmount: number;
/**事业部ID*/
orgId: number;
/**是否被驳回标记0-否1-是*/
overruleMark: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款申请单编号*/
refundApplyNo: string;
/**退款申请附件集合*/
refundAttachments: RefundAttachment[];
/**退款汇总信息*/
refundInfo: RefundInfo;
/**undefined*/
refundItems: RefundItemVO[];
/**操作日志集合*/
refundRecords: RefundRecord[];
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
status: string;
/**OA流程ID*/
summaryId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundAttachment*/
export interface RefundAttachment {
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
/**文件类型：oa/基础(Basic-Basic、OA-OA)*/
fileType: string;
/**ID*/
id: number;
/**退款申请id*/
refundApplyId: number;
/**文件类型(RefundApprovalForm-开发签字退款审批表、Other-其他)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundAttachmentVO*/
export interface RefundAttachmentVO {
/**文件ID*/
fileId: string;
/**文件名*/
fileName: string;
/**文件类型(RefundApprovalForm-开发签字退款审批表、Other-其他)*/
type: string;
}
/**RefundInfo*/
export interface RefundInfo {
/**付款方（我司）*/
accountName: string;
/**付款银行账号*/
accountNo: string;
/**本次申请退款金额*/
amount: string;
/**付款方开户行*/
branchName: string;
/**原收款金额*/
contAmount: number;
/**业务类型*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**收款方开户方及银行账号*/
refundAccount: string;
/**退款申请编号*/
refundApplyNo: string;
/**退款申请人*/
refundItemUser: string;
/**收款人（退款人）*/
refundName: string;
/**合同成交单位*/
transactionUnit: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundInfoVO*/
export interface RefundInfoVO {
/**付款方（我司）*/
accountName: string;
/**付款银行账号*/
accountNo: string;
/**本次申请退款金额*/
amount: string;
/**付款方开户行*/
branchName: string;
/**原收款金额*/
contAmount: number;
/**业务类型*/
contType: string;
/**收款方开户方及银行账号*/
refundAccount: string;
/**退款申请编号*/
refundApplyNo: string;
/**退款申请人*/
refundItemUser: string;
/**收款人（退款人）*/
refundName: string;
/**合同成交单位*/
transactionUnit: string;
}
/**RefundItemAddParamVO*/
export interface RefundItemAddParamVO {
/**退款金额*/
amount: number;
/**附件集合*/
attachments: RefundItemAttachment[];
/**优惠告知书ID*/
businessId: number;
/**成交ID*/
dealId: number;
/**退款项来源-暂时取消必填(NOTICE-优惠告知书发起补充协议发起退款申请、PerformanceChanges-补充成交报告业绩变更、CheckOutRefund-补充成交退房退款)*/
itemSource: string;
/**优惠告知书收款金额*/
noticeAmount: number;
/**组织id*/
orgId: number;
/**结佣付款单号集合*/
payVOs: RefundItemPayVO[];
/**项目id*/
proId: number;
/**退款人账号*/
refundAccount: string;
/**退款人开户行*/
refundBankName: string;
/**优惠告知书业主姓名*/
refundItemUser: string;
/**退款人姓名*/
refundName: string;
}
/**RefundItemAttachment*/
export interface RefundItemAttachment {
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
/**待退款项id*/
refundItemId: number;
/**文件类型(NoticeBook-优惠告知书、RefundBook-退款申请书、CopyOfIdCardRefund-退款人身份证扫描件、CollectionAttachment-收款附件、CopyOfBankCard-退款人银行卡复印件、MyCertificate-明源退房证明、Other-其他)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundItemAttachmentVO*/
export interface RefundItemAttachmentVO {
/**附件是否齐全标识[0-否1-是]*/
attachmentComplete: number;
/**待退款项附件集合*/
attachmentVOs: ItemAttachmentVO[];
/**待退款项ID*/
itemID: number;
}
/**RefundItemAttachmentVO_1*/
export interface RefundItemAttachmentVO_1 {
/**文件ID*/
fileId: string;
/**文件名*/
fileName: string;
/**ID*/
id: number;
/**退款申请退款项id*/
refundApplyItemId: number;
/**文件类型(NoticeBook-优惠告知书、RefundBook-退款申请书、CopyOfIdCardRefund-退款人身份证扫描件、CollectionAttachment-收款附件、CopyOfBankCard-退款人银行卡复印件、MyCertificate-明源退房证明、Other-其他)*/
type: string;
}
/**RefundItemExportQueryVO*/
export interface RefundItemExportQueryVO {
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**截止时间(yyyy-MM-dd)*/
endTime: string;
/**项目id*/
proId: number;
/**关联退款申请单编号*/
refundApplyNO: string;
/**退款人姓名*/
refundName: string;
/**退款状态(PendingApply-待申请、UnderReview-审核中、Refunding-退款中、Refunded-已退款)*/
status: string;
}
/**RefundItemPayVO*/
export interface RefundItemPayVO {
/**结佣付款ID*/
payId: number;
/**结佣付款单号*/
payNo: string;
/**待退款项ID*/
refundItemId: number;
}
/**RefundItemPush*/
export interface RefundItemPush {
/**付款方账户名称*/
accountName: string;
/**付款方账号*/
accountNo: string;
/**退款金额*/
amount: number;
/**付款方开户银行*/
branchName: string;
/**付款方联行号*/
branchNo: string;
/**公司ID*/
companyId: number;
/**申请日期(yyyy-MM-dd)*/
createDate: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**支付日期(yyyy-MM-dd HH:mm:ss)*/
payDate: string;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**推送日期(yyyy-MM-dd)*/
pushDate: string;
/**退款人账号*/
refundAccount: string;
/**退款申请单编号*/
refundApplyNo: string;
/**退款人开户行*/
refundBankName: string;
/**退款人姓名*/
refundName: string;
/**退款项编号*/
refundNo: string;
/**唯一支付编号*/
refundPayNo: string;
/**备注信息*/
remark: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**退款状态(PendingPay-待退款、RefundedTicket-已退票、Paying-付款中、Paid-付款成功)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundItemPushQueryVO*/
export interface RefundItemPushQueryVO {
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**付款方ID*/
companyId: number;
/**日期类型[1-申请日期;2-推送日期;3-付款日期]*/
dateType: number;
/**截止时间(yyyy-MM-dd)*/
endTime: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**退款申请单编号*/
refundApplyNo: string;
/**收款人姓名*/
refundName: string;
/**唯一支付编号*/
refundPayNo: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**退款状态(PendingPay-待退款、RefundedTicket-已退票、Paying-付款中、Paid-付款成功)*/
status: string;
}
/**RefundItemPushSetUpARefundVO*/
export interface RefundItemPushSetUpARefundVO {
/**ID*/
id: number;
/**退款时间(yyyy-MM-dd)*/
payTime: string;
}
/**RefundItemPushSyncStatusVO*/
export interface RefundItemPushSyncStatusVO {
/**ID*/
id: number;
/**推送唯一支付编号*/
refundPayNo: string;
}
/**RefundItemPushUpdateVO*/
export interface RefundItemPushUpdateVO {
/**付款方账号*/
accountNo: string;
/**付款方公司ID*/
companyId: number;
/**ID*/
id: number;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**收款人账号*/
refundAccount: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
}
/**RefundItemPushVO*/
export interface RefundItemPushVO {
/**付款方账户名称*/
accountName: string;
/**付款方账号*/
accountNo: string;
/**退款金额*/
amount: number;
/**付款方开户银行*/
branchName: string;
/**付款方联行号*/
branchNo: string;
/**公司ID*/
companyId: number;
/**申请日期(yyyy-MM-dd)*/
createDate: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**支付日期(yyyy-MM-dd HH:mm:ss)*/
payDate: string;
/**付款方式(CashPay-现金支付、OtherPay-其他支付)*/
payType: string;
/**推送日期(yyyy-MM-dd)*/
pushDate: string;
/**退款人账号*/
refundAccount: string;
/**退款申请单编号*/
refundApplyNo: string;
/**退款人开户行*/
refundBankName: string;
/**退款人姓名*/
refundName: string;
/**退款项编号*/
refundNo: string;
/**唯一支付编号*/
refundPayNo: string;
/**备注信息*/
remark: string;
/**结算方式(CentralizedPay-集中支付、OnlinePay-网银支付)*/
settlementType: string;
/**退款状态(PendingPay-待退款、RefundedTicket-已退票、Paying-付款中、Paid-付款成功)*/
status: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundItemQueryVO*/
export interface RefundItemQueryVO {
/**开始时间(yyyy-MM-dd)*/
beginTime: string;
/**截止时间(yyyy-MM-dd)*/
endTime: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目id*/
proId: number;
/**关联退款申请单编号*/
refundApplyNO: string;
/**退款人姓名*/
refundName: string;
/**退款状态(PendingApply-待申请、UnderReview-审核中、Refunding-退款中、Refunded-已退款)*/
status: string;
}
/**RefundItemVO*/
export interface RefundItemVO {
/**服务费实收金额*/
actualAmount: number;
/**退款金额*/
amount: number;
/**退款项附件是否齐全标识[0-否1-是]*/
attachmentComplete: number;
/**待退款项附件集合*/
attachmentVOs: ItemAttachmentVO[];
/**优惠告知书ID*/
businessId: number;
/**对外拆佣总合*/
commission: number;
/**业绩确认时间(yyyy-MM-dd)*/
confirmationTime: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**生成日期(yyyy-MM-dd)*/
createDate: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交单位*/
dealCompany: string;
/**成交客户姓名*/
dealCustomerName: string;
/**成交ID*/
dealId: number;
/**成交报告编号*/
dealNo: string;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**发票业务单号*/
invoiceNo: string;
/**退款项来源(NOTICE-优惠告知书发起补充协议发起退款申请、PerformanceChanges-补充成交报告业绩变更、CheckOutRefund-补充成交退房退款)*/
itemSource: string;
/**优惠告知书收款金额*/
noticeAmount: number;
/**组织id*/
orgId: number;
/**已结佣付款单号*/
payNo: string;
/**结佣付款单号集合*/
payVOs: RefundItemPayVO[];
/**项目id*/
proId: number;
/**项目名称*/
projectName: string;
/**服务费应收金额*/
receivableAmount: number;
/**退款人账号*/
refundAccount: string;
/**关联退款申请单编号*/
refundApplyNO: string;
/**退款人开户行*/
refundBankName: string;
/**退款发起人*/
refundItemUser: string;
/**退款人姓名*/
refundName: string;
/**退款项编号*/
refundNo: string;
/**退款完成日期(yyyy-MM-dd)*/
refundedDate: string;
/**成交房间ID*/
roomId: number;
/**待退款项退款状态(PendingApply-待申请、UnderReview-审核中、Refunding-退款中、Refunded-已退款)*/
status: string;
/**服务费未收金额*/
uncollectedAmount: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RefundRecord*/
export interface RefundRecord {
/**操作后状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
afterStatus: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**操作前状态(Draft-草稿、PTWYSH-待平台文员审核、FGSYGSH-待分公司业管审核、FGSCWSH-待分公司财务审核、OaAppeal-OA流程审批中、AppealPass-终审通过、AppealDismissed-终审驳回、PayConfirm-支付结果确认中、PaySuccessful-支付成功)*/
frontStatus: string;
/**ID*/
id: number;
/**处理时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作*/
operation: string;
/**处理人*/
operator: string;
/**操作人岗位*/
operatorDept: string;
/**操作人姓名*/
operatorUsername: string;
/**退款申请ID*/
refundApplyId: number;
/**处理意见*/
remark: string;
/**结果*/
result: string;
/**系统类型(Business-业务系统、OA-OA)*/
systemType: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**UnionPayBillQueryVO*/
export interface UnionPayBillQueryVO {
/**支付方式(POS机支付或在线支付)(OnlinePay-在线支付、GZPOS-广州POS机支付、Other-其他)*/
billWay: string;
/**消费模式(TTFP-银行卡支付、SCFP-扫码支付、TPCX-银行卡撤销、SCCX-扫码撤销、TPCZ-银行卡冲正、SCCZ-扫码冲正、Pay-缴费、Refund-退款)*/
consumeModel: string;
/**商户编号*/
merchantNo: string;
/**订单号*/
orderNo: string;
/**终端号*/
terminalNo: string;
/**交易参考号*/
tradeRefNo: string;
/**银联支付流水(银联支付单号)*/
unionPayNo: string;
}
