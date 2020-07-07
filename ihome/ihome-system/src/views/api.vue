<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-03 14:05:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-03 14:13:10
--> 

<template>
  <div class="dashboard-container" style="text-align: left;">
    <div>
      <el-button type="success" @click="apiDoc()">获取文档</el-button>
    </div>
    <div>
      <div v-for="(item,index) in urlList" :key="index" v-html="item"></div>
    </div>
    <div>//=========================================================</div>
    <div>
      <div v-for="(item,index) in list" :key="index" v-html="item"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import axios from "axios";

function replaceAll(str: string, FindText: string, RepText: string) {
  let regExp = new RegExp(FindText, "g");
  return str.replace(regExp, RepText);
}

@Component({
  name: "ApiDoc"
})
export default class extends Vue {
  list: string[] = [];
  urlList: string[] = [];
  async apiDoc() {
    //http://192.168.188.93:7003/pic-userrole/v2/api-docs?
    //http://wechat.polyihome.test/polyihome-web/v2/api-docs?
    //http://10.188.0.109:8610/system/v2/api-docs
    const { data } = await axios.get(
      "/system/v2/api-docs?" +
        new Date().getTime()
    );
    this.list = [];
    this.urlList = [];
    console.log(data);
    this.urlList.push(`/* eslint-disable camelcase */`);
    this.urlList.push(`import request from '@/utils/request';`);
    const { definitions, paths } = data;
    console.log(paths);
    Object.keys(paths).forEach(k => {
    //   let t = paths[k];
    //   let method = paths[k]["get"];
      if (paths[k]["get"]) {
        this.urlList.push(`/**${paths[k]["get"].summary}*/`);
        this.urlList.push(
          `export function ${paths[k]["get"].operationId} (d?: any) {`
        );
        let originalRef =
          paths[k]["get"]["responses"]["200"].schema &&
          paths[k]["get"]["responses"]["200"].schema.originalRef;
        if (!originalRef) {
          originalRef = "any";
        }

        let m2 = `${originalRef}`;
        m2 = replaceAll(m2, "«", "&lt;");
        m2 = replaceAll(m2, "»", "&gt;");
        let m11 = m2.slice(13, m2.length - 4);
        let m1 = m2.slice(13, m2.length - 4);

        if (m1.includes("List&lt;")) {
          m1 = replaceAll(m1, "List&lt;", "");
          m1 = replaceAll(m1, "&gt;", "[]");
        }
        let m22 = replaceAll(m2, m11, m1);

        if (originalRef === "any") {
          m1 = "any";
        }
        this.urlList.push(
          `return request.get&lt;${m1}, ${m22}&gt; ('${data.basePath}${k}', { params: d })`
        );
        this.urlList.push(`}`);
      } else {
        //post
        this.urlList.push(`/**${paths[k]["post"].summary}*/`);
        this.urlList.push(
          `export function ${paths[k]["post"].operationId} (d?: any) {`
        );
        let originalRef =
          paths[k]["post"]["responses"]["200"].schema &&
          paths[k]["post"]["responses"]["200"].schema.originalRef;

        if (!originalRef) {
          originalRef = "any";
        }

        let m2 = `${originalRef}`;
        m2 = replaceAll(m2, "«", "&lt;");
        m2 = replaceAll(m2, "»", "&gt;");
        let m11 = m2.slice(13, m2.length - 4);
        let m1 = m2.slice(13, m2.length - 4);

        if (m1.includes("List&lt;")) {
          m1 = replaceAll(m1, "List&lt;", "");
          m1 = replaceAll(m1, "&gt;", "[]");
        }
        let m22 = replaceAll(m2, m11, m1);

        if (originalRef === "any") {
          m1 = "any";
        }
        this.urlList.push(
          `return request.post&lt;${m1}, ${m22}&gt; ('${data.basePath}${k}', d)`
        );
        this.urlList.push(`}`);
      }
    });
    //===============================================================================================
    this.list.push(`/**ApiResult模型*/`);
    this.list.push(`export interface ApiResult&lt;T&gt; {`);
    this.list.push(`/**是否成功（0 是 -1 否）*/`);

    this.list.push(`code: number;`);
    this.list.push(`/**响应信息*/`);

    this.list.push(`msg: string;`);
    this.list.push(`/**返回对象*/`);

    this.list.push(`result: T;`);
    this.list.push(`}`);
    this.list.push("<br>");

    this.list.push(`/**PageInfo模型*/`);
    this.list.push(`export interface PageInfo&lt;T&gt; {`);
    this.list.push(`/**结果集*/`);

    this.list.push(`list:T;`);
    this.list.push(`/**总记录数*/`);

    this.list.push(`total: number;`);
    this.list.push(`}`);
    this.list.push("<br>");

    Object.keys(definitions).forEach(k => {
      if (k.includes("ApiResult") || k.includes("PageInfo")) {
        console.log('(k.includes("ApiResult") || k.includes("PageInfo")')
      } else {
        const objs = definitions[k]["properties"];
        this.list.push(`/**${definitions[k].description}*/`);

        this.list.push(`export interface ${k} {`);
        Object.keys(objs).forEach(key => {
          this.list.push(`/**${objs[key].description}*/`);

          let _type = objs[key].type;
          if (_type === "integer" || _type === "number" || _type === "int") {
            _type = "number";
          } else if (_type === "string") {
            _type = "string";
          } else if (_type === "array") {
            _type = `${objs[key].items.originalRef}[]`;
          } else if (_type === undefined) {
            _type = `${objs[key].originalRef}`;
          } else {
            console.log(_type);
          }
          this.list.push(`${key}: ${_type};`);
        });
        this.list.push(`}`);
        this.list.push("<br>");
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
