
export default {
  willSendMessage : (messageBody, conversationType, targetId, messageType) => {
    // 以文本消息为测试
    console.info('消息发送前回调：', messageBody, conversationType, targetId, messageType)
    return msgType[messageType] ? msgType[messageType](messageBody) : messageBody;
  },
  willDisplayMessages : (message, conversationType, targetId, messageType) => {
    console.info('消息接收前回调:',message, conversationType, targetId, messageType)
    // 以文本消息为测试
    if(messageType == 'RC:TxtMsg')
    message.content = message.content.replace('加密发送','')
    return message
  },
  willDisplayConversationMessage : (message, conversationType, targetId, messageType) => {
    console.info('会话 lastmessage 展示前回调:',message, conversationType, targetId, messageType)
    // 以文本消息为测试
    if(messageType == 'RC:TxtMsg')
    message.content = message.content.replace('加密发送','')
    return message
  }
}

const txtMsg = (messageBody) => {
  messageBody.content = messageBody.content + '加密发送'
  return messageBody
}

const imgMsg = (messageBody) => {
  return messageBody
}
const referenceMsg = (messageBody) => {
  return messageBody
}

const fileMsg = (messageBody) => {
  return messageBody
}

const msgType = {
  'RC:ImgMsg': imgMsg,
  'RC:TxtMsg': txtMsg,
  'RC:ReferenceMsg': referenceMsg,
  'RC:FileMsg': fileMsg
}
