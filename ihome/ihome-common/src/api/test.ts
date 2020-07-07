/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 17:22:37
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-23 17:32:44
 */
import http from "@/util/http";
/**  test ajax测试*/
export async function testApi(d?: any) {
    return await http.get("http://wechat.polyihome.test/polyihome-web/area/getCityListByProvince", { params: d });
}
export async function testPostApi(d?: any) {
    return await http.post("/getMockDataPost", d);
}