import { Random as R } from "mockjs";

export default {
  // 获取用户详情
  getUserProfile: (userId) => {
    // 根据用户 id 获取用户信息，包括昵称，手机号，头像等
    return Promise.resolve({
      id: userId,
      name: userId,
      portraitUri: R.image("60x60"),
    });
  },

  // 获取会话详情
  // (会话 targetId 和会话类型 conversationType ) - 包括头像，会话(单聊和群聊)名称，群组头像
  getConversationProfile: (conversations) => {
    const promises = [];
    conversations.forEach((conversation) => {
      let param = {
        ...conversation,
        name: conversation.targetId,
        portraitUri: R.image("60x60"),
      }
      if(conversation.conversationType == 3){
        param.memberCount = 10;// 客户应用服务器返回群组内成员数量。
      }
      promises.push(
        Promise.resolve(param)
      );
    });
    return Promise.all(promises);
  },

  // 获取群组详情
  getGroupMembers: (conversation) => {
    // 根据会话获取群成员信息，包括昵称，头像等
    // 测试数据
    return Promise.resolve([
      {
        id: `【群组】用户 id`,
        groupNickname: `【群组】昵称`,
        name: `【群组】名称`,
        portraitUri: R.image("60x60"),
      },
    ]);
  },
};
