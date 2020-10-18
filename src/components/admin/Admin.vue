<template>
  <el-container class="home-container">
    <!-- 头部 -->
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
          <el-button @click="logoutVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="logout"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <el-menu
          class="el-menu-vertical-demo"
          :router="true"
          :default-active="activePath"
        >
          <el-menu-item
            index="/admin/statistic"
            @click="saveNavState('/admin/statistic')"
          >
            <i class="el-icon-s-data"></i>
            <span slot="title">统计面板</span>
          </el-menu-item>
          <el-menu-item
            index="/admin/account"
            @click="saveNavState('/admin/account')"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">账号管理</span>
          </el-menu-item>
          <el-menu-item
            index="/admin/advisor"
            @click="saveNavState('/admin/advisor')"
          >
            <i class="el-icon-user-solid"></i>
            <span slot="title">导员管理</span>
          </el-menu-item>
          <el-menu-item
            index="/admin/design"
            @click="saveNavState('/admin/design')"
          >
            <i class="el-icon-setting"></i>
            <span slot="title">设计问卷</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main h>
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
      nextLogoutVisible: false,
      // 激活链接
      activePath: "",
    };
  },
  methods: {
    async logout() {
      const data = await this.$http.get("logout");
      console.log(data);
      if (data.code !== 200) return;
      this.logoutVisible = false;
      this.$message.success("操作成功！即将返回登录页面");
      this.$router.push("/login");
    },
    // 保存链接激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
  },
  // beforeCreate: async function() {
  //   try {
  //     const data = await this.$http.get("admin");
  //     console.log(data)
  //   } catch (err) {
  //     console.log(err)
  //     // this.$message.error(data.msg);
  //     this.$router.push("/login");
  //   }
  // },
  created: async function() {
    const data = await this.$http.get("admin");
    console.log(data);
    // 保存侧边栏点击状态
    this.activePath = window.sessionStorage.getItem("activePath");
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

.el-aside {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
