// const search = location.hash.split('?')
// const qarams = new URLSearchParams(search[1])
/*⚠️ ⚠️ ⚠️ ⚠️ ⚠️ -- 第三方集成区域 -- ⚠️ ⚠️ ⚠️ ⚠️ */
// ⚠️ 注意替换为自己的AppKey （以下是测试appkey）⚠️
const APPKEY = "";

// ⚠️ 注意替换为当前用户的真实Token（以下是测试token）⚠️
const TOKEN = "";

// 1、用户/群组接口 - 修改文件，获取业务信息，注意异步返回Promise
import custom_service from "./custom_service";

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
    let libOption = {appkey: APPKEY}

    imkit.init({
      service: custom_service,
      libOption: libOption,
    });
  },

  async mounted() {
    // 用户登录
    const res =  await imkit.connect(TOKEN);
    console.info('链接结果打印：', res);

    // 触发加载会话列表
    window.imkit = imkit;

    imkit.getConversationList().then((res) => {
      console.info(res)
    });
    console.info(imkit)

    // 加载会话列表
    imkit.emit(CoreEvent.CONVERSATION, true);
  },
});

app.mount("#app");
