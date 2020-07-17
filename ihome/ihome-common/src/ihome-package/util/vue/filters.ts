/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-16 08:55:55
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-16 08:58:13
 */
export default (Vue: any, vm: any) => {
    Vue.filter('sex', function (value: any) {
        let result = '';
        if (value == 1) {
            result = '男'
        } else if (value == 2) {
            result = '女'
        }
        return result;
    })

};
