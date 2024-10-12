import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import upload from "./../../../public/Upload icon.svg";
function Edit() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [img, setImg] = useState(null);
// interface CardProps {
//   id: number;
//   image_url: string;
//   name: string;
//   price: number;
//   created_at: string;
//   updated_at: string;
// }

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
        },
      })
      .then((res) => {
        setCardData(res.data);
      });
  }, []);
  function edit(event: any) {
    event.preventDefault();
    axios
      .post(
        `https://test1.focal-x.com/api/items/${params.id}`,
        {
          name: name,
          price: price,
          image: img,
          _method: "PUT",
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="add-parent">
      <div>
        <Link to="/dashboard" className="back-icon">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      </div>

      <div className="add-form">
        <div className="add-text">
          <div className="form-input">
            <label>Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter the product name"
              defaultValue={cardData.name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-input">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter the product price"
              defaultValue={cardData.price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
        </div>
        <div className="add-img">
          <label>Profile Image</label>
          <div
            className="imgFile-parent"
            onClick={() => document.querySelector(".file-img").click()}
            onChange={(event) => setImg(event.target.files[0])}
          >
            <input type="file" className="file-img" hidden />
            <img src={cardData.image_url} alt="upload img" />
          </div>
        </div>
      </div>
      <button onClick={(event) => edit(event)} className="save-btn">
        Save
      </button>
    </div>
  );
}

export default Edit;
