import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

interface Props {
  incognitaNumber: string;
  setOutputIndex: (payload: string) => void;
}

export function PaginationIncognita({ incognitaNumber, setOutputIndex }: Props) {
  const numberOfPages = parseInt(incognitaNumber, 10);

  if (isNaN(numberOfPages) || numberOfPages <= 0) {
    return null;
  }

  const [activePage, setActivePage] = useState<number>(1);

  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
    setOutputIndex(pageNumber.toString());
  };

  const handleFirstPageClick = () => {
    setActivePage(1);
    setOutputIndex('1');
  };

  const handlePrevPageClick = () => {
    const prevPage = activePage > 1 ? activePage - 1 : 1;
    setActivePage(prevPage);
    setOutputIndex(prevPage.toString());
  };

  const handleNextPageClick = () => {
    const nextPage = activePage < numberOfPages ? activePage + 1 : numberOfPages;
    setActivePage(nextPage);
    setOutputIndex(nextPage.toString());
  };

  const handleLastPageClick = () => {
    setActivePage(numberOfPages);
    setOutputIndex(numberOfPages.toString());
  };

  const renderPaginationItems = () => {
    if (numberOfPages <= 10) {
      return Array.from({ length: numberOfPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === activePage}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ));
    } else {
      let items: React.ReactNode[] = [];
  
      if (activePage <= 5) {
        items = Array.from({ length: Math.min(6, numberOfPages) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === activePage}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ));
      } else {
        items = [
          <Pagination.Item
            key={1}
            onClick={() => handlePageClick(1)}
          >
            {1}
          </Pagination.Item>,
          <Pagination.Ellipsis key="ellipsis-first" />,
        ];
  
        const lastPageToShow = Math.min(numberOfPages, activePage + 2);
  
        for (let i = activePage - 2; i <= lastPageToShow; i++) {
          items.push(
            <Pagination.Item
              key={i}
              active={i === activePage}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
  
        if (lastPageToShow < numberOfPages - 1) {
          items.push(<Pagination.Ellipsis key="ellipsis-last" />);
        }
      }
  
      return items;
    }
  };
  

  return (
    <Pagination>
      <Pagination.First onClick={handleFirstPageClick} />
      <Pagination.Prev onClick={handlePrevPageClick} />
      {renderPaginationItems()}
      <Pagination.Next onClick={handleNextPageClick} />
      <Pagination.Last onClick={handleLastPageClick} />
    </Pagination>
  );
}
