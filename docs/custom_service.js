/** 测试模拟Mock数据 */
import { Random as R } from "mockjs";

export default {
  getUserProfile: userId => {
    // 根据用户 id 获取用户信息，包括昵称，手机号，头像等
    return Promise.resolve({
      id: userId,
      displayName: "用户昵称",
      name: "用户名",
      portraitUri: "头像地址",
      gender: "性别",
      phone: "电话"
    });
  },

  // 获取会话详情(会话 targetId 和会话类型 conversationType ) - 包括头像，会话(单聊和群聊)名称，群组头像
  getConversationProfile: conversations => {
    const promises = [];
    conversations.forEach(conversation => {
      promises.push(
        Promise.resolve({
          ...conversation,
          name: R.cname(),
          portraitUri: R.image("60x60")
        })
      );
    });
    return Promise.all(promises);
  },

  getGroupMembers: conversation => {
    // 根据会话获取群成员信息，包括昵称，头像等
    // 测试数据
    return Promise.resolve([
      {
        id: conversation.targetId,
        groupNickname: conversation.targetId,
        nickname: `nickname${conversation.targetId}`,
        portraitUri: `http://imageurl.com${conversation.targetId}`
      }
    ]);
  }
};
