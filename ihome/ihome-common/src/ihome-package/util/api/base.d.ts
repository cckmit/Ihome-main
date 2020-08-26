/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 17:39:52
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-26 10:10:11
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

/**列表返回数据模型*/
export interface IPageInfo<T> {
  /**总数 */
  total: number;
  /**列表数据 */
  list: T[]
}
/**分页参数*/
export interface IPageBase {
  pageNum: number,
  pageSize: number,
}