<template>
  <div class="app-container flex-item">
    <div class="bg-white" style="height: 100%">
      <el-table ref="mainTable" height="calc(100vh - 155px)" :key="tableKey" :data="tableList" v-loading="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="createId" label="登入帳號" min-width="150"></el-table-column>
        <el-table-column prop="createName" label="登入姓名"></el-table-column>
        <el-table-column prop="ip" label="登入IP"></el-table-column>
        <el-table-column prop="content" label="登入結果"></el-table-column>
        <el-table-column prop="createTime" label="登入時間"></el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleCurrentChange" />
    </div>

  </div>
</template>


<script>
import * as syslogs from "@/api/syslogs";
import pagination from "@/components/Pagination";

export default {
  components: { pagination },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        key: "登錄日誌",
      },

      listLoading: true,
      tableKey: 0,
      tableList: [],
      total: null,
    };
  },
  methods: {
    async getList() {
      this.listLoading = true;
      await syslogs.getList(this.listQuery).then((res) => {
        console.log(res);
        const { code, data, count } = res;
        if (code === 200) {
          this.tableList = data;
          this.total = count;
        }
        this.listLoading = false;
      });
    },

    handleCurrentChange(val) {
      this.listQuery.page = val.page;
      this.listQuery.limit = val.limit;
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
