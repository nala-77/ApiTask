import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Add.css";
import "./../Sign/Sign.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import upload from "./../../../public/Upload icon.svg";
import axios from "axios";
function Add() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [img, setImg] = useState(null);

  function save(event: any) {
    event.preventDefault();
    axios
      .post(
        "https://test1.focal-x.com/api/items",
        {
          name: name,
          price: price,
          image: img,
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

        <h2 className="add-head">Add new item</h2>
      </div>

      <div className="add-form">
        <div className="add-text">
          <div className="form-input">
            <label>Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter the product name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-input">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter the product price"
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
            <img src={upload} alt="upload img" />
          </div>
        </div>
      </div>
      <button onClick={(event) => save(event)} className="save-btn">
        Save
      </button>
    </div>
  );
}

export default Add;
