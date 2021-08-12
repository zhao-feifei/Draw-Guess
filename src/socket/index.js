import io from "socket.io-client";

//本机可以省略地址
const socket = io();

//连接建立监听
socket.on("connect", () => {
  console.log("服务器连接已建立");
});

//暴露出去让其他模块也可以使用此对象
export default socket;
