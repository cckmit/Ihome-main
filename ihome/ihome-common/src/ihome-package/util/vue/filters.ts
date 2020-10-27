/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-16 08:55:55
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-27 10:31:08
 */
export default (Vue: any, vm: any) => {
    (vm)
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
    /**
     * 时间戳转换日期时间
     * @param {*} dates 日期字符串、GMT时间、时间戳
     * @param {String} format 日期格式
     * @returns {String} YYYY-MM-DD hh:mm:ss
     */
    Vue.filter('timestampToDate', function (value: any, format: string) {
        format = format || "YYYY-MM-DD hh:mm:ss";
        let time = new Date();
        let month
        if (!value) return "-";
        if (/^[0-9]*$/.test(value) && typeof value === "number" && !isNaN(value)) {
            time = new Date(typeof value == "string" ? parseInt(value) : value);
            month = time.getMonth() + 1;
        } else {
            let d = value.match(/\w+|d+/g);
            time = new Date(d[0], d[1], d[2], d[3], d[4], d[5]);
            month = time.getMonth();
        }
        let digit = (num: number) => (num < 10 ? "0" + (num | 0) : num);
        let year = time.getFullYear();
        console.log(month, time, value)
        let date = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds(); // 秒 根据具体情况调用
        let dates: any = {
            YYYY: year,
            MM: digit(month),
            DD: digit(date),
            hh: digit(hour),
            mm: digit(minute),
            ss: digit(second),
        };
        return format.replace(new RegExp("YYYY|MM|DD|hh|mm|ss", "g"), function (
            val
        ) {
            return dates[val];
        });
    })

};
