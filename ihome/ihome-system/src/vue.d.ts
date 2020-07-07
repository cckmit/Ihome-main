/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 17:57:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-06 15:46:03
 */

import 'ihome-common/vue.d'
import Vue from "vue";
import { ToolInterface } from 'ihome-common/util/tool'

declare module "vue/types/vue" {
    interface Vue {
        /**工具类
         * @param {type} 
         * @return: 
         */
        $tool: ToolInterface
    }
}
 