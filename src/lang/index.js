import VueI18n from "vue-i18n";
import zh_CN from "./zh_CN";
import en from "./en";

module.exports = new VueI18n({
  locale: localStorage.getItem("lang") ? localStorage.getItem("lang") : "zh_CN",
  messages: {
    zh_CN: zh_CN,
    en: en,
  },
});
