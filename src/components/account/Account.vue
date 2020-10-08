<template>
  <div>
    <el-table
      :data="accountData"
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
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
      >
      </el-table-column>
      <el-table-column
        prop="enabled"
        label="已启用"
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
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>

          <!-- 编辑弹框 -->
          <el-dialog
            title="编辑"
            :visible.sync="editDialog"
          >
            <el-form :model="editForm">
              <el-form-item label="用户名">
                <el-input
                  v-bind:value="scope.row.username"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      accountData: [],
      editDialog: false,
      editForm: {
        name: "123",
      },
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
      console.log('scope:', scope);
      this.editDialog = true;
      this.accountData = this.tableData;
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
</style>