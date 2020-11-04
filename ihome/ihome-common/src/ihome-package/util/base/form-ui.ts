/*
 * @Description: element-UI表单校验常用方法  { validator: xxxx, trigger: "change" }
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-15 10:31:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-04 11:49:34
 */
/**手机号码校验（大陆及港澳台）*/
export function phoneValidator(rule: any, value: any, callback: any) {
    let reg = /^[1][3-9]\\d{9}$|([6|9])\\d{7}$|6\\d{7}$|[0][9]\\d{8}$/
    if (!(reg.test(value))) {
        callback(new Error('请输入有效手机号码'))
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

/**邮箱（必填）*/
export function emailValidato(rule: any, value: any, callback: any) {
    let reg = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    if (!reg.test(value)) {
        callback(new Error('邮箱格式有误'))
        return;
    } else {
        callback();
    }
}
/**邮箱（可空）*/
export function emailOrNullValidato(rule: any, value: any, callback: any) {
    if (value) {
        emailValidato(rule, value, callback);
    } else {
        callback();
    }
}
/**
 * @description: 请勿输入特殊字符
 * @param {any} rule
 * @param {any} value
 * @param {any} callback
 * @return {*}
 */
export function validForbid(rule: any, value: any, callback: any) {
    const reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g
    if (reg.test(value)) {
        callback(new Error('请勿输入特殊字符'));
        return
    } else {
        callback();
    }
}
/**
 * @description: 请输入有效的证件号
 * @param {any} rule
 * @param {any} value
 * @param {any} callback
 * @return {*}
 */
export function validIdentityCard(rule: any, value: any, callback: any) {
    const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
    if (!reg.test(value)) {
        callback(new Error('请输入有效的证件号'));
    } else {
        callback();
    }
}