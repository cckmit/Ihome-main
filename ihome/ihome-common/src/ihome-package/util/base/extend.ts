/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-20 11:03:37
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-20 11:19:31
 */
// import "./extension.d";
Number.prototype.toFixed = function (n: number) {
    if (n > 20 || n < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    const num = Number(this);
    if (isNaN(num) || num >= Math.pow(10, 21)) {
        return num.toString();
    }
    if (typeof (n) == 'undefined' || n == 0) {
        return (Math.round(num)).toString();
    }

    let result: string | number = num.toString();
    const arr = result.split('.');

    // 整数的情况
    if (arr.length < 2) {
        result += '.';
        for (let i = 0; i < n; i += 1) {
            result += '0';
        }
        return result;
    }

    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (let i = 0; i < n - decimal.length; i += 1) {
            result += '0';
        }
        return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);

    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
        const x = Math.pow(10, n);
        result = (Math.round((parseFloat(result) * x)) + 1) / x;
        result = result.toFixed(n);
    }

    return result;
};