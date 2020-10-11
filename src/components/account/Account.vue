<template>
  <div class="accountTable">
    <el-button
      class="addAccountBtn"
      type="success"
      size="medium"
      @click="addDialogVisible=true"
    >添加账号</el-button>
    <el-table
      :data="accountData"
      style="width: 70%;"
    >
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="college"
        label="学院"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="已完成人数"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="enabled"
        label="已启用"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope)"
            type="success"
            class="editBtn"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.username !== 'admin'"
            @click="handleDeleteBtnClicked(scope)"
          >删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 添加账号弹框 -->
    <el-dialog
      title="添加账号"
      :visible.sync="addDialogVisible"
    >
      <el-form
        ref="addFormRef"
        :model="addForm"
      >
        <el-form-item
          prop="username"
          label="用户名"
        >
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
        >
          <el-input
            v-model="addForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="college"
          label="学院"
        ><br>
          <el-select
            v-model="college"
            placeholder="请选择"
          >
            <el-option
              v-for="item in colleges"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="enable">
          <p>是否启用</p>
          <el-switch
            v-model="enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addAccount"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
    >
      <el-form :model="editForm">
        <el-form-item label="用户名">
          <el-input
            v-bind:value="editForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="editForm.password"
            placeholder="密码为空则不修改"
          ></el-input>
        </el-form-item>
        <el-form-item label="学院"><br>
          <el-select
            v-model="college"
            placeholder="请选择"
          >
            <el-option
              v-for="item in colleges"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <p>是否启用</p>
          <el-switch
            v-model="enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editDialogVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      title="警告"
      :visible.sync="deleteDialogVisible"
      width="30%"
    >
      <span>该操作不可逆，确定要删除吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="danger"
          @click="handleDelete()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { getCollegeList } from "../../api/getCollegeList.js";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      accountData: [],
      editDialogVisible: false,
      addDialogVisible: false,
      dialogData: "",
      editForm: {
        username: "",
        password: "",
        enable: true,
        college: "",
      },
      addForm: {
        username: "",
        password: "",
        enable: true,
        college: "",
      },
      enable: true,
      collegeList: [],
      college: "",
      deleteDialogVisible: false,
      deleteUsername: "",
    };
  },
  created: async function() {
    // 获取学院列表
    let res = await getCollegeList();
    console.log(res);
    res.data.pop();
    this.collegeList = res.data;
    if (res.code !== 200) return;
    this.collegeList = res.data;
    console.log("computed:", this.colleges);
    console.log("computed:", this.tableData);

    // 获取用户数据
    let { data } = await this.$http.get("account");
    console.log("data:", data);
    this.accountData = data;
    this.accountData = this.tableData;
    console.log("username:", this.username);
  },
  computed: {
    tableData() {
      return this.accountData.map(function(item) {
        switch (item.enabled) {
          case true:
            item.enabled = "是";
            break;
          case false:
            item.enabled = "否";
            break;
        }
        return {
          username: item.username,
          college: item.college,
          count: item.count,
          enabled: item.enabled,
        };
      });
    },
    colleges() {
      return this.collegeList.map((item) => ({ value: item, label: item }));
    },
    username() {
      return this.tableData.map((item) => item.username);
    },
  },
  watch: {
    enable(val) {
      this.addForm.enable = val;
      this.editForm.enable = val;
    },
    college(val) {
      this.addForm.college = val;
      this.editForm.college = val;
    },
  },
  methods: {
    async handleEdit(scope) {
      console.log("scope:", scope);
      this.editDialogVisible = true;
      this.accountData = this.tableData;
      this.editForm.username = scope.row.username;
    },
    async addAccount() {
      this.addDialogVisible = false;
      console.log(this.addForm);
      const data = await this.$http.post("api/account/add", this.addForm);
      console.log('data', data);
      this.$refs.addFormRef.resetFields();

      if (data.code !== 200)
        this.$message.error(data.data.msg);
      setTimeout("location.reload()", 2000)
    },
    async handleDelete() {
      const data = await this.$http.post(
        `api/account/delete/${this.deleteUsername}`
      );
      console.log("deletedata", data);
      if(data.code === 200)
      this.$message.success('操作成功！')
      this.deleteDialogVisible = false;
      setTimeout("location.reload()", 2000)
    },
    handleDeleteBtnClicked(scope) {
      this.deleteDialogVisible = true;
      this.deleteUsername = scope.row.username;
      console.log(this.deleteUsername);
    },
  },
};
</script>


<style>
.editBtn {
  margin-right: 20px;
}

.el-table td {
  text-align: center;
}

.el-table th {
  text-align: center;
}

.accountTable {
  position: relative;
  margin-left: 13%;
}

.el-table {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>