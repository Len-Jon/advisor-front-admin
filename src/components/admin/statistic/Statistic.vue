<template>
  <div class="mainDiv">
    <div class="top">
      <el-select
        v-model="chosenValue"
        placeholder="请选择"
      >
        <el-option
          v-for="item in college"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        size="medium"
        type="primary"
        @click="handleExportCollegeCount"
      >导出完成人数</el-button>
    </div>

    <div
      class="middle"
      ref="middle"
    ></div>

    <div class="bottom">
      <p class="advisorScore">各导员成绩详情</p>
      <div class="buttons">
        <el-button
          size="medium"
          type="primary"
          @click="handleExportAdvisorScore"
        >导出导员成绩</el-button>
        <el-button
          size="medium"
          type="success"
          @click="handleExportEvaluate"
        >导出主观回答</el-button>
      </div>

      <el-table :data="tableData">
        <el-table-column
          prop="college"
          label="学院"
        ></el-table-column>
        <el-table-column
          prop="advisor"
          label="辅导员"
        ></el-table-column>
        <el-table-column
          prop="score"
          label="总分"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
// import XLSX from 'xlsx'

export default {
  data() {
    return {
      collegeNames: [],
      chosenValue: "所有学院",
      tableData: [],
      echartOption: {
        title: {
          text: "各学院完成人数",
          left: "30%",
          textStyle: { fontWeight: 800, fontSize: 30 },
        },
        tooltip: {},
        grid: {
          //直角坐标系内绘图网格
          // show: true, //是否显示直角坐标系网格。[ default: false ]
          left: "15%", //grid 组件离容器左侧的距离。
          // right: "30px",
          // borderColor: "#c45455", //网格的边框颜色
          // bottom: "20%", //
        },
        yAxis: {
          data: [],
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            // formatter: (value, index) => {
            //   // 格式化成月/日，只在第一个刻度显示年份
            //   if (value.length >)
            // },
          },
          inverse: true,
        },
        xAxis: { type: "value" },
        series: [
          {
            name: "完成人数",
            type: "bar",
            barWidth: "50%",
            data: [],
          },
        ],
      },
      echartWidth: 0,
      echartHeight: 0,
      echartInstance: null,
    };
  },
  computed: {
    college() {
      return this.collegeNames.map((item) => ({ value: item, label: item }));
    },
  },
  created: function() {
    this.getCollegeList();
    this.getTableData();
  },
  mounted: function() {
    this.drawTable();
    this.getEchartData();
    console.log("option", this.echartOption);
    this.getcollegeListWithLF();
  },
  methods: {
    drawTable() {
      this.echartInstance = this.$echarts.init(this.$refs.middle);
      this.echartInstance.setOption(this.echartOption);
    },
    async getCollegeList() {
      let { data } = await this.$http.get("admin");
      this.collegeNames.push("所有学院");
      let tmp = JSON.parse(data.collegeNames);
      this.collegeNames = this.collegeNames.concat(tmp);
      console.log(this.collegeNames);
    },

    async getTableData() {
      // 获取表格数据
      let res = await this.$http.get("api/changetable?collegeName=所有学院");
      this.tableData = res.data.table;
    },

    async getcollegeListWithLF() {
      let res = await this.$http.get("collegeListWithLF");
      console.log("lf换行", res);
      this.echartOption.yAxis.data = res.data;
      this.echartInstance.setOption(this.echartOption);
    },

    async getEchartData() {
      // 获取echart图表数据
      let res = await this.$http.get("api/changechart?collegeName=所有学院");
      let data = res.data;
      this.echartOption.series[0].data = data.data;
      this.echartOption.yAxis.data = data.labels;
      this.echartInstance.setOption(this.echartOption);
    },
    async handleExportCollegeCount() {
      const res = await this.$http.get("export/authority");
      console.log(res);
    },
    async handleExportAdvisorScore() {
      await this.$http.get("export/advisorScore");
    },
    async handleExportEvaluate() {
      await this.$http.get("export/advisorEvaluate");
    },
  },
};
</script>


<style scoped>
.mainDiv {
  margin-left: 13%;
}

.el-button {
  display: block;
  margin-top: 20px;
  margin-left: 0;
  margin-right: 10px;
}

.advisorScore {
  font-size: 30px;
  font-weight: 800;
  margin-left: 50%;
  margin-bottom: 25px;
  transform: translateX(-37%);
}

.buttons {
  display: flex;
}

.middle {
  /* width: 80vw; */
  height: 100vh;
}
</style>