import { createApp } from "vue";
import "./style.css";
import router from "./route";
import App from "./App.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");