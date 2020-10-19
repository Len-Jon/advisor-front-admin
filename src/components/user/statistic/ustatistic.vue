<template>
  <div class="mainDiv">
    <div
      class="middle"
      ref="middle"
    ></div>

    <div class="bottom">
      <p class="advisorScore">各导员成绩详情</p>

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
      tableData: [],
      echartOption: {
        title: {
          text: "各导员完成人数",
          left: "38%",
          textStyle: { fontWeight: 800, fontSize: 30 },
        },
        tooltip: {},
        grid: {
          //直角坐标系内绘图网格
          // show: true, //是否显示直角坐标系网格。[ default: false ]
          left: "18%", //grid 组件离容器左侧的距离。
          // right: "30px",
          // borderColor: "#c45455", //网格的边框颜色
          // bottom: "20%", //
        },
        yAxis: {
          data: [],
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            // interval: 0,
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
            name: "各导员完成人数",
            type: "bar",
            barWidth: "50%",
            data: [],
          },
        ],
      },
      echartWidth: 0,
      echartHeight: 0,
      echartInstance: null,
      scoreProps: [],
    };
  },
  computed: {
    college() {
      return this.collegeNames.map((item) => ({ value: item, label: item }));
    },
  },
  created: function() {
    this.getTableData();
  },
  mounted: function() {
    this.drawTable();
  },
  methods: {
    async drawTable() {
      this.echartInstance = this.$echarts.init(this.$refs.middle);
      const { data } = await this.$http.get("admin");
      console.log(data);
      this.echartOption.series[0].data = data.collegeCounts;
      this.echartOption.yAxis.data = JSON.parse(data.collegeNames);
      this.echartInstance.setOption(this.echartOption);
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

    async getTableData() {
      // 获取表格数据
      let res = await this.$http.get("admin");
      this.tableData = res.data.table.map((item) => {
        const { score, ...rest } = item;
        this.scoreProps = score.map((_, index) => `problem${index}`);
        const scoreObj = score.reduce((prev, curr, index) => {
          prev[`problem${index}`] = curr;
          return prev;
        }, {});
        return {
          ...rest,
          ...scoreObj,
        };
      });
    },
  },
};
</script>


<style scoped>
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
  height: 600px;
  width: 70%;
  margin-left: 8%;
}

.bottom {
  margin-left: 10%;
}

.topBtn {
  margin-left: 13%;
}
</style>