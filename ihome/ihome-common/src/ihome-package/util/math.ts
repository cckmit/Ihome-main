/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-14 14:27:51
 * @LastEditors: zyc
 * @LastEditTime: 2021-03-03 14:07:02
 */


export interface MathInterface {
    /**小数的四舍五入，默认2位
     * @param {*}
     * @return {*}
     */
    tofixed(number: number, n: number): number;
    /**加法
     * @param {*}
     * @return {*}
     */
    add(num1: number, num2: number): number;
    /**加法-数组，多个相加
     * @param {*}
     * @return {*}
     */
    addArr(arr: number[]): number;
    /**减法
     * @param {*}
     * @return {*}
     */
    sub(num1: number, num2: number): number;
    /**乘法
     * @param {*}
     * @return {*}
     */
    multi(num1: number, num2: number): number;
    /**除法
     * @param {*}
     * @return {*}
     */
    div(num1: number, num2: number): number;
}

export class MyMath implements MathInterface {
    /**加法-数组，多个相加
     * @param {*}
     * @return {*}
     */
    addArr(arr: number[]): number {
        if (arr.length == 1) {
            return arr[0];
        } else if (arr.length == 2) {
            return this.add(arr[0], arr[1])
        } else if (arr.length == 0) {
            console.error('数组长度为0,返回0');
            return 0;
        } else {
            let total = 0;
            arr.forEach((item: number) => {
                total = this.add(total, this.add(0, item));
            });
            return total;
        }
    }
    /**除法
     * @param {number} num1
     * @param {number} num2
     * @return {*}
     */
    div(num1: number, num2: number): number {
        let baseNum1 = 0, baseNum2 = 0;
        let baseNum3, baseNum4;
        try {
            let arr = num1.toString().split(".");
            if (arr.length <= 1) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length <= 1) {
                baseNum2 = 0;
            } else {
                baseNum2 = arr[1].length;
            }

        } catch (e) {
            baseNum2 = 0;
        }
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
    }
    /**乘法
     * @param {number} num1
     * @param {number} num2
     * @return {*}
     */
    multi(num1: number, num2: number): number {
        let baseNum = 0;
        try {
            let arr = num1.toString().split(".");
            if (arr.length > 1) {
                baseNum += arr[1].length;
            }

        } catch (e) {
            console.error(e);
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length > 1) {
                baseNum += arr[1].length;
            }

        } catch (e) {
            console.error(e);
        }
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    }
    /**减法
     * @param {number} num1
     * @param {number} num2
     * @return {*}
     */
    sub(num1: number, num2: number): number {
        let baseNum, baseNum1, baseNum2;
        let precision;// 精度
        try {
            let arr = num1.toString().split(".");
            if (arr.length <= 1) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }

        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length <= 1) {
                baseNum2 = 0;
            } else {
                baseNum2 = arr[1].length;
            }
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        let a = this.multi(num1, baseNum) - this.multi(num2, baseNum);
        let t = (this.div(a, baseNum)).toFixed(precision);
        return Number(t);
    }
    /**加法
    * @param {*}
    * @return {*}
    */
    add(num1: number, num2: number): number {
        let baseNum, baseNum1, baseNum2;
        try {
            let arr = num1.toString().split(".");
            if (arr.length <= 1) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }

        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length <= 1) {
                baseNum2 = 0;
            } else {
                baseNum2 = arr[1].length;
            }

        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        let b = (this.multi(num1, baseNum) + this.div(num2, baseNum));
        let r = this.div(b, baseNum);
        return r;
    }

    tofixed(number: number, n = 2): number {
        if (n > 20 || n < 0) {
            throw new RangeError('toFixed() digits argument must be between 0 and 20');
        }
        if (isNaN(number) || number >= Math.pow(10, 21)) {
            return Number(number);
        }
        if (typeof (n) == 'undefined' || n == 0) {
            return Number(Math.round(number))
        }
        let result: any = number.toString();
        const arr = result.split('.');
        // 整数的情况
        if (arr.length < 2) {
            result += '.';
            for (let i = 0; i < n; i += 1) {
                result += '0';
            }
            return Number(result);
        }
        const integer = arr[0];
        const decimal = arr[1];
        if (decimal.length == n) {
            return Number(result);
        }
        if (decimal.length < n) {
            for (let i = 0; i < n - decimal.length; i += 1) {
                result += '0';
            }
            return Number(result);
        }
        result = integer + '.' + decimal.substr(0, n);
        const last = decimal.substr(n, 1);
        // 四舍五入，转换为整数再处理，避免浮点数精度的损失
        if (parseInt(last, 10) >= 5) {
            const x = Math.pow(10, n);
            if (result.startsWith("-") && parseFloat(result) === 0) {
                result = (Math.round((parseFloat(result) * x)) + 1) / x;
                result = result * -1;
                result = result.toFixed(n);
            } else {
                result = (Math.round((parseFloat(result) * x)) + 1) / x;
                result = result.toFixed(n);
            }

        }
        return Number(result);
    }

}

