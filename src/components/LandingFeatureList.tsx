import clsx from 'clsx';
import hotItemFeatureImg from '@assets/home-feature-01.svg';
import searchFeatureImg from '@assets/home-feature-02.svg';
import registerItemFeatureImg from '@assets/home-feature-03.svg';

export default function LandingFeatureList() {
  return (
    <main className={containerStyle}>
      <LandingFeature
        src={hotItemFeatureImg}
        alt={HOT_ALT}
        keyword={HOT_KEYWORD}
        headerF={HOT_HEADER_F}
        headerS={HOT_HEADER_S}
        descF={HOT_DESC_F}
        descS={HOT_DESC_S}
      />
      <LandingFeature
        src={searchFeatureImg}
        alt={SEARCH_ALT}
        keyword={SEARCH_KEYWORD}
        headerF={SEARCH_HEADER_F}
        headerS={SEARCH_HEADER_S}
        descF={SEARCH_DESC_F}
        descS={SEARCH_DESC_S}
        isReverse={true}
      />
      <LandingFeature
        src={registerItemFeatureImg}
        alt={REGI_ALT}
        keyword={REGI_KEYWORD}
        headerF={REGI_HEADER_F}
        headerS={REGI_HEADER_S}
        descF={REGI_DESC_F}
        descS={REGI_DESC_S}
      />
    </main>
  );
}

const containerStyle = 'px-4 md:px-6 pt-12 md:pt-6 xl:pt-[120px]';

interface LandingFeatureProps {
  src: string;
  alt: string;
  keyword: 'Hot Item' | 'Search' | 'Register';
  headerF: string;
  headerS: string;
  descF: string;
  descS: string;
  isReverse?: boolean;
}

function LandingFeature({
  src,
  alt = '',
  keyword,
  headerF = '',
  headerS = '',
  descF = '',
  descS = '',
  isReverse = false,
}: LandingFeatureProps) {
  const sectionFlexStyle = isReverse ? 'xl:flex-row-reverse' : '';
  const textAlignStyle = isReverse ? 'xl:mr-16 text-right' : 'xl:ml-16';
  const sectionStyle = clsx(sectionBaseStyle, sectionFlexStyle);
  const headerContainerStyle = clsx(textAlignStyle, 'mt-5');

  return (
    <section className={sectionStyle}>
      <img className={imageBaseStyle} src={src} alt={alt} />
      <div className={headerContainerStyle}>
        <h3 className={keywordStyle}>{keyword}</h3>
        <h2 className={headerStyle}>
          {headerF} <br className={emptySpaceStyle} />
          {headerS}
        </h2>
        <p className={descriptionStyle}>
          {descF} <br />
          {descS}
        </p>
      </div>
    </section>
  );
}

const sectionBaseStyle =
  'xl:flex xl:items-center max-w-[1200px] mx-auto mb-16 xl:mb-[280px]';
const imageBaseStyle = 'w-full xl:max-w-[588px]';
const keywordStyle = 'mb-2 font-bold text-base text-blue';
const headerStyle = 'mb-5 font-bold text-2xl md:text-3xl xl:text-4xl text-gray';
const emptySpaceStyle = 'hidden xl:inline';
const descriptionStyle =
  'font-medium text-base md:text-xl xl:text-2xl text-gray';

const HOT_ALT = '판다의 핫아이템';
const SEARCH_ALT = '구매할 상품을 고르는 이미지';
const REGI_ALT = '판매할 상품을 고르는 이미지';
const HOT_KEYWORD = 'Hot Item';
const SEARCH_KEYWORD = 'Search';
const REGI_KEYWORD = 'Register';
const HOT_HEADER_F = '인기 상품을';
const HOT_HEADER_S = '확인해 보세요';
const SEARCH_HEADER_F = '구매를 원하는';
const SEARCH_HEADER_S = '상품을 검색하세요';
const REGI_HEADER_F = '판매를 원하는';
const REGI_HEADER_S = '상품을 등록하세요';
const HOT_DESC_F = '가장 HOT한 중고거래 물품을';
const HOT_DESC_S = '판다 마켓에서 확인해 보세요';
const SEARCH_DESC_F = '구매하고 싶은 물품은 검색해서';
const SEARCH_DESC_S = '쉽게 찾아보세요';
const REGI_DESC_F = '어떤 물건이든 판매하고 싶은 상품을';
const REGI_DESC_S = '쉽게 등록하세요';
