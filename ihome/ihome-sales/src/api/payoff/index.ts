/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-3-9 9:02:07 ├F10: AM┤
import { request } from '@/api/base'
const basePath = "/sales-api/payoff"
/**限额模版*/
export async function get_file_download_quota_stencil (d?: any) {
return await request.get<any,any>(basePath+'/file/download/quota/stencil', { params: d })
}
/**导出列表*/
export async function post_file_excel_list (d?: any) {
return await request.post< any,any> (basePath+'/file/excel/list', d)
}
/**导出审核列表*/
export async function post_file_excel_review_list (d?: any) {
return await request.post< any,any> (basePath+'/file/excel/review/list', d)
}
/**计算结佣统计数据*/
export async function post_payApply_calculation_results (d?: any) {
return await request.post< CalculationResultsResponse,CalculationResultsResponse> (basePath+'/payApply/calculation/results', d)
}
/**通过成交编号查询是否有未完结的付款申请单*/
export async function post_payApply_deal_apply_status__dealCode (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/deal/apply/status/{dealCode}', d)
}
/**删除付款单*/
export async function post_payApply_delete_ids (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/delete/ids', d)
}
/**录入付款单*/
export async function post_payApply_entryApply (d?: any) {
return await request.post< number,number> (basePath+'/payApply/entryApply', d)
}
/**退款：通过成交编号，获取付款申请单编号*/
export async function get_payApply_finance_applyCodes__dealCode (d?: any) {
return await request.get<RefundItemPayVO[],RefundItemPayVO[]>(basePath+'/payApply/finance/applyCodes/{dealCode}', { params: d })
}
/**分公司财务审核*/
export async function post_payApply_financeReviewApply (d?: any) {
return await request.post< number,number> (basePath+'/payApply/financeReviewApply', d)
}
/**通过编号查询付款详情*/
export async function get_payApply_get_applyCode (d?: any) {
return await request.get<ShowPayApplyDetailResponse,ShowPayApplyDetailResponse>(basePath+'/payApply/get/applyCode', { params: d })
}
/**查询付款详情*/
export async function get_payApply_get__id (d?: any) {
return await request.get<ShowPayApplyDetailResponse,ShowPayApplyDetailResponse>(basePath+'/payApply/get/{id}', { params: d })
}
/**查询付款列表*/
export async function post_payApply_getList (d?: any) {
return await request.post< any,any> (basePath+'/payApply/getList', d)
}
/**非分公司财务审核*/
export async function post_payApply_notFinanceReviewApply (d?: any) {
return await request.post< number,number> (basePath+'/payApply/notFinanceReviewApply', d)
}
/**付款申请单补充附件*/
export async function post_payApply_payApplySuppFile (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/payApplySuppFile', d)
}
/**结佣限额导入*/
export async function post_payApply_quota (d?: any) {
return await request.post< any,any> (basePath+'/payApply/quota', d)
}
/**审核列表*/
export async function post_payApply_review_list (d?: any) {
return await request.post< any,any> (basePath+'/payApply/review/list', d)
}
/**修改付款单*/
export async function post_payApply_updateApply (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/updateApply', d)
}
/**小程序：计算付款单金额*/
export async function post_payApply_wechat_calculation (d?: any) {
return await request.post< StaffWechatCalculationResponse,StaffWechatCalculationResponse> (basePath+'/payApply/wechat/calculation', d)
}
/**小程序：渠道查询结佣信息*/
export async function post_payApply_wechat_channel_list (d?: any) {
return await request.post< any,any> (basePath+'/payApply/wechat/channel/list', d)
}
/**小程序：创建付款申请单*/
export async function post_payApply_wechat_create (d?: any) {
return await request.post< number,number> (basePath+'/payApply/wechat/create', d)
}
/**小程序：查询成交详情*/
export async function post_payApply_wechat_deal_detail__dealCode (d?: any) {
return await request.post< DealDetailResponse,DealDetailResponse> (basePath+'/payApply/wechat/deal/detail/{dealCode}', d)
}
/**小程序：查询付款单详情*/
export async function post_payApply_wechat_detail__applyId (d?: any) {
return await request.post< StaffWechatDetailsResponse,StaffWechatDetailsResponse> (basePath+'/payApply/wechat/detail/{applyId}', d)
}
/**小程序：员工查询结佣信息*/
export async function post_payApply_wechat_staff_list (d?: any) {
return await request.post< any,any> (basePath+'/payApply/wechat/staff/list', d)
}
/**撤回提交*/
export async function post_payApply_withdrawSubmit (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payApply/withdrawSubmit', d)
}
/**结佣成交数据创建*/
export async function post_payDeal_create (d?: any) {
return await request.post< number,number> (basePath+'/payDeal/create', d)
}
/**查询结佣成交列表*/
export async function post_payDeal_getList (d?: any) {
return await request.post< any,any> (basePath+'/payDeal/getList', d)
}
/**定时任务*/
export async function get_payDeal_timed_task (d?: any) {
return await request.get<any,any>(basePath+'/payDeal/timed/task', { params: d })
}
/**指定同步成交*/
export async function post_payDeal_timed_taskDeal (d?: any) {
return await request.post< any,any> (basePath+'/payDeal/timed/taskDeal', d)
}
/**tset*/
export async function post_payDeal_tset (d?: any) {
return await request.post< any,any> (basePath+'/payDeal/tset', d)
}
/**结佣成交数据更新*/
export async function post_payDeal_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDeal/update', d)
}
/**员工成交列表查询*/
export async function post_payDeal_wechat_staff_getList (d?: any) {
return await request.post< any,any> (basePath+'/payDeal/wechat/staff/getList', d)
}
/**根据成交编号查询结佣成交数据*/
export async function get_payDeal__dealNo (d?: any) {
return await request.get<PayDealVO,PayDealVO>(basePath+'/payDeal/{dealNo}', { params: d })
}
/**创建抵扣项*/
export async function post_payDeductDetail_create (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDeductDetail/create', d)
}
/**查询未抵扣的信息*/
export async function post_payDeductDetail_deduct_details (d?: any) {
return await request.post< PayDeductDetailInfo[],PayDeductDetailInfo[]> (basePath+'/payDeductDetail/deduct/details', d)
}
/**查询结佣抵扣明细列表*/
export async function post_payDeductDetail_getPayDeductDetailList (d?: any) {
return await request.post< any,any> (basePath+'/payDeductDetail/getPayDeductDetailList', d)
}
/**抵扣汇总列表*/
export async function post_payDeductDetail_summary_list (d?: any) {
return await request.post< any,any> (basePath+'/payDeductDetail/summary/list', d)
}
/**设置已付款*/
export async function post_payDetail_change_status (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDetail/change/status', d)
}
/**付款列表分页查询*/
export async function post_payDetail_getList (d?: any) {
return await request.post< any,any> (basePath+'/payDetail/getList', d)
}
/**处理反馈状态结果*/
export async function post_payDetail_need_feedback_status_callback (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDetail/need/feedback/status/callback', d)
}
/**定时反馈状态*/
export async function get_payDetail_need_feedback_status_payDetails (d?: any) {
return await request.get<PaymentStateFeedbackVo[],PaymentStateFeedbackVo[]>(basePath+'/payDetail/need/feedback/status/payDetails', { params: d })
}
/**同步状态回调*/
export async function post_payDetail_need_sys_status_callback (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDetail/need/sys/status/callback', d)
}
/**获取需要同步状态的明细*/
export async function get_payDetail_need_sys_status_payDetails (d?: any) {
return await request.get<PaymentStateQueryVo[],PaymentStateQueryVo[]>(basePath+'/payDetail/need/sys/status/payDetails', { params: d })
}
/**合并订单推送*/
export async function post_payDetail_push (d?: any) {
return await request.post< PayDetailPushResponse,PayDetailPushResponse> (basePath+'/payDetail/push', d)
}
/**模拟支付推送*/
export async function post_payDetail_simulated_payment_plus (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDetail/simulated/payment/plus', d)
}
/**模拟支付同步*/
export async function post_payDetail_simulated_payment_sys (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDetail/simulated/payment/sys', d)
}
/**付款单拆分*/
export async function post_payDetail_split (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDetail/split', d)
}
/**同步状态*/
export async function post_payDetail_sys_status__paymentCode (d?: any) {
return await request.post< PayDetailPushResponse,PayDetailPushResponse> (basePath+'/payDetail/sys/status/{paymentCode}', d)
}
/**付款单修改*/
export async function post_payDetail_update (d?: any) {
return await request.post< boolean,boolean> (basePath+'/payDetail/update', d)
}
/**查询付款审核日志*/
export async function get_processRecord_getProcessRecordList__applyId (d?: any) {
return await request.get<ProcessRecordResponse[],ProcessRecordResponse[]>(basePath+'/processRecord/getProcessRecordList/{applyId}', { params: d })
}
/**待同步的表单流程ID*/
export async function get_processRecord_oa_flow_ids (d?: any) {
return await request.get<number[],number[]>(basePath+'/processRecord/oa/flow/ids', { params: d })
}
/**获取OA审核日志*/
export async function get_processRecord_oa_review_log__applyId (d?: any) {
return await request.get<ShowRecordResponse[],ShowRecordResponse[]>(basePath+'/processRecord/oa/review/log/{applyId}', { params: d })
}
/**获取oa当前待办人*/
export async function get_processRecord_oa_review_person__applyId (d?: any) {
return await request.get<OaAttorneysResponse,OaAttorneysResponse>(basePath+'/processRecord/oa/review/person/{applyId}', { params: d })
}
/**流程节点*/
export async function get_processRecord_process_node__applyId (d?: any) {
return await request.get<ProcessNodeResponse[],ProcessNodeResponse[]>(basePath+'/processRecord/process/node/{applyId}', { params: d })
}
/**模拟OA审核通过*/
export async function post_processRecord_simulation_oa_pass (d?: any) {
return await request.post< boolean,boolean> (basePath+'/processRecord/simulation/oa/pass', d)
}
/**OA审批日志回写*/
export async function post_processRecord_sync_oa_logs (d?: any) {
return await request.post< boolean,boolean> (basePath+'/processRecord/sync/oa/logs', d)
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
/**ApplyUpdateRequest*/
export interface ApplyUpdateRequest {
/**申请单编号*/
applyCode: string;
/**修改本期实际付款税额 = true , 没修改本期实际付款税额 = false*/
modify: boolean;
/**其他扣除项*/
otherDeductionDetailResponseList: OtherDeductionDetailResponse[];
/**付款单主体信息*/
payApplyVO: PayApplyAddVO;
/**结佣汇总清单*/
paySummaryDetailsResponseList: PaySummaryDetailsResponse[];
/**附件信息*/
documentList: DocumentAddVO[];
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
/**本期需抵扣金额明细*/
payDeductDetailResponseList: PayDeductDetailResponse[];
}
/**CalculationResultsRequest*/
export interface CalculationResultsRequest {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**付款申请单ID*/
applyId: number;
/**发票税率*/
taxRate: number;
/**其他扣除项*/
otherDeductionDetailCalculationRequestList: OtherDeductionDetailCalculationRequest[];
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
/**本期需抵扣金额明细*/
payDeductDetailCalculationRequestList: PayDeductDetailCalculationRequest[];
}
/**CalculationResultsResponse*/
export interface CalculationResultsResponse {
/**本期实际支付金额*/
actualAmount: number;
/**本期申请支付金额*/
applyAmount: number;
/**本期扣除金额*/
deductAmount: number;
/**(必填)扣除类别项*/
deductionCategory: string;
/**本期扣罚金额*/
finedAmount: number;
/**不含税金额*/
noTaxAmount: number;
/**渠道公司周期结佣汇总*/
paySummaryDetailsResponses: PaySummaryDetailsResponse[];
/**税额*/
tax: number;
/**附件信息*/
documentList: DocumentAddVO[];
}
/**ChangeStatusRequest*/
export interface ChangeStatusRequest {
/**id*/
id: number;
/**付款日期(yyyy-MM-dd)*/
paymentDate: string;
}
/**ChannelWechatListRequest*/
export interface ChannelWechatListRequest {
/**渠道商ID*/
agencyId: number;
/**状态*/
appletsChannelInquiryList: string[];
/**付款单编号*/
applyCode: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**ChannelWechatListResponse*/
export interface ChannelWechatListResponse {
/**实际支付金额*/
actualAmount: number;
/**申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**扣除金额*/
deductAmount: number;
/**付款单ID*/
id: number;
/**制单日期(yyyy-MM-dd)*/
makerTime: string;
/**驳回标识(Yes-是、No-否)*/
rejectionMark: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
}
/**CommissionRecordResponse*/
export interface CommissionRecordResponse {
/**结佣金额*/
applyAmount: number;
/**付款申请单编号*/
applyCode: string;
/**结佣时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
}
/**Deal*/
export interface Deal {
/**业绩分配日期(yyyy-MM-dd HH:mm:ss)*/
allotDate: string;
/**业绩分配人ID*/
alloterId: number;
/**业务类型(New-新房、Finished-产成品)*/
businessType: string;
/**计算方式(Auto-自动、Manual-手动)*/
calculation: string;
/**收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
charge: string;
/**分销协议编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期ID*/
cycleId: number;
/**数据标志(明源)(NoMingYuan-非明源数据、WholeMingYuan-完整明源数据、NoWholeMingYuan-不完整明源数据)*/
dataSign: string;
/**成交报告编号*/
dealCode: string;
/**成交组织ID*/
dealOrgId: number;
/**已删除*/
deleted: number;
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**录入人ID*/
entryPersonId: number;
/**ID*/
id: number;
/**是否代销(Yes-是、No-否)*/
isConsign: string;
/**是否市场化项目(Yes-是、No-否)*/
isMarketProject: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
modelCode: string;
/**一手代理团队ID*/
oneAgentTeamId: number;
/**主成交ID*/
parentId: number;
/**备案情况(Has-有、No-无)*/
recordState: string;
/**细分业务模式(All-总包、District-分销)*/
refineModel: string;
/**备注*/
remarks: string;
/**报备信息ID*/
reportId: number;
/**明源房款回笼比例(%)*/
returnRatio: number;
/**现场销售*/
sceneSales: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
stage: string;
/**成交状态(Reject-驳回、Draft-草稿、AchieveDeclareUnconfirm-业绩申报待确认、PlatformClerkUnreview-平台文员待审核、HeadDepartUnreview-事业部负责人待审核、BranchBusinessManageUnreview-分公司业管待审核、NotSigned-待签署生效、ReviewPassed-已审核)*/
status: string;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**认购价格*/
subscribePrice: number;
/**补充成交类型(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
suppContType: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**DealDetailResponse*/
export interface DealDetailResponse {
/**房号*/
buildingNo: string;
/**结佣记录*/
commissionRecordResponseList: CommissionRecordResponse[];
/**客户名称*/
customerName: string;
/**联系方式*/
customerPhone: string;
/**楼盘名称*/
proName: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、Other-其他)*/
propertyType: string;
/**房号*/
roomNo: string;
/**可结佣金*/
totalCanCommFees: number;
/**在结佣金*/
totalInCommFees: number;
/**已结佣金*/
totalSettledCommFees: number;
/**未结佣金*/
totalUnsetCommFees: number;
}
/**DealHouseResponseVO*/
export interface DealHouseResponseVO {
/**渠道商ID*/
channelId: number;
/**主成家报告*/
deal: Deal;
/**成交房产*/
house: House;
}
/**DeductDetailsRequest*/
export interface DeductDetailsRequest {
/**渠道ID*/
channelId: number;
/**项目ID*/
projectId: number;
}
/**DocumentAddVO*/
export interface DocumentAddVO {
/**是否自动生成*/
exAuto: number;
/**(必填)文件ID*/
fileId: string;
/**(必填)文件名称*/
fileName: string;
/**(必填)文件类型(Contract-合同、BusinessLicense-营业执照、Invoice-发票、RequestForm-请款单、ConfirmDetail-开发签字确认明细、SetteDetail-结算明细、Other-其他、TripleOne-三重一大)*/
fileType: string;
}
/**DocumentResponse*/
export interface DocumentResponse {
/**付款申请ID*/
applyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**是否自动生成*/
exAuto: number;
/**文件ID*/
fileId: string;
/**文件名称*/
fileName: string;
/**文件类型(Contract-合同、BusinessLicense-营业执照、Invoice-发票、RequestForm-请款单、ConfirmDetail-开发签字确认明细、SetteDetail-结算明细、Other-其他、TripleOne-三重一大)*/
fileType: string;
/**ID*/
id: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**EntryApplyRequest*/
export interface EntryApplyRequest {
/**修改本期实际付款税额 = true , 没修改本期实际付款税额 = false*/
modify: boolean;
/**付款单主体信息*/
payApplyVO: PayApplyAddVO;
/**附件信息*/
documentList: DocumentAddVO[];
/**其他扣除项*/
otherDeductionDetailCalculationRequestList: OtherDeductionDetailCalculationRequest[];
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
/**本期需抵扣金额明细*/
payDeductDetailCalculationRequestList: PayDeductDetailCalculationRequest[];
}
/**FinanceReviewApplyVO*/
export interface FinanceReviewApplyVO {
/**修改本期实际付款税额 = true , 没修改本期实际付款税额 = false*/
modify: boolean;
/**待付款单列表*/
payApplyDetailList: PayApplyDetailAddVO[];
/**付款单主体信息*/
reviewUpdateMainBody: ReviewUpdateMainBody;
/**(必填)付款单ID*/
applyId: number;
/**(必填)审核意见*/
auditOpinion: string;
/**保存操作不能为空： 附件信息*/
documentList: DocumentAddVO[];
/**其他扣除项*/
otherDeductionDetailCalculationRequestList: OtherDeductionDetailCalculationRequest[];
/**本期需抵扣金额明细*/
payDeductDetailCalculationRequestList: PayDeductDetailCalculationRequest[];
/**(必填)操作状态(TemporaryStorage-暂存、Through-通过、Reject-驳回、Saving-保存)*/
payoffApproval: string;
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
/**House*/
export interface House {
/**房屋地址*/
address: string;
/**面积*/
area: number;
/**栋座ID*/
buildingId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交ID*/
dealId: number;
/**已删除*/
deleted: number;
/**厅*/
hall: number;
/**ID*/
id: number;
/**厨*/
kitchen: number;
/**房产证/预售合同编号*/
propertyNo: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、Other-其他)*/
propertyType: string;
/**室*/
room: number;
/**房号ID*/
roomId: number;
/**房号*/
roomNo: string;
/**卫*/
toilet: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**NotFinanceReviewApplyVO*/
export interface NotFinanceReviewApplyVO {
/**(必填)ID*/
id: number;
/**(必填)审核意见*/
auditOpinion: string;
/**(必填)操作(TemporaryStorage-暂存、Through-通过、Reject-驳回、Saving-保存)*/
payoffApproval: string;
}
/**OaAttorneysResponse*/
export interface OaAttorneysResponse {
/**名字*/
name: string;
/**岗位*/
orgPostName: string;
/**结果*/
result: string;
/**状态*/
status: boolean;
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
/**OtherDeductionDetailCalculationRequest*/
export interface OtherDeductionDetailCalculationRequest {
/**周期ID*/
cycleId: number;
/**周期名字*/
cycleName: string;
/**本期扣除金额*/
deductAmount: number;
/**不含税金额*/
noTaxAmount: number;
/**其他扣除类型(TaxDifference-税额差、Deduction-扣罚、Other-其他)*/
otherDeductionType: string;
/**备注*/
remark: string;
/**税额*/
tax: number;
}
/**OtherDeductionDetailResponse*/
export interface OtherDeductionDetailResponse {
/**付款申请单编号*/
applyCode: string;
/**付款申请单ID*/
applyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期ID*/
cycleId: number;
/**周期名字*/
cycleName: string;
/**本期扣除金额*/
deductAmount: number;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**不含税金额*/
noTaxAmount: number;
/**其他扣除类型(TaxDifference-税额差、Deduction-扣罚、Other-其他)*/
otherDeductionType: string;
/**备注*/
remark: string;
/**税额*/
tax: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayApplyAddVO*/
export interface PayApplyAddVO {
/**本期实际支付金额*/
actualAmount: number;
/**渠道收款账号开户行*/
agencyAccountBank: string;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**本期申请支付金额*/
applyAmount: number;
/**所属组织ID*/
belongOrgId: number;
/**所属组织*/
belongOrgName: string;
/**本期扣除金额*/
deductAmount: number;
/**(必填)扣除类别项*/
deductionCategory: string;
/**(必填)申请说明*/
description: string;
/**本期扣罚金额*/
finedAmount: number;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）)*/
invoiceType: string;
/**制单人ID*/
makerId: number;
/**制单日期(yyyy-MM-dd)*/
makerTime: string;
/**本期实际付款金额（不含税）*/
noTaxAmount: number;
/**项目ID*/
projectId: number;
/**项目*/
projectName: string;
/**渠道收款账号*/
receiveAccount: string;
/**当前状态： 保存 = Unconfirm ；提交 = PlatformClerkUnreview(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
/**本期实际付款税额*/
tax: number;
/**发票税率*/
taxRate: number;
}
/**PayApplyDetailAddVO*/
export interface PayApplyDetailAddVO {
/**实际付款金额*/
actualAmount: number;
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**(必填)代理费可结佣*/
ageCanCommFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费付款限额*/
ageLimitFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**本次代理费结佣付款金额*/
ageThisCommFees: number;
/**本次申请代理费列表*/
ageThisCommFeesList: PayApplyDetailCommCreateRequest[];
/**(必填)代理费未收*/
ageUnpaidFees: number;
/**(必填)代理费未结佣*/
ageUnsetCommFees: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**可结佣理费列表*/
canCommFeesList: PayApplyDetailCommCreateRequest[];
/**拆佣代理费列表*/
commFeesList: PayApplyDetailCommCreateRequest[];
/**分销协议编号*/
contNo: string;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**扣除项类别*/
deductType: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**不含税金额*/
noTaxAmount: number;
/**项目ID*/
projectId: number;
/**本次支付比例(%)*/
ratio: number;
/**服务费实收*/
serActualFees: number;
/**(必填)服务费可结佣*/
serCanCommFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费付款限额*/
serLimitFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**本次服务费结佣付款金额*/
serThisCommFees: number;
/**(必填)服务费未收*/
serUnpaidFees: number;
/**(必填)服务费未结佣*/
serUnsetCommFees: number;
/**已结佣理费列表*/
settledCommFeesList: PayApplyDetailCommCreateRequest[];
/**签字确认*/
signConfirm: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**税额*/
tax: number;
/**本次应扣*/
thisDeduct: number;
/**未结佣理费列表*/
unsetCommFeesList: PayApplyDetailCommCreateRequest[];
}
/**PayApplyDetailCommCreateRequest*/
export interface PayApplyDetailCommCreateRequest {
/**代理费金额*/
agencyFeesAmount: number;
/**代理费类型(CommFees-拆佣、SettledCommFees-已结佣、UnsetCommFees-未结佣、CanCommFees-可结佣、ThisCommFees-申请金额)*/
agencyFeesType: string;
/**付款申请单编号*/
applyCode: string;
/**付款申请单ID*/
applyId: number;
/**成交报告编号*/
dealCode: string;
/**甲方ID*/
partyA: number;
/**甲方名字*/
partyAName: string;
}
/**PayApplyDetailCommResponse*/
export interface PayApplyDetailCommResponse {
/**代理费金额*/
agencyFeesAmount: number;
/**代理费类型(CommFees-拆佣、SettledCommFees-已结佣、UnsetCommFees-未结佣、CanCommFees-可结佣、ThisCommFees-申请金额)*/
agencyFeesType: string;
/**付款申请单编号*/
applyCode: string;
/**付款申请单ID*/
applyId: number;
/**成交报告编号*/
dealCode: string;
/**甲方ID*/
partyA: number;
/**甲方名字*/
partyAName: string;
}
/**PayApplyDetailResponse*/
export interface PayApplyDetailResponse {
/**实际付款金额*/
actualAmount: number;
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费付款限额*/
ageLimitFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**本次代理费结佣付款金额*/
ageThisCommFees: number;
/**本次申请代理费列表*/
ageThisCommFeesList: PayApplyDetailCommResponse[];
/**代理费未收*/
ageUnpaidFees: number;
/**代理费未结佣*/
ageUnsetCommFees: number;
/**付款单ID*/
applyId: number;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**可结佣理费列表*/
canCommFeesList: PayApplyDetailCommResponse[];
/**拆佣代理费列表*/
commFeesList: PayApplyDetailCommResponse[];
/**分销协议编号*/
contNo: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**扣除项类别*/
deductType: string;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**不含税金额*/
noTaxAmount: number;
/**项目ID*/
projectId: number;
/**本次支付比例(%)*/
ratio: number;
/**服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费付款限额*/
serLimitFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**本次服务费结佣付款金额*/
serThisCommFees: number;
/**服务费未收*/
serUnpaidFees: number;
/**服务费未结佣*/
serUnsetCommFees: number;
/**已结佣理费列表*/
settledCommFeesList: PayApplyDetailCommResponse[];
/**签字确认*/
signConfirm: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**税额*/
tax: number;
/**本次应扣*/
thisDeduct: number;
/**未结佣理费列表*/
unsetCommFeesList: PayApplyDetailCommResponse[];
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayApplyDocumentRequest*/
export interface PayApplyDocumentRequest {
/**(必填)附件信息*/
documents: DocumentAddVO[];
/**(必填)ID*/
id: number;
/**附言*/
postscript: string;
}
/**PayApplyExcelRequest*/
export interface PayApplyExcelRequest {
/**渠道商名称*/
agencyName: string;
/**付款单编号*/
applyCode: string;
/**制单日期起(yyyy-MM-dd HH:mm:ss)*/
beginMakerTime: string;
/**组织*/
belongOrgId: number;
/**制单日期止(yyyy-MM-dd HH:mm:ss)*/
endMakerTime: string;
/**制单人*/
makerId: number;
/**事业部ID*/
orgIds: number[];
/**审核人*/
reviewerId: number;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
}
/**PayApplyListVO*/
export interface PayApplyListVO {
/**实际支付金额*/
actualAmount: number;
/**渠道商名称*/
agencyName: string;
/**申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**所属组织*/
belongOrgName: string;
/**所属组织Id*/
belongOrgid: number;
/**结算单*/
billForm: string;
/**扣除金额*/
deductAmount: number;
/**付款单ID*/
id: number;
/**撤回标识: 待分公司业管审核撤回 = true*/
jump: boolean;
/**制单人*/
maker: string;
/**制单人*/
makerId: number;
/**制单日期(yyyy-MM-dd)*/
makerTime: string;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**驳回标识(Yes-是、No-否)*/
rejectionMark: string;
/**请款单*/
requestForm: string;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
}
/**PayApplyQueryVO*/
export interface PayApplyQueryVO {
/**渠道商ID*/
agencyId: number;
/**付款单编号*/
applyCode: string;
/**制单日期起(yyyy-MM-dd HH:mm:ss)*/
beginMakerTime: string;
/**组织*/
belongOrgId: number;
/**制单日期止(yyyy-MM-dd HH:mm:ss)*/
endMakerTime: string;
/**制单人*/
makerId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**审核人*/
reviewerId: number;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
}
/**PayApplyReviewExcelRequest*/
export interface PayApplyReviewExcelRequest {
/**渠道商ID*/
agencyId: number;
/**付款单编号*/
applyCode: string;
/**所属组织*/
belongOrgId: number;
/**制单开始时间(yyyy-MM-dd)*/
makerBeginDate: string;
/**制单结束时间(yyyy-MM-dd)*/
makerEndDate: string;
/**制单人*/
makerId: number;
/**事业部ID*/
orgIds: number[];
/**审核人*/
reviewId: number;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
}
/**PayDealAddVO*/
export interface PayDealAddVO {
/**(必填)地址*/
address: string;
/**(必填)代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**(必填)代理费拆佣*/
ageCommFees: number;
/**(必填)代理费应收*/
ageReceiveFees: number;
/**(必填)代理费已结佣*/
ageSettledCommFees: number;
/**(必填)代理费未收*/
ageUnpaidFees: number;
/**(必填)代理费未结佣*/
ageUnsetCommFees: number;
/**(必填)渠道商ID*/
agencyId: number;
/**(必填)渠道商名称*/
agencyName: string;
/**(必填)业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**代理费信息*/
commFeesList: PayDealCommCreateRequest[];
/**(必填)分销协议编号*/
contNo: string;
/**(必填)合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**(必填)客户*/
customer: string;
/**(必填)周期ID*/
cycleId: number;
/**(必填)周期名称*/
cycleName: string;
/**(必填)成交报告编号*/
dealCode: string;
/**(必填)成交ID*/
dealId: number;
/**成交信息*/
dealInfoResults: DealHouseResponseVO[];
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**(必填)录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**(必填)是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**结算状态(AlreadyNotSettlement-已结算、NotSettlement-未结算)*/
payDealStatus: string;
/**(必填)服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**(必填)服务费拆佣*/
serCommFees: number;
/**(必填)服务费应收*/
serReceiveFees: number;
/**(必填)服务费已结佣*/
serSettledCommFees: number;
/**(必填)服务费未收*/
serUnpaidFees: number;
/**(必填)服务费未结佣*/
serUnsetCommFees: number;
/**(必填)签约日期(yyyy-MM-dd)*/
signDate: string;
/**(必填)签约价格*/
signPrice: number;
/**(必填)认购日期(yyyy-MM-dd)*/
subscribeDate: string;
}
/**PayDealCommCreateRequest*/
export interface PayDealCommCreateRequest {
/**代理费金额*/
agencyFeesAmount: number;
/**代理费类型(CommFees-拆佣、SettledCommFees-已结佣、UnsetCommFees-未结佣、CanCommFees-可结佣、ThisCommFees-申请金额)*/
agencyFeesType: string;
/**成交报告编号*/
dealCode: string;
/**甲方ID*/
partyA: number;
/**甲方名字*/
partyAName: string;
}
/**PayDealCommVO*/
export interface PayDealCommVO {
/**代理费金额*/
agencyFeesAmount: number;
/**代理费类型(CommFees-拆佣、SettledCommFees-已结佣、UnsetCommFees-未结佣、CanCommFees-可结佣、ThisCommFees-申请金额)*/
agencyFeesType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**成交报告编号*/
dealCode: string;
/**已删除*/
deleted: number;
/**ID*/
id: number;
/**甲方ID*/
partyA: number;
/**甲方名字*/
partyAName: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayDealListVO*/
export interface PayDealListVO {
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费付款限额*/
ageLimitFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**代理费未收*/
ageUnpaidFees: number;
/**代理费未结佣*/
ageUnsetCommFees: number;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**可结佣理费*/
canCommFeesList: PayDealCommVO[];
/**拆佣代理费*/
commFeesList: PayDealCommVO[];
/**分销协议编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**已删除*/
deleted: number;
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**ID*/
id: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**没有勾选：No 已勾选：Yes(Yes-是、No-否)*/
isSelected: string;
/**项目ID*/
projectId: number;
/**服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费付款限额*/
serLimitFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**服务费未收*/
serUnpaidFees: number;
/**服务费未结佣*/
serUnsetCommFees: number;
/**已结佣理费*/
settledCommFeesList: PayDealCommVO[];
/**签字确认*/
signConfirm: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**未结佣理费*/
unsetCommFeesList: PayDealCommVO[];
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayDealQueryVO*/
export interface PayDealQueryVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**开始时间(yyyy-MM-dd HH:mm:ss)*/
beginTime: string;
/**业务模式*/
busModel: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**客户*/
customer: string;
/**立项周期*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**结束时间(yyyy-MM-dd HH:mm:ss)*/
endTime: string;
/**是否可结佣(Yes-是、No-否)*/
isComm: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
projectId: number;
}
/**PayDealUpdateVO*/
export interface PayDealUpdateVO {
/**(必填)地址*/
address: string;
/**(必填)代理费实收*/
ageActualFees: number;
/**(必填)代理费可结佣*/
ageCanCommFees: number;
/**(必填)代理费拆佣*/
ageCommFees: number;
/**(必填)代理费应收*/
ageReceiveFees: number;
/**(必填)代理费已结佣*/
ageSettledCommFees: number;
/**(必填)代理费未收*/
ageUnpaidFees: number;
/**(必填)代理费未结佣*/
ageUnsetCommFees: number;
/**(必填)渠道商ID*/
agencyId: number;
/**(必填)渠道商名称*/
agencyName: string;
/**(必填)业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**代理费信息*/
commFeesList: PayDealCommCreateRequest[];
/**(必填)分销协议编号*/
contNo: string;
/**(必填)合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**(必填)客户*/
customer: string;
/**(必填)周期ID*/
cycleId: number;
/**(必填)周期名称*/
cycleName: string;
/**(必填)成交报告编号*/
dealCode: string;
/**(必填)成交ID*/
dealId: number;
/**成交信息*/
dealInfoResults: DealHouseResponseVO[];
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**(必填)录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**(必填)是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**结算状态(AlreadyNotSettlement-已结算、NotSettlement-未结算)*/
payDealStatus: string;
/**(必填)服务费实收*/
serActualFees: number;
/**(必填)服务费可结佣*/
serCanCommFees: number;
/**(必填)服务费拆佣*/
serCommFees: number;
/**(必填)服务费应收*/
serReceiveFees: number;
/**(必填)服务费已结佣*/
serSettledCommFees: number;
/**(必填)服务费未收*/
serUnpaidFees: number;
/**(必填)服务费未结佣*/
serUnsetCommFees: number;
/**(必填)签约日期(yyyy-MM-dd)*/
signDate: string;
/**(必填)签约价格*/
signPrice: number;
/**(必填)认购日期(yyyy-MM-dd)*/
subscribeDate: string;
}
/**PayDealVO*/
export interface PayDealVO {
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费付款限额*/
ageLimitFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**代理费未收*/
ageUnpaidFees: number;
/**代理费未结佣*/
ageUnsetCommFees: number;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**可结佣理费*/
canCommFeesList: PayDealCommVO[];
/**拆佣代理费*/
commFeesList: PayDealCommVO[];
/**分销协议编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**已删除*/
deleted: number;
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**ID*/
id: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**没有勾选：No 已勾选：Yes(Yes-是、No-否)*/
isSelected: string;
/**项目ID*/
projectId: number;
/**服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费付款限额*/
serLimitFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**服务费未收*/
serUnpaidFees: number;
/**服务费未结佣*/
serUnsetCommFees: number;
/**已结佣理费*/
settledCommFeesList: PayDealCommVO[];
/**签字确认*/
signConfirm: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**未结佣理费*/
unsetCommFeesList: PayDealCommVO[];
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayDeductDetailAddVO*/
export interface PayDeductDetailAddVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**合同编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**抵扣金额*/
deductAmount: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**产生时间(yyyy-MM-dd HH:mm:ss)*/
generateTime: string;
/**项目ID*/
projectId: number;
/**抵扣状态(Undeduction-待抵扣、Deducting-抵扣审核中、Deducted-已抵扣)*/
status: string;
/**抵扣项类别(PayoffDeducted-结佣抵扣、DirectRefund-直接退款)*/
type: string;
}
/**PayDeductDetailCalculationRequest*/
export interface PayDeductDetailCalculationRequest {
/**合同编号*/
contNo: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**补充成交报告编号*/
dealCode: string;
/**抵扣金额*/
deductAmount: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**ID*/
id: number;
/**不含税金额*/
noTaxAmount: number;
/**税额*/
tax: number;
}
/**PayDeductDetailInfo*/
export interface PayDeductDetailInfo {
/**合同编号*/
contNo: string;
/**周期Id*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**抵扣金额*/
deductAmount: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**id*/
id: number;
}
/**PayDeductDetailQueryVO*/
export interface PayDeductDetailQueryVO {
/**渠道商名称*/
agencyName: string;
/**成交报告编号*/
dealCode: string;
/**抵扣开始时间(yyyy-MM-dd HH:mm:ss)*/
deductionBeginTime: string;
/**抵扣结束时间(yyyy-MM-dd HH:mm:ss)*/
deductionEndTime: string;
/**抵扣单号*/
deductionNo: string;
/**产生开始时间(yyyy-MM-dd HH:mm:ss)*/
generateBeginTime: string;
/**产生结束时间(yyyy-MM-dd HH:mm:ss)*/
generateEndTime: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**抵扣状态(Undeduction-待抵扣、Deducting-抵扣审核中、Deducted-已抵扣)*/
status: string;
/**抵扣类型(PayoffDeducted-结佣抵扣、DirectRefund-直接退款)*/
type: string;
}
/**PayDeductDetailResponse*/
export interface PayDeductDetailResponse {
/**合同编号*/
contNo: string;
/**周期Id*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**补充成交报告编号*/
dealCode: string;
/**抵扣金额*/
deductAmount: number;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**ID*/
id: number;
/**不含税金额*/
noTaxAmount: number;
/**税额*/
tax: number;
}
/**PayDeductDetailSummaryRequest*/
export interface PayDeductDetailSummaryRequest {
/**渠道商名称*/
agencyName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**PayDeductDetailSummaryResponse*/
export interface PayDeductDetailSummaryResponse {
/**渠道商名称*/
agencyName: string;
/**已抵扣项费用*/
deductedAmount: number;
/**抵扣中抵扣项费用*/
deductingAmount: number;
/**已产生抵扣项费用*/
generatedAmount: number;
/**序号*/
rowNumber: number;
/**待抵扣项费用*/
undeductionAmount: number;
}
/**PayDeductDetailVO*/
export interface PayDeductDetailVO {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**变更后应结佣金额*/
amount: number;
/**抵扣的付款单编号*/
applyCode: string;
/**抵扣的付款单ID*/
applyId: number;
/**合同编号不能为空*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**补充成交报告编号*/
dealCode: string;
/**补充报告*/
dealId: number;
/**抵扣金额*/
deductAmount: number;
/**抵扣时间(yyyy-MM-dd HH:mm:ss)*/
deductTime: string;
/**抵扣项类别(ChangeBasicInf-变更基础信息、ChangeAchieveInf-变更业绩信息、RetreatRoom-退房、ChangeInternalAchieveInf-变更内部员工业绩)*/
deductType: string;
/**产生抵扣费用金额*/
deductionAmount: number;
/**抵扣单号：结佣抵扣=结佣单号，直接退款=退款单号*/
deductionNo: string;
/**已删除*/
deleted: number;
/**产生时间(yyyy-MM-dd HH:mm:ss)*/
generateTime: string;
/**ID*/
id: number;
/**不含税金额*/
noTaxAmount: number;
/**已结佣金额*/
paidAmount: number;
/**项目ID*/
projectId: number;
/**状态(Undeduction-待抵扣、Deducting-抵扣审核中、Deducted-已抵扣)*/
status: string;
/**税额*/
tax: number;
/**抵扣类型(PayoffDeducted-结佣抵扣、DirectRefund-直接退款)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PayDetailPushResponse*/
export interface PayDetailPushResponse {
/**原因*/
reason: string;
/**推送状态*/
status: boolean;
}
/**PayDetailQueryResponse*/
export interface PayDetailQueryResponse {
/**本期实际支付金额*/
actualAmount: number;
/**渠道商账户开户行*/
agencyAccountBank: string;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**申请日期(yyyy-MM-dd)*/
applicationDate: string;
/**付款单编号*/
applyCode: string;
/**归属组织ID*/
belongOrgId: number;
/**公司ID*/
companyId: number;
/**公司名称*/
companyName: string;
/**ID*/
id: number;
/**制单人ID*/
makerId: number;
/**付款单ID*/
payApplyId: number;
/**付款方账户开户行*/
payerAccountBank: string;
/**付款账户*/
paymentAccount: string;
/**支付编码*/
paymentCode: string;
/**付款日期(yyyy-MM-dd)*/
paymentDate: string;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**状态(PendingPayment-待付款、Paying-付款中、PaymentSuccess-付款成功、TicketRefunded-已退票)*/
paymentStatus: string;
/**推送日期(yyyy-MM-dd)*/
pushDate: string;
/**原因*/
reason: string;
/**渠道收款账号*/
receiveAccount: string;
/**付款结算单号*/
settlementCode: string;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
}
/**PayDetailQueryVO*/
export interface PayDetailQueryVO {
/**渠道商ID*/
agencyId: number;
/**付款单编号*/
applyCode: string;
/**开始日期(yyyy-MM-dd)*/
beginDate: string;
/**结束日期(yyyy-MM-dd)*/
endDate: string;
/**事业部ID*/
orgIds: number[];
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**日期类型(ApplicationDate-申请日期、PushDate-推送日期、PaymentDate-付款日期)*/
payDateType: string;
/**支付编码*/
paymentCode: string;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**状态*/
paymentStatusList: string[];
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
}
/**PayDetailSplitRequest*/
export interface PayDetailSplitRequest {
/**ID*/
id: number;
/**付款结算单号*/
settlementCode: string;
/**拆分金额列表*/
splitAmounts: number[];
}
/**PayDetailUpdateRequest*/
export interface PayDetailUpdateRequest {
/**本期实际支付金额*/
actualAmount: number;
/**渠道收款账号开户行*/
agencyAccountBank: string;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**付款单编号*/
applyCode: string;
/**公司名称*/
companyId: number;
/**公司名称*/
companyName: string;
/**ID*/
id: number;
/**付款账户开户行*/
payerAccountBank: string;
/**付款账户*/
paymentAccount: string;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**渠道收款账号*/
receiveAccount: string;
/**付款结算单号*/
settlementCode: string;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
}
/**PaySummaryContractInfo*/
export interface PaySummaryContractInfo {
/**编号*/
contNo: string;
/**标题*/
title: string;
}
/**PaySummaryDetailsResponse*/
export interface PaySummaryDetailsResponse {
/**付款申请单编号*/
applyCode: string;
/**付款申请单ID*/
applyId: number;
/**累计实际付款金额（含税）*/
cumulativeActual: number;
/**累计申请付款金额（含税）*/
cumulativeApplication: number;
/**本期实际付款金额（含税）*/
currentActual: number;
/**本期申请付款金额（含税）*/
currentApplication: number;
/**本期扣除金额（含税）*/
currentDeduction: number;
/**本期扣罚金额（含税）*/
currentFined: number;
/**周期ID*/
cycleId: number;
/**周期名字*/
cycleName: string;
/**累计结佣次数（不含本次）*/
grandTotalFrequency: number;
/**历史实际付款金额（含税）*/
historicalActualAmount: number;
/**历史申请付款金额（含税）*/
historicalApplicationAmount: number;
/**模式属性(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
modeAttributes: string;
/**合同信息列表*/
paySummaryContractInfoList: PaySummaryContractInfo[];
}
/**PaymentHeadVo*/
export interface PaymentHeadVo {
/**批次号*/
batchNo: string;
/**业务代码*/
bizcode: string;
/**数据源系统（业务系统）*/
channel: string;
/**返回结果*/
esbCode: string;
/**返回消息*/
esbDesc: string;
}
/**PaymentStateFeedbackBodyVo*/
export interface PaymentStateFeedbackBodyVo {
/**支付建议号*/
orgErpDetailId: string;
/**来源系统*/
orgErpId: string;
/**付款流水号*/
payid: string;
/**返回结果*/
retCode: number;
/**返回消息*/
retMsg: string;
}
/**PaymentStateFeedbackResponseVo*/
export interface PaymentStateFeedbackResponseVo {
/**body*/
body: PaymentStateFeedbackBodyVo[];
/**head*/
head: PaymentHeadVo;
}
/**PaymentStateFeedbackVo*/
export interface PaymentStateFeedbackVo {
/**支付建议号*/
orgErpDetailId: string;
/**来源系统*/
orgErpId: string;
/**资金系统付款流水号*/
payid: string;
/**业务系统返回结果，（0:同步失败，1:同步成功）*/
retCode: number;
/**业务系统返回信息*/
retMsg: string;
}
/**PaymentStateQueryBodyVo*/
export interface PaymentStateQueryBodyVo {
/**支付建议号*/
orgErpDetailId: string;
/**来源系统*/
orgErpId: string;
/**付款账号*/
payAccount: string;
/**付款金额*/
payAmount: number;
/**付款日期*/
payDate: string;
/**付款状态*/
payState: number;
/**付款流水号*/
payid: string;
/**付款状态枚举(Fail-失败、Success-成功、Chargeback-退单、Refund-退票)*/
paymentStateEnum: string;
/**原因*/
reason: string;
/**原成功付款流水号*/
successPayid: string;
/**文本备用字段1*/
textValue1: string;
/**文本备用字段2*/
textValue2: string;
}
/**PaymentStateQueryVo*/
export interface PaymentStateQueryVo {
/**结束日期*/
endDate: string;
/**支付建议号*/
orgErpDetailId: string;
/**开始日期*/
startDate: string;
}
/**ProcessNodeResponse*/
export interface ProcessNodeResponse {
/**节点状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
afterStatus: string;
/**是否跳过 true = 跳过 false = 不跳过*/
jump: boolean;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
}
/**ProcessRecordResponse*/
export interface ProcessRecordResponse {
/**操作后状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
afterStatus: string;
/**付款单ID*/
applyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**OAID*/
flowId: number;
/**ID*/
id: number;
/**操作(Submit-提交、Withdraw-撤回、Review-审核、Disallowance-驳回、TemporaryStorage-暂存、FinancialContr-财务管控、SetupPaid-设置已付款、SetupUnPaid-设置未付款、SuppInfo-补充信息)*/
operate: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作人*/
operaterId: number;
/**操作人岗位*/
operaterJob: string;
/**操作人姓名*/
operaterName: string;
/**操作前状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
preStatus: string;
/**备注*/
remark: string;
/**处理结果(Through-通过、Overrule-驳回、consent-同意、Update-更新、Create-创建)*/
result: string;
/**系统(Business-业务系统、OA-OA)*/
system: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
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
/**ReviewListRequest*/
export interface ReviewListRequest {
/**渠道商ID*/
agencyId: number;
/**付款单编号*/
applyCode: string;
/**所属组织*/
belongOrgId: number;
/**制单开始时间(yyyy-MM-dd)*/
makerBeginDate: string;
/**制单结束时间(yyyy-MM-dd)*/
makerEndDate: string;
/**制单人*/
makerId: number;
/**事业部ID*/
orgIds: number[];
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**审核人*/
reviewId: number;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
}
/**ReviewListResponse*/
export interface ReviewListResponse {
/**本期实际支付金额*/
actualAmount: number;
/**渠道商名称*/
agencyName: string;
/**本期申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**事业部名字*/
belongOrgName: string;
/**本期应扣*/
deductAmount: number;
/**undefined*/
id: number;
/**制单人*/
makerId: number;
/**制单人名字*/
makerName: string;
/**制单日期(yyyy-MM-dd)*/
makerTime: string;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
/**当前状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
}
/**ReviewUpdateMainBody*/
export interface ReviewUpdateMainBody {
/**本期实际支付金额*/
actualAmount: number;
/**渠道收款账号开户行*/
agencyAccountBank: string;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**本期申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**付款单ID*/
applyId: number;
/**所属组织ID*/
belongOrgId: number;
/**所属组织*/
belongOrgName: string;
/**本期扣除金额*/
deductAmount: number;
/**(必填)扣除类别项*/
deductionCategory: string;
/**(必填)申请说明*/
description: string;
/**本期扣罚金额*/
finedAmount: number;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）)*/
invoiceType: string;
/**制单人ID*/
makerId: number;
/**制单日期(yyyy-MM-dd)*/
makerTime: string;
/**本期实际付款金额（不含税）*/
noTaxAmount: number;
/**付款方账号开户行*/
payerAccountBank: string;
/**付款方ID*/
payerId: number;
/**付款方名字*/
payerName: string;
/**付款方账号*/
paymentAccount: string;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**项目ID*/
projectId: number;
/**项目*/
projectName: string;
/**渠道收款账号*/
receiveAccount: string;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
/**当前状态： 保存 = Unconfirm ；提交 = PlatformClerkUnreview(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
/**本期实际付款税额*/
tax: number;
/**发票税率*/
taxRate: number;
}
/**ShowPayApplyDetailResponse*/
export interface ShowPayApplyDetailResponse {
/**本期实际支付金额*/
actualAmount: number;
/**渠道商账户开户行*/
agencyAccountBank: string;
/**渠道商ID*/
agencyId: number;
/**渠道商名字*/
agencyName: string;
/**本期申请支付金额*/
applyAmount: number;
/**付款申请编号*/
applyCode: string;
/**事业部ID*/
belongOrgId: number;
/**事业部名字*/
belongOrgName: string;
/**结算单*/
billForm: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**本期扣除金额*/
deductAmount: number;
/**扣除类别项*/
deductionCategory: string;
/**已删除*/
deleted: number;
/**经办部门意见*/
description: string;
/**本期扣罚金额*/
finedAmount: number;
/**id*/
id: number;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）)*/
invoiceType: string;
/**制单人*/
maker: string;
/**制单人ID*/
makerId: number;
/**制单人时间(yyyy-MM-dd)*/
makerTime: string;
/**本期实际付款金额（不含税）*/
noTaxAmount: number;
/**OA流程ID*/
oaFlowId: number;
/**其他扣除项*/
otherDeductionDetailResponseList: OtherDeductionDetailResponse[];
/**结佣汇总清单*/
paySummaryDetailsResponseList: PaySummaryDetailsResponse[];
/**付款方账户开户行*/
payerAccountBank: string;
/**付款方ID*/
payerId: number;
/**付款方名字*/
payerName: string;
/**付款方账号*/
paymentAccount: string;
/**付款方式(Cash-现金、Other-其他)*/
paymentMethod: string;
/**项目ID*/
projectId: number;
/**项目名字*/
projectName: string;
/**渠道商账号*/
receiveAccount: string;
/**驳回标识(Yes-是、No-否)*/
rejectionMark: string;
/**请款单*/
requestForm: string;
/**结算方式(Centralization-集中支付、OnlineBanking-网银支付)*/
settlementMethod: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
/**本期实际付款税额*/
tax: number;
/**发票税率*/
taxRate: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**附件信息*/
documentList: DocumentAddVO[];
/**付款列表信息*/
payApplyDetailList: PayApplyDetailResponse[];
/**本期需抵扣金额明细*/
payDeductDetailResponseList: PayDeductDetailResponse[];
/**付款操作记录信息*/
processRecordResponseList: ProcessRecordResponse[];
}
/**ShowRecordResponse*/
export interface ShowRecordResponse {
/**操作后状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
afterStatus: string;
/**操作(Submit-提交、Withdraw-撤回、Review-审核、Disallowance-驳回、TemporaryStorage-暂存、FinancialContr-财务管控、SetupPaid-设置已付款、SetupUnPaid-设置未付款、SuppInfo-补充信息)*/
operate: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operateTime: string;
/**操作人岗位*/
operaterJob: string;
/**操作人姓名*/
operaterName: string;
/**备注*/
remark: string;
/**处理结果(Through-通过、Overrule-驳回、consent-同意、Update-更新、Create-创建)*/
result: string;
/**系统(Business-业务系统、OA-OA)*/
system: string;
}
/**SimulatedPaymentPlus*/
export interface SimulatedPaymentPlus {
/**结算单号*/
settlementCodes: string[];
}
/**SimulatedPaymentSys*/
export interface SimulatedPaymentSys {
/**失败原因*/
failureReason: string;
/**支付编号*/
paymentCodes: string[];
/**同步状态： 0 失败 2 退单 1成功 3 退票*/
sysStatus: number;
}
/**SimulationOaStatus*/
export interface SimulationOaStatus {
/**(必填)付款申请单号*/
applyCodes: string[];
/**(必填)oa审核状态： yes 终审通过 No 驳回(Yes-是、No-否)*/
oaStatus: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**SinglePaymentStateQueryResponseVo*/
export interface SinglePaymentStateQueryResponseVo {
/**body*/
body: PaymentStateQueryBodyVo;
/**head*/
head: PaymentHeadVo;
}
/**StaffWechatCalculationRequest*/
export interface StaffWechatCalculationRequest {
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**发票税率*/
taxRate: number;
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
}
/**StaffWechatCalculationResponse*/
export interface StaffWechatCalculationResponse {
/**本期实际支付金额*/
actualAmount: number;
/**本期申请支付金额*/
applyAmount: number;
/**本期扣除金额*/
deductAmount: number;
/**(必填)扣除类别项*/
deductionCategory: string;
/**本期扣罚金额*/
finedAmount: number;
/**不含税金额*/
noTaxAmount: number;
/**税额*/
tax: number;
/**附件信息*/
documentList: DocumentAddVO[];
}
/**StaffWechatCreateRequest*/
export interface StaffWechatCreateRequest {
/**付款单主体信息*/
payApplyVO: WechatPayApply;
/**附件信息*/
documentList: DocumentAddVO[];
/**待付款列表信息*/
payApplyDetailList: PayApplyDetailAddVO[];
}
/**StaffWechatDetailCycleSummaryResponse*/
export interface StaffWechatDetailCycleSummaryResponse {
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**周期名称*/
cycleName: string;
/** 周期实际结佣总金额*/
cycleTotalActualAmount: number;
/**周期结佣总金额*/
cycleTotalAmount: number;
/**周期结佣扣除总金额*/
cycleTotalDeductionAmount: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**明细列表*/
staffWechatDetailResponseList: StaffWechatDetailResponse[];
}
/**StaffWechatDetailResponse*/
export interface StaffWechatDetailResponse {
/**成交编号*/
dealCode: string;
/**扣除原因*/
deductType: string;
/**本单本次应扣*/
thisDeduct: number;
/**本单实结总金额*/
totalActualAmount: number;
/**本单佣总金额*/
totalAmount: number;
}
/**StaffWechatDetailsResponse*/
export interface StaffWechatDetailsResponse {
/**本期实际支付金额*/
actualAmount: number;
/**渠道商名称*/
agencyName: string;
/**本期申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**结算单*/
billForm: string;
/**本期应扣*/
deductAmount: number;
/**申请说明*/
description: string;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）)*/
invoiceType: string;
/**不含税金额*/
noTaxAmount: number;
/**项目*/
projectName: string;
/**渠道收款账号*/
receiveAccount: string;
/**请款单*/
requestForm: string;
/**待付款明细*/
staffWechatDetailCycleSummaryResponseList: StaffWechatDetailCycleSummaryResponse[];
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
/**税额*/
tax: number;
/**发票税率*/
taxRate: number;
/**附件信息*/
documentList: DocumentResponse[];
}
/**StaffWechatListRequest*/
export interface StaffWechatListRequest {
/**渠道商Id*/
agencyId: number;
/**付款单编号*/
applyCode: string;
/**制单人*/
makerId: number;
/**事业部ID*/
orgIds: number[];
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**状态*/
statusList: string[];
}
/**StaffWechatListResponse*/
export interface StaffWechatListResponse {
/**实际支付金额*/
actualAmount: number;
/**渠道商名称*/
agencyName: string;
/**申请支付金额*/
applyAmount: number;
/**付款单编号*/
applyCode: string;
/**扣除金额*/
deductAmount: number;
/**付款单ID*/
id: number;
/**制单人*/
maker: string;
/**制单人*/
makerId: number;
/**制单日期(yyyy-MM-dd)*/
makerTime: string;
/**岗位*/
post: string;
/**驳回标识(Yes-是、No-否)*/
rejectionMark: string;
/**状态(Unconfirm-附件待确认、PlatformClerkUnreview-待平台文员审核、BranchBusinessManageUnreview-待分公司业管审核、BranchFinanceUnreview-待分公司财务审核、OAReviewing-OA流程审批中、ReviewPass-终审通过、ConfirmingPay-支付确认中、PaymentSuccessful-支付成功)*/
status: string;
}
/**WechatPayApply*/
export interface WechatPayApply {
/**渠道收款账号开户行*/
agencyAccountBank: string;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**(必填)申请说明*/
description: string;
/**发票类型(General_ZZ-增值税普通发票（纸质）、General_DZ-增值税普通发票（电子）)*/
invoiceType: string;
/**项目ID*/
projectId: number;
/**项目*/
projectName: string;
/**渠道收款账号*/
receiveAccount: string;
/**发票税率*/
taxRate: number;
}
/**WechatStaffPayDealListVO*/
export interface WechatStaffPayDealListVO {
/**地址*/
address: string;
/**代理费实收*/
ageActualFees: number;
/**代理费可结佣*/
ageCanCommFees: number;
/**代理费拆佣*/
ageCommFees: number;
/**代理费付款限额*/
ageLimitFees: number;
/**代理费应收*/
ageReceiveFees: number;
/**代理费已结佣*/
ageSettledCommFees: number;
/**代理费未收*/
ageUnpaidFees: number;
/**代理费未结佣*/
ageUnsetCommFees: number;
/**渠道商ID*/
agencyId: number;
/**渠道商名称*/
agencyName: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busModel: string;
/**可结佣理费*/
canCommFeesList: PayDealCommVO[];
/**拆佣代理费*/
commFeesList: PayDealCommVO[];
/**分销协议编号*/
contNo: string;
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户*/
customer: string;
/**周期ID*/
cycleId: number;
/**周期名称*/
cycleName: string;
/**成交报告编号*/
dealCode: string;
/**成交ID*/
dealId: number;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**已删除*/
deleted: number;
/**录入日期(yyyy-MM-dd HH:mm:ss)*/
entryDate: string;
/**ID*/
id: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
isMat: string;
/**没有勾选：No 已勾选：Yes(Yes-是、No-否)*/
isSelected: string;
/**项目ID*/
projectId: number;
/**服务费实收*/
serActualFees: number;
/**服务费可结佣*/
serCanCommFees: number;
/**服务费拆佣*/
serCommFees: number;
/**服务费付款限额*/
serLimitFees: number;
/**服务费应收*/
serReceiveFees: number;
/**服务费已结佣*/
serSettledCommFees: number;
/**服务费未收*/
serUnpaidFees: number;
/**服务费未结佣*/
serUnsetCommFees: number;
/**已结佣理费*/
settledCommFeesList: PayDealCommVO[];
/**签字确认*/
signConfirm: string;
/**签约日期(yyyy-MM-dd)*/
signDate: string;
/**签约价格*/
signPrice: number;
/**认购日期(yyyy-MM-dd)*/
subscribeDate: string;
/**未结佣理费*/
unsetCommFeesList: PayDealCommVO[];
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**WechatStaffPayDealQueryVO*/
export interface WechatStaffPayDealQueryVO {
/**渠道商ID*/
agencyId: number;
/**立项周期*/
cycleId: number;
/**成交报告编号*/
dealCode: string;
/**成交阶段(Recognize-认筹、Subscribe-认购、SignUp-签约)*/
dealStage: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
projectId: number;
}
/**WithdrawSubmitVO*/
export interface WithdrawSubmitVO {
/**ID*/
id: number;
}
