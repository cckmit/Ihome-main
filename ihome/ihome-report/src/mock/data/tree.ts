/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-29 10:15:33
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-12 16:52:25
 */
let getTreeDataList = [
  {
    id: 3,
    label: "西大门",
    disabled: false,
    children: [
      {
        id: 125,
        label: "2单元",
        disabled: false,
        children: [
          {
            id: 130,
            label: "2001",
            disabled: false,
            children: []
          },
          {
            id: 131,
            label: "2002",
            disabled: false,
            children: []
          },
          {
            id: 132,
            label: "2003",
            disabled: false,
            children: []
          }
        ]
      }
    ]
  }
];

function arrayToTreeGroup(data: any, pId: any) {
  let tree = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].pId == pId) {
      let obj = data[i];
      temp = arrayToTreeGroup(data, data[i].id);
      if (temp.length > 0) {
        obj.subs = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
}
let list = [{
  "id": "10B1F16BDC5E7F33E0532429030A8871",
  "pId": "10B1F16BDC5E7F33E0532429030A8870",
  "name": "保利集团",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": null,
  "available": "1"
}, {
  "id": "105DB2C289397D50E0532429030A3DE0",
  "pId": "10B1F16BDC5E7F33E0532429030A8871",
  "name": "保利地产投资顾问有限公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": null,
  "available": "1"
}, {
  "id": "2c92808e6e4899a6016e829320aa0050",
  "pId": "105DB2C289397D50E0532429030A3DE0",
  "name": "中介组织",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIDEP",
  "available": "1"
}, {
  "id": "2c92808270b81f9d0170bee437800015",
  "pId": "105DB2C289397D50E0532429030A3DE0",
  "name": "广州居恒信息科技有限公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIDEP",
  "available": "1"
}, {
  "id": "1D29BB468F504774ACE653B946A393EE",
  "pId": "105DB2C289397D50E0532429030A3DE0",
  "name": "西藏保利爱家房地产经纪有限公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIDEP",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e125240133",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家湾区事业部",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e1262f0135",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家总部",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e126f60136",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家广州存量事业部",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e1273b0137",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家云南分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e127bc0138",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家海南分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e1283e0139",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家沧州分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e13236014c",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家山西分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e135320152",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家长沙分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e115fd0117",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家北京分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e1170f0119",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家南京分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e124a60132",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家莆田分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e1319f014b",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家华南产成品及联动事业部",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e1332c014e",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家西安分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}, {
  "id": "2c92808a720c04ff017218e134390150",
  "pId": "1D29BB468F504774ACE653B946A393EE",
  "name": "爱家武汉分公司",
  "iconSkin": null,
  "open": false,
  "root": false,
  "isParent": false,
  "nocheck": false,
  "checked": false,
  "children": null,
  "chkDisabled": false,
  "extendFields": null,
  "extendField": "BUSIBA",
  "available": "1"
}]

const treeList = arrayToTreeGroup(list, list[0].pId)


export { getTreeDataList, treeList }