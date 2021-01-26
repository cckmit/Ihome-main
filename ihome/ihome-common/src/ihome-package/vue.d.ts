/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-30 17:13:05
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-26 10:26:11
 */

import Vue from "vue";
import 'axios'
import { ToolInterface } from './util/tool'
import { RawLocation, Route } from 'vue-router/types/router.d'
import { MathInterface } from './util/math'
import { RoleTool } from './util/roleTool'
declare module "vue/types/vue" {
  interface Vue {
    component(name: string, component: any): any;
    $g: gVue;
    $http: http;
    $tool: ToolInterface;
    $setGlobalState: any;
    $qiankun: any;
    /**运算，加减乘除，四舍五入
     * @param {*}
     * @return {*}
     */
    $math: MathInterface;
    /**判断用户是否包含某种角色或岗位
     * @param {*}
     * @return {*}
     */
    $roleTool: RoleTool;
    /**跳转，与this.$router.push用法一致
     * @param {*}
     * @return {*}
     */
    $goto(location: RawLocation): Promise<Route>;
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