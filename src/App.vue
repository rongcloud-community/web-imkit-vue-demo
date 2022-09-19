<template>
  <div class="pop-up">
    <div class="main">
      <div class="header">
        <button class="header-btn" @click='changeGroupInfo()'>修改群成员信息</button>
        <button class="header-btn" @click='changeUserInfo()'>修改当前用户信息</button>
        <button class="header-btn" @click='changeConversationInfo()'>修改会话信息</button>
        <button class="header-btn" @click='changeUser()'>切换用户</button>
        <button class="header-btn" @click='selectConversation()'>选中指定会话</button>
        <button class="header-btn" @click='sendCustomMessage(1)'>发送带用户头像自定义消息</button>
        <button class="header-btn" @click='sendCustomMessage(0)'>发送不携带用户头像自定义消息</button>
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
      <div class="tip">
        <div v-for="item in switchConversationList" :key="item.targetId+'-'+item.conversationType">
        切换会话数据：{{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { imkit, CoreEvent} from "@rongcloud/imkit";
import { messaggeCustomMenu, conversationCustomMenu, forwardCallback} from './custom_menu'
import { Random as R } from "mockjs";
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
      switchConversationList:{},
      conversation: null
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
    window.imkit = imkit;
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
    conversationList.customMenu = conversationCustomMenu

    //刷新页面后取消选中
    const messageList = this.$refs.messageList;
    messageList.addEventListener("tapMessage", this.handleTapMessage);

    imkit.on('switch_conversation',(con) => {
      if(!con) return;
      this.conversation = con
      this.switchConversationList[con.targetId+'_'+con.conversationType] = con;
      setTimeout(() => {
        delete this.switchConversationList[con.targetId+'_'+con.conversationType]
      }, 5000);
    });
    messageList.customMenu = messaggeCustomMenu;
    messageList.forwardList = {
      callback: () => {
        let conversationInfoStr = prompt("请输入：会话类型 & targetid","1&11");
        if(conversationInfoStr){
          let conversationInfo = conversationInfoStr.split('&');
          let conversationType = parseInt(conversationInfo[0]);
          let targetId = conversationInfo[1];
          return [{
            conversationType: conversationType,
            targetId: targetId
          }]
        }
      }
    };
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
    handleTapConversation(con) {
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
      if(token && token !== TOKEN){
        imkit.disconnect();
        imkit.connect(token).then(({code, msg})=> {
          if(code !== 0) {
            alert("切换用户失败，请检查 token 与 appkey 信息！详细报错原因：" + msg)
            imkit.connect(TOKEN).then(({code, msg})=> {
              console.info('切换用户失败重新链接上一个用户')
            })
            return;
          }
          TOKEN = token;
        })

      }
    },

    changeGroupInfo() {
      const info = [
      {
        id: '22',
        name: '333',
        portraitUri: R.image("60x60"),
      }, {
        id: '33',
        name: '444',
        portraitUri: R.image("60x60"),
      },
    ]
      imkit.updateGroupMembers(this.conversation,info)
    },

    changeUserInfo() {
      const info = {
        id: window.curUser,
        displayName: "我",
        name: 'wo',
        portraitUri: R.image("80x80")
      }
      imkit.updateUserProfile(info)
    },

    changeConversationInfo() {
      let info = {
        ...this.conversation,
        name: '测试会话修改',
        portraitUri: R.image("60x60"),
      }
      if(this.conversation.conversationType == 3){
        info.memberCount = 2;// 客户应用服务器返回群组内成员数量。
      }
      imkit.updateConversationProfile(this.conversation,info)
    }
  },
};

</script>
<style scoped>
.pop-up {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    position: relative;
    background: #28262696;
}
.main {
  display: flex;
  width: 70%;
  height: 70%;
  flex-direction: column;
}

.header {
  margin: 0 auto;
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
  background: #fff;
}
.tip {
      position: absolute;
    right: 0;
}
.tip div {
  width: 200px;
  height: 60px;
  background: rgb(128 209 248);
  margin: 5px;
  padding: 5px;
  color: white;
  border-radius: 5px;
}
.test-img {
  width: 50px;
}
</style>
