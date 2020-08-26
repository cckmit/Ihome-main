/* 
 * @Descripttion: 子应用注册
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 11:42:52
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-26 09:48:47
 */
import { RegistrableApp, LoadableApp, FrameworkLifeCycles } from "qiankun"
import { IRegisterApp, IProps, IPropsData } from './qiankun.d'
import { UserModule } from "../store/modules/user";
import { RawLocation } from 'vue-router'
import router from '../router/index'

/**路由监听
 * @param {type} 前缀
 * @return: 
 */
function genActiveRule(routerPrefix: string) {
    return (location: Location) => location.pathname.startsWith(routerPrefix);
}

/**传入子应用的数据
 * @param {type} 
 * @return: 
 */
const baseProps: IProps<IPropsData> = {
    data: { token: UserModule.token, userInfo: {} },
    fns: {
        /** 跨子应用跳转， this.$router.push({ path: "/xx" });
         * @param {type} 
         * @return: 
         */
        gotoApp(location: RawLocation) {
            // router.replace(location);
            console.log(location)
            router.push(location);
        },
        login(data: any) {
            console.log(`login父应用返回信息${data}`);
        },
        loginOut(data: any) {
            console.log(`loginOut父应用返回信息${data}`);
        }
    }
};

/** baseProps作为公共，各app各种独立配置后合并
 * @param {type} 
 * @return: 
 */
let props = Object.assign(baseProps)

const devArray: Array<IRegisterApp<IProps<IPropsData>>> = [{
    routerPrefix: 'web-common',
    publicPath: '/web-common/',
    port: 8084,
    ip: 'localhost',
    props: props
},
{
    routerPrefix: 'web-system',
    publicPath: '/web-system/',
    port: 8085,
    ip: 'localhost',
    props: props
},
{
    routerPrefix: 'web-sales',
    publicPath: '/web-sales/',
    port: 8086,
    ip: 'localhost',
    props: props
}];
const proArray: Array<IRegisterApp<IProps<IPropsData>>> = [{
    routerPrefix: 'web-common',
    publicPath: '/web-common/',
    port: 2002,
    ip: '10.188.0.139',
    props: props
},
{
    routerPrefix: 'web-system',
    publicPath: '/web-system/',
    port: 2002,
    ip: '10.188.0.139',
    props: props
},
{
    routerPrefix: 'web-sales',
    publicPath: '/web-sales/',
    port: 2002,
    ip: '10.188.0.139',
    props: props
}];

const apps: Array<RegistrableApp<any>> = (process.env.NODE_ENV === 'production' ? proArray : devArray).map((item) => {
    let r: RegistrableApp<any> = {
        name: `ihome-${item.routerPrefix.replace('/', '-')}`,
        entry: `//${item.ip}:${item.port}${item.publicPath}`,
        container: `#root-ihome-${item.routerPrefix.replace('/', '-')}`,
        activeRule: genActiveRule(`/${item.routerPrefix}`),
        props: item.props
    }
    return r;
})

const lifeCycles: FrameworkLifeCycles<RegistrableApp> = {
    beforeLoad: [
        (app: LoadableApp<RegistrableApp>) => {
            return (<any>app);
        }
    ],
    beforeMount: [
        (app: LoadableApp<RegistrableApp>) => {
            return (<any>app);
        }
    ],
    afterMount: [
        (app: LoadableApp<RegistrableApp>) => {
            return (<any>app);
        }
    ],
    beforeUnmount: [
        (app: LoadableApp<RegistrableApp>) => {
            return (<any>app);
        }
    ],
    afterUnmount: [
        (app: LoadableApp<RegistrableApp>) => {
            return (<any>app);
        }
    ],
}
export { apps, lifeCycles };