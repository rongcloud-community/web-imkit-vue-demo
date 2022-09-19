/*⚠️ ⚠️ ⚠️ ⚠️ ⚠️ -- 第三方集成区域 -- ⚠️ ⚠️ ⚠️ ⚠️ */
// ⚠️ 注意替换为自己的AppKey （以下是测试appkey）⚠️
const APPKEY = "";

// ⚠️ 注意替换为当前用户的真实Token（以下是测试token）⚠️
const TOKEN = "";

window.APPKEY = APPKEY;
window.TOKEN = TOKEN;

// 1、用户/群组接口 - 修改文件，获取业务信息，注意异步返回Promise
import custom_service from "./custom_service";

// 2、自定义消息接口 - 暂不开放-无需修改
import custom_message from "./custom_message";

// 3. 自定义会话接口
import custom_conversation from "./custom_conversation";

// 4. 处理消息
import customDisplayMessage from "./will_message";

/*⚠️ ⚠️ ⚠️ ⚠️ ⚠️ -- 第三方集成区域 -- ⚠️ ⚠️ ⚠️ ⚠️ */
/* ------------------------------------------- */
import { createApp, h } from "vue";

import App from "./App.vue";

import { defineCustomElements, core as imkit, CoreEvent } from "@rongcloud/imkit";

defineCustomElements()

const app = createApp({
  render: () => h(App),
  async beforeCreate() {
    // 初始化imkit
    let libOption = {appkey: APPKEY,logLevel:0}

    imkit.init({
      service: custom_service,
      libOption: libOption,
      customIntercept: custom_conversation,
      customMessage: custom_message,
      customDisplayMessage: customDisplayMessage
    });

    const PersonMessage = imkit.registerMessageType('kit:person', true, true, [], false)
    const GroupMessage = imkit.registerMessageType('kit:GrpNtf', true, true, [], false)
    window.PersonMessage = PersonMessage
    window.GroupMessage = GroupMessage
  }
});

app.mount("#app");
