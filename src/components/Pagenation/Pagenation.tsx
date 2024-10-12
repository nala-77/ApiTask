import "./Pagenation.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  pages: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({ pages, setCurrentPage }: PaginationProps) {
  const [currentButton, setCurrentButton] = useState<number>(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(number | string)[]>([]);

  // Generate the array of page numbers based on total pages
  const numberOfPages = Array.from({ length: pages }, (_, i) => i + 1);

  useEffect(() => {
    const updateArrOfCurrButtons = () => {
      let tempNumberOfPages: (number | string)[] = [];
      const dotsInitial = "...";
      const dotsLeft = "... ";
      const dotsRight = " ...";

      if (numberOfPages.length < 6) {
        tempNumberOfPages = numberOfPages;
      } else if (currentButton <= 3) {
        tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
      } else if (currentButton === 4) {
        tempNumberOfPages = [...numberOfPages.slice(0, 5), dotsInitial, numberOfPages.length];
      } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
        const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
        const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
        tempNumberOfPages = [
          1,
          dotsLeft,
          ...sliced1,
          ...sliced2,
          dotsRight,
          numberOfPages.length,
        ];
      } else if (currentButton >= numberOfPages.length - 2) {
        tempNumberOfPages = [1, dotsLeft, ...numberOfPages.slice(numberOfPages.length - 4)];
      }

      setArrOfCurrButtons(tempNumberOfPages);
    };

    updateArrOfCurrButtons();
    setCurrentPage(currentButton);
  }, [currentButton, pages]);

  const handleClick = (page: number) => {
    if (page !== currentButton) {
      setCurrentButton(page);
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination-container">
      <a
        href="#"
        className={`${currentButton === 1 ? "disabled" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick(currentButton - 1);
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </a>

      {arrOfCurrButtons.map((item, index) => (
        <a
          href="#"
          key={index}
          className={`${currentButton === item ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            if (typeof item === "number") {
              handleClick(item);
            } else if (item === "...") {
              // Handle dots click
              if (index > 0 && typeof arrOfCurrButtons[index - 1] === "number") {
                handleClick(arrOfCurrButtons[index - 1] as number);
              }
            }
          }}
        >
          {item}
        </a>
      ))}

      <a
        href="#"
        className={`${currentButton === numberOfPages.length ? "disabled" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          handleClick(currentButton + 1);
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </a>
    </div>
  );
}

export default Pagination;
