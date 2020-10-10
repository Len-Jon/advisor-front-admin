<template>
  <div>
    <div class="head">
      <img
        class="logo"
        src="../assets/imgs/njupt.png"
        alt=""
      >
      <div class="wenzi">请登录</div>
    </div>
    <div>
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
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-on:keyup.enter.native="userLogin"
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="underInput">
      <el-checkbox
        class="remember"
        v-model="checked"
      >记住密码</el-checkbox>
      <el-button
        @click="userLogin"
        class="button"
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
        console.log(valid);
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
            this.$router.push("/users")
            break;
        }
      });
    },
  },
};
</script>


<style scoped>
.head {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo {
  width: 100px;
  position: relative;
  top: 14vh;
  left: -0.3vw;
}

.wenzi {
  font-size: 30px;
  font-weight: 800;
  margin-top: 140px;
}

.input {
  width: 350px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 33.3vh;
  margin-top: 10px;
  margin-bottom: 10px;
}

.underInput {
  position: relative;
  top: 32vh;
  left: 50vw;
}

.button {
  position: relative;
  top: 5px;
  left: 0.8%;
}

.remember {
  position: relative;
  left: -10vw;
}
</style>