import { getVideoById } from 'app/services/videoService'
import type { Route } from './+types/watch'
import type { Video } from 'app/env'
import { useEffect, useRef } from 'react'
import type { MediaPlayerClass, MediaPlayerSettingClass } from 'dashjs'
import { handleError } from 'app/lib/utils'

export async function clientLoader ({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const { searchParams } = url
  const paramVideoId = searchParams.get('v') ?? ''
  let video: Video | null = null
  if (paramVideoId) {
    try {
      video = await getVideoById(paramVideoId)
    } catch (err) {
      handleError(err, 'Error consiguiendo el video')
    }
  }
  let dashjs: typeof globalThis.dashjs | undefined
  try {
    dashjs = await import('dashjs')
  } catch (err) {
    handleError(err, 'Error importando dashjs')
  }

  return { paramVideoId, video, dashjs }
}

export default function watch ({ loaderData: { paramVideoId, video, dashjs } }: Route.ComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const MediaPlayer = dashjs?.MediaPlayer

  function startPlayer () {
    if (!videoRef.current) return

    const player = MediaPlayer?.().create()
    // player?.updateSettings({ streaming: { abr: { autoSwitchBitrate: {
    //   audio: false,
    //   video: false
    // } } } })
    player?.initialize(videoRef.current, video?.source, true, 0)
    // p.updateSettings({ streaming: { abr: { autoSwitchBitrate: { audio: false, video: false } } } })
    // p.initialize(videoElementRef.current, videoInfo?.source, AUTO_START, currentTime ?? t ?? userVideoInfo?.timeSeen ?? 0)
  }

  useEffect(() => {
    startPlayer()
  }, [])
  
  return (
    <>
      <video
        ref={videoRef}
        className='h-80 aspect-video bg-black'
        controls
      />
    </>
  )
}
