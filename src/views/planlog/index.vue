<template>
  <div class="app-container flex-item">
    <div class="bg-white" style="height: 100%">
      <el-table ref="mainTable" height="calc(100vh - 155px)" :key="tableKey" :data="tableList" v-loading="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="q1" label="希望資金來源" min-width="100"></el-table-column>
        <el-table-column prop="q2" label="是否已成立公司行號" min-width="100"></el-table-column>
        <el-table-column prop="q3" label="公司登記日期"></el-table-column>
        <el-table-column prop="q4" label="公司登記地"></el-table-column>
        <el-table-column prop="q5" label="主要產品/服務"></el-table-column>
        <el-table-column prop="q6" label="發展階段"></el-table-column>
        <el-table-column prop="q7" label="資金需求範圍"></el-table-column>
        <el-table-column prop="q8" label="資金用途"></el-table-column>
        <el-table-column prop="q9" label="產業類別"></el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleCurrentChange" />
    </div>

  </div>
</template>


<script>
import moment from "moment";
import * as planss from "@/api/planss";
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
      await planss.planLog(this.listQuery).then((res) => {
        console.log(res);
        const { code, data, count } = res;
        if (code === 200) {
          this.tableList = data.map((item) => {
            item.q3 = moment(item.q3).format("YYYY-MM-DD");
            return item;
          });
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
