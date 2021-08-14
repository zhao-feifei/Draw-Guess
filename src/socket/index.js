import io from "socket.io-client";
// import socket from "./socket";

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

//暴露出去让其他模块也可以使用此对象
export default socket;
