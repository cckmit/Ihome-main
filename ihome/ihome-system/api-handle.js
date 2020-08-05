/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-31 15:21:06
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-05 09:11:52
 */
let http = require('http');
let fs = require("fs");

let outSrc;

function replaceAll(str, FindText, RepText) {
    let regExp = new RegExp(FindText, "g");
    return str.replace(regExp, RepText);
}
let text = ''
function handleBody(body) {

    writeLine('/* eslint-disable */');
    writeLine('//' + new Date().toString())

    writeLine("import { request } from '../base'")
    const { paths, definitions } = body;


    let count = 0;
    let countGet = 0;
    let countPost = 0;
    Object.keys(paths).forEach(k => {
        count += 1;
        //   let t = paths[k];
        //   let method = paths[k]["get"];
        let v = paths[k];
        if (paths[k]["get"]) {
            countGet += 1;
            let originalRef =
                paths[k]["get"]["responses"]["200"].schema &&
                paths[k]["get"]["responses"]["200"].schema.originalRef;
            if (!originalRef) {
                originalRef = "any";
            }

            originalRef = replaceAll(originalRef, '«int»', '<number>')
            originalRef = replaceAll(originalRef, '«', '<')
            originalRef = replaceAll(originalRef, '»', '>')


            if (originalRef && originalRef.length > 0) {

            } else {
                originalRef = "any"
            }
            if (originalRef.startsWith('ResModel')) {
                originalRef = originalRef.substring(9, originalRef.length - 1)
            }
            if (originalRef.startsWith('List<')) {
                originalRef = originalRef.substring(5, originalRef.length - 1)
                originalRef += '[]'
            }
            let res = 'any'
            let parameters = paths[k]["get"].parameters;
            if (parameters && parameters.length > 0) {
                if (parameters[0].schema) {
                    res = parameters[0].schema.originalRef;
                } else {

                }
            }
            writeLine(`/**${paths[k]["get"].summary}*/`)
            // writeLine(`export async function ${paths[k]["get"].operationId} (d?: ${res}) {`)
            let className = replaceAll('get' + k, '/', '_')
            className = className.replace('{id}', 'ID')
            if (!res) {
                res = 'any'
            }
            writeLine(`export async function ${className} (d?: ${res}) {`)
            writeLine(`return await request.get<${originalRef},${originalRef}>('${body.basePath}${k}', { params: d })`)
            writeLine(`}`)

        } else {
            //post
            countPost += 1;
            let originalRef =
                paths[k]["post"]["responses"]["200"].schema &&
                paths[k]["post"]["responses"]["200"].schema.originalRef;

            if (!originalRef) {
                originalRef = "any";
            }
            originalRef = replaceAll(originalRef, '«int»', '<number>')
            originalRef = replaceAll(originalRef, '«', '<')
            originalRef = replaceAll(originalRef, '»', '>')


            if (originalRef && originalRef.length > 0) {

            } else {
                originalRef = "any"
            }
            if (originalRef.startsWith('ResModel')) {
                originalRef = originalRef.substring(9, originalRef.length - 1)
            }
            if (originalRef.startsWith('List<')) {
                originalRef = originalRef.substring(5, originalRef.length - 1)
                originalRef += '[]'
            }
            let res = 'any'
            let parameters = paths[k]["post"].parameters;
            if (parameters && parameters.length > 0) {
                if (parameters[0].schema) {
                    res = parameters[0].schema.originalRef;
                }
            }


            writeLine(`/**${paths[k]["post"].summary}*/`)
            // writeLine(`export async function ${paths[k]["post"].operationId} (d?: ${res}) {`)
            let className = replaceAll('post' + k, '/', '_')
            className = className.replace('{id}', 'ID')
            if (!res) {
                res = 'any'
            }
            writeLine(`export async function ${className} (d?: ${res}) {`)

            writeLine(`return await request.post< ${originalRef},${originalRef}> ('${body.basePath}${k}', d)`)
            writeLine(`}`)

        }
    });
    console.log(`一共有${count}个接口;get=${countGet};post=${countPost};其他=${count - countGet - countPost}`)


    writeLine('//===============================================================================================')
    writeLine(`/**ResModel模型*/`)
    writeLine(`export interface ResModel<T> {`)
    writeLine(`/**是否成功（0 是 -1 否）*/`)
    writeLine(`code: number;`)
    writeLine(`/**响应信息*/`)
    writeLine(`msg: string;`)
    writeLine(`/**返回对象*/`)
    writeLine(`result: T;`)
    writeLine(`}`)

    writeLine(`/**PageModel模型*/`)
    writeLine(`export interface PageModel<T> {`)
    writeLine(`/**结果集*/`)
    writeLine(`list:T[];`)
    writeLine(`/**总记录数*/`)
    writeLine(`total: number;`)
    writeLine(`}`)


    Object.keys(definitions).forEach(k => {
        if (k.includes("ApiResult") || k.includes("PageInfo")) {
            console.log('(k.includes("ApiResult") || k.includes("PageInfo")')
        } else {
            if (k.startsWith('PageModel«') || k.startsWith('ResModel«')) {

            } else {
                const objs = definitions[k]["properties"];
                writeLine(`/**${definitions[k].description}*/`)
                writeLine(`export interface ${k} {`)


                Object.keys(objs).forEach(key => {
                    writeLine(`/**${objs[key].description}*/`)
                    let _type = objs[key].type;
                    if (_type === "integer" || _type === "number" || _type === "int" || _type == "bigdecimal") {
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
                    writeLine(`${key}: ${_type};`)
                });

                writeLine(`}`)
            }


        }
    });
    fs.writeFile(outSrc, text, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(`api脚本写入成功！路径${outSrc}`);
    });
}
function writeLine(line) {
    text += line + '\n';
}

function handleSwagger(prefix) {

    //swagger配置数据
    let options = {
        host: '10.188.0.109',
        port: '8610',
        path: `/${prefix}/v2/api-docs`
    };
    //生成文件路径
    outSrc = `./src/api/${prefix}/index.ts`;
    // 处理响应的回调函数
    let callback = function (response) {
        // 不断更新数据
        let body = '';
        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function () {
            // 数据接收完成
            let data = JSON.parse(body)
            handleBody(data)
        });
    }
    // 向服务端发送请求
    let req = http.request(options, callback);
    req.end();
}

module.exports = handleSwagger;