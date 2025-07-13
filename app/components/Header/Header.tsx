import HeaderCenter from './HeaderCenter'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

export default function Header () {
  return (
    <header className='z-20 relative w-full h-16 sm:grid flex justify-center sm:place-items-center items-center grid-cols-[208px_1fr_208px] bg-bg px-2 border-b border-border'>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </header>
  )
}
