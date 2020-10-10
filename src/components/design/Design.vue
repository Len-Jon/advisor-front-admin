<template>
  <div class="main">
    <div>
      <el-button
        size="medium"
        type="primary"
        @click="handleAddProblem"
      >新增一项</el-button>
      <el-button
        size="medium"
        type="success"
        @click="handleSubmit"
      >提交</el-button>
    </div>
    <Problem
      v-for="(item, index) in problems"
      :key="index"
      :index="index"
      :type.sync="item.type"
      :title.sync="item.title"
      :options.sync="item.options"
      @handleDelete="handleProblemDelete"
    />
  </div>
</template>


<script>
import Problem from "./Problem.vue";
export default {
  data() {
    return {
      problems: [],
      problem: {
        type: "",
        title: "",
        options: null,
      },
    };
  },
  components: {
    Problem,
  },
  methods: {
    handleAddProblem() {
      this.problems.push({
        ...this.problem,
        options: [
          { choose: "", score: "" },
          { choose: "", score: "" },
          { choose: "", score: "" },
          { choose: "", score: "" },
          { choose: "", score: "" },
        ],
      });
    },
    async handleSubmit() {
      const submitData = this.problems.reduce(
        (prev, curr) => {
          prev.type.push(curr.type);
          prev.title.push(curr.title);
          prev.options.push(
            ...curr.options
              .map((item) => item.choose)
              .filter((item) => item.length !== 0)
          );
          prev.score.push(
            ...curr.options
              .map((item) => Number(item.score))
              .filter((item) => item)
          );

          return prev;
        },
        {
          type: [],
          title: [],
          options: [],
          score: [],
        }
      );
      console.log(submitData);
    },
    handleProblemDelete(index) {
      this.problems.splice(index, 1);
    },
  },
};
</script>


<style scoped>
.main {
  /* position: relative; */
  margin: 0 auto;
}
</style>