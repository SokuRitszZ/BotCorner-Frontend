import { getInfoApi, getTokenApi } from "@/api/account";
import { defineStore } from "pinia";
import useCacheStore from "./cacheStore";

type IUserStore = {
  id: number;
  username: String;
  headIcon: String;
  token: String;
  status: "not logged in" | "logging in" | "logged in";
  callbacks: { [key: string]: Function };
};

const initState: IUserStore = {
  id: 0,
  username: "",
  headIcon: "",
  token: "",
  status: "not logged in",
  callbacks: {},
};

const useUserStore = defineStore("UserStore", {
  state: (): IUserStore => ({ ...initState }),
  actions: {
    /**
     * 添加登录后需要触发的回调
     * @param name
     * @param fn
     */
    addAfterLoginCallback(name: string, fn: Function) {
      this.callbacks[name] = fn;
      if (this.status === "logged in") fn();
    },
    /**
     * 从localStorage加载token
     */
    loadToken() {
      this.token = localStorage.getItem("token") || "";
    },
    /**
     * 获取Token
     * @param username
     * @param password
     */
    async getToken(username: string, password: string) {
      this.status = "logging in";

      type InfoType = {
        token: string;
      };

      return getTokenApi(username, password)
        .then((info: any) => {
          this.token = (info as InfoType).token;
          localStorage.setItem("token", info.token);
          this.getInfo();
        })
        .catch((error) => {
          window._alert("danger", `登录失败：${error}`, 2000);
          this.status = "not logged in";
        });
    },
    /**
     * 获取信息
     */
    async getInfo() {
      if (!this.token) return Promise.reject("没有Token");

      this.status = "logging in";

      return getInfoApi()
        .then((info: any) => {
          window._alert("success", "登录成功 欢迎回来", 2000);
          this.$patch({ ...info });
          this.status = "logged in";
          Object.values(this.callbacks).forEach((fn) => fn());
        })
        .catch((error) => {
          console.log(error);
          window._alert("danger", "登录失败：Token无效", 2000);
          localStorage.removeItem("token");
        });
    },
    /**
     * 退出登录
     */
    logout() {
      this.$patch({ ...initState });
      useCacheStore().emptyBots();
      localStorage.removeItem("token");
      window._alert("success", "成功退出登录", 1000);
    },
  },
});

export default useUserStore;
