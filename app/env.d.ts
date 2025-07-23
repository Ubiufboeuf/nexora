export type ItemAside = {
  name: string
  path: string
  Icon: ({ strokeWidth }: { strokeWidth?: string }) => JSX.Element
}

export type Video = {
  id: string
  link: string
  title: string
  creator: Creator
  timestamp?: number
  platform: 'youtube' | 'local'
  type: 'video' | 'music'
  downloaded: boolean
  duration: number
  thumbnail: Thumbnail,
  thumbnails: Thumbnail[]
  source: string
}

export type Creator = {
  id?: string
  name?: string
}

export type ListId = string
export type List = {
  id: ListId
  name: string
  videos: Video[]
}

export interface VideoFromServer extends object {
  id: string
  title: string
  description: string
  channel_id: string
  channel_url: string
  duration: number
  view_count: number
  webpage_url: string
  categories: string[]
  tags: string[]
  like_count: number
  is_live: boolean
  was_live: boolean
  release_timestamp: number
  availability: string
  uploader: string
  uploader_id: `@${string}`
  uploader_url: `${string}@${string}`
  language: string
  thumbnails: Thumbnail[]
  thumbnail: Thumbnail
  minimalThumbnail: string
  formats: Format[]
  aspectRatio: number
}

export interface Thumbnail {
  id?: string
  height?: number
  width?: number
  resolution?: `${number}x${number}`
  url?: string
  aspectRatio?: number
}

export type Filters = 'all' | 'video' | 'music' | 'liked'

export type ServerResponse = {
  success: boolean
  status: number
  msg?: string
  cause?: string
  ids?: string
  cursor: string
  // [key: string]: VideoFromServer | VideoFromServer[]
}

export type ServerResponseToGetVideos = ServerResponse & {
  videos: VideoFromServer[]
}
