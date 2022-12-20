import alert from "@/utils/alert";
import { defineStore } from "pinia";

type IUserStore = {
  id: number
  username: String 
  headIcon: String 
  token: String 
  status: "not logged in" | "logging in" | "logged in"
};

const useUserStore = defineStore("UserStore", {
  state: (): IUserStore => ({
    id: 0,
    username: "",
    headIcon: "",
    token: "",
    status: "not logged in",
  }),
  actions: {
    /**
     * 获取Token
     * @param username
     * @param password
     */
    async getToken(username: String, password: String) {},
    /**
     * 获取信息
     */
    getInfo() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(undefined);
        }, 2000);
      });
    },
    /**
     * 退出登录
     */
    async logout() {
      this.status = "not logged in";
      window._alert("success", "成功退出登录", 1000);
    },
  },
});

export default useUserStore;