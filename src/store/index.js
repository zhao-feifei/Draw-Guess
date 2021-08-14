import Vue from "vue";
import Vuex from "../../node_modules/vuex";
import socket from "../socket";

Vue.use(Vuex);

const state = {
  connected: false, //连接状态
  nickname: "", //当前用户名称
  nicknames: [], //房间用户列表
  holder: "", //主持人
  lines: [] //绘图信息
};

const mutations = {
  updateNickname(state, nickname) {
    state.nickname = nickname || "";
  },
  updateNicknames(state, nicknames) {
    state.nicknames = nicknames || [];
  },
  updateHolder(state, holder) {
    state.holder = holder || "";
  },
  updateLines(state, lines) {
    state.lines = lines || [];
  },
  //将新人追加到昵称列表中
  addToNicknames(state, nickname) {
    //用户不存在才追加
    if (!state.nicknames.includes(nickname)) {
      state.nicknames.push(nickname);
    }
  },
  //更新connected状态
  updateConnected(state, flag) {
    state.connected = flag;
  }
};

const actions = {
  //确认用户名是否占用
  checkUserExist(context, nickname) {
    return new Promise((resolve, reject) => {
      socket.emit("check_user_exist", nickname, isExist => {
        resolve(isExist);
      });
    });
  },
  //进入房间后通知服务器
  sendUserEntered(context) {
    const nickname = localStorage.getItem("nickname");
    socket.emit("enter", nickname);
    // 将nickname设置到Vuex中
    context.commit("updateNickname", nickname);
  }
};

const getters = {
  isGameStarted() {
    return !!state.holder;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
