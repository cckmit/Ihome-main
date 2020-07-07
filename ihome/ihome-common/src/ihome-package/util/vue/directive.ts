/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-26 17:02:03
 * @LastEditors: zyc
 * @LastEditTime: 2020-05-27 14:46:56
 */
export default (Vue: any, vm: any) => {
    function has(el: any, binding: any) {
        let list = vm.$root.permissionsList;//权限列表
        let result = false;//是否有权限
        if (binding.value instanceof Array) {
            //数组类型
            let set1 = new Set(binding.value);
            let set2 = new Set(list);
            //交集
            let intersect = [...new Set([...set1].filter(x => set2.has(x)))];
            if (intersect.length == 0) {
                result = false;
            } else {
                result = true;
            }
        } else if (typeof binding.value == 'string') {
            //字符串类型
            result = list.includes(binding.value);
        } else {
            result = false;
            console.error('只支持数组或字符串:' + typeof binding.value)
        }
        if (result) {
            el.className = el._prevClass + '';
        } else {
            el.className = el._prevClass + ' ih-has-hide';
            // el.remove();  移除dom
        }
    }


    //权限控制按钮粒度
    Vue.directive("has", {
        inserted(el: any, binding: any) {
            has(el, binding)
        },
        update(el: any, binding: any) {
            has(el, binding)
        },
        // componentUpdated(el: any, binding: any, vnode: any, oldVnode: any) {
        //     console.log('componentUpdated');
        // },
        // bind(el: any, binding: any, vnode: any) {
        //     console.log('bind');
        // }
    });
};
