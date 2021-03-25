<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="组织">
              <IhSelectOrgTree v-model="t1" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同状态">
              <el-select
                v-model="t2"
                multiple
                collapse-tags
                style="margin-left: 20px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('CityLevel')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期类型" style="text-align: left">
              <el-select
                style="width: 30%"
                v-model="t3"
                clearable
                placeholder="日期类型"
                @clear="dateTypeClear()"
              >
                <el-option
                  v-for="item in $root.dictAllList('PayDateType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>

              <el-date-picker
                style="width: 70%"
                v-model="queryPageParameters.expiresTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                :disabled="queryPageParameters.dateType"
                @change="expiresTimeChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="success" @click="exportExcel()">导出</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <div class="ih-table-report">
        <el-table
          class="ih-table"
          :data="list"
          :empty-text="emptyText"
          :cell-style="cellStyle"
          :header-cell-style="headerCellStyle"
          :height="height - 62 * 1 + 'px'"
          :show-summary="true"
        >
          <el-table-column type="index" width="50" fixed> </el-table-column>
          <el-table-column prop="name" label="组织" width="150" fixed>
          </el-table-column>
          <el-table-column label="市场化业务">
            <el-table-column prop="xx" label="租赁">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="月租金/万元" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="二手买卖">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="新房-保利-自行成交">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="新房-非保利-自行成交">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="新房-非保利-自然来访成交">
              <el-table-column prop="xx" label="成交套数" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="新房-非保利-分销成交">
              <el-table-column prop="xx" label="成交套数" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="xx"
              label="产成品（车位、储藏室）-非保利-自行成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="xx"
              label="产成品（车位、储藏室）-非保利-分销成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="xx"
              label="产成品（非车位、储藏室）-保利-自行成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="xx"
              label="产成品（非车位、储藏室）-非保利-自行成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="xx"
              label="产成品（非车位、储藏室）-非保利-分销成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="市场化小计">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="考核业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="公司业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column label="非市场化业务">
            <el-table-column prop="xx" label="新房-保利-自然来访成交">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="新房-保利-分销成交">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>

            <el-table-column
              prop="xx"
              label="产成品（车位、储藏室）-保利-自行成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="xx"
              label="产成品（车位、储藏室）-保利-分销成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="xx"
              label="产成品（非车位、储藏室）-保利-分销成交"
            >
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="xx" label="非市场化小计">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column label="总业绩（不含自渠业务）">
            <el-table-column prop="xx" label="成交套数" width="80">
            </el-table-column>
            <el-table-column prop="xx" label="应收业绩/万元" width="120">
            </el-table-column>
            <el-table-column prop="xx" label="含其他渠道费用/万元" width="160">
            </el-table-column>
            <el-table-column prop="xx" label="对外拆佣/万元" width="120">
            </el-table-column>
            <el-table-column prop="xx" label="公司业绩/万元" width="120">
            </el-table-column>
            <el-table-column prop="xx" label="成交面积/㎡" width="100">
            </el-table-column>
            <el-table-column prop="xx" label="成交总价/万元" width="120">
            </el-table-column>
            <el-table-column prop="xx" label="实收业绩/万元" width="120">
            </el-table-column>
            <el-table-column prop="xx" label="未收/万元" width="100">
            </el-table-column>
          </el-table-column>

          <el-table-column label="自渠业务">
            <el-table-column prop="xx" label="自渠成交">
              <el-table-column prop="xx" label="成交套数" width="80">
              </el-table-column>
              <el-table-column prop="xx" label="应收业绩/万元" width="120">
              </el-table-column>
              <el-table-column
                prop="xx"
                label="含其他渠道费用/万元"
                width="160"
              >
              </el-table-column>
              <el-table-column prop="xx" label="对外拆佣/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="成交面积/㎡" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="成交总价/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="费率/个月" width="100">
              </el-table-column>
              <el-table-column prop="xx" label="实收业绩/万元" width="120">
              </el-table-column>
              <el-table-column prop="xx" label="未收/万元" width="100">
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// import { post_channelCityLevel_getList } from "../../api/channel/index";
import TableReportMixin from "../../mixins/table-report";

@Component({
  components: {},
  mixins: [TableReportMixin],
})
export default class ManagerMonthlyReport extends Vue {
  queryPageParameters: any = {
    proviceCode: null,
    cityCode: null,
    cityGrade: null,
  };
  t1: any = null;
  t2: any = null;
  t3: any = null;
  provinceOption: any = [];
  cityOption: any = [];
  selection: any = [];
  dialogFormVisible = false;
  list: any = [];
  total: any = null;

  async created() {
    this.getListMixin();
  }
  expiresTimeChange() {
    console.log("expiresTimeChange");
  }
  exportExcel() {
    console.log("export");
  }
  async getListMixin() {
    this.list = [];
    for (let index = 0; index < 35; index++) {
      this.list.push({
        id: index + 1,
        name: "组织" + (index + 1),
        xx: 1,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-table__body-wrapper {
  z-index: 2;
}
</style>
<style lang="scss" >
.el-table__footer-wrapper td {
  text-align: center;
}
</style>
 