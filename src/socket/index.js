import io from 'socket.io-client'
import store from '@/store'
import { MessageBox, Notification } from 'element-ui'

//本机可以省略地址
const socket = io()

//连接建立监听
socket.on('connect', () => {
  console.log('服务器连接已建立')
})

//监听room_info接收消息
socket.on('room_info', ({ nicknames, holder, lines }) => {
  store.commit('updateNicknames', nicknames)
  store.commit('updateHolder', holder)
  store.commit('updateLines', lines)
})

//监听user_enter事件，通知有新人进入房间了
socket.on('user_enter', nickname => {
  store.commit('addToNicknames', nickname)
})

//监听websocket的连接，控制按钮的显示状态
socket.on('connect', () => {
  store.commit('updateConnected', true)
})

//监听websocket的断开，控制按钮的显示状态
socket.on('disconnect', () => {
  store.commit('updateConnected', false)
})

// 处理游戏开始
socket.on('game_started', holder => {
  store.commit('updateHolder', holder)
  Notification.success(
    `${holder} 作为主持人开始了新游戏，大家可以开始踊跃猜答案啦！`
  )
})

// 处理游戏已经开始, 不能重复开始
socket.on('already_started', holder => {
  store.commit('updateHolder', holder)
  MessageBox.alert('当前已有游戏在进行中，主持人是：' + holder)
})
// 处理终止游戏
socket.on('game_stoped', () => {
  // 1. 清理相关数据
  store.commit('updateHolder', '')
  store.commit('updateLines', [])

  // 2. 弹出提示消息
  Notification.warning('主持人终止了当前游戏')
})

// 暴露出去让其他模块也可以使用此对象;
export default socket
