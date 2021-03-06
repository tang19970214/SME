import request from '@/utils/request'
import { getToken } from '@/utils/auth' // 验权

export function login(username, password) {
  return request({
    url: '/check/login',
    method: 'post',
    data: {
      Account: username,
      Password: password,
      AppKey: 'admin'
    }
  })
}

export function GoogleLogin(params) {
  return request({
    url: '/check/GoogleLogin',
    method: 'get',
    params
  })
}

export function GoogleBind(params) {
  return request({
    url: '/check/GoogleBind',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/check/getusername',
    method: 'get',
    params: { token }
  })
}

export function getUserProfile() {
  return request({
    url: '/check/getuserprofile',
    method: 'get',
    params: { token: getToken() }
  })
}

export function getModules() {
  return request({
    url: '/check/getmodules',
    method: 'get',
    params: { token: getToken() }
  })
}

export function getModulesTree() {
  return request({
    url: '/Check/GetModulesTree',
    method: 'get',
    params: { token: getToken() }
  })
}

export function getOrgs() {
  return request({
    url: '/check/getorgs',
    method: 'get',
    params: { token: getToken() }
  })
}

export function getRoles() {
  return request({
    url: '/check/getRoles',
    method: 'get',
    params: { token: getToken() }
  })
}

export function getOrgAndSubOrgs() {
  return request({
    url: '/check/GetOrgAndSubOrgs',
    method: 'get',
    params: { token: getToken() }
  })
}

export function getSubOrgs(data) {
  return request({
    url: '/check/getSubOrgs',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/check/logout',
    method: 'post'
  })
}