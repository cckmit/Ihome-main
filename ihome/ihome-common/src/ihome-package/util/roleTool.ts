/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-26 10:19:00
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-16 17:58:06
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

    /**是否包含【案场岗】
     * @param {*}
     * @return {*}
     */
    RProjectSite(): boolean;

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

    /**是否包含【事业部负责人】
    * @param {*}
    * @return {*}
    */
    RDepartmentLeader(): boolean;

    /**是否包含【渠道专员角色】
     * @param {*}
     * @return {*}
     */
    RChannelStaff(): boolean;

    /**是否包含【行政角色】
     * @param {*}
     * @return {*}
     */
    ROffice(): boolean;

    /**是否包含【行政角色】
     * @param {*}
     * @return {*}
     */
    RContractManager(): boolean;

    /**是否包含【分公司财务】
     * @param {*}
     * @return {*}
     */
    RFinancialOfficer(): boolean;
    /**是否包含【总公司财务】
     * @param {*}
     * @return {*}
     */
    RHeadFinancialOfficer(): boolean;
    /**是否包含【出纳】
     * @param {*}
     * @return {*}
     */
    RFinanceCashier(): boolean;
    /**是否包含【资金岗角色】
     * @param {*}
     * @return {*}
     */
    RFinanceFund(): boolean;
    /**是否包含【开票员角色】
     * @param {*}
     * @return {*}
     */
    RInvoiceClerk(): boolean;


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
    /**是否包含【案场岗】
     * @param {*}
     * @return {*}
     */
    RProjectSite(): boolean {
        return this.hasRole(RoleCode.RProjectSite);
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
    /**是否包含【事业部负责人】
     * @param {*}
     * @return {*}
     */
    RDepartmentLeader(): boolean {
        return this.hasRole(RoleCode.RDepartmentLeader);
    }
    /**是否包含【渠道专员】
    * @param {*}
    * @return {*}
    */
    RChannelStaff(): boolean {
        return this.hasRole(RoleCode.RChannelStaff);
    }
    /**是否包含【行政】
    * @param {*}
    * @return {*}
    */
    ROffice(): boolean {
        return this.hasRole(RoleCode.ROffice);
    }
    /**是否包含【合同管理员】
    * @param {*}
    * @return {*}
    */
    RContractManager(): boolean {
        return this.hasRole(RoleCode.RContractManager);
    }
    /**是否包含【分公司财务】
    * @param {*}
    * @return {*}
    */
    RFinancialOfficer(): boolean {
        return this.hasRole(RoleCode.RFinancialOfficer);
    }
    /**是否包含【总公司财务】
    * @param {*}
    * @return {*}
    */
    RHeadFinancialOfficer(): boolean {
        return this.hasRole(RoleCode.RHeadFinancialOfficer);
    }
    /**是否包含【出纳】
    * @param {*}
    * @return {*}
    */
    RFinanceCashier(): boolean {
        return this.hasRole(RoleCode.RFinanceCashier);
    }
    /**是否包含【资金岗角色】
    * @param {*}
    * @return {*}
    */
    RFinanceFund(): boolean {
        return this.hasRole(RoleCode.RFinanceFund);
    }
    /**是否包含【开票员角色】
    * @param {*}
    * @return {*}
    */
    RInvoiceClerk(): boolean {
        return this.hasRole(RoleCode.RInvoiceClerk);
    }


    /**用户是否包含某个角色
     * @param {string} code
     * @return {*}
     */
    hasRole(code: string): boolean {
        let roleList = (window as any).polyihomeData.userInfo?.roleList?.map((item: any) => { return item.code }) || [];
        if(roleList.includes("RAdmin")|| (window as any).polyihomeData.userInfo?.account=='admin'){
            //RAdmin角色或admin账号返回true
            return true;
        }else{
            return roleList.includes(code);
        }
    }

    /**用户是否包含某个岗位
     * @param {string} code
     * @return {*}
     */
    hasJob(code: string): boolean {
        console.log(code);
        throw new Error("未实现");
    }
    /**用户是否包含某个资源
     * @param {string} code
     * @return {*}
     */
    hasResource(code: string): boolean {
        console.log(code);
        throw new Error("未实现");
    }



}