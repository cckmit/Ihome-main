/* eslint-disable */
/* 此脚本由swagger-ui的api-docs自动生成，请勿修改 */
//2020-11-27 6:18:56 ├F10: PM┤
import { request } from '@/api/base'
const basePath = "/sales-api/project"
/**index*/
export async function get_(d?: any) {
    return await request.get<any, any>(basePath + '/', { params: d })
}
/**栋座新增*/
export async function post_building_add(d?: any) {
    return await request.post<BuildingUpdateVO, BuildingUpdateVO>(basePath + '/building/add', d)
}
/**获取项目的栋座详情*/
export async function get_building_get__buildingId(d?: any) {
    return await request.get<BuildingUpdateVO, BuildingUpdateVO>(basePath + '/building/get/{buildingId}', { params: d })
}
/**获取项目的栋座列表*/
export async function post_building_getList(d?: any) {
    return await request.post<PageModel<BuildingListVO>, PageModel<BuildingListVO>>(basePath + '/building/getList', d)
}
/**获取项目的栋座物业【下拉】*/
export async function get_building_getPropertyDropDowm__proId(d?: any) {
    return await request.get<PropertyVO[], PropertyVO[]>(basePath + '/building/getPropertyDropDowm/{proId}', { params: d })
}
/**栋座更新*/
export async function post_building_update(d?: any) {
    return await request.post<number, number>(basePath + '/building/update', d)
}
/**获取测算信息*/
export async function get_calc_get__termId(d?: any) {
    return await request.get<CalcVo, CalcVo>(basePath + '/calc/get/{termId}', { params: d })
}
/**获取测算内页信息*/
export async function get_calc_getCalc__termId(d?: any) {
    return await request.get<CalcMxVo, CalcMxVo>(basePath + '/calc/getCalc/{termId}', { params: d })
}
/**派发套餐-新增*/
export async function post_collectandsend_add(d?: any) {
    return await request.post<CollectandsendUpdateVO, CollectandsendUpdateVO>(basePath + '/collectandsend/add', d)
}
/**作废派发套餐*/
export async function post_collectandsend_cancel(d?: any) {
    return await request.post<string, string>(basePath + '/collectandsend/cancel', d)
}
/**获取派发套餐详情*/
export async function get_collectandsend_get__packageId(d?: any) {
    return await request.get<CollectandsendDetailVO, CollectandsendDetailVO>(basePath + '/collectandsend/get/{packageId}', { params: d })
}
/**获取派发套餐列表*/
export async function post_collectandsend_getAllByTerm(d?: any) {
    return await request.post<CollectandsendVO[], CollectandsendVO[]>(basePath + '/collectandsend/getAllByTerm', d)
}
/**派发套餐-获取周期部分信息*/
export async function get_collectandsend_getBaseTermByTermId__termId(d?: any) {
    return await request.get<CollectPackageVo, CollectPackageVo>(basePath + '/collectandsend/getBaseTermByTermId/{termId}', { params: d })
}
/**启用派发套餐*/
export async function post_collectandsend_start(d?: any) {
    return await request.post<string, string>(basePath + '/collectandsend/start', d)
}
/**禁用派发套餐*/
export async function post_collectandsend_stop(d?: any) {
    return await request.post<string, string>(basePath + '/collectandsend/stop', d)
}
/**派发套餐-修改*/
export async function post_collectandsend_update(d?: any) {
    return await request.post<CollectandsendUpdateVO, CollectandsendUpdateVO>(basePath + '/collectandsend/update', d)
}
/**查询立项报备规则*/
export async function get_customerReportRule_get__termId(d?: any) {
    return await request.get<CustomerReportRuleVO, CustomerReportRuleVO>(basePath + '/customerReportRule/get/{termId}', { params: d })
}
/**立项报备规则-新增or修改*/
export async function post_customerReportRule_save(d?: any) {
    return await request.post<CustomerReportRuleVO, CustomerReportRuleVO>(basePath + '/customerReportRule/save', d)
}
/**中介分销合同-删除*/
export async function post_distributContract_del(d?: any) {
    return await request.post<string, string>(basePath + '/distributContract/del', d)
}
/**查询页面全部内容*/
export async function get_distributContract_get__termId(d?: any) {
    return await request.get<DistributContractMO, DistributContractMO>(basePath + '/distributContract/get/{termId}', { params: d })
}
/**根据立项查询分销合同信息*/
export async function get_distributContract_getByTerm__termId(d?: any) {
    return await request.get<DistributContractByTermVO[], DistributContractByTermVO[]>(basePath + '/distributContract/getByTerm/{termId}', { params: d })
}
/**中介分销合同根据条件获取收派套餐*/
export async function post_distributContract_getCollectByCondition(d?: any) {
    return await request.post<DistributContractMxVO[], DistributContractMxVO[]>(basePath + '/distributContract/getCollectByCondition', d)
}
/**中介分销合同-查看详情*/
export async function get_distributContract_getDistri__agencyContrictId(d?: any) {
    return await request.get<DistributContractVO, DistributContractVO>(basePath + '/distributContract/getDistri/{agencyContrictId}', { params: d })
}
/**中介分销合同-新增or修改*/
export async function post_distributContract_save(d?: any) {
    return await request.post<DistributContractVO, DistributContractVO>(basePath + '/distributContract/save', d)
}
/**distribute*/
export async function get_distribute(d?: any) {
    return await request.get<any, any>(basePath + '/distribute', { params: d })
}
/**新增代理公司*/
export async function post_firstAgencyCompany_add(d?: any) {
    return await request.post<FirstAgencyCompanyAddArgs, FirstAgencyCompanyAddArgs>(basePath + '/firstAgencyCompany/add', d)
}
/**提交*/
export async function post_firstAgencyCompany_commit__agencyId(d?: any) {
    return await request.post<number, number>(basePath + '/firstAgencyCompany/commit/{agencyId}', d)
}
/**查询详情*/
export async function get_firstAgencyCompany_get__agencyId(d?: any) {
    return await request.get<FirstAgencyCompanyDetail, FirstAgencyCompanyDetail>(basePath + '/firstAgencyCompany/get/{agencyId}', { params: d })
}
/**查询列表*/
export async function post_firstAgencyCompany_getList(d?: any) {
    return await request.post<PageModel<FirstAgencyListVO>, PageModel<FirstAgencyListVO>>(basePath + '/firstAgencyCompany/getList', d)
}
/**新增or修改*/
export async function post_firstAgencyCompany_save(d?: any) {
    return await request.post<FirstAgencyCompanyAddArgs, FirstAgencyCompanyAddArgs>(basePath + '/firstAgencyCompany/save', d)
}
/**修改代理公司*/
export async function post_firstAgencyCompany_update(d?: any) {
    return await request.post<FirstAgencyCompanyAddArgs, FirstAgencyCompanyAddArgs>(basePath + '/firstAgencyCompany/update', d)
}
/**楼盘项目的户型-新增*/
export async function post_houseType_add(d?: any) {
    return await request.post<HouseTypeUpdateArgs, HouseTypeUpdateArgs>(basePath + '/houseType/add', d)
}
/**删除楼盘项目的户型*/
export async function post_houseType_delete__houseTypeId(d?: any) {
    return await request.post<number, number>(basePath + '/houseType/delete/{houseTypeId}', d)
}
/**通过栋座物业ID的获取楼盘户型(下拉)*/
export async function get_houseType_getItemsByProperty__proId(d?: any) {
    return await request.get<HouseTypeItemsByBuildingVO[], HouseTypeItemsByBuildingVO[]>(basePath + '/houseType/getItemsByProperty/{proId}', { params: d })
}
/**查询项目的楼盘户型*/
export async function get_houseType_getTabItem__proId(d?: any) {
    return await request.get<HouseTypeVO[], HouseTypeVO[]>(basePath + '/houseType/getTabItem/{proId}', { params: d })
}
/**户型详情*/
export async function get_houseType_houseDetail__houseId(d?: any) {
    return await request.get<HouseTypeDetailVo, HouseTypeDetailVo>(basePath + '/houseType/houseDetail/{houseId}', { params: d })
}
/**修改楼盘项目的户型*/
export async function post_houseType_update(d?: any) {
    return await request.post<number, number>(basePath + '/houseType/update', d)
}
/**查询其他配置信息*/
export async function get_logAndOA_get__termId(d?: any) {
    return await request.get<LogAndOAVo, LogAndOAVo>(basePath + '/logAndOA/get/{termId}', { params: d })
}
/**成交归属组织信息-新增*/
export async function post_org_add(d?: any) {
    return await request.post<number, number>(basePath + '/org/add', d)
}
/**删除成交归属组织信息*/
export async function post_org_del(d?: any) {
    return await request.post<number, number>(basePath + '/org/del', d)
}
/**成交归属组织信息-新增*/
export async function post_org_update(d?: any) {
    return await request.post<number, number>(basePath + '/org/update', d)
}
/**查询其他配置信息*/
export async function get_other_get__termId(d?: any) {
    return await request.get<OtherVo, OtherVo>(basePath + '/other/get/{termId}', { params: d })
}
/**更新其他渠道费配置*/
export async function post_other_updateChanelSet(d?: any) {
    return await request.post<string, string>(basePath + '/other/updateChanelSet', d)
}
/**甲方合同查询*/
export async function get_partyAContract_get__termId(d?: any) {
    return await request.get<PartyAContractPageVO, PartyAContractPageVO>(basePath + '/partyAContract/get/{termId}', { params: d })
}
/**甲方合同/栋座信息-新增or修改*/
export async function post_partyAContract_save(d?: any) {
    return await request.post<PartyAContractPageVO, PartyAContractPageVO>(basePath + '/partyAContract/save', d)
}
/**立项收款公司信息-新增*/
export async function post_payment_add(d?: any) {
    return await request.post<number, number>(basePath + '/payment/add', d)
}
/**成交外收支信息-删除*/
export async function post_payment_del(d?: any) {
    return await request.post<number, number>(basePath + '/payment/del', d)
}
/**成交外收支信息-修改*/
export async function post_payment_update(d?: any) {
    return await request.post<number, number>(basePath + '/payment/update', d)
}
/**案场录入-优惠告知书列表*/
export async function get_preferential_getListByTermId__termId(d?: any) {
    return await request.get<PreferentialMxVO[], PreferentialMxVO[]>(basePath + '/preferential/getListByTermId/{termId}', { params: d })
}
/**优惠告知数-下载二维码*/
export async function get_preferential_getQRCodeImage__preferentialMxId(d?: any) {
    return await request.get<any, any>(basePath + '/preferential/getQRCodeImage/{preferentialMxId}', { params: d })
}
/**优惠告知书-新增or修改*/
export async function post_preferential_save(d?: any) {
    return await request.post<PreferentialVo, PreferentialVo>(basePath + '/preferential/save', d)
}
/**新增联动项目*/
export async function post_project_add(d?: any) {
    return await request.post<ProjectUpdateArgs, ProjectUpdateArgs>(basePath + '/project/add', d)
}
/**新增父项目*/
export async function post_project_addParent(d?: any) {
    return await request.post<ParentProjectUpdateArgs, ParentProjectUpdateArgs>(basePath + '/project/addParent', d)
}
/**联动项目-审核*/
export async function post_project_audit(d?: any) {
    return await request.post<number, number>(basePath + '/project/audit', d)
}
/**定时创建明源项目*/
export async function post_project_createProject(d?: any) {
    return await request.post<number, number>(basePath + '/project/createProject', d)
}
/**联动项目-删除*/
export async function post_project_del__proId(d?: any) {
    return await request.post<number, number>(basePath + '/project/del/{proId}', d)
}
/**获取联动项目-基础信息*/
export async function get_project_get__proId(d?: any) {
    return await request.get<ProjectUpdateArgs, ProjectUpdateArgs>(basePath + '/project/get/{proId}', { params: d })
}
/**查询项目列表*/
export async function post_project_getList(d?: any) {
    return await request.post<PageModel<ProjectQueryVO>, PageModel<ProjectQueryVO>>(basePath + '/project/getList', d)
}
/**获取多个项目基本信息*/
export async function post_project_getListByIds(d?: any) {
    return await request.post<ProjectListVO[], ProjectListVO[]>(basePath + '/project/getListByIds', d)
}
/**查询项目列表-客户报备*/
export async function post_project_getListForCustomer(d?: any) {
    return await request.post<PageModel<ProjectListVO>, PageModel<ProjectListVO>>(basePath + '/project/getListForCustomer', d)
}
/**获取联动项目-父项目基础信息*/
export async function get_project_getParent__proId(d?: any) {
    return await request.get<ParentProjectUpdateArgs, ParentProjectUpdateArgs>(basePath + '/project/getParent/{proId}', { params: d })
}
/**项目项目-客户报备*/
export async function get_project_getProDetail__proId(d?: any) {
    return await request.get<ProjectDetailVO, ProjectDetailVO>(basePath + '/project/getProDetail/{proId}', { params: d })
}
/**查询推荐的项目列表*/
export async function post_project_getRecommendProjectList(d?: any) {
    return await request.post<ProjectListVO[], ProjectListVO[]>(basePath + '/project/getRecommendProjectList', d)
}
/**联动项目-驳回*/
export async function post_project_reject(d?: any) {
    return await request.post<number, number>(basePath + '/project/reject', d)
}
/**修改联动项目*/
export async function post_project_update(d?: any) {
    return await request.post<ProjectUpdateArgs, ProjectUpdateArgs>(basePath + '/project/update', d)
}
/**修改父项目*/
export async function post_project_updateParent(d?: any) {
    return await request.post<number, number>(basePath + '/project/updateParent', d)
}
/**推广信息查询*/
export async function get_promotion_get__proId(d?: any) {
    return await request.get<PromotionVO, PromotionVO>(basePath + '/promotion/get/{proId}', { params: d })
}
/**推广信息添加or修改*/
export async function post_promotion_save(d?: any) {
    return await request.post<PromotionVO, PromotionVO>(basePath + '/promotion/save', d)
}
/**新增立项收款公司信息*/
export async function post_receipt_add(d?: any) {
    return await request.post<number, number>(basePath + '/receipt/add', d)
}
/**删除立项收款公司信息*/
export async function post_receipt_del(d?: any) {
    return await request.post<number, number>(basePath + '/receipt/del', d)
}
/**添加项目房间号*/
export async function post_room_add(d?: any) {
    return await request.post<string, string>(basePath + '/room/add', d)
}
/**移除项目房间号*/
export async function post_room_del__id(d?: any) {
    return await request.post<number, number>(basePath + '/room/del/{id}', d)
}
/**获取建筑楼盘模板*/
export async function get_room_getExcelTemplate(d?: any) {
    return await request.get<any, any>(basePath + '/room/getExcelTemplate', { params: d })
}
/**查询项目房间列表*/
export async function post_room_getList(d?: any) {
    return await request.post<PageModel<RoomVO>, PageModel<RoomVO>>(basePath + '/room/getList', d)
}
/**上传excel*/
export async function post_room_importExcel(d?: any) {
    return await request.post<number, number>(basePath + '/room/importExcel', d)
}
/**项目房间号修改*/
export async function post_room_update(d?: any) {
    return await request.post<number, number>(basePath + '/room/update', d)
}
/**结算列表-新增*/
export async function post_settleCondition_add(d?: any) {
    return await request.post<SettleConditionVO, SettleConditionVO>(basePath + '/settleCondition/add', d)
}
/**结算列表-作废*/
export async function post_settleCondition_cancel(d?: any) {
    return await request.post<number, number>(basePath + '/settleCondition/cancel', d)
}
/**结算详情查询*/
export async function get_settleCondition_get__termId(d?: any) {
    return await request.get<SettleConditionAddVO, SettleConditionAddVO>(basePath + '/settleCondition/get/{termId}', { params: d })
}
/**结算列表查询*/
export async function post_settleCondition_getAll(d?: any) {
    return await request.post<SettleConditionVO[], SettleConditionVO[]>(basePath + '/settleCondition/getAll', d)
}
/**结算列表-修改*/
export async function post_settleCondition_update(d?: any) {
    return await request.post<SettleConditionVO, SettleConditionVO>(basePath + '/settleCondition/update', d)
}
/**其他渠道列表-新增*/
export async function post_shareChannelFee_add(d?: any) {
    return await request.post<ShareChannelFeeVO, ShareChannelFeeVO>(basePath + '/shareChannelFee/add', d)
}
/**其他渠道列表-移除*/
export async function post_shareChannelFee_cancel(d?: any) {
    return await request.post<string, string>(basePath + '/shareChannelFee/cancel', d)
}
/**其他渠道列表-启用*/
export async function post_shareChannelFee_start(d?: any) {
    return await request.post<string, string>(basePath + '/shareChannelFee/start', d)
}
/**其他渠道列表-禁用*/
export async function post_shareChannelFee_stop(d?: any) {
    return await request.post<string, string>(basePath + '/shareChannelFee/stop', d)
}
/**项目周期新增*/
export async function post_term_add(d?: any) {
    return await request.post<TermUpdateVO, TermUpdateVO>(basePath + '/term/add', d)
}
/**项目周期-审核*/
export async function post_term_audit(d?: any) {
    return await request.post<number, number>(basePath + '/term/audit', d)
}
/**项目周期-删除*/
export async function post_term_del(d?: any) {
    return await request.post<any, any>(basePath + '/term/del', d)
}
/**获取立项详情*/
export async function get_term_get__termId(d?: any) {
    return await request.get<TermDetailsVO, TermDetailsVO>(basePath + '/term/get/{termId}', { params: d })
}
/**优惠合同相关-根据周期ID获取相关信息*/
export async function get_term_getDistrictbuteProAndTerm__termId(d?: any) {
    return await request.get<DistributeProTermVO, DistributeProTermVO>(basePath + '/term/getDistrictbuteProAndTerm/{termId}', { params: d })
}
/**获取周期下拉列表-合同模块*/
export async function post_term_getDropDown(d?: any) {
    return await request.post<TermDropDownVo[], TermDropDownVo[]>(basePath + '/term/getDropDown', d)
}
/**查询周期列表*/
export async function post_term_getList(d?: any) {
    return await request.post<PageModel<TermVO>, PageModel<TermVO>>(basePath + '/term/getList', d)
}
/**基本信息-获取项目相关信息*/
export async function get_term_getProInfo__proId(d?: any) {
    return await request.get<ProTermVO, ProTermVO>(basePath + '/term/getProInfo/{proId}', { params: d })
}
/**项目周期-驳回*/
export async function post_term_reject(d?: any) {
    return await request.post<number, number>(basePath + '/term/reject', d)
}
/**项目周期修改*/
export async function post_term_update(d?: any) {
    return await request.post<number, number>(basePath + '/term/update', d)
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
/**AttachAgencyItemVO*/
export interface AttachAgencyItemVO {
    /**(必填)文件地址*/
    attachAddr: string;
    /**(必填)文件名称*/
    attachName: string;
    /**(必填)文件类型     BusLicence("营业执照"),OpenAccount("开业许可证"),IdCardByLegal("法人身份证"),SigningConfirmation("签约授权确认函"),
        PowerByLegal("法人授权书"),IdCardByConsignee("被委托人身份证复印件"),QueryResultBYSEO("综合查询被执行人查询结果"),OtherFile("其他附件");(BusLicence-营业执照、OpenAccount-开业许可证、IdCardByLegal-法人身份证、SigningConfirmation-签约授权确认函、PowerByLegal-法人授权书、IdCardByConsignee-被委托人身份证复印件、QueryResultBYSEO-综合查询被执行人查询结果、OtherFile-其他附件)*/
    firstAgencyAttachEnum: string;
}
/**AttachItemVO*/
export interface AttachItemVO {
    /**(必填)图片地址*/
    attachAddr: string;
    /**附件ID*/
    attachId: number;
    /**(必填)图片名称*/
    attachName: string;
    /**是否首页*/
    exIndex: number;
    /**(必填)文件类型(ProPic-楼盘图片、StateLandFile-国有土地使用证、ConstructLandFile-建设用地规划许可证、ConstructProFile-建设工程规划许可证、BuildConstructProFile-建设工程施工许可证、CommercialHousingFile-商品房预售许可证、RealEstateFile-房地产开发企业资质证书、OtherFile-其他附件)*/
    proAttachEnum: string;
}
/**AttachTermItemVO*/
export interface AttachTermItemVO {
    /**文件地址*/
    attachAddr: string;
    /**附件ID*/
    attachId: number;
    /**(必填)文件名称*/
    attachName: string;
}
/**BuildingAddVO*/
export interface BuildingAddVO {
    /**(必填)栋座名称*/
    buildingName: string;
    /**楼层数*/
    floor: number;
    /**(必填)楼盘项目ID*/
    proId: number;
    /**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**(必填)物业类型ID*/
    propertyId: number;
    /**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、QinShui-清水、Simple-简装修、HardBound-精装修、Luxury-豪华装修)*/
    renovatLevelEnum: string;
    /**地下层数*/
    undergroundNum: number;
}
/**BuildingDto*/
export interface BuildingDto {
    /**栋座名称*/
    buildingName: string;
    /**楼层数*/
    floor: number;
    /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、QinShui-清水、Simple-简装修、HardBound-精装修、Luxury-豪华装修)*/
    renovatLevelEnum: string;
    /**明源栋座ID*/
    subBuildingGuid: string;
    /**地下层数*/
    undergroundNum: number;
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
    /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**物业类型ID*/
    propertyId: number;
    /**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、QinShui-清水、Simple-简装修、HardBound-精装修、Luxury-豪华装修)*/
    renovatLevelEnum: string;
    /**地下层数*/
    undergroundNum: number;
}
/**BuildingQueryVO*/
export interface BuildingQueryVO {
    /**楼盘编号*/
    buildingName: string;
    /**(必填)当前页*/
    pageNum: number;
    /**(必填)每页条数*/
    pageSize: number;
    /**楼盘项目ID*/
    proId: number;
    /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
}
/**BuildingUpdateVO*/
export interface BuildingUpdateVO {
    /**(必填)id*/
    buildingId: number;
    /**(必填)栋座名称*/
    buildingName: string;
    /**楼层数*/
    floor: number;
    /**(必填)楼盘项目ID*/
    proId: number;
    /**(必填)物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**(必填)物业类型ID*/
    propertyId: number;
    /**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、QinShui-清水、Simple-简装修、HardBound-精装修、Luxury-豪华装修)*/
    renovatLevelEnum: string;
    /**地下层数*/
    undergroundNum: number;
}
/**CalcAgencyCostVO*/
export interface CalcAgencyCostVO {
    /**业务员提成计算依据1*/
    calcBasicSaleman: number;
    /**成本ID*/
    costAgencyId: number;
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**成交公司*/
    dealCompany: string;
    /**成交公司ID*/
    dealCompanyId: number;
    /**成交套数*/
    dealNum: number;
    /**已删除*/
    deleted: number;
    /**其他渠道费用金额*/
    otherChannelAmount: number;
    /**垫佣预计渠道费用*/
    padCommission: number;
    /**垫佣类型*/
    padType: string;
    /**备注*/
    remark: string;
    /**派发金额*/
    sendAmount: number;
    /**派发内场金额*/
    sendInAmount: number;
    /**立项周期ID*/
    termId: number;
    /**客户类型(成交方式) NationalMarket("全民营销"),Natural("自然到访"),Self("自行成交"),SelfChannel("自渠"),Big("一级大行"),Middle("二级中行"),Small("三级小行"),Appoint("指定中介行");(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、Big-一级大行、Middle-二级中行、Small-三级小行、Appoint-指定中介行)*/
    transactionEnum: string;
    /**不垫佣预计渠道费用*/
    unpadCommission: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**CalcBusVO*/
export interface CalcBusVO {
    /**业务模式*/
    busId: number;
    /**费用类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
    costTypeEnum: string;
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**已删除*/
    deleted: number;
    /**预计费用*/
    estimatedCost: number;
    /**套数*/
    numSets: number;
    /**立项周期ID*/
    termId: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**CalcManageVO*/
export interface CalcManageVO {
    /**金额*/
    amount: number;
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**已删除*/
    deleted: number;
    /**经营ID*/
    manageId: number;
    /**undefined*/
    ourCompanyRate: number;
    /**备注说明*/
    remark: string;
    /**科目(TotalBus-总业绩、NoTaxIncom-不含税收入、VatPayable-应纳增值税、Surtax-应缴附加税、DistrictAmount-转介分销、TaxDeduction-进项税抵扣、SaleCommission-销售提成、LaborCost-人工成本、OtherChannelAmount-其他服务费用合计、CommissionCost-垫佣成本、TotalCost-费用合计、GrossProfit-毛利、GrossProfitRate-毛利率、OtherCost-其他费用)*/
    subjectEnum: string;
    /**立项目ID*/
    termId: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**CalcMxVo*/
export interface CalcMxVo {
    /**收费模式*/
    busVOS: CalcBusVO[];
    /**代理服务付费*/
    calcAgencyCostVOS: CalcAgencyCostVO[];
    /**项目经营*/
    calcManageVOS: CalcManageVO[];
    /**其他渠道*/
    calcOtherManageVOS: CalcOtherManageVO[];
    /**客户服务费*/
    calcServiceCostVOS: CalcServiceCostVO[];
    /**代理费各项合计*/
    calcTotalAgency: CalcAgencyCostVO;
    /**客户服务费各项合计*/
    calcTotalService: CalcServiceCostVO;
    /**测算结果*/
    calcVo: CalcVo;
    /**立项ID*/
    termId: number;
}
/**CalcOtherManageVO*/
export interface CalcOtherManageVO {
    /**金额*/
    amount: number;
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**已删除*/
    deleted: number;
    /**经营ID*/
    manageOtherId: number;
    /**undefined*/
    ourCompanyRate: number;
    /**备注说明*/
    remark: string;
    /**科目(TotalBus-总业绩、NoTaxIncom-不含税收入、VatPayable-应纳增值税、Surtax-应缴附加税、DistrictAmount-转介分销、TaxDeduction-进项税抵扣、SaleCommission-销售提成、LaborCost-人工成本、OtherChannelAmount-其他服务费用合计、CommissionCost-垫佣成本、TotalCost-费用合计、GrossProfit-毛利、GrossProfitRate-毛利率、OtherCost-其他费用)*/
    subjectEnum: string;
    /**立项目ID*/
    termId: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**CalcServiceCostVO*/
export interface CalcServiceCostVO {
    /**业务员提成计算依据1*/
    calcBasicSaleman: string;
    /**成本ID*/
    costServiceId: number;
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**成交公司*/
    dealCompany: string;
    /**成交公司ID*/
    dealCompanyId: number;
    /**成交套数*/
    dealNum: number;
    /**已删除*/
    deleted: number;
    /**其他渠道费用金额*/
    otherChannelAmount: number;
    /**垫佣预计渠道费用*/
    padCommission: number;
    /**垫佣类型*/
    padType: string;
    /**备注*/
    remark: string;
    /**派发金额*/
    sendAmount: number;
    /**派发内场金额*/
    sendInAmount: number;
    /**立项周期ID*/
    termId: number;
    /**客户类型(成交方式) NationalMarket("全民营销"),Natural("自然到访"),Self("自行成交"),SelfChannel("自渠"),Big("一级大行"),Middle("二级中行"),Small("三级小行"),Appoint("指定中介行");(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、Big-一级大行、Middle-二级中行、Small-三级小行、Appoint-指定中介行)*/
    transactionEnum: string;
    /**不垫佣预计渠道费用*/
    unpadCommission: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**CalcVo*/
export interface CalcVo {
    /**代理费测算结论*/
    agencyCalcRes: string;
    /**代理费留存金额*/
    agencyFeeRetentAmount: number;
    /**代理费平台留存比例*/
    agencyFeeRetentRate: number;
    /**是否符合简化立项要求*/
    exRequireSimplelyPro: number;
    /**服务费测算结论*/
    serviceCalcRes: string;
    /**服务费留存金额*/
    serviceFeeRetentAmount: number;
    /**服务费平台留存比例*/
    serviceFeeRetentRate: number;
}
/**CollectPackageVo*/
export interface CollectPackageVo {
    /**业务模式(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式)*/
    busEnum: string;
    /**收费模式(Service-服务、Agent-代理、ServiceAndAgent-服务加代理)*/
    chargeEnum: string;
    /**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
}
/**CollectandsendConditionVO*/
export interface CollectandsendConditionVO {
    /**计算方式(Equal-等值、Range-范围、Custom-自定义)*/
    calcWayEnum: string;
    /**条件 <> <= >= ==(GT-null、GE-null、LT-null、LE-null、EQ-null、NE-null、IN-null)*/
    compare: string;
    /**条件 <> <= >= ==(GT-null、GE-null、LT-null、LE-null、EQ-null、NE-null、IN-null)*/
    compareB: string;
    /**条件依据  HouseType("户型"),Area("面积"),ContractPrice("签约价格"),SubscriPrice("认购价格");(HouseType-户型、Area-面积、ContractPrice-签约价格、SubscriPrice-认购价格)*/
    conditionEnum: string;
    /**条件ID*/
    conditionId: number;
    /**值A*/
    conditionNumA: number;
    /**值B*/
    conditionNumB: number;
    /**是否启用0-启用 1-禁用*/
    otherMsg: string;
}
/**CollectandsendCustomerVO*/
export interface CollectandsendCustomerVO {
    /**收派套餐body*/
    colletionandsendDetails: CollectandsendDetailVO[];
    /**费用类型 SERVICE-服务、AGENT-代理(ServiceFee-服务费、AgencyFee-代理费)*/
    costTypeEnum: string;
    /**套餐客户自增ID*/
    cusId: number;
    /**甲方公司名称*/
    partyCompany: string;
    /**甲方公司ID*/
    partyCompanyId: number;
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
    /**套餐客户ID*/
    cusId: number;
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
    /**客户类型(成交方式) NationalMarket("全民营销"),Natural("自然到访"),Self("自行成交"),SelfChannel("自渠"),Big("一级大行"),Middle("二级中行"),Small("三级小行"),Appoint("指定中介行");(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、Big-一级大行、Middle-二级中行、Small-三级小行、Appoint-指定中介行)*/
    transactionEnum: string;
}
/**CollectandsendDetailVO_1*/
export interface CollectandsendDetailVO_1 {
    /**基准费用   Contract("按签约价"),Subscription("按认购价")(Contract-按签约价、Subscription-按认购价)*/
    baseCostEnum: string;
    /**业务模式(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式)*/
    busEnum: string;
    /**收费模式(Service-服务、Agent-代理、ServiceAndAgent-服务加代理)*/
    chargeEnum: string;
    /**收派套餐明细*/
    colletionandsendMxs: CollectandsendCustomerVO[];
    /**有效截至时间(yyyy-MM-dd HH:mm:ss)*/
    endTime: string;
    /**假定成交价 单位万*/
    estimatedTransactionPrice: number;
    /**是否启用0-启用 1-禁用*/
    exStop: number;
    /**收派套餐ID*/
    packageId: number;
    /**套餐名称*/
    packageName: string;
    /**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**物业类型 WorkShop("厂房"),Apartment("公寓"),Villa("别墅"),Shop("商铺"),Office("写字楼"),Parking("车位"),Other("其他")(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**有效开始时间(yyyy-MM-dd HH:mm:ss)*/
    startTime: string;
    /**周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**立项周期ID*/
    termId: number;
    /**周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
}
/**CollectandsendUpdateVO*/
export interface CollectandsendUpdateVO {
    /**基准费用   Contract("按签约价"),Subscription("按认购价")(Contract-按签约价、Subscription-按认购价)*/
    baseCostEnum: string;
    /**收派套餐明细*/
    colletionandsendMxs: CollectandsendCustomerVO[];
    /**有效截至时间(yyyy-MM-dd HH:mm:ss)*/
    endTime: string;
    /**假定成交价 单位万*/
    estimatedTransactionPrice: number;
    /**是否启用0-启用 1-禁用*/
    exStop: number;
    /**收派套餐ID*/
    packageId: number;
    /**套餐名称*/
    packageName: string;
    /**物业类型 WorkShop("厂房"),Apartment("公寓"),Villa("别墅"),Shop("商铺"),Office("写字楼"),Parking("车位"),Other("其他")(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**有效开始时间(yyyy-MM-dd HH:mm:ss)*/
    startTime: string;
    /**立项周期ID*/
    termId: number;
}
/**CollectandsendVO*/
export interface CollectandsendVO {
    /**基准费用  CONTRACT-按签约价 SUBSCRIPTION-按认购价(Contract-按签约价、Subscription-按认购价)*/
    baseCostEnum: string;
    /**有效截至时间(yyyy-MM-dd HH:mm:ss)*/
    endTime: string;
    /**假定成交价*/
    estimatedTransactionPrice: number;
    /**是否启用0-启用 1-禁用*/
    exStop: number;
    /**收派套餐ID*/
    packageId: number;
    /**套餐名称*/
    packageName: string;
    /**物业类型  WORKSHOP-厂房 APARTMENT-公寓 VILLA-别墅 sSHOPS-商铺 OFFICEO-写字楼 PARKING-车位 OTHER-其他(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**有效开始时间(yyyy-MM-dd HH:mm:ss)*/
    startTime: string;
    /**立项周期ID*/
    termId: number;
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
    /**报备说明*/
    reportDescription: string;
    /**客户报备ID*/
    reportId: number;
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
    /**客户保护期时间*/
    customerProtectionPeriod: number;
    /**undefined*/
    cycleWxbbqds: CycleWxbbqdVO[];
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
    /**周期ID*/
    termId: number;
    /**拜访说明*/
    visitDescription: string;
}
/**CycleJfdzVO*/
export interface CycleJfdzVO {
    /**项目栋座ID*/
    buildingId: number;
    /**项目栋座名称*/
    buildingName: string;
    /**甲方关联栋座主表ID*/
    partyBuildingId: number;
    /**甲方关联栋座明细表ID*/
    partyBuildingMxId: number;
    /**立项ID*/
    termId: number;
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
/**CyclePartAVO*/
export interface CyclePartAVO {
    /**undefined*/
    cycleJfdzVOS: CycleJfdzVO[];
    /**甲方ID*/
    partyAId: number;
    /**甲方名称*/
    partyAName: string;
    /**甲方关联栋座主表ID*/
    partyBuildingId: number;
    /**立项ID*/
    termId: number;
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
/**DistributContractByTermVO*/
export interface DistributContractByTermVO {
    /**中介分销合同ID*/
    agencyContrictId: number;
    /**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、FirstPlatform-大型中介/一级平台、MiddlePlatform-中型中介/二级平台、SmallPlatform-小型中介、Appoint-指定中介行)*/
    channelEnum: string;
    /**合同主标题*/
    contractTitle: string;
    /**甲方合同ID*/
    firstContractId: number;
    /**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**甲方公司 甲方合同-乙方*/
    partyCompany: string;
    /**合同扫描件地址*/
    scanningContract: string;
}
/**DistributContractConditionVo*/
export interface DistributContractConditionVo {
    /**成交客户ID*/
    consumerId: number;
    /**客户名称*/
    consumerName: string;
    /**是否垫佣  Veto("否"),Tree("3个月"),Six("6个月"),Nine("9个月"),MoreTen("10个月以上");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**立项ID*/
    termId: number;
    /**客户类型(成交方式) NationalMarket("全民营销"),Natural("自然到访"),Self("自行成交"),SelfChannel("自渠"),Big("一级大行"),Middle("二级中行"),Small("三级小行"),Appoint("指定中介行");(NationalMarket-全民营销、Natural-自然到访、Self-自行成交、SelfChannel-自渠、Big-一级大行、Middle-二级中行、Small-三级小行、Appoint-指定中介行)*/
    transactionEnum: string;
}
/**DistributContractMO*/
export interface DistributContractMO {
    /**纸质告知书模板*/
    attachTermVOS: AttachTermItemVO[];
    /**业务模式 SERVICE-服务、AGENT-代理、SERVICEANDAGENT-服务加代理(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式)*/
    busEnum: string;
    /**中介分销合同相关*/
    distributContractVOS: DistributContractQueryVO[];
    /**优惠ID*/
    preferentialId: number;
    /**优惠告知书相关信息*/
    preferentialMxVOS: PreferentialMxVO[];
    /**甲方信息*/
    preferentialPartyA: string;
    /**优惠信息-甲方ID*/
    preferentialPartyAId: number;
    /**启动事业部*/
    startDivision: string;
    /**启动事业部ID*/
    startDivisionId: number;
}
/**DistributContractMxVO*/
export interface DistributContractMxVO {
    /**基准费用 Contract("按签约价"),Subscription("按认购价");(Contract-按签约价、Subscription-按认购价)*/
    baseCostEnum: string;
    /**undefined*/
    condition: string;
    /**条件ID*/
    conditionId: number;
    /**中介分销合同明细表ID*/
    contrictMxId: number;
    /**佣金类型 ServiceFee("服务费"),AgencyFee("代理费")(ServiceFee-服务费、AgencyFee-代理费)*/
    costTypeEnum: string;
    /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**派发金额*/
    sendAmount: number;
    /**派发佣金标准*/
    sendContext: string;
    /**派发内场点数*/
    sendPoint: number;
    /**计付标准*/
    standardPay: string;
}
/**DistributContractQueryVO*/
export interface DistributContractQueryVO {
    /**中介分销合同ID*/
    agencyContrictId: number;
    /**渠道类型 BIG-大行/大平台 MIDDLE-中行/中平台 SMALL-小行/小平台(BigPlatform-大平台、FirstPlatform-大型中介/一级平台、MiddlePlatform-中型中介/二级平台、SmallPlatform-小型中介、Appoint-指定中介行)*/
    channelEnum: string;
    /**合同主标题*/
    contractTitle: string;
    /**派发佣金标准*/
    distributContractMxVOS: DistributContractMxVO[];
    /**甲方合同ID*/
    firstContractId: number;
    /**是否垫佣 VETO-否、 TREE-3个月 SIX-6个月 NINE-9个月 MORETEN 10个月以上(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**合同扫描件地址*/
    scanningContract: string;
    /**立项周期ID*/
    termId: number;
}
/**中介分销合同相关信息表*/
export interface DistributContractVO {
    /**中介分销合同ID*/
    agencyContrictId: number;
    /**代理费结算条件*/
    agencyCostCondition: string;
    /**代理费结算方式*/
    agencyCostSettleWay: string;
    /**代理费计付标准备注*/
    agencyFeeRemark: string;
    /**房屋未成交乙方退回代理费比例*/
    agencyFeeReturnRate: string;
    /**房屋未成交乙方退回代理费期限*/
    agencyFeeReturnTime: string;
    /**渠道类型 BigPlatform("大平台"),FirstPlatform("大型中介/一级平台"),MiddlePlatform("中型中介/二级平台"),SmallPlatform("小型中介"),Appoint("指定中介行");(BigPlatform-大平台、FirstPlatform-大型中介/一级平台、MiddlePlatform-中型中介/二级平台、SmallPlatform-小型中介、Appoint-指定中介行)*/
    channelEnum: string;
    /**客户成交以及确认*/
    consumerComplete: string;
    /**合作结束时间(yyyy-MM-dd HH:mm:ss)*/
    contractEndTime: string;
    /**派发套餐明细*/
    contractMxVOList: DistributContractMxVO[];
    /**合作开始时间(yyyy-MM-dd HH:mm:ss)*/
    contractStartTime: string;
    /**合同副标题*/
    contractSubtitle: string;
    /**合同主标题*/
    contractTitle: string;
    /**成交确认人,从甲方合同带过来*/
    dealMan: string;
    /**成交确认人联系电话,从甲方合同带过来*/
    dealTel: string;
    /**指定中介行*/
    designatedAgency: string;
    /**中介行ID*/
    designatedAgencyId: number;
    /**甲方合同ID*/
    firstContractId: number;
    /**是否垫佣  Veto("否"),LessOrEqualOne("回款周期≤1个月"),Between1To3("1个月＜回款周期≤3个月"),Between3To6("3个月＜回款周期≤6个月"),Between6To9("6个月＜回款周期≤9个月"),Between9To12("9个月＜回款周期≤12个月");(Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**甲方公司 甲方合同-乙方*/
    partyCompany: string;
    /**甲方地址*/
    partyaAddr: string;
    /**甲方联系人*/
    partyaMan: string;
    /**甲方联系人电话*/
    partyaTel: string;
    /**合同扫描件地址*/
    scanningContract: string;
    /**补充条款*/
    supplementary: string;
    /**立项周期ID*/
    termId: number;
    /**违约责任*/
    unContractLiability: string;
}
/**DistributeProTermVO*/
export interface DistributeProTermVO {
    /**审核状态   CONDUCT-审核中 ADOPT-审核通过(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
    auditEnum: string;
    /**优惠信息-当前录入用户的区域*/
    curArea: string;
    /**优惠信息-区域ID*/
    orgId: number;
    /**优惠信息-甲方信息*/
    preferentialPartyA: string;
    /**优惠信息-甲方ID*/
    preferentialPartyAId: number;
    /**项目id*/
    proId: number;
    /**项目名称*/
    proName: string;
    /**周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**周期名称*/
    termName: string;
    /**项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购(默认)、Recognize-认筹)*/
    termStageEnum: string;
    /**周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
}
/**File*/
export interface File {
    /**undefined*/
    absolute: boolean;
    /**undefined*/
    absoluteFile: File_1;
    /**undefined*/
    absolutePath: string;
    /**undefined*/
    canonicalFile: File_1;
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
    parentFile: File_1;
    /**undefined*/
    path: string;
    /**undefined*/
    totalSpace: number;
    /**undefined*/
    usableSpace: number;
}
/**File_1*/
export interface File_1 {
    /**undefined*/
    absolute: boolean;
    /**undefined*/
    absoluteFile: File_1;
    /**undefined*/
    absolutePath: string;
    /**undefined*/
    canonicalFile: File_1;
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
    parentFile: File_1;
    /**undefined*/
    path: string;
    /**undefined*/
    totalSpace: number;
    /**undefined*/
    usableSpace: number;
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
    /**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
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
    /**(必填)公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
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
    /**审核状态(Draft-草稿、WaitByClerk-文员待审核、WaitByPlat-平台文员待审核、WaitByBranch-分公司待审核、WaitByHead-总部业管待审核、WaitByOA-OA待审核、ConducrtByOA-OA审核中、ReviewdByOA-OA已审核)*/
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
    /**公司类型(limitedLiabilityCompany-有限责任公司（自然人投资或控股）)*/
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
    /**审核状态(Draft-草稿、WaitByClerk-文员待审核、WaitByPlat-平台文员待审核、WaitByBranch-分公司待审核、WaitByHead-总部业管待审核、WaitByOA-OA待审核、ConducrtByOA-OA审核中、ReviewdByOA-OA已审核)*/
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
    /**审核状态(Draft-草稿、WaitByClerk-文员待审核、WaitByPlat-平台文员待审核、WaitByBranch-分公司待审核、WaitByHead-总部业管待审核、WaitByOA-OA待审核、ConducrtByOA-OA审核中、ReviewdByOA-OA已审核)*/
    agencyAuditEnum: string;
    /**一手公司代理ID*/
    agencyId: number;
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
    /**项目一手公司代理ID*/
    proAgencyId: number;
    /**省*/
    province: string;
    /**简称*/
    simpleName: string;
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
    /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**装修级别  ROUGH-毛坯、SHIMIZU -清水、SIMPLE-简装修、HARDBOUND-精装修(Rough-毛坯、QinShui-清水、Simple-简装修、HardBound-精装修、Luxury-豪华装修)*/
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
/**InputStream*/
export interface InputStream {
}
/**InputStream_1*/
export interface InputStream_1 {
}
/**LogAndOAVo*/
export interface LogAndOAVo {
    /**OA附言列表*/
    oafyVOS: CycleOafyVO[];
    /**快照列表*/
    snapshotVOS: SnapshotVO[];
    /**操作日志列表*/
    termLogVOS: TermLogVO[];
}
/**OrgDelVO*/
export interface OrgDelVO {
    /**成交组织ID*/
    completeId: number;
    /**立项周期ID*/
    termId: number;
}
/**OrgListVO*/
export interface OrgListVO {
    /**公司名称*/
    company: string;
    /**成交组织ID*/
    completeId: number;
    /**组织ID*/
    orgId: number;
    /**店组*/
    shopGroup: string;
    /**立项周期ID*/
    termId: number;
}
/**OrgUpdateVO*/
export interface OrgUpdateVO {
    /**公司名称*/
    company: string;
    /**成交组织ID*/
    completeId: number;
    /**组织ID*/
    orgId: number;
    /**店组*/
    shopGroup: string;
    /**立项周期ID*/
    termId: number;
}
/**OrgVO*/
export interface OrgVO {
    /**公司名称*/
    company: string;
    /**组织ID*/
    orgId: number;
    /**店组*/
    shopGroup: string;
    /**立项周期ID*/
    termId: number;
}
/**OtherChannelSetVo*/
export interface OtherChannelSetVo {
    /**是否增补佣金*/
    exAddCommission: number;
    /**是否共享渠道费用*/
    exShareChannelFee: number;
}
/**OtherVo*/
export interface OtherVo {
    /**是否允许跨项目使用留存*/
    exAcrossProject: number;
    /**是否共享渠道费用*/
    exOtherProChannelUse: number;
    /**是否增补佣金*/
    exPartyASuppleChannelFees: number;
    /**成交归属组织列表*/
    orgVOS: OrgListVO[];
    /**收款信息列表*/
    paymentVOS: PaymentVO[];
    /**成交外收入支出情况列表*/
    receiptVOS: ReceiptVO[];
    /**共享其他渠道费周期列表*/
    shareChannelFeeVOS: ShareChannelFeeVO[];
    /**立项ID*/
    termId: number;
}
/**ParentProjectAddArgs*/
export interface ParentProjectAddArgs {
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
/**PartyAContractPageVO*/
export interface PartyAContractPageVO {
    /**栋座归属信息*/
    cyclePartAVOS: CyclePartAVO[];
    /**甲方合同信息*/
    partyAContractInfos: PartyAContractVO[];
    /**立项ID*/
    termId: number;
}
/**PartyAContractVO*/
export interface PartyAContractVO {
    /**合同ID*/
    contractId: number;
    /**合同标题*/
    contractTitle: string;
    /**执行时间(yyyy-MM-dd HH:mm:ss)*/
    excuteTime: string;
    /**跟进人Id*/
    followId: number;
    /**跟进人*/
    followMan: string;
    /**甲方合同ID*/
    partyAContrctId: number;
    /**甲方*/
    partyAs: PartyAInfoVO[];
    /**乙方*/
    partyB: string;
    /**乙方ID*/
    partyBId: number;
}
/**PartyAInfoVO*/
export interface PartyAInfoVO {
    /**甲方ID*/
    companyId: number;
    /**甲方名称*/
    companyName: string;
    /**甲方合同ID*/
    partyAContrctId: number;
    /**甲方信息ID*/
    partyAId: number;
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
/**PreferentialMxVO*/
export interface PreferentialMxVO {
    /**优惠方式说明*/
    modeDescription: string;
    /**甲方退款天数*/
    partyARefundDays: number;
    /**预览地址*/
    preferentialAddr: string;
    /**优惠MxID*/
    preferentialMxId: number;
    /**缴纳金额*/
    premiumReceived: number;
}
/**PreferentialVo*/
export interface PreferentialVo {
    /**图片地址列表*/
    pics: AttachTermItemVO[];
    /**优惠告知书列表*/
    preferentialMxVOS: PreferentialMxVO[];
    /**立项ID*/
    termId: number;
}
/**ProTermVO*/
export interface ProTermVO {
    /**开发商ID*/
    developerId: number;
    /**开发商名称*/
    developerName: string;
    /**是否市场化*/
    exMarket: number;
    /**突破标准线期数*/
    overStandardCount: number;
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
/**ProjectAddArgs*/
export interface ProjectAddArgs {
    /**附件图片*/
    attachPics: AttachItemVO[];
    /**明源楼盘ID*/
    buildingGuid: string;
    /**明源楼盘父ID*/
    buildingParentGuid: string;
    /**(必填)市*/
    city: string;
    /**(必填)市名称*/
    cityName: string;
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
    proPics: AttachItemVO[];
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
/**ProjectDetailVO*/
export interface ProjectDetailVO {
    /**项目均价*/
    averagePrice: number;
    /**市*/
    city: string;
    /**佣金规则*/
    commissionRules: string;
    /**导客规则*/
    customerReportRule: CustomerReportRule;
    /**区*/
    district: string;
    /**户型信息*/
    houseTypeDetailVos: HouseTypeDetailVo[];
    /**proId*/
    proId: number;
    /**项目推广名*/
    proName: string;
    /**项目图片*/
    projectPic: string;
    /**楼盘卖点*/
    promotion: Promotion;
    /**物业费*/
    propertyCost: number;
    /**省*/
    province: string;
}
/**ProjectDto*/
export interface ProjectDto {
    /**(必填)栋座列表*/
    buildingDtos: BuildingDto[];
    /**明源楼盘ID*/
    buildingGuid: string;
    /**明源楼盘父ID*/
    buildingParentGuid: string;
    /**(必填)户型列表*/
    houseTypeDtos: HouseTypeDto[];
    /**物业列表*/
    propertyEnums: string[];
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
    /**(必填)当前页*/
    pageNum: number;
    /**(必填)每页条数*/
    pageSize: number;
    /**项目名称*/
    proName: string;
    /**项目编号*/
    proNo: string;
    /**省*/
    province: string;
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
    /**类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    property: string;
    /**装修(Rough-毛坯、QinShui-清水、Simple-简装修、HardBound-精装修、Luxury-豪华装修)*/
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
/**ProjectUpdateArgs*/
export interface ProjectUpdateArgs {
    /**附件图片*/
    attachPics: AttachItemVO[];
    /**明源楼盘ID*/
    buildingGuid: string;
    /**明源楼盘父ID*/
    buildingParentGuid: string;
    /**(必填)市*/
    city: string;
    /**(必填)市名称*/
    cityName: string;
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
    proPics: AttachItemVO[];
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
/**Promotion*/
export interface Promotion {
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**客户年龄*/
    customerAge: string;
    /**客户考虑因素*/
    customerConsiderations: string;
    /**客户其他*/
    customerOther: string;
    /**已删除*/
    deleted: number;
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
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
    /**工作区域*/
    workArea: string;
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
    /**产权年限(Thirty-null、Forty-null、Fifty-null、Sixty-null、Seventy-null、Permanent-null)*/
    propertyAge: string;
    /**物业费*/
    propertyCost: number;
    /**物业类型     Residence("住宅"),WorkShop("厂房"),Apartment("公寓"),Villa("别墅"),Shop("商铺"),Office("写字楼"),
        Parking("车位"),Other("其他")(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**ID*/
    propertyId: number;
    /**装修级别  Rough("毛坯"),QinShui("清水"),Simple("简装修"),HardBound("精装修");(Rough-毛坯、QinShui-清水、Simple-简装修、HardBound-精装修、Luxury-豪华装修)*/
    renovatLevelEnum: string;
}
/**PropertyVO*/
export interface PropertyVO {
    /**物业类型(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyEnum: string;
    /**ID*/
    propertyId: number;
    /**物业类型名称(Residence-住宅、WorkShop-厂房、Apartment-公寓、Villa-别墅、Shop-商铺、Office-写字楼、Parking-车位、Other-其他)*/
    propertyName: string;
}
/**ReceiptDelVO*/
export interface ReceiptDelVO {
    /**收款主表ID*/
    receiptId: number;
    /**立项周期ID*/
    termId: number;
}
/**ReceiptVO*/
export interface ReceiptVO {
    /**收款账号*/
    receiptAccount: string;
    /**收款公司ID*/
    receiptCompanyId: number;
    /**收款公司名称*/
    receiptCompanyName: string;
    /**立项周期ID*/
    termId: number;
}
/**Resource*/
export interface Resource {
    /**undefined*/
    description: string;
    /**undefined*/
    file: File_1;
    /**undefined*/
    filename: string;
    /**undefined*/
    inputStream: InputStream_1;
    /**undefined*/
    open: boolean;
    /**undefined*/
    readable: boolean;
    /**undefined*/
    uri: URI_1;
    /**undefined*/
    url: URL_1;
}
/**Resource_1*/
export interface Resource_1 {
    /**undefined*/
    description: string;
    /**undefined*/
    file: File_1;
    /**undefined*/
    filename: string;
    /**undefined*/
    inputStream: InputStream_1;
    /**undefined*/
    open: boolean;
    /**undefined*/
    readable: boolean;
    /**undefined*/
    uri: URI_1;
    /**undefined*/
    url: URL_1;
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
/**SettleCompareVO*/
export interface SettleCompareVO {
    /**条件 <> <= >= ==*/
    compare: string;
    /**条件 <> <= >= ==*/
    compareB: string;
    /**条件 且*/
    conditionAnd: number;
    /**条件类型  HOUSETYPE-户型、AREA-面积、CONTRACTPRICE-签约价格、   SUBSCRIPPRICE-认购价格(HouseType-户型、Area-面积、ContractPrice-签约价格、SubscriPrice-认购价格)*/
    conditionEnum: string;
    /**条件依据 HOUSETYPE-户型、AREA-面积、CONTRACTPRICE-签约价格、   SUBSCRIPPRICE-认购价格*/
    conditionModel: string;
    /**值A*/
    conditionNumA: number;
    /**值B*/
    conditionNumB: number;
    /**条件ID*/
    conditionSetId: number;
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**已删除*/
    deleted: number;
    /**收派套餐ID*/
    settleId: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**SettleConditionAddVO*/
export interface SettleConditionAddVO {
    /**代理费*/
    agencyFee: number;
    /**代理费结算金额*/
    agencyFeeSettleAmount: number;
    /**代理费设置比例*/
    agencyFeeSettleRate: number;
    /**代理费-垫佣类型*/
    agencyPadCommisionType: number;
    /**根据房款回笼比率-条件*/
    conReturnRateByHouse: number;
    /**合同类型(Normal-正常合同、TemPorary-临时合同、Other-其他)*/
    contractTypeEnum: string;
    /**是否备案*/
    exRecord: number;
    /**优先级(A-一级别、B-二级别、C-三级别、D-四级别、E-五级别)*/
    priority: string;
    /**结算后回款*/
    returnAfterSettlement: number;
    /**服务费*/
    serviceFee: number;
    /**服务费结算金额*/
    serviceFeeSettleAmount: number;
    /**服务费设置比例*/
    serviceFeeSettleRate: number;
    /**服务费-垫佣类型*/
    servicePadCommisionType: number;
    /**根据房款回笼比率-结算*/
    setsReturnRateByHouse: number;
    /**undefined*/
    settleCompareVOS: SettleCompareVO[];
    /**结算类型 （请佣、结佣）(SettleCommission-结佣、ApplyCommission-请拥)*/
    settleEnum: string;
    /**结算名称*/
    settleName: string;
    /**立项ID*/
    termId: number;
}
/**SettleConditionCancelVO*/
export interface SettleConditionCancelVO {
    /**(必填)当前页*/
    pageNum: number;
    /**(必填)每页条数*/
    pageSize: number;
    /**结算ID*/
    settleId: number;
    /**立项ID*/
    termId: number;
}
/**SettleConditionUpdateVO*/
export interface SettleConditionUpdateVO {
    /**代理费*/
    agencyFee: number;
    /**代理费结算金额*/
    agencyFeeSettleAmount: number;
    /**代理费设置比例*/
    agencyFeeSettleRate: number;
    /**代理费-垫佣类型*/
    agencyPadCommisionType: number;
    /**根据房款回笼比率-条件*/
    conReturnRateByHouse: number;
    /**合同类型(Normal-正常合同、TemPorary-临时合同、Other-其他)*/
    contractTypeEnum: string;
    /**是否备案*/
    exRecord: number;
    /**优先级(A-一级别、B-二级别、C-三级别、D-四级别、E-五级别)*/
    priority: string;
    /**结算后回款*/
    returnAfterSettlement: number;
    /**服务费*/
    serviceFee: number;
    /**服务费结算金额*/
    serviceFeeSettleAmount: number;
    /**服务费设置比例*/
    serviceFeeSettleRate: number;
    /**服务费-垫佣类型*/
    servicePadCommisionType: number;
    /**根据房款回笼比率-结算*/
    setsReturnRateByHouse: number;
    /**undefined*/
    settleCompareVOS: SettleCompareVO[];
    /**结算类型 （请佣、结佣）(SettleCommission-结佣、ApplyCommission-请拥)*/
    settleEnum: string;
    /**结算ID*/
    settleId: number;
    /**结算名称*/
    settleName: string;
    /**立项ID*/
    termId: number;
}
/**SettleConditionVO*/
export interface SettleConditionVO {
    /**代理费设置比例*/
    agencyFeeSettleRate: number;
    /**合同类型(Normal-正常合同、TemPorary-临时合同、Other-其他)*/
    contractTypeEnum: string;
    /**优先级(A-一级别、B-二级别、C-三级别、D-四级别、E-五级别)*/
    priority: string;
    /**服务费设置比例*/
    serviceFeeSettleRate: number;
    /**结算类型 （请佣、结佣）(SettleCommission-结佣、ApplyCommission-请拥)*/
    settleEnum: string;
    /**结算ID*/
    settleId: number;
    /**结算名称*/
    settleName: string;
}
/**ShareChannelFeeVO*/
export interface ShareChannelFeeVO {
    /**金额*/
    amount: number;
    /**共享渠道ID*/
    shareId: number;
    /**状态 操作：	         移除：点击移除对应周期（新增允许周期时显示）	         启用：点击将对应周期在当前渠道费配置中状态改为启用。	         禁用：点击将对应周期在当前渠道费配置中状态改为禁用。	          状态和操作的关系	          新增允许周期时，周期状态为【新增】，操作按钮为【移除】。	          保存配置待审时，周期状态为【启动】，操作按钮为【禁用】。	          操作禁用周期时，周期状态为【禁用】，操作按钮为【启用】(New-新增、Enable-启用、Disable-禁用)*/
    shareStateEnum: string;
    /**允许共享渠道费周期列表ID*/
    shareTermId: number;
    /**周期结束时间*/
    termEnd: string;
    /**立项周期ID*/
    termId: number;
    /**立项周期名称*/
    termName: string;
    /**周期起始时间*/
    termStart: string;
}
/**SnapshotVO*/
export interface SnapshotVO {
    /**终审时间*/
    auditTime: string;
    /**副本*/
    copy: string;
    /**COPY_TERM_ID*/
    copyTermId: number;
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**已删除*/
    deleted: number;
    /**快照类型(First-首次立项、Supplement-补充协议、Hander-手动修改、Canel-作废)*/
    snapshotEnum: string;
    /**快照ID*/
    snapshotId: number;
    /**发起人*/
    startMan: string;
    /**立项周期ID*/
    termId: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**TermAddVO*/
export interface TermAddVO {
    /**附件信息*/
    attachTermVOS: AttachTermItemVO[];
    /**属性模式   SeriAll("服务费总包"),AgenAll("代理费总包"),SeriAllAgenAll("服务费总包+代理费总包"),
        ServiDist("纯分销模式-服务费"),AgencyDist("纯分销模式-代理费"),
        AllAndDistricBySeri("服务费总包+服务费分销"),AllADistByAgen("代理费总包+代理费分销"),
        All("服务费总包+代理费总包+服务费分销+代理费分销"),AllAAgenByServAAgenDist("服务费总包+服务费分销+代理费分销"),
        ServiAllAAgenDist("服务费总包+代理费分销")(SeriAll-服务费总包、AgenAll-代理费总包、SeriAllAgenAll-服务费总包+代理费总包、ServiDist-纯分销模式-服务费、AgencyDist-纯分销模式-代理费、AllAndDistBySeri-服务费总包+服务费分销、AllAndDistByAgen-代理费总包+代理费分销、All-服务费总包+代理费总包+服务费分销+代理费分销、AllAAgenByServAAgenDist-服务费总包+服务费分销+代理费分销、ServiAllAAgenDist-服务费总包+代理费分销)*/
    attributeEnum: string;
    /**业务背景*/
    busBackground: string;
    /**(必填)业务模式(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式)*/
    busEnum: string;
    /**(必填)业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
    busTypeEnum: string;
    /**(必填)收费模式(Service-服务、Agent-代理、ServiceAndAgent-服务加代理)*/
    chargeEnum: string;
    /**收取佣金条件简述(推送到OA)*/
    collectCommissionConditionSketch: string;
    /**收取佣金标准简述(推送到OA)*/
    collectCommissionStandardSketch: string;
    /**客户报备要求简述(推送到OA)*/
    customerReportingRequire: string;
    /**(必填)是否代销*/
    exConsignment: number;
    /**(必填)认购书是否体现优惠折扣*/
    exDiscount: number;
    /**是否允许跨项目使用其他渠道费用*/
    exOtherProChannelUse: number;
    /**甲方是否增补渠道费用不足部分佣金*/
    exPartyASuppleChannelFees: number;
    /**是否允许使用其它渠道费用*/
    exUseOtherChannel: number;
    /**项目房款/车位款加服务费大于备案价(NO-否、Yes-是、NotInvolved-不涉及)*/
    houseandcarGtRecordEnum: string;
    /**优惠告知书折扣体现方式*/
    notificDiscountModel: string;
    /**突破标准线期数*/
    overStandardCount: number;
    /**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**(必填)联动项目ID*/
    proId: number;
    /**备注*/
    remark: string;
    /**派发佣金条件简述(推送到OA)*/
    sendCommissionConditionSketch: string;
    /**派发佣金标准简述(推送到OA)*/
    sendCommissionStandardSketch: string;
    /**启动事业部*/
    startDivision: string;
    /**(必填)启动事业部ID*/
    startDivisionId: number;
    /**认购书优惠折扣体现方式*/
    subscriDiscountModel: string;
    /**(必填)周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**(必填)周期名称 合作项目名称(项目推广名)+周期时间*/
    termName: string;
    /**(必填)项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购(默认)、Recognize-认筹)*/
    termStageEnum: string;
    /**(必填)周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
    /**联动业务总开展期数*/
    totalCount: number;
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
    /**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
    auditEnum: string;
    /**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
    busTypeEnum: string;
    /**周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**立项ID*/
    termId: number;
    /**周期名称 合作项目名称(项目推广名)+周期时间*/
    termName: string;
    /**周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
}
/**TermDetailsVO*/
export interface TermDetailsVO {
    /**代理费总包-分销平台留存比例*/
    agencyFeeTotalByDistrictbuteRate: number;
    /**代理费总包-总包平台留存比例*/
    agencyFeeTotalByTotalRate: number;
    /**呈批文号【OA生成】*/
    approvalNo: string;
    /**附件详情*/
    attachTermVOS: AttachTermItemVO[];
    /**属性模式   SeriAll("服务费总包"),AgenAll("代理费总包"),SeriAllAgenAll("服务费总包+代理费总包"),
        ServiDist("纯分销模式-服务费"),AgencyDist("纯分销模式-代理费"),
        AllAndDistricBySeri("服务费总包+服务费分销"),AllADistByAgen("代理费总包+代理费分销"),
        All("服务费总包+代理费总包+服务费分销+代理费分销"),AllAAgenByServAAgenDist("服务费总包+服务费分销+代理费分销"),
        ServiAllAAgenDist("服务费总包+代理费分销")(SeriAll-服务费总包、AgenAll-代理费总包、SeriAllAgenAll-服务费总包+代理费总包、ServiDist-纯分销模式-服务费、AgencyDist-纯分销模式-代理费、AllAndDistBySeri-服务费总包+服务费分销、AllAndDistByAgen-代理费总包+代理费分销、All-服务费总包+代理费总包+服务费分销+代理费分销、AllAAgenByServAAgenDist-服务费总包+服务费分销+代理费分销、ServiAllAAgenDist-服务费总包+代理费分销)*/
    attributeEnum: string;
    /**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
    auditEnum: string;
    /**审核时间(yyyy-MM-dd HH:mm:ss)*/
    auditTime: string;
    /**业务背景*/
    busBackground: string;
    /**业务模式(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式)*/
    busEnum: string;
    /**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
    busTypeEnum: string;
    /**收费模式(Service-服务、Agent-代理、ServiceAndAgent-服务加代理)*/
    chargeEnum: string;
    /**收取佣金条件简述(推送到OA)*/
    collectCommissionConditionSketch: string;
    /**收取佣金标准简述(推送到OA)*/
    collectCommissionStandardSketch: string;
    /**客户报备要求简述(推送到OA)*/
    customerReportingRequire: string;
    /**开发商ID*/
    developerId: number;
    /**开发商名称*/
    developerName: string;
    /**纯分销模式-代理费留存率*/
    districtbuteAgencyRate: number;
    /**纯分销模式-服务费留存率*/
    districtbuteServiceRate: number;
    /**是否代销*/
    exConsignment: number;
    /**认购书是否体现优惠折扣*/
    exDiscount: number;
    /**是否市场化*/
    exMarket: number;
    /**是否允许跨项目使用其他渠道费用*/
    exOtherProChannelUse: number;
    /**甲方是否增补渠道费用不足部分佣金*/
    exPartyASuppleChannelFees: number;
    /**是否允许使用其它渠道费用*/
    exUseOtherChannel: number;
    /**项目房款/车位款加服务费大于备案价(NO-否、Yes-是、NotInvolved-不涉及)*/
    houseandcarGtRecordEnum: string;
    /**优惠告知书折扣体现方式*/
    notificDiscountModel: string;
    /**突破标准线期数*/
    overStandardCount: number;
    /**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**项目地址*/
    proAddr: string;
    /**联动项目ID*/
    proId: number;
    /**合作项目名称*/
    proName: string;
    /**项目备案名*/
    proRecord: string;
    /**备注*/
    remark: string;
    /**派发佣金条件简述(推送到OA)*/
    sendCommissionConditionSketch: string;
    /**派发佣金标准简述(推送到OA)*/
    sendCommissionStandardSketch: string;
    /**服务费总包-分销平台留存比例*/
    serviceFeeTotalByDistrictbuteRate: number;
    /**服务费总包-总包平台留存比例*/
    serviceFeeTotalByTotalRate: number;
    /**启动事业部ID*/
    startDivisionId: number;
    /**认购书优惠折扣体现方式*/
    subscriDiscountModel: string;
    /**周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**周期ID*/
    termId: number;
    /**周期名称 合作项目名称(项目推广名)+周期时间*/
    termName: string;
    /**综合留存率*/
    termOverallRate: number;
    /**项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购(默认)、Recognize-认筹)*/
    termStageEnum: string;
    /**周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
    /**联动业务总开展期数*/
    totalCount: number;
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
/**TermLogVO*/
export interface TermLogVO {
    /**创建时间(yyyy-MM-dd HH:mm:ss)*/
    createTime: string;
    /**创建用户*/
    createUser: number;
    /**已删除*/
    deleted: number;
    /**日志ID*/
    logId: number;
    /**操作节点*/
    node: string;
    /**操作人*/
    operator: string;
    /**操作时间(yyyy-MM-dd HH:mm:ss)*/
    operatorTime: string;
    /**操作类型*/
    operatorType: string;
    /**意见*/
    opinion: string;
    /**操作岗位*/
    station: string;
    /**立项周期ID*/
    termId: number;
    /**更新时间(yyyy-MM-dd HH:mm:ss)*/
    updateTime: string;
    /**更新用户*/
    updateUser: number;
}
/**TermQueryVO*/
export interface TermQueryVO {
    /**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
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
    /**项目推广名*/
    proName: string;
    /**项目编号*/
    proNo: string;
    /**省*/
    province: string;
    /**周期名称 合作项目名称(项目推广名)+周期时间*/
    termName: string;
}
/**TermRejectVO*/
export interface TermRejectVO {
    /**审核意见*/
    rejectOption: string;
    /**(必填)ID*/
    termId: number;
}
/**TermUpdateVO*/
export interface TermUpdateVO {
    /**附件信息*/
    attachTermVOS: AttachTermItemVO[];
    /**属性模式   SeriAll("服务费总包"),AgenAll("代理费总包"),SeriAllAgenAll("服务费总包+代理费总包"),
        ServiDist("纯分销模式-服务费"),AgencyDist("纯分销模式-代理费"),
        AllAndDistricBySeri("服务费总包+服务费分销"),AllADistByAgen("代理费总包+代理费分销"),
        All("服务费总包+代理费总包+服务费分销+代理费分销"),AllAAgenByServAAgenDist("服务费总包+服务费分销+代理费分销"),
        ServiAllAAgenDist("服务费总包+代理费分销")(SeriAll-服务费总包、AgenAll-代理费总包、SeriAllAgenAll-服务费总包+代理费总包、ServiDist-纯分销模式-服务费、AgencyDist-纯分销模式-代理费、AllAndDistBySeri-服务费总包+服务费分销、AllAndDistByAgen-代理费总包+代理费分销、All-服务费总包+代理费总包+服务费分销+代理费分销、AllAAgenByServAAgenDist-服务费总包+服务费分销+代理费分销、ServiAllAAgenDist-服务费总包+代理费分销)*/
    attributeEnum: string;
    /**业务背景*/
    busBackground: string;
    /**(必填)业务模式(TotalBagModel-总包模式、DistriModel-分销模式、TotalBagDistriModel-总包+分销模式)*/
    busEnum: string;
    /**(必填)业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
    busTypeEnum: string;
    /**(必填)收费模式(Service-服务、Agent-代理、ServiceAndAgent-服务加代理)*/
    chargeEnum: string;
    /**收取佣金条件简述(推送到OA)*/
    collectCommissionConditionSketch: string;
    /**收取佣金标准简述(推送到OA)*/
    collectCommissionStandardSketch: string;
    /**客户报备要求简述(推送到OA)*/
    customerReportingRequire: string;
    /**(必填)是否代销*/
    exConsignment: number;
    /**(必填)认购书是否体现优惠折扣*/
    exDiscount: number;
    /**是否允许跨项目使用其他渠道费用*/
    exOtherProChannelUse: number;
    /**甲方是否增补渠道费用不足部分佣金*/
    exPartyASuppleChannelFees: number;
    /**是否允许使用其它渠道费用*/
    exUseOtherChannel: number;
    /**项目房款/车位款加服务费大于备案价(NO-否、Yes-是、NotInvolved-不涉及)*/
    houseandcarGtRecordEnum: string;
    /**优惠告知书折扣体现方式*/
    notificDiscountModel: string;
    /**突破标准线期数*/
    overStandardCount: number;
    /**是否垫佣 (Veto-否、One-1个月、Two-2个月、Three-3个月、FOUR-4个月、Five-5个月、Six-6个月、Seven-7个月、Eight-8个月、Nine-9个月、Ten-10个月、Eleven-11个月、Twelve-12个月)*/
    padCommissionEnum: string;
    /**(必填)联动项目ID*/
    proId: number;
    /**备注*/
    remark: string;
    /**派发佣金条件简述(推送到OA)*/
    sendCommissionConditionSketch: string;
    /**派发佣金标准简述(推送到OA)*/
    sendCommissionStandardSketch: string;
    /**启动事业部*/
    startDivision: string;
    /**(必填)启动事业部ID*/
    startDivisionId: number;
    /**认购书优惠折扣体现方式*/
    subscriDiscountModel: string;
    /**(必填)周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**(必填)周期IDID*/
    termId: number;
    /**(必填)周期名称 合作项目名称(项目推广名)+周期时间*/
    termName: string;
    /**(必填)项目周期阶段 SUBSCRIPTION-认购(默认)、RECOGNIZE-认筹(Subscription-认购(默认)、Recognize-认筹)*/
    termStageEnum: string;
    /**(必填)周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
    /**联动业务总开展期数*/
    totalCount: number;
}
/**TermVO*/
export interface TermVO {
    /**审核状态   CONDUCT-审核中 ADOPT-审核通过 REJECT-审核驳回(Draft-草稿、Conduct-审核中、Adopt-审核通过、Reject-审核驳回)*/
    auditEnum: string;
    /**业务类型 NEW-新房(默认)、FINISHED-产成品(New-新房、Finished-产成品)*/
    busTypeEnum: string;
    /**市*/
    city: string;
    /**区*/
    district: string;
    /**(必填)项目推广名*/
    proName: string;
    /**项目编号*/
    proNo: string;
    /**省*/
    province: string;
    /**周期结束时间(yyyy-MM-dd HH:mm:ss)*/
    termEnd: string;
    /**立项ID*/
    termId: number;
    /**周期名称 合作项目名称(项目推广名)+周期时间*/
    termName: string;
    /**周期起始时间(yyyy-MM-dd HH:mm:ss)*/
    termStart: string;
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
/**URI_1*/
export interface URI_1 {
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
/**URL_1*/
export interface URL_1 {
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
/**一手公司代理*/
export interface 一手公司代理 {
    /**一手公司代理ID*/
    agencyId: number;
    /**公司名称*/
    agencyName: string;
    /**区*/
    area: string;
    /**市*/
    city: string;
    /**信用代码*/
    creditCode: string;
    /**项目一手公司代理ID*/
    proAgencyId: number;
    /**省*/
    province: string;
    /**简称*/
    simpleName: string;
}
