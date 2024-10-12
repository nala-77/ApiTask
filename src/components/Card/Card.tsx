import { useNavigate } from "react-router-dom";
import "./Card.css";
interface CardProps {
  id: number;
  image_url: string;
  name: string;
}

function Card({ id, image_url, name }: CardProps) {
  const navigate = useNavigate();
  const showItem = (id: number) => {
    navigate(`/dashboard/show/${id}`);
    console.log(id);
  };

  const editItem = (id: number) => {
    navigate(`/dashboard/edit`);
    console.log(id);
  };
  return (
    <div className="item">
      <img
        src={image_url}
        alt="item"
      />
      <div className="item-overlay" onClick={() => {
          showItem(id);
        }}>
        <h4 className="item-name">{name}</h4>
        <div className="item-btns">
          <button
            className="edit-btn"
            onClick={() => {
              editItem(id);
            }}
          >
            Edit
          </button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
