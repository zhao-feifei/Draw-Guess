<template>
  <el-card>
    <!-- 玩家列表 -->
    <div class="panel-area">
      <ul class="participants">
        <li>
          <span>xxx（我）</span>
          <el-tag size="mini">主持</el-tag>
        </li>
        <li>
          <span>xxx</span>
        </li>
        <li>
          <span>xxx</span>
        </li>
      </ul>
    </div>

    <!-- 按钮工具栏 -->
    <div class="panel-area button-area">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
      >主持游戏</el-button>

      <!-- <el-button
        type="warning"
        size="small"
        icon="el-icon-delete"
      >终止游戏</el-button> -->

      <!-- <el-button
        type="success"
        size="small"
        icon="el-icon-magic-stick"
      >猜答案</el-button> -->

      <el-button
        type="danger"
        size="small"
        icon="el-icon-switch-button"
      >退出游戏</el-button>
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
        <el-button
          type="primary"
          @click="saveAnswerDialogHandler"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      resultDialogVisible: false,
      expectImageName: '',
      answerDialogVisible: false,
      inputImageName: ''
    }
  },

  methods: {
    saveDialogHandler() {},

    saveAnswerDialogHandler() {}
  }
}
</script>

<style lang="scss" scoped>
.panel-area {
  margin: 10px 0;
}
</style>
