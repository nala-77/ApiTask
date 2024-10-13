import { useState, useEffect } from "react";

function UseCustomMediaQuery() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(8); // Default is large screen

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 1920 && width >= 1300) {
        setItemsPerPage(8); // Large screen: 
      } else if (width >= 1119 && width < 1400) {
        setItemsPerPage(6); // Medium screen
      } else if (width >= 600 && width < 1135) {
        setItemsPerPage(4); // Small screen
      } else if (width >= 600 && width < 900) {
        setItemsPerPage(4); // Small screen
      } else {
        setItemsPerPage(2); // Mobile screens
      }
    };

    updateItemsPerPage(); 
    window.addEventListener("resize", updateItemsPerPage); 

    return () => window.removeEventListener("resize", updateItemsPerPage); 
  }, []);

  return itemsPerPage;
}

export default UseCustomMediaQuery;