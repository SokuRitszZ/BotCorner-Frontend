import api from "./api"

export function getRatingsApi(game: string) {
  return api.get(`/getrating/${game}`);
}