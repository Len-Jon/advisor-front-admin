<template>
  <div class="main">
    <el-button
      size="medium"
      type="success"
      @click="addAdvisorVisible = true"
    >添加导员</el-button>
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
          <el-button
            size="medium"
            type="success"
            @click="handleEdit(scope)"
          >编辑</el-button>
          <el-button
            size="medium"
            type="danger"
            @click="deleteDialogVisible = true;toDeleteId = scope.row.id"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加账号弹框 -->
    <el-dialog
      title="添加导员"
      :visible.sync="addAdvisorVisible"
    >
      <el-form :model="addAdvisorForm">
        <el-form-item label="姓名">
          <el-input v-model="addAdvisorForm.advisor"></el-input>
        </el-form-item>
        <!-- 学院列表 -->
        <el-form-item label="学院"><br>
          <el-select
            v-model="college"
            placeholder="请选择"
          >
            <el-option
              v-for="item in colleges"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addAdvisorVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addAdvisor"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      title="警告"
      :visible.sync="deleteDialogVisible"
      width="30%"
    >
      <span>该操作不可逆，确定要删除吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="danger"
          @click="handleDelete"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
    >
      <el-form
        :model="editForm"
        ref="editFormRef"
      >
        <el-form-item label="ID">
          <template>
            <el-input
              :value="editForm.id"
              disabled
            ></el-input>
          </template>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.advisor"></el-input>
        </el-form-item>
        <el-form-item label="学院"><br>
          <el-select
            v-model="editForm.college"
            placeholder="请选择"
          >
            <el-option
              v-for="item in colleges"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="pushEditForm"
        >确 定</el-button>
      </div>
    </el-dialog>

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
import { getCollegeList } from "@/api/getCollegeList.js";
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
      // echartOption: {
      //   title: {
      //     text: "各学院完成人数",
      //     left: "30%",
      //     textStyle: { fontWeight: 600, fontSize: 10 },
      //   },
      //   tooltip: {},
      //   grid: {
      //     //直角坐标系内绘图网格
      //     // show: true, //是否显示直角坐标系网格。[ default: false ]
      //     left: "50%", //grid 组件离容器左侧的距离。
      //     // right: "30px",
      //     // borderColor: "#c45455", //网格的边框颜色
      //     // bottom: "20%", //
      //   },
      //   yAxis: {
      //     data: [],
      //     axisLabel: {
      //       //坐标轴刻度标签的相关设置。
      //       interval: 0,
      //       // formatter: (value, index) => {
      //       //   // 格式化成月/日，只在第一个刻度显示年份
      //       //   if (value.length >)
      //       // },
      //     },
      //     inverse: true,
      //   },
      //   xAxis: { type: "value" },
      //   series: [
      //     {
      //       name: "完成人数",
      //       type: "bar",
      //       barWidth: "50%",
      //       data: [],
      //     },
      //   ],
      // },
    };
  },
  created: async function() {
    let data = await this.$http.get("advisor");
    if (data.code !== 200) this.$message.error("发生错误！");
    this.advisors = data.data;
    console.log(this.advisors);

    // 获取学院列表
    let res = await getCollegeList();
    res.data.pop();
    this.collegeList = res.data;
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
