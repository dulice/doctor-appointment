import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import ToastPlugin from "vue-toast-notification";
import "./assets/main.css";
import pinia from "./store/store";

loadFonts();

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .use(ToastPlugin)
  .mount("#app");
