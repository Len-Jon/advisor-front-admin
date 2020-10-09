<template>
  <div class="accountTable">
    <el-button
      class="addAccountBtn"
      type="success"
    >添加账号</el-button>
    <el-table :data="accountData">
      <el-table-column
        prop="username"
        label="用户名"
        width="170"
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
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="enabled"
        label="已启用"
        width="80"
      >
      </el-table-column>
      <el-table-column label="操作">
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
          >删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialog"
    >
      <el-form :model="editForm">
        <el-form-item label="用户名">
          <el-input
            v-bind:value="dialogData"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="editForm.password"
            autocomplete="off"
            placeholder="密码为空则不修改"
          ></el-input>
          <p class="passwordkong"></p>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
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
            v-model="turnOn"
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      accountData: [],
      editDialog: true,
      dialogData: "",
      editForm: {
        username: "123",
        password: "",
      },
      turnOn: false
    };
  },
  created: async function() {
    let { data } = await this.$http.get("account");
    data = data.data;
    this.accountData = data.account;
    this.accountData = this.tableData;
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
  },
  methods: {
    async handleEdit(scope) {
      console.log("scope:", scope);
      this.editDialog = true;
      this.accountData = this.tableData;
      this.editForm.username = scope.row.username;
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
  top: 3%;
  width: 70%;
  margin: 0 auto;
}

.el-table {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.addAccountBtn {
  margin-bottom: 20px;
}
</style>