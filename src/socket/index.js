import io from "socket.io-client";
import store from "@/store";
import { MessageBox, Notification } from "element-ui";

//本机可以省略地址
const socket = io();

//连接建立监听
socket.on("connect", () => {
  console.log("服务器连接已建立");
});

//监听room_info接收消息
socket.on("room_info", ({ nicknames, holder, lines }) => {
  store.commit("updateNicknames", nicknames);
  store.commit("updateHolder", holder);
  store.commit("updateLines", lines);
});

//监听user_enter事件，通知有新人进入房间了
socket.on("user_enter", nickname => {
  store.commit("addToNicknames", nickname);
});

//监听websocket的连接，控制按钮的显示状态
socket.on("connect", () => {
  store.commit("updateConnected", true);
});

//监听websocket的断开，控制按钮的显示状态
socket.on("disconnect", () => {
  store.commit("updateConnected", false);
});

// 处理游戏成功开始;
store.on("game_started", holder => {
  store.commit("updateHolder", holder);
  Notification.success(`${holder}作为主持人已经开始了游戏!`);
});
//游戏已经开始
store.on("already_started", holder => {
  store.commit("updateHolder", holder);
  Notification.alert(`游戏正在进行中！主持人是${holder}`);
});
// 暴露出去让其他模块也可以使用此对象;
export default socket;
