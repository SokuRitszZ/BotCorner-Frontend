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
    status: "not logged in"
  }),
  actions: {
    /**
     * 获取Token
     * @param username 
     * @param password 
     */
    async getToken(username: String, password: String) {
      
    },
    /**
     * 获取信息
     */
    async getInfo() {
      
    },
    /**
     * 退出登录
     */
    async logout() {
      
    },
  }
});

export default useUserStore;