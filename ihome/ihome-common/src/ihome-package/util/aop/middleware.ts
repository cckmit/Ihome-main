/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-30 17:32:20
 * @LastEditors: zyc
 * @LastEditTime: 2020-05-30 17:42:21
 */
export function Middleware(logId?: string, hander?: Function) {
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
                let value = oldValue.apply(this, arguments);
                // value.push({ xxx: 'xxxxxxxxx' })
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