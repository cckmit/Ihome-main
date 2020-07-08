/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 10:41:39
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 11:29:21
 */

/**返回结果定义 */
export interface IRes<T> {
  /**状态码 */
  code: number;
  /**返回数据 */
  result: T,
  /**信息 */
  msg: string,
  /**异常 */
  ex: any
}

/**列表返回数据模型*/
export interface IPageList<T> {
  /**总数 */
  total: number;
  /**列表数据 */
  list: T[]
}

