import { create } from 'zustand'

type ObservableItemStore = {
  item: HTMLDivElement | null,
  setItem: (newItem: HTMLDivElement) => void
}

export const useObservableItemStore = create<ObservableItemStore>((set) => ({
  item: null,
  setItem: (newItem) => set({ item: newItem })
}))
