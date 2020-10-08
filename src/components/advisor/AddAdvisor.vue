<template>
  <div class="main">
    <el-input
      placeholder="姓名"
      v-model="advisorName"
      clearable
    >
    </el-input>
    <p>批量导入请用中文分号将姓名隔开</p>
    <p class="college">学院</p>
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
  </div>
</template>


<script>
export default {
  data() {
    return {
      advisorName: "",
      collegeNames: [],
      chosenValue: "",
    };
  },
  created: async function() {
    let { data } = await this.$http.get("admin");
    data = data.data;
    this.collegeNames = JSON.parse(data.collegeNames);
  },
  computed: {
    college() {
      return this.collegeNames.map((item) => ({ value: item, label: item }));
    },
  },
};
</script>


<style scoped>
.main {
  position: relative;
  left: 13%;
  top: 5%;
}

p {
  font-size: 6px;
  color: rgba(0, 0, 0, 0.54);
}

.college {
  margin-top: 5px;
}

.el-input {
  width: 30%;
}
</style>