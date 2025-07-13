import type { Filters as VideosFilters } from 'app/env.d.ts'
import { useFiltersStore, VALID_FILTERS } from 'app/stores/useFiltersStore'
import { useRef, type ChangeEvent } from 'react'

const secciones: { id: string, name: string, value: VideosFilters }[] = [
  { id: 'secciones-all', name: 'Todos', value: 'all' },
  { id: 'secciones-videos', name: 'Videos', value: 'video' },
  { id: 'secciones-music', name: 'Música', value: 'music' },
  { id: 'secciones-liked', name: 'Favoritos', value: 'liked' }
]

export function Filters () {
  const sectionsWrapperRef = useRef<HTMLDivElement>(null)
  const setTagFilter = useFiltersStore((state) => state.setTagFilter)

  function isValidFilter (filter: string): filter is VideosFilters {
    return (VALID_FILTERS as readonly string[]).includes(filter)
  }

  function changeTagFilter (event: ChangeEvent<HTMLInputElement>) {
    const { currentTarget: input } = event
    const toCheck = input.checked
    if (!sectionsWrapperRef.current) return
    [...sectionsWrapperRef.current.children].forEach((label) => {
      if (label.children[0] instanceof HTMLInputElement)
        label.children[0].checked = false
    })
    const filter = input.getAttribute('data-filter')
    input.checked = true
    // console.log('filters', { filter, toCheck })

    if (filter !== 'all' && !toCheck) {
      input.checked = false
      if (sectionsWrapperRef.current.children[0].children[0] instanceof HTMLInputElement) {
        sectionsWrapperRef.current.children[0].children[0].checked = true
        setTagFilter('all')
      }
    } else if (filter && isValidFilter(filter)) {
      setTagFilter(filter)
    }
  }

  return (
    <section className='h-fit w-full p-4 py-2'>
      <div ref={sectionsWrapperRef} className='w-full h-fit bg-gray-500/20 rounded-md flex'>
        {
          secciones.map(({ id, name, value }) => (
            <label
              key={id}
              className='h-fit min-w-20 p-2 px-4 w-full text-center cursor-pointer text-sm has-checked:bg-primary has-checked:text-base has-checked:font-semibold rounded-[inherit] transition-all'
            >
              <input
                type='checkbox'
                hidden
                defaultChecked={value === 'all'}
                onInput={changeTagFilter}
                data-filter={value}
              />
              <span>{name}</span>
            </label>
          ))
        }
      </div>
    </section>
  )
}
