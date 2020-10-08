<template>
  <div class="top">
    <el-select v-model="chosenValue" placeholder="请选择">
      <el-option
        v-for="item in college"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button size="medium" type="primary">导出完成人数</el-button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      collegeNames: [],
      chosenValue: '所有学院'
    }
  },
  computed:{
    college(){
      return this.collegeNames.map(item => ({ value: item,label: item }) )
    }
  },
  created: async function() {
    var { data } = await this.$http.get('admin')
    data = data.data
    this.collegeNames.push('所有学院')
    let tmp = JSON.parse(data.collegeNames);
    this.collegeNames = this.collegeNames.concat(tmp)
    console.log(this.collegeNames)
   }
}
</script>


<style scoped>
.top {
  position: relative;
  left: 13%;
}

.el-button {
  display: block;
}

</style>