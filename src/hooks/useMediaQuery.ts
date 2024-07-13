import { useState, useEffect } from 'react';

const useMediaQuery = () => {
  const [deviceType, setDeviceType] = useState('Mobile');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('screen and (max-width: 767px)');
    const tabletMediaQuery = window.matchMedia(
      'screen and (min-width: 768px) and (max-width: 1199px)'
    );
    const desktopMediaQuery = window.matchMedia(
      'screen and (min-width: 1200px)'
    );
    const mediaQueryList = [
      mobileMediaQuery,
      tabletMediaQuery,
      desktopMediaQuery,
    ];

    const handleDeviceChange = () => {
      if (mobileMediaQuery.matches) {
        setDeviceType((prevDeviceType) =>
          prevDeviceType !== 'Mobile' ? 'Mobile' : prevDeviceType
        );
      } else if (tabletMediaQuery.matches) {
        setDeviceType((prevDeviceType) =>
          prevDeviceType !== 'Tablet' ? 'Tablet' : prevDeviceType
        );
      } else if (desktopMediaQuery.matches) {
        setDeviceType((prevDeviceType) =>
          prevDeviceType !== 'Desktop' ? 'Desktop' : prevDeviceType
        );
      }
    };

    mediaQueryList.forEach((item) => {
      item.addEventListener('change', handleDeviceChange);
    });

    handleDeviceChange();
    setIsInitialized(true);

    return () => {
      mediaQueryList.forEach((item) => {
        item.removeEventListener('change', handleDeviceChange);
      });
    };
  }, []);

  return [deviceType, isInitialized];
};

export default useMediaQuery;
