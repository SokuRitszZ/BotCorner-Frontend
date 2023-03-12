import api from './api';

export function getRatingsApi(payload: { gameId: number, count: number}) {
  return api({
    method: 'GET',
    url: '/rating/top',
    params: payload,
  });
}

export function getMyRatingApi(gameId: number) {
  return api({
    method: 'GET',
    url: '/rating/my',
    params: { gameId },
  });
}
