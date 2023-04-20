import { StoreKey, TokenKey } from '@/config'
import Cookies, { CookieAttributes } from 'js-cookie'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string, key = TokenKey, options?: CookieAttributes) {
  return Cookies.set(key, token, options)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return localStorage.getItem(StoreKey)
}

export function setUserInfo(userInfo: any) {
  return localStorage.setItem(StoreKey, JSON.stringify(userInfo))
}

export function removeUserInfo() {
  return localStorage.removeItem(StoreKey)
}
