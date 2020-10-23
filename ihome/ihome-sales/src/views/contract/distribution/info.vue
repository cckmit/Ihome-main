<!--
 * @Description: 中介分销协议详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 10:46:14
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-29 11:21:28
-->
<template>
  <IhPage>
    <template v-slot:info>
      <p class="ih-info-title">基础信息</p>
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-input
                value="186332212222"
                placeholder="合同编号"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              <el-input
                value="186332212222113322"
                placeholder="归档编号"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主标题">
              <el-input
                v-model="ruleForm.name"
                placeholder="主标题"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="副标题">
              <el-input
                v-model="ruleForm.name"
                placeholder="副标题"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">
              <el-input
                value="广州居恒信息科技有限公司"
                placeholder="甲方公司"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方地址">
              <el-input
                value="广州天河"
                placeholder="甲方地址"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方联系人">
              <el-input
                value="lwwww"
                placeholder="甲方联系人"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方联系人电话">
              <el-input
                value="18822200333"
                placeholder="甲方联系人电话"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司">
              <el-input
                value="乙方芳芳"
                placeholder="乙方公司"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方地址">
              <el-input
                value="广州"
                placeholder="乙方地址"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方联系人">
              <el-input
                value="qtttt"
                placeholder="乙方联系人"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人电话">
              <el-input
                value="1333348755"
                placeholder="乙方联系人电话"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账户名">
              <el-input
                value="账户号123123132"
                placeholder="乙方账户名"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账号">
              <el-input
                value="账号12344444488"
                placeholder="乙方账号"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方开户行">
              <el-input
                value="广州东圃行"
                placeholder="乙方开户行"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合作时间">
              <el-input
                v-model="ruleForm.name"
                placeholder="合作时间"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目地址">
              <el-input
                v-model="ruleForm.name"
                placeholder="项目地址"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              <el-input
                value="刘伟"
                placeholder="合同跟进人"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">其他</p>
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费计付标准备注">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.name"
                placeholder="代理费计付标准备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户成交以及确认">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.name"
                placeholder="客户成交以及确认"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费结算条件">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.name"
                placeholder="代理费结算条件"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费结算方式">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.name"
                placeholder="代理费结算方式"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="违约责任">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.name"
                placeholder="违约责任"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="补充条款">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.name"
                placeholder="补充条款"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="房屋未成交乙方退回代理费期限"
              label-width="280px"
            >
              <el-input
                v-model="ruleForm.name"
                placeholder="房屋未成交乙方退回代理费期限"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="房屋未成交乙方退回代理费逾期违约金比例"
              label-width="280px"
            >
              <el-input
                v-model="ruleForm.name"
                placeholder="房屋未成交乙方退回代理费逾期违约金比例"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="是否垫佣">
              <el-select
                v-model="ruleForm.employeeType"
                clearable
                placeholder="是否垫佣"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('employeeType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="指定中介行">
              <el-select
                v-model="ruleForm.employeeType"
                clearable
                placeholder="指定中介行"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('employeeType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="渠道类型">
              <el-select
                v-model="ruleForm.employeeType"
                clearable
                placeholder="渠道类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('employeeType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="合同电子版"
              class="text-left"
            >
              <el-button type="success">预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="扫描件归档">
              <IhUpload
                :file-list="fileList"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="text-left">
              <el-button type="primary">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class InterediaryDetail extends Vue {
  private ruleForm: any = {};
  private fileList: Array<object> = [
    {
      name: "abc.pdf",
      url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
      img_url: `http://filesvr.polyihome.test/aist-filesvr-web/JQeryUpload/getfile?fileId=2c92808873be3796017490db113b0616`,
    },
  ];

  private list = [
    {
      abbr: "TJ",
      code: "120000000000",
      level: 1,
      name: "天津市",
      parentCode: "100000000000",
    },
    {
      addr: "xxx",
      code: "123123",
      level: 2,
      name: "xxxxaa",
      parentCode: "120000000000",
    },
    {
      abbr: "TJ",
      code: "120000000001",
      level: 1,
      name: "广东省",
      parentCode: "100000000000",
    },
    {
      addr: "xxx",
      code: "1231231111111",
      level: 2,
      name: "广州",
      parentCode: "120000000001",
    },
    {
      addr: "xxx",
      code: "1231230000",
      level: 2,
      name: "天河区",
      parentCode: "1231231111111",
    },
  ];

  created(): void {
    let tree = this.filterArr(this.list, "100000000000");
    console.log(tree);
  }
  private filterArr(data: any[], pId: any) {
    let tree = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentCode == pId) {
        let obj = data[i];
        temp = this.filterArr(data, obj.code);
        if (temp.length > 0) {
          obj.children = temp;
        }
        tree.push(obj);
      }
    }
    return tree;
  }
}
</script>
