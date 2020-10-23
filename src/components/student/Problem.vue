<template>
  <div class="main">
    <!-- 单选题 -->
    <div>
      <div class="bottom-problem" v-if="type === 1">
        <span class="content">{{rank}}、{{content}}</span>
        <el-radio-group
          v-model="selectedOption"
          v-for="(item, index) in optionEntities"
          :key="index"
          @change="handleSelectChange"
        >
          <el-radio :label="item.rank">{{item.content}}</el-radio>
        </el-radio-group>
        <div v-show="showError" class="error">请填写此项</div>
      </div>
    </div>
    <!-- 问答题 -->
    <div class="bottom-problem" v-if="type === 2">
      <span class="content">{{rank}}、{{content}}</span>
      <el-input type="textarea" class="wenda" v-model="wendaContent"></el-input>
      <div v-show="showError" class="error">请填写此项</div>
    </div>
  </div>
</template>


<script>
import eventHub from "@/eventHub.js";

export default {
  props: [
    "rank",
    "type",
    "content",
    "optionEntities",
    "problemId",
    "submitForm",
  ],
  data() {
    return {
      selectedOption: 0,
      wendaContent: "",
      showError: false,
      toSubmitForm: {
        college: "",
        advisor: "",
        answerEntityList: [],
      },
    };
  },
  watch: {
    selectedOption(newVal) {
      const newAnswer = {
        problemId: this.problemId,
        content: String(newVal),
      };
      this.$emit("updateAnswer", newAnswer);
      this.showError = this.submitForm.content.length === 0;
      this.submitForm.isEmpty = this.showError;
    },
    wendaContent(newVal) {
      this.$emit("updateAnswer", {
        problemId: this.problemId,
        content: String(newVal),
      });
      this.showError = this.submitForm.content.length === 0;
      this.submitForm.isEmpty = this.showError;
    },
  },
  methods: {
    validateData() {
      this.showError = this.submitForm.content.length === 0;
      this.submitForm.isEmpty = this.showError;
    },
    handleSelectChange() {
      console.log(this.selectedOption);
    },
    async handleSubmit() {
      let res = await this.$http.post("submit", this.submitForm);
      console.log(this.submitForm);
      if (res.data.title === "你已经提交过啦") this.$route.push("/fail");
      if (res !== 200)
        return this.$message.error(res.data.title, res.data.content);
      return this.$message.success("提交成功，感谢您参与本次调查！");
    },
  },
  created: function() {
    eventHub.$on("validteData", this.validateData);
  },
};
</script>


<style scoped>
.main {
  width: 95%;
}

.el-radio-group {
  display: flex;
  flex-direction: column;
}

.el-radio {
  width: 100%;
  display: flex;
  margin-top: 10px;
}

.content {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: normal;
}

.bottom-problem {
  margin-left: 5%;
}

.error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: relative;
  top: 100%;
  left: 0;
}
</style>