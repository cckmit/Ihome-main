/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2021-4-9 10:08:11 ├F10: AM┤
import { request } from '@/api/base'
const basePath = "/sales-api/project"
/**index*/
export async function get_ (d?: any) {
return await request.get<any,any>(basePath+'/', { params: d })
}
/**栋座新增*/
export async function post_building_add (d?: any) {
return await request.post< BuildingUpdateVO,BuildingUpdateVO> (basePath+'/building/add', d)
}
/**删除栋座*/
export async function post_building_del__buildingId (d?: any) {
return await request.post< number,number> (basePath+'/building/del/{buildingId}', d)
}
/**获取项目的栋座详情*/
export async function get_building_get__buildingId (d?: any) {
return await request.get<BuildingUpdateVO,BuildingUpdateVO>(basePath+'/building/get/{buildingId}', { params: d })
}
/**通过栋座IDs 拿物业类型，移动端用*/
export async function post_building_getBuildingPropertysByIds (d?: any) {
return await request.post< BuildingPropertyDto[],BuildingPropertyDto[]> (basePath+'/building/getBuildingPropertysByIds', d)
}
/**根据项目ID查询 栋座*/
export async function post_building_getFuzzySearch (d?: any) {
return await request.post< BuildingFuzzySearchVO[],BuildingFuzzySearchVO[]> (basePath+'/building/getFuzzySearch', d)
}
/**获取项目的栋座列表*/
export async function post_building_getList (d?: any) {
return await request.post< any,any> (basePath+'/building/getList', d)
}
/**获取栋座名称*/
export async function get_building_getName__buildingId (d?: any) {
return await request.get<string,string>(basePath+'/building/getName/{buildingId}', { params: d })
}
/**获取项目的栋座物业【下拉】*/
export async function get_building_getPropertyDropDowm__proId (d?: any) {
return await request.get<PropertyVO[],PropertyVO[]>(basePath+'/building/getPropertyDropDowm/{proId}', { params: d })
}
/**栋座更新*/
export async function post_building_update (d?: any) {
return await request.post< number,number> (basePath+'/building/update', d)
}
/**计算预估金额*/
export async function post_calc_calcEstimate (d?: any) {
return await request.post< number,number> (basePath+'/calc/calcEstimate', d)
}
/**获取测算信息*/
export async function get_calc_get__termId (d?: any) {
return await request.get<CalcVo,CalcVo>(basePath+'/calc/get/{termId}', { params: d })
}
/**获取测算内页信息*/
export async function get_calc_getCalc__termId (d?: any) {
return await request.get<CalcComplateExcelVO,CalcComplateExcelVO>(basePath+'/calc/getCalc/{termId}', { params: d })
}
/**测算预览*/
export async function post_calc_getPreView (d?: any) {
return await request.post< any,any> (basePath+'/calc/getPreView', d)
}
/**保存测算内页信息*/
export async function post_calc_save (d?: any) {
return await request.post< number,number> (basePath+'/calc/save', d)
}
/**distribute*/
export async function get_calcTermplate__termId (d?: any) {
return await request.get<any,any>(basePath+'/calcTermplate/{termId}', { params: d })
}
/**其它渠道费用明细*/
export async function post_capitalPoolFlow_detail (d?: any) {
return await request.post< any,any> (basePath+'/capitalPoolFlow/detail', d)
}
/**其它渠道费用明细-汇总*/
export async function post_capitalPoolFlow_detailsum (d?: any) {
return await request.post< CapitalPoolFlowDetailSumVo,CapitalPoolFlowDetailSumVo> (basePath+'/capitalPoolFlow/detailsum', d)
}
/**导出其它渠道费用明细*/
export async function post_capitalPoolFlow_exportdetail (d?: any) {
return await request.post< any,any> (basePath+'/capitalPoolFlow/exportdetail', d)
}
/**导出其它渠道费用汇总*/
export async function post_capitalPoolFlow_exportsummary (d?: any) {
return await request.post< any,any> (basePath+'/capitalPoolFlow/exportsummary', d)
}
/**立項資金池操作*/
export async function post_capitalPoolFlow_poolOpera (d?: any) {
return await request.post< boolean,boolean> (basePath+'/capitalPoolFlow/poolOpera', d)
}
/**立項資金池是否滿足使用*/
export async function get_capitalPoolFlow_poolUsable (d?: any) {
return await request.get<boolean,boolean>(basePath+'/capitalPoolFlow/poolUsable', { params: d })
}
/**其它渠道费用汇总*/
export async function post_capitalPoolFlow_summary (d?: any) {
return await request.post< any,any> (basePath+'/capitalPoolFlow/summary', d)
}
/**其它渠道费用汇总-合计*/
export async function post_capitalPoolFlow_summarysum (d?: any) {
return await request.post< CapitalPoolFlowSummarySumVo,CapitalPoolFlowSummarySumVo> (basePath+'/capitalPoolFlow/summarysum', d)
}
/**派发套餐-新增*/
export async function post_collectandsend_add (d?: any) {
return await request.post< CollectandsendUpdateVO,CollectandsendUpdateVO> (basePath+'/collectandsend/add', d)
}
/**作废派发套餐*/
export async function post_collectandsend_cancel (d?: any) {
return await request.post< number,number> (basePath+'/collectandsend/cancel', d)
}
/**派发套餐-套餐条件生成中文描述*/
export async function post_collectandsend_createConditionDescribe (d?: any) {
return await request.post< string,string> (basePath+'/collectandsend/createConditionDescribe', d)
}
/**获取派发套餐详情*/
export async function get_collectandsend_get__packageId (d?: any) {
return await request.get<CollectandsendDetailVO,CollectandsendDetailVO>(basePath+'/collectandsend/get/{packageId}', { params: d })
}
/**获取派发套餐列表[过滤作废]*/
export async function post_collectandsend_getAllByStart (d?: any) {
return await request.post< CollectandsendVO[],CollectandsendVO[]> (basePath+'/collectandsend/getAllByStart', d)
}
/**获取派发套餐列表*/
export async function post_collectandsend_getAllByTerm (d?: any) {
return await request.post< CollectandsendVO[],CollectandsendVO[]> (basePath+'/collectandsend/getAllByTerm', d)
}
/**派发套餐-获取周期部分信息*/
export async function get_collectandsend_getBaseTermByTermId__termId (d?: any) {
return await request.get<CollectPackageVo,CollectPackageVo>(basePath+'/collectandsend/getBaseTermByTermId/{termId}', { params: d })
}
/**成交查询收派套餐*/
export async function post_collectandsend_getCollectadnsendConditionMxByIds (d?: any) {
return await request.post< any,any> (basePath+'/collectandsend/getCollectadnsendConditionMxByIds', d)
}
/**getCollectadnsendMxByIds*/
export async function post_collectandsend_getCollectadnsendMxByIds (d?: any) {
return await request.post< CollectandsendDetailDealVO[],CollectandsendDetailDealVO[]> (basePath+'/collectandsend/getCollectadnsendMxByIds', d)
}
/**获取派发套餐名称[通过明细ID]*/
export async function get_collectandsend_getName__packageMxId (d?: any) {
return await request.get<string,string>(basePath+'/collectandsend/getName/{packageMxId}', { params: d })
}
/**启用派发套餐*/
export async function post_collectandsend_start (d?: any) {
return await request.post< number,number> (basePath+'/collectandsend/start', d)
}
/**禁用派发套餐*/
export async function post_collectandsend_stop (d?: any) {
return await request.post< number,number> (basePath+'/collectandsend/stop', d)
}
/**派发套餐-修改*/
export async function post_collectandsend_update (d?: any) {
return await request.post< CollectandsendUpdateVO,CollectandsendUpdateVO> (basePath+'/collectandsend/update', d)
}
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
return await request.get<CompanyDetailVO,CompanyDetailVO>(basePath+'/company/get/{id}', { params: d })
}
/**开发商列表*/
export async function post_company_getList (d?: any) {
return await request.post< any,any> (basePath+'/company/getList', d)
}
/**开发商名称*/
export async function get_company_getName__id (d?: any) {
return await request.get<string,string>(basePath+'/company/getName/{id}', { params: d })
}
/**开发商列表(不分页)*/
export async function post_company_listAll (d?: any) {
return await request.post< CompanyListVO[],CompanyListVO[]> (basePath+'/company/listAll', d)
}
/**开发商数据列表*/
export async function post_company_listByIds (d?: any) {
return await request.post< QueryCompanyNameResponseVO[],QueryCompanyNameResponseVO[]> (basePath+'/company/listByIds', d)
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
/**立项报备规则-新增*/
export async function post_customerReportRule_add (d?: any) {
return await request.post< number,number> (basePath+'/customerReportRule/add', d)
}
/**立项报备规则-无需报备新增*/
export async function post_customerReportRule_addWXBB (d?: any) {
return await request.post< CycleWxbbqdVO[],CycleWxbbqdVO[]> (basePath+'/customerReportRule/addWXBB', d)
}
/**立项报备规则-[业管]新增*/
export async function post_customerReportRule_busnissManage_add (d?: any) {
return await request.post< number,number> (basePath+'/customerReportRule/busnissManage/add', d)
}
/**立项报备规则-[业管]无需报备新增*/
export async function post_customerReportRule_busnissManage_addWXBB (d?: any) {
return await request.post< CycleWxbbqdVO[],CycleWxbbqdVO[]> (basePath+'/customerReportRule/busnissManage/addWXBB', d)
}
/**立项报备规则-[业管]无需报备删除*/
export async function post_customerReportRule_busnissManage_delWXBB__wxId (d?: any) {
return await request.post< number,number> (basePath+'/customerReportRule/busnissManage/delWXBB/{wxId}', d)
}
/**立项报备规则-[业管]修改*/
export async function post_customerReportRule_busnissManage_update (d?: any) {
return await request.post< number,number> (basePath+'/customerReportRule/busnissManage/update', d)
}
/**立项报备规则-无需报备删除*/
export async function post_customerReportRule_delWXBB__wxId (d?: any) {
return await request.post< number,number> (basePath+'/customerReportRule/delWXBB/{wxId}', d)
}
/**查询项目报备规则*/
export async function get_customerReportRule_get__proId (d?: any) {
return await request.get<CustomerReportRuleVO,CustomerReportRuleVO>(basePath+'/customerReportRule/get/{proId}', { params: d })
}
/**立项报备规则-修改*/
export async function post_customerReportRule_update (d?: any) {
return await request.post< number,number> (basePath+'/customerReportRule/update', d)
}
/**中介分销合同-新增*/
export async function post_distributContract_add (d?: any) {
return await request.post< DistributContractUpdateVO,DistributContractUpdateVO> (basePath+'/distributContract/add', d)
}
/**非渠道类合同-新增*/
export async function post_distributContract_addNoChannel (d?: any) {
return await request.post< NoChannelVo,NoChannelVo> (basePath+'/distributContract/addNoChannel', d)
}
/**非准渠道分销合同-新增*/
export async function post_distributContract_addNoStandChannel (d?: any) {
return await request.post< NoStandChannelVo,NoStandChannelVo> (basePath+'/distributContract/addNoStandChannel', d)
}
/**非标联动销售确认书(启动函)-新增*/
export async function post_distributContract_addNoStandKindSaleConfirm (d?: any) {
return await request.post< NoStandKindSaleConfirmVo,NoStandKindSaleConfirmVo> (basePath+'/distributContract/addNoStandKindSaleConfirm', d)
}
/**标准渠道分销合同-新增*/
export async function post_distributContract_addStandChannel (d?: any) {
return await request.post< StandChannelVo,StandChannelVo> (basePath+'/distributContract/addStandChannel', d)
}
/**标准联动销售确认书(启动函)-新增*/
export async function post_distributContract_addStandKindSaleConfirm (d?: any) {
return await request.post< StandKindSaleConfirmVo,StandKindSaleConfirmVo> (basePath+'/distributContract/addStandKindSaleConfirm', d)
}
/**分销合同申领*/
export async function post_distributContract_applyDistract (d?: any) {
return await request.post< any,any> (basePath+'/distributContract/applyDistract', d)
}
/**中介分销合同-禁用*/
export async function post_distributContract_cancel__agencyContrictId (d?: any) {
return await request.post< number,number> (basePath+'/distributContract/cancel/{agencyContrictId}', d)
}
/**查询页面全部内容*/
export async function get_distributContract_get__termId (d?: any) {
return await request.get<DistributContractMO,DistributContractMO>(basePath+'/distributContract/get/{termId}', { params: d })
}
/**根据立项查询分销合同信息[过滤了禁用]*/
export async function get_distributContract_getByTerm__termId (d?: any) {
return await request.get<DistributContractApplyVO,DistributContractApplyVO>(basePath+'/distributContract/getByTerm/{termId}', { params: d })
}
/**设置非启动函申领状态*/
export async function post_distributContract_getChannelDistractList__termId (d?: any) {
return await request.post< DistributContractByTermVO[],DistributContractByTermVO[]> (basePath+'/distributContract/getChannelDistractList/{termId}', d)
}
/**中介分销合检验条件是否符合*/
export async function post_distributContract_getCheckCollectByCondition (d?: any) {
return await request.post< DistributContractMxVO[],DistributContractMxVO[]> (basePath+'/distributContract/getCheckCollectByCondition', d)
}
/**中介分销合同根据条件获取收派套餐*/
export async function post_distributContract_getCollectByCondition (d?: any) {
return await request.post< DistributContractMxVO[],DistributContractMxVO[]> (basePath+'/distributContract/getCollectByCondition', d)
}
/**中介分销合同-查看详情*/
export async function get_distributContract_getDistri__agencyContrictId (d?: any) {
return await request.get<DistributContractVO,DistributContractVO>(basePath+'/distributContract/getDistri/{agencyContrictId}', { params: d })
}
/**获取派发套餐详情【分销合同筛选派发明细】*/
export async function post_distributContract_getItemByCondition (d?: any) {
return await request.post< CollectandsendDetailVO,CollectandsendDetailVO> (basePath+'/distributContract/getItemByCondition', d)
}
/**设置启动函申领状态*/
export async function post_distributContract_getLinkDistractList__termId (d?: any) {
return await request.post< DistributContractByTermVO[],DistributContractByTermVO[]> (basePath+'/distributContract/getLinkDistractList/{termId}', d)
}
/**中介分销合同-预览【里面】*/
export async function post_distributContract_getPreView (d?: any) {
return await request.post< any,any> (basePath+'/distributContract/getPreView', d)
}
/**中介分销合同-预览【外面】*/
export async function post_distributContract_getPreViewOut__agencyContrictId (d?: any) {
return await request.post< any,any> (basePath+'/distributContract/getPreViewOut/{agencyContrictId}', d)
}
/**甲方合同OA呈批备注-save*/
export async function post_distributContract_saveOaRemark (d?: any) {
return await request.post< number,number> (basePath+'/distributContract/saveOaRemark', d)
}
/**设置非启动函申领状态状态-提交确认*/
export async function post_distributContract_setChannelDistractStatus (d?: any) {
return await request.post< number,number> (basePath+'/distributContract/setChannelDistractStatus', d)
}
/**设置启动函申领状态状态-提交确认*/
export async function post_distributContract_setLinkDistractStatus (d?: any) {
return await request.post< number,number> (basePath+'/distributContract/setLinkDistractStatus', d)
}
/**中介分销合同-启用*/
export async function post_distributContract_start__agencyContrictId (d?: any) {
return await request.post< number,number> (basePath+'/distributContract/start/{agencyContrictId}', d)
}
/**中介分销合同-更新*/
export async function post_distributContract_update (d?: any) {
return await request.post< DistributContractUpdateVO,DistributContractUpdateVO> (basePath+'/distributContract/update', d)
}
/**非渠道类合同-修改*/
export async function post_distributContract_updateNoChannel (d?: any) {
return await request.post< NoChannelVoUpdateVO,NoChannelVoUpdateVO> (basePath+'/distributContract/updateNoChannel', d)
}
/**非准渠道分销合同-修改*/
export async function post_distributContract_updateNoStandChannel (d?: any) {
return await request.post< NoStandChannelVoUpdateVO,NoStandChannelVoUpdateVO> (basePath+'/distributContract/updateNoStandChannel', d)
}
/**非标联动销售确认书(启动函)-修改*/
export async function post_distributContract_updateNoStandKindSaleConfirm (d?: any) {
return await request.post< NoStandKindSaleConfirmVoUpdateVO,NoStandKindSaleConfirmVoUpdateVO> (basePath+'/distributContract/updateNoStandKindSaleConfirm', d)
}
/**标准渠道分销合同-修改*/
export async function post_distributContract_updateStandChannel (d?: any) {
return await request.post< StandChannelVoUpdateVO,StandChannelVoUpdateVO> (basePath+'/distributContract/updateStandChannel', d)
}
/**标准联动销售确认书(启动函)-修改*/
export async function post_distributContract_updateStandKindSaleConfirm (d?: any) {
return await request.post< StandKindSaleConfirmVoUpdateVO,StandKindSaleConfirmVoUpdateVO> (basePath+'/distributContract/updateStandKindSaleConfirm', d)
}
/**getPreView*/
export async function get_distribute (d?: any) {
return await request.get<any,any>(basePath+'/distribute', { params: d })
}
/**新增代理公司*/
export async function post_firstAgencyCompany_add (d?: any) {
return await request.post< FirstAgencyCompanyAddArgs,FirstAgencyCompanyAddArgs> (basePath+'/firstAgencyCompany/add', d)
}
/**审核*/
export async function post_firstAgencyCompany_audit__agencyId (d?: any) {
return await request.post< number,number> (basePath+'/firstAgencyCompany/audit/{agencyId}', d)
}
/**查询详情*/
export async function get_firstAgencyCompany_get__agencyId (d?: any) {
return await request.get<FirstAgencyCompanyDetail,FirstAgencyCompanyDetail>(basePath+'/firstAgencyCompany/get/{agencyId}', { params: d })
}
/**查询列表*/
export async function post_firstAgencyCompany_getList (d?: any) {
return await request.post< any,any> (basePath+'/firstAgencyCompany/getList', d)
}
/**一手代理商公司名称*/
export async function get_firstAgencyCompany_getName__agencyId (d?: any) {
return await request.get<string,string>(basePath+'/firstAgencyCompany/getName/{agencyId}', { params: d })
}
/**新增or修改*/
export async function post_firstAgencyCompany_save (d?: any) {
return await request.post< FirstAgencyCompanyAddArgs,FirstAgencyCompanyAddArgs> (basePath+'/firstAgencyCompany/save', d)
}
/**保存并提交*/
export async function post_firstAgencyCompany_saveAndCommit (d?: any) {
return await request.post< number,number> (basePath+'/firstAgencyCompany/saveAndCommit', d)
}
/**修改代理公司*/
export async function post_firstAgencyCompany_update (d?: any) {
return await request.post< FirstAgencyCompanyAddArgs,FirstAgencyCompanyAddArgs> (basePath+'/firstAgencyCompany/update', d)
}
/**获取测算信息*/
export async function get_his_calc_get__termId (d?: any) {
return await request.get<CalcVo,CalcVo>(basePath+'/his/calc/get/{termId}', { params: d })
}
/**获取派发套餐详情*/
export async function get_his_collectandsend_get__packageId (d?: any) {
return await request.get<CollectandsendDetailVO,CollectandsendDetailVO>(basePath+'/his/collectandsend/get/{packageId}', { params: d })
}
/**获取派发套餐列表*/
export async function post_his_collectandsend_getAllByTerm (d?: any) {
return await request.post< CollectandsendVO[],CollectandsendVO[]> (basePath+'/his/collectandsend/getAllByTerm', d)
}
/**查询立项报备规则*/
export async function get_his_customerReportRule_get__termId (d?: any) {
return await request.get<CustomerReportRuleVO,CustomerReportRuleVO>(basePath+'/his/customerReportRule/get/{termId}', { params: d })
}
/**查询页面全部内容*/
export async function get_his_distributContract_get__termId (d?: any) {
return await request.get<DistributContractMO,DistributContractMO>(basePath+'/his/distributContract/get/{termId}', { params: d })
}
/**中介分销合同-查看详情*/
export async function get_his_distributContract_getDistri__agencyContrictId (d?: any) {
return await request.get<DistributContractVO,DistributContractVO>(basePath+'/his/distributContract/getDistri/{agencyContrictId}', { params: d })
}
/**中介分销合同-预览【里面】*/
export async function post_his_distributContract_getPreView (d?: any) {
return await request.post< PreViewVO,PreViewVO> (basePath+'/his/distributContract/getPreView', d)
}
/**查询其他配置信息*/
export async function get_his_oa_get__termId (d?: any) {
return await request.get<OtherVo,OtherVo>(basePath+'/his/oa/get/{termId}', { params: d })
}
/**甲方合同页面查询*/
export async function get_his_partyAContract_get__termId (d?: any) {
return await request.get<PartyAContractPageVO,PartyAContractPageVO>(basePath+'/his/partyAContract/get/{termId}', { params: d })
}
/**获取结佣详情*/
export async function post_his_settleCondition_getMaking__settleId (d?: any) {
return await request.post< SettleMakingUpdateVO,SettleMakingUpdateVO> (basePath+'/his/settleCondition/getMaking/{settleId}', d)
}
/**查询结佣类型*/
export async function get_his_settleCondition_getMakingType__proId (d?: any) {
return await request.get<SettleMakingParamVO,SettleMakingParamVO>(basePath+'/his/settleCondition/getMakingType/{proId}', { params: d })
}
/**结算条件列表页查询*/
export async function get_his_settleCondition_getPage__termId (d?: any) {
return await request.get<SettleConditionVO,SettleConditionVO>(basePath+'/his/settleCondition/getPage/{termId}', { params: d })
}
/**获取请佣详情*/
export async function post_his_settleCondition_getPlease__settleId (d?: any) {
return await request.post< SettlePleaseUpdateVO,SettlePleaseUpdateVO> (basePath+'/his/settleCondition/getPlease/{settleId}', d)
}
/**查询请佣类型*/
export async function get_his_settleCondition_getPleaseType__proId (d?: any) {
return await request.get<SettlePleaseParamVO,SettlePleaseParamVO>(basePath+'/his/settleCondition/getPleaseType/{proId}', { params: d })
}
/**获取立项基础详情*/
export async function get_his_term_get__termId (d?: any) {
return await request.get<TermRespVO,TermRespVO>(basePath+'/his/term/get/{termId}', { params: d })
}
/**楼盘项目的户型-新增*/
export async function post_houseType_add (d?: any) {
return await request.post< HouseTypeUpdateArgs,HouseTypeUpdateArgs> (basePath+'/houseType/add', d)
}
/**删除楼盘项目的户型*/
export async function post_houseType_delete__houseTypeId (d?: any) {
return await request.post< number,number> (basePath+'/houseType/delete/{houseTypeId}', d)
}
/**通过栋座项目ID的获取楼盘户型(下拉)*/
export async function get_houseType_getItemsByProperty__proId (d?: any) {
return await request.get<HouseTypeItemsByBuildingVO[],HouseTypeItemsByBuildingVO[]>(basePath+'/houseType/getItemsByProperty/{proId}', { params: d })
}
/**查询项目ID的楼盘户型*/
export async function get_houseType_getTabItem__proId (d?: any) {
return await request.get<HouseTypeVO[],HouseTypeVO[]>(basePath+'/houseType/getTabItem/{proId}', { params: d })
}
/**户型详情*/
export async function get_houseType_houseDetail__houseId (d?: any) {
return await request.get<HouseTypeDetailVo,HouseTypeDetailVo>(basePath+'/houseType/houseDetail/{houseId}', { params: d })
}
/**修改楼盘项目的户型*/
export async function post_houseType_update (d?: any) {
return await request.post< number,number> (basePath+'/houseType/update', d)
}
/**户型详情【移动端】*/
export async function get_houseType_yDhouseDetail__houseId (d?: any) {
return await request.get<HouseTypeYDDetailVo,HouseTypeYDDetailVo>(basePath+'/houseType/yDhouseDetail/{houseId}', { params: d })
}
/**查询其他配置信息*/
export async function get_logAndOA_get__termId (d?: any) {
return await request.get<LogAndOAVo,LogAndOAVo>(basePath+'/logAndOA/get/{termId}', { params: d })
}
/**查询OA 当前代办人*/
export async function get_logAndOA_getOALog__termId (d?: any) {
return await request.get<string,string>(basePath+'/logAndOA/getOALog/{termId}', { params: d })
}
/**获取已经提交OA的流程id【排除审核通过】*/
export async function get_logAndOA_getSummaryIds (d?: any) {
return await request.get<number[],number[]>(basePath+'/logAndOA/getSummaryIds', { params: d })
}
/**查询立项日志*/
export async function post_logAndOA_getTermLog__termId (d?: any) {
return await request.post< TermLog[],TermLog[]> (basePath+'/logAndOA/getTermLog/{termId}', d)
}
/**同步OA审核状态*/
export async function post_logAndOA_syncState (d?: any) {
return await request.post< number,number> (basePath+'/logAndOA/syncState', d)
}
/**updateAuditStatus*/
export async function get_logAndOA_updateAuditStatus (d?: any) {
return await request.get<string,string>(basePath+'/logAndOA/updateAuditStatus', { params: d })
}
/**其他渠道列表-新增*/
export async function post_other_add (d?: any) {
return await request.post< number,number> (basePath+'/other/add', d)
}
/**【业管】添加or修改店组*/
export async function post_other_busnissManage_saveGroup (d?: any) {
return await request.post< number,number> (basePath+'/other/busnissManage/saveGroup', d)
}
/**【业管】添加or修改收款账户*/
export async function post_other_busnissManage_saveReceipt (d?: any) {
return await request.post< number,number> (basePath+'/other/busnissManage/saveReceipt', d)
}
/**是否跨项目使用*/
export async function post_other_changOtherProChannelUse (d?: any) {
return await request.post< number,number> (basePath+'/other/changOtherProChannelUse', d)
}
/**是否允许穿底*/
export async function post_other_changOver (d?: any) {
return await request.post< number,number> (basePath+'/other/changOver', d)
}
/**其他渠道列表-移除*/
export async function post_other_del (d?: any) {
return await request.post< number,number> (basePath+'/other/del', d)
}
/**删除特殊方案*/
export async function post_other_delSpecial (d?: any) {
return await request.post< number,number> (basePath+'/other/delSpecial', d)
}
/**查询其他配置信息*/
export async function get_other_get__termId (d?: any) {
return await request.get<OtherVo,OtherVo>(basePath+'/other/get/{termId}', { params: d })
}
/**添加or修改店组*/
export async function post_other_saveGroup (d?: any) {
return await request.post< number,number> (basePath+'/other/saveGroup', d)
}
/**添加or修改收款账户*/
export async function post_other_saveReceipt (d?: any) {
return await request.post< number,number> (basePath+'/other/saveReceipt', d)
}
/**添加or修改特殊方案*/
export async function post_other_saveSpecial (d?: any) {
return await request.post< number,number> (basePath+'/other/saveSpecial', d)
}
/**其他渠道列表-启用*/
export async function post_other_start (d?: any) {
return await request.post< number,number> (basePath+'/other/start', d)
}
/**其他渠道列表-禁用*/
export async function post_other_stop (d?: any) {
return await request.post< number,number> (basePath+'/other/stop', d)
}
/**甲方合同-新增*/
export async function post_partyAContract_add (d?: any) {
return await request.post< number,number> (basePath+'/partyAContract/add', d)
}
/**甲方关联栋座-新增or修改*/
export async function post_partyAContract_addPartyABuildings (d?: any) {
return await request.post< number,number> (basePath+'/partyAContract/addPartyABuildings', d)
}
/**甲方关联栋座-业管修改*/
export async function post_partyAContract_busnissManage_addPartyABuildings (d?: any) {
return await request.post< number,number> (basePath+'/partyAContract/busnissManage/addPartyABuildings', d)
}
/**甲方合同-删除*/
export async function post_partyAContract_del (d?: any) {
return await request.post< number,number> (basePath+'/partyAContract/del', d)
}
/**甲方合同页面查询*/
export async function get_partyAContract_get__termId (d?: any) {
return await request.get<PartyAContractPageVO,PartyAContractPageVO>(basePath+'/partyAContract/get/{termId}', { params: d })
}
/**甲方合同/栋座信息-获取楼盘栋座信息*/
export async function post_partyAContract_getBuilding__termId (d?: any) {
return await request.post< BuildingItemVO[],BuildingItemVO[]> (basePath+'/partyAContract/getBuilding/{termId}', d)
}
/**通过周期ID获取合同ID*/
export async function post_partyAContract_getContractIdsByTermId__termId (d?: any) {
return await request.post< number[],number[]> (basePath+'/partyAContract/getContractIdsByTermId/{termId}', d)
}
/**甲方合同关联周期-新增*/
export async function post_partyAContract_relationTerm__termId (d?: any) {
return await request.post< number,number> (basePath+'/partyAContract/relationTerm/{termId}', d)
}
/**甲方合同OA呈批备注-保存*/
export async function post_partyAContract_saveOaRemark (d?: any) {
return await request.post< number,number> (basePath+'/partyAContract/saveOaRemark', d)
}
/**立项收款公司信息-新增*/
export async function post_payment_add (d?: any) {
return await request.post< number,number> (basePath+'/payment/add', d)
}
/**成交外收支信息-删除*/
export async function post_payment_del (d?: any) {
return await request.post< number,number> (basePath+'/payment/del', d)
}
/**成交外收支信息-修改*/
export async function post_payment_update (d?: any) {
return await request.post< number,number> (basePath+'/payment/update', d)
}
/**优惠告知书-新增*/
export async function post_preferential_add (d?: any) {
return await request.post< number,number> (basePath+'/preferential/add', d)
}
/**优惠告知书-禁用*/
export async function post_preferential_cancel__preferentialMxId (d?: any) {
return await request.post< number,number> (basePath+'/preferential/cancel/{preferentialMxId}', d)
}
/**优惠告知书-详情*/
export async function get_preferential_getDetail__preferentialMxId (d?: any) {
return await request.get<PreferentialMxYdVO,PreferentialMxYdVO>(basePath+'/preferential/getDetail/{preferentialMxId}', { params: d })
}
/**案场录入-优惠告知书列表*/
export async function get_preferential_getListByTermId__termId (d?: any) {
return await request.get<PreferentialMxVO[],PreferentialMxVO[]>(basePath+'/preferential/getListByTermId/{termId}', { params: d })
}
/**优惠告知书-预览*/
export async function post_preferential_getPreView (d?: any) {
return await request.post< any,any> (basePath+'/preferential/getPreView', d)
}
/**优惠告知书-下载二维码*/
export async function get_preferential_getQRCodeImage__preferentialMxId (d?: any) {
return await request.get<any,any>(basePath+'/preferential/getQRCodeImage/{preferentialMxId}', { params: d })
}
/**优惠告知书-启用*/
export async function post_preferential_start__preferentialMxId (d?: any) {
return await request.post< number,number> (basePath+'/preferential/start/{preferentialMxId}', d)
}
/**优惠告知书-修改*/
export async function post_preferential_update (d?: any) {
return await request.post< number,number> (basePath+'/preferential/update', d)
}
/**优惠告知书-退款天数更新*/
export async function post_preferential_updateRetuenDays (d?: any) {
return await request.post< number,number> (basePath+'/preferential/updateRetuenDays', d)
}
/**优惠告知书-文件上传*/
export async function post_preferential_uploadTemplate (d?: any) {
return await request.post< number,number> (basePath+'/preferential/uploadTemplate', d)
}
/**新增联动项目*/
export async function post_project_add (d?: any) {
return await request.post< ProjectUpdateArgs,ProjectUpdateArgs> (basePath+'/project/add', d)
}
/**新增父项目*/
export async function post_project_addParent (d?: any) {
return await request.post< ParentProjectUpdateArgs,ParentProjectUpdateArgs> (basePath+'/project/addParent', d)
}
/**联动项目-审核通过*/
export async function post_project_audit (d?: any) {
return await request.post< number,number> (basePath+'/project/audit', d)
}
/**联动项目-审核中*/
export async function post_project_auditWait (d?: any) {
return await request.post< number,number> (basePath+'/project/auditWait', d)
}
/**创建明源项目房间*/
export async function post_project_createMYHouse (d?: any) {
return await request.post< number,number> (basePath+'/project/createMYHouse', d)
}
/**创建明源项目*/
export async function post_project_createMYProject (d?: any) {
return await request.post< number,number> (basePath+'/project/createMYProject', d)
}
/**联动项目-删除*/
export async function post_project_del__proId (d?: any) {
return await request.post< number,number> (basePath+'/project/del/{proId}', d)
}
/**获取联动项目-基础信息*/
export async function get_project_get__proId (d?: any) {
return await request.get<ProjectUpdateArgs,ProjectUpdateArgs>(basePath+'/project/get/{proId}', { params: d })
}
/**通过项目ID 等其它条件 查询栋座房号信息信息 【成交用】*/
export async function post_project_getBuildingRoomByPro (d?: any) {
return await request.post< any,any> (basePath+'/project/getBuildingRoomByPro', d)
}
/**通过项目ID获取合同IDs*/
export async function get_project_getContractIdsByProId__proId (d?: any) {
return await request.get<number[],number[]>(basePath+'/project/getContractIdsByProId/{proId}', { params: d })
}
/**项目名称，不传名称就是全部，传名称就是模糊*/
export async function post_project_getFuzzySearch (d?: any) {
return await request.post< ProjectFuzzySearchVo[],ProjectFuzzySearchVo[]> (basePath+'/project/getFuzzySearch', d)
}
/**模糊查询客户报备所属城市项目【移动端接口】*/
export async function post_project_getFuzzySearchByCity (d?: any) {
return await request.post< any,any> (basePath+'/project/getFuzzySearchByCity', d)
}
/**模糊查询客户报备所属城市项目【移动端接口】for案场【帮录接口分开】*/
export async function post_project_getFuzzySearchByCityForAnChang (d?: any) {
return await request.post< any,any> (basePath+'/project/getFuzzySearchByCityForAnChang', d)
}
/**查询项目列表*/
export async function post_project_getList (d?: any) {
return await request.post< any,any> (basePath+'/project/getList', d)
}
/**获取多个项目基本信息*/
export async function post_project_getListByIds (d?: any) {
return await request.post< ProjectListVO[],ProjectListVO[]> (basePath+'/project/getListByIds', d)
}
/**查询项目列表-客户报备*/
export async function post_project_getListForCustomer (d?: any) {
return await request.post< any,any> (basePath+'/project/getListForCustomer', d)
}
/**getName*/
export async function get_project_getName__id (d?: any) {
return await request.get<string,string>(basePath+'/project/getName/{id}', { params: d })
}
/**获取联动项目-父项目基础信息*/
export async function get_project_getParent__proId (d?: any) {
return await request.get<ParentProjectUpdateArgs,ParentProjectUpdateArgs>(basePath+'/project/getParent/{proId}', { params: d })
}
/**项目楼盘基础信息*/
export async function get_project_getProBase__proId (d?: any) {
return await request.get<ProBaseVO,ProBaseVO>(basePath+'/project/getProBase/{proId}', { params: d })
}
/**项目项目-客户报备*/
export async function get_project_getProDetail__proId (d?: any) {
return await request.get<ProjectDetailVO,ProjectDetailVO>(basePath+'/project/getProDetail/{proId}', { params: d })
}
/**项目-客户报备项目信息*/
export async function get_project_getProDetailBB__proId (d?: any) {
return await request.get<ProjectDetailBBVO,ProjectDetailBBVO>(basePath+'/project/getProDetailBB/{proId}', { params: d })
}
/**查询推荐的项目列表*/
export async function post_project_getRecommendProjectList (d?: any) {
return await request.post< ProjectListVO[],ProjectListVO[]> (basePath+'/project/getRecommendProjectList', d)
}
/**查询房间状态*/
export async function get_project_getRoomType__roomId (d?: any) {
return await request.get<number,number>(basePath+'/project/getRoomType/{roomId}', { params: d })
}
/**查询栋座信息*/
export async function post_project_getSearch (d?: any) {
return await request.post< BuildingItemVO[],BuildingItemVO[]> (basePath+'/project/getSearch', d)
}
/**查询项目对应的栋座房间树*/
export async function get_project_getTree__proId (d?: any) {
return await request.get<TreeBulidingRoom[],TreeBulidingRoom[]>(basePath+'/project/getTree/{proId}', { params: d })
}
/**查询项目列表[移动端接口]*/
export async function post_project_getYDProjectList (d?: any) {
return await request.post< any,any> (basePath+'/project/getYDProjectList', d)
}
/**联动项目-驳回*/
export async function post_project_reject (d?: any) {
return await request.post< number,number> (basePath+'/project/reject', d)
}
/**修改联动项目*/
export async function post_project_update (d?: any) {
return await request.post< ProjectUpdateArgs,ProjectUpdateArgs> (basePath+'/project/update', d)
}
/**增量明源项目房间*/
export async function post_project_updateMYHouse (d?: any) {
return await request.post< number,number> (basePath+'/project/updateMYHouse', d)
}
/**修改父项目*/
export async function post_project_updateParent (d?: any) {
return await request.post< number,number> (basePath+'/project/updateParent', d)
}
/**更新房间报备状态*/
export async function post_project_updateRoomReportType (d?: any) {
return await request.post< number,number> (basePath+'/project/updateRoomReportType', d)
}
/**更新房间状态*/
export async function post_project_updateRoomType (d?: any) {
return await request.post< number,number> (basePath+'/project/updateRoomType', d)
}
/**推广信息查询*/
export async function get_promotion_get__proId (d?: any) {
return await request.get<PromotionVO,PromotionVO>(basePath+'/promotion/get/{proId}', { params: d })
}
/**推广信息添加or修改*/
export async function post_promotion_save (d?: any) {
return await request.post< PromotionVO,PromotionVO> (basePath+'/promotion/save', d)
}
/**添加项目房间号*/
export async function post_room_add (d?: any) {
return await request.post< string,string> (basePath+'/room/add', d)
}
/**移除项目房间号*/
export async function post_room_del__id (d?: any) {
return await request.post< number,number> (basePath+'/room/del/{id}', d)
}
/**通过房间ID获取栋座房间字符串*/
export async function get_room_getBuildRoom__roomId (d?: any) {
return await request.get<string,string>(basePath+'/room/getBuildRoom/{roomId}', { params: d })
}
/**获取建筑楼盘模板*/
export async function get_room_getExcelTemplate (d?: any) {
return await request.get<any,any>(basePath+'/room/getExcelTemplate', { params: d })
}
/**根据 栋座id or 项目ID 查询 房号*/
export async function post_room_getFuzzySearch (d?: any) {
return await request.post< RoomItemVo[],RoomItemVo[]> (basePath+'/room/getFuzzySearch', d)
}
/**查询项目房间列表*/
export async function post_room_getList (d?: any) {
return await request.post< any,any> (basePath+'/room/getList', d)
}
/**根据项目ID和栋座ID查询房间列表*/
export async function post_room_getListByBuildingId (d?: any) {
return await request.post< any,any> (basePath+'/room/getListByBuildingId', d)
}
/**通过房间ID获取明源房间ID*/
export async function get_room_getMYIdByRoomId__roomId (d?: any) {
return await request.get<MYRoomItemVo,MYRoomItemVo>(basePath+'/room/getMYIdByRoomId/{roomId}', { params: d })
}
/**获取房间号*/
export async function get_room_getName__roomId (d?: any) {
return await request.get<string,string>(basePath+'/room/getName/{roomId}', { params: d })
}
/**通过房间ID获取项目栋座房间字符串*/
export async function get_room_getPROBuildRoom__roomId (d?: any) {
return await request.get<string,string>(basePath+'/room/getPROBuildRoom/{roomId}', { params: d })
}
/**上传excel*/
export async function post_room_importExcel (d?: any) {
return await request.post< number,number> (basePath+'/room/importExcel', d)
}
/**项目房间号修改*/
export async function post_room_update (d?: any) {
return await request.post< number,number> (basePath+'/room/update', d)
}
/**结佣-新增*/
export async function post_settleCondition_addMaking (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/addMaking', d)
}
/**请佣-新增*/
export async function post_settleCondition_addPlease (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/addPlease', d)
}
/**结佣-作废*/
export async function post_settleCondition_cancelMaking (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/cancelMaking', d)
}
/**请佣-作废*/
export async function post_settleCondition_cancelPlease (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/cancelPlease', d)
}
/**查询结佣结算结果*/
export async function post_settleCondition_getMakeCalc (d?: any) {
return await request.post< SettlementResponse[],SettlementResponse[]> (basePath+'/settleCondition/getMakeCalc', d)
}
/**获取结佣详情*/
export async function post_settleCondition_getMaking__settleId (d?: any) {
return await request.post< SettleMakingUpdateVO,SettleMakingUpdateVO> (basePath+'/settleCondition/getMaking/{settleId}', d)
}
/**查询结佣类型*/
export async function get_settleCondition_getMakingType__proId (d?: any) {
return await request.get<SettleMakingParamVO,SettleMakingParamVO>(basePath+'/settleCondition/getMakingType/{proId}', { params: d })
}
/**结算条件列表页查询*/
export async function get_settleCondition_getPage__termId (d?: any) {
return await request.get<SettleConditionVO,SettleConditionVO>(basePath+'/settleCondition/getPage/{termId}', { params: d })
}
/**获取请佣详情*/
export async function post_settleCondition_getPlease__settleId (d?: any) {
return await request.post< SettlePleaseUpdateVO,SettlePleaseUpdateVO> (basePath+'/settleCondition/getPlease/{settleId}', d)
}
/**查询请佣结算结果*/
export async function post_settleCondition_getPleaseCalc (d?: any) {
return await request.post< SettlementResponse[],SettlementResponse[]> (basePath+'/settleCondition/getPleaseCalc', d)
}
/**查询请佣类型*/
export async function get_settleCondition_getPleaseType__proId (d?: any) {
return await request.get<SettlePleaseParamVO,SettlePleaseParamVO>(basePath+'/settleCondition/getPleaseType/{proId}', { params: d })
}
/**结佣-启用*/
export async function post_settleCondition_startMaking (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/startMaking', d)
}
/**请佣-启用*/
export async function post_settleCondition_startPlease (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/startPlease', d)
}
/**结佣-修改*/
export async function post_settleCondition_updateMaking (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/updateMaking', d)
}
/**请佣-修改*/
export async function post_settleCondition_updatePlease (d?: any) {
return await request.post< number,number> (basePath+'/settleCondition/updatePlease', d)
}
/**项目周期新增*/
export async function post_term_add (d?: any) {
return await request.post< TermRespVO,TermRespVO> (basePath+'/term/add', d)
}
/**补充协议-修改周期（新增覆盖周期方式）*/
export async function get_term_applyTerm__termId (d?: any) {
return await request.get<number,number>(basePath+'/term/applyTerm/{termId}', { params: d })
}
/**项目周期-审核*/
export async function post_term_audit (d?: any) {
return await request.post< number,number> (basePath+'/term/audit', d)
}
/**项目周期提交并且审核*/
export async function post_term_commitAndAudit (d?: any) {
return await request.post< number,number> (basePath+'/term/commitAndAudit', d)
}
/**合同-审核*/
export async function post_term_constractAudit (d?: any) {
return await request.post< number,number> (basePath+'/term/constractAudit', d)
}
/**合同呈批【附件上传】*/
export async function post_term_contractApplyAttach (d?: any) {
return await request.post< number,number> (basePath+'/term/contractApplyAttach', d)
}
/**项目周期-删除*/
export async function post_term_del__termId (d?: any) {
return await request.post< number,number> (basePath+'/term/del/{termId}', d)
}
/**获取立项基础详情*/
export async function get_term_get__termId (d?: any) {
return await request.get<TermRespVO,TermRespVO>(basePath+'/term/get/{termId}', { params: d })
}
/**getBaseTermByTermId*/
export async function post_term_getCollectPackageByDeal (d?: any) {
return await request.post< CollectandsendDetailDealVO[],CollectandsendDetailDealVO[]> (basePath+'/term/getCollectPackageByDeal', d)
}
/**获取周期项目信息2-合同模块*/
export async function post_term_getContractByTermIds (d?: any) {
return await request.post< ContractByTermIdsDTO[],ContractByTermIdsDTO[]> (basePath+'/term/getContractByTermIds', d)
}
/**查询项目列表【成交用，只是查询审核通过，不作废，排除补充的】*/
export async function post_term_getDealList (d?: any) {
return await request.post< any,any> (basePath+'/term/getDealList', d)
}
/**优惠合同相关-根据周期ID获取相关信息*/
export async function get_term_getDistrictbuteProAndTerm__termId (d?: any) {
return await request.get<DistributeProTermVO,DistributeProTermVO>(basePath+'/term/getDistrictbuteProAndTerm/{termId}', { params: d })
}
/**获取周期下拉列表-合同模块*/
export async function post_term_getDropDown (d?: any) {
return await request.post< TermDropDownVo[],TermDropDownVo[]> (basePath+'/term/getDropDown', d)
}
/**查询周期列表*/
export async function post_term_getList (d?: any) {
return await request.post< any,any> (basePath+'/term/getList', d)
}
/**查询周期列表【跨周期查询】*/
export async function post_term_getListAccrossTerm (d?: any) {
return await request.post< any,any> (basePath+'/term/getListAccrossTerm', d)
}
/**获取周期名称*/
export async function get_term_getName__termId (d?: any) {
return await request.get<string,string>(basePath+'/term/getName/{termId}', { params: d })
}
/**预览OA合同表单*/
export async function get_term_getOAContractFrom__termId (d?: any) {
return await request.get<TermOAContractVO,TermOAContractVO>(basePath+'/term/getOAContractFrom/{termId}', { params: d })
}
/**预览OA立项表单*/
export async function get_term_getOATermFrom__termId (d?: any) {
return await request.get<TermRespVO,TermRespVO>(basePath+'/term/getOATermFrom/{termId}', { params: d })
}
/**根据周期id+栋座获取 甲方信息*/
export async function post_term_getPartYAInfoByDeal (d?: any) {
return await request.post< PartYAInfoDto[],PartYAInfoDto[]> (basePath+'/term/getPartYAInfoByDeal', d)
}
/**通过周期ID获取基础信息【成交用】*/
export async function get_term_getProBaseByTermId__termId (d?: any) {
return await request.get<TermDealVO,TermDealVO>(basePath+'/term/getProBaseByTermId/{termId}', { params: d })
}
/**基本信息-获取项目相关信息*/
export async function get_term_getProInfo__proId (d?: any) {
return await request.get<ProTermVO,ProTermVO>(basePath+'/term/getProInfo/{proId}', { params: d })
}
/**通过周期ID获取项目名称*/
export async function get_term_getProName__termId (d?: any) {
return await request.get<string,string>(basePath+'/term/getProName/{termId}', { params: d })
}
/**通过周期ID判断是否认筹*/
export async function get_term_getRecognizeById__termId (d?: any) {
return await request.get<boolean,boolean>(basePath+'/term/getRecognizeById/{termId}', { params: d })
}
/**周期模糊搜索*/
export async function get_term_getSearch (d?: any) {
return await request.get<TermItemVO[],TermItemVO[]>(basePath+'/term/getSearch', { params: d })
}
/**通过甲方合同ID获取周期列表-合同模块*/
export async function get_term_getTermByContractId__contractId (d?: any) {
return await request.get<ContractByTermIdsDTO[],ContractByTermIdsDTO[]>(basePath+'/term/getTermByContractId/{contractId}', { params: d })
}
/**getTermBySpecialId*/
export async function get_term_getTermBySpecialId__specialId (d?: any) {
return await request.get<TermSpecialVO[],TermSpecialVO[]>(basePath+'/term/getTermBySpecialId/{specialId}', { params: d })
}
/**通過項目id查找周期ID*/
export async function get_term_getTermIdByProId__proId (d?: any) {
return await request.get<TermIdDepartmentIdVo[],TermIdDepartmentIdVo[]>(basePath+'/term/getTermIdByProId/{proId}', { params: d })
}
/**获取周期项目信息1-合同模块*/
export async function post_term_getTermInfoByTermId__termId (d?: any) {
return await request.post< TermInfoMsgVo,TermInfoMsgVo> (basePath+'/term/getTermInfoByTermId/{termId}', d)
}
/**通过项目ID获取已经审核周期列表【移动端】*/
export async function post_term_getTermListByProId (d?: any) {
return await request.post< any,any> (basePath+'/term/getTermListByProId', d)
}
/**查询周期列表【移动端-优惠告知书使用，过滤作废】*/
export async function post_term_getYdList (d?: any) {
return await request.post< any,any> (basePath+'/term/getYdList', d)
}
/**操作其他渠道费用*/
export async function post_term_operateOtherChannelFees (d?: any) {
return await request.post< boolean,boolean> (basePath+'/term/operateOtherChannelFees', d)
}
/**启动立项周期*/
export async function post_term_start__termId (d?: any) {
return await request.post< number,number> (basePath+'/term/start/{termId}', d)
}
/**禁用立项周期*/
export async function post_term_stop__termId (d?: any) {
return await request.post< number,number> (basePath+'/term/stop/{termId}', d)
}
/**test*/
export async function post_term_test (d?: any) {
return await request.post< TestVO,TestVO> (basePath+'/term/test', d)
}
/**项目周期修改*/
export async function post_term_update (d?: any) {
return await request.post< number,number> (basePath+'/term/update', d)
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
/**AddGroup*/
export interface AddGroup {
/**店组ID*/
groupId: number;
/**立项ID*/
termId: number;
}
/**AddReceipt*/
export interface AddReceipt {
/**收款ID*/
receiptId: number;
/**立项ID*/
termId: number;
}
/**AddSpecialId*/
export interface AddSpecialId {
/**特殊方案ID*/
specialId: number;
/**立项ID*/
termId: number;
}
/**ApplyContractVO*/
export interface ApplyContractVO {
/**中介分销合同ID*/
agencyContrictId: number;
/**代理费结算条件(ComNoPad-常规不垫佣版、ComPad-常规垫佣版、SpecialDiscount-优惠折扣版)*/
agencySettleCondtion: string;
/**附件列表*/
attachItemVOS: AttachTerm[];
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**申领权限(Business-业务线申领、MiddleAndBack-中后台申领)*/
claimPower: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**合同主标题*/
contractTitle: string;
/**费用结算类型(DevelopAgenFee-开发商或者委托方代理费、CustomerServFee-客户服务费、DevelopAgenFeeOrCustServFee-开发商或者委托方代理费/客户服务费)*/
costSettleType: string;
/**是否可申领(Yes-是、No-否)*/
exClaim: string;
/**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司 甲方合同-乙方*/
partyCompany: string;
/**合同扫描件地址*/
scanningContract: string;
/**状态(New-新增、Update-修改、Delete-删除、Stop-禁用、Start-启用、Cancel-作废、Audit-审核、Reject-驳回)*/
state: string;
}
/**ApplyDistractQueryVo*/
export interface ApplyDistractQueryVo {
/**申领权限(Business-业务线申领、MiddleAndBack-中后台申领)*/
claimPower: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**合同主标题*/
contractTitle: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**周期ID*/
termId: number;
}
/**AttachAgencyItemVO*/
export interface AttachAgencyItemVO {
/**(必填)文件地址*/
fileId: string;
/**(必填)文件名称*/
fileName: string;
/**(必填)文件类型     BusLicence("营业执照"),OpenAccount("开业许可证"),IdCardByLegal("法人身份证"),SigningConfirmation("签约授权确认函"),
    PowerByLegal("法人授权书"),IdCardByConsignee("被委托人身份证复印件"),QueryResultBYSEO("综合查询被执行人查询结果"),OtherFile("其他附件");(BusLicence-营业执照、OpenAccount-开业许可证、IdCardByLegal-法人身份证、SigningConfirmation-签约授权确认函、PowerByLegal-法人授权书、IdCardByConsignee-被委托人身份证复印件、QueryResultBYSEO-综合查询被执行人查询结果、OtherFile-其他附件)*/
type: string;
}
/**AttachItemLPVO*/
export interface AttachItemLPVO {
/**附件ID*/
attachId: number;
/**是否首页*/
exIndex: number;
/**(必填)图片地址*/
fileId: string;
/**(必填)图片名称*/
fileName: string;
/**(必填)文件类型(ProPic-楼盘图片、StateLandFile-国有土地使用证、ConstructLandFile-建设用地规划许可证、ConstructProFile-建设工程规划许可证、BuildConstructProFile-建设工程施工许可证、CommercialHousingFile-商品房预售许可证、RealEstateFile-房地产开发企业资质证书、OtherFile-其他附件)*/
type: string;
}
/**AttachItemVO*/
export interface AttachItemVO {
/**附件ID*/
attachId: number;
/**(必填)图片地址*/
fileId: string;
/**(必填)图片名称*/
fileName: string;
/**(必填)文件类型(ProPic-楼盘图片、StateLandFile-国有土地使用证、ConstructLandFile-建设用地规划许可证、ConstructProFile-建设工程规划许可证、BuildConstructProFile-建设工程施工许可证、CommercialHousingFile-商品房预售许可证、RealEstateFile-房地产开发企业资质证书、OtherFile-其他附件)*/
type: string;
}
/**AttachTerm*/
export interface AttachTerm {
/**附件ID*/
attachId: number;
/**对应各种合同ID*/
contractId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**是否自动生成*/
exAuto: number;
/**图片地址*/
fileId: string;
/**图片名称*/
fileName: string;
/**原件ID*/
originalId: string;
/**原件名称*/
originalName: string;
/**原件PDF id*/
originalPdfId: string;
/**立项周期ID*/
termId: number;
/**文件类型(PartyAConfirm-甲方确认函/授权函、IntermediaryLetter-中介启动函、CalcForm-立项测算表、PartyAContract-甲方合同、CrossPro-跨项目使用其他渠道费用授权函、LinkProSale-联动销售确认书/启动函、IntermediaryDistribut-中介分销协议、SubscriptTemplate-认购书模板、DiscountNotice-优惠告知书、OtherFile-其他附件)*/
type: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**AttachTermItemVO*/
export interface AttachTermItemVO {
/**是否自动生成，1~不能删除并且不用提交，0或者null可以删除*/
exAuto: number;
/**(必填)文件ID*/
fileId: string;
/**(必填)文件名称*/
fileName: string;
/**(必填)文件类型(PartyAConfirm-甲方确认函/授权函、IntermediaryLetter-中介启动函、CalcForm-立项测算表、PartyAContract-甲方合同、CrossPro-跨项目使用其他渠道费用授权函、LinkProSale-联动销售确认书/启动函、IntermediaryDistribut-中介分销协议、SubscriptTemplate-认购书模板、DiscountNotice-优惠告知书、OtherFile-其他附件)*/
type: string;
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
/**BuildingAddVO*/
export interface BuildingAddVO {
/**(必填)栋座名称*/
buildingName: string;
/**地上层数*/
floor: number;
/**(必填)楼盘项目ID*/
proId: number;
/**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**(必填)物业类型ID*/
propertyId: number;
/**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**地下层数*/
undergroundNum: number;
}
/**BuildingDto*/
export interface BuildingDto {
/**明源楼盘ID*/
buildingGuid: string;
/**id*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**楼层数*/
floor: number;
/**楼盘项目ID*/
proId: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**物业类型ID*/
propertyId: number;
/**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**明源栋座ID*/
subBuildingGuid: string;
/**栋座名称*/
subBuildingName: string;
/**地下层数*/
undergroundNum: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**BuildingFuzzySearchVO*/
export interface BuildingFuzzySearchVO {
/**id*/
buildingId: number;
/**栋座信息*/
buildingName: string;
}
/**BuildingItemVO*/
export interface BuildingItemVO {
/**明源楼盘ID*/
buildingGuid: string;
/**id*/
buildingId: number;
/**栋座信息*/
buildingName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**楼层数*/
floor: number;
/**楼盘项目ID*/
proId: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**物业类型ID*/
propertyId: number;
/**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**undefined*/
subBuildingGuid: string;
/**地下层数*/
undergroundNum: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**BuildingListVO*/
export interface BuildingListVO {
/**id*/
buildingId: number;
/**楼盘编号*/
buildingName: string;
/**楼层数*/
floor: number;
/**户型*/
houseTypes: string[];
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**物业类型ID*/
propertyId: number;
/**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**地下层数*/
undergroundNum: number;
}
/**BuildingPropertyDto*/
export interface BuildingPropertyDto {
/**id*/
buildingId: number;
/**栋座名称*/
buildingName: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
}
/**BuildingQueryVO*/
export interface BuildingQueryVO {
/**栋座名称*/
buildingName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**楼盘项目ID*/
proId: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**装修级别(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
}
/**BuildingRoomQueryVO*/
export interface BuildingRoomQueryVO {
/**栋座名称*/
buildingName: string;
/**户型ID*/
houseTypeId: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**(必填)项目ID*/
proId: number;
/**房间号*/
roomNo: string;
}
/**BuildingRoomVo*/
export interface BuildingRoomVo {
/**明源楼盘ID*/
buildingGuid: string;
/**栋数ID*/
buildingId: number;
/**栋数名称*/
buildingName: string;
/**厅*/
hall: number;
/**户型名称*/
houseName: string;
/**明源户型_GUID*/
houseTypeGuid: string;
/**户型ID*/
houseTypeId: number;
/**厨*/
kitchen: number;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**室*/
room: number;
/**明源room_guid*/
roomGuid: string;
/**id*/
roomId: number;
/**房间号*/
roomNo: string;
/**户型面积*/
space: number;
/**明源栋座ID*/
subBuildingGuid: string;
/**卫*/
toilet: number;
}
/**BuildingSearchVO*/
export interface BuildingSearchVO {
/**栋座名称*/
buildingName: string;
/**项目ID*/
proId: number;
}
/**BuildingUpdateVO*/
export interface BuildingUpdateVO {
/**(必填)id*/
buildingId: number;
/**(必填)栋座名称*/
buildingName: string;
/**地上层数*/
floor: number;
/**(必填)楼盘项目ID*/
proId: number;
/**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**(必填)物业类型ID*/
propertyId: number;
/**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**地下层数*/
undergroundNum: number;
}
/**CalcComplateExcelVO*/
export interface CalcComplateExcelVO {
/**项目代理费成交情况*/
agencyCalcComplateModelVOS: CalcComplateModelVO[];
/**项目代理费合计项*/
agencySum: CalcComplateMxTotalVO;
/**文件ID*/
fileId: string;
/**项目服务费成交情况*/
serviceCalcComplateModelVOS: CalcComplateModelVO[];
/**项目服务费合计项*/
serviceSum: CalcComplateMxTotalVO;
/**(必填)测算指标[表头]*/
termCalcVo: TermCalcVo;
/**(必填)周期ID*/
termId: number;
}
/**CalcComplateModelVO*/
export interface CalcComplateModelVO {
/**项目成交明细*/
calcComplateMxVOS: object;
/**项目成交表头*/
calcComplateVO: CalcComplateVO;
}
/**CalcComplateMxTotalVO*/
export interface CalcComplateMxTotalVO {
/**费用类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**分销业绩金额*/
distributeAchieveAmount: number;
/**预计成交套数*/
estimateComplateNum: number;
/**预计支付渠道佣金总额*/
estimatePayChannelAmount: number;
/**预计应收金额*/
estimateReceiveAmount: number;
/**总包业绩金额*/
generalAchieveAmount: number;
/**其它渠道费用金额*/
otherChannelAmount: number;
/**其它外拆*/
otherDemolition: number;
/**平台留存率*/
plateRate: number;
/**备注*/
remark: string;
/**立项周期ID*/
termId: number;
/**汇总ID*/
totalId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**CalcComplateMxVO*/
export interface CalcComplateMxVO {
/**成交ID*/
complateId: number;
/**成交明细ID*/
complateMxId: number;
/**成交客户ID*/
consumerId: number;
/**客户名称*/
consumerName: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**分销业绩*/
distributeAchieveAmount: number;
/**成交套数*/
estimateComplateNum: number;
/**预计支付渠道佣金总额*/
estimatePayChannelAmount: number;
/**预计应收金额*/
estimateReceiveAmount: number;
/**总包业绩*/
generalAchieveAmount: number;
/**其它渠道费用金额*/
otherChannelAmount: number;
/**其它外拆*/
otherDemolition: number;
/**平台留存率*/
plateRate: number;
/**备注*/
remark: string;
/**细分业务(All-总包、District-分销)*/
subdivideEnum: string;
/**立项周期ID*/
termId: number;
/**客户类型(成交方式) NATIONALMARKET-全民营销 NATURAL-自然到访 SELF-自行成交 SELFCHANNEL-自渠 BIG-一级大行 MIDDLE-二级中行 SMALL-三级小行  APPOINT-指定中介行(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
transactionEnum: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**CalcComplateVO*/
export interface CalcComplateVO {
/**成交ID*/
complateId: number;
/**成交总套数*/
complateNum: number;
/**费用类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**预计渠道派发*/
estimatedChannelSend: number;
/**垫佣金额预估*/
estimatedPadCommission: number;
/**垫佣预估比率*/
estimatedPadCommissionRate: number;
/**预计总收款*/
estimatedTotalReceipt: number;
/**假定成交价*/
estimatedTransactionPrice: number;
/**营销留存*/
marketingRetention: number;
/**其它渠道费用金额*/
otherChannelAmount: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**立项周期ID*/
termId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**CalcEstimateVO*/
export interface CalcEstimateVO {
/**(必填)垫佣金额*/
padAmunt: number;
/**(必填)垫佣金额比例不能为空！*/
padRate: number;
}
/**CalcVo*/
export interface CalcVo {
/**代理费总包-分销平台留存比例*/
agencyFeeTotalByDistrictbuteRate: number;
/**代理费总包-总包平台留存比例*/
agencyFeeTotalByTotalRate: number;
/**纯分销模式-代理费留存率*/
distributeAgencyRate: number;
/**纯总包模式-服务费留存率*/
distributeServiceRate: number;
/**是否需要重新测算*/
exCalcAgain: number;
/**是否突破标准线*/
exOverStandard: number;
/**文件ID*/
fileId: string;
/**流程类型(Simple-简化流程、All-全流程)*/
processEnum: string;
/**服务费可用余额*/
serviceBalance: number;
/**服务费总包-分销平台留存比例*/
serviceFeeTotalByDistrictbuteRate: number;
/**服务费总包-总包平台留存比例*/
serviceFeeTotalByTotalRate: number;
/**项目综合留存率*/
termOverallRate: number;
}
/**CapitalPoolFlowDetailSumVo*/
export interface CapitalPoolFlowDetailSumVo {
/**描述*/
desc: string;
/**合计金额*/
totalAmount: number;
}
/**CapitalPoolFlowDetailVo*/
export interface CapitalPoolFlowDetailVo {
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**成交报告编号*/
dealCode: string;
/**周期所属事业部*/
departmentName: string;
/**店组ID*/
groupId: number;
/**使用的其他渠道费用归属项目*/
otherProName: string;
/**使用的其他渠道费用归属周期ID*/
otherTermId: number;
/**使用的其他渠道费用归属周期*/
otherTermName: string;
/**产生/使用 其他渠道费金额*/
postAmount: number;
/**使用类别 (同周期使用)Samecycle、(跨周期)Interycle、(跨项目)Interproject*/
postCategory: string;
/**周期所属项目*/
proName: string;
/**周期所属店组*/
shopGroup: string;
/**启动事业部ID*/
startDivisionId: number;
/**成交周期*/
termName: string;
}
/**CapitalPoolFlowOperaVO*/
export interface CapitalPoolFlowOperaVO {
/**(必填)成交ID*/
dealId: number;
/**(必填)成交所属周期ID*/
dealTeamId: number;
/**(必填)操作金额*/
postAmount: number;
/**产生类别 服务费盈余、成交退款、成交变更、成交补充、其他*/
postCategory: string;
/**undefined*/
rollback: boolean;
/**来源(feecost成交服务费、activecost活动经费)(Feecost-成交服务费、Activecost-活动经费)*/
sce: string;
}
/**CapitalPoolFlowQueryVO*/
export interface CapitalPoolFlowQueryVO {
/**产生类别(ServiceFeesurplus-服务费盈余、TansactionRefund-成交退款、TransactionChange-成交变更、TransactionSupplement-成交补充、Rollback-回滚、Other-其他)*/
addcategory: string;
/**记录时间*/
createTimeBegin: string;
/**记录时间*/
createTimeEnd: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目名称ID*/
proId: string;
/**周期名称ID*/
termId: string;
/**类别 1:产生 2:使用*/
type: number;
/**使用类别(Samecycle-同周期使用、Interycle-跨周期使用、Interproject-跨项目使用)*/
usecategory: string;
}
/**CapitalPoolFlowSumQueryVO*/
export interface CapitalPoolFlowSumQueryVO {
/**产生类别(ServiceFeesurplus-服务费盈余、TansactionRefund-成交退款、TransactionChange-成交变更、TransactionSupplement-成交补充、Rollback-回滚、Other-其他)*/
addcategory: string;
/**记录时间*/
createTimeBegin: string;
/**记录时间*/
createTimeEnd: string;
/**项目名称ID*/
proId: string;
/**周期名称ID*/
termId: string;
/**类别 1:产生 2:使用*/
type: number;
/**使用类别(Samecycle-同周期使用、Interycle-跨周期使用、Interproject-跨项目使用)*/
usecategory: string;
}
/**CapitalPoolFlowSummaryQueryVO*/
export interface CapitalPoolFlowSummaryQueryVO {
/**组织*/
org: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目名称*/
proId: string;
/**周期名称*/
termId: string;
}
/**CapitalPoolFlowSummarySumQueryVO*/
export interface CapitalPoolFlowSummarySumQueryVO {
/**组织*/
org: string;
/**项目名称*/
proId: string;
/**周期名称*/
termId: string;
}
/**CapitalPoolFlowSummarySumVo*/
export interface CapitalPoolFlowSummarySumVo {
/**产生 其他渠道费金额*/
addAmount: number;
/**剩余 其他渠道费金额*/
amount: number;
/**使用 其他渠道费金额*/
useAmount: number;
}
/**CapitalPoolFlowSummaryVo*/
export interface CapitalPoolFlowSummaryVo {
/**产生 其他渠道费金额*/
addAmount: number;
/**剩余 其他渠道费金额*/
amount: number;
/**所属事业部*/
departmentName: string;
/**周期所属项目*/
proName: string;
/**启动事业部ID*/
startDivisionId: number;
/**项目周期ID*/
termId: string;
/**项目周期名称*/
termName: string;
/**使用 其他渠道费金额*/
useAmount: number;
}
/**CollectPackageVo*/
export interface CollectPackageVo {
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**项目城市*/
city: string;
/**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司列表*/
partyAInfoList: CompanyIdVo[];
/**联动项目ID*/
proId: number;
/**物业类型*/
propertyDropDowm: PropertyVO[];
/**启动事业部ID*/
startDivisionId: number;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**CollectandsendByIdVO*/
export interface CollectandsendByIdVO {
/**收派套餐ID*/
packageId: number;
}
/**CollectandsendByTermIdVO*/
export interface CollectandsendByTermIdVO {
/**立项周期ID*/
termId: number;
}
/**CollectandsendCalcDto*/
export interface CollectandsendCalcDto {
/**合同类型  Natural("自然到访"),Distribut("分销成交"),Self("自行成交"),SelfChannel("自渠");(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contractEnum: string;
/**物业类型 WorkShop("厂房"),Apartment("公寓"),Villa("别墅"),Shop("商铺"),Office("写字楼"),Parking("车位"),Other("其他")(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**细分业务(All-总包、District-分销)*/
subdivideEnum: string;
/**立项周期ID*/
termId: number;
}
/**CollectandsendConditionVO*/
export interface CollectandsendConditionVO {
/**条件 (GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compare: string;
/**条件 <> <= >= ==(GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compareB: string;
/**且*/
conditionAnd: number;
/**条件依据  HouseType("户型"),Area("面积"),ContractPrice("签约价格"),SubscriPrice("认购价格");(HouseType-户型、Area-面积、ContractPrice-签约价格、SubscriPrice-认购价格、OtherMsg-其它条件)*/
conditionEnum: string;
/**条件ID*/
conditionId: number;
/**值A*/
conditionNumA: number;
/**值B*/
conditionNumB: number;
/**其它条件信息*/
otherMsg: string;
}
/**CollectandsendCustomerVO*/
export interface CollectandsendCustomerVO {
/**收派套餐body*/
colletionandsendDetails: CollectandsendDetailVO[];
/**费用类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**是否免收服务费,0否 1是*/
exVoidService: number;
/**甲方公司名称[开发商]*/
partyCompany: string;
/**甲方公司ID*/
partyCompanyId: number;
}
/**CollectandsendDetailDealVO*/
export interface CollectandsendDetailDealVO {
/**基准费用  CONTRACT-按签约价 SUBSCRIPTION-按认购价(Contract-按签约价、Subscription-按认购价)*/
baseCostEnum: string;
/**undefined*/
collectandsendConditionVOS: CollectandsendConditionVO[];
/**条件*/
condition: string;
/**成交客户ID*/
consumerId: number;
/**合同类型  Natural("自然到访"),Distribut("分销成交"),Self("自行成交"),SelfChannel("自渠");(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contractEnum: string;
/**分销业绩金额*/
distributeAchieveAmount: number;
/**分销业绩点数*/
distributeAchievePoint: number;
/**预计成交房款*/
estimateComplateAmount: number;
/**预计成交套数*/
estimateComplateNum: number;
/**预计应收金额*/
estimateReceiveAmount: number;
/**是否免收服务费,0否 1是*/
exVoidService: number;
/**总包业绩金额*/
generalAchieveAmount: number;
/**总包业绩点数*/
generalAchievePoint: number;
/**其他渠道费用金额*/
otherChannelAmount: number;
/**其他渠道费用点数*/
otherChannelPoint: number;
/**收派明细ID*/
packageMxId: number;
/**是否垫佣  Veto("否"),Tree("3个月"),Six("6个月"),Nine("9个月"),MoreTen("10个月以上");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**应收金额*/
receivableAmout: number;
/**应收点数*/
receivablePoint: number;
/**备注*/
remark: string;
/**派发金额*/
sendAmount: number;
/**派发内场金额*/
sendInAmount: number;
/**派发内场点数*/
sendInPoint: number;
/**派发点数*/
sendPoint: number;
/**细分业务(All-总包、District-分销)*/
subdivideEnum: string;
/**周期ID*/
termId: number;
/**客户类型(成交方式) NationalMarket("全民营销"),Natural("自然到访"),Self("自行成交"),SelfChannel("自渠"),Big("一级大行"),Middle("二级中行"),Small("三级小行"),Appoint("指定中介行");(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
transactionEnum: string;
}
/**CollectandsendDetailVO*/
export interface CollectandsendDetailVO {
/**undefined*/
collectandsendConditionVOS: CollectandsendConditionVO[];
/**条件*/
condition: string;
/**成交客户ID*/
consumerId: number;
/**客户名称*/
consumerName: string;
/**合同类型  Natural("自然到访"),Distribut("分销成交"),Self("自行成交"),SelfChannel("自渠");(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contractEnum: string;
/**分销业绩金额*/
distributeAchieveAmount: number;
/**分销业绩点数*/
distributeAchievePoint: number;
/**预计成交房款*/
estimateComplateAmount: number;
/**预计成交套数*/
estimateComplateNum: number;
/**预计应收金额*/
estimateReceiveAmount: number;
/**总包业绩金额*/
generalAchieveAmount: number;
/**总包业绩点数*/
generalAchievePoint: number;
/**其他渠道费用金额*/
otherChannelAmount: number;
/**其他渠道费用点数*/
otherChannelPoint: number;
/**收派明细ID*/
packageMxId: number;
/**是否垫佣  Veto("否"),Tree("3个月"),Six("6个月"),Nine("9个月"),MoreTen("10个月以上");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**应收金额*/
receivableAmout: number;
/**应收点数*/
receivablePoint: number;
/**备注*/
remark: string;
/**派发金额*/
sendAmount: number;
/**派发内场金额*/
sendInAmount: number;
/**派发内场点数*/
sendInPoint: number;
/**派发点数*/
sendPoint: number;
/**排序*/
sort: number;
/**细分业务(All-总包、District-分销)*/
subdivideEnum: string;
/**客户类型(成交方式) NationalMarket("全民营销"),Natural("自然到访"),Self("自行成交"),SelfChannel("自渠"),Big("一级大行"),Middle("二级中行"),Small("三级小行"),Appoint("指定中介行");(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
transactionEnum: string;
}
/**CollectandsendDetailVO_1*/
export interface CollectandsendDetailVO_1 {
/**基准费用   Contract("按签约价"),Subscription("按认购价")(Contract-按签约价、Subscription-按认购价)*/
baseCostEnum: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**项目城市*/
city: string;
/**收派套餐明细*/
colletionandsendMxs: CollectandsendCustomerVO[];
/**有效截至时间(yyyy-MM-dd)*/
endTime: string;
/**假定成交价 单位万*/
estimatedTransactionPrice: number;
/**收派套餐ID*/
packageId: number;
/**套餐名称*/
packageName: string;
/**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司列表*/
partyAInfoList: CompanyIdVo[];
/**物业类型*/
propertyDropDowm: PropertyVO[];
/**物业类型 WorkShop("厂房"),Apartment("公寓"),Villa("别墅"),Shop("商铺"),Office("写字楼"),Parking("车位"),Other("其他")(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**启动事业部ID*/
startDivisionId: number;
/**有效开始时间(yyyy-MM-dd)*/
startTime: string;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**立项周期ID*/
termId: number;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**CollectandsendQueryMxByIdsVO*/
export interface CollectandsendQueryMxByIdsVO {
/**合同类型(DistriDeal-分销成交、NaturalVisitDeal-自然来访成交、SelfChannelDeal-自渠成交)*/
contType: string;
/**费用类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**周期id*/
cycleId: number;
/**分销协议内的收派明细id*/
packageMxIds: number[];
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**甲方公司*/
partyAId: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
property: string;
/**细分业务模式(All-总包、District-分销)*/
subdivide: string;
}
/**CollectandsendUpdateVO*/
export interface CollectandsendUpdateVO {
/**基准费用   Contract("按签约价"),Subscription("按认购价")(Contract-按签约价、Subscription-按认购价)*/
baseCostEnum: string;
/**收派套餐明细*/
colletionandsendMxs: CollectandsendCustomerVO[];
/**有效截至时间(yyyy-MM-dd)*/
endTime: string;
/**假定成交价 单位万*/
estimatedTransactionPrice: number;
/**收派套餐ID*/
packageId: number;
/**套餐名称*/
packageName: string;
/**物业类型 WorkShop("厂房"),Apartment("公寓"),Villa("别墅"),Shop("商铺"),Office("写字楼"),Parking("车位"),Other("其他")(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**有效开始时间(yyyy-MM-dd)*/
startTime: string;
/**立项周期ID*/
termId: number;
}
/**CollectandsendVO*/
export interface CollectandsendVO {
/**基准费用  CONTRACT-按签约价 SUBSCRIPTION-按认购价(Contract-按签约价、Subscription-按认购价)*/
baseCostEnum: string;
/**有效截至时间(yyyy-MM-dd)*/
endTime: string;
/**假定成交价*/
estimatedTransactionPrice: number;
/**收派套餐ID*/
packageId: number;
/**套餐名称*/
packageName: string;
/**物业类型  WORKSHOP-厂房 APARTMENT-公寓 VILLA-别墅 sSHOPS-商铺 OFFICEO-写字楼 PARKING-车位 OTHER-其他(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**有效开始时间(yyyy-MM-dd)*/
startTime: string;
/**状态(New-新增、Update-修改、Delete-删除、Stop-禁用、Start-启用、Cancel-作废、Audit-审核、Reject-驳回)*/
state: string;
/**立项周期ID*/
termId: number;
}
/**CompanyAttachmentBaseVO*/
export interface CompanyAttachmentBaseVO {
/**文件ID*/
fileId: string;
/**文件名*/
fileName: string;
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
/**账号类型(Basic-基本存款账户、General-一般存款账户)*/
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
/**注册资本*/
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
/**法人代表*/
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
/**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）、CompanyLimitedByShares-股份有限公司、IndividualIndustrial-个体工商户)*/
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
/**CompanyDetailVO*/
export interface CompanyDetailVO {
/**(必填)住所*/
address: string;
/**附件列表*/
attachmentList: CompanyAttachmentBaseVO[];
/**账户信息*/
bankList: CompanyBankBaseVO[];
/**营业期限*/
businessTime: string;
/**注册资本*/
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
/**录入人*/
inputUserName: string;
/**法人代表*/
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
/**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）、CompanyLimitedByShares-股份有限公司、IndividualIndustrial-个体工商户)*/
type: string;
}
/**CompanyEditAuditedDetailVO*/
export interface CompanyEditAuditedDetailVO {
/**(必填)住所*/
address: string;
/**附件列表*/
attachmentList: CompanyAttachmentBaseVO[];
/**账户信息*/
bankList: CompanyBankBaseVO[];
/**营业期限*/
businessTime: string;
/**注册资本*/
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
/**法人代表*/
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
/**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）、CompanyLimitedByShares-股份有限公司、IndividualIndustrial-个体工商户)*/
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
/**注册资本*/
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
/**法人代表*/
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
/**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）、CompanyLimitedByShares-股份有限公司、IndividualIndustrial-个体工商户)*/
type: string;
}
/**CompanyIdVo*/
export interface CompanyIdVo {
/**甲方ID*/
companyId: number;
/**甲方名称*/
companyName: string;
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
/**录入人ID*/
inputUser: number;
/**录入人*/
inputUserName: string;
/**公司名称*/
name: string;
/**省份*/
province: string;
/**简称*/
shortName: string;
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
/**处理人ID*/
operator: number;
/**处理人名字*/
operatorName: string;
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
/**简称*/
shortName: string;
/**状态(Draft-起草、WaitAuditByBranchHead-待分公司业管审核、Audited-已审核)*/
status: string;
}
/**ConstractOaSaveVO*/
export interface ConstractOaSaveVO {
/**自增ID*/
constractOaId: number;
/**(必填)自增ID*/
remark: string;
/**(必填)type类型 1~客户成交以及确认,2~违约责任,3~合同其它说明*/
type: number;
}
/**ConstractOaVO*/
export interface ConstractOaVO {
/**自增ID*/
constractOaId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户成交及其确认*/
customerConfirm: string;
/**已删除*/
deleted: number;
/**合同其它说明*/
otherRemark: string;
/**违约责任*/
responsibiltity: string;
/**周期ID*/
termId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ContractApplyAttachVO*/
export interface ContractApplyAttachVO {
/**附件信息*/
attachTermVOS: AttachTermItemVO[];
/**(必填)周期ID*/
termId: number;
}
/**ContractByTermIdsDTO*/
export interface ContractByTermIdsDTO {
/**呈批文号*/
approvalNo: string;
/**审核状态   CONDUCT-审核中 ADOPT-审核通过(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**市*/
city: string;
/**区*/
district: string;
/**项目id*/
proId: number;
/**项目名称*/
proName: string;
/**省*/
province: string;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**周期id*/
termId: number;
/**周期名称*/
termName: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**ContractPartyListVO*/
export interface ContractPartyListVO {
/**合同id*/
contractId: number;
/**ID*/
id: number;
/**甲方ID*/
userId: number;
/**甲方名字*/
userName: string;
}
/**ContractRelatedCycleResponseVO*/
export interface ContractRelatedCycleResponseVO {
/**甲方合同编号*/
contractNo: string;
/**合作结束时间(yyyy-MM-dd)*/
cooperationEnd: string;
/**合作开始时间(yyyy-MM-dd)*/
cooperationTime: string;
/**合同跟进人ID*/
handlerId: number;
/**合同跟进人名字*/
handlerName: string;
/**甲方合同ID*/
id: number;
/**乙方Id*/
partyBId: number;
/**甲方信息*/
partyList: ContractPartyListVO[];
/**乙方名字*/
partyName: string;
/**乙方收款账号ID*/
receivingAccountId: number;
/**合同标题*/
title: string;
}
/**CustomerReportAddRuleVO*/
export interface CustomerReportAddRuleVO {
/**客户保护期时间*/
customerProtectionPeriod: number;
/**开发商保护期*/
developerProtectionPeriod: number;
/**开发商界定规则*/
developersRules: string;
/**到访为王*/
exVisit: number;
/**报备有效时间*/
filingEffectiveTime: number;
/**项目ID*/
proId: number;
/**报备说明*/
reportDescription: string;
/**报备规则(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportTypeEnum: string;
/**周期ID*/
termId: number;
/**拜访说明*/
visitDescription: string;
}
/**CustomerReportRule*/
export interface CustomerReportRule {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户保护期时间*/
customerProtectionPeriod: number;
/**已删除*/
deleted: number;
/**开发商保护期*/
developerProtectionPeriod: number;
/**开发商界定规则*/
developersRules: string;
/**到访为王*/
exVisit: number;
/**报备有效时间*/
filingEffectiveTime: number;
/**PRO_ID*/
proId: number;
/**报备说明*/
reportDescription: string;
/**客户报备ID*/
reportId: number;
/**报备规则(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportType: string;
/**TERM_ID*/
termId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
/**拜访说明*/
visitDescription: string;
}
/**CustomerReportRuleVO*/
export interface CustomerReportRuleVO {
/**审核状态(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**城市code*/
city: string;
/**客户保护期时间*/
customerProtectionPeriod: number;
/**开发商界定规则*/
cycleWxbbqdVOS: CycleWxbbqdVO[];
/**开发商保护期*/
developerProtectionPeriod: number;
/**开发商界定规则*/
developersRules: string;
/**到访为王*/
exVisit: number;
/**报备有效时间*/
filingEffectiveTime: number;
/**报备说明*/
reportDescription: string;
/**报备ID*/
reportId: number;
/**报备规则(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportTypeEnum: string;
/**周期ID*/
termId: number;
/**拜访说明*/
visitDescription: string;
}
/**CustomerReportUpdateRuleVO*/
export interface CustomerReportUpdateRuleVO {
/**客户保护期时间*/
customerProtectionPeriod: number;
/**开发商保护期*/
developerProtectionPeriod: number;
/**开发商界定规则*/
developersRules: string;
/**到访为王*/
exVisit: number;
/**报备有效时间*/
filingEffectiveTime: number;
/**项目ID*/
proId: number;
/**报备说明*/
reportDescription: string;
/**报备ID*/
reportId: number;
/**报备规则(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportTypeEnum: string;
/**周期ID*/
termId: number;
/**拜访说明*/
visitDescription: string;
}
/**CycleOafyVO*/
export interface CycleOafyVO {
/**OA附言内容*/
oaContent: string;
/**OA_ID*/
oaId: number;
/**OA附言时间*/
oaTime: string;
/**OA图片地址*/
picAddrs: string;
/**OA附言发起人*/
sponsor: string;
}
/**CycleWxbbqdAddVO*/
export interface CycleWxbbqdAddVO {
/**渠道公司ID*/
channelCompanyId: number[];
/**(必填)项目ID*/
proId: number;
}
/**CycleWxbbqdVO*/
export interface CycleWxbbqdVO {
/**渠道公司ID*/
channelCompanyId: number;
/**渠道公司名称*/
channelCompanyName: string;
/**无需爱家报备ID*/
wxId: number;
}
/**DevelopDTO*/
export interface DevelopDTO {
/**实收金额【实际收到金额】*/
actAmount: number;
/**已经结佣的代理费*/
ageAlreadyPay: number;
/**代理费拆佣*/
ageCommFees: number;
/**未结佣的代理费*/
ageUnAlreadyPay: number;
/**开发商ID*/
developId: number;
}
/**DevelopResponseDTO*/
export interface DevelopResponseDTO {
/**实收金额【实际收到金额】*/
actAmount: number;
/**已经结佣的代理费*/
ageAlreadyPay: number;
/**代理费拆佣*/
ageCommFees: number;
/**未结佣的代理费*/
ageUnAlreadyPay: number;
/**算出代理费拆佣*/
calcAgeCommFees: number;
/**开发商ID*/
developId: number;
}
/**DistributContractApplyVO*/
export interface DistributContractApplyVO {
/**市*/
city: string;
/**中介分销*/
distributContractByTermVOS: DistributContractByTermVO[];
/**启动事业部ID*/
startDivisionId: number;
}
/**DistributContractByTermVO*/
export interface DistributContractByTermVO {
/**中介分销合同ID*/
agencyContrictId: number;
/**代理费结算条件(ComNoPad-常规不垫佣版、ComPad-常规垫佣版、SpecialDiscount-优惠折扣版)*/
agencySettleCondtion: string;
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**申领权限(Business-业务线申领、MiddleAndBack-中后台申领)*/
claimPower: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**合同主标题*/
contractTitle: string;
/**费用结算类型(DevelopAgenFee-开发商或者委托方代理费、CustomerServFee-客户服务费、DevelopAgenFeeOrCustServFee-开发商或者委托方代理费/客户服务费)*/
costSettleType: string;
/**是否可申领(Yes-是、No-否)*/
exClaim: string;
/**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司 甲方合同-乙方*/
partyCompany: string;
/**合同扫描件地址*/
scanningContract: string;
/**状态(New-新增、Update-修改、Delete-删除、Stop-禁用、Start-启用、Cancel-作废、Audit-审核、Reject-驳回)*/
state: string;
}
/**DistributContractCheckConditionVo*/
export interface DistributContractCheckConditionVo {
/**渠道类型(成交方式)(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**成交客户ID*/
consumerId: number;
/**客户名称*/
consumerName: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**派发条件的的集合*/
packMxIds: number[];
/**是否垫佣  Veto("否"),Tree("3个月"),Six("6个月"),Nine("9个月"),MoreTen("10个月以上");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**立项ID*/
termId: number;
}
/**DistributContractConditionChooseVo*/
export interface DistributContractConditionChooseVo {
/**渠道类型(成交方式)(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**成交客户ID*/
consumerId: number;
/**客户名称*/
consumerName: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**收派ID*/
packageId: number;
/**是否垫佣  Veto("否"),Tree("3个月"),Six("6个月"),Nine("9个月"),MoreTen("10个月以上");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**立项ID*/
termId: number;
}
/**DistributContractConditionVo*/
export interface DistributContractConditionVo {
/**渠道类型(成交方式)(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**成交客户ID*/
consumerId: number;
/**客户名称*/
consumerName: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**是否垫佣  Veto("否"),Tree("3个月"),Six("6个月"),Nine("9个月"),MoreTen("10个月以上");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**立项ID*/
termId: number;
}
/**DistributContractMO*/
export interface DistributContractMO {
/**纸质告知书模板*/
attachTermVOS: AttachTermItemVO[];
/**审核状态(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**市*/
city: string;
/**OA合同呈批*/
constractOaVO: ConstractOaVO;
/**中介分销合同相关*/
distributContractVOS: DistributContractQueryVO[];
/**区*/
district: string;
/**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方退款天数天数*/
partyARefundDays: number;
/**优惠告知书相关信息*/
preferentialMxVOS: PreferentialMxVO[];
/**我司名称*/
preferentialPartyA: string;
/**我司ID*/
preferentialPartyAId: number;
/**我司地址*/
preferentialPartyAddr: string;
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**项目备案名*/
proRecord: string;
/**省*/
province: string;
/**启动事业部*/
startDivision: string;
/**启动事业部ID*/
startDivisionId: number;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**DistributContractMxVO*/
export interface DistributContractMxVO {
/**基准费用 Contract("按签约价"),Subscription("按认购价");(Contract-按签约价、Subscription-按认购价)*/
baseCostEnum: string;
/**条件ID*/
conditionId: number;
/**中介分销合同明细表ID*/
contrictMxId: number;
/**佣金类型 ServiceFee("服务费"),AgencyFee("代理费")(ServiceFee-服务费、AgencyFee-代理费)*/
costTypeEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**派发佣金标准*/
sendContext: string;
/**条件*/
standardPay: string;
}
/**DistributContractQueryVO*/
export interface DistributContractQueryVO {
/**中介分销合同ID*/
agencyContrictId: number;
/**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**申领权限(Business-业务线申领、MiddleAndBack-中后台申领)*/
claimPower: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**合同主标题*/
contractTitle: string;
/**指定中介行多选*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**派发佣金标准*/
distributContractMxVOS: DistributContractMxVO[];
/**是否可申领(Yes-是、No-否)*/
exClaim: string;
/**文件*/
fileId: string;
/**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID*/
partyCompanyId: number;
/**状态(New-新增、Update-修改、Delete-删除、Stop-禁用、Start-启用、Cancel-作废、Audit-审核、Reject-驳回)*/
state: string;
/**立项周期ID*/
termId: number;
}
/**中介分销合同相关信息表*/
export interface DistributContractUpdateVO {
/**中介分销合同*/
agencyContrictId: number;
/**代理费结算条件-备注*/
agencyCostCondition: string;
/**代理费结算方式*/
agencyCostSettleWay: string;
/**代理费计付标准备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**代理费结算条件(ComNoPad-常规不垫佣版、ComPad-常规垫佣版、SpecialDiscount-优惠折扣版)*/
agencySettleCondtion: string;
/**附件列表*/
attachTermItemVOS: AttachTerm[];
/**渠道类型 BigPlatform("大平台"),FirstPlatform("大型中介/一级平台"),MiddlePlatform("中型中介/二级平台"),SmallPlatform("小型中介"),Appoint("指定中介行");(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**市*/
city: string;
/**申领权限(Business-业务线申领、MiddleAndBack-中后台申领)*/
claimPower: string;
/**佣金类型(Channel-渠道佣金、Infield-内场佣金)*/
commissionKind: string;
/**我司ID*/
companyId: number;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**客户成交以及确认*/
consumerComplete: string;
/**合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同副标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**费用结算类型(DevelopAgenFee-开发商或者委托方代理费、CustomerServFee-客户服务费、DevelopAgenFeeOrCustServFee-开发商或者委托方代理费/客户服务费)*/
costSettleType: string;
/**负责人*/
dealMan: string;
/**负责人联系电话*/
dealTel: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**区*/
district: string;
/**是否可申领(Yes-是、No-否)*/
exClaim: string;
/**是否涉及佣金标准(Yes-是、No-否)*/
exInvolvedCommiss: string;
/**文件地址*/
fileId: string;
/**店组ID*/
groupId: number;
/**是否垫佣  Veto("否"),LessOrEqualOne("回款周期≤1个月"),Between1To3("1个月＜回款周期≤3个月"),Between3To6("3个月＜回款周期≤6个月"),Between6To9("6个月＜回款周期≤9个月"),Between9To12("9个月＜回款周期≤12个月");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**甲方联系人*/
partyaMan: string;
/**甲方联系人电话*/
partyaTel: string;
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**项目备案名*/
proRecord: string;
/**省*/
province: string;
/**启动事业部ID*/
startDivisionId: number;
/**补充条款*/
supplementary: string;
/**立项周期ID*/
termId: number;
/**违约责任*/
unContractLiability: string;
}
/**中介分销合同相关信息表*/
export interface DistributContractVO {
/**中介分销合同*/
agencyContrictId: number;
/**代理费结算条件-备注*/
agencyCostCondition: string;
/**代理费结算方式*/
agencyCostSettleWay: string;
/**代理费计付标准备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**代理费结算条件(ComNoPad-常规不垫佣版、ComPad-常规垫佣版、SpecialDiscount-优惠折扣版)*/
agencySettleCondtion: string;
/**附件列表*/
attachTermItemVOS: AttachTerm[];
/**渠道类型 BigPlatform("大平台"),FirstPlatform("大型中介/一级平台"),MiddlePlatform("中型中介/二级平台"),SmallPlatform("小型中介"),Appoint("指定中介行");(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**市*/
city: string;
/**申领权限(Business-业务线申领、MiddleAndBack-中后台申领)*/
claimPower: string;
/**佣金类型(Channel-渠道佣金、Infield-内场佣金)*/
commissionKind: string;
/**我司ID*/
companyId: number;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**客户成交以及确认*/
consumerComplete: string;
/**合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**合同种类(StandKindSaleConfirm-标准联动销售确认书(启动函)、NoStandKindSaleConfirm-非标联动销售确认书(启动函)、StandChannel-标准渠道分销合同、NoStandChannel-非准渠道分销合同、NoChannel-非渠道类合同)*/
contractKind: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同副标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**费用结算类型(DevelopAgenFee-开发商或者委托方代理费、CustomerServFee-客户服务费、DevelopAgenFeeOrCustServFee-开发商或者委托方代理费/客户服务费)*/
costSettleType: string;
/**负责人*/
dealMan: string;
/**负责人联系电话*/
dealTel: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**区*/
district: string;
/**是否可申领(Yes-是、No-否)*/
exClaim: string;
/**是否涉及佣金标准(Yes-是、No-否)*/
exInvolvedCommiss: string;
/**文件地址*/
fileId: string;
/**店组ID*/
groupId: number;
/**是否垫佣  Veto("否"),LessOrEqualOne("回款周期≤1个月"),Between1To3("1个月＜回款周期≤3个月"),Between3To6("3个月＜回款周期≤6个月"),Between6To9("6个月＜回款周期≤9个月"),Between9To12("9个月＜回款周期≤12个月");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**甲方联系人*/
partyaMan: string;
/**甲方联系人电话*/
partyaTel: string;
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**项目备案名*/
proRecord: string;
/**省*/
province: string;
/**启动事业部ID*/
startDivisionId: number;
/**补充条款*/
supplementary: string;
/**立项周期ID*/
termId: number;
/**违约责任*/
unContractLiability: string;
}
/**DistributeProTermVO*/
export interface DistributeProTermVO {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**我司ID*/
companyId: number;
/**我司名称*/
companyName: string;
/**甲方退款天数*/
partyARefundDays: number;
/**项目id*/
proId: number;
/**项目名称*/
proName: string;
/**启动事业部ID[区域]*/
startDivisionId: number;
/**启动事业部名称[区域]*/
startDivisionName: string;
/**周期状态(Stop-禁用、Start-启用)*/
state: string;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**周期名称*/
termName: string;
/**项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购、Recognize-认筹)*/
termStageEnum: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**ExsitsOver*/
export interface ExsitsOver {
/**立项ID*/
termId: number;
/**状态 只能是 0 or 1*/
type: number;
}
/**FirstAgencyAccountVO*/
export interface FirstAgencyAccountVO {
/**(必填)账户类型(Base-基本存款账户、Commonly-一般存款账户)*/
accountEnum: string;
/**一手代理公司账号ID*/
accountId: number;
/**(必填)账户名称*/
accountName: string;
/**(必填)账号*/
accountNo: string;
/**(必填)开户行*/
depositBank: string;
}
/**FirstAgencyCompanyAddArgs*/
export interface FirstAgencyCompanyAddArgs {
/**(必填)地址*/
addr: string;
/**一手公司代理ID*/
agencyId: number;
/**(必填)公司名称*/
agencyName: string;
/**(必填)区*/
area: string;
/**附件信息信息*/
attachAgencyVOS: AttachAgencyItemVO[];
/**(必填)营业日期结束(yyyy-MM-dd)*/
businessEnd: string;
/**(必填)营业日期起始(yyyy-MM-dd)*/
businessStart: string;
/**(必填)市*/
city: string;
/**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）、CompanyLimitedByShares-股份有限公司、IndividualIndustrial-个体工商户)*/
companyType: string;
/**(必填)信用代码*/
creditCode: string;
/**(必填)成立日期(yyyy-MM-dd)*/
establishDate: string;
/**账号信息*/
firstAgencyAccounts: FirstAgencyAccountVO[];
/**(必填)身份证号码*/
idCard: string;
/**(必填)法定代表人*/
legalPerson: string;
/**电子邮箱*/
mail: string;
/**(必填)负责人手机号*/
mobile: string;
/**(必填)省*/
province: string;
/**(必填)注册资本*/
registeredCapital: string;
/**备注*/
remark: string;
/**(必填)负责人*/
responsibleMan: string;
/**(必填)简称*/
simpleName: string;
}
/**FirstAgencyCompanyAddArgs_1*/
export interface FirstAgencyCompanyAddArgs_1 {
/**(必填)地址*/
addr: string;
/**(必填)公司名称*/
agencyName: string;
/**(必填)区*/
area: string;
/**附件信息信息*/
attachAgencyVOS: AttachAgencyItemVO[];
/**(必填)营业日期结束(yyyy-MM-dd)*/
businessEnd: string;
/**(必填)营业日期起始(yyyy-MM-dd)*/
businessStart: string;
/**(必填)市*/
city: string;
/**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）、CompanyLimitedByShares-股份有限公司、IndividualIndustrial-个体工商户)*/
companyType: string;
/**(必填)信用代码*/
creditCode: string;
/**(必填)成立日期(yyyy-MM-dd)*/
establishDate: string;
/**账号信息*/
firstAgencyAccounts: FirstAgencyAccountVO[];
/**(必填)身份证号码*/
idCard: string;
/**(必填)法定代表人*/
legalPerson: string;
/**电子邮箱*/
mail: string;
/**(必填)负责人手机号*/
mobile: string;
/**(必填)省*/
province: string;
/**(必填)注册资本*/
registeredCapital: string;
/**备注*/
remark: string;
/**(必填)负责人*/
responsibleMan: string;
/**(必填)简称*/
simpleName: string;
}
/**一手代理公司详情*/
export interface FirstAgencyCompanyDetail {
/**地址*/
addr: string;
/**审核状态(Draft-草稿、WaitByBranch-分公司待审核、Reviewd-OA已审核)*/
agencyAuditEnum: string;
/**一手公司代理ID*/
agencyId: number;
/**公司名称*/
agencyName: string;
/**区*/
area: string;
/**附件信息信息*/
attachAgencyVOS: AttachAgencyItemVO[];
/**营业日期结束(yyyy-MM-dd)*/
businessEnd: string;
/**营业日期起始(yyyy-MM-dd)*/
businessStart: string;
/**市*/
city: string;
/**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）、CompanyLimitedByShares-股份有限公司、IndividualIndustrial-个体工商户)*/
companyType: string;
/**信用代码*/
creditCode: string;
/**undefined*/
establishDate: string;
/**账号信息*/
firstAgencyAccounts: FirstAgencyAccountVO[];
/**跟进人*/
followMan: string;
/**跟进人ID*/
followManId: number;
/**身份证号码*/
idCard: string;
/**法定代表人*/
legalPerson: string;
/**电子邮箱*/
mail: string;
/**负责人手机号*/
mobile: string;
/**省*/
province: string;
/**注册资本*/
registeredCapital: string;
/**备注*/
remark: string;
/**负责人*/
responsibleMan: string;
/**简称*/
simpleName: string;
}
/**FirstAgencyCompanyQueryVO*/
export interface FirstAgencyCompanyQueryVO {
/**审核状态(Draft-草稿、WaitByBranch-分公司待审核、Reviewd-OA已审核)*/
agencyAuditEnum: string;
/**公司名称*/
agencyName: string;
/**区*/
area: string;
/**市*/
city: string;
/**信用代码*/
creditCode: string;
/**跟进人*/
followMan: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**省*/
province: string;
/**简称*/
simpleName: string;
}
/**FirstAgencyListVO*/
export interface FirstAgencyListVO {
/**审核状态(Draft-草稿、WaitByBranch-分公司待审核、Reviewd-OA已审核)*/
agencyAuditEnum: string;
/**市*/
city: string;
/**市*/
cityName: string;
/**行政区*/
county: string;
/**区*/
countyName: string;
/**跟进人*/
followMan: string;
/**跟进人ID*/
followManId: number;
/**公司ID*/
id: number;
/**公司名称*/
name: string;
/**项目一手公司代理ID*/
proAgencyId: number;
/**省*/
province: string;
/**省*/
provinceName: string;
/**简称*/
shortName: string;
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
/**FuzzyBuildingNameOrProIdSearchVO*/
export interface FuzzyBuildingNameOrProIdSearchVO {
/**栋座信息*/
buildingName: string;
/**项目ID*/
proId: number;
/**物业类型*/
propertyEnum: string;
}
/**HouseTypeAddArgs*/
export interface HouseTypeAddArgs {
/**(必填)厅*/
hall: number;
/**(必填)户型名称*/
houseName: string;
/**(必填)厨*/
kitchen: number;
/**户型图片*/
picAddr: string;
/**(必填)    Unknown("未知"),WestEast("东西"),NorthSouth("南北"),NorthEast("东北"),SouthEast("东南"),NorthWest ("西北"),
    SouthWest("西南"),East("东"),West("西"),South("南"),North("北")(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**(必填)项目ID*/
proId: number;
/**(必填)室*/
room: number;
/**(必填)户型面积*/
space: number;
/**(必填)卫*/
toilet: number;
}
/**户型详情信息*/
export interface HouseTypeDetailVo {
/**户型均价*/
averagePrice: number;
/**户型名称*/
houseName: string;
/**户型id*/
houseTypeId: number;
/**户型图片*/
picAddr: string;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 	      EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**项目ID*/
proId: number;
/**产权年限*/
propertyAge: string;
/**物业费*/
propertyCost: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**户型面积*/
space: number;
}
/**HouseTypeDto*/
export interface HouseTypeDto {
/**厅*/
hall: number;
/**户型名称*/
houseName: string;
/**明源户型ID*/
houseTypeGuid: string;
/**厨*/
kitchen: number;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**室*/
room: number;
/**户型面积*/
space: number;
/**卫*/
toilet: number;
}
/**楼盘物业对应所属户型*/
export interface HouseTypeItemsByBuildingVO {
/**undefined*/
hall: number;
/**户型名称*/
houseName: string;
/**户型ID*/
houseTypeId: number;
/**厨*/
kitchen: number;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**项目ID*/
proId: number;
/**物业类型ID*/
propertyId: number;
/**室*/
room: number;
/**户型面积*/
space: number;
/**卫*/
toilet: number;
}
/**HouseTypeUpdateArgs*/
export interface HouseTypeUpdateArgs {
/**(必填)厅*/
hall: number;
/**(必填)户型名称*/
houseName: string;
/**id*/
houseTypeId: number;
/**(必填)厨*/
kitchen: number;
/**户型图片*/
picAddr: string;
/**(必填)    Unknown("未知"),WestEast("东西"),NorthSouth("南北"),NorthEast("东北"),SouthEast("东南"),NorthWest ("西北"),
    SouthWest("西南"),East("东"),West("西"),South("南"),North("北")(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**(必填)项目ID*/
proId: number;
/**(必填)室*/
room: number;
/**(必填)户型面积*/
space: number;
/**(必填)卫*/
toilet: number;
}
/**HouseTypeVO*/
export interface HouseTypeVO {
/**明源楼盘ID*/
buildingGuid: string;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**厅*/
hall: number;
/**户型名称*/
houseName: string;
/**明源户型ID*/
houseTypeGuid: string;
/**id*/
houseTypeId: number;
/**厨*/
kitchen: number;
/**户型图片*/
picAddr: string;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**项目ID*/
proId: number;
/**室*/
room: number;
/**户型面积*/
space: number;
/**卫*/
toilet: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**户型详情信息*/
export interface HouseTypeYDDetailVo {
/**厅*/
hall: number;
/**户型名称*/
houseName: string;
/**户型id*/
houseTypeId: number;
/**同楼盘其它户型列表*/
houseTypeYDOtherDetailVos: HouseTypeYDOtherDetailVo[];
/**厨*/
kitchen: number;
/**户型图片*/
picAddr: string;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 	      EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**项目ID*/
proId: number;
/**产权年限(Thirty-30、Forty-40、Fifty-50、Sixty-60、Seventy-70、Permanent-永久)*/
propertyAge: string;
/**物业费*/
propertyCost: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**室*/
room: number;
/**户型售价*/
salePrice: number;
/**户型面积*/
space: number;
/**卫*/
toilet: number;
}
/**户型详情信息*/
export interface HouseTypeYDOtherDetailVo {
/**户型名称*/
houseName: string;
/**户型id*/
houseTypeId: number;
/**户型图片*/
picAddr: string;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 	      EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**户型售价*/
salePrice: number;
/**户型面积*/
space: number;
}
/**LogAndOAVo*/
export interface LogAndOAVo {
/**OA附言列表*/
oafyVOS: CycleOafyVO[];
/**快照列表*/
termHisVOS: TermHisVO[];
/**操作日志列表*/
termLogVOS: TermLogVO[];
}
/**MYRoomItemVo*/
export interface MYRoomItemVo {
/**明源楼盘ID*/
buildingGuid: string;
/**栋数ID*/
buildingId: number;
/**栋数名称*/
buildingName: string;
/**厅*/
hall: number;
/**户型名称*/
houseName: string;
/**明源户型ID*/
houseTypeGuid: string;
/**厨*/
kitchen: number;
/**户型图片*/
picAddr: string;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 	      EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**proId*/
proId: number;
/**室*/
room: number;
/**明源room_guid*/
roomGuid: string;
/**id*/
roomId: number;
/**房间号*/
roomNo: string;
/**户型面积*/
space: number;
/**卫*/
toilet: number;
}
/**NoChannelVo*/
export interface NoChannelVo {
/**中介分销合同Id*/
agencyContrictId: number;
/**合同电子版*/
attachTermItemVOS: AttachTermItemVO[];
/**佣金类型(Channel-渠道佣金、Infield-内场佣金)*/
commissionKind: string;
/**四、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**四、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同主标题*/
contractTitle: string;
/**是否涉及佣金标准(Yes-是、No-否)*/
exInvolvedCommiss: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
}
/**中介分销合同相关信息表*/
export interface NoChannelVoUpdateVO {
/**中介分销合同*/
agencyContrictId: number;
/**合同电子版*/
attachTermItemVOS: AttachTermItemVO[];
/**佣金类型(Channel-渠道佣金、Infield-内场佣金)*/
commissionKind: string;
/**四、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**四、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同主标题*/
contractTitle: string;
/**是否涉及佣金标准(Yes-是、No-否)*/
exInvolvedCommiss: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
}
/**NoStandChannelVo*/
export interface NoStandChannelVo {
/**中介分销合同Id*/
agencyContrictId: number;
/**合同电子版*/
attachTermItemVOS: AttachTermItemVO[];
/**渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**四、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**四、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同主标题*/
contractTitle: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
}
/**中介分销合同相关信息表*/
export interface NoStandChannelVoUpdateVO {
/**中介分销合同*/
agencyContrictId: number;
/**合同电子版*/
attachTermItemVOS: AttachTermItemVO[];
/**渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**四、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**四、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同主标题*/
contractTitle: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
}
/**NoStandKindSaleConfirmVo*/
export interface NoStandKindSaleConfirmVo {
/**中介分销合同Id*/
agencyContrictId: number;
/**合同电子版*/
attachTermItemVOS: AttachTermItemVO[];
/**二、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**二、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同主标题*/
contractTitle: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
}
/**中介分销合同相关信息表*/
export interface NoStandKindSaleConfirmVoUpdateVO {
/**中介分销合同*/
agencyContrictId: number;
/**合同电子版*/
attachTermItemVOS: AttachTermItemVO[];
/**二、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**二、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同主标题*/
contractTitle: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
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
/**OtherVo*/
export interface OtherVo {
/**审核状态(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**我司ID*/
companyId: number;
/**我司名称*/
companyName: string;
/**是否允许跨项目使用其他渠道费用*/
exOtherProChannelUse: number;
/**是否穿底*/
exOver: number;
/**店组ID*/
groupId: number;
/**店组【末级组织】*/
groupName: string;
/**项目ID*/
proId: number;
/**收款账户*/
receiptAccount: string;
/**收款ID*/
receiptId: number;
/**收款方*/
receiptMan: string;
/**共享其他渠道费周期列表*/
shareChannelFeeVOS: ShareChannelFeeVO[];
/**特殊业绩方案ID*/
specialId: number;
/**特殊业绩方案名称*/
specialName: string;
/**启动事业部ID【分公司ID】*/
startDivisionId: number;
/**启动事业部名称【分公司ID】*/
startDivisionName: string;
/**立项ID*/
termId: number;
}
/**ParentProjectAddArgs*/
export interface ParentProjectAddArgs {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**明源楼盘ID*/
buildingGuid: string;
/**明源楼盘名称*/
buildingGuidName: string;
/**(必填)市*/
city: string;
/**市名称*/
cityName: string;
/**(必填)区*/
district: string;
/**区名称*/
districtName: string;
/**(必填)是否市场化*/
exMarket: number;
/**(必填)是否明远源*/
exMinyuan: number;
/**(必填)项目地址*/
proAddr: string;
/**(必填)项目推广名*/
proName: string;
/**(必填)项目备案名*/
proRecord: string;
/**(必填)省*/
province: string;
/**省名称*/
provinceName: string;
}
/**ParentProjectUpdateArgs*/
export interface ParentProjectUpdateArgs {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**明源楼盘ID*/
buildingGuid: string;
/**明源楼盘名称*/
buildingGuidName: string;
/**(必填)市*/
city: string;
/**市名称*/
cityName: string;
/**明源公司名称*/
companyName: string;
/**(必填)区*/
district: string;
/**区名称*/
districtName: string;
/**(必填)是否市场化*/
exMarket: number;
/**(必填)是否明远源*/
exMinyuan: number;
/**(必填)项目地址*/
proAddr: string;
/**id*/
proId: number;
/**(必填)项目推广名*/
proName: string;
/**项目编号*/
proNo: string;
/**(必填)项目备案名*/
proRecord: string;
/**(必填)省*/
province: string;
/**省名称*/
provinceName: string;
}
/**PartAInfoByDealDto*/
export interface PartAInfoByDealDto {
/**栋座ID*/
buildingId: number;
/**立项ID*/
termId: number;
}
/**PartYAInfoDto*/
export interface PartYAInfoDto {
/**甲方ID*/
companyId: number;
/**甲方名称*/
companyName: string;
}
/**PartyAContractAddVO*/
export interface PartyAContractAddVO {
/**合同id集合*/
partyAContractVOS: number[];
/**立项ID*/
termId: number;
}
/**PartyAContractDelVO*/
export interface PartyAContractDelVO {
/**甲方合同ID*/
contractId: number;
/**甲方ID*/
partyAIds: number[];
/**立项ID*/
termId: number;
}
/**PartyAContractPageVO*/
export interface PartyAContractPageVO {
/**审核状态(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**公司ID*/
companyId: number;
/**公司名称*/
companyName: string;
/**甲方合同信息*/
partyAContractInfos: ContractRelatedCycleResponseVO[];
/**甲方关联栋座*/
partyAInfoMesgVOS: PartyAInfoMesgVO[];
/**备注信息*/
partyAOaVO: PartyAOaVO;
/**启动事业部ID*/
startDivisionId: number;
/**启动事业部*/
startDivisionName: string;
/**立项ID*/
termId: number;
}
/**PartyAInfoAddVO*/
export interface PartyAInfoAddVO {
/**立项ID*/
partyAInfoVOS: PartyAInfoVO[];
/**立项ID*/
termId: number;
}
/**PartyAInfoMesgVO*/
export interface PartyAInfoMesgVO {
/**(必填)项目栋座集合*/
buildingVos: BuildingItemVO[];
/**(必填)甲方ID*/
companyId: number;
/**(必填)甲方名称*/
companyName: string;
}
/**PartyAInfoVO*/
export interface PartyAInfoVO {
/**(必填)项目栋座ID集合*/
buildingIds: number[];
/**(必填)甲方ID*/
companyId: number;
}
/**PartyAOaSaveVO*/
export interface PartyAOaSaveVO {
/**(必填)自增ID*/
partyAOaId: number;
/**(必填)备注信息*/
remark: string;
/**(必填)type类型不能为空！1~客户成交以及确认,2~违约责任*/
type: number;
}
/**PartyAOaVO*/
export interface PartyAOaVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**客户成交及其确认*/
customerConfirm: string;
/**已删除*/
deleted: number;
/**自增ID*/
partyAOaId: number;
/**违约责任*/
responsibiltity: string;
/**周期ID*/
termId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**PartyARefundDaysVO*/
export interface PartyARefundDaysVO {
/**甲方退款天数*/
partyARefundDays: number;
/**立项ID*/
termId: number;
}
/**PaymentDelVO*/
export interface PaymentDelVO {
/**(必填)成交外收支表ID*/
paymentId: number;
/**(必填)立项周期ID*/
termId: number;
}
/**PaymentUpdateVO*/
export interface PaymentUpdateVO {
/**(必填)金额*/
amount: number;
/**(必填)费用类型  MyCompanyFee("我司平台费用"),OtherChannelFee("其它渠道费用");(MyCompanyFee-我司平台费用、OtherChannelFee-其它渠道费用)*/
dealEnum: string;
/**意见*/
opinion: string;
/**(必填)收入/支出 IN-收入 OUT-支出(In-收入、Out-支出)*/
paymentEnum: string;
/**(必填)成交外收支表ID*/
paymentId: number;
/**(必填)立项周期ID*/
termId: number;
}
/**PaymentVO*/
export interface PaymentVO {
/**(必填)金额*/
amount: number;
/**(必填)费用类型  MyCompanyFee("我司平台费用"),OtherChannelFee("其它渠道费用");(MyCompanyFee-我司平台费用、OtherChannelFee-其它渠道费用)*/
dealEnum: string;
/**意见*/
opinion: string;
/**(必填)收入/支出 IN-收入 OUT-支出(In-收入、Out-支出)*/
paymentEnum: string;
/**(必填)立项周期ID*/
termId: number;
}
/**PreViewVO*/
export interface PreViewVO {
/**字节数组*/
bytes: string;
/**ID*/
fileId: string;
/**参数*/
parmas: object;
}
/**PreferentialFileVO*/
export interface PreferentialFileVO {
/**文件列表*/
attachTermItemVOS: AttachTermItemVO[];
/**立项ID*/
termId: number;
}
/**PreferentialMxAddVO*/
export interface PreferentialMxAddVO {
/**优惠结束时间(yyyy-MM-dd)*/
endTime: string;
/**是否显示“本优惠不在《认购书》上重复体现”条款*/
exPreferentialItem: number;
/**优惠方式说明*/
modeDescription: string;
/**缴纳金额*/
premiumReceived: number;
/**优惠开始时间(yyyy-MM-dd)*/
startTime: string;
/**立项ID*/
termId: number;
}
/**PreferentialMxUpdateVO*/
export interface PreferentialMxUpdateVO {
/**优惠结束时间(yyyy-MM-dd)*/
endTime: string;
/**是否显示“本优惠不在《认购书》上重复体现”条款*/
exPreferentialItem: number;
/**优惠方式说明*/
modeDescription: string;
/**优惠MxID*/
preferentialMxId: number;
/**缴纳金额*/
premiumReceived: number;
/**优惠开始时间(yyyy-MM-dd)*/
startTime: string;
/**立项ID*/
termId: number;
}
/**PreferentialMxVO*/
export interface PreferentialMxVO {
/**优惠结束时间(yyyy-MM-dd)*/
endTime: string;
/**是否显示“本优惠不在《认购书》上重复体现”条款*/
exPreferentialItem: number;
/**优惠方式说明*/
modeDescription: string;
/**预览地址fileId*/
preferentialAddr: string;
/**优惠MxID*/
preferentialMxId: number;
/**缴纳金额*/
premiumReceived: number;
/**优惠开始时间(yyyy-MM-dd)*/
startTime: string;
/**立项ID*/
termId: number;
}
/**PreferentialMxYdVO*/
export interface PreferentialMxYdVO {
/**公司主体*/
companyId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**END_TIME(yyyy-MM-dd)*/
endTime: string;
/**是否显示“本优惠不在《认购书》上重复体现”条款*/
exPreferentialItem: number;
/**优惠方式说明*/
modeDescription: string;
/**甲方退款天数*/
partyARefundDays: number;
/**预览地址二维码*/
preferentialAddr: string;
/**优惠ID*/
preferentialMxId: number;
/**缴纳金额*/
premiumReceived: number;
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**启动事业部ID*/
startDivisionId: number;
/**优惠开始时间(yyyy-MM-dd)*/
startTime: string;
/**状态(New-新增、Update-修改、Delete-删除、Stop-禁用、Start-启用、Cancel-作废、Audit-审核、Reject-驳回)*/
state: string;
/**立项周期ID*/
termId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**ProBaseVO*/
export interface ProBaseVO {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**明源楼盘ID*/
buildingGuid: string;
/**明源楼盘父ID*/
buildingParentGuid: string;
/**市*/
city: string;
/**开发商ID*/
developerId: number;
/**区*/
district: string;
/**是否市场化*/
exMarket: number;
/**是否明远源*/
exMinyuan: number;
/**父项目ID*/
parentId: number;
/**项目地址*/
proAddr: string;
/**id*/
proId: number;
/**项目推广名*/
proName: string;
/**项目编号*/
proNo: string;
/**项目备案名*/
proRecord: string;
/**省*/
province: string;
}
/**ProTermVO*/
export interface ProTermVO {
/**突破标准线期数*/
city: string;
/**城市名称*/
cityName: string;
/**开发商ID*/
developerIds: number;
/**开发商名称*/
developerName: string;
/**是否市场化*/
exMarket: number;
/**是否父项目*/
exParent: number;
/**突破标准线期数*/
overStandardCount: number;
/**往期业绩金额*/
preBusAmount: number;
/**项目地址*/
proAddr: string;
/**联动项目ID*/
proId: number;
/**合作项目名称*/
proName: string;
/**项目备案名*/
proRecord: string;
/**联动业务总开展期数*/
totalCount: number;
}
/**ProTermYdArgs*/
export interface ProTermYdArgs {
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
proId: number;
/**周期名称*/
termName: string;
}
/**ProTermYdVO*/
export interface ProTermYdVO {
/**项目ID*/
proId: number;
/**报备规则(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportTypeEnum: string;
/**启动事业部ID*/
startDivisionId: number;
/**立项ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**ProjectAddArgs*/
export interface ProjectAddArgs {
/**附件图片*/
attachPics: AttachItemVO[];
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**明源楼盘ID*/
buildingGuid: string;
/**明源楼盘名称*/
buildingGuidName: string;
/**明源楼盘父ID*/
buildingParentGuid: string;
/**(必填)市*/
city: string;
/**(必填)市名称*/
cityName: string;
/**明源公司名称*/
companyName: string;
/**(必填)开发商ID*/
developerId: number;
/**(必填)区*/
district: string;
/**(必填)区名称*/
districtName: string;
/**(必填)是否市场化*/
exMarket: number;
/**(必填)是否明远源*/
exMinyuan: number;
/**是否同步明源房间*/
exSyncRoom: number;
/**一手代理商列表*/
firstAgencyCompanys: 一手公司代理[];
/**(必填)纬度*/
lat: number;
/**(必填)经度*/
lng: number;
/**父项目ID*/
parentId: number;
/**(必填)项目地址*/
proAddr: string;
/**(必填)项目推广名*/
proName: string;
/**(必填)楼盘图片*/
proPics: AttachItemLPVO[];
/**(必填)项目备案名*/
proRecord: string;
/**(必填)物业类型*/
propertyArgs: PropertyArgs[];
/**(必填)省*/
province: string;
/**(必填)省名称*/
provinceName: string;
/**(必填)搜索地址*/
searchAddr: string;
/**项目周期列表*/
terms: TermBaseByPro[];
}
/**ProjectAuditArgs*/
export interface ProjectAuditArgs {
/**审核意见*/
auditOption: string;
/**(必填)proId*/
proId: number;
}
/**ProjectDetailBBVO*/
export interface ProjectDetailBBVO {
/**城市*/
city: string;
/**城市*/
cityName: string;
/**区*/
district: string;
/**区*/
districtName: string;
/**是否市场化*/
exMarket: number;
/**项目地址*/
proAddr: string;
/**项目名*/
proName: string;
/**项目图片*/
projectPic: string;
/**报备规则(FirstThreeAfterFour-前三后四、FullNumber-全号)*/
reportTypeEnum: string;
}
/**ProjectDetailVO*/
export interface ProjectDetailVO {
/**项目均价*/
averagePrice: number;
/**市*/
city: string;
/**市*/
cityName: string;
/**佣金规则*/
commissionRules: string;
/**导客规则*/
customerReportRule: CustomerReportRule;
/**区*/
district: string;
/**区*/
districtName: string;
/**是否收藏，true 已收藏，false 未收藏*/
exCollect: boolean;
/**是否市场化*/
exMarket: number;
/**户型信息*/
houseTypeDetailVos: HouseTypeDetailVo[];
/**项目地址*/
proAddr: string;
/**proId*/
proId: number;
/**项目推广名*/
proName: string;
/**项目图片*/
projectPic: string;
/**楼盘卖点*/
promotion: PromotionVO;
/**目标客户*/
promotionVO: PromotionVO;
/**物业费*/
propertyCost: number;
/**省*/
province: string;
/**省*/
provinceName: string;
}
/**ProjectDto*/
export interface ProjectDto {
/**(必填)栋座列表*/
buildingDtos: BuildingDto[];
/**明源楼盘ID*/
buildingGuid: string;
/**明源楼盘父ID*/
buildingParentGuid: string;
/**所属公司*/
companyName: string;
/**(必填)户型列表*/
houseTypeDtos: HouseTypeDto[];
/**明源楼盘名称*/
proName: string;
/**明源父楼盘名称*/
proParentName: string;
/**物业列表*/
propertyEnums: string[];
}
/**ProjectFuzzySearchVo*/
export interface ProjectFuzzySearchVo {
/**proId*/
proId: number;
/**项目名称*/
proName: string;
}
/**ProjectFuzzyVo*/
export interface ProjectFuzzyVo {
/**市*/
city: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目名称*/
proName: string;
}
/**ProjectListArgs*/
export interface ProjectListArgs {
/**审核状态 Draft("草稿"),Conduct("审核中"),Adopt("审核通过"),Reject("审核驳回")(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**业务类型    New(新房),Finished(产成品);(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**市*/
city: string;
/**区*/
district: string;
/**是否市场化*/
exMarket: number;
/**是否明远源*/
exMinyuan: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目id*/
proId: number;
/**项目名称*/
proName: string;
/**项目编号*/
proNo: string;
/**省*/
province: string;
/**周期Id*/
termId: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
}
/**ProjectListQueryVO*/
export interface ProjectListQueryVO {
/**均价开始*/
averPriceBegin: number;
/**均价结束*/
averPriceEnd: number;
/**区*/
district: string;
/**排序(PriceHighToLow-均价从高到低、PriceLowToHigh-均价从低到高、DistanceFromNearToFar-距离从近到远、DistanceFromFarToNear-距离从远到近)*/
orderType: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
property: string;
/**装修(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevel: string;
/**户型(One-一室、Two-二室、Three-三室、Four-四室、Five-五室、FivePlus-五室以上)*/
roomNum: string;
}
/**ProjectListVO*/
export interface ProjectListVO {
/**项目图片*/
attachAddr: string;
/**住宅均价*/
averagePrice: number;
/**佣金规则*/
commissionRules: string;
/**区*/
district: string;
/**区名称*/
districtName: string;
/**proId*/
proId: number;
/**项目推广名*/
proName: string;
}
/**ProjectQueryVO*/
export interface ProjectQueryVO {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**市*/
city: string;
/**区*/
district: string;
/**是否市场化*/
exMarket: number;
/**是否明远源*/
exMinyuan: number;
/**父项目ID*/
parentId: number;
/**项目地址*/
proAddr: string;
/**id*/
proId: number;
/**项目名称*/
proName: string;
/**项目编号*/
proNo: string;
/**省*/
province: string;
}
/**ProjectRejectArgs*/
export interface ProjectRejectArgs {
/**(必填)proId*/
proId: number;
/**驳回意见*/
rejectOption: string;
}
/**ProjectSettlementDTO*/
export interface ProjectSettlementDTO {
/**代理费拆佣*/
ageCommFees: number;
/**面积*/
area: number;
/**栋座ID*/
buildingId: number;
/**(必填)渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**渠道商ID*/
channelId: number;
/**周期ID*/
cycleId: number;
/**成交报告编号*/
dealCode: string;
/**成交总金额*/
dealTotalAmount: number;
/**(必填)指定中介行ID*/
designatedAgencyId: number;
/**开发商集合*/
developDTOS: DevelopDTO[];
/**成交总套数*/
houseCount: number;
/**请佣ID*/
id: number;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方ID 开发商*/
partyAId: number;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyType: string;
/**备案情况(Has-有、No-无)*/
recordState: string;
/**明源房款回笼比例(%)*/
returnRatio: number;
/**室*/
room: number;
/**服务费已付金额*/
serAlradyCommFees: number;
/**服务费拆佣：*/
serCommFees: number;
/**服务费未付金额*/
serUnAlradyCommFees: number;
/**签约类型(TempSignUp-临签、NormalSignUp-正签)*/
signType: string;
}
/**ProjectUpdateArgs*/
export interface ProjectUpdateArgs {
/**附件图片*/
attachPics: AttachItemVO[];
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
auditEnum: string;
/**明源楼盘ID*/
buildingGuid: string;
/**明源楼盘名称*/
buildingGuidName: string;
/**明源楼盘父ID*/
buildingParentGuid: string;
/**(必填)市*/
city: string;
/**(必填)市名称*/
cityName: string;
/**明源公司名称*/
companyName: string;
/**(必填)开发商ID*/
developerId: number;
/**(必填)区*/
district: string;
/**(必填)区名称*/
districtName: string;
/**(必填)是否市场化*/
exMarket: number;
/**(必填)是否明远源*/
exMinyuan: number;
/**是否同步明源房间*/
exSyncRoom: number;
/**一手代理商列表*/
firstAgencyCompanys: 一手公司代理[];
/**(必填)纬度*/
lat: number;
/**(必填)经度*/
lng: number;
/**父项目ID*/
parentId: number;
/**(必填)项目地址*/
proAddr: string;
/**id*/
proId: number;
/**(必填)项目推广名*/
proName: string;
/**项目编号*/
proNo: string;
/**(必填)楼盘图片*/
proPics: AttachItemLPVO[];
/**(必填)项目备案名*/
proRecord: string;
/**(必填)物业类型*/
propertyArgs: PropertyArgs[];
/**(必填)省*/
province: string;
/**(必填)省名称*/
provinceName: string;
/**(必填)搜索地址*/
searchAddr: string;
/**项目周期列表*/
terms: TermBaseByPro[];
}
/**PromotionVO*/
export interface PromotionVO {
/**客户年龄*/
customerAge: string;
/**客户考虑因素*/
customerConsiderations: string;
/**客户其他*/
customerOther: string;
/**购房目的*/
housePurchasing: string;
/**意向房型*/
intentionRoomType: string;
/**生活配套*/
lifeFacilities: string;
/**其他*/
other: string;
/**价格优势*/
priceAdvantage: string;
/**项目ID*/
proId: number;
/**项目特色*/
projectFeatures: string;
/**推广ID*/
promotionId: number;
/**物业管理*/
propertyManagement: string;
/**居住区域*/
residentialArea: string;
/**学区配套*/
schoolFacilities: string;
/**交通出行*/
transportation: string;
/**工作区域*/
workArea: string;
}
/**PropertyArgs*/
export interface PropertyArgs {
/**住宅均价*/
averPrice: number;
/**产权年限(Thirty-30、Forty-40、Fifty-50、Sixty-60、Seventy-70、Permanent-永久)*/
propertyAge: string;
/**物业费*/
propertyCost: number;
/**物业类型     Residence("住宅"),WorkShop("厂房"),Apartment("公寓"),Villa("别墅"),Shop("商铺"),Office("写字楼"),
    Parking("车位"),Other("其他")(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**ID*/
propertyId: number;
/**装修级别  Rough("毛坯"),QinShui("清水"),Simple("简装修"),HardBound("精装修");(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
}
/**PropertyVO*/
export interface PropertyVO {
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**ID*/
propertyId: number;
/**物业类型名称(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyName: string;
}
/**QueryCompanyNameResponseVO*/
export interface QueryCompanyNameResponseVO {
/**开发商名称*/
companyName: string;
/**开发商ID*/
id: number;
/**开发商简称*/
shortName: string;
}
/**QueryCompanyNameVO*/
export interface QueryCompanyNameVO {
/**开发商ID*/
ids: number[];
}
/**RecommendProjectVo*/
export interface RecommendProjectVo {
/**市*/
city: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
}
/**RelationTermVO*/
export interface RelationTermVO {
/**甲方信息*/
companyIdVos: CompanyIdVo[];
/**甲方合同id*/
contractId: number;
/**新增为true*/
exNew: boolean;
/**乙方收款账号ID*/
receivingAccountId: number;
}
/**RetractVO*/
export interface RetractVO {
/**开发商ID*/
id: number;
/**撤回原因*/
reason: string;
}
/**RoomAddArgs*/
export interface RoomAddArgs {
/**(必填)栋数ID*/
buildingId: number;
/**是否逐个添加*/
exSimple: number;
/**房号规则 从*/
form: number;
/**(必填)户型ID*/
houseTypeId: number;
/**房号规则 房间号*/
num: number;
/**房间号*/
roomNo: string;
/**房号格式*/
roomPattern: string;
/**房号规则 至*/
to: number;
}
/**RoomDealDto*/
export interface RoomDealDto {
/**是否锁定,0`不锁定 1`锁定*/
exDeal: number;
/**roomId*/
roomId: number;
}
/**RoomDto*/
export interface RoomDto {
/**明源楼盘ID*/
buildingGuid: string;
/**栋数ID*/
buildingId: number;
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**已删除*/
deleted: number;
/**是否锁定*/
exDeal: number;
/**报备是否锁定房号:1锁定,0不锁定*/
exReport: number;
/**明源户型_GUID*/
houseTypeGuid: string;
/**户型ID*/
houseTypeId: number;
/**项目ID*/
proId: number;
/**明源room_guid*/
roomGuid: string;
/**id*/
roomId: number;
/**房间号*/
roomNo: string;
/**明源销售状态(SmallOrder-null、ForSale-null、Sign-null、Subscription-null、SalesControl-null、Reserve-null、Appointment-null)*/
saleStatus: string;
/**明源栋座ID*/
subBuildingGuid: string;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**RoomFuzzyVo*/
export interface RoomFuzzyVo {
/**buildingId 栋座ID*/
buildingId: number;
/**成交是否锁定房号 1 锁定 ，0不锁定，null全部*/
exDeal: number;
/**报备是否锁定房号 1 锁定 ，0不锁定，null全部*/
exReport: number;
/**proId*/
proId: number;
/**房间号*/
roomNo: string;
}
/**RoomItemVo*/
export interface RoomItemVo {
/**是否锁定*/
exDeal: number;
/**id*/
roomId: number;
/**房间号*/
roomNo: string;
}
/**RoomQueryBuildingIdVO*/
export interface RoomQueryBuildingIdVO {
/**栋座ID*/
buildingId: number;
/**户型名称*/
houseName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**项目ID*/
proId: number;
/**房间号*/
roomNo: string;
}
/**RoomQueryVO*/
export interface RoomQueryVO {
/**户型名称*/
houseTypeName: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**项目ID*/
proId: number;
/**房间号*/
roomNo: string;
}
/**RoomReportDto*/
export interface RoomReportDto {
/**报备是否锁定,0`不锁定 1`锁定*/
exReport: number;
/**roomId*/
roomId: number;
}
/**RoomTree*/
export interface RoomTree {
/**是否锁定*/
exDeal: number;
/**名称*/
label: string;
/**值*/
value: number;
}
/**RoomUpdateArgs*/
export interface RoomUpdateArgs {
/**(必填)户型ID*/
houseTypeId: number;
/**id*/
roomId: number;
/**房间号*/
roomNo: string;
}
/**RoomVO*/
export interface RoomVO {
/**栋数ID*/
buildingId: number;
/**厅*/
hall: number;
/**户型名称*/
houseName: string;
/**厨*/
kitchen: number;
/**UNKNOWN-未知 WESTEAST-东西 NORTHSOUTH-南北 NORTHEAST-东北 SOUTHEAST-东南 NORTHWEST-西北 SOUTHWEST-西南 EAST-东 WEST-西 SOUTH-南 NORTH-北(Unknown-未知、WestEast-东西、NorthSouth-南北、NorthEast-东北、SouthEast-东南、NorthWest-西北、SouthWest-西南、East-东、West-西、South-南、North-北)*/
positionEnum: string;
/**室*/
room: number;
/**id*/
roomId: number;
/**房间号*/
roomNo: string;
/**户型面积*/
space: number;
/**卫*/
toilet: number;
}
/**SetDistractStatus*/
export interface SetDistractStatus {
/**(必填)中介分销合同ID*/
agencyContrictId: number;
/**申领权限(Business-业务线申领、MiddleAndBack-中后台申领)*/
claimPower: string;
/**(必填)是否可申领(Yes-是、No-否)*/
exClaim: string;
}
/**SettleConditionCancelVO*/
export interface SettleConditionCancelVO {
/**结算ID*/
settleId: number;
/**立项ID*/
termId: number;
}
/**SettleConditionMakingVO*/
export interface SettleConditionMakingVO {
/**条件 <> <= >= ==(GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compare: string;
/**条件 <> <= >= ==(GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compareB: string;
/**undefined*/
conditionAnd: boolean;
/**条件依据 HOUSETYPE-户型、AREA-面积、CONTRACTPRICE-签约价格、   SUBSCRIPPRICE-认购价格(Property-物业类型、HouseType-户型、Area-面积、DealTotalSets-成交总套数、DealTotalAmount-成交总金额、Building-栋座、ChannelType-中介性质、ContractType-签约类型、ExRecode-是否备案、PaymentReturnRate-回款比率、PadCommission-是否垫佣)*/
conditionModel: string;
/**值A*/
conditionNumA: number;
/**值B*/
conditionNumB: number;
/**条件ID*/
conditionSetId: number;
/**指定中介行*/
designatedAgency: number[];
/**多选值*/
mulitVal: number[];
/**根据房款回笼比率*/
returnRateByHouse: number;
/**单选值*/
simpleVal: string;
/**类型(SingleDropDown-下拉单选、MultiDropDown-下拉多选、MultiSelet-复选框多选、RangeCalc-范围计算、MultiSelet2Drop-复选框兼下拉、Fixed-固定值)*/
type: string;
/**复选值*/
values: string[];
}
/**SettleConditionPleaseVO*/
export interface SettleConditionPleaseVO {
/**条件 <> <= >= ==(GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compare: string;
/**条件 <> <= >= ==(GT-大于、GE-大于等于、LT-小于、LE-小于等于、EQ-等于、NE-不等于)*/
compareB: string;
/**undefined*/
conditionAnd: boolean;
/**条件依据 HOUSETYPE-户型、AREA-面积、CONTRACTPRICE-签约价格、   SUBSCRIPPRICE-认购价格(Property-物业类型、HouseType-户型、Area-面积、DealTotalSets-成交总套数、DealTotalAmount-成交总金额、Building-栋座、PartyACompany-指定甲方公司、ContractType-签约类型、ExRecode-是否备案、PaymentReturnRate-房款回款比率、PadCommission-是否垫佣)*/
conditionModel: string;
/**值A*/
conditionNumA: number;
/**值B*/
conditionNumB: number;
/**条件ID*/
conditionSetId: number;
/**指定中介行*/
designatedAgency: number[];
/**多选值*/
mulitVal: number[];
/**根据房款回笼比率*/
returnRateByHouse: number;
/**单选值*/
simpleVal: string;
/**类型(SingleDropDown-下拉单选、MultiDropDown-下拉多选、MultiSelet-复选框多选、RangeCalc-范围计算、MultiSelet2Drop-复选框兼下拉、Fixed-固定值)*/
type: string;
/**值*/
values: string[];
}
/**SettleConditionVO*/
export interface SettleConditionVO {
/**收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**项目ID*/
proId: number;
/**请佣结算条件*/
settleMakingVOS: SettleMakingVO[];
/**结佣结算条件*/
settlePleaseVOS: SettlePleaseVO[];
}
/**SettleMakingAddVO*/
export interface SettleMakingAddVO {
/**是否代理费*/
agencyFee: number;
/**代理费结算金额*/
agencyFeeSettleAmount: number;
/**代理费设置比例*/
agencyFeeSettleRate: number;
/**是否服务费*/
serviceFee: number;
/**服务费结算金额*/
serviceFeeSettleAmount: number;
/**服务费设置比例*/
serviceFeeSettleRate: number;
/**结算条件*/
settleConditionMakingVOS: SettleConditionMakingVO[];
/**(必填)结算名称*/
settleName: string;
/**TERM_ID*/
termId: number;
}
/**SettleMakingListVO*/
export interface SettleMakingListVO {
/**条件类型(Property-物业类型、HouseType-户型、Area-面积、DealTotalSets-成交总套数、DealTotalAmount-成交总金额、Building-栋座、ChannelType-中介性质、ContractType-签约类型、ExRecode-是否备案、PaymentReturnRate-回款比率、PadCommission-是否垫佣)*/
conditionMarkingEnum: string;
/**枚举类型*/
enumType: string;
/**样式类型(SingleDropDown-下拉单选、MultiDropDown-下拉多选、MultiSelet-复选框多选、RangeCalc-范围计算、MultiSelet2Drop-复选框兼下拉、Fixed-固定值)*/
fieldEnum: string;
}
/**SettleMakingParamVO*/
export interface SettleMakingParamVO {
/**物业类型*/
propertyVOS: PropertyVO[];
/**条件*/
settleMakingListVOS: SettleMakingListVO[];
}
/**SettleMakingUpdateVO*/
export interface SettleMakingUpdateVO {
/**是否代理费*/
agencyFee: number;
/**代理费结算金额*/
agencyFeeSettleAmount: number;
/**代理费设置比例*/
agencyFeeSettleRate: number;
/**是否服务费*/
serviceFee: number;
/**服务费结算金额*/
serviceFeeSettleAmount: number;
/**服务费设置比例*/
serviceFeeSettleRate: number;
/**结算条件*/
settleConditionMakingVOS: SettleConditionMakingVO[];
/**结算ID*/
settleId: number;
/**(必填)结算名称*/
settleName: string;
/**TERM_ID*/
termId: number;
}
/**SettleMakingVO*/
export interface SettleMakingVO {
/**中介性质*/
agencyText: string;
/**是否作废,1`作废 0~有效*/
cancel: number;
/**结算ID*/
settleId: number;
/**结算名称*/
settleName: string;
}
/**SettlePleaseAddVO*/
export interface SettlePleaseAddVO {
/**是否代理费*/
agencyFee: number;
/**代理费结算金额*/
agencyFeeSettleAmount: number;
/**代理费设置比例*/
agencyFeeSettleRate: number;
/**结算条件*/
settleConditionPleaseVOS: SettleConditionPleaseVO[];
/**(必填)结算名称*/
settleName: string;
/**TERM_ID*/
termId: number;
}
/**SettlePleaseListVO*/
export interface SettlePleaseListVO {
/**条件类型(Property-物业类型、HouseType-户型、Area-面积、DealTotalSets-成交总套数、DealTotalAmount-成交总金额、Building-栋座、PartyACompany-指定甲方公司、ContractType-签约类型、ExRecode-是否备案、PaymentReturnRate-房款回款比率、PadCommission-是否垫佣)*/
conditionPleaseEnum: string;
/**枚举类型*/
enumType: string;
/**样式类型(SingleDropDown-下拉单选、MultiDropDown-下拉多选、MultiSelet-复选框多选、RangeCalc-范围计算、MultiSelet2Drop-复选框兼下拉、Fixed-固定值)*/
fieldEnum: string;
}
/**SettlePleaseParamVO*/
export interface SettlePleaseParamVO {
/**物业类型*/
propertyVOS: PropertyVO[];
/**条件*/
settlePleaseListVOS: SettlePleaseListVO[];
}
/**SettlePleaseUpdateVO*/
export interface SettlePleaseUpdateVO {
/**是否代理费*/
agencyFee: number;
/**代理费结算金额*/
agencyFeeSettleAmount: number;
/**代理费设置比例*/
agencyFeeSettleRate: number;
/**结算条件*/
settleConditionPleaseVOS: SettleConditionPleaseVO[];
/**结算ID*/
settleId: number;
/**(必填)结算名称*/
settleName: string;
/**TERM_ID*/
termId: number;
}
/**SettlePleaseVO*/
export interface SettlePleaseVO {
/**是否作废,1`作废 0~有效*/
cancel: number;
/**甲方公司*/
partyAText: string;
/**结算ID*/
settleId: number;
/**结算名称*/
settleName: string;
}
/**SettlementResponse*/
export interface SettlementResponse {
/**代理费可结佣 = 拆佣金额 * 立项的结算比例 + 结算金额*/
ageCanCommFees: number;
/**成交报告编号*/
dealCode: string;
/**返回开发代理费*/
developResponseDTOS: DevelopResponseDTO[];
/**是否满足条件,ture为条件通过，false未没有条件通过*/
exFillCondit: boolean;
/**请佣ID*/
id: number;
/**服务费可结佣 = 拆佣金额 * 立项的结算比例 + 结算金额*/
serCanCommFees: number;
/**通过结算代理项的ID*/
settleIdAgency: number;
/**通过结算服务项的ID*/
settleIdService: number;
/**可结佣合计*/
sumCanFees: number;
}
/**ShareChannelFeeAddVO*/
export interface ShareChannelFeeAddVO {
/**允许共享渠道费周期列表ID*/
shareTermIds: number[];
/**立项周期ID*/
termId: number;
}
/**ShareChannelFeeVO*/
export interface ShareChannelFeeVO {
/**金额*/
amount: number;
/**项目ID*/
proId: number;
/**所属项目*/
proName: string;
/**共享渠道ID*/
shareId: number;
/**状态 操作：	         移除：点击移除对应周期（新增允许周期时显示）	         启用：点击将对应周期在当前渠道费配置中状态改为启用。	         禁用：点击将对应周期在当前渠道费配置中状态改为禁用。	          状态和操作的关系	          新增允许周期时，周期状态为【新增】，操作按钮为【移除】。	          保存配置待审时，周期状态为【启动】，操作按钮为【禁用】。	          操作禁用周期时，周期状态为【禁用】，操作按钮为【启用】(New-新增、Update-修改、Delete-删除、Stop-禁用、Start-启用、Cancel-作废、Audit-审核、Reject-驳回)*/
shareStateEnum: string;
/**允许共享渠道费周期列表ID*/
shareTermId: number;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**立项周期ID*/
termId: number;
/**立项周期名称*/
termName: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**ShareIdVO*/
export interface ShareIdVO {
/**共享渠道ID*/
shareId: number;
/**立项周期ID*/
termId: number;
}
/**StandChannelVo*/
export interface StandChannelVo {
/**中介分销合同Id*/
agencyContrictId: number;
/**7（1）代理费结算条件-备注*/
agencyCostCondition: string;
/**7（2）代理费结算方式*/
agencyCostSettleWay: string;
/**备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**七、代理费结算方式(ComNoPad-常规不垫佣版、ComPad-常规垫佣版、SpecialDiscount-优惠折扣版)*/
agencySettleCondtion: string;
/**渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**六、客户成交以及确认*/
consumerComplete: string;
/**四、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**四、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同副标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**费用结算类型(DevelopAgenFee-开发商或者委托方代理费、CustomerServFee-客户服务费、DevelopAgenFeeOrCustServFee-开发商或者委托方代理费/客户服务费)*/
costSettleType: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**文件地址*/
fileId: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**甲方联系人*/
partyaMan: string;
/**甲方联系人电话*/
partyaTel: string;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**十、其他约定 补充条款*/
supplementary: string;
/**立项周期ID*/
termId: number;
/**八、违约责任*/
unContractLiability: string;
}
/**中介分销合同相关信息表*/
export interface StandChannelVoUpdateVO {
/**中介分销合同*/
agencyContrictId: number;
/**7（1）代理费结算条件-备注*/
agencyCostCondition: string;
/**7（2）代理费结算方式*/
agencyCostSettleWay: string;
/**备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**七、代理费结算方式(ComNoPad-常规不垫佣版、ComPad-常规垫佣版、SpecialDiscount-优惠折扣版)*/
agencySettleCondtion: string;
/**渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**六、客户成交以及确认*/
consumerComplete: string;
/**四、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**四、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**合同副标题*/
contractSubtitle: string;
/**合同主标题*/
contractTitle: string;
/**费用结算类型(DevelopAgenFee-开发商或者委托方代理费、CustomerServFee-客户服务费、DevelopAgenFeeOrCustServFee-开发商或者委托方代理费/客户服务费)*/
costSettleType: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**文件地址*/
fileId: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**甲方联系人*/
partyaMan: string;
/**甲方联系人电话*/
partyaTel: string;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**十、其他约定 补充条款*/
supplementary: string;
/**立项周期ID*/
termId: number;
/**八、违约责任*/
unContractLiability: string;
}
/**StandKindSaleConfirmVo*/
export interface StandKindSaleConfirmVo {
/**中介分销合同Id*/
agencyContrictId: number;
/**五（1）代理费结算条件-备注*/
agencyCostCondition: string;
/**五（2）代理费结算方式*/
agencyCostSettleWay: string;
/**三、代理费计付标准备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**四、客户成交以及确认*/
consumerComplete: string;
/**二、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**二、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**文件地址*/
fileId: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
}
/**中介分销合同相关信息表*/
export interface StandKindSaleConfirmVoUpdateVO {
/**中介分销合同*/
agencyContrictId: number;
/**五（1）代理费结算条件-备注*/
agencyCostCondition: string;
/**五（2）代理费结算方式*/
agencyCostSettleWay: string;
/**三、代理费计付标准备注*/
agencyFeeRemark: string;
/**房屋未成交乙方退回代理费比例*/
agencyFeeReturnRate: string;
/**房屋未成交乙方退回代理费期限*/
agencyFeeReturnTime: string;
/**渠道类型(BigPlatform-大平台、Big-大型中介/一级平台、Middle-中型中介/二级平台、Small-小型中介、Appoint-指定中介行、Strategic-战略合作方)*/
channelEnum: string;
/**公司种类(ChannelCompany-外部渠道公司、InfieldCompany-内部公司、AgencyCompany-代理公司)*/
companyKind: string;
/**四、客户成交以及确认*/
consumerComplete: string;
/**二、合作结束时间(yyyy-MM-dd)*/
contractEndTime: string;
/**派发套餐明细*/
contractMxVOList: DistributContractMxVO[];
/**二、合作开始时间(yyyy-MM-dd)*/
contractStartTime: string;
/**指定中介行*/
designatedAgency: string;
/**中介行ID*/
designatedAgencyId: number;
/**文件地址*/
fileId: string;
/**是否垫佣(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方公司[我司主体] 甲方合同-乙方*/
partyCompany: string;
/**甲方公司ID [我司主体ID]*/
partyCompanyId: number;
/**甲方地址*/
partyaAddr: string;
/**项目ID*/
proId: number;
/**一、项目名称*/
proName: string;
/**一、项目备案名*/
proRecord: string;
/**立项周期ID*/
termId: number;
}
/**TermAddVO*/
export interface TermAddVO {
/**我司ID*/
companyId: number;
/**(必填)项目ID*/
proId: number;
/**启动事业部ID*/
startDivisionId: number;
/**(必填)周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**(必填)周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**TermAuditVO*/
export interface TermAuditVO {
/**审核意见*/
auditOption: string;
/**(必填)ID*/
termId: number;
}
/**TermBaseByPro*/
export interface TermBaseByPro {
/**呈批文号【OA生成】*/
approvalNo: string;
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**立项ID*/
termId: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**TermByAcrossTermQueryVO*/
export interface TermByAcrossTermQueryVO {
/**市*/
city: string;
/**区*/
district: string;
/**(必填)是否跨周期*/
exOver: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**(必填)项目ID*/
proId: number;
/**项目名*/
proName: string;
/**项目编号*/
proNo: string;
/**省*/
province: string;
/**(必填)周期ID*/
termId: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
}
/**TermCalcVo*/
export interface TermCalcVo {
/**代理费总包-分销平台留存比例*/
agencyFeeTotalByDistrictbuteRate: number;
/**代理费总包-总包平台留存比例*/
agencyFeeTotalByTotalRate: number;
/**属性模式   SeriAll("服务费总包"),AgenAll("代理费总包"),SeriAllAgenAll("服务费总包+代理费总包"),
    ServiDist("纯分销模式-服务费"),AgencyDist("纯分销模式-代理费"),
    AllAndDistricBySeri("服务费总包+服务费分销"),AllADistByAgen("代理费总包+代理费分销"),
    All("服务费总包+代理费总包+服务费分销+代理费分销"),AllAAgenByServAAgenDist("服务费总包+服务费分销+代理费分销"),
    ServiAllAAgenDist("服务费总包+代理费分销")(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
attributeEnum: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**收取佣金标准简述(推送到OA)*/
collectCommissionStandardSketch: string;
/**纯分销模式-代理费留存率*/
distributeAgencyRate: number;
/**纯分销模式-服务费留存率*/
distributeServiceRate: number;
/**是否市场化*/
exMarket: number;
/**是否穿底*/
exOver: number;
/**是否突破标准线*/
exOverStandard: number;
/**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**流程类型(Simple-简化流程、All-全流程)*/
processEnum: string;
/**物业类型*/
properties: string[];
/**派发佣金标准简述(推送到OA)*/
sendCommissionStandardSketch: string;
/**服务费可用余额*/
serviceBalance: number;
/**服务费总包-分销平台留存比例*/
serviceFeeTotalByDistrictbuteRate: number;
/**服务费总包-总包平台留存比例*/
serviceFeeTotalByTotalRate: number;
/**启动事业部*/
startDivision: string;
/**启动事业部ID*/
startDivisionId: number;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**周期名称*/
termName: string;
/**项目留存率*/
termOverallRate: number;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**TermDealVO*/
export interface TermDealVO {
/**属性模式(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
attributeEnum: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**市*/
city: string;
/**区*/
district: string;
/**是否代销*/
exConsignment: number;
/**是否市场化*/
exMarket: number;
/**是否明远源*/
exMinyuan: number;
/**是否允许跨项目使用其他渠道费用*/
exOtherProChannelUse: number;
/**是否穿底*/
exOver: number;
/**是否免收服务费*/
exVoidService: number;
/**一手代理公司*/
firstAgencyCompanys: 一手公司代理[];
/**店组ID*/
groupId: number;
/**店组名称*/
groupName: string;
/**proId*/
proId: number;
/**项目名称*/
proName: string;
/**物业类型*/
propertyEnums: string[];
/**省*/
province: string;
/**特殊业绩方案ID*/
specialId: number;
/**启动事业部ID*/
startDivisionId: number;
/**启动事业部*/
startDivisionName: string;
/**termId*/
termId: number;
/**周期名称*/
termName: string;
/**项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购、Recognize-认筹)*/
termStageEnum: string;
}
/**TermDropDownVo*/
export interface TermDropDownVo {
/**项目所属城市*/
city: string;
/**所属项目*/
proName: string;
/**事业部ID*/
startDivisionId: number;
/**ID*/
termId: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
}
/**TermHisVO*/
export interface TermHisVO {
/**审核时间(yyyy-MM-dd HH:mm:ss)*/
auditTime: string;
/**原立项周期ID*/
originalTermId: number;
/**快照类型(First-首次立项、Supplement-补充协议、Hander-手动修改、Canel-作废)*/
snapshotEnum: string;
/**发起人ID*/
startMan: string;
/**发起人ID*/
startManId: number;
/**周期ID*/
termId: number;
}
/**TermIdDepartmentIdVo*/
export interface TermIdDepartmentIdVo {
/**店组ID*/
groupId: number;
/**事业部ID*/
startDivisionId: number;
/**周期ID*/
termId: number;
}
/**TermInfoMsgVo*/
export interface TermInfoMsgVo {
/**OA合同呈批文号*/
approvalContractOaNo: string;
/**呈批文号*/
approvalNo: string;
/**项目地址*/
proAddr: string;
/**项目ID*/
proId: number;
/**所属项目*/
proName: string;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**ID*/
termId: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**TermItemDto*/
export interface TermItemDto {
/**属性模式(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
attributeEnum: string;
/**业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**我司ID*/
companyId: number;
/**店组ID*/
groupId: number;
/**收款账号ID*/
receiptId: number;
/**启动事业部*/
startDivisionId: number;
}
/**TermItemVO*/
export interface TermItemVO {
/**项目ID*/
proId: number;
/**立项ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**TermLog*/
export interface TermLog {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**处理结果*/
dealRes: string;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**日志ID*/
logId: number;
/**操作节点【审核节点】*/
node: string;
/**undefined*/
oatype: string;
/**操作人*/
operatorId: number;
/**操作人名称*/
operatorMan: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operatorTime: string;
/**系统*/
operatorType: string;
/**备注*/
remark: string;
/**操作岗位*/
station: string;
/**立项周期ID*/
termId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**TermLogVO*/
export interface TermLogVO {
/**创建时间(yyyy-MM-dd HH:mm:ss)*/
createTime: string;
/**创建用户*/
createUser: number;
/**处理结果*/
dealRes: string;
/**已删除*/
deleted: number;
/**id*/
id: number;
/**日志ID*/
logId: number;
/**操作节点【审核节点】*/
node: string;
/**undefined*/
oatype: string;
/**操作人*/
operatorId: number;
/**操作人名称*/
operatorMan: string;
/**操作时间(yyyy-MM-dd HH:mm:ss)*/
operatorTime: string;
/**系统*/
operatorType: string;
/**备注*/
remark: string;
/**操作岗位*/
station: string;
/**立项周期ID*/
termId: number;
/**更新时间(yyyy-MM-dd HH:mm:ss)*/
updateTime: string;
/**更新用户*/
updateUser: number;
}
/**TermOAContractVO*/
export interface TermOAContractVO {
/**代理费总包-分销平台留存比例*/
agencyFeeTotalByDistrictbuteRate: number;
/**代理费总包-总包平台留存比例*/
agencyFeeTotalByTotalRate: number;
/**OA合同呈批文号*/
approvalContractOaNo: string;
/**呈批文号【OA生成】*/
approvalNo: string;
/**附件信息*/
attachTermVOS: AttachTermItemVO[];
/**属性模式   SeriAll("服务费总包"),AgenAll("代理费总包"),SeriAllAgenAll("服务费总包+代理费总包"),
    ServiDist("纯分销模式-服务费"),AgencyDist("纯分销模式-代理费"),
    AllAndDistricBySeri("服务费总包+服务费分销"),AllADistByAgen("代理费总包+代理费分销"),
    All("服务费总包+代理费总包+服务费分销+代理费分销"),AllAAgenByServAAgenDist("服务费总包+服务费分销+代理费分销"),
    ServiAllAAgenDist("服务费总包+代理费分销")(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
attributeEnum: string;
/**审核状态(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务背景*/
busBackground: string;
/**(必填)业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**(必填)业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**(必填)收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**突破标准线期数*/
city: string;
/**城市名称*/
cityName: string;
/**(必填)收取佣金条件简述(推送到OA)*/
collectCommissionConditionSketch: string;
/**(必填)收取佣金标准简述(推送到OA)*/
collectCommissionStandardSketch: string;
/**我司ID*/
companyId: number;
/**我司名称*/
companyName: string;
/**(必填)客户报备要求简述(推送到OA)*/
customerReportingRequire: string;
/**开发商ID*/
developerIds: number;
/**开发商名称*/
developerName: string;
/**纯分销模式-代理费留存率*/
distributeAgencyRate: number;
/**纯总包模式-服务费留存率*/
distributeServiceRate: number;
/**(必填)是否代销*/
exConsignment: number;
/**是否直签开发商*/
exDirectDevelop: number;
/**(必填)认购书是否体现优惠折扣*/
exDiscount: number;
/**是否市场化*/
exMarket: number;
/**是否允许跨项目使用其他渠道费用*/
exOtherProChannelUse: number;
/**是否穿底*/
exOver: number;
/**是否突破标准线*/
exOverStandard: number;
/**是否父项目*/
exParent: number;
/**是否免收服务费,0否 1是*/
exVoidService: number;
/**店组ID*/
groupId: number;
/**(必填)项目房款/车位款加服务费大于备案价(No-否、Yes-是、NotInvolved-不涉及)*/
houseandcarGtRecordEnum: string;
/**OA合同发起人*/
inputConstractMan: string;
/**OA合同发起人*/
inputConstractManId: number;
/**OA合同发起时间(yyyy-MM-dd HH:mm:ss)*/
inputConstractTime: string;
/**OA发起人*/
inputMan: string;
/**OA发起人*/
inputManId: number;
/**OA发起时间(yyyy-MM-dd HH:mm:ss)*/
inputTime: string;
/**甲方-客户成交及其确认*/
jfCustomerConfirm: string;
/**甲方-违约责任*/
jfResponsibiltity: string;
/**优惠告知书折扣体现方式*/
notificDiscountModel: string;
/**立项其它说明*/
otherRemark: string;
/**突破标准线期数*/
overStandardCount: number;
/**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方退款天数*/
partyARefundDays: number;
/**往期业绩金额*/
preBusAmount: number;
/**往期可用其它渠道费用金额*/
preRetainedAmount: number;
/**项目地址*/
proAddr: string;
/**项目委托方*/
proClient: string;
/**(必填)联动项目ID*/
proId: number;
/**合作项目名称*/
proName: string;
/**项目备案名*/
proRecord: string;
/**渠道-客户成交及其确认*/
qdCustomerConfirm: string;
/**渠道-补充条款*/
qdOtherRemark: string;
/**渠道-违约责任*/
qdResponsibiltity: string;
/**收款ID*/
receiptId: number;
/**(必填)派发佣金条件简述(推送到OA)*/
sendCommissionConditionSketch: string;
/**(必填)派发佣金标准简述(推送到OA)*/
sendCommissionStandardSketch: string;
/**服务费可用余额*/
serviceBalance: number;
/**服务费总包-分销平台留存比例*/
serviceFeeTotalByDistrictbuteRate: number;
/**服务费总包-总包平台留存比例*/
serviceFeeTotalByTotalRate: number;
/**启动事业部*/
startDivision: string;
/**启动事业部ID*/
startDivisionId: number;
/**认购书优惠折扣体现方式*/
subscriDiscountModel: string;
/**(必填)周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**(必填)周期ID*/
termId: number;
/**(必填)周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
/**项目综合留存率*/
termOverallRate: number;
/**(必填)项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购、Recognize-认筹)*/
termStageEnum: string;
/**(必填)周期起始时间(yyyy-MM-dd)*/
termStart: string;
/**联动业务总开展期数*/
totalCount: number;
}
/**TermQueryVO*/
export interface TermQueryVO {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**市*/
city: string;
/**区*/
district: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目Id*/
proId: number;
/**项目推广名*/
proName: string;
/**项目编号*/
proNo: string;
/**省*/
province: string;
/**周期状态(Stop-禁用、Start-启用)*/
state: string;
/**立项ID*/
termId: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
}
/**TermRespVO*/
export interface TermRespVO {
/**代理费总包-分销平台留存比例*/
agencyFeeTotalByDistrictbuteRate: number;
/**代理费总包-总包平台留存比例*/
agencyFeeTotalByTotalRate: number;
/**OA合同呈批文号*/
approvalContractOaNo: string;
/**呈批文号【OA生成】*/
approvalNo: string;
/**附件信息*/
attachTermVOS: AttachTermItemVO[];
/**属性模式   SeriAll("服务费总包"),AgenAll("代理费总包"),SeriAllAgenAll("服务费总包+代理费总包"),
    ServiDist("纯分销模式-服务费"),AgencyDist("纯分销模式-代理费"),
    AllAndDistricBySeri("服务费总包+服务费分销"),AllADistByAgen("代理费总包+代理费分销"),
    All("服务费总包+代理费总包+服务费分销+代理费分销"),AllAAgenByServAAgenDist("服务费总包+服务费分销+代理费分销"),
    ServiAllAAgenDist("服务费总包+代理费分销")(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
attributeEnum: string;
/**审核状态(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务背景*/
busBackground: string;
/**(必填)业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**(必填)业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**(必填)收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**突破标准线期数*/
city: string;
/**城市名称*/
cityName: string;
/**(必填)收取佣金条件简述(推送到OA)*/
collectCommissionConditionSketch: string;
/**(必填)收取佣金标准简述(推送到OA)*/
collectCommissionStandardSketch: string;
/**我司ID*/
companyId: number;
/**我司名称*/
companyName: string;
/**(必填)客户报备要求简述(推送到OA)*/
customerReportingRequire: string;
/**开发商ID*/
developerIds: number;
/**开发商名称*/
developerName: string;
/**纯分销模式-代理费留存率*/
distributeAgencyRate: number;
/**纯总包模式-服务费留存率*/
distributeServiceRate: number;
/**(必填)是否代销*/
exConsignment: number;
/**是否直签开发商*/
exDirectDevelop: number;
/**(必填)认购书是否体现优惠折扣*/
exDiscount: number;
/**是否市场化*/
exMarket: number;
/**是否允许跨项目使用其他渠道费用*/
exOtherProChannelUse: number;
/**是否穿底*/
exOver: number;
/**是否突破标准线*/
exOverStandard: number;
/**是否父项目*/
exParent: number;
/**是否免收服务费,0否 1是*/
exVoidService: number;
/**店组ID*/
groupId: number;
/**(必填)项目房款/车位款加服务费大于备案价(No-否、Yes-是、NotInvolved-不涉及)*/
houseandcarGtRecordEnum: string;
/**OA合同发起人*/
inputConstractMan: string;
/**OA合同发起人*/
inputConstractManId: number;
/**OA合同发起时间(yyyy-MM-dd HH:mm:ss)*/
inputConstractTime: string;
/**OA发起人*/
inputMan: string;
/**OA发起人*/
inputManId: number;
/**OA发起时间(yyyy-MM-dd HH:mm:ss)*/
inputTime: string;
/**优惠告知书折扣体现方式*/
notificDiscountModel: string;
/**立项其它说明*/
otherRemark: string;
/**突破标准线期数*/
overStandardCount: number;
/**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**甲方退款天数*/
partyARefundDays: number;
/**往期业绩金额*/
preBusAmount: number;
/**往期可用其它渠道费用金额*/
preRetainedAmount: number;
/**项目地址*/
proAddr: string;
/**项目委托方*/
proClient: string;
/**(必填)联动项目ID*/
proId: number;
/**合作项目名称*/
proName: string;
/**项目备案名*/
proRecord: string;
/**收款ID*/
receiptId: number;
/**(必填)派发佣金条件简述(推送到OA)*/
sendCommissionConditionSketch: string;
/**(必填)派发佣金标准简述(推送到OA)*/
sendCommissionStandardSketch: string;
/**服务费可用余额*/
serviceBalance: number;
/**服务费总包-分销平台留存比例*/
serviceFeeTotalByDistrictbuteRate: number;
/**服务费总包-总包平台留存比例*/
serviceFeeTotalByTotalRate: number;
/**启动事业部*/
startDivision: string;
/**启动事业部ID*/
startDivisionId: number;
/**认购书优惠折扣体现方式*/
subscriDiscountModel: string;
/**(必填)周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**(必填)周期ID*/
termId: number;
/**(必填)周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
/**项目综合留存率*/
termOverallRate: number;
/**(必填)项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购、Recognize-认筹)*/
termStageEnum: string;
/**(必填)周期起始时间(yyyy-MM-dd)*/
termStart: string;
/**联动业务总开展期数*/
totalCount: number;
}
/**TermSpecialVO*/
export interface TermSpecialVO {
/**ID*/
termId: number;
/**周期名称*/
termName: string;
}
/**TermUpdateVO*/
export interface TermUpdateVO {
/**附件信息*/
attachTermVOS: AttachTermItemVO[];
/**属性模式   SeriAll("服务费总包"),AgenAll("代理费总包"),SeriAllAgenAll("服务费总包+代理费总包"),
    ServiDist("纯分销模式-服务费"),AgencyDist("纯分销模式-代理费"),
    AllAndDistricBySeri("服务费总包+服务费分销"),AllADistByAgen("代理费总包+代理费分销"),
    All("服务费总包+代理费总包+服务费分销+代理费分销"),AllAAgenByServAAgenDist("服务费总包+服务费分销+代理费分销"),
    ServiAllAAgenDist("服务费总包+代理费分销")(SeriAll-服务费纯总包模式、AgenAll-代理费纯总包模式、SeriAllAgenAll-服务费纯总包+代理费纯总包模式、ServiDist-服务费纯分销模式、AgencyDist-代理费纯分销模式、AllAndDistBySeri-服务费总包+服务费分销模式、AllAndDistByAgen-代理费总包+代理费分销模式、All-服务费总包+代理费总包+服务费分销+代理费分销模式、ServiAllAServDistAAgenDist-服务费总包+服务费分销+代理费分销模式、ServiAllAAgenDist-服务费总包+代理费分销模式)*/
attributeEnum: string;
/**业务背景*/
busBackground: string;
/**(必填)业务模式(TotalBagModel-纯总包模式、DistriModel-纯分销模式、TotalBagDistrModel-总包+分销下的分销模式)*/
busEnum: string;
/**(必填)业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**(必填)收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
chargeEnum: string;
/**(必填)收取佣金条件简述(推送到OA)*/
collectCommissionConditionSketch: string;
/**(必填)收取佣金标准简述(推送到OA)*/
collectCommissionStandardSketch: string;
/**(必填)客户报备要求简述(推送到OA)*/
customerReportingRequire: string;
/**(必填)是否代销*/
exConsignment: number;
/**是否直签开发商*/
exDirectDevelop: number;
/**(必填)认购书是否体现优惠折扣*/
exDiscount: number;
/**(必填)项目房款/车位款加服务费大于备案价(No-否、Yes-是、NotInvolved-不涉及)*/
houseandcarGtRecordEnum: string;
/**优惠告知书折扣体现方式*/
notificDiscountModel: string;
/**立项其它说明*/
otherRemark: string;
/**突破标准线期数*/
overStandardCount: number;
/**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
padCommissionEnum: string;
/**往期业绩金额*/
preBusAmount: number;
/**(必填)联动项目ID*/
proId: number;
/**(必填)派发佣金条件简述(推送到OA)*/
sendCommissionConditionSketch: string;
/**(必填)派发佣金标准简述(推送到OA)*/
sendCommissionStandardSketch: string;
/**启动事业部*/
startDivision: string;
/**认购书优惠折扣体现方式*/
subscriDiscountModel: string;
/**(必填)周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**(必填)周期ID*/
termId: number;
/**(必填)周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
/**(必填)项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购、Recognize-认筹)*/
termStageEnum: string;
/**(必填)周期起始时间(yyyy-MM-dd)*/
termStart: string;
/**联动业务总开展期数*/
totalCount: number;
}
/**TermVO*/
export interface TermVO {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
busTypeEnum: string;
/**市*/
city: string;
/**我司ID*/
companyId: number;
/**区*/
district: string;
/**成交店组ID*/
groupId: number;
/**项目ID*/
proId: number;
/**(必填)项目名*/
proName: string;
/**项目编号*/
proNo: string;
/**省*/
province: string;
/**启动事业部ID*/
startDivisionId: number;
/**周期状态(Stop-禁用、Start-启用)*/
state: string;
/**周期结束时间(yyyy-MM-dd)*/
termEnd: string;
/**立项ID*/
termId: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**TermYdQueryVO*/
export interface TermYdQueryVO {
/**审核状态*/
auditEnums: string[];
/**排除收费模式(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)*/
excludeChargeEnum: string;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**周期名称 合作项目名称(项目推广名)+周期时间*/
termName: string;
}
/**TermYdVO*/
export interface TermYdVO {
/**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、TermConduct-立项审核中、TermAdopt-立项审核通过、TermReject-立项审核驳回、ConstractWait-合同待审核、ConstractConduct-合同审核中、ConstractAdopt-合同审核通过、ConstractReject-合同审核驳回)*/
auditEnum: string;
/**甲方退款天数*/
partyARefundDays: number;
/**项目ID*/
proId: number;
/**项目名称*/
proName: string;
/**立项ID*/
termId: number;
/**周期名称*/
termName: string;
/**项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购、Recognize-认筹)*/
termStageEnum: string;
}
/**TestVO*/
export interface TestVO {
/**周期起始时间(yyyy-MM-dd)*/
termStart: string;
}
/**TreeBulidingRoom*/
export interface TreeBulidingRoom {
/**子目录*/
children: RoomTree[];
/**名称*/
label: string;
/**值*/
value: number;
}
/**UpdateInputUserVO*/
export interface UpdateInputUserVO {
/**开发商ID*/
companyId: number[];
/**(必填)新录入人*/
inputUser: number;
}
/**YDProjectVo*/
export interface YDProjectVo {
/**城市编号*/
cityCode: string;
/**区*/
district: string;
/**纬度*/
lat: number;
/**经度*/
lng: number;
/**最大价格（万元）*/
maxPrice: number;
/**最小价格（万元）*/
minPrice: number;
/**(必填)当前页*/
pageNum: number;
/**(必填)每页条数*/
pageSize: number;
/**项目ID*/
proId: number;
/**楼盘名称*/
proName: string;
/**楼盘排序(AverageAsc-均价从底到高、AverageDesc-均价从高到低、DistanceDesc-距离从近到远、DistanceAsc-距离从远到近)*/
proSortEnum: string;
/**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Warehouse-仓库、LinkIndustryUseType-工业、Other-其他)*/
propertyEnum: string;
/**装修级别(Rough-毛坯、Simple-简装修、HardBound-精装修)*/
renovatLevelEnum: string;
/**户型*/
roomTypeEnums: string[];
}
/**一手公司代理*/
export interface 一手公司代理 {
/**市*/
city: string;
/**市*/
cityName: string;
/**行政区*/
county: string;
/**区*/
countyName: string;
/**公司ID*/
id: number;
/**公司名称*/
name: string;
/**项目一手公司代理ID*/
proAgencyId: number;
/**省*/
province: string;
/**省*/
provinceName: string;
/**简称*/
shortName: string;
}
