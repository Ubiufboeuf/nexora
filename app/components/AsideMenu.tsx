/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router'
import { useId } from 'react'
import type { ItemAside } from '../env'
import { Icon } from './Icon'
import { IconBookMark, IconDownload, IconHeart, IconHome, IconMusic, IconRecent, IconVideo } from './Icons'

const itemsAside: ItemAside[] = [
  { name: 'Inicio', path: '/', Icon: ({ strokeWidth }) => <IconHome strokeWidth={strokeWidth} /> },
  { name: 'Recientes', path: '/recientes', Icon: ({ strokeWidth }) => <IconRecent strokeWidth={strokeWidth} /> },
  { name: 'Música', path: '/musica', Icon: ({ strokeWidth }) => <IconMusic strokeWidth={strokeWidth} /> },
  { name: 'Videos', path: '/videos', Icon: ({ strokeWidth }) => <IconVideo strokeWidth={strokeWidth} /> },
  { name: 'Favoritos', path: '/favoritos', Icon: ({ strokeWidth }) => <IconHeart strokeWidth={strokeWidth} /> },
  { name: 'Mis Listas', path: '/mis_listas', Icon: ({ strokeWidth }) => <IconBookMark strokeWidth={strokeWidth} /> },
  { name: 'Descargas', path: '/descargas', Icon: ({ strokeWidth }) => <IconDownload strokeWidth={strokeWidth} /> }
]

export function AsideMenu () {
  const { pathname } = useLocation()

  return (
    <>
      <aside id='asideMenu' className='loadingAsideData:hidden fixed top-0 h-full w-64 pt-16 bg-bg z-[15] transition-[left] duration-250'>
        <div className='h-full w-full border-r border-border p-4 gap-2 flex flex-col'>
          {
            itemsAside.map(({ path, Icon: ItemIcon, name }) => (
              <Link
                key={useId()}
                to={path}
                className={`${pathname === path ? 'active' : ''} group w-full h-10 flex items-center gap-4 p-2 px-2.5 [&.active]:bg-primary font-semibold [&.active]:text-gray-700 text-gray-200 hover:not-[&.active]:bg-primary/20 rounded-lg transition-colors`}
              >
                <Icon className='size-5 group-[&.active]:stroke-4'>
                  <ItemIcon strokeWidth='2' />
                </Icon>
                <span className='text-sm'>{name}</span>
              </Link>
            ))
          }
        </div>
      </aside>
      <aside id='asideMenuMini' className='fixed hidden md:flex top-0 left-0 w-fit h-full pt-16 z-[14] bg-bg'>
        <div className='h-full w-full border-r border-border p-4 gap-2 flex flex-col'>
          {
            itemsAside.map(({ path, Icon: ItemIcon }) => (
              <Link
                key={useId()}
                to={path}
                className={`${pathname === path ? 'active' : ''} group h-10 w-10 aspect-square flex items-center justify-center [&.active]:bg-primary font-semibold [&.active]:text-gray-700 text-gray-200 hover:not-[&.active]:bg-primary/20 rounded-lg transition-colors`}
              >
                <Icon className='size-5 group-[&.active]:stroke-4'>
                  <ItemIcon strokeWidth='2' />
                </Icon>
              </Link>
            ))
          }
        </div>
      </aside>
    </>
  )
}
