import { ReactNode, Children } from 'react';
import Link from 'next/link';
import useMediaQuery from '@/hooks/useMediaQuery';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Icons from '@/components/Icons';

interface BoardsLayoutProps {
  children: ReactNode;
}

export default function BoardsLayout({ children }: BoardsLayoutProps) {
  const [deviceType] = useMediaQuery();
  const isMobile = deviceType === 'Mobile';

  const childrenArray = Children.toArray(children);
  const Best = childrenArray[0];
  const All = childrenArray[1];
  const Input = childrenArray[2];
  const DropdownMenu = childrenArray[3];

  return (
    <>
      <section className="mb-6 xl:mb-10">
        <span className="sr-only">베스트 게시글</span>
        <h2 className="mb-4 text-lg font-bold text-gray-900 md:mb-6 md:text-xl">
          베스트 게시글
        </h2>
        {Best}
      </section>
      <section>
        <span className="sr-only">전체 게시글</span>
        <div className="mb-4 flex items-center justify-between md:mb-12 xl:mb-6">
          <h2 className="text-lg font-bold text-gray-900 md:text-xl">게시글</h2>
          <Link href="#">
            <Button>글쓰기</Button>
          </Link>
        </div>
        <div className="mb-4 flex items-center justify-between gap-3 md:mb-10 md:gap-[6px] xl:mb-6 xl:gap-4">
          <label className="relative h-[42px] flex-grow">
            <span className="sr-only">게시물 검색하기</span>
            <Icons.Search className="absolute left-4 top-[9px] w-6 text-gray-400" />
            {Input}
          </label>
          <Dropdown>
            <Dropdown.Toggle>{getToggleContent(isMobile)}</Dropdown.Toggle>
            {DropdownMenu}
          </Dropdown>
        </div>
        {All}
      </section>
    </>
  );
}

const getToggleContent = (isMobile: boolean) => {
  return isMobile ? (
    <Icons.Sort className="w-6" />
  ) : (
    <>
      정렬
      <Icons.CaretDown className="w-6" />
    </>
  );
};
