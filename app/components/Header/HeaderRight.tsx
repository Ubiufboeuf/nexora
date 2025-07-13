import { Link } from 'react-router'
import { IconGlobalSearch, IconSettings } from '../Icons'

export default function HeaderRight () {
  return (
    <section className='flex w-full h-14 items-center justify-end xs:px-4 px-2'>
      <Link
        to=''
        title='Buscar Online'
        className='h-10 max-h-full aspect-square flex items-center justify-center rounded-lg hover:bg-[#344255] transition-colors'
      >
        <div className='size-6 flex items-center justify-center overflow-hidden'>
          <IconGlobalSearch />
        </div>
      </Link>
      <Link
        to=''
        title='Configuración'
        className='h-10 max-h-full aspect-square flex items-center justify-center rounded-lg hover:bg-[#344255] transition-colors'
      >
        <div className='size-6 flex items-center justify-center overflow-hidden'>
          <IconSettings />
        </div>
      </Link>
    </section>
  )
}
