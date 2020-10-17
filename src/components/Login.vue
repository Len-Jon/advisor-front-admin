<template>
  <div class="login">
    <div class="head">
      <p class="head-title">辅导员评议系统</p>
      <img
        class="head-logo"
        src="../assets/imgs/njupt.png"
      />
    </div>
    <div class="input-container">
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        class="input"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-on:keyup.enter.native="userLogin"
            placeholder="请输入密码"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="options-container">
      <el-checkbox
        class="remember"
        v-model="checked"
      >记住密码</el-checkbox>
      <el-button
        @click="userLogin"
        class="login-button"
        type="primary"
        size="medium"
      >登录</el-button>
    </div>
  </div>
</template>


<script>
import { getUserInfo } from "../api/getUserInfo.js";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      checked: false,
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    userLogin() {
      this.$refs["loginFormRef"].validate(async (valid) => {
        if (!valid) return;
        const data = await getUserInfo(this.loginForm);
        console.log(data);
        if (data.code !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功!");

        switch (data.data[0].authority) {
          case "ROLE_ADMIN":
            this.$router.push("/admin");
            break;
          case "ROLE_USER":
            this.$router.push("/user");
            break;
        }
      });
    },
  },
};
</script>


<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.head {
  display: inline-flex;
  flex-direction: column;
}

.head-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: bold;
}

.head-logo {
  width: 120px;
}

.input-container {
  margin-top: -35vh;
  width: 25vw;
  min-width: 200px;
}

.login-button {
  margin-top: -10px;
}

.options-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 25vw;
  min-width: 200px;
  margin-top: -40vh;
}
</style>