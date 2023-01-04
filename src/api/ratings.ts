import api from "./api"

export function getRatingsApi(gameId: number) {
  return api({
    method: "GET",
    url: "/rating/top10",
    params: { gameId }
  });
}

export function getMyRatingApi(gameId: number) {
  return api({
    method: "GET",
    url: "/rating/my",
    params: { gameId },
  });
}