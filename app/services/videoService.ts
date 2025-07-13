import type { Filters, Thumbnail, Video, VideoFromServer } from 'app/env'
import { VIDEO_ENDPOINT, VIDEOS_ENDPOINT, THUMBNAIL_ENDPOINT, VIDEO_STREAMING_ENDPOINT } from '../lib/constants'
import { Cursor } from 'app/models/CursorModel'
import { handleError } from 'app/lib/utils'
import type { User } from 'app/models/UserModel'

export async function getVideos (cursor: Cursor | null, limit: number): Promise<{ newVideos: Video[], nextCursor: Cursor }> {
  // console.log('getVideos', { cursor, str: cursor?.toB64(), lastId: cursor?.last_id, limit })
  return fetch(`${VIDEOS_ENDPOINT}?cursor=${cursor?.last_id ? cursor.toB64() : ''}&limit=${limit}`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error('Error consiguiendo los videos')
    })
    .then((data) => {
      console.log({ msg: data.msg })
      if (!data.success) throw new Error(data.msg)
      const receivedVideos: Video[] = []
      data.videos.forEach((v: VideoFromServer) => {
        const video = formVideo(v)
        if (video) {
          receivedVideos.push(video)
        }
      })
      const cursor = Cursor.fromB64(data.cursor)
      // console.log('getVideos', receivedVideos.map((v) => v.id), cursor, receivedVideos.at(-1)?.id)
      console.log({ receivedVideos, cursor })
      return { newVideos: receivedVideos, nextCursor: cursor }
    })
    .catch(() => {
      throw new Error('Error formando los videos')
    })
}

export async function getVideoById (id: string) {
  return fetch(`${VIDEO_ENDPOINT}?id=${id}`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error('Error consiguiendo el video')
    })
    .then((data) => {
      if (!data.success) throw new Error(data.msg)
      const video = formVideo(data.video)
      return video
    })
    .catch(() => {
      throw new Error('Error formando el video')
    })
}

export function formVideo (v: VideoFromServer) {
  if (!v.id || !v.uploader_id) return null

  const video: Video = {
    id: v.id,
    link: `/watch?v=${v.id}`,
    downloaded: true,
    duration: v?.duration ?? 0,
    platform: 'local',
    timestamp: v?.release_timestamp ?? 0,
    title: v?.title ?? '',
    type: 'video',
    creator: {
      id: v.uploader_id,
      name: v?.uploader ?? ''
    },
    thumbnail: getThumbnail(v.thumbnails, 'max') ?? {},
    thumbnails: v.thumbnails,
    source: `${VIDEO_STREAMING_ENDPOINT}/${v.id}/manifest.mpd`
  }

  return video
}

function getThumbnail (ts: Thumbnail[], size: 'max') {
  let h = 0

  for (const t of ts) {
    h = (t.height && t.height > h) ? t.height : h
  }

  const thumbnail: Thumbnail | undefined = ts.find((t) => t.height === h)
  return thumbnail
}

export function getThumbnailUrl (url: string | undefined) {
  return url ? `${THUMBNAIL_ENDPOINT}/${url}` : null
}

export async function getMoreVideos (cursor: Cursor | null, amount: number = 0): Promise<{ nextVideos: Video[], nextCursor: Cursor | null }> {
  const currentCursor = cursor ?? new Cursor(undefined, undefined)
  
  let videos: Video[] = []
  let nextCursor: Cursor | null = null

  try {
    const { newVideos, nextCursor: nc } = await getVideos(currentCursor, amount)
    if (nc) nextCursor = nc
    if (newVideos) videos = newVideos
  } catch (err) {
    handleError(err)
  }

  return { nextVideos: videos, nextCursor }
}

export async function filterVideos (
  videos: Video[] | null,
  tagFilter: Filters = 'all',
  user: User | null = null
) {
  if (!videos || !user) return

  const filteredVideos: Video[] = []
  for (const video of videos) {
    const videoData = await user?.findVideoData(video.id)
    if (video.type === tagFilter || videoData?.liked && tagFilter === 'liked') {
      filteredVideos.push(video)
      continue
    }
  }

  // console.log({ filteredVideos })

  return filteredVideos
}
