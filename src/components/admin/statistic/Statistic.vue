<template>
  <div class="mainDiv">
    <div class="top">
      <el-select
        v-model="chosenValue"
        placeholder="请选择"
        @change="handleClick"
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
        @click="handleExport('collegeCount', '完成人数')"
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
          @click="handleExport('advisorScore','导员成绩')"
        >导出导员成绩</el-button>

        <el-button
          size="medium"
          type="success"
          @click="handleExport('advisorEvaluate', '主观回答')"
        >导出主观回答</el-button>
      </div>

      <el-table
        :data="tableData"
        style="width: 60vw"
      >
        <el-table-column
          prop="college"
          label="学院"
        ></el-table-column>

        <el-table-column
          prop="advisor"
          label="辅导员"
        ></el-table-column>

        <el-table-column
          v-for="(prop, index) in scoreProps"
          :key="prop"
          :label="String(index + 1)"
          :prop="prop"
        ></el-table-column>

        <el-table-column
          prop="totalScore"
          label="总分"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import exportMethod from "@/api/export.js";

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
          left: "14%", //grid 组件离容器左侧的距离。
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
      isSingleCollege: false,
      scoreProps: [],
    };
  },
  computed: {
    college() {
      return this.collegeNames.map((item) => ({ value: item, label: item }));
    },
    tableColumnData() {
      return this.tableData.map((item) => item.score);
    },
  },
  created: function() {
    this.getCollegeList();
    this.getTableData();
  },
  mounted: function() {
    this.drawTable();
  },
  methods: {
    async drawTable() {
      this.echartInstance = this.$echarts.init(this.$refs.middle);
      const { data } = await this.$http.get(
        `api/changechart?collegeName=${this.chosenValue}`
      );
      if (this.chosenValue === "所有学院") {
        const res = await this.$http.get("collegeListWithLF");
        this.echartOption.yAxis.data = res.data;
        this.echartOption.series[0].barWidth = "50%";
        this.echartInstance.resize({ height: "800vh" });
      } else {
        this.echartOption.yAxis.data = [this.chosenValue];
        this.echartInstance.resize({ height: "400vh" });
      }
      this.echartOption.series[0].data = data.data;
      this.echartInstance.setOption(this.echartOption);
    },

    async getCollegeList() {
      let { data } = await this.$http.get("admin");
      this.collegeNames.push("所有学院");
      let tmp = JSON.parse(data.collegeNames);
      this.collegeNames = this.collegeNames.concat(tmp);
    },

    async getTableData() {
      // 获取表格数据
      let res = await this.$http.get(
        `api/changetable?collegeName=${this.chosenValue}`
      );
      console.log("tabledata", res);
      this.tableData = res.data.table.map((item) => {
        const { score, ...rest } = item;
        this.scoreProps = score.map((_, index) => `problem${index}`);
        const scoreObj = score.reduce((prev, curr, index) => {
          console.log("prev", prev);
          prev[`problem${index}`] = curr;
          return prev;
        }, {});
        console.log("scoreobj", scoreObj);
        return {
          ...rest,
          ...scoreObj,
        };
      });
      console.log("this.tableData", this.tableData);
    },

    handleExport(url, filename) {
      // 请求excel配置项
      let myObj = {
        method: "get",
        url: `export/${url}`,
        fileName: `${filename}.xlsx`,
      };
      exportMethod(myObj);
    },

    handleClick() {
      console.log(this.chosenValue);
      this.drawTable();
      this.getTableData();
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
</style>