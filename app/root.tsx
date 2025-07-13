import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import Header from './components/Header/Header'
import { AsideMenu } from './components/AsideMenu'
import VideoCardFallback from './components/VideoCardFallback'
import { useObservableItemStore } from './stores/useObservableItemStore'
import { getMoreVideos, getVideos } from './services/videoService'
import { useVideosStore } from './stores/useVideosStore'
import { Cursor } from './models/CursorModel'
import type { Video } from './env'
import { ToggleAsideMenu } from './components/ToggleAsideMenu'
import { handleError } from './lib/utils'

const AMOUNT_TO_REQUEST = 12

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    href: '/nexora.webp'
  }
]

export async function loader ({ request }: { request: Request }) {
  const url = new URL(request.url)
  let cursor: Cursor | null = null
  let videos: Video[] = []
  try {
    const { newVideos, nextCursor } = await getVideos(cursor, AMOUNT_TO_REQUEST)
    videos = newVideos
    cursor = nextCursor
  } catch (err) {
    handleError(err)
    return { url }
  }

  return { url, videos, cursor }
}

export function HydrateFallback ({ loaderData: { url } }: Route.ComponentProps) {
  return (
    <section
      className='w-full h-full px-2 max-w-screen-2xl mx-auto'
      hidden={url.pathname !== '/'}
    >
      <section className='w-full h-fit p-4 pt-19 gap-4 place-items-center items-start grid
        videos-container:grid-cols-1
        videos-container-2:grid-cols-2
        videos-container-3:grid-cols-3
        videos-container-4:grid-cols-4
      '>
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
        <VideoCardFallback />
      </section>
    </section>
  )
}

export function Layout ({ children }: { children: ReactNode }) {
  const loaderData = useLoaderData<{ url: URL, videos: Video[] | null, cursor: Cursor | null }>()
  const videos = loaderData.videos
  const cursorFromLoader = loaderData.cursor

  const mainRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)
  const observableItem = useObservableItemStore((state) => state.item)
  const setCursor = useVideosStore((state) => state.setCursor)
  const addVideos = useVideosStore((state) => state.addVideos)
  const setVideos = useVideosStore((state) => state.setVideos)
  const addFilteredVideos = useVideosStore((state) => state.addFilteredVideos)
  const [scrolled, setScrolled] = useState(false)
  
  function handleHTMLElementLoad () {
    if (!observableItem) return

    const options: IntersectionObserverInit = {
      root: mainRef.current,
      rootMargin: '0px',
      threshold: [0, 1]
    }
    observerRef.current = new IntersectionObserver(observerCallback, options)
    observerRef.current.observe(observableItem)
  }

  const observerCallback = async (entries: IntersectionObserverEntry[]) => {
    // console.log('observerCallback cursor', { lastId: currentCursor?.last_id })
    const entrie = entries[0]
    if (entrie.isIntersecting) {
      // const { nextVideos, nextCursor } = await getMoreVideos(currentCursor, AMOUNT_TO_REQUEST)
      // addVideos(nextVideos)
      // setCursor(nextCursor)
      await loadMoreVideos()
    }
  }

  async function loadMoreVideos () {
    const currentState = useVideosStore.getState()
    const currentCursor = currentState.cursor
    const { nextVideos, nextCursor } = await getMoreVideos(currentCursor, AMOUNT_TO_REQUEST)
    addVideos(nextVideos)
    addFilteredVideos(nextVideos)
    setCursor(nextCursor)
  }

  useEffect(() => {
    // detectDeviceType()
    // setIsAsideOpened(localStorage.getItem('asideMenuOpen') === 'true')
    const cursor = new Cursor(cursorFromLoader?.category, cursorFromLoader?.last_id)
    // console.log('effect[]', cursor)
    setCursor(cursor)
    setVideos(videos)
    // setFilteredVideos(videos)
  }, [])

  useEffect(() => {
    handleHTMLElementLoad()

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [observableItem])
  
  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    if (scrolled && main.scrollTop === main.scrollHeight - main.clientHeight) {
      loadMoreVideos()
      setScrolled(false)
    }
  }, [scrolled, mainRef])

  // useEffect(() => {
  //   if (isAsideOpened) document.body.classList.add('is-aside-opened')
  //   else document.body.classList.remove('is-aside-opened')
  // }, [isAsideOpened])

  return (
    <html lang='es'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-base'>
        <ToggleAsideMenu />
        <Header />
        <main
          ref={mainRef}
          id='main'
          className='h-full max-h-[calc(100%-64px)] w-full overflow-y-auto md:pl-20 [transition:padding_ease_250ms]'
          // onScroll={() => setScrolled(true)}
        >
          <AsideMenu />
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App () {
  return <Outlet />
}

export function ErrorBoundary ({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
