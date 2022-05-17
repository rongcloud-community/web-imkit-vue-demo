// 定义消息管理
// 用户在使用kit的时候，会有一些自定义的消息，这些消息是显示在消息列表组件中的
// 自定义消息分为两类，一类是常规消息，即显示头像的消息。二是通知类的消息，例如退出群聊、进入群聊之类的通知，显示为单独的一条简单样式。
export default {
  userMessage: {
    // 用户类消息
    "ST:ContactNtf": message => {
      const content = message.content;
      return `<div class="text-message-body">来自 ${content.extra.sourceUserNickname} 的好友请求</div>`;
    }
  },
  notifyMessage: {
    // 通知类消息
    "ST:GrpNtf": message => {
      const content = message.content;
      const string = `
      ${content.data.operatorNickname} 
      ${content.data.targetGroupName}`;
      return string;
    }
  }
};
