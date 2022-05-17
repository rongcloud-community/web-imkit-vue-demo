<template>
  <div class="main">
    <div class="header"><span>IMChat</span></div>
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

export default {
  data() {
    return {
      editorVisible: false,
      imageUrl: '',
      showImage: false
    };
  },
  mounted() {
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

    handleTapMessage(e) {
      console.info(e.detail)
      // const data = e.detail;
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
  width: 100%;
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
