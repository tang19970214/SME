<template>
  <div class="app-container flex-item">
    <sticky :className="'sub-navbar'">
      <div class="filter-container">
        <el-button type="warning" size="mini" @click="dialogFilter = true">篩選</el-button>
        <el-button type="primary" size="mini" @click="exportFile()">匯出</el-button>
      </div>
    </sticky>

    <div class="bg-white" style="height: 100%">
      <el-table ref="mainTable" height="calc(100vh - 195px)" :key="tableKey" :data="tableList" v-loading="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="q1" label="希望資金來源" min-width="100"></el-table-column>
        <el-table-column prop="q2" label="是否已成立公司行號" min-width="100"></el-table-column>
        <el-table-column prop="q3" label="公司登記日期"></el-table-column>
        <el-table-column prop="q4" label="公司登記地"></el-table-column>
        <el-table-column prop="q5" label="主要產品/服務"></el-table-column>
        <el-table-column prop="q6" label="發展階段"></el-table-column>
        <el-table-column prop="q7" label="資金需求範圍"></el-table-column>
        <el-table-column prop="q8" label="資金用途"></el-table-column>
        <el-table-column prop="q9" label="產業類別"></el-table-column>
        <el-table-column prop="createDate" label="創建時間"></el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleCurrentChange" />
    </div>

    <!-- 篩選 -->
    <el-dialog v-el-drag-dialog class="dialog-mini" width="600px" title="篩選" :visible.sync="dialogFilter" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :label-position="'right'" label-width="150px" ref="ruleForm" :model="listQuery">
        <el-form-item label="Q1 希望資金來源(多選)">
          <el-select class="w-full" v-model="listQuery.Q1" size="small" multiple>
            <el-option label="融資貸款" value="融資貸款"></el-option>
            <el-option label="政府補助" value="政府補助"></el-option>
            <el-option label="創投資金" value="創投資金"></el-option>
            <el-option label="競賽獎金" value="競賽獎金"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Q2 是否已成立公司行號">
          <el-select class="w-full" v-model="listQuery.Q2" size="small">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Q4. 發展階段(多選)">
          <el-select class="w-full" v-model="listQuery.Q6" size="small" multiple>
            <el-option label="尚無具體想法" value="尚無具體想法"></el-option>
            <el-option label="已有創業點子" value="已有創業點子"></el-option>
            <el-option label="產品開發中" value="產品開發中"></el-option>
            <el-option label="完成最小可行性產品並測試市場" value="完成最小可行性產品並測試市場"></el-option>
            <el-option label="已組成經營團隊" value="已組成經營團隊"></el-option>
            <el-option label="已籌促到營運資金" value="已籌促到營運資金"></el-option>
            <el-option label="已有營運計劃書" value="已有營運計劃書"></el-option>
            <el-option label="已經登記設立公司/行號" value="已經登記設立公司/行號"></el-option>
            <el-option label="已經進入成長期" value="已經進入成長期"></el-option>
            <el-option label="已經進入成熟期" value="已經進入成熟期"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Q5. 資金需求範圍">
          <el-select class="w-full" v-model="listQuery.Q7" size="small">
            <el-option label="50萬以下" value="50萬以下"></el-option>
            <el-option label="50-100萬" value="50-100萬"></el-option>
            <el-option label="100-300萬" value="100-300萬"></el-option>
            <el-option label="300-500萬" value="300-500萬"></el-option>
            <el-option label="500-1000萬" value="500-1000萬"></el-option>
            <el-option label="1000萬以上" value="1000萬以上"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Q6. 資金用途(多選)">
          <el-select class="w-full" v-model="listQuery.Q8" size="small" multiple>
            <el-option label="創業啟動金" value="創業啟動金"></el-option>
            <el-option label="營運資金" value="營運資金"></el-option>
            <el-option label="研發費用" value="研發費用"></el-option>
            <el-option label="資產購置" value="資產購置"></el-option>
            <el-option label="週轉金" value="週轉金"></el-option>
            <el-option label="公司擴編" value="公司擴編"></el-option>
            <el-option label="行銷推廣" value="行銷推廣"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Q7. 產業類別(多選)">
          <el-select class="w-full" v-model="listQuery.Q9" size="small" multiple>
            <el-option label="綠能環保" value="綠能環保"></el-option>
            <el-option label="生技產業" value="生技產業"></el-option>
            <el-option label="智慧雲端" value="智慧雲端"></el-option>
            <el-option label="智慧製造" value="智慧製造"></el-option>
            <el-option label="循環經濟" value="循環經濟"></el-option>
            <el-option label="新農業" value="新農業"></el-option>
            <el-option label="數位媒體" value="數位媒體"></el-option>
            <el-option label="社會創新" value="社會創新"></el-option>
            <el-option label="文創產業" value="文創產業"></el-option>
            <el-option label="電子商務" value="電子商務"></el-option>
            <el-option label="金融科技" value="金融科技"></el-option>
            <el-option label="區塊鏈" value="區塊鏈"></el-option>
            <el-option label="資訊科技" value="資訊科技"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="起迄日期">
          <el-date-picker class="w-full" v-model="dateRange" type="daterange" size="mini" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="開始日期" end-placeholder="結束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button size="mini" type="primary" @click="getList();dialogFilter = false">搜尋</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";
