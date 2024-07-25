import { useState, useEffect } from 'react';

const MOBILE_QUERY = 'screen and (max-width: 767px)';
const TABLET_QUERY = 'screen and (min-width: 768px) and (max-width: 1199px)';
const DESKTOP_QUERY = 'screen and (min-width: 1200px)';

type DeviceType = 'Mobile' | 'Tablet' | 'Desktop';

const useMediaQuery = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('Mobile');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.matchMedia(MOBILE_QUERY).matches) {
        setDeviceType('Mobile');
      } else if (window.matchMedia(TABLET_QUERY).matches) {
        setDeviceType('Tablet');
      } else if (window.matchMedia(DESKTOP_QUERY).matches) {
        setDeviceType('Desktop');
      }
    };

    const mediaQueries = [
      window.matchMedia(MOBILE_QUERY),
      window.matchMedia(TABLET_QUERY),
      window.matchMedia(DESKTOP_QUERY),
    ];

    mediaQueries.forEach(mq => mq.addEventListener('change', updateDeviceType));

    updateDeviceType();
    setIsInitialized(true);

    return () => {
      mediaQueries.forEach(mq =>
        mq.removeEventListener('change', updateDeviceType)
      );
    };
  }, []);

  return [deviceType, isInitialized];
};

export default useMediaQuery;
