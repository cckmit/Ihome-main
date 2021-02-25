/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-26 17:02:03
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-25 11:16:30
 */
export default (Vue: any) => {
    function has(el: any, binding: any) {
        let d = ((window as any).polyihomeData?.userInfo?.resourceList || []).filter((item: any) => {
            return item.type == 'Button';
        });//权限列表
        let list = d.map((item: any) => {
            return item.code;
        });
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
            el.className = el._prevClass + ' ih-has-disabled';
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

    });
    //该数据userId是否当前登录账号userId
    Vue.directive("my", {
        inserted(el: any, binding: any) {
            if (typeof binding.value == 'number') {
                let id = (window as any).polyihomeData?.userInfo?.id;
                if (binding.value == id) {
                    el.className = el._prevClass + '';
                } else {
                    el.className = el._prevClass + ' ih-my-disabled';
                }
            } else {
                console.error('数据格式必须为number；' + binding.value);
            }
        }
    });

    // v-dialogDrag: 弹窗拖拽
    Vue.directive('dialogDrag', {
        bind(el: any) {
            const dialogHeaderEl = el.querySelector('.el-dialog__header')
            const dragDom = el.querySelector('.el-dialog')
            dialogHeaderEl.style.cursor = 'move'

            // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

            dialogHeaderEl.onmousedown = (e: any) => {
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX = e.clientX - dialogHeaderEl.offsetLeft
                const disY = e.clientY - dialogHeaderEl.offsetTop

                // 获取到的值带px 正则匹配替换
                let styL: any, styT: any;

                // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                if (sty.left.includes('%')) {
                    styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
                    styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
                } else {
                    styL = +sty.left.replace(/\px/g, '')
                    styT = +sty.top.replace(/\px/g, '')
                }

                document.onmousemove = function (e) {
                    // 通过事件委托，计算移动的距离
                    const l = e.clientX - disX
                    const t = e.clientY - disY

                    // 移动当前元素
                    dragDom.style.left = `${l + styL}px`
                    dragDom.style.top = `${t + styT}px`

                    // 将此时的位置传出去
                    // binding.value({x:e.pageX,y:e.pageY})
                }

                document.onmouseup = function () {
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }
        }
    });

    // v-inputDigits：Input、inputNumber输入框输入位数限制
    Vue.directive("digits", {
        bind(el: any, binding: any) {
            const El = el.querySelector('.el-input__inner');
            el.inputListen = function () {
                if ([null, undefined, 0, ""].includes(binding.value)) {
                    // 只能输入数字
                    El.value = El.value.replace(/[^\d]/g, ""); // 清除"数字"和以外的字符
                } else if (binding.value > 0) {
                    // 只能输入规定小数位数的数字
                    // /^(\-)*(\d+)\.(\d{2}).*$/
                    El.value = El.value.replace(/[^\d.]/g, ""); // 清除"数字"和以外的字符
                    El.value = El.value.replace(/^\./g, ""); // 验证第一个字符是不是数字
                    El.value = El.value.replace(/\.{2,}/g, "."); // 只保留第一个"."
                    El.value = El.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); // 只保留第一个"."
                    let regDigits = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + binding.value + "}).*$");
                    El.value = El.value.replace(regDigits, '$1$2.$3');
                }
                // 重新赋值
                El.dispatchEvent(new Event('input'));
            }
            el.addEventListener('input', el.inputListen);

            function inputBlur() {
                El.value = El.value.replace(/\.$/g, ""); // 失焦后去除最后一个是"."的情况
                // 重新赋值
                El.dispatchEvent(new Event('input'));
            }
            El.addEventListener('blur', inputBlur);
        },
        unbind(el: any) {
            el.removeEventListener('input', el.inputListen);
        }
    });
};
