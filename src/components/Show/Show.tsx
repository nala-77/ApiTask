import './Show.css'

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import defaultImage from "./../../../public/default.svg"

function Show() {
  const params = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<any>([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    axios
      .get(`https://test1.focal-x.com/api/items/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      })
      .then((res) => {
        setCardData(res.data);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <main className="show-main add-parent">
        <div>
        <Link to="/dashboard" className="back-icon">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>

        <h2 className="add-head">{cardData.name}</h2>
      </div>

      <div className='show-img'>
        <img src={cardData.image_url} alt="product" onError={(e) => { e.currentTarget.src = defaultImage }} />
      </div>

      <div className='show-details'>
        <p>
            price: <span>{cardData.price}$</span> 
        </p>
        <p>
            added at: <span>{formatDate(cardData.created_at)}</span>
        </p>
        <p>
            updated at: <span> {formatDate(cardData.updated_at)}</span>
        </p>
      </div>
    </main>
)
}

export default Show;
