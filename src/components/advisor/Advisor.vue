<template>
  <div class="main">
    <el-button size="medium" type="success">添加导员</el-button>
    <el-table
      :data="tableData"
      style="width: 70%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      
   }
  }
}
</script>


<style scoped>
.main {
  position: relative;
  left: 13%;
}

.el-table {
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>