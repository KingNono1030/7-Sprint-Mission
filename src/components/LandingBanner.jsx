export default function LandingBanner({
  src = '',
  headerF = '',
  headerS = '',
  children = false,
  isTop,
}) {
  return (
    <>
      <div
        className='flex flex-col items-center xl:items-start relative 
      h-[540px] md:h-[700px] xl:h-[540px] 
      pt-12 md:pt-20 xl:pt-[180px] xl:pl-[200px]
      bg-blue-light'
      >
        <img
          className='absolute bottom-0 xl:right-[50px] w-full xl:w-[60%] md:max-w-[1000px] object-cover z-0'
          src={src}
          alt='판다마켓 배너'
        />
        <h2
          className='relative mb-4 md:mb-6 xl:mb-8 font-bold text-gray
        text-3xl md:text-4xl text-center xl:text-left'
        >
          {headerF} <br className={`${isTop && 'md:hidden xl:inline'}`} />
          {headerS}
        </h2>
        {children}
      </div>
    </>
  );
}
