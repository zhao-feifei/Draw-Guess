<template>
  <el-card ref="wrapper" :body-style="{ padding: 0 }">
    <v-stage
      :config="stageConfig"
      @mousedown="mousedownHandler"
      @mouseup="mouseupHandler"
      @mousemove="mousemoveHandler"
    >
      <v-layer>
        <v-line v-for="(line, index) in lines" :key="index" :config="line" />
      </v-layer>
    </v-stage>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 画布配置
      stageConfig: {
        width: 800,
        height: 700
      },
      // 绘画状态
      painting: false,
      stroke: '#ff0000',
      strokeWidth: 5
      // lines: [
      //   { stroke: '#df4b26', strokeWidth: 5, points: [100, 100, 100, 400] },
      //   { stroke: '#ff00ff', strokeWidth: 5, points: [100, 100, 300, 300] }
      // ]
    }
  },

  computed: {
    ...mapState(['lines'])
  },

  mounted() {
    // 将画布宽度设置与容器同宽
    this.stageConfig.width = this.$refs.wrapper.$el.offsetWidth
  },

  methods: {
    // 鼠标按下
    mousedownHandler(e) {
      this.painting = true
      // 开启会话状态创建新线条
      const newLine = {
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        points: [e.evt.layerX, e.evt.layerY]
      }
      //本地划线存到vuex中
      this.$store.commit('drawNewLine', newLine)
    },

    // 鼠标拖动
    mousemoveHandler(e) {
      if (this.painting) {
        //绘制中
        let lastLine = this.lines[this.lines.length - 1]
        lastLine.points = lastLine.points.concat([e.evt.layerX, e.evt.layerY])
        //提交并更新vuex中最后一项的points
        this.$store.commit('updateNewLine', lastLine)
      }
    },

    // 鼠标释放
    mouseupHandler() {
      console.log('鼠标释放了')
      this.painting = false
    }
  }
}
</script>
