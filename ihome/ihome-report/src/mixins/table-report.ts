/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-24 17:08:03
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-15 10:11:17
 */
/* eslint-disable  no-console */
import { Vue, Component } from 'vue-property-decorator'

//当年第一天字符串
function startYearStr() {
    let today = new Date();
    let year = today.getFullYear();
    let result = `${year}-01-01`;
    return result;
}
//当年最后一天字符串
function endYearStr() {
    let today = new Date();
    let year = today.getFullYear();
    let result = `${year}-12-31`;
    return result;
}
//当月第一天字符串
function startMonthStr() {
    let today = new Date();
    let year = today.getFullYear();
    let month: any = today.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let result = `${year}-${month}-01`
    return result;
}
//当月最后一天字符串
function endMonthStr() {
    let today = new Date();
    let year = today.getFullYear();
    let month: any = today.getMonth() + 1;
    let lastMonthDay = new Date(year, month, 0);
    let y: any = lastMonthDay.getFullYear();
    let m: any = lastMonthDay.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d: any = lastMonthDay.getDate() < 10 ? '0' + lastMonthDay.getDate() : lastMonthDay.getDate();
    let result = `${y}-${m}-${d}`;
    return result;
}

/**
* mixins
*/
@Component
export default class TableReportMixin extends Vue {
    get emptyText() {
        return '暂无数据';
    }
    get cellStyle() {
        return { padding: '6px 0', 'text-align': 'center' };
    }
    get headerCellStyle() {
        return { padding: '6px 0', 'text-align': 'center' };
    }
    get height() {
        let pageHeight =
            (document.documentElement.clientHeight || document.body.clientHeight) - 190;

        console.log("pageHeight", pageHeight);
        return pageHeight;
    }
    get pickerOptions() {
        let that: any = this;
        return {
            shortcuts: [
                {
                    text: "今天",
                    onClick(picker: any) {

                        const end = that.$tool.currentAddDay()
                        const start = that.$tool.currentAddDay()
                        picker.$emit("pick", [start, end]);
                    },
                },
                {
                    text: "当月",
                    onClick(picker: any) {
                        const end = endMonthStr();
                        const start = startMonthStr();
                        picker.$emit("pick", [start, end]);
                    },
                },
                {
                    text: "全年",
                    onClick(picker: any) {
                        const end = endYearStr();
                        const start = startYearStr();
                        picker.$emit("pick", [start, end]);
                    },
                },
            ],
        }
    }
}
