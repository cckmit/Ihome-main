/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-09 16:38:00
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-04 10:17:03
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

}
export class Tool implements ToolInterface {
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
}