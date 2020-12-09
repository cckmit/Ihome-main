/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-09 16:38:00
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-07 15:30:44
 */
export interface ToolInterface {
    /**深度拷贝
     * @param {type} 
     * @return: 
     */
    deepClone(source: any): any;
    /**列表转分组
    * @param {type} list：config={},config.id=列表中的id，config.children=分组的key，rootId=根节点的父级id值
    * @return: 分组数据
    */
    listToGruop(list: any[], config: any): any;

    /**判断两个值是否相等
     * @param {type} 
     * @return: 
     */
    eq(val1: number, val2: number, decimal?: number): boolean;

    /**今天的字符串格式年月日
     * @param {type} 
     * @return {type} 
     */
    todayStr(format?: string): string;
    /**获取当前时间+n天yyyy-MM-dd字符串
     * @param {*}
     * @return {*}
     */
    currentAddDay(num: number): string;
    /**今天的字符串格式年月日时分秒
     * @param {type} 
     * @return {type} 
     */
    todayLongStr(format?: string): string;
    /**获取预览文件路径(fid,width?,height?)
     * @param {type} 
     * @return {type} 
     */
    getFileUrl(fid: number | string, width?: number | string, height?: number | string): string;
    /**获取下载的文件路径
     * @param {type} 
     * @return {type} 
     */
    downloadFileUrl(fid: number | string): string;
    /**复制文本
     * @param {*}
     * @return {*}
     */
    coptText(text: any, callback: Function): any;

}
export class Tool implements ToolInterface {

    /**获取当前时间+n天yyyy-MM-dd字符串
    * @param {type} 
    * @return {type} 
    */
    currentAddDay(num = 0): string {
        let today = new Date(new Date().getTime() + num * 24 * 3600 * 1000);
        let year = today.getFullYear();
        let month: any = today.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        // let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
        // let mins = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
        // let secs = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
        let result = `${year}-${month}-${day}`
        return result;
    }
    /**获取下载的文件路径
     * @param {type} 
     * @return {type} 
     */
    downloadFileUrl(fid: string | number): string {
        let url = `/sales-document-cover/file/download/{${fid}}`;
        return url;
    }
    /**获取预览文件路径(fid,width?,height?)
   * @param {type} 
   * @return {type} 
   */
    getFileUrl(fid: string | number, width?: string | number, height?: string | number): string {
        if (width && height) {
            //缩略图
            let url = `/sales-document-cover/image/thumbnail/{${fid}}/{${width}}/{${height}}`;
            return url;
        } else {
            //文件路径
            let url = `/sales-document-cover/file/browse/{${fid}}`;
            return url;
        }
    }
    /**今天的字符串格式年月日时分秒
     * @param {type} 
     * @return {type} 
     */
    todayLongStr(format = 'yyyy-MM-dd HH:mm:ss'): string {
        if (format == 'yyyy-MM-dd HH:mm:ss') {
            let today = new Date();
            let year = today.getFullYear();
            let month: any = today.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
            let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
            let mins = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
            let secs = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
            let result = `${year}-${month}-${day} ${hours}:${mins}:${secs}`
            return result;

        } else {
            throw new Error("暂时只支持yyyy-MM-ddd,yyyy-MM-dd HH:mm:ss格式");
        }
    }
    /**今天的字符串格式年月日
     * @param {type} 
     * @return {type} 
     */
    todayStr(format = 'yyyy-MM-dd'): string {
        if (format == 'yyyy-MM-dd') {
            let today = new Date();
            let year = today.getFullYear();
            let month: any = today.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
            // let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
            // let mins = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
            // let secs = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
            let result = `${year}-${month}-${day}`
            return result;

        } else {
            throw new Error("暂时只支持yyyy-MM-ddd格式");
        }


    }
    /**判断两个值是否相等,误差
    * @param {type} 
    * @return: 
    */
    eq(val1: number, val2: number, decimal = 0.0000001): boolean {

        if (Math.abs(val1 - val2) < decimal) {
            return true;
        } else {
            return false;
        }
    }
    /**深度拷贝
     * @param {type} 
     * @return: 
     */
    deepClone(source: any) {
        const targetObj: any = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
        for (let keys in source) { // 遍历目标
            if (source.hasOwnProperty(keys)) {
                if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = this.deepClone(source[keys]);
                } else { // 如果不是，就直接赋值
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    }

    /**列表转分组
     * @param {type} list：config={};
     * config.id=id列表中的id;
     * config.children=children分组的key;
     * config.parentId=parentId父级id的key;
     * rootId=根节点的父级id值
     * @return: 
     */
    listToGruop(list: any[], config: any) {
        const defaultConfig = {
            id: 'id',
            children: 'children',
            parentId: 'parentId',
            rootId: null
        }
        Object.assign(defaultConfig, config)
        let tree = [];
        let temp;
        for (let i = 0; i < list.length; i++) {
            if (list[i][defaultConfig.parentId] == defaultConfig.rootId) {
                let obj = list[i];
                temp = this.listToGruop(list, {
                    id: defaultConfig.id,
                    children: defaultConfig.children,
                    parentId: defaultConfig.parentId,
                    rootId: obj[defaultConfig.id],
                });
                if (temp.length > 0) {
                    obj[defaultConfig.children] = temp;
                }
                tree.push(obj);
            }
        }
        return tree;

    }
    /**复制文本
   * @param {*}
   * @return {*}
   */
    coptText(text: any, callback: Function) {
        let value = text.replace(/\s+/g, "");
        let element = document.createElement("SPAN");
        element.textContent = value;
        document.body.appendChild(element);
        if ((document as any).selection) {
            let range = (document.body as any).createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if ((window as any).getSelection) {
            let range = document.createRange();
            range.selectNode(element);
            (window as any).getSelection().removeAllRanges();
            (window as any).getSelection().addRange(range);
        }
        document.execCommand("Copy");
        element.remove ? element.remove() : (element as any).removeNode(true);
        callback && callback();
    }
}