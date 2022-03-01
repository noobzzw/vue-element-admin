import request from '@/utils/request'

export function login(data) {
  console.log('login data: ', data)
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/api/user/logout',
    method: 'post',
    params: { token }
  })
}
