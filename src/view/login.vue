<template>
  <div class="container">
    <el-card class="box-card conent" shadow="hover">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        v-loading="loading"
        autocomplete="on"
      >
        <el-form-item style="text-align: center">
          <div style="font-size:22px">中万恩报表管理系统</div>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input
            prefix-icon="el-icon-user"
            v-model.trim="loginForm.userName"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd" style="margin-top:20px;">
          <el-input
            prefix-icon="el-icon-unlock"
            v-model.trim="loginForm.pwd"
            placeholder="请输入密码"
            type="password"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%;height:40px;margin-top:10px;"
            @click="subMit"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getlogin } from "../api/api";
import { setCookie, getCookie, delCookie } from "@/utils/cookie";
import { isvalidUser, isvalidPaswd } from "@/utils/regular";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (!isvalidUser(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    // const validatePass = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error("请输入密码"));
    //   } else if (isvalidPaswd(value)) {
    //     callback(new Error("请输入正确的密码"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      loading: false,
      loginForm: {
        userName: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16个字符", trigger: "blur" }
        ],
         pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    subMit() {
      this.$refs.loginForm.validate(valid => {
        this.loading = true;
        if (valid) {
          getlogin(this.loginForm.userName, this.loginForm.pwd)
            .then(res => {
              console.log(res);
              if (res.data.code == "0") {
                this.loading = false;
                this.$fail("登录失败");
              } else {
                this.loading = false;
                this.$success("登录成功！");
                setCookie("username", res.data.userName);
                setTimeout(() => {
                  this.$go("/main");
                }, 300);
              }

              // if (res.data.status == "200") {
              //   this.$success("登录成功！");
              //   setCookie("token", res.data.data.user_id);
              //   setCookie("username", res.data.data.user_name);
              //   setTimeout(() => {
              //     this.$go("/main");
              //   }, 300);
              // } else {
              //   this.$fail("用户名或密码错误");
              // }
            })
            .catch(err => {
              console.log("err");
            });
        }
      });
    }
  },

  created() {}
};
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  // background: linear-gradient(to bottom, #409eff, #fff);
  background: url("../assets/images/beijing2.png") no-repeat;
  background-size: 100% 100%;
  opacity: 0;
  animation: chage forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  .conent {
    width: 550px;
    height: 350px;
    background: white;
    box-shadow: 0 0 5px 5px #ffffff;
  }
  .box-card /deep/ .el-input__inner {
    height: 50px;
  }
  .box-card /deep/ .el-input__icon {
    font-size: 20px;
  }
}
@keyframes chage {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>