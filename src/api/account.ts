import api from './api';

export function getTokenApi(username: string, password: string) {
  return api.post('/account/token/', {
    username,
    password,
  });
}

export function getInfoApi() {
  return api.get('/account/getInfo');
}

export function registerApi(
  username: string,
  password: string,
  confirmed_password: string
) {
  return api.post('/account/register/', {
    username,
    password,
    confirmed_password,
  });
}

export function updateAvatarApi(blob: Blob) {
  const formData = new FormData();
  formData.append('cropped_image', blob);
  return api.post('/account/avatar', formData);
}
