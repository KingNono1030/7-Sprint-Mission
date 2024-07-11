import { ReactNode } from 'react';

interface LandingBannerProps {
  src: string;
  headerF: string;
  headerS: string;
  children?: ReactNode;
}

export default function LandingBanner({
  src = '',
  headerF = '',
  headerS = '',
  children,
}: LandingBannerProps) {
  return (
    <>
      <div className={containerStyle}>
        <img className={imageStyle} src={src} alt='판다마켓 배너' />
        <h2 className={headerStyle}>
          {headerF} <br className={blackSpaceStyle} />
          {headerS}
        </h2>
        {children}
      </div>
    </>
  );
}

const containerStyle =
  'flex flex-col items-center xl:items-start relative h-[540px] md:h-[700px] xl:h-[540px] pt-12 md:pt-20 xl:pt-[180px] xl:pl-[200px] bg-blue-light';
const imageStyle =
  'absolute bottom-0 xl:right-[50px] w-full xl:w-[60%] md:max-w-[1000px] object-cover z-0';
const headerStyle =
  'relative mb-4 md:mb-6 xl:mb-8 font-bold text-gray text-3xl md:text-4xl text-center xl:text-left';
const blackSpaceStyle = 'md:hidden xl:inline';
