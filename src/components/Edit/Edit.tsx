import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [img, setImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
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
  }, [navigate, params.id]);

  function edit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(
        `https://test1.focal-x.com/api/items/${params.id}`,
        {
          name: name || cardData.name,
          price: price || cardData.price,
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

        <h2 className="add-head">Edit item</h2>
      </div>

      <form onSubmit={edit}>
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
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </div>
          </div>
          <div className="add-img">
            <label>Profile Image</label>
            <div
              className="imgFile-parent"
              onClick={() =>
                (
                  document.querySelector(".file-img") as HTMLInputElement
                )?.click()
              }
            >
              <input
                type="file"
                className="file-img"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setImg(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
              {previewUrl ? (
                <img src={previewUrl} alt="Selected" className="url-img" />
              ) : (
                <img
                  src={cardData.image_url}
                  className="url-img"
                  alt="upload img"
                />
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default Edit;
