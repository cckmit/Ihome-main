/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 17:39:52
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-29 17:40:48
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