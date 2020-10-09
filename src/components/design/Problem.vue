<template>
  <div>
    <el-form
      ref="form"
      :model="form"
    >
      <el-form-item>
        <p>题型</p>
        <el-select
          v-model="type"
          placeholder="请选择"
          width="50"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      form: {},
      options: [
        { value: "single", label: "单选" },
        { value: "wenda", label: "问答" },
      ],
      type: "",
    };
  },
};
</script>


<style scoped>
.el-select {
  width: 100px;
}

p {
  font-size: 10px;
  color: #9D9D9D;
  margin: 0;
  padding: 0;
}
</style>