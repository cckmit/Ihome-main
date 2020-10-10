import * as dicModular from '@/util/enums/dic';
export {dicModular};

/**组织类型
 * @param {type} 
 * @return {type} 
 */
export const orgType: any = {
    Company: '公司',
    Department: '部门'
}
/**部门分类
 * @param {type} 
 * @return {type} 
 */
export const departmentType: any = {
    Business: '营业线',
    Function: '职能线'
}
/**组织状态 
 * @param {type} 
 * @return {type} 
 */
export const orgStatus: any = {
    Valid: '有效',
    Invalid: '无效'
}
/**组织状态 
 * @param {type} 
 * @return {type} 
 */
export const modular: any = {
    // Root: '资源根节点',
    System: '系统',
    Service: '服务模块',
    Menu: '功能菜单',
    Api: 'API',
    Button: '按钮',
    Element: '元素'
}
/**用户类型   Ihome-爱家员工、Juheng-居恒员工、Poly-保顾兼职、Channel-渠道用户、Customer-个人客户、Outsourcing-劳务派遣
 * @param {type} 
 * @return {type} 
 */
export const accountType: any = {
    Ihome: '爱家员工',
    Juheng: '居恒员工',
    Poly: '保顾兼职',
    Channel: '渠道用户',
    Customer: '个人客户',
    Outsourcing: '劳务派遣'
}

//渠道管理专栏
/**渠道商名称  
 * @param {type} 
 * @return {type} 
 */
export const distributorsName: any = {
    ruijia: '上海瑞家信息技术有限公司',
}

/**渠道等级   bigPlatform-大平台、superPlatform-大型平台、firstPlatform-一级平台、middlePlatform-中型平台、secondPlatform-二级平台、smallMediation-小型中介
 * @param {type} 
 * @return {type} 
 */
export const ChannelLevel: any = {
    bigPlatform: '大平台',
    superPlatform: '大型平台',
    firstPlatform: '一级平台',
    middlePlatform: '中型平台',
    secondPlatform: '二级平台',
    smallMediation: '小型中介'
}
/**城市等级   firstLevel-一线城市、secondLevel-二线城市、thirdLevel-三线城市
 * @param {type} 
 * @return {type} 
 */
export const cityLevel: any = {
    firstLevel: '一线城市',
    secondLevel: '二线城市',
    thirdLevel: '三线城市'
}
/**业务开展省份   firstLevel-一线城市、secondLevel-二线城市、thirdLevel-三线城市
 * @param {type} 
 * @return {type} 
 */
export const BusinessDevProvince: any = {
    one: "广东省"
}
/**业务开展城市   firstLevel-一线城市、secondLevel-二线城市、thirdLevel-三线城市
 * @param {type} 
 * @return {type} 
 */
export const BusinessDevCity: any = {
    one: "广州市"
}
/**事业部   firstLevel-一线城市、secondLevel-二线城市、thirdLevel-三线城市
 * @param {type} 
 * @return {type} 
 */
export const division: any = {
    one: "爱家广州产成品及联动事业部"
}

/**状态   firstLevel-一线城市、secondLevel-二线城市、thirdLevel-三线城市
 * @param {type} 
 * @return {type} 
 */
export const state: any = {
    one: "之前",
    two: "之后"
}
/**录入人   firstLevel-一线城市、secondLevel-二线城市、thirdLevel-三线城市
 * @param {type} 
 * @return {type} 
 */
export const enterPeople: any = {
    one: "张三",
    two: "李四"
}

/**状态(Valid-有效、Invalid-无效)
 * @param {type} 
 * @return {type} 
 */
export const accountStatus: any = {
    Valid: '有效',
    Invalid: '无效',

}
/**雇员状态(On-在职、Leave-离职)
 * @param {type} 
 * @return {type} 
 */
export const employeeStatus: any = {
    On: '在职',
    Leave: '离职',
}

/**人员类型(Formal-正式工、Probation-试用、Practice-实习、Vacation-暑期工、Rehire-离职返聘)
 * @param {type} 
 * @return {type} 
 */
export const employeeType: any = {
    Formal: '正式工',
    Probation: '试用',
    Practice: '实习',
    Vacation: '暑期工',
    Rehire: '离职返聘',
}
/**职能类别(FrontLine-一线、NotFrontLine-非一线)
 * @param {type} 
 * @return {type} 
 */
export const workType: any = {
    FrontLine: '一线',
    NotFrontLine: '非一线',

}
/**获取列表工具类*/
export function getListTool(dic: any, config = { value: 'value', label: 'label' }) {
    let list: any = [];
    Object.keys(dic).forEach((key: any) => {
        let text = dic[key]
        let item: any = {};
        item[config.value] = key;
        item[config.label] = text;
        list.push(item);
    })
    return list;
}



