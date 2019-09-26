import request from '../utils/request';
import qs from 'qs'
export function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}
export function adduser(body) {
  return request(`/api/addUsers`,{
    method: 'POST',
    body
  });
}

export function login(body) {
  return request(`/api/login`,{
    method: 'POST',
    body
  });
}
export function getUserInfo(params) {
  return request(`/api/userInfo`);
}
export function logout(params) {
  return request(`/api/logout`);
}

export function outTime(params) {
  return request(`/api/outTime`);
}