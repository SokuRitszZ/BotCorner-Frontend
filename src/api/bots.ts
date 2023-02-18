import api from './api';

export function getBotsApi() {
  return api({
    url: '/bot/getall',
    method: 'GET',
  });
}

export function getCodeApi(id: number) {
  return api({
    url: '/bot/getcode',
    method: 'GET',
    params: { id },
  });
}

export function addBotApi(bot: {
  title: string;
  langId: number;
  gameId: number;
  description: string;
  code: string;
}) {
  return api.post('/bot/add', {
    ...bot,
  });
}

export function deleteBotApi(id: number) {
  return api({
    url: '/bot/delete',
    method: 'DELETE',
    params: { id },
  });
}

export function updateBotApi(
  id: number,
  info: {
    title?: string;
    description?: string;
    code?: string;
  }
) {
  return api.put('/bot/update', {
    id,
    ...info,
  });
}

export function changeVisibleApi(id: number, visible: boolean) {
  return api.put('/bot/visible', {
    id,
    visible,
  });
}
