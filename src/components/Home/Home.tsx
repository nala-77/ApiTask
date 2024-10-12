import './Home.css'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "../Card/Card";

import Pagination from "../Pagenation/Pagenation";
import UseCustomMediaQuery from "../../hooks/UseCustomMediaQuery";
import axios from "axios";

interface CardProps {
  id: number;
  image_url: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    axios
      .get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCardData(res.data);
      });
  }, []);
  const [cardData, setCardData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = UseCustomMediaQuery(); // 2 rows x 4 columns
  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  // Calculate the cards to be displayed based on the current page
  const currentCards = cardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="products-container">
        <input
          type="text"
          className="search-bar"
          placeholder="search product by name"
        />
        <Link to="/dashboard/add" className="add-btn">
          add new product
        </Link>
        <div className="products-wrapper">
          {currentCards.map((card: CardProps) => (
            <Card
              key={card.id}
              id={card.id}
              image_url={card.image_url}
              name={card.name}
            />
          ))}
          <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </>
  );
}

export default Home;
