/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-14 14:27:51
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-25 09:22:18
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
            if (arr.length == 0) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length == 0) {
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
            if (arr.length == 0) {
                baseNum = 0;
            } else {
                baseNum += arr[1].length;
            }

        } catch (e) {
            console.error(e);
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length == 0) {
                baseNum = 0;
            } else {
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
            if (arr.length == 0) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }

        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length == 0) {
                baseNum2 = 0;
            } else {
                baseNum2 = arr[1].length;
            }
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        let t = ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
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
            if (arr.length == 0) {
                baseNum1 = 0;
            } else {
                baseNum1 = arr[1].length;
            }

        } catch (e) {
            baseNum1 = 0;
        }
        try {
            let arr = num2.toString().split(".");
            if (arr.length == 0) {
                baseNum2 = 0;
            } else {
                baseNum2 = [1].length;
            }

        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    }

    tofixed(number: number, n = 2): number {
        /* eslint-disable no-irregular-whitespace */
        let multipe = Math.pow(10, n); //把一个数放大10的次方倍
        if (!isNaN(number)) {
            number = Math.round(number * multipe);//四舍五入
            //处理小数点
            let numberArr: any = number.toString().split("");
            if (numberArr.length < n + 1) {//当数值小于1的时候的处理方法
                for (let i = 0; i <= n + 1 - numberArr.length; i++) {
                    numberArr.splice(0, 0, "0");
                }
            }
            let numberStr: any = numberArr.splice(numberArr.length - n, 0, ".");  //给一个放大后的数的字符串插入小数点
            numberStr = numberArr.join("");
            if (parseFloat(numberStr) > -1 && parseFloat(numberStr) < 0) {
                numberStr = parseFloat(numberStr).toFixed(n).toString()
            }
            return Number(numberStr);
        } else {
            throw ('tool.tofixed方法只能对数字使用')
        }
    }

}

