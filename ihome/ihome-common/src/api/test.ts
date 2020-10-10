/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 17:22:37
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-30 16:43:59
 */
import http from "@/util/http";
/**  test ajax测试*/
export async function testApi(d?: any) {
    return await http.get("http://wechat.polyihome.test/polyihome-web/area/getCityListByProvince", { params: d });
}
export async function testPostApi(d?: any) {
    return await http.post("/getMockDataPost", d);
}
export async function tableApi(d?: any) {
    return await http.get("http://localhost:8084/getTableDateList", { params: d });
}