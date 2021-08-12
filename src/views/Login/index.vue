<template>
  <div>
    <el-card
      class="login-card"
      :body-style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px'
      }"
    >
      <el-form ref="loginForm" inline :model="formData" :rules="rules">
        <el-form-item prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入您的昵称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="enterGame">进入游戏</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import socket from "@/socket";
export default {
  data() {
    return {
      // 表单信息
      formData: {
        nickname: ""
      },

      // 校验规则
      rules: {
        nickname: [{ required: true, message: "请输入您的昵称" }]
      }
    };
  },

  methods: {
    enterGame() {
      // 发消息测试
      //isExist是发完消息后的回调
      socket.emit("check_user_exist", this.formData.nickname, isExist => {
        console.log(isExist);
      });
    }
  }
};
</script>

<style scoped>
.login-card {
  width: 50%;
  margin: 0 auto;
  margin-top: 200px;
}
</style>
