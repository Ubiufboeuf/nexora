import type { Video } from 'app/env'
import { VideoCard } from '../VideoCard'
import VideoCardFallback from '../VideoCardFallback'
import { useVideosStore } from 'app/stores/useVideosStore'

const videosFallback = [
  'fallback 1',
  'fallback 2',
  'fallback 3',
  'fallback 4',
  'fallback 5',
  'fallback 6',
  'fallback 7',
  'fallback 8',
  'fallback 9',
  'fallback 10',
  'fallback 11',
  'fallback last'
]

export function VideosList ({ filteredVideos }: { filteredVideos: Video[] | null }) {
  const errorLoadingVideos = useVideosStore((state) => state.errorLoadingVideos)
  
  console.log('error?', errorLoadingVideos)
  if (filteredVideos && !errorLoadingVideos) {
    return filteredVideos.map((video) => <VideoCard key={video.id} video={video} />)
  } else if (errorLoadingVideos) {
    return 'No se pudieron cargar los videos'
  }

  return videosFallback.map((fallback) => <VideoCardFallback key={fallback} />)
}
