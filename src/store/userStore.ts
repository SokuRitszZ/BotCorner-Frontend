import { getInfoApi, getTokenApi } from "@/api/account";
import { defineStore } from "pinia";

type IUserStore = {
  id: number
  username: String 
  headIcon: String 
  token: String 
  status: "not logged in" | "logging in" | "logged in"
};

const initState: IUserStore = {
  id: 0,
  username: "",
  headIcon: "",
  token: "",
  status: "not logged in",
};

const useUserStore = defineStore("UserStore", {
  state: (): IUserStore => ({...initState}),
  actions: {
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
        token: string
      };

      getTokenApi(username, password)
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
    getInfo() {
      getInfoApi()
        .then((info: any) => {
          window._alert("success", "登录成功 欢迎回来", 2000);
          this.$patch({ ...info });
          this.status = "logged in";
        })
        .catch(error => {
          console.log(error);
          window._alert("danger", "登录失败：令牌无效", 2000);
          localStorage.removeItem("token");
        });
    },
    /**
     * 退出登录
     */
    logout() {
      this.$patch({ ...initState });
      localStorage.removeItem("token");
      window._alert("success", "成功退出登录", 1000);
    },
  },
});

export default useUserStore;