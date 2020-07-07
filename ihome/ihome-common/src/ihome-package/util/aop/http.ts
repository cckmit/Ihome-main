/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-25 17:31:42
 * @LastEditors: zyc
 * @LastEditTime: 2020-05-30 17:11:28
 */

export function Http(logId?: string, hander?: Function) {
    const loggerInfo = Object.seal({ logId: logId, input: '', output: '', custom: '' });
    // const channelName = '__logger';
    // const msgChannel = postal.channel(channelName);
    // msgChannel.subscribe(logId, logData => {
    //     // 根据业务逻辑来处理日志
    //     console.log(logData);
    // });
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
            new Promise((resolve, reject) => {
                (reject)
                const value = oldValue.apply(this, arguments);
                return resolve(value)
            }).then((value: any) => {
                loggerInfo.output = value;
                hander && (loggerInfo.custom = hander(loggerInfo.input, loggerInfo.output) || '');
                // 被调用时，会自动发出一个事件
                // msgChannel.publish(logId, loggerInfo);
            }).catch((err) => {
                console.log(err)
            })
        }
        return descriptor
    }
}