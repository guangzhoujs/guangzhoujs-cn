import AppStore from './AppStore'

export type RootStoreHydration = {
  user?: any
  city?: any
  isLogined: boolean
}

export default class RootStore {
  appStore: AppStore

  constructor() {
    this.appStore = new AppStore()
  }

  hydrate(data: any) {
    if (data.user) {
      this.appStore.setUser(data.user)
    }

    if (data.city) {
      this.appStore.setCity(data.city)
    }

    if (data.isLogined) {
      this.appStore.setIsLogined(data.isLogined)
    }
  }
}
