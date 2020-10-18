<template>
  <div class="main">
    <el-table
      :data="advisors"
      style="width: 70%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="advisor"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="college"
        label="学院"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="已完成人数"
      >
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            @click="handleDetail(scope)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情弹框 -->
    <el-dialog
      title="导员详情"
      :visible.sync="detailDialogVisible"
      width="30%"
      fullscreen
      center
    >
      <div
        class="chart"
        v-for="chart in echartsInstances"
        :key="chart.id"
        :ref="chart.title"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="detailDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      advisors: [],
      addAdvisorVisible: false,
      addAdvisorForm: {
        advisor: "",
        college: "",
      },
      collegeList: [],
      college: "",
      toDeleteId: 0,
      deleteDialogVisible: false,
      editDialogVisible: false,
      editForm: {
        id: 0,
        advisor: "",
        college: "",
      },
      clickedId: 0,
      detailDialogVisible: false,
      detailForm: {
        advisor: "",
        college: "",
      },
      echartsInstances: [],
    };
  },
  created: async function() {
    let data = await this.$http.get("advisor");
    if (data.code !== 200) this.$message.error("发生错误！");
    this.advisors = data.data;
    console.log("advisoruser", this.advisors);
  },
  methods: {
    async addAdvisor() {
      this.addAdvisorForm.college = this.college;
      const data = await this.$http.post(
        "api/advisor/add",
        this.addAdvisorForm
      );
      console.log(this.addAdvisorForm);
      console.log(data);
      if (data.code !== 200) this.$message.error("错误！");
      this.$message.success("操作成功！");
      setTimeout("location.reload()", 2000);
    },

    async handleDelete() {
      const data = await this.$http.post(
        `api/advisor/delete/${this.toDeleteId}`
      );
      console.log("delete", data);
      if (data.code !== 200) this.$message.error(data.data.msg);
      this.deleteDialogVisible = false;
      this.$message.success("操作成功！");
      setTimeout("location.reload()", 2000);
    },

    handleEdit(scope) {
      this.editDialogVisible = true;
      this.editForm.id = scope.row.id;
      this.clickedId = scope.row.id;
      this.editForm.advisor = scope.row.advisor;
      console.log(this.clickedId);
    },

    async handleDetail(scope) {
      this.detailDialogVisible = true;
      this.clickedId = scope.row.id;
      const { data } = await this.getDetailData();
      data.problems.forEach((problem) => {
        const chart = {
          id: problem.id,
          instance: null,
          options: null,
          data: data.data[problem.id],
          labels: data.labels[problem.id],
          title: problem.content,
        };
        this.echartsInstances.push(chart);
      });
      this.$nextTick().then(() => {
        console.log(this.echartsInstances);
        this.echartsInstances.forEach((chart) => {
          const { title } = chart;
          console.log(this.$refs[title]);
          chart.instance = this.$echarts.init(this.$refs[title][0]);
          chart.options = {
            title: {
              text: chart.title,
              left: "50%",
              textStyle: { fontWeight: 400, fontSize: 20 },
            },
            tooltip: {},
            grid: {
              left: "25%", //grid 组件离容器左侧的距离。
            },
            yAxis: {
              data: JSON.parse(chart.labels),
              axisLabel: {
                interval: 0,
              },
            },
            xAxis: { type: "value" },
            series: [
              {
                name: "完成人数",
                type: "bar",
                barWidth: "50%",
                data: JSON.parse(chart.data),
              },
            ],
          };
          chart.instance.setOption(chart.options);
        });
      });
    },
    async pushEditForm() {
      this.editDialogVisible = false;
      console.log(this.editForm);
      const data = await this.$http.post("api/advisor/edit", this.editForm);
      console.log(data);
      if (data.code !== 200) return this.$message.error(data.data.msg);
      this.$message.success("操作成功！");
      this.$refs.editFormRef.resetFields();
      setTimeout("location.reload()", 2000);
    },
    async getDetailData() {
      const res = await this.$http.get(`advisor/detail/${this.clickedId}`);
      return res;
    },
  },
  computed: {
    colleges() {
      return this.collegeList.map((item) => ({ value: item, label: item }));
    },
  },
};
</script>


<style>
.el-table {
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-table td {
  text-align: center;
}

.el-table th {
  text-align: center;
}
</style>

<style scoped>
.main {
  margin-left: 13%;
}
.chart {
  width: 80%;
  height: 50vh;
}
</style>
