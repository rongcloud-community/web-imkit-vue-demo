<template>
  <div class="main">
    <div class="header">
      <button class="header-btn" @click='changeUser()'>切换用户</button>
      <button class="header-btn" @click='selectConversation()'>选中指定会话</button>
      <button class="header-btn" @click='sendCustomMessage(1)'>发送自定义消息</button>
      <button class="header-btn" @click='sendCustomMessage(0)'>发送通知类自定义消息</button>
      <select class="header-btn" v-model="lang" @change="changeLanguage">
        <option v-for="(item) in langArr" :value="item.lang" :key="item.lang">{{item.value}}</option>
      </select>
    </div>
    <div class="main-wrapper">
      <div class="wrapper-left">
        <conversation-list ref="conversationList" base-size="10px" />
      </div>
      <div class="wrapper-right">
        <div class="chat">
          <div class="chat-top">
            <message-list ref="messageList" base-size="10px" />
          </div>
          <div class="chat-bottom">
            <message-editor base-size="10px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { imkit, CoreEvent} from "@rongcloud/imkit";
export default {
  data() {
    return {
      editorVisible: false,
      lang: "",
      langArr: [{
          lang: "zh_CN",
          value: "中文",
        },
        {
          lang: "en",
          value: "英文",
        },
      ],
      imageUrl: '',
      showImage: false,
      switchConversationList:{}
    };
  },
  async mounted() {
    localStorage.getItem("lang") && localStorage.removeItem("lang");
    const res =  await imkit.connect(TOKEN);
    console.info('链接结果打印：', res.data);
    if(res.data){
      window.curUser = res.data.userId;
    }
    // 触发加载会话列表
    this.lang = imkit.lang
    // 加载会话列表
    imkit.emit(CoreEvent.CONVERSATION, true);

    const conversationList = this.$refs.conversationList;

    //添加点击会话监听
    conversationList.addEventListener(
      "tapConversation",
      this.handleTapConversation //回掉处理函数
    );

    //添加删除会话监听
    conversationList.addEventListener(
      "deleteConversation",
      this.handleDeleteConversation //回掉处理函数
    );

    //刷新页面后取消选中
    const messageList = this.$refs.messageList;
    messageList.addEventListener("tapMessage", this.handleTapMessage);
  },
  beforeUnmount() {
    const conversationList = this.$refs.conversationList;

    conversationList.removeEventListener(
      "tapConversation",
      this.handleTapConversation
    );

    conversationList.removeEventListener(
      "deleteConversation",
      this.handleDeleteConversation
    );

    const messageList = this.$refs.messageList;
    messageList.removeEventListener("tapMessage", this.handleTapMessage);
  },
  methods: {
    handleTapConversation() {
      //处理点击会话后的操作
    },

    handleDeleteConversation() {
      //处理删除会话后的操作
      console.info("处理删除会话后的操作");
    },

    changeLanguage() {
      imkit.changeLanguage({ lang: this.lang });
    },

    handleTapMessage(e) {
      if (e.detail.type === "richContent") {
        window.open(e.detail.url, "_blank");
        return;
      } else if (e.detail.type === "file") {
        window.open(e.detail.url);
        return;
      } else if(e.detail.type === "image"){
        const url = e.detail.url;
        var ret = prompt('点击查看大图，样式有客户集成时自行设置图片 URL 地址：', url);
        return;
      }
      this.messageData = Object.assign({ time: Date.now() }, e.detail);
    },

    selectConversation() {
      let conversationInfoStr = prompt("请输入：会话类型 & targetid","1&11");
      if(conversationInfoStr){
        let conversationInfo = conversationInfoStr.split('&');
        let conversationType = parseInt(conversationInfo[0]);
        let targetId = conversationInfo[1];
        if (conversationType && targetId!=""){
          imkit.selectConversation({
            conversationType: conversationType, // 会话类型
            targetId: targetId, // targetId
          });
        }
      }
    },

    sendCustomMessage(type) {
      let conversationInfoStr = prompt("请输入会话类型 & targetid & name & age","1&11&张三&123");
      if(conversationInfoStr){
        let conversationInfo =  conversationInfoStr.split('&');
        let conversationType = parseInt(conversationInfo[0]);
        let targetId = conversationInfo[1];
        let name = conversationInfo[2];
        let age = conversationInfo[3];
        let content = { name, age }
        let messagebody = null;
        type === 1 ? messagebody = new PersonMessage(content) : messagebody = new GroupMessage(content)

        imkit.sendMessage({
          conversationType: conversationType,
          targetId: targetId,
        }, messagebody, null).then(res => {
          console.info(res)
        })
      }
    },

    changeUser() {
      let token = prompt("请输入 token");
      imkit.disconnect();
      imkit.connect(token).then((res)=> {
        console.info('change user', res)
      })
    }
  },
};

</script>
<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.header {
  margin: 0 auto;
  height: 40px;
  width: 100%;
  background: #ececec;
  line-height: 40px;
  text-align: right;
}

.header-btn{
  margin: 0 10px;
}

.main-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.wrapper-left {
  width: 25%;
  border-right: 1px dotted rgb(227, 229, 230);
}

.wrapper-right {
  width: 75%;
  flex: 1;
}

.chat {
  height: 100%;
}

.chat-top {
  /* flex: 1; */
  height: calc(100% - 220px);
}

.chat-bottom {
  height: 220px;
}

</style>
