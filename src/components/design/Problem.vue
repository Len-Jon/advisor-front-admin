<template>
  <div class="main">
    <p>题型</p>
    <el-form
      ref="form"
      :model="form"
      class="form"
    >
      <div class="mid-content">
        <el-form-item>
          <el-select
            v-model="problemItem.type"
            placeholder="请选择"
            width="50"
            @change="handleChange"
          >
            <el-option
              v-for="item in typeMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            class="tigan"
            placeholder="题干"
            v-model="problemItem.title"
          ></el-input>
        </el-form-item>
        <el-button
          class="deleteBtn"
          size="medium"
          type="danger"
          @click="handleDelete"
        >删除</el-button>
      </div>
      <div
        v-if="problemItem.type === '单选'"
        class="bottom-content"
      >
        <Single :options.sync="problemItem.options" />
      </div>
    </el-form>
  </div>
</template>


<script>
import Single from "./Single.vue";
export default {
  props: ["index", "problemItem"],
  components: {
    Single,
  },
  data() {
    return {
      form: {},
      typeMap: [
        { value: "单选", label: "单选" },
        { value: "问答", label: "问答" },
      ],
    };
  },
  methods: {
    handleChange() {
      console.log(this.type);
    },
    handleDelete() {
      this.$emit("handleDelete", this.index)
    }
  },
};
</script>


<style scoped>
.main {
  margin-left: 13%;
}

.top-content {
  display: flex;
  justify-content: space-between;
}

.mid-content {
  display: flex;
}

.el-select {
  width: 100px;
  margin-right: 40px;
}

p {
  font-size: 10px;
  color: #9d9d9d;
  margin: 0;
  padding: 0;
  width: 90%;
  margin: 0 auto;
}

.tigan {
  width: 720px;
}

.el-form-item {
  margin: 0;
}

.form {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.deleteBtn {
  margin-left: 20px;
}
</style>