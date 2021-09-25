<template>
  <div class="app-wrapper" :class="classObj">
    <el-container class="flex-column">
      <el-header height="45px">
        <navbar @handleCreate="handleCreate"></navbar>
      </el-header>
      <el-container class="flex-row flex-item">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container flex-item">
          <tags-view class="custom-tags-view"></tags-view>
          <app-main></app-main>
        </div>
      </el-container>
    </el-container>

    <!-- 意見回饋dialog -->
    <el-dialog class="dialog-mini" width="600px" :title="'新增意見回饋'" :visible.sync="dialogFeedbackVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="100px">
        <el-form-item size="small" :label="'請選擇您的身分'">
          <el-select v-model="temp.typeName" clearable placeholder="請選擇身分" style="width: 100%">
            <el-option v-for="item in identityList" :key="item.id" :label="item.name" :value="item.dtValue"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" :label="'意見回饋概述'">
          <el-input v-model="temp.summary" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item size="small" :label="'意見回饋'">
          <el-input v-model="temp.sysFeedBack" maxlength="500"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="h-full flex-items-c-justify-c">
        <el-button size="mini" type="danger" @click="dialogFeedbackVisible = false" plain>取消</el-button>
        <el-button size="mini" type="info" @click="saveFeedback()" plain>送出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import * as categorys from "@/api/categorys";
import * as feedback from "@/api/feedback";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      dialogFeedbackVisible: false,
      identityList: [],
      temp: {
        typeName: "",
        summary: "",
        sysFeedBack: "",
        sysFeedBackDate: "",
        status: "",
      },
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    },

    getIdentityList() {
      const listQuery = {
        page: 1,
        limit: 999,
        TypeId: "SYS_FEEDBACK",
      };
      categorys.getList(listQuery).then((res) => {
        this.identityList = res.data;
      });
    },
    async handleCreate() {
      // 彈出添加框
      await this.getIdentityList();
      this.resetTemp();
      this.dialogFeedbackVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetTemp() {
      this.temp = {
        typeName: "",
        summary: "",
        sysFeedBack: "",
        sysFeedBackDate: "",
        status: "",
      };
    },
    saveFeedback() {
      feedback.add(this.temp).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: "新增成功",
            type: "success",
            duration: 2000,
          });
        } else {
          this.$notify({
            title: "錯誤",
            message: res.message,
            type: "error",
            duration: 2000,
          });
        }
        this.dialogFeedbackVisible = false;
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.el-header {
  padding: 0;
  line-height: 44px;
  background-color: #333;
  width: 100%;
  z-index: 100;
}
.el-container .sidebar-container {
  height: auto !important;
}

.el-container .main-container {
  margin-left: 0 !important;
  overflow: hidden;
}
.custom-tags-view {
  margin-top: 0 !important;
}
</style>
