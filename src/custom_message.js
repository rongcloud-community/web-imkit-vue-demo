export default {
  //带头像
  userMessage: {
    'kit:person': (message) => {
      const content = message.content;
      return `<div class="text-message-body">
      来自 ${content.name} 的好友请求
      <ul><li>申请描述：${content.age}</li></ul>
      </div>`;
    }
  },
  // 通知类不带头像
  notifyMessage: {
    'kit:GrpNtf': (message) => {
      const content = message.content
      const string = `<div class="text-message-body">来自 ${content.name} 的好友请求</div>`
      return string;
    }
  },
  // 会话最后一条消息展示
  lastMessage:{
    'kit:person': (message) => {
      const content = message.content;
      return `[好友请求]`;
    },
    'kit:GrpNtf': (message) => {
      const content = message.content
      const string = `[不带头像好友请求]`
      return string;
    }
  }
};
