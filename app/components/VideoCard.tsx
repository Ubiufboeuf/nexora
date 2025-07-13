import { parseDuration, getReleaseTime } from 'app/lib/utils'
import type { Video } from '../env'
import { Icon } from './Icon'
import { IconDownload, IconHardDrive, IconHeart, IconMusic, IconVideo, IconYoutube } from './Icons'
import { Link } from 'react-router'
import { getThumbnailUrl } from 'app/services/videoService'

export function VideoCard ({ video: { link, platform, duration, title, timestamp, type, thumbnail, thumbnails } }: { video: Video }) {
  return (
    <Link
      to={link}
      className='w-full max-w-xl h-fit group cursor-pointer'
    >
      <section className='relative w-full aspect-video rounded-xl bg-black'>
        <div className='-z-10 absolute left-1/2 top-12/20 transform-[translate(-50%,-50%)] h-[70%] w-[90%] blur-xl flex items-center justify-center overflow-hidden'>
          <div className='group-hover:bg-linear-to-r from-purple-600/60 to-blue-600/60 transition-colors w-full rounded-full aspect-square animate-[spin_3s_linear_infinite]' />
        </div>
        <div className='relative left-0 top-0 w-full h-full bg-black transition-colors rounded-xl overflow-hidden'>
          <img
            src={getThumbnailUrl(thumbnails[0].url) ?? '#'}
            className='absolute z-0 left-0 top-0 blur-xl h-full w-full object-cover group-hover:opacity-40 transition-opacity'
            onError={(e) => e.currentTarget.hidden = true}
          />
          <img
            src={getThumbnailUrl(thumbnail.url) ?? '#'}
            className='absolute z-0 left-0 top-0 h-full w-full object-cover group-hover:opacity-40 transition-opacity'
            loading='lazy'
            onError={(e) => e.currentTarget.hidden = true}
          />
        </div>
        <div className='absolute top-0 p-3 w-full justify-between items-center h-fit flex left-0'>
          <div className={`${platform === 'youtube' ? 'yt' : ''} [&.yt]:bg-red-500 bg-green-600 p-1.5 h-fit w-fit rounded-full`}>
            <Icon className='size-3.5'>
              { platform === 'youtube'
                  ? <IconYoutube />
                  : <IconHardDrive />
                }
            </Icon>
          </div>
          <div className='absolute left-10.5 bottom-3 p-1.5 bg-neutral-700 rounded-full'>
            <Icon className='size-3.5'>
              { type === 'music' ? <IconMusic /> : <IconVideo /> }
            </Icon>
          </div>
          <span className='text-xs bg-neutral-700 p-1 px-2 font-semibold rounded-full'>{parseDuration(duration)}</span>
        </div>
        <div className='absolute bottom-0 left-0 w-full p-3 gap-1 h-fit flex justify-end items-center group-hover:opacity-100 opacity-0 transition-opacity'>
          <button
            className='h-fit w-fit flex items-center justify-center rounded-full hover:bg-neutral-400/50 p-1.5 cursor-pointer transition-colors'
            onClick={(e) => e.stopPropagation()}
          >
            <Icon className='size-4'>
              <IconHeart />
            </Icon>
          </button>
          <button
            className='h-fit w-fit flex items-center justify-center rounded-full hover:bg-neutral-400/60 p-1.5 cursor-pointer transition-colors'
            onClick={(e) => e.stopPropagation()}
          >
            <Icon className='size-4'>
              <IconDownload />
            </Icon>
          </button>
        </div>
      </section>
      <section className='pt-3 text-primary px-1'>
        <h1 className='text-sm font-semibold'>{title}</h1>
        {/* <span>{list}</span> */} {/* <- eso debo hacerlo cuando maneje usuarios */}
        <span className='opacity-50 text-xs'>{timestamp != null ? getReleaseTime(timestamp ?? 0) : 'Hace ? tiempo'}</span>
      </section>
    </Link>
  )
}
