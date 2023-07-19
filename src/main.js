import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import ToastPlugin from "vue-toast-notification";
import "./assets/main.css";
import pinia from "./store/store";
import { MotionPlugin } from "@vueuse/motion";

loadFonts();

createApp(App)
  .use(pinia)
  .use(router)
  .use(vuetify)
  .use(ToastPlugin)
  .use(MotionPlugin)
  .mount("#app");
