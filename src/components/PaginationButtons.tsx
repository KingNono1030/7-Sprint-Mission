interface PaginationButtonsProps {
  onClick: (nextPage: number) => void;
  page: number;
  isLoading: boolean;
}

export default function PaginationButtons({
  onClick,
  page,
  isLoading,
}: PaginationButtonsProps) {
  const onPreviousPage = () => {
    const isPageOutOfBounds = page <= 1;
    isPageOutOfBounds || onClick(page - 1);
  };

  const onPagination = (nextPage: number) => {
    onClick(nextPage);
  };

  const onNextPage = () => {
    const isPageOutOfBounds = page >= 5;
    isPageOutOfBounds || onClick(page + 1);
  };

  return (
    <div className='flex justify-center gap-1 p-6 bg-white font-semibold text-base text-gray-500'>
      <PageButton onClick={onPreviousPage} isLoading={isLoading}>
        &lt;
      </PageButton>
      {[1, 2, 3, 4, 5].map((pageNumber) => {
        return (
          <PageButton
            key={pageNumber}
            isActive={page === pageNumber}
            onClick={() => {
              onPagination(pageNumber);
            }}
            isLoading={isLoading}
          >
            {pageNumber}
          </PageButton>
        );
      })}
      <PageButton onClick={onNextPage} isLoading={isLoading}>
        &gt;
      </PageButton>
    </div>
  );
}

interface PageButtonProps {
  children: string | number;
  onClick: (() => void) & ((nextPage: number) => void);
  isActive?: boolean;
  isLoading: boolean;
}

function PageButton({
  children,
  onClick,
  isActive,
  isLoading,
}: PageButtonProps) {
  const handleClick = () => {
    if (!isLoading) {
      onClick();
    }
  };
  const activeStyle = isActive ? 'bg-blue text-white' : 'bg-white';
  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center w-10 h-10 rounded-full border border-solid border-gray-200 hover:bg-blue hover:text-white ${activeStyle}`}
    >
      {children}
    </button>
  );
}