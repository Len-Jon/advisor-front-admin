<template>
  <div>
    <div class="buttons">
      <!-- <el-button size="medium" type="primary">新增一项</el-button>
      <el-button size="medium" type="success">提交</el-button> -->
    </div>
    <Problem />
  </div>
</template>


<script>
import Problem from './Problem.vue'
export default {
  data() {
    return {
      
    }
  },
  components: {
    Problem
  }
}
</script>


<style scoped>
.buttons {
  position: relative;
  left: 13%;
}
</style>