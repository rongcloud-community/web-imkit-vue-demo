import { imkit } from "@rongcloud/imkit"
import { TextMessage, sendMessage } from "@rongcloud/imlib-next"

const conversationCustomMenu = [
  {
    name: function (conversation) {
      return '自定义按钮'
    },
    callback: function (conversation) {
      alert(`点击自定义按钮拿到会话：${JSON.stringify(conversation)}`)
    }
  }
]

const messaggeCustomMenu = [
  {
    name: function (message) {
      return '自定义'
    },
    callback: function (message) {
      alert(`点击自定义按钮拿到会话：${JSON.stringify(message)}`)
    }
  }
]

const forwardCallback = {
  callback: () => {
    return [{
      conversationType: 1,
      targetId: '22'
    },{
      conversationType: 1,
      targetId: '33'
    },{
      conversationType: 1,
      targetId: '44'
    },{
      conversationType: 1,
      targetId: '55'
    },{
      conversationType: 1,
      targetId: '66'
    }]
  }
}
export {
  conversationCustomMenu,
  messaggeCustomMenu,
  forwardCallback
}
