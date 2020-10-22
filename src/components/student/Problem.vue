<template>
  <div class="main">
    <el-form ref="singleProblemRef" :model="singleProblemForm">
      <!-- 单选题 -->
      <div class="bottom-problem" v-if="type === 1">
        <span class="content">{{rank}}、{{content}}</span>
        <el-form-item prop="single">
          <el-radio-group
            v-model="singleProblemForm.selectedOption"
            v-for="(item, index) in optionEntities"
            :key="index"
            @change="handleSelectChange"
          >
            <el-radio :label="item.rank">{{item.content}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <el-form ref="wendaProblemRef" :rules="wendaProblemRules" :model="wendaProblemForm">
      <!-- 问答题 -->
      <div class="bottom-problem" v-if="type === 2">
        <span class="content">{{rank}}、{{content}}</span>
        <el-form-item prop="wenda">
          <el-input type="textarea" class="wenda" v-model="wendaProblemForm.wendaContent"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import eventHub from "@/eventHub.js";

export default {
  props: ["rank", "type", "content", "optionEntities", "problemId"],
  data() {
    return {
      singleProblemForm: {
        selectedOption: 0,
        // wendaContent: "",
      },
      wendaProblemForm: {
        // selectedOption: 0,
        wendaContent: "",
      },
      wendaProblemRules: {
        // single: [{ required: true, message: "请填写此项", trigger: "change" }],
        wenda: [{ required: true, message: "请填写此项", trigger: "blur" }],
      },
    };
  },
  watch: {
    singleProblemForm: {
      handler: function(newVal) {
        console.log(newVal);
        this.$emit("updateAnswer", {
          problemId: this.problemId,
          content: String(newVal.selectedOption),
        });
      },
      deep: true,
    },
    wendaProblemForm: {
      handler: function(newVal) {
        console.log(newVal);
        this.$emit("updateAnswer", {
          problemId: this.problemId,
          content: String(newVal.wendaContent),
        });
      },
      deep: true,
    },
  },
  methods: {
    async validteData() {
      let singleRes = this.validSingle();
      let wendaRes = this.validWenda();
      console.log(singleRes);
      console.log(wendaRes);
      // if (singleRes && wendaRes) {
      //   let res = await this.$http.post("submit", this.submitForm);
      //   console.log(this.submitForm);
      //   if (res.data.title === "你已经提交过啦") this.$route.push("/fail");
      //   if (res !== 200)
      //     return this.$message.error(res.data.title, res.data.content);
      //   return this.$message.success("提交成功，感谢您参与本次调查！");
      // } else {
      //   console.log("fail");
      // }
    },
    validSingle() {
      this.$refs.singleProblemRef.validate((valid) => {
        if (valid) {
          return true;
        } else {
          console.log("fail!!!");
          return false;
        }
      });
    },
    validWenda() {
      this.$refs.wendaProblemRef.validate((valid) => {
        console.log("vaild", valid);
        if (valid) {
          return true;
        } else {
          console.log("fail!!!");
          return false;
        }
      });
    },
    handleSelectChange() {
      console.log(this.singleProblemForm.selectedOption);
    },
  },
  created: function() {
    eventHub.$on("validteData", this.validteData);
  },
};
</script>


<style scoped>
.main {
  width: 90%;
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
</style>