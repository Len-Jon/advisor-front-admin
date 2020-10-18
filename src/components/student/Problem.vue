<template>
  <div class="main">
    <!-- 单选题 -->
    <div v-if="type === 1">
      <span class="content">{{rank}}、{{content}}</span>
      <el-radio-group
        v-model="selectedOption"
        v-for="(item, index) in optionEntities"
        :key="index"
      >
        <el-radio
          @change="handleClick"
          :label="item.rank"
        >{{item.content}}</el-radio>
      </el-radio-group>
    </div>

    <!-- 问答题 -->
    <div v-else>
      <span>{{rank}}、{{content}}</span>
      <el-input
        class="wenda"
        v-model="wendaContent"
      ></el-input>
    </div>
  </div>
</template>


<script>
export default {
  props: ["rank", "type", "content", "optionEntities", "problemId"],
  data() {
    return {
      selectedOption: "",
      wendaContent: "",
    };
  },
  watch: {
    wendaContent(newVal) {
      this.$emit("updateAnswer", {
        problemId: this.problemId,
        content: String(newVal),
      });
    },
  },
  methods: {
    handleClick(val) {
      this.$emit("updateAnswer", {
        problemId: this.problemId,
        content: String(val),
      });
    },
  },
  computed: {},
};
</script>


<style scoped>
.main {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
}

.el-radio-group {
  display: flex;
  flex-direction: column;
}

.el-radio {
  width: 100%;
  display: flex;
  margin-top: 6px;
}

.content {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}

.wenda {
  height: 5px;
  margin-top: 6px;
  margin-bottom: 2rem;
}
</style>