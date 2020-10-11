<template>
  <div class="main">
    <el-button
      size="medium"
      type="success"
      @click="addAdvisorVisible = true"
    >添加导员</el-button>
    <el-table
      :data="advisors"
      style="width: 70%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="advisor"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="college"
        label="学院"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="已完成人数"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
          >详情</el-button>
          <el-button
            size="medium"
            type="success"
            @click="handleEdit(scope)"
          >编辑</el-button>
          <el-button
            size="medium"
            type="danger"
            @click="clickedId = scope.row.id;deleteDialogVisible = true"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加账号弹框 -->
    <el-dialog
      title="添加导员"
      :visible.sync="addAdvisorVisible"
    >
      <el-form :model="addAdvisorForm">
        <el-form-item label="姓名">
          <el-input v-model="addAdvisorForm.advisor"></el-input>
        </el-form-item>
        <!-- 学院列表 -->
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
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addAdvisorVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addAdvisor"
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
          @click="handleDelete"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
    >
      <el-form :model="editForm">
        <el-form-item label="ID">
          <template>
            <el-input v-bind:value="scope.row.id"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.advisor"></el-input>
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
  </div>
</template>


<script>
import { getCollegeList } from "../../api/getCollegeList.js";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      advisors: [],
      addAdvisorVisible: false,
      addAdvisorForm: {
        advisor: "",
        college: "",
      },
      collegeList: [],
      college: "",
      clickedId: 0,
      deleteDialogVisible: false,
      editDialogVisible: true,
      editForm: {
        id: 0,
        advisor: "",
        college: "",
      },
    };
  },
  created: async function() {
    let data = await this.$http.get("advisor");
    if (data.code !== 200) this.$message.error("发生错误！");
    this.advisors = data.data;
    console.log(data);

    // 获取学院列表
    let res = await getCollegeList();
    res.data.pop();
    this.collegeList = res.data;
  },
  methods: {
    async addAdvisor() {
      this.addAdvisorForm.college = this.college;
      const data = await this.$http.post(
        "api/advisor/add",
        this.addAdvisorForm
      );
      console.log(this.addAdvisorForm);
      console.log(data);
      if (data.code !== 200) this.$message.error("错误！");
      this.$message.success("操作成功！");
      setTimeout("location.reload()", 2000);
    },
    async handleDelete() {
      const data = await this.$http.post(
        `api/advisor/delete/${this.clickedId}`
      );
      console.log(data);
      if (data.code !== 200) this.$message.error(data.data.msg);
      this.deleteDialogVisible = false;
      this.$message.success("操作成功！");
      setTimeout("location.reload()", 2000);
    },
    handleEdit(scope) {
      this.editForm.advisor = scope.row.advisor;
    },
  },
  computed: {
    colleges() {
      return this.collegeList.map((item) => ({ value: item, label: item }));
    },
  },
};
</script>


<style>
.main {
  position: relative;
  /* left: 13%; */
  margin-left: 13%;
}

.el-table {
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-table td {
  text-align: center;
}

.el-table th {
  text-align: center;
}
</style>