import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList() {
  return request({
    url: '/api/task/list',
    method: 'get',
    params: { token: getToken() }
  })
}
