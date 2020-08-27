/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-27 11:23:56
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-27 15:01:47
 */
 
 
let set=new Set();//uid存储
export function NoRepeatHttp(logId?: string, hander?: Function) {
    const loggerInfo = Object.seal({ logId: logId, input: '', output: '', custom: '' });

    return function (target: any,
        key: string,
        descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {

        const oldValue = descriptor.value;
       
        descriptor.value = function () {
            
            const args: Array<any> = [];
            for (let index in arguments) {
                args.push(arguments[index]);
            }
            loggerInfo.input = `${key}(${args.join(',')})`;
            let componentName= target.constructor.name
            
            let uid=`${window.location.pathname}__${componentName}__${key}`;//将当前路径+组件名称+方法作为唯一标识uid，uid相同内只发一次请求
            // console.log(uid)
            if (!set.has(uid)) {
                set.add(uid)
                new Promise((resolve, reject) => {
                    (reject)
                    const value = oldValue.apply(this, arguments);
                    return resolve(value)

                }).then((value: any) => {
                    set.delete(uid)
                    loggerInfo.output = value;
                    hander && (loggerInfo.custom = hander(loggerInfo.input, loggerInfo.output) || '');

                }).catch((err) => {
                    set.delete(uid)
                })

            } else {
                hander && (loggerInfo.custom = hander(loggerInfo.input, loggerInfo.output) || '');
            }
        }
        return descriptor;
    }
}