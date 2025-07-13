/*export type User = {
  id: string
  username: string
  watchedVideos: Video & {
    timeSeen: number
    liked: boolean
    inList: false | ListId
  }[]
}  */

import type { Video, ListId } from 'app/env'
import { handleError } from 'app/lib/utils'
import { getVideoById } from 'app/services/videoService'

type WatchedVideo = {
  id: string | null,
  timeSeen: number
  liked: boolean
  inList: false | ListId
  downloaded: boolean
}

export class User {
  id: string | undefined = 'user1'
  username: string | undefined = 'pruebas'
  watchedVideos: WatchedVideo[] = [{
    id: 'asdf',
    timeSeen: 0,
    liked: false,
    inList: false,
    downloaded: false
  }]

  async findVideoData (id: string): Promise<(WatchedVideo & Video) | null> {
    let video: Video | null = null
    
    try {
      video = await getVideoById(id)
    } catch (err) {
      handleError(err)
    }

    const videoFromUser = this.watchedVideos.find((video) => video.id === id)
    
    // console.log({video, videoFromUser})
    if (!video || !videoFromUser) return null
    
    const props: Video & WatchedVideo = {
      id: video.id,
      creator: video.creator,
      downloaded: videoFromUser.downloaded,
      duration: video.duration,
      inList: videoFromUser.inList,
      liked: videoFromUser.liked,
      link: video.link,
      platform: video.platform,
      source: video.source,
      thumbnail: video.thumbnail,
      thumbnails: video.thumbnails,
      timeSeen: videoFromUser.timeSeen,
      title: video.title,
      type: video.type,
      timestamp: video.timestamp
    }
    return props
  }
}
