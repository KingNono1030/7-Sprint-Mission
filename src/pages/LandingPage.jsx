import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import LandingBanner from '../components/LandingBanner';
import LandingFeatureList from '../components/LandingFeatureList';
import LandingFooter from '../components/LandingFooter';
import Button from '../components/Button';

import topBannerImg from '../image-resource/Img-home-top.svg';
import bottomBannerImg from '../image-resource/Img-home-bottom.svg';

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>판다 마켓</title>
      </Helmet>
      <LandingBanner
        src={topBannerImg}
        headerF={TOP_HEADER_F}
        headerS={TOP_HEADER_S}
        isTop={true}
      >
        <Link to='/items'>
          <Button size='large' className=''>
            구경하러 가기
          </Button>
        </Link>
      </LandingBanner>
      <LandingFeatureList />
      <LandingBanner
        src={bottomBannerImg}
        headerF={BOTTOM_HEADER_F}
        headerS={BOTTOM_HEADER_S}
      />
      <LandingFooter />
    </>
  );
}

const TOP_HEADER_F = '일상의 모든 물건을';
const TOP_HEADER_S = '거래해보세요';
const BOTTOM_HEADER_F = '믿을 수 있는';
const BOTTOM_HEADER_S = '판다마켓 중고 거래';
