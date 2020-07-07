/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 09:50:42
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-24 09:50:55
 */ 
/**接口返回模型
 * @param {type}
 * @return:
 */
export interface IRes<T> {
    /**状态码
     * @param {type}
     * @return:
     */
    code: number;
    /**返回数据
     * @param {type}
     * @return:
     */
    data: T,
    /**信息
     * @param {type}
     * @return:
     */
    msg: string,
    /**异常
     * @param {type}
     * @return:
     */
    ex: any
  }
  
  /**列表返回数据模型
   * @param {type}
   * @return:
   */
  export interface IPageList<T> {
    /**总数
     * @param {type}
     * @return:
     */
    total: number;
    /**列表内容
     * @param {type}
     * @return:
     */
    list: T[]
  }
  
  /**用户信息返回集合
   * @param {type}
   * @return:
   */
  export interface IUser {
    /**用户信息
     * @param {type}
     * @return:
     */
    user: IUserInfo
  }
  
  export interface pageObj {
  
  }
  
  /**用户信息字段
   * @param {type}
   * @return:
   */
  export interface IUserInfo {
    /**头像
     * @param {type}
     * @return:
     */
    avatar: string
    /**id
     * @param {type}
     * @return:
     */
    id: number
    /**
     * 介绍
     * @param {type}
     * @return:
     */
    introduction: string
    /**姓名
     * @param {type}
     * @return:
     */
    name: string
    /**密码
     * @param {type}
     * @return:
     */
    password: string
    /**手机号码
     * @param {type}
     * @return:
     */
    phone: string
    /**角色
     * @param {type}
     * @return:
     */
    roles: string[]
    /**用户名
     * @param {type}
     * @return:
     */
    username: string
  }
  
  /**测试
   * @param {type}
   * @return:
   */
  export interface ITest {
    /**编号
      * @param {type}
      * @return:
      */
    id: number;
    /**姓名
     * @param {type}
     * @return:
     */
    name: string;
  }
  