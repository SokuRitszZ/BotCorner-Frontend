import api from "./api";

export function getLangsApi() {
  return api.get("/lang/getall");
}

export function getGamesApi() {
  return api.get("/game/getall");
}
