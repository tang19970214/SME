<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="logo">
      <img class="user-avatar" :src="logo">資金通
    </div>

    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <el-dropdown class="avatar-container" @command="handleCommand" trigger="click">
      <div class="avatar-wrapper">
        歡迎您，{{name}}
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item command="handleGoProfile">
          <span>個人中心</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span>切換主題
            <el-switch :active-value="1" :inactive-value="0" style="margin-left: 5px;" v-model="theme" />
          </span>
        </el-dropdown-item>
        <el-dropdown-item>
          <g-signin-button class="flex-items-c-justify-c py-8 pointer" :params="googleSignInParams" @success="handleGoogleBind" @error="onSignInError">
            <span>綁定Google帳戶</span>
          </g-signin-button>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="handleCreate()" style="width: 100%">意見回饋</div>
        </el-dropdown-item>
        <el-dropdown-item command="logout" divided>
          <span>退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Hamburger from "@/components/Hamburger";
import logo from "@/assets/logo.png?imageView2/1/w/80/h/80";

import * as login from "@/api/login";

export default {
  data: function () {
    return {
      logo: logo,
      theme: 1,
      googleSignInParams: {
        client_id:
          "752935186531-t976aejd5qtanbo6dk17e1g3nna7igv3.apps.googleusercontent.com",
      },
    };
  },
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "isIdentityAuth", "name", "themeStatus"]),
  },
  watch: {
    theme() {
      this.toggleClass(document.body, "custom-theme");
    },
  },
  mounted() {
    this.theme = Number(this.themeStatus);
    this.toggleClass(document.body, "custom-theme");
  },
  methods: {
    ...mapActions(["signOutOidc", "saveTheme"]),
    toggleClass(element, className) {
      if (!element || !className) {
        return;
      }
      let classString = element.className;
      const nameIndex = classString.indexOf(className);
      if (nameIndex === -1) {
        classString += "" + className;
      } else {
        classString =
          classString.substr(0, nameIndex) +
          classString.substr(nameIndex + className.length);
      }
      element.className = this.theme === 1 ? classString : "";
      this.saveTheme(this.theme);
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      if (this.isIdentityAuth) {
        this.signOutOidc();
      } else {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 為了重新實例化vue-router對象 避免bug
        });
      }
    },
    handleGoProfile() {
      this.$router.push("/profile");
    },
    handleGoogleBind(googleUser) {
      const getIdToken = googleUser.Zb.id_token;
      login.GoogleBind({ token_id: getIdToken }).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: "綁定成功",
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
        console.log(res);
      });
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    },
    handleCommand(name) {
      if (!name) return;
      this[name]();
    },

    /* 意見回饋 */
    handleCreate() {
      this.$emit("handleCreate");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
