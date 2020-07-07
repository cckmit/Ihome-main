/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-30 16:46:05
 * @LastEditors: zyc
 * @LastEditTime: 2020-05-30 17:10:31
 */
import { Loading } from 'element-ui';
/**
 * 全屏loading功能
 * @param {type} 
 * @return: 
 */
export function FullLoading(logId?: string, hander?: Function) {

    const loggerInfo = Object.seal({ logId: logId, input: '', output: '', custom: '' });

    return function (target: any,
        key: string,
        descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
        const oldValue = descriptor.value
        descriptor.value = function () {

            const args: Array<any> = [];
            for (let index in arguments) {
                args.push(arguments[index]);
            }
            loggerInfo.input = `${key}(${args.join(',')})`;


            let loading: any = null;
            new Promise((resolve, reject) => {
                (reject)
                loading = Loading.service({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                const value = oldValue.apply(this, arguments);
                return resolve(value)

            }).then((value: any) => {
                loading.close();

                loggerInfo.output = value;
                hander && (loggerInfo.custom = hander(loggerInfo.input, loggerInfo.output) || '');
                // 被调用时，会自动发出一个事件
                // msgChannel.publish(logId, loggerInfo);

            }).catch((err) => {
                console.log(err)
                loading.close();
            })



        }
        return descriptor
    }
}