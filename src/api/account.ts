import api from "./api";

export function getTokenApi(username: string, password: string) {
  return api.post("/account/token/", {
    username, password
  });
};

export function getInfoApi() {
  return api.get("/account/getInfo");
}