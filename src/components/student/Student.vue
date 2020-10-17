<template>
  <div>
    <div class="head">
      <img
        src="../../assets/imgs/head.png"
        alt=""
      >
    </div>
    <span class="title">[2019-2020-2]南京邮电大学辅导员评议</span>

    <el-select
      v-model="selectedCollege"
      placeholder="请选择学院"
      @change="handleCollegeClicked"
    >
      <el-option
        v-for="item in collegeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-select
      v-model="selectedAdvisor"
      placeholder="请选择辅导员"
    >
      <el-option
        v-for="item in advisorList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

    <el-button type="primary">提交</el-button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      colleges: [],
      advisors: [],
      selectedCollege: "",
      selectedAdvisor: "",
    };
  },
  async created() {
    const res = await this.$http.get("");
    console.log(res);
    this.colleges = res.data.colleges;
    // this.colleges = res.data.advisors;
    console.log("computed", this.collegeList);
  },
  computed: {
    collegeList() {
      return this.colleges.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
    },
    advisorList() {
      return this.colleges.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
    },
  },
  methods: {
    async handleCollegeClicked(val) {
      console.log(val);
      let res = await this.$http.get(`api/advisor/select?college=${val}`)
      console.log(res)
    },
  },
};
</script>


<style scoped>
img {
  width: 100%;
}

.title {
  font-weight: 800;
  display: block;
  margin: 10px 40px;
}

.el-select {
  margin-top: 10px;
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
}

.el-button {
  width: 90%;
  margin-top: 8px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>