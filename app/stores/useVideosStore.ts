import type { Video } from 'app/env'
import type { Cursor } from 'app/models/CursorModel'
import { create } from 'zustand'

type VideosStore = {
  videos: Video[] | null,
  filteredVideos: Video[] | null,
  fallbacks: number,
  cursor: Cursor | null,
  errorLoadingVideos: boolean,
  setVideos: (newVideos: Video[] | null) => void
  addVideos: (newVideos: Video[] | null) => void
  setFilteredVideos: (filteredVideos: Video[] | null) => void
  addFilteredVideos: (filteredVideos: Video[] | null) => void
  setFallbacks: (amount: number) => void
  setCursor: (newCursor: Cursor | null) => void
  setErrorLoadingVideos: (newState: boolean) => void
}

export const useVideosStore = create<VideosStore>((set, get) => ({
  videos: null,
  filteredVideos: null,
  fallbacks: 0,
  cursor: null,
  errorLoadingVideos: false,
  setVideos (newVideos) {
    if (!newVideos || !newVideos.length) return

    const videos: Video[] = []

    for (const video of newVideos) {
      if (!videos.some((v) => v.id === video.id)) {
        videos.push(video)
      }
    }
    
    set({ videos })
  },
  addVideos (newVideos) {
    if (!newVideos || !newVideos.length) return

    const { videos: allVideos } = get()
    const videos: Video[] = []

    for (const video of [...(allVideos ?? []), ...newVideos]) {
      if (!videos.some((v) => v.id === video.id)) {
        videos.push(video)
      }
    }
    
    set({ videos })
  },
  setFilteredVideos (filteredVideos) {
    if (!filteredVideos || !filteredVideos.length) {
      set({ filteredVideos })
      return
    }

    const videos: Video[] = []

    for (const video of filteredVideos) {
      if (!videos.some((v) => v.id === video.id)) {
        videos.push(video)
      }
    }
    
    set({ filteredVideos: videos })
  },
  addFilteredVideos (newVideos) {
    if (!newVideos || !newVideos.length) return

    const { filteredVideos } = get()
    const videos: Video[] = []

    for (const video of [...(filteredVideos ?? []), ...newVideos]) {
      if (!videos.some((v) => v.id === video.id)) {
        videos.push(video)
      }
    }
    
    set({ filteredVideos: videos })
  },
  setFallbacks: (amount) => set({ fallbacks: amount, filteredVideos: null }),
  setCursor: (newCursor) => {
    // console.log('setCursor:', { lastId: get().cursor?.last_id, lastIdN: newCursor?.last_id })
    set({ cursor: newCursor?.last_id ? newCursor : get().cursor })
  },
  setErrorLoadingVideos: (newState) => set({ errorLoadingVideos: newState })
}))
