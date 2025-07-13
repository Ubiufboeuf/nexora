import { Link } from 'react-router'
import { IconMenu } from '../Icons'
import { useRef } from 'react'

export default function HeaderLeft () {  
  const labelCheckboxRef = useRef<HTMLLabelElement>(null)

  return (
    <section className='flex items-center justify-start xs:px-4 px-2 h-14 w-full'>
      <label
        ref={labelCheckboxRef}
        htmlFor={'checkboxAsideMenu'}
        className='h-10 aspect-square rounded-lg hover:bg-[#344255] justify-center items-center flex cursor-pointer border border-transparent transition-colors focus:outline-0 select-none'
        role='button'
        tabIndex={0}
        aria-label='Abrir/Cerrar menú'
      >
        <div className='h-6 w-6 fill-white'>
          <IconMenu strokeWidth='0.5' />
        </div>
      </label>
      <Link to='/' className='h-10 w-fit px-4 flex items-center fill-white relative'>
        <div className='w-fit h-4'>
          <img src='/nexora-logotipo.webp' className='h-full w-full max-w-full max-h-full object-contain' />
        </div>
      </Link>
    </section>
  )
}
