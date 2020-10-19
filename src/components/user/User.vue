<template>
  <el-container class="home-container">
    <el-header>
      <router-link
        class="word"
        to="/admin"
      >辅导员评议</router-link>
      <div
        @click="logoutVisible = true"
        class="logout"
      >
        <i class="el-icon-switch-button"></i>
      </div>
      <!-- 退出提示框 -->
      <el-dialog
        title="提示"
        :visible.sync="logoutVisible"
        width="30%"
      >
        <span>确定要退出吗？</span>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="logout"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-header>
    
    <el-container>
      <el-aside>
        <el-menu
          router
          :default-active="activePath"
        >
          <el-menu-item
            index="/user/statistic"
            @click="saveNavState('/user/statistic')"
          >
            <i class="el-icon-s-data"></i>
            <span slot="title">统计面板</span>
          </el-menu-item>
          <el-menu-item
            index="/user/advisor"
            @click="saveNavState('/user/advisor')"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">导员详情</span>
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
      logoutVisible: false,
      activePath: "",
    };
  },
  methods: {
    async logout() {
      const data = await this.$http.get("logout");
      console.log(data);
      if (data.code !== 200) return this.$message.error("操作失败！");
      this.$message.success("操作成功！即将返回登录页面");
      this.logoutVisible = false;
      this.$router.push("/login");
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
  },
  created: function() {
    // 保存侧边栏点击状态
    this.activePath = window.sessionStorage.getItem("activePath");
    console.log(this.activePath);
  },
  
  beforeCreate: async function() {
    try {
      const data = await this.$http.get("admin");
      console.log(data)
    } catch (err) {
      console.log(err)
      this.$message.error(err);
      this.$router.push("/login");
    }
  },
};
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
  color: white;
  position: relative;
  left: 85%;
  top: 15%;
}
</style>