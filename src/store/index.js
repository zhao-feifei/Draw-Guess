import Vue from "vue";
import Vuex from "vuex";
import socket from "../socket";

Vue.use(Vuex);

const state = {};

const mutations = {};

const actions = {
  //确认用户名是否占用
  checkUserExist(context, nickname) {
    return new Promise((resolve, reject) => {
      socket.emit("check_user_exist", nickname, isExist => {
        resolve(isExist);
      });
    });
  }
};

const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
