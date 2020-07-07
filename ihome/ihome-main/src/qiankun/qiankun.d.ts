/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 14:38:33
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-28 16:01:49
 */
/**注册子应用配置项
 * @param {type} 
 * @return: 
 */
export interface IRegisterApp<IProps> {
    /**路由前缀
     * @param {type} 
     * @return: 
     */
    routerPrefix: string,
    /**端口
     * @param {type} 
     * @return: 
     */
    port: number,
    /**部署目录
     * @param {type} 
     * @return: 
     */
    publicPath: string,
    /**ip或域名
     * @param {type} 
     * @return: 
     */
    ip: string,
    /**传递数据，回调
     * @param {type} 
     * @return: 
     */
    props: IProps
}
export interface IProps<IPropsData> {
    /**数据
     * @param {type} 
     * @return: 
     */
    data: IPropsData;
    /**回调
     * @param {type} 
     * @return: 
     */
    fns: object
}
export interface IPropsData {
    /**tokem登录凭证
     * @param {type} 
     * @return: 
     */
    token: string,
    /**登录账号的用户信息
     * @param {type} 
     * @return: 
     */
    userInfo: any

}

export interface IFns {
    /**回调方法名称
     * @param {type} 
     * @return: 
     */
    name: string;
}