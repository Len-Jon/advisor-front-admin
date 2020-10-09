<template>
  <div class="main">
    <el-button
      size="medium"
      type="success"
      @click="addAdvisor"
    >添加导员</el-button>
    <el-table
      :data="advisors"
      style="width: 70%"
    >
      <el-table-column
        prop="id"
        label="ID"
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
        width="280"
      >
      <el-button size="medium" type="primary">详情</el-button>
      <el-button size="medium" type="success">编辑</el-button>
      <el-button size="medium" type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      advisors: [],
    };
  },
  created: async function() {
    let { data } = await this.$http.get("advisor");
    data = data.data;
    this.advisors = data.advisors;
    console.log(this.advisors);
  },
  methods: {
    addAdvisor() {
      this.$router.push("/admin/advisor/add");
    },
  },
};
</script>


<style scoped>
.main {
  position: relative;
  left: 13%;
}

.el-table {
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>