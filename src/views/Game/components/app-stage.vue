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
      lines: [
        { stroke: "#df4b26", strokeWidth: 5, points: [100, 100, 100, 400] },
        { stroke: "#ff00ff", strokeWidth: 5, points: [100, 100, 300, 300] }
      ]
    };
  },

  mounted() {
    // 将画布宽度设置与容器同宽
    this.stageConfig.width = this.$refs.wrapper.$el.offsetWidth;
  },

  methods: {
    // 鼠标按下
    mousedownHandler(e) {
      console.log("鼠标按下了");
      this.painting = true;
    },

    // 鼠标拖动
    mousemoveHandler(e) {
      if (this.painting) {
        console.log("鼠标拖动了, 绘画状态");
      }
    },

    // 鼠标释放
    mouseupHandler() {
      console.log("鼠标释放了");
      this.painting = false;
    }
  }
};
</script>
