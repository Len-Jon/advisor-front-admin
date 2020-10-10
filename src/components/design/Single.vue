<template>
  <el-form class="single">
    <div
      v-for="(item, index) in options"
      :key="index"
      class="option-item"
    >
      <el-form-item>
        <el-input
          class="littleInput"
          placeholder="选项"
          v-model="item.choose"
        ></el-input>
      </el-form-item>
      <el-form-item prop="score">
        <el-input
          class="littleInput"
          placeholder="分值"
          v-model="item.score"
        ></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>


<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rules: {
        choose: [{ required: true, message: "请输入选项", trigger: "blur" }],
        score: [{ required: true, message: "请输入分值", trigger: "blur" }],
      },
    };
  },
};
</script>


<style scoped>
.single {
  display: flex;
}

.option-item {
  display: flex;
}

.littleInput {
  width: 70px;
  margin-right: 15px;
  margin-top: 25px;
}
</style>