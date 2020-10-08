<template>
  <el-container class="home-container">
    <el-header>
      <router-link class="word" to="/admin">辅导员评议</router-link>
      <div @click="logoutVisible = true" class="logout">
        <i class="el-icon-switch-button"></i>
      </div>
      <!-- 退出提示框 -->
      <el-dialog
        title="提示"
        :visible.sync="logoutVisible"
        width="30%"
      >
        <span>确定要退出吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="logout">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 前往登录提示框 -->
      <el-dialog
        title="退出成功！"
        :visible.sync="nextLogoutVisible"
        width="30%"
      >
        <span>即将前往登录页面</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="nextLogoutVisible = false">取 消</el-button>
          <el-button type="primary" @click="toLogin">确 定</el-button>
        </span>
      </el-dialog>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '115px' : '200px'">
        <el-radio-group :collapse="true" v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">
            <i class="el-icon-s-unfold"></i>
          </el-radio-button>
          <el-radio-button :label="true">
            <i class="el-icon-s-fold"></i>
          </el-radio-button>
        </el-radio-group>
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="1">
            <i class="el-icon-s-data"></i>
            <span slot="title">统计面板</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">账号管理</span>
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
      isCollapse: false,
      logoutVisible: false,
      nextLogoutVisible: false
   }
  },
  methods: {
    async logout() {
      
      const { data } = await this.$http.get('logout')
      console.log(data)
      if(data.code !== 200) return
      this.nextLogoutVisible = true
    },
    toLogin() {
      this.nextLogoutVisible = false
      this.$router.push('/login')
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

.logout {
  display: inline;
  font-size: 30px;
  position: relative;
  left: 80%;
  top: 15%;
}
</style>