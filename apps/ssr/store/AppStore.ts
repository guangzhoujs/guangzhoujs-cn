import { isUndefined } from 'lodash'
import { makeObservable, action, observable } from 'mobx'

export type CounterHydration = {
  user: any
  isLogined: boolean
}

export default class AppStore {
  user: any = {}

  city: any = {}

  isLogined: boolean = false

  collapsed: boolean = false

  counter: number = 0

  constructor() {
    makeObservable(this, {
      user: observable,
      city: observable,
      isLogined: observable,
      collapsed: observable,
      setUser: action,
      setCity: action,
      setIsLogined: action,
      setCollapsed: action,
    })
  }

  setUser(u: any) {
    this.user = u
  }

  setCity(c: any) {
    this.city = c
  }

  setIsLogined(l: any) {
    this.isLogined = l
  }

  setCollapsed(c: boolean) {
    this.collapsed = c
  }

  reset() {
    this.user = {}
  }

  hydrate(data: CounterHydration) {
    if (!isUndefined(data.user)) {
      this.setUser(data.user)
    }

    if (!isUndefined(data.isLogined)) {
      this.setIsLogined(data.isLogined)
    }
  }
}
