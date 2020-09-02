/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-09-02 16:51:51
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-02 17:10:01
 */

const steps: any = [
    {
        element: "#id1",
        popover: {
            title: "菜单导航",
            description: "点击菜单可切换右侧菜单内容",
            position: "bottom"
        }
    },
    {
        element: "#id2",
        popover: {
            title: "汉堡包",
            description: "点击收缩和展开菜单导航",
            position: "top"
        },
        padding: 5
    },
    {
        element: "#id3",
        popover: {
            title: "面包屑导航",
            description: "用于显示 当前导航菜单的位置",
            position: "bottom"
        }
    },
    {
        element: "#id4",
        popover: {
            title: "个人中心",
            description: "点击可操作",
            position: "bottom"
        }
    },
    {
        element: "#id8",
        popover: {
            title: "最近打开任务",
            description: "最近打开任务菜单，点击可快速切换",
            position: "bottom"
        }
    },
    {
        element: ".reset-btn",
        popover: {
            title: "重置",
            description: "重置表单",
            position: "bottom"
        }
    }
    
]

export default steps
