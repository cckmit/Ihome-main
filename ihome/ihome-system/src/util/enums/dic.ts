/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-05 11:51:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-05 16:34:51
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
    Menu: '资源根节点',
    Api: 'API',
    Button: '按钮',
    Element: '元素'
}


// public modular: Dic[] = [
//     { value: 'Root', label: '资源根节点' },
//     { value: 'System', label: '系统' },
//     { value: 'Service', label: '服务模块' },
//     { value: 'Menu', label: '功能菜单' },
//     { value: 'Api', label: 'API' },
//     { value: 'Button', label: '按钮' },
//     { value: 'Element', label: '元素' },
// ];

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

