const VideoCardFallback = () => (
  <article className='h-fit w-full flex flex-col'>
    <section className='w-full aspect-video bg-gray-700 rounded-xl' />
    <section className='w-full flex min-h-[116px] h-full pt-3 gap-2 flex-1'>
      <div className='flex-1 h-fit px-1'>
        <div className='w-[90%] h-4 bg-gray-700 rounded mb-3' />
        <div className='w-[60%] h-4 bg-gray-700 rounded' />
      </div>
    </section>
  </article>
)

export default VideoCardFallback
