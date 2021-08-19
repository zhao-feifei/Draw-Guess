import Vue from 'vue'
import Vuex from 'vuex'
import socket from '@/socket'

Vue.use(Vuex)

const state = {
  connected: false, // 连接状态
  nickname: '', // 当前用户昵称
  nicknames: [], // 房间用户昵称列表
  holder: '', // 游戏主持人
  lines: [] // 房间的绘图信息 (画了多少根线)
}

const mutations = {
  updateConnected(state, connected) {
    state.connected = connected
  },
  updateNickname(state, nickname) {
    state.nickname = nickname || ''
  },
  updateNicknames(state, nicknames) {
    state.nicknames = nicknames || []
  },
  updateHolder(state, holder) {
    state.holder = holder || ''
  },
  updateLines(state, lines) {
    state.lines = lines || []
  },

  addToNicknames(state, nickname) {
    if (!state.nicknames.includes(nickname)) {
      state.nicknames.push(nickname)
    }
  },
  drawNewLine(state, newLine) {
    state.lines.push(newLine)
  },
  updateNewLine(state, lastLine) {
    const line = state.lines[state.lines.length - 1]
    line.points = lastLine.points
  },
  delFromNicknames(state, nickname) {
    state.nicknames = state.nicknames.filter(item => item !== nickname)
  }
}

const actions = {
  // 确认用户名是否存在
  checkUserExist(context, nickname) {
    return new Promise((resolve, reject) => {
      socket.emit('check_user_exist', nickname, isExist => {
        resolve(isExist)
      })
    })
  },
  // 进入房间
  sendUserEnter(context) {
    const nickname = localStorage.getItem('nickname')
    socket.emit('enter', nickname)
    context.commit('updateNickname', nickname)
  },
  // 开始游戏申请
  sendStartGame(context, imageAnswer) {
    socket.emit('start_game', imageAnswer)
  },
  // 结束游戏申请
  sendStopGame(context) {
    socket.emit('stop_game')
  },
  sendDrawNewLine(context, line) {
    socket.emit('new_line', line)
  },
  sendUpdateNewLine(context, line) {
    socket.emit('update_line', line)
  },
  sendAnswerGame(context, inputImageName) {
    socket.emit('answer_game', inputImageName)
  }
}

const getters = {
  isGameStarted() {
    return !!state.holder
  },
  isGameHolder() {
    return state.nickname === state.holder
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
