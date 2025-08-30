import "./assets/css/main.css";

import "./assets/js/myhk";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";
import { defaultConfig } from "./config";

const app = createApp(App);

// 将标题和 description 从 defaultConfig 应用到页面
document.title = defaultConfig.title ?? document.title;
let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
if (!meta) {
  meta = document.createElement("meta") as HTMLMetaElement;
  meta.name = "description";
  document.head.appendChild(meta);
}
meta.content = defaultConfig.description ?? "";

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
