/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-30 17:13:05
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-06 14:54:45
 */

import Vue from "vue";
import 'axios'
import { ToolInterface } from './util/tool'
declare module "vue/types/vue" {
  interface Vue {
    component(name: string, component: any): any;
    $g: gVue;
    $http: http;
    $tool: ToolInterface;
    $setGlobalState: any;
    $qiankun: any;
  }

}
interface gVue {
  h: number;
  readonly $refs: any;
}
interface http {
  /**get请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  get(url: string): any;
  /**get请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  get(url: string, params: any | null): any;
  /**post请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  post(url: string): any;
  /**post请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  post(url: string, params: any): any;
  /**put请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  put(url: string): any;
  /**put请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  put(url: string, params: any): any;
  /**delete请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  delete(url: string): any;
  /**delete请求，需要在catch处理异常操作
  * @param {type} 
  * @return: 
  */
  delete(url: string, params: any): any;
  /**合并请求，需要在catch处理异常操作
   * @param {type} 
   * @return: 
   */
  all(...args: any): any;


  /**get请求，无需处理业务异常，自动弹出异常信息
 * @param {type} 
 * @return: 
 */
  $get(url: string): any;
  /**get请求，无需处理业务异常，自动弹出异常信息
  * @param {type} 
  * @return: 
  */
  $get(url: string, params: any): any;
  /**post请求，无需处理业务异常，自动弹出异常信息
 * @param {type} 
 * @return: 
 */
  $post(url: string): any;
  /**post请求，无需处理业务异常，自动弹出异常信息
   * @param {type} 
   * @return: 
   */
  $post(url: string, params: any): any;
  /**put请求，无需处理业务异常，自动弹出异常信息
  * @param {type} 
  * @return: 
  */
  $put(url: string): any;
  /**put请求，无需处理业务异常，自动弹出异常信息
   * @param {type} 
   * @return: 
   */
  $put(url: string, params: any): any;
  /*delete请求，无需处理业务异常，自动弹出异常信息
   * @param {type} 
   * @return: 
   */
  $delete(url: string): any;
  /*delete请求，无需处理业务异常，自动弹出异常信息
   * @param {type} 
   * @return: 
   */
  $delete(url: string, params: any): any;
  /**合并请求，无需处理业务异常，自动弹出异常信息
  * @param {type} 
  * @return: 
  */
  $all(...args: any): any;
  interceptors: any;
}