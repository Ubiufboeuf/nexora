import type { Filters } from 'app/env'
import { create } from 'zustand'

type FiltersStore = {
  tagFilter: Filters,
  setTagFilter: (newFilter: Filters) => void
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  tagFilter: 'all',
  setTagFilter: (newFilter) => set({ tagFilter: newFilter })
}))

export const VALID_FILTERS = ['all', 'liked', 'music', 'video'] as const
