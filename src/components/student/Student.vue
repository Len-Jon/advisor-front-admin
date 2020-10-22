<template>
  <div>
    <div class="head">
      <img :src="imgUrl" alt="">
    </div>
    <span class="title">[2019-2020-2]南京邮电大学辅导员评议</span>
    <el-form ref="mainForm" :model="submitForm" :rules="submitFormRules">
      <el-form-item class="topSelect" prop="college">
        <el-select v-model="submitForm.college" placeholder="请选择学院" @change="handleCollegeClicked">
          <el-option
            v-for="item in colleges"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="topSelect" prop="advisor">
        <el-select v-model="submitForm.advisor" placeholder="请选择辅导员" @change="handleAdvisorClicked">
          <el-option
            v-for="item in advisorList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 题目 -->
      <Problem
        v-for="(item, index) in problems"
        :key="index"
        :rank="item.rank"
        :type="item.type"
        :problemId="item.id"
        :content.sync="item.content"
        :optionEntities.sync="item.optionEntities"
        @updateAnswer="handleAnswerChange"
      />
    </el-form>
    <el-button type="primary" @click="submitDesign('mainForm')">提交</el-button>
    <div class="bottom">
      <img src="@/assets/imgs/qylogo.png" alt="">
      <span class="banquan">青柚工作室提供技术支持</span>
    </div>
  </div>
</template>


<script>
import Problem from "./Problem.vue";
import eventHub from "@/eventHub.js";

export default {
  components: {
    Problem,
  },
  data() {
    return {
      colleges: [],
      advisors: [],
      advisorList: [],
      problems: [],
      submitForm: {
        college: "",
        advisor: "",
        answerEntityList: [],
        _csrf: "_csrf",
      },
      imgUrl: "",
      submitFormRules: {
        college: [{ required: true, message: "请选择学院", trigger: "change" }],
        advisor: [
          { required: true, message: "请选择辅导员", trigger: "change" },
        ],
        // answer: [
        //   { required: true, message: "请填写此项", trigger: "change" },
        // ],
      },
    };
  },
  async created() {
    const res = await this.$http.get("");
    if (res.data.title === "你已经提交过啦") return this.$router.push("/fail");
    console.log(res);
    this.problems = res.data.problems;
    console.log(res.data.problems);
    console.log("wendawenda", this.wendaProblems);
    this.colleges = res.data.colleges.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    this.advisors = res.data.advisors;
    this.getImageUrl();
  },
  methods: {
    handleCollegeClicked(val) {
      this.advisorList = this.advisors
        .filter((item) => item.college === val)
        .map((item) => ({
          value: item.advisor,
          label: item.advisor,
        }));
      this.submitForm.college = val;
    },

    handleAdvisorClicked(val) {
      this.submitForm.advisor = val;
    },

    handleAnswerChange({ problemId, content }) {
      const isExistBefore = this.submitForm.answerEntityList.find(
        (item) => item.problemId === problemId
      );
      if (!isExistBefore) {
        const newAnswer = {
          problemId,
          content,
        };
        this.submitForm.answerEntityList.push(newAnswer);
      } else {
        isExistBefore.content = content;
      }
    },
    submitDesign(formName) {
      // console.log(this.submitForm);
          eventHub.$emit("validteData");
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // let res = await this.$http.post("submit", this.submitForm);
          // console.log(this.submitForm);
          // if (res.data.title === "你已经提交过啦") this.$route.push("/fail");
          // if (res !== 200)
          //   return this.$message.error(res.data.title, res.data.content);
          // return this.$message.success("提交成功，感谢您参与本次调查！");
        } else {
          return false;
        }
      });
    },
    async getImageUrl() {
      let res = await this.$http.get("api/getTitle");
      console.log("imgurl", res);
      this.imgUrl = res.data.imgUrl;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style scoped>
.head img {
  width: 100%;
}

.title {
  font-weight: 800;
  display: block;
  margin: 10px 40px;
}

.topSelect {
  margin-top: 10px;
  width: 100%;
  margin-left: 50%;
  transform: translateX(-45%);
}

.el-button {
  width: 90%;
  margin-top: 8px;
  margin-left: 50%;
  transform: translateX(-50%);
}

.el-textarea {
  margin-top: 2rem;
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.el-select {
  width: 90%;
}

.bottom img {
  width: 6%;
}

.banquan {
  margin-left: 10px;
  text-shadow: 0 1px 1px #e9e9e9;
  font-size: 14px;
  color: #545454;
}

/* .el-form-item {
  margin: 0;
} */
</style>