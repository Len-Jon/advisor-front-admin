<template>
  <div class="single">
    <el-form
      v-for="(item, index) in options"
      :key="index"
      class="option-item"
      :model="item"
      :rules="rules"
    >
      <el-form-item prop="choose">
        <el-input
          class="bigInput"
          placeholder="选项"
          v-model="item.choose"
          size="medium"
        ></el-input>
      </el-form-item>
      <el-form-item prop="score">
        <el-input
          class="littleInput"
          placeholder="分值"
          v-model.number="item.score"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
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
        score: [
          { required: true, message: "请输入分值", trigger: "blur" },
          { type: "number", message: "分值必须为数字" },
        ],
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

.bigInput {
  width: 110px;
  margin-right: 15px;
  margin-top: 25px;
}

.littleInput {
  width: 60px;
  margin-right: 15px;
  margin-top: 25px;
}
</style>