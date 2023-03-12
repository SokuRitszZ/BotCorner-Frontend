import api from './api';

export function getTokenApi(payload: { username: string; password: string }) {
  return api.post('/account/token/', payload);
}

export function getInfoApi() {
  return api.get('/account/getInfo');
}

export function registerApi(payload: {
  username: string;
  password: string;
  confirmed_password: string;
}) {
  return api.post('/account/register/', payload);
}

export function updateAvatarApi(blob: Blob) {
  const formData = new FormData();
  formData.append('cropped_image', blob);
  return api.post('/account/avatar', formData);
}
