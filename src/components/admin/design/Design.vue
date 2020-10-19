<template>
  <div class="main">
    <div class="btns">
      <el-button
        size="medium"
        type="primary"
        @click="handleAddProblem"
      >新增一项</el-button>
      <el-button
        size="medium"
        type="success"
        @click="showLoading"
        v-loading.fullscreen.lock="loading"
      >
        提交</el-button>
    </div>
    <Problem
      v-for="(item, index) in problems"
      :key="index"
      :index="index"
      :problemItem.sync="problems[index]"
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
        options: [],
      },
      loading: false,
    };
  },
  components: {
    Problem,
  },
  methods: {
    handleAddProblem() {
      this.problems.push({
        ...this.problem,
        options: new Array(5).fill().map(() => ({ choose: "", score: "" })),
      });
    },
    showLoading() {
      this.loading = true;
      let resCode = this.handleSubmit();
      if (resCode === 200) this.loading = false;
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
          if (curr.type === "单选") {
            prev.score.push(...curr.options.map((item) => item.score));
          }
          return prev;
        },
        {
          type: [],
          title: [],
          options: [],
          score: [],
        }
      );
      const res = await this.$http.post("api/design", submitData);
      console.log(res);
      if (res.code !== 200) return this.$message.error("提交失败！");
      this.$message.success("提交成功！");
      setTimeout("location.reload()", 1000);
      return res.code;
    },

    handleProblemDelete(index) {
      this.problems.splice(index, 1);
    },
  },

  created: async function() {
    const res = await this.$http.get("design");
    console.log("designres", res);
    if (res.code !== 200) return this.$message.error("获取问卷信息失败！");
    let designData = res.data;
    if (designData.length === 0) return;
    for (let i = 0; i < designData.length; i++) {
      this.problem.type = designData[i].type === 1 ? "单选" : "问答";
      this.problem.title = designData[i].content;
      console.log("problemoptions", this.problem.options);

      designData[i].optionEntities.forEach((item) => {
        const optionItem = {
          choose: item.content,
          score: item.score,
        };
        this.problem.options.push(optionItem);
      });

      this.problems.push(this.problem);
      this.problem = {
        type: "",
        title: "",
        options: [],
      };
    }
  },
};
</script>


<style scoped>
.btns {
  margin-left: 13%;
}
</style>