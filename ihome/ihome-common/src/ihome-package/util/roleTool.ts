/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-26 10:19:00
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-27 08:43:26
 */


import { RoleCode } from './code-constant'
export interface RoleToolInterface {

    /**用户是否包含某个岗位
        * @param {*}
        * @return {*}
        */
    hasJob(code: string): boolean;
    /**用户是否包含某个资源
     * @param {*}
     * @return {*}
     */
    hasResource(code: string): boolean;
    /**用户是否包含某个角色
     * @param {*}
     * @return {*}
     */
    hasRole(code: string): boolean;


    /**是否包含【总部业务管理角色】
     * @param {*}
     * @return {*}
     */
    RHeadBusinessManagement(): boolean;

    /**是否包含【分公司业务管理角色】
    * @param {*}
    * @return {*}
    */
    RBusinessManagement(): boolean;

    /**是否包含【文员】
     * @param {*}
     * @return {*}
     */
    RFrontLineClerk(): boolean;

    /**是否包含【平台文员】
    * @param {*}
    * @return {*}
    */
    RPlatformClerk(): boolean;





}
export class RoleTool implements RoleToolInterface {
    /**是否包含【总部业务管理角色】
    * @param {*}
    * @return {*}
    */
    RHeadBusinessManagement(): boolean {
        return this.hasRole(RoleCode.RHeadBusinessManagement);
    }
    /**是否包含【分公司业务管理角色】
    * @param {*}
    * @return {*}
    */
    RBusinessManagement(): boolean {
        return this.hasRole(RoleCode.RBusinessManagement);
    }
    /**是否包含【文员】
     * @param {*}
     * @return {*}
     */
    RFrontLineClerk(): boolean {
        return this.hasRole(RoleCode.RFrontLineClerk);
    }
    /**是否包含【平台文员】
    * @param {*}
    * @return {*}
    */
    RPlatformClerk(): boolean {
        return this.hasRole(RoleCode.RPlatformClerk);
    }

    /**用户是否包含某个角色
     * @param {string} code
     * @return {*}
     */
    hasRole(code: string): boolean {
        let roleList = (window as any).polyihomeData.userInfo?.roleList?.map((item: any) => { return item.code }) || [];
        return roleList.includes(code);
    }

    /**用户是否包含某个岗位
     * @param {string} code
     * @return {*}
     */
    hasJob(code: string): boolean {
        throw new Error("未实现");
    }
    /**用户是否包含某个资源
     * @param {string} code
     * @return {*}
     */
    hasResource(code: string): boolean {
        throw new Error("未实现");
    }



}