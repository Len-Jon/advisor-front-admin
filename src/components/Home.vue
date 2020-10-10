<template>
  <el-container class="home-container">
    <el-header>
      <router-link class="word" to="/admin">辅导员评议</router-link>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '115px' : '200px'">
        <!-- <el-radio-group :collapse="true" v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">
            <i class="el-icon-s-unfold"></i>
          </el-radio-button>
          <el-radio-button :label="true">
            <i class="el-icon-s-fold"></i>
          </el-radio-button>
        </el-radio-group> -->
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <span slot="title">导员管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>          
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      isCollapse: false
   }
  }
}
</script>


<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #3f51b5;
}

.word {
  color: white;
  font-size: 30px;
  text-decoration: none;
  position: relative;
  top: 5px;
  left: 20px;
}
</style>