import { createContext, ReactNode, useContext } from 'react'
import { enableStaticRendering } from 'mobx-react-lite'
import RootStore, { RootStoreHydration } from '@/store/RootStore'

enableStaticRendering(typeof window === 'undefined')

let store: RootStore
const StoreContext = createContext<RootStore | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

export function useRootStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}

export function useAppStore() {
  const { appStore } = useRootStore()
  return appStore
}

function initializeStore(initialData?: RootStoreHydration): RootStore {
  const target = store ?? new RootStore()

  if (initialData) {
    target.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return target
  // Create the store once in the client
  if (!store) store = target

  return target
}

export function RootStoreProvider({ children, hydrationData }: { children: ReactNode; hydrationData?: RootStoreHydration; }) {
  const value = initializeStore(hydrationData)

  return (<StoreContext.Provider value={value}>{children}</StoreContext.Provider>)
}
