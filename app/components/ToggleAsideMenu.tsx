import { useEffect, useRef, type ChangeEvent } from 'react'

export function ToggleAsideMenu () {
  const checkboxRef = useRef<HTMLInputElement>(null)

  function handleInput (event: ChangeEvent<HTMLInputElement>) {
    const checked = event.currentTarget.checked
    localStorage.setItem('is-open', checked ? 'true' : '')
  }

  useEffect(() => {
    if (!checkboxRef.current) return
    const isOpen = localStorage.getItem('is-open')
    if (isOpen === 'true') {
      checkboxRef.current.checked = true
    }
  }, [])
  
  return (
    <input
      ref={checkboxRef}
      id='checkboxAsideMenu'
      type='checkbox'
      onInput={handleInput}
      hidden
    />
  )
}
