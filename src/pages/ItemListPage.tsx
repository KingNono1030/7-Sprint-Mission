import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import useMediaQuery from '@hooks/useMediaQuery';
import useAsync from '@hooks/useAsync';
import { getItems } from '@utils/api';
import FavoriteProductSection from '@components/FavoriteProductSection';
import AllProductSection from '@components/AllProductSection';
import PaginationButtons from '@components/PaginationButtons';
import { Item } from '@components/ProductList';

interface Options {
  pageSize: number;
  order?: 'recent' | 'favorite';
  page?: number;
}

export default function ItemListPage() {
  const [favoriteItems, setFavoriteItems] = useState<Item[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [order, setOrder] = useState<'recent' | 'favorite'>('recent');
  const [page, setPage] = useState(1);
  const [deviceType, isInitialized] = useMediaQuery();
  const [isLoading, loadingError, getItemsAsync] = useAsync(getItems);

  // const [search, setSearch] = useState('');

  const getValidItems = useCallback(
    async (options: Options) => {
      const result = await getItemsAsync(options);
      if (!result) return;
      const { list } = result;
      return list;
    },
    [getItemsAsync]
  );

  const loadFavoriteItems = useCallback(
    async (options: Options) => {
      const nextItems = await getValidItems(options);
      setFavoriteItems((prevItems) => nextItems);
    },
    [getValidItems]
  );

  const loadAllItems = useCallback(
    async (options: Options) => {
      const nextItems = await getValidItems(options);
      setAllItems((prevItems) => nextItems);
    },
    [getValidItems]
  );

  const handleOrderClick = (nextOrder: 'recent' | 'favorite') => {
    setOrder(nextOrder);
  };

  const handlePaginationClick = (nextPage: number) => {
    setPage(nextPage);
  };

  useEffect(() => {
    if (!isInitialized) return;
    const isMobile = deviceType === 'Mobile';
    const isTablet = deviceType === 'Tablet';
    const responsivePageSize = isMobile ? 1 : isTablet ? 2 : 4;
    loadFavoriteItems({
      order: 'favorite',
      pageSize: responsivePageSize,
    });
  }, [deviceType, isInitialized, loadFavoriteItems]);

  useEffect(() => {
    if (!isInitialized) return;
    const isMobile = deviceType === 'Mobile';
    const isTablet = deviceType === 'Tablet';
    const responsivePageSize = isMobile ? 4 : isTablet ? 6 : 10;
    loadAllItems({ order, page, pageSize: responsivePageSize });
  }, [order, page, deviceType, isInitialized, loadAllItems]);

  return (
    <>
      <Helmet>
        <title>상품 목록</title>
      </Helmet>
      <FavoriteProductSection items={favoriteItems} />
      {loadingError?.message && <p>{loadingError.message}</p>}
      <AllProductSection
        items={allItems}
        handleOrderClick={handleOrderClick}
        order={order}
      />
      {loadingError?.message && <p>{loadingError.message}</p>}
      <PaginationButtons
        onClick={handlePaginationClick}
        isLoading={isLoading}
        page={page}
      />
    </>
  );
}
