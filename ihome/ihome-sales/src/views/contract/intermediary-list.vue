<!--
 * @Description: 中介分销协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 17:34:32
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-25 18:14:19
-->
<template>
  <ih-page>
    <!-- 搜索 -->
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-select
                v-model="queryPageParameters.name"
                placeholder="标题"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <el-select
                v-model="queryPageParameters.name"
                placeholder="甲方公司"
                clearable
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乙方公司">
              <el-select
                v-model="queryPageParameters.accountType"
                clearable
                placeholder="乙方公司"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('accountType')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="项目地址">
                  <el-input
                    v-model="queryPageParameters.mobilePhone"
                    placeholder="项目地址"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="queryPageParameters.employmentDate"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同模板">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="合同模板"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="项目">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="项目"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="周期">
                  <el-select
                    v-model="queryPageParameters.accountType"
                    clearable
                    placeholder="周期"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('accountType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择归属组织"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('employeeStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择合同编号"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('employeeStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.employeeType"
                    clearable
                    placeholder="请选择归档状态"
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
              <el-col :span="8">
                <el-form-item label="归档编号">
                  <el-select
                    v-model="queryPageParameters.workType"
                    clearable
                    placeholder="请选择归档编号"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('workType')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同录入人">
                  <el-select
                    v-model="queryPageParameters.employeeStatus"
                    clearable
                    placeholder="请选择合同录入人"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in $root.displayList('employeeStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <el-select
                    v-model="queryPageParameters.employeeType"
                    clearable
                    placeholder="请选择合同跟进人"
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
              <el-col :span="8">
                <el-form-item label="中介战略协议">
                  <el-select
                    v-model="queryPageParameters.employeeType"
                    clearable
                    placeholder="请选择中介战略协议"
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
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class IntermediaryList extends Vue {
  public queryPageParameters: any = {};
  private searchOpen = true;
}
</script>
