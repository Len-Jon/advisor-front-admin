<template>
  <div class="single">
    <el-form
      v-for="(item, index) in options"
      :key="index"
      class="option-item"
      :model="item"
      :rules="rules"
    >
      <el-form-item class="bigItem" prop="choose">
        <el-input
          class="bigInput"
          placeholder="选项"
          v-model="item.choose"
        ></el-input>
      </el-form-item>
      <el-form-item class="littleItem" prop="score">
        <span
           style="font-size: 10px;
                  color: #9d9d9d;
                  margin: 0;
                  padding: 0;
                  margin: 0 auto;
                  position: absolute;left: -32px;top: 25px;"
          >分值</span
        >
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
  flex-direction: column;
}

.option-item {
  width: 87%;
  display: flex;
  justify-content: space-between;
}

.bigInput {
  margin-top: 25px;
}

.littleInput {
  margin-top: 25px;
}

.bigItem {
  width: 86%;
  margin-right: 5%;
}

.littleItem {
  width: 70px;
  /* display: flex; */
}
</style>
