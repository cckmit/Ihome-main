/*
 * @Descripttion: element-UI表单校验常用方法  { validator: xxxx, trigger: "change" }
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-15 10:31:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-05 10:42:58
 */

/**大陆手机号码校验*/
export function phoneValidator(rule: any, value: any, callback: any) {
    let reg = /^1[3456789]\d{9}$/
    if (!(reg.test(value))) {
        callback(new Error('请输入11位有效手机号码'))
        return false;
    } else {
        callback();
    }
}

/**字母*/
export function isLetterValidato(rule: any, value: any, callback: any) {
    let zmReg = /^[a-zA-Z]*$/;
    if (value != "" && !zmReg.test(value)) {
        callback(new Error('请输入英文字母'))
        return;
    } else {
        callback();
    }
}
/**大写字母*/
export function isUpperLetterValidato(rule: any, value: any, callback: any) {
    let zmReg = /^[A-Z]*$/;
    if (value != "" && !zmReg.test(value)) {
        callback(new Error('请输入大写英文字母'))
        return;
    } else {
        callback();
    }
}
/**小写字母*/
export function isLowerLetterValidato(rule: any, value: any, callback: any) {
    let zmReg = /^[a-z]*$/;
    if (value != "" && !zmReg.test(value)) {
        callback(new Error('请输入小写英文字母'))
        return;
    } else {
        callback();
    }
}


/**中文*/
export function isChineseValidato(rule: any, value: any, callback: any) {
    let reg = /^[\u0391-\uFFE5]+$/;
    if (value != "" && !reg.test(value)) {
        callback(new Error('请输入中文'))
        return;
    } else {
        callback();
    }
}

/**数字*/
export function isNumberValidato(rule: any, value: any, callback: any) {
    let reg = /^[0-9]+$/;
    if (value != "" && !reg.test(value)) {
        callback(new Error('只能输入数字！'))
        return;
    } else {
        callback();
    }
}

/**不允许空格数字*/
export function noTrim(rule: any, value: any, callback: any) {
    let reg = /(^\s+)|(\s+$)|\s+/g;
    if (reg.test(value)) {
        callback(new Error('请勿输入空格'))
        return;
    } else {
        callback();
    }
}