import { ConversationType } from "@rongcloud/engine";

export default {
  // 过滤会话 false / true
  interceptConversation: conversation => {
    if (!conversation) return true;

    // 系统会话 - 匹配过滤
    if (conversation.conversationType === ConversationType.SYSTEM) {
      return true;
    }

    // 正常会话 - 不过滤
    return false;
  },

  // 过滤消息 false / true
  interceptMessage: message => {
    if (!message) return true;

    // 系统消息 - 匹配过滤
    if (message.conversationType === ConversationType.SYSTEM) {
      return true;
    }

    // 正常消息 - 不过滤
    return false;
  }
};
