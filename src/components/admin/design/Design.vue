<template>
  <div class="main">
    <div class="mainDiv">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item prop="content">
          <el-input
            style="margin-top: 20px; width: 65%;"
            placeholder="请输入头图标题"
            v-model="ruleForm.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="topBtns">
        <el-upload
          action="api/api/img_upload"
          list-type="picture"
          :limit="1"
          with-credentials
          :on-success="handleSuccess"
        >
          <el-button style="margin-top: 20px;" size="medium" type="primary">点击上传问卷头图</el-button>
        </el-upload>
      </div>
    </div>
    <div class="btns">
      <el-button size="medium" type="primary" @click="handleAddProblem">新增一项</el-button>
      <el-button
        size="medium"
        type="success"
        @click="showLoading"
        v-loading.fullscreen.lock="loading"
      >提交</el-button>
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
      picUrl: "",
      ruleForm: {
        content: "",
      },
      rules: {
        content: [
          { required: true, message: "请输入头图标题", trigger: "blur" },
        ],
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
        options: new Array(5).fill().map(() => ({ choose: "", score: "" })),
      });
    },

    showLoading() {
      const loading = this.$loading({
        lock: true,
        text: "正在提交",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let resCode = this.handleSubmit();
      if (resCode === 200) loading.close();
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

    handleSuccess(res) {
      console.log("res", res);
      this.picUrl = res.data.img_url;
      if (this.ruleForm.content.length === 0)
        return this.$message.error("请输入头图标题");
      if (res.code !== 200) return this.$message.error("上传失败！");
      this.$message.success("上传成功！");
      this.setTitle(this.picUrl);
    },
    async setTitle(url) {
      const res = await this.$http.post("api/setTitle", {
        content: this.ruleForm.content,
        imgUrl: url,
      });
      console.log("settitle,res", res);
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
  margin-top: 40px;
}

.mainDiv {
  margin-left: 13%;
}

.topBtns {
  display: flex;
}
</style>