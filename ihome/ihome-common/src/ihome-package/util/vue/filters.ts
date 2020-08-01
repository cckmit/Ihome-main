/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-16 08:55:55
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 10:09:46
 */
export default (Vue: any, vm: any) => {
    console.log(vm)
    Vue.filter('sex', function (value: any) {
        let result = '';
        if (value == 1) {
            result = '男'
        } else if (value == 2) {
            result = '女'
        }
        return result;
    })

    /**保留n位小数（不四舍五入）
     * @param {type} 
     * @return: 
     */
    Vue.filter('number', function (num: number | string, decimal = 2) {
        num = num.toString();
        let index = num.indexOf('.');
        if (index !== -1) {
            num = num.substring(0, decimal + index + 1)
        } else {
            num = num.substring(0)
        }
        return parseFloat(num).toFixed(decimal)
    })
    /**保留n位小数（四舍五入）
    * @param {type} 
    * @return: 
    */
    Vue.filter('toFixed', function (num: number | string, decimal = 2) {
        let n = parseFloat(num.toString());
        return n.toFixed(decimal)
    })

    Vue.filter('resourceType', function (value: any) {
        let result = null;
        //Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素
        switch (value) {
            case 'Root':
                result = '资源根节点'
                break;
            case 'System':
                result = '系统'
                break;
            case 'Service':
                result = '服务模块'
                break;
            case 'Menu':
                result = '功能菜单'
                break;
            case 'Api':
                result = 'API'
                break;
            case 'Button':
                result = '按钮'
                break;

            case 'Element':
                result = '元素'
                break;
            default:
                result = "";
        }
        return result;
    })

};
