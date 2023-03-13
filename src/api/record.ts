import api from './api';

export function getRecordListApi(gameId: number, from: number, count: number) {
  return api({
    url: '/record/get',
    method: 'GET',
    params: { gameId, from, count },
  });
}

export function getRecordCountApi(gameId: number) {
  return api({
    url: '/record/count',
    method: 'GET',
    params: { gameId },
  });
}

export function getRecordJsonApi(id: number) {
  return api({
    url: '/record/json',
    method: 'GET',
    params: { id },
  });
}

export function getRecentRecordsApi() {
  return api.get('/record/top');
}

export function getCurrentApi() {
  return api.get('/record/current');
}
