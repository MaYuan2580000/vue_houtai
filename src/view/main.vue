<template>
  <div class="app">
    <el-container>
      <el-aside
        class="app-side app-side-left"
        :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
      >
        <div class="app-side-logo">
          <img src="../assets/images/logo.png" alt style="width:20%;" />
          <span>中万恩科有限公司</span>
        </div>
        <p style="border-bottom:1px solid #ddd;width:350px"></p>
        <div class="ood">
          <!-- 我是样例菜单 -->
          <el-menu
            ref="headermenu"
            :unique-opened="true"
            @select="selectitem"
            @open="open"
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
        
            text-color="gray"
            router
          >
            <el-menu-item index="1" route="/main">
              <i class="el-icon-s-operation" style="font-size:18px; "></i>
              <span slot="title" style="font-size:13px;">业绩报表</span>
            </el-menu-item>
            <!-- <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>报表管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" route="/user">用户列表</el-menu-item>
                <el-menu-item index="2-2" route="/dome">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;" @click.prevent="toggleSideBar">
            <img style="width:30px" v-show="!isCollapse" src="../assets/images/shou1.png" />
            <img style="width:30px" v-show="isCollapse" src="../assets/images/shou2.png" />
          </div>

          <!-- <img src="../assets/images/logo.png" alt=""/> -->
          <div class="app-header-userinfo">
            <el-dropdown trigger="click">
              <div class="el-dropdown-link">
                <img src="../assets/images/xingku.jpg" class="userImageStyle" />
                <span>{{userName}}</span>
                <!-- <span>admin</span> -->
              </div>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>-->
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <transition>
              <router-view />
            </transition>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from "@/utils/cookie";

export default {
  name: "Container",
  data() {
    return {
      isCollapse: false,
      activeIndex: "1",
      user_id: "",
      userName: "",
      openmenuIndex: -1,
      isshow: true
    };
  },
  watch: {
    $route(val) {}
  },

  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
      this.isshow = !this.isshow;
      
    },
    btn(index) {
      this.activeIndex = index;
    },
    //收缩导航下拉
    selectitem(i) {
      if (!i.includes("-")) {
        this.$refs.headermenu.close(this.openmenuIndex);
      }
    },
    //没有-下的情况收缩
    open(index) {
      this.openmenuIndex = index;
    },
    //退出登录清除
    logout() {
      delCookie("token");
      delCookie("username");
      if (getCookie("token") == "") {
        setTimeout(() => {
          this.$go("/login");
        }, 300);
      }
    }
  },

  mounted() {
    this.user_id = getCookie("token");
    this.userName = getCookie("username");
    //解决页面刷新指定的页面
    this.activeIndex = this.$route.meta.index;
  }
};
</script>

<style lang="less" scoped>
.imgStyle {
  width: 80px;
  position: fixed;
  right: 0;
  bottom: 0;
}
.ood /deep/ .el-menu {
  width: 350px;
}

.topw {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 20px;
  bottom: 0;
  z-index: 9999;
}
.app /deep/.el-aside {
  overflow: hidden;
}
.app /deep/.el-menu-item.is-active {
  background-color: #e6f7ff !important;
  color: #3ca1ff;
  border-right: 5px solid #3ca1ff;
}

.app /deep/.el-menu-item:hover {
  background: #e6f7ff !important;
}
.app /deep/ .el-main {
  overflow: hidden;
}
.app /deep/ .el-menu{
  background: none;
}
.app {
  font-size: 1em;
  min-width: 1366px;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  .app-side-logo {
    width: 300px;
    height: 90px;

    line-height: 90px;
    text-align: center;
    color: #0096fa;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      margin-right: 5px;
    }
    span {
      font-size: 22px;
      display: inline-block;
      margin-right: 18px;
      font-weight: bold;
    }
  }

  .app-header {
    width: 100%;
    height: 60px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    box-shadow: -5px -5px 0px #ddd inset;

    .el-dropdown-link {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 20px;
      }
    }
    .app-header-userinfo {
      right: 0;
      margin-right: 25px;
      display: flex;
      flex-flow: row nowrap;
      height: 60px;
      justify-content: flex-start;
      align-items: center;

      width: auto;
      cursor: pointer;
      .userImageStyle {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .app-side-collapsed {
    transition: all 0.8s;
    width: 85px !important;
    box-shadow: -5px 0 5px #ddd inset;
  }
  .app-side-expanded {
    transition: all 0.8s;
    width: 350px !important;
    box-shadow: -5px 0 5px #ddd inset;
  }
  .app-body {
    font-size: 1em;
    width: 100%;
    padding: 20px;
    background: #f0f2f5;
    overflow-y: auto;
  }
  .app-body::-webkit-scrollbar {
    width: 0px;
  }
  .app-footer {
    width: 100%;
    height: 60px;
  }
  .app-side {
    width: 350px;
    height: 100%;
    font-weight: 700;
    box-shadow: -5px 0 5px #ddd inset;
  }
  .app-side-left {
    background-color: #ffffff;
    box-shadow: -5px 0 5px #ddd inset;
  }
}
.inline-block {
  display: inline-block;
}
</style>