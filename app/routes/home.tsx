import { useEffect, useRef } from 'react'
import { useObservableItemStore } from 'app/stores/useObservableItemStore'
import { useVideosStore } from 'app/stores/useVideosStore'
import { Filters } from 'app/components/Home/Filters'
import { useFiltersStore } from 'app/stores/useFiltersStore'
import type { Video } from 'app/env'
import { handleError } from 'app/lib/utils'
import { filterVideos } from 'app/services/videoService'
import { useUserStore } from 'app/stores/useUserStore'
import { VideosList } from 'app/components/Home/VideosList'

export default function Home () {
  const videos = useVideosStore((state) => state.videos)
  // const [filteredVideos, setFilteredVideos] = useState<(Video | string)[] | null>(videos)
  const observableItemRef = useRef<HTMLDivElement>(null)
  const setItem = useObservableItemStore((state) => state.setItem)
  const tagFilter = useFiltersStore((state) => state.tagFilter)
  const filteredVideos = useVideosStore((state) => state.filteredVideos)
  const setFilteredVideos = useVideosStore((state) => state.setFilteredVideos)
  const addFilteredVideos = useVideosStore((state) => state.addFilteredVideos)
  const user = useUserStore((state) => state.user)

  async function updateFilteredVideos () {
    let filteredVideos: Video[] = []
    try {
      filteredVideos = await filterVideos(videos, tagFilter, user) ?? []
    } catch (err) {
      handleError(err)
    }

    // console.log({ filteredVideos })

    if (filteredVideos && filteredVideos.length) {
      addFilteredVideos(filteredVideos)
    } else {
      setFilteredVideos(null)
    }
  }

  useEffect(() => {
    if (observableItemRef.current) {
      setItem(observableItemRef.current)
    }
    // console.log('home', filteredVideos, videosFallback)
  }, [])

  useEffect(() => {
    // console.log({ tagFilter, videos })
    // console.log('videos', { tagFilter, videos, filteredVideos, user })
    if (tagFilter === 'all') {
      addFilteredVideos(videos)
      return
    }

    updateFilteredVideos()
  }, [tagFilter, videos])

  return (
    <>
      <div className='p-2 max-w-screen-2xl mx-auto flex flex-col items-center h-fit'>
        <Filters />
        <section className='relative w-full h-fit p-4 gap-4 place-items-center items-start grid
          videos-container:grid-cols-1
          videos-container-2:grid-cols-2
          videos-container-3:grid-cols-3
          videos-container-4:grid-cols-4
        '>
          <VideosList filteredVideos={filteredVideos} />
          <div
            ref={observableItemRef}
            id='observableItem'
            className='pointer-events-none bg-transparent h-20 max-h-full w-full absolute bottom-150 left-0'
          />
        </section>
      </div>
    </>
  )
}