import * as planss from "@/api/planss";
import pagination from "@/components/Pagination";
import Sticky from "@/components/Sticky";

import waves from "@/directive/waves"; // 水波紋指令
import elDragDialog from "@/directive/el-dragDialog";

export default {
  components: { Sticky, pagination },
  directives: {
    waves,
    elDragDialog,
  },
  data() {
    return {
      dateRange: [],
      listQuery: {
        Q1: "",
        Q2: "",
        Q6: "",
        Q7: "",
        Q8: "",
        Q9: "",
        StartDate: "",
        EndDate: "",
        page: 1,
        limit: 20,
        key: "登錄日誌",
      },

      listLoading: true,
      tableKey: 0,
      tableList: [],
      total: null,

      dialogFilter: false,
    };
  },
  methods: {
    async getList() {
      this.listLoading = true;

      this.listQuery.StartDate = this.dateRange[0] || "";
      this.listQuery.EndDate = this.dateRange[1] || "";
      this.listQuery.Q1 =
        this.listQuery.Q1.length > 0 ? this.listQuery.Q1.join(",") : "";
      this.listQuery.Q6 =
        this.listQuery.Q6.length > 0 ? this.listQuery.Q6.join(",") : "";
      this.listQuery.Q8 =
        this.listQuery.Q8.length > 0 ? this.listQuery.Q8.join(",") : "";
      this.listQuery.Q9 =
        this.listQuery.Q9.length > 0 ? this.listQuery.Q9.join(",") : "";

      await planss.planLog(this.listQuery).then((res) => {
        const { code, data, count } = res;
        if (code === 200) {
          this.tableList = data.map((item) => {
            item.q3 = moment(item.q3).format("YYYY-MM-DD");
            item.createDate = moment(item.createDate).format("YYYY-MM-DD");
            return item;
          });
          this.total = count;
        }
        this.listLoading = false;
      });
    },

    // 匯出
    exportFile() {
      this.$confirm("確定要匯出嗎？", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let config = {
          headers: {
            "Content-Type": "application/json",
            "X-token": this.$store.getters.token,
          },
          responseType: "blob", // 回應類型為 blob
        };

        const url =
          "http://sme.yummydesign.com.tw/sys/api/Planss/exporPlanLog?Q1=" +
          this.listQuery.Q1 +
          "&Q2=" +
          this.listQuery.Q2 +
          "&Q6=" +
          this.listQuery.Q6 +
          "&Q7=" +
          this.listQuery.Q7 +
          "&Q8=" +
          this.listQuery.Q8 +
          "&Q9=" +
          this.listQuery.Q9 +
          "&StartDate=" +
          this.listQuery.StartDate +
          "&EndDate=" +
          this.listQuery.EndDate;

        axios.get(url, config).then((res) => {
          let blob = new Blob([res.data], {
            type: "application/" + res.headers["content-type"],
          });
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); // 創建下載的鏈接
          downloadElement.href = href;
          downloadElement.download = `方案記錄報表.xlsx`; // 下載後文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); // 點擊下載
          document.body.removeChild(downloadElement); // 下載完成移除元素
          window.URL.revokeObjectURL(href); // 釋放掉 blob 對象
        });
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
