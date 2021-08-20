<template>
  <el-card>
    <!-- 玩家列表 -->
    <div class="panel-area">
      <ul class="participants">
        <li v-for="item in nicknames" :key="item">
          <span>{{ item }}</span>
          <el-tag v-if="item === holder" size="mini">主持</el-tag>
        </li>
      </ul>
    </div>

    <!-- 按钮工具栏 -->
    <div class="panel-area button-area">
      <el-button
        v-if="!isGameStarted"
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="startGameHandler"
        >主持游戏</el-button
      >
      <!-- 主持人显示终止游戏 -->
      <el-button
        v-if="isGameStarted && nickname === holder"
        type="warning"
        size="small"
        icon="el-icon-delete"
        @click="stopGameHandler"
        >终止游戏</el-button
      >

      <el-button
        v-if="isGameStarted && nickname !== holder"
        type="success"
        size="small"
        icon="el-icon-magic-stick"
        @click="answerGameHandler"
        >猜答案</el-button
      >

      <el-button
        type="danger"
        size="small"
        icon="el-icon-switch-button"
        @click="exitHandler"
        >退出游戏</el-button
      >
    </div>

    <!-- 弹出框：主持人设置答案 -->
    <el-dialog
      title="请设置答案"
      :visible.sync="resultDialogVisible"
      width="30%"
    >
      <el-input v-model="expectImageName" placeholder="请输入您的答案" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="resultDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDialogHandler">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹出框：答题人设置答案 -->
    <el-dialog
      title="请填写答案"
      :visible.sync="answerDialogVisible"
      width="30%"
    >
      <el-input v-model="inputImageName" placeholder="请输入您的答案" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="answerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAnswerDialogHandler"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      resultDialogVisible: false,
      expectImageName: '',
      answerDialogVisible: false,
      inputImageName: ''
    }
  },

  computed: {
    ...mapState(['nicknames', 'nickname', 'holder']),
    ...mapGetters(['isGameStarted'])
  },

  methods: {
    startGameHandler() {
      //显示弹框
      this.resultDialogVisible = true
      //清空输入框
      this.expectImageName = ''
    },
    //主持人设置答案
    saveDialogHandler() {
      // console.log("121");
      //校验是否为空
      if (!this.expectImageName) {
        this.$message.error('答案不能为空')
      }
      //发送开始游戏请求
      this.$store.dispatch('sendStartGame', this.expectImageName)
      //关闭弹框
      this.resultDialogVisible = false
    },
    //终止游戏
    stopGameHandler() {
      this.$confirm('您确定要终止游戏吗?', '温馨提示')
        .then(() => {
          //发送终止游戏申请
          this.$store.dispatch('sendStopGame')
        })
        .catch(e => {
          console.log(e)
        })
    },
    answerGameHandler() {
      //显示弹框并清空
      this.answerDialogVisible = true
      this.inputImageName = ''
    },
    //点击确定按钮后触发的处理函数
    saveAnswerDialogHandler() {
      //检查答案是否为空
      if (!this.inputImageName) {
        this.$message.error('答案不能为空!')
        return
      }
      //发送消息到服务器
      this.$store.dispatch('sendAnswerGame', this.inputImageName)

      //关闭弹窗
      this.answerDialogVisible = false
    },
    //退出游戏
    exitHandler() {
      this.$confirm('是否要退出游戏?', '温馨提示')
        .then(() => {
          //发送退出游戏申请
          this.$store.dispatch('sendUserLeave')
          //跳转到登录
          this.$router.replace('/login')
        })
        .catch(e => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-area {
  margin: 10px 0;
}
</style>
