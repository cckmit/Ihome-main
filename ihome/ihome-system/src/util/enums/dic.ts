/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-05 11:51:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-10 09:59:34
 */
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



