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
        v-for="item in colleges"
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

    <!-- 题目 -->
    <Problem
      v-for="(item, index) in problems"
      :key="index"
      :rank="item.rank"
      :type="item.type"
      :problemId="item.id"
      :content.sync="item.content"
      :optionEntities.sync="item.optionEntities"
    />
    <el-button type="primary">提交</el-button>
  </div>
</template>


<script>
import Problem from "./Problem.vue";

export default {
  components: {
    Problem,
  },
  data() {
    return {
      colleges: [],
      advisors: [],
      advisorList: [],
      selectedCollege: "",
      selectedAdvisor: "",
      submitAdvisorId: -1,
      problems: [],
      submitForm: {
        college: "",
        advisor: "",
        answerEntityList: [],
      },
    };
  },
  async created() {
    const res = await this.$http.get("");
    console.log(res);
    this.problems = res.data.problems;
    this.colleges = res.data.colleges.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    this.advisors = res.data.advisors;
  },
  methods: {
    handleCollegeClicked(val) {
      this.advisorList = this.advisors
        .filter((item) => item.college === val)
        .map((item) => ({
          value: item.advisor,
          label: item.advisor,
        }));
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