import "./Home.css";

import Card from "../Card/Card";
import Delete from "../Delete/Delete";
import Pagination from "../Pagenation/Pagenation";
import UseCustomMediaQuery from "../../hooks/UseCustomMediaQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NotFoundImage from "./path/to/not-found-image.png"; // Adjust the path as necessary

interface CardProps {
  id: number;
  image_url: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    console.log(value);
  };

  const filteredCards = cardData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const navigate = useNavigate();
  const itemsPerPage = UseCustomMediaQuery();
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
    
    axios
      .get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCardData(res.data);
      });
  }, [navigate]);

  const currentCards = filteredCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  return (
    <>
      <div className="products-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="search product by name"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
        <Link to="/dashboard/add" className="add-btn">
          Add New Product
        </Link>
        <div className="products-wrapper">
          {currentCards.length > 0 ? (
            currentCards.map((card: CardProps) => (
              <Card
                key={card.id}
                id={card.id}
                image_url={card.image_url}
                name={card.name}
                onDelete={() => handleDelete(card.id)}
              />
            ))
          ) : (
            <div className="not-found">
              <p>No products found</p>
            </div>
          )}
          <Pagination pages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
      
      {showDelete && selectedId !== null && (
        <Delete
          text="Are you sure you want to delete the product?"
          confirm="Yes"
          cancel="No"
          x={showDelete}
          id={selectedId} 
          onClose={() => {
            console.log("Closing Delete dialog");
            setShowDelete(false);
            setSelectedId(null);
          }}
        />
      )}
    </>
  );
}

export default Home;
