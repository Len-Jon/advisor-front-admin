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
      >导出完成人数</el-button>
    </div>

    <div class="middle"></div>

    <div class="bottom">
      <p class="advisorScore">各导员成绩详情</p>
      <div class="buttons">
        <el-button
          size="medium"
          type="primary"
        >导出导员成绩</el-button>
        <el-button
          size="medium"
          type="success"
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
export default {
  data() {
    return {
      collegeNames: [],
      chosenValue: "所有学院",
      tableData: [],
    };
  },
  computed: {
    college() {
      return this.collegeNames.map((item) => ({ value: item, label: item }));
    },
  },
  created: async function() {
    let { data } = await this.$http.get("admin");
    this.collegeNames.push("所有学院");
    let tmp = JSON.parse(data.collegeNames);
    this.collegeNames = this.collegeNames.concat(tmp);
    console.log(this.collegeNames);

    // 获取表格数据
    let res = await this.$http.get("api/changetable?collegeName=所有学院");
    console.log("res:", res);
    this.tableData = res.data.table;
    console.log("tabledata", this.tableData);
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